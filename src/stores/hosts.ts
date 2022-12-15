// 系统默认 hosts
import { defineStore } from 'pinia';
import { useRulesStore } from './rules';

export interface Payload {
  name: string;
  content: string;
}

export const useHostsStore = defineStore('hosts', {
  state: () => {
    return {
      localId: 'hosts',
      settings: {
        multipleSelect: false
      },
      currentId: 'system' // 默认选中的，启动时默认查看系统 host； common、dev、test、prod
    };
  },
  getters: {
    // 读取系统的hosts
    system: () => {
      return {
        id: 'system',
        name: '系统',
        content: window.hosts.read(),
        active: true
      };
    },
    // 公共配置，总是启用的
    common: () => ({
      id: 'common',
      name: '公共配置',
      active: true,
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
    }),
    rules: () => {
      const { rules } = useRulesStore();
      return rules;
    }
  },
  actions: {
    // 设置系统 hosts
    setSysHosts(payload: Payload) {
      const { name, content } = payload;

      const newHosts =
        this.system + `\n#-------- ${name} --------\n\n${content}\n`;

      window.hosts.write(newHosts, (error: any) => {
        console.error(error);
      });
    },
    getHostsById(id: string): any {
      // @ts-ignore
      return this.rules[id] || this[id];
    }
  }
});
