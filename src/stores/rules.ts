// stores/counter.js
import { defineStore } from 'pinia';

export const useRulesStore = defineStore('rule', {
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
      tmpContent: {},
      systemHosts: '',
      selected: 'system'
    };
  },
  actions: {
    changeHostsContent(payload: any) {
      const { selected, tmpContent } = payload;
      this.systemHosts = tmpContent;
    }
  }
});
