// // 初始化示例
import tcb from '@cloudbase/js-sdk';
import electron_adapter from 'cloudbase-adapter-electron';

cloudbase.useAdapters(electron_adapter); //引入适配器

// 登录模块
import '@cloudbase/js-sdk/auth';
// 云存储模块
import '@cloudbase/js-sdk/storage';

const app = tcb.init({
  env: 'utools-8gxv38t4084818f0',
  appSign: 'utools',
  appSecret: {
    appAccessKeyId: '1',
    appAccessKey: 'c776db9808da3a6f2e395743ce3d2414'
  }
});

const auth = app.auth({
  persistence: 'local'
});

// TODO 如何设计用户弹窗登录，本地存储，失效弹窗
const username = 'ChandlerVer5';
const password = 'xw';

export const login = async () => {
  const loginState = await auth.signInWithUsernameAndPassword(
    username,
    password
  ); // 用户名密码登录

  console.log('loginState', loginState);
};
