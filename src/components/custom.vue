<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useHostsStore } from '@/stores/hosts';
const { hosts, revealHostsFile } = useHostsStore();
</script>

<template>
  <h5>自定义</h5>
  <div class="sidebar-list">
    <var-button
      v-for="({ name, label }, i) in hosts"
      :key="name"
      text
      type="primary"
      size="large"
    >
      <var-icon name="check" />
      <span>{{ label }}</span>
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
    text-align: left;
    .var-icon {
      position: absolute;
      font-size: 14px;
      color: #00b540;
    }
    span {
      position: relative;
      left: 20px;
    }
  }
}
</style>
