import type { Rule } from '@/stores/rules';
import { toRaw } from 'vue';
import { COMMON_ID, SETTING_ID } from './config';

// 打开系统的 hosts 目录
export const revealHostsFile = () =>
  window.utools.shellShowItemInFolder(window.hostsFilePath);

export const uniqueId = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);

/**
 * @description 本地存储，不能深覆盖！
 */
export const saveToDB = (id: string, value: Record<string, any>) => {
  id =
    id === COMMON_ID
      ? COMMON_ID
      : id === SETTING_ID
      ? SETTING_ID
      : 'rule_' + id;

  const { setItem, getItem } = utools.dbStorage;
  setItem(id, { ...getItem(id), ...toRaw(value) });
};

/**
 * @description 获取本地存储！
 */
export const getDBData = (id: string) => {
  id =
    id === COMMON_ID
      ? COMMON_ID
      : id === SETTING_ID
      ? SETTING_ID
      : 'rule_' + id;
  return utools.dbStorage.getItem(id);
};

/**
 * @description 解析 远端的 hosts
 * @example 
    ##
    # Host Database
    #
    # localhost is used to configure the loopback interface
    # when the system is booting.  Do not change this entry.
    ##
    127.0.0.1	localhost
    255.255.255.255	broadcasthost
    ::1             localhost

    #-------- medium[local]   --------
    
    # Medium Start
    104.16.120.127	medium.com
    104.16.120.145	api.medium.com
    104.16.120.145	cdn-static-1.medium.com
    104.16.120.145	cdn-images-1.medium.com
    104.16.120.145	cdn-images-2.medium.com
    # Medium End


    #-------- SOFTWARE[prefer] --------

    127.0.0.1 ocsp.apple.com

    #----
 */
export const parseHosts = (hosts: string) => {
  let prefix = 'hosts_';
  let id = '0';
  const rules: Record<string, Rule> = {
    // [prefix + id]: {
    //   id: prefix + id,
    //   type: 'local',
    //   name: '开发环境',
    //   content: `##`,
    //   active: false,
    //   showMenu: false,
    // }
  };
  const hostsRules = hosts.split(/#--------\s+(.*)\s+--------\n+/);

  hostsRules.forEach((r, i) => {
    const str = r.trim();
    console.log(hostsRules, i, str);
    if (/.+\[(.*)\]$/.test(str)) {
      const [name, type] = str.split(/\[(.*)\]$/);
      id = String(i);
      // @ts-ignore
      rules[prefix + id] = {};
      rules[prefix + id].id = id;
      rules[prefix + id].name = name;
      if (/local|remote|prefer/.test(type))
        // @ts-ignore
        rules[prefix + id].type = type;
      else {
        throw new Error(`Parse Error: Invalid Remote Rules! [${type}]`);
      }
      rules[prefix + id].content = hostsRules[i + 1].trim();
      rules[prefix + id].showMenu = false;

      rules[prefix + id].active = false;
    }
  });

  // TODO 还有多余的配置未写入
  return rules;
};

/**
 * @param {String} HTML representing any number of sibling elements
 * @return {NodeList}
 */
export function toElement(htmlStr: string) {
  const template = document.createElement('template');
  template.innerHTML = htmlStr;
  return template.content;
}

// Example POST method implementation:
export async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'user-agent': `Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.46`,
      'x-requested-with': `XMLHttpRequest`
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },

    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}
