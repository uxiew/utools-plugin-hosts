<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { useRulesStore } from '@/stores/rules';
import { Snackbar } from '@varlet/ui';
import '@varlet/ui/es/snackbar/style/index';

const props = defineProps(['show']);
const emit = defineEmits(['update:show']);

const activeTab = ref('regular');

const TYPE = {
  REGULAR: 'regular',
  REMOTE: 'remote',
  PREFER: 'prefer'
};

const tabs = [
  { icon: 'plus', type: TYPE.REGULAR, name: '本地' },
  { icon: 'weather-cloudy', type: TYPE.REMOTE, name: '远程' },
  { icon: 'arrow-down', type: TYPE.PREFER, name: '优选' }
];

const rulesStore = useRulesStore();
const hasError = ref(false);

watch(
  () => props.show,
  (show) => {
    console.log(show), !show && resetRule();
  }
);

let data = {
  name: '',
  type: activeTab.value,
  urls: '',
  updateSchedule: 0,
  log: '',
  content: ''
};

let rule = reactive(data);
const resetRule = () => {
  activeTab.value = 'regular';
  rule.name = '';
  rule.urls = '';
  rule.updateSchedule = 0;
  rule.log = '';
  rule.content = '';
};

const onBeforeClose = (
  action: 'confirm' | 'cancel' | 'close',
  done: Function
) => {
  if (action === 'close' || action === 'cancel') {
    emit('update:show', false);
  } else {
    if (!hasError) {
      done();
    } else {
      !rule.name && Snackbar['warning']('必须添加规则名称！');
      rule.type === TYPE.REMOTE &&
        !rule.urls &&
        Snackbar['warning']('必须添加规则 urls！');
      rule.type === TYPE.PREFER &&
        !rule.content &&
        Snackbar['warning']('未能优选检测！请稍后再试~');
    }
  }
};

function addRule() {
  console.log('rule', rule);
  rule.type = activeTab.value;
  switch (activeTab.value) {
    case TYPE.REGULAR:
      if (!rule.name) hasError.value = true;
      rulesStore.addRule(rule.name);
      break;
    case TYPE.REMOTE:
      if (!rule.name || !rule.urls) hasError.value = true;
      rulesStore.addRule(rule.name);
      break;
    case TYPE.PREFER:
      if (!rule.content || !rule.urls) hasError.value = true;
      rulesStore.addRule(rule.name);
      break;
    default:
      break;
  }
}
</script>

<template>
  <div class="rules-wrapper">
    <!-- TODO : rules props control internal var-dialog-->
    <var-dialog
      title="添加 hosts 规则"
      v-model:show="show"
      @before-close="onBeforeClose"
      @confirm="addRule"
    >
      <var-tabs
        elevation
        color="#2979ff"
        active-color="#fff"
        inactive-color="hsla(0, 0%, 100%, .6)"
        v-model:active="activeTab"
      >
        <var-tab
          v-for="({ icon, type, name }, i) in tabs"
          :key="i"
          :name="type"
        >
          <var-icon class="tabs-example-icon" :name="icon" />

          {{ name }}
        </var-tab>
      </var-tabs>

      <var-tabs-items v-model:active="activeTab">
        <!-- 本地自定义 -->
        <var-tab-item :name="TYPE.REGULAR">
          <var-input
            placeholder="hosts 方案名"
            :rules="[(v:string) => !!v || 'hosts 方案名不能为空']"
            v-model="rule.name"
          />
        </var-tab-item>

        <!-- 自定义源 -->
        <var-tab-item :name="TYPE.REMOTE">
          <var-form ref="form">
            <var-input
              placeholder="hosts 方案名"
              :rules="[(v:string) => !!v || 'hosts 方案名不能为空']"
              v-model="rule.name"
            />
            <var-input
              placeholder="hosts 地址:http://,https://"
              :rules="[(v:string) => !!v || 'hosts 地址不能为空']"
              v-model="rule.urls"
            />
            <var-select placeholder="自动更新" v-model="rule.updateSchedule">
              <var-option label="从不" :value="0" />
              <var-option label="每日更新" :value="1" />
              <var-option label="每周更新" :value="2" />
            </var-select>
          </var-form>
        </var-tab-item>

        <!-- 优选 ip 检测 -->
        <var-tab-item :name="TYPE.PREFER" class="rule-prefer">
          <var-row justify="space-between" gutter="20">
            <var-col>
              <var-input placeholder="hosts 方案名" v-model="rule.urls" />
            </var-col>
            <var-col span="12">
              <var-input placeholder="urls 列表" textarea v-model="rule.urls" />
              <div class="rule-prefer-urls"></div>
            </var-col>
            <var-col span="12">
              <var-input placeholder="测试进度" textarea v-model="rule.log" />
            </var-col>
          </var-row>
          <div class="primary-btn">
            <var-button type="primary" @click="() => true">
              开始检测优选
            </var-button>
          </div>
        </var-tab-item>
      </var-tabs-items>
    </var-dialog>
  </div>
</template>

<style lang="scss" scoped>
.rules-wrapper {
  .rule-prefer {
    .primary-btn {
      margin-top: 20px;
      text-align: center;
    }
  }
}
</style>
