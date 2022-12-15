/**
 * @description 同步远程存储的hosts配置；增删改查
 */
import { defineStore } from 'pinia';

export type RuleType = 'regular' | 'remote' | 'prefer'; // 规则类型
interface Base {
  name: string;
  type: RuleType;
  content: string;
}

export interface Rule extends Base {
  id: string;
  active: boolean; // 是否启用
  showMenu: boolean; // 是否显示操作菜单选项,
}

export interface RuleResult extends Base {
  urls: string;
  updateSchedule: number;
  log: string;
  running: boolean;
}

export const useRulesStore = defineStore('rule', {
  state: () => {
    const rules: Record<string, Rule> = {
      dev: {
        id: 'dev',
        type: 'regular',
        name: '开发环境',
        content: `##`,
        active: false,
        showMenu: false
      },
      test: {
        id: 'test',
        type: 'regular',
        name: '测试环境',
        content: `##`,
        active: false,
        showMenu: false
      },
      prod: {
        id: 'prod',
        type: 'regular',
        name: '生产环境',
        content: `##`,
        active: false,
        showMenu: false
      }
    };
    return {
      rules
    };
  },
  actions: {
    addRule(data: RuleResult) {
      this.rules[data.name] = {
        id: data.name,
        type: data.type,
        name: data.name,
        content: data.content,
        active: false,
        showMenu: false
      };
    },
    delRule(id: string) {
      for (const k in this.rules) {
        if (this.rules[k].id === id) {
          delete this.rules[k];
          break;
        }
      }
    },
    updateRule(id: string) {}
  }
});
