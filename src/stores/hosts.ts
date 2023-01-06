// 系统默认 hosts
import {
  settings,
  SYSTEM_ID,
  COMMON_ID,
  SETTING_ID,
  RULE_TYPE,
  Settings
} from '@/common/config';
import { getDBData, saveToDB } from '@/common/utils';
import { defineStore } from 'pinia';
import { Rule, useRulesStore, defaultRules } from './rules';

// 公共配置
const getCommon = () => ({
  id: COMMON_ID,
  type: RULE_TYPE.LOCAL,
  name: COMMON_ID,
  active: true,
  content: (getDBData(COMMON_ID)?.content || window.hosts.read()) as string
});

/**
 * @description 初始化 common、dev、test、prod 数据
 * 第一次启动时，公共配置 common 来自系统的 hosts
 */

(function initDB() {
  if (utools.db.allDocs().length === 0) {
    saveToDB(SETTING_ID, settings);
    saveToDB(COMMON_ID, getCommon());
    for (const key in defaultRules) {
      saveToDB(key, defaultRules[key]);
    }
  }
})();

export const useHostsStore = defineStore('hosts', {
  state: () => {
    return {
      // localId: 'hosts',
      updating: '', // 需要更新某个规则时，用于触发弹窗
      currentId: SYSTEM_ID, // 默认选中的，启动时默认查看系统 host； common、dev、test、prod
      settings: (getDBData(SETTING_ID) as Settings) || settings
    };
  },
  // 所有 hosts
  getters: {
    // 读取系统的 hosts
    getSysHosts: () => () => ({
      id: SYSTEM_ID,
      type: RULE_TYPE.LOCAL,
      name: SYSTEM_ID,
      content: window.hosts.read(),
      active: true
    }),
    // 公共配置，总是启用的
    common: () => getCommon(),
    rules: () => useRulesStore().rules
  },
  actions: {
    // 设置系统 hosts
    setSysHosts() {
      let hosts = `#-------- 公共配置[${this.common.type}] --------\n\n${this.common.content}\n`;

      for (const k in this.rules) {
        const { name, active, type, content } = this.rules[k];
        if (active)
          hosts += `\n#-------- ${name}[${type}] --------\n\n${content}\n`;
      }

      window.hosts.write(hosts, (error: any, success: any) => {
        if (error) console.error(error, success);
        if (success) console.log(error, success);
      });
    },
    /**
     * @description 是否已存在同名规则
     */
    checkNameValid(name: string): boolean | string {
      // @ts-ignore
      let valid = true;
      if (this.common.name === name || this.getSysHosts().name === name) {
        valid = false;
      } else {
        for (const k in this.rules) {
          if (this.rules[k].name === name) {
            valid = false;
            break;
          }
        }
      }

      return valid || `已存在名为【${name}】的规则！`;
    },
    /**
     * @description 获取对应 id 的 host 内容
     */
    getHostsById(id: string): Rule {
      // @ts-ignore
      return (
        this.rules[id] || (SYSTEM_ID === id ? this.getSysHosts() : this.common)
      );
    }
  }
});
