<script setup lang="ts">
import { revealHostsFile } from '@/common/utils';
defineProps(['show']);
defineEmits(['update:show']);
</script>

<template>
  <var-dialog
    title="帮助"
    :cancelButton="false"
    confirmButtonText="知道了"
    v-model:show="show"
    @closed="$emit('update:show', false)"
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
</template>

<style lang="scss" scoped>
.var-dialog {
  h4 {
    margin: 0 0 10px;
    color: #666;
  }
  p {
    overflow: auto;
    white-space: normal;
  }

  a {
    color: #00b540;
    cursor: pointer;
    position: relative;
    top: 10px;
  }
}
</style>
