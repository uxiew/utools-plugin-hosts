/**
 * @description 同步远程存储的hosts配置；增删改查
 */
import { defineStore } from 'pinia';
import { RuleType, RULE_TYPE } from '@/common/config';
import { nextTick } from 'vue';

export interface Base {
  name: string;
  type: RuleType;
  content: string;
}

export interface Rule extends Base {
  id: string;
  order: number; // 规则排序
  active: boolean; // 是否启用
  showMenu: boolean; // 是否显示操作菜单选项,
}

export interface RuleResult extends Base {
  order: number;
  active: boolean;
  id?: string;
  url?: string;
  updateSchedule?: number;
  log?: string;
  running?: boolean;
}

export const defaultRules: Record<string, Rule> = {
  dev: {
    id: 'dev',
    order: 0,
    type: RULE_TYPE.LOCAL,
    name: '开发环境',
    content: '',
    active: false,
    showMenu: false
  },
  test: {
    id: 'test',
    order: 1,
    type: RULE_TYPE.LOCAL,
    name: '测试环境',
    content: '',
    active: false,
    showMenu: false
  },
  prod: {
    id: 'prod',
    order: 2,
    type: RULE_TYPE.LOCAL,
    name: '生产环境',
    content: '',
    active: false,
    showMenu: false
  }
};

export const useRulesStore = defineStore('rule', {
  state: () => {
    let rules = defaultRules;
    utools.db
      .allDocs('rule')
      // 规则排序
      .sort(({ value: v1 }, { value: v2 }) => v1.order - v2.order)
      .forEach((doc, i) => {
        const { value } = doc as { _id: string; value: Rule };
        if (i === 0) rules = {};
        rules[value.id] = value;
      });
    return { rules };
  },
  actions: {
    addRule(data: RuleResult) {
      this.rules[data.name] = {
        ...data,
        id: data.id || data.name,
        showMenu: false
      };
    },
    delRule(id: string) {
      delete this.rules[id];
      utools.dbStorage.removeItem(`rule_${id}`);
    },
    updateRule(data: RuleResult, oldId: string) {
      this.addRule(data);
      nextTick(() => this.delRule(oldId));
    }
  }
});
