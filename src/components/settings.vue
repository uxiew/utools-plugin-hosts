<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useHostsStore } from '@/stores/hosts';
import Rules from './rules.vue';

const showHelpDialog = ref(false);
const showRuleDialog = ref(false);

const addRule = () => {};
const { revealHostsFile } = useHostsStore();
</script>

<template>
  <var-dialog
    title="帮助"
    :cancelButton="false"
    confirmButtonText="知道了"
    v-model:show="showHelpDialog"
  >
    <var-cell>
      <h4>1. 提示 C:\\WINDOWS\\system32\\drivers\\etc\\hosts 文件不可写 ？</h4>
      <p>
        查看 C:\\Windows\\System32\\drivers\\etc\\hosts
        文件属性，取消文件只读属性
      </p>
    </var-cell>
    <var-cell>
      <h4>2. 每次都弹出授权窗口，或 360 拦截窗口 ？</h4>
      <p>
        可以在 hosts
        文件属性中切换到「安全」标签，点击「编辑」，选择你当前的登录用户名，在权限列表中勾选「写入」，保存退出
      </p>
    </var-cell>
    <a @click="revealHostsFile">打开 hosts 文件所在目录</a>
  </var-dialog>

  <!-- TODO : rules props control internal var-dialog-->
  <var-dialog title="添加 hosts 规则" v-model:show="showRuleDialog">
    <Rules />
  </var-dialog>

  <!-- 设置区域 -->
  <div class="sidebar-footer">
    <var-row>
      <var-col offset="2" span="6">
        <var-button text type="primary" round @click="showRuleDialog = true">
          <var-icon name="plus" color="#666" :size="22" />
        </var-button>
      </var-col>
      <var-col span="6">
        <var-button text type="primary" round @click="showHelpDialog = true">
          <var-icon name="cog-outline" color="#666" :size="22" />
        </var-button>
      </var-col>
      <var-col span="6">
        <var-button text type="primary" round @click="showHelpDialog = true">
          <var-icon name="help-circle-outline" color="#666" :size="22" />
        </var-button>
      </var-col>
    </var-row>
  </div>
</template>

<style scoped lang="scss">
.var-cell {
  padding: 0 10px 10px;
}
.var-dialog {
  h4 {
    margin: 0 0 10px;
    color: #666;
  }
  a {
    color: #00b540;
    cursor: pointer;
    position: relative;
    top: 10px;
  }
  p {
    overflow: auto;
    white-space: normal;
  }
}
</style>
