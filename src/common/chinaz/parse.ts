import { postData, toElement } from '@/common/utils';
import {
  generateHostKey,
  getRandomNum,
  getTimeStamp,
  generateHostMD5Key
} from './generatetoken';
// @ts-ignore
import pMap from 'p-map-browser';

interface IPResponse {
  code: number;
  data: {
    address: string;
    ipAddress: string;
    tTL: string;
    timeMs: string;
    rcode?: number;
  };
  msg: number;
}

interface LogInfo extends IPResponse {
  index: number;
  city: string;
  host: string;
}
interface ResultIP {
  ip: string;
  city: string;
  address: string;
  host: string;
  timeMs: string;
}

interface IPInfo {
  city: string;
  guid: string;
  token: string;
}

function generateLoad(host: string) {
  let key = generateHostKey(host);
  let randomNum = getRandomNum(key);
  let timeStamp = getTimeStamp();
  let secretkey = generateHostMD5Key(key, timeStamp);
  return {
    host,
    rd: randomNum,
    ts: timeStamp,
    secretkey,
    identify: 0
  };
}

export async function fetchIPs(url: string): Promise<IPInfo[]> {
  const htmlStr = await fetch('https://ping.chinaz.com/' + url).then(
    (response) => response.text()
  );
  const ipList: { city: string; guid: string; token: string }[] = [];
  toElement(htmlStr)
    .querySelectorAll('#speedlist .listw')
    .forEach((row) => {
      ipList.push({
        city: (row.children[0] as HTMLElement).innerText.trim(),
        guid: row.id,
        token: row.getAttribute('token')!
      });
    });
  return ipList;
}

// 打印信息
function printLog(info: LogInfo) {
  const { index, city, host, code, data, msg } = info;

  const formatTime = (time: string) => (code === 1 ? time + 'ms' : time);

  return `<div class="log-${
    code !== 1 ? 'error' : 'success'
  }">网址：[${host}] 监测点：[${city}] 响应IP: [${data.address}] IP归属地: [${
    data.ipAddress
  }] 响应: [${formatTime(data.timeMs)}] TTL: [${formatTime(data.tTL)}]</div>`;
}

// 在成功的结果中选择最快的响应
export function getBestIP(IPs: ResultIP[]) {
  if (IPs.length === 0) return '';
  const formatTime = (time: string) =>
    time === '-' ? 9999 : time === '<1' ? 0 : Number(time);

  const ip = IPs.sort((a, b) => formatTime(a.timeMs) - formatTime(b.timeMs))[0];

  return `\n# 监测点: [${ip.city}] IP归属地: [${ip.address}] 响应: [${ip.timeMs}ms]\n${ip.ip}   ${ip.host}\n`;
}

/**
 * @description 检测 urls
 *
 */
export async function pickBestIP(url: string, IPs: IPInfo[], log: Function) {
  if (!url) return '';

  const resultIPs: ResultIP[] = [];

  const run = async ({ city, guid, token }: IPInfo, index: number) => {
    const res = (await postData('https://ping.chinaz.com/pingcheck', {
      guid,
      token,
      ...generateLoad(url)
    })) as IPResponse;

    res.code === 1 &&
      resultIPs.push({
        city,
        ip: res.data.address,
        address: res.data.ipAddress,
        host: url,
        timeMs: res.data.timeMs
      });

    log(printLog({ index, city, host: url, ...res }), IPs.length);
  };

  // 并发加速
  await pMap(IPs, run, { concurrency: 5 });
  return getBestIP(resultIPs);
}
