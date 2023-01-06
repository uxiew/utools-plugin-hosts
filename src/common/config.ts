// 该插件的一些默认配置

export type RuleType = 'local' | 'remote' | 'prefer'; // 规则类型
export interface Settings {
  multiSelect: boolean; // 可多选规则
  // vimModel: boolean,
  // tooltip: boolean
}

export const RULE_TYPE: Record<Uppercase<RuleType>, RuleType> = {
  LOCAL: 'local',
  REMOTE: 'remote',
  PREFER: 'prefer'
};

export const SYSTEM_ID = 'system$@@@';
export const COMMON_ID = 'common$@@@';
export const SETTING_ID = 'settings$@@@';

export const settings: Settings = {
  multiSelect: true
  // vimModel: false,
  // tooltip: true
};
