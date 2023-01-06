<script setup lang="ts">
import { useHostsStore } from '@/stores/hosts';
const hostsStore = useHostsStore();

const { common } = hostsStore;
</script>

<template>
  <h5>共用</h5>
  <div class="sidebar-list">
    <var-button
      text
      type="primary"
      size="large"
      @click="hostsStore.currentId = common.id"
      :class="{
        'hosts-active': useHostsStore().currentId === common.id
      }"
    >
      <var-icon v-if="common.active" name="checkbox-marked-circle" />
      <span>公共配置</span>
    </var-button>
  </div>
</template>

<style lang="scss">
h5 {
  margin: 10px 20px;
  color: #666;
  font-weight: 400;
}
.sidebar-list {
  .var-button {
    display: block;
    width: 100%;
  }
}
</style>
