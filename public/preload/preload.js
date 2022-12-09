const { shell } = require('electron');
const { execSync } = require('child_process');
const sudo = require('./sudoPrompt');
const fs = require('fs');
const cp = require('child_process');

const hostsFile =
  'win32' === process.platform
    ? `${process.env.windir || 'C:\\WINDOWS'}\\system32\\drivers\\etc\\hosts`
    : '/etc/hosts';

function writeWin32(e, s) {
  e = e.replace(/\r\n/g, '\n').replace(/\n/g, '\r\n');
  try {
    fs.writeFileSync(hostsFile, e), s(void 0, '\u5199\u5165\u6210\u529f');
  } catch (t) {
    let i = window.utools.getPath('userData'),
      n = i + '\\hosts.txt';
    fs.writeFileSync(n, e);
    let o = 'type ' + n + ' > ' + hostsFile;
    exec(o, (e, t) => {
      if ((fs.existsSync(n) && fs.unlinkSync(n), e))
        return s(new Error(hostsFile + ' \u6587\u4ef6\u4e0d\u53ef\u5199'));
      s(void 0, '\u5199\u5165\u6210\u529f');
    });
  }
}

function writeUnix(e, s) {
  (e = e.replace(/\r\n/g, '\n')),
    writable(hostsFile)
      ? (fs.writeFileSync(hostsFile, e), s(void 0))
      : exec('chmod go+w ' + hostsFile, (t, i) => {
          if (t)
            return s(new Error(hostsFile + ' \u6587\u4ef6\u4e0d\u53ef\u5199'));
          fs.writeFileSync(hostsFile, e), s(void 0);
        });
}

function writable(e) {
  try {
    return fs.accessSync(e, fs.constants.R_OK | fs.constants.W_OK), !0;
  } catch (s) {
    return !1;
  }
}

function exec(command, s) {
  const options = {
    name: 'uTools'
  };
  try {
    let t = execSync(e, {
      encoding: 'utf8',
      maxBuffer: 1073741824
    });
    return s(void 0, t);
  } catch (i) {
    sudo.exec(command, options, (e, t, i) => (e ? s(e) : s(void 0, t)));
  }
}
window.hostsFilePath = hostsFile;

window.hosts = {};
window.hosts.read = function () {
  if (!fs.existsSync(hostsFile))
    throw new Error(hostsFile + '\u6587\u4ef6\u4e0d\u5b58\u5728');
  let e = fs.readFileSync(hostsFile, {
    encoding: 'utf8'
  });
  return e;
};

/**
 * @description host 文件操作方法
 * @param {string} data 文件内容数据
 * @param {function} callback 回调函数，第一个参数：错误信息，第二个参数：成功信息
 */
window.hosts.write = function (data = '', callback) {
  if (!fs.existsSync(hostsFile))
    return callback(new Error(hostsFile + '\u6587\u4ef6\u4e0d\u5b58\u5728'));
  'win32' === process.platform
    ? writeWin32(data, callback)
    : writeUnix(data, callback);
};

window.openHelpUrl = function () {
  shell.openExternal('https://yuanliao.info/d/71');
};

/**
 * flush DNS
 */
window.flushDns = function () {
  if (this.platForm === 'win32') {
    cp.exec('ipconfig /flushdns', (err) => {});
  } else if (this.platForm === 'linux') {
    cp.exec('rcnscd restart', (err) => {});
  } else if (this.platForm === 'darwin') {
    cp.exec('killall -HUP mDNSResponder', (err) => {});
  }
};
