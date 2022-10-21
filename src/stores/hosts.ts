// stores/counter.js
import { defineStore } from 'pinia';

export const useHostsStore = defineStore('hosts', {
  state: () => {
    return {
      localId: null,
      setting: {},
      hosts: [
        {
          name: 'dev',
          label: '开发环境',
          content: `##`
        },
        {
          name: 'test',
          label: '测试环境',
          content: `##`
        },
        {
          name: 'prod',
          label: '生产环境',
          content: `##`
        }
      ],
      common: {
        label: '公共配置',
        content: `##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1	localhost
255.255.255.255	broadcasthost
::1             localhost
`
      },
      tmpContent: {},
      systemHosts: '',
      selected: 'system' // common、dev、test、prod
    };
  },
  actions: {
    // 显示系统的hosts
    revealHostsFile: () =>
      window.utools.shellShowItemInFolder(window.hostsFilePath),
    // 读取系统的hosts
    readSystemHosts() {
      const content = window.hosts.read();
      return (this.systemHosts = content);
    },
    // 改变系统 hosts
    changeHostsContent(payload: any) {
      const { selected, tmpContent } = payload;
      this.systemHosts = tmpContent;
    }
  }
});
