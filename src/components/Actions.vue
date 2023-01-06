<script setup lang="ts">
import { ref, watch } from 'vue';
import HelpTips from './HelpTips.vue';
import RulesUpdate from './RulesUpdate.vue';
import Rules from './Rules.vue';
import Setting from './Setting.vue';
import Login from './Login.vue';
import { useHostsStore } from '@/stores/hosts';

const showHelpDialog = ref(false);
const showRuleDialog = ref(false);
const showRulesUpdate = ref(false);
const showSettingDialog = ref(false);
const showLoginDialog = ref(false);

const hostsStore = useHostsStore();

// 监听 更新规则
watch(
  () => hostsStore.updating,
  (updating) => {
    if (updating) {
      showRulesUpdate.value = true;
      hostsStore.updating = updating as string;
    }
  }
);
</script>

<template>
  <HelpTips v-model:show="showHelpDialog" />
  <!-- 传递对应的规则ID -->
  <Rules v-model:show="showRuleDialog" />
  <RulesUpdate v-model:show="showRulesUpdate" :ruleId="hostsStore.updating" />
  <Setting v-model:show="showSettingDialog" />
  <Login v-model:show="showLoginDialog" />

  <!-- 设置区域 -->
  <div class="sidebar-actions">
    <var-row justify="flex-start">
      <var-col offset="1" span="5">
        <var-button text type="primary" round @click="showRuleDialog = true">
          <var-icon name="plus" color="#666" :size="20" />
        </var-button>
      </var-col>
      <var-col span="5">
        <var-button text type="primary" round @click="showSettingDialog = true">
          <var-icon name="cog-outline" color="#666" :size="20" />
        </var-button>
      </var-col>
      <var-col span="5">
        <var-button text type="primary" round @click="showHelpDialog = true">
          <var-icon name="help-circle-outline" color="#666" :size="20" />
        </var-button>
      </var-col>
      <!-- <var-col span="6">
        <var-button text type="primary" round @click="showLoginDialog = true">
          <var-icon name="account-circle-outline" color="#666" :size="20" />
        </var-button>
      </var-col> -->
    </var-row>
  </div>
</template>

<style scoped lang="scss">
.sidebar {
  &-actions {
    height: 40px;
  }
  .var-cell {
    padding: 0 10px 10px;
  }
}
</style>
