<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useHostsStore } from '@/stores/hosts';
const {
  common: { label }
} = useHostsStore();
</script>

<template>
  <h5>共用</h5>
  <div class="sidebar-list">
    <var-button text type="primary" size="large">
      <var-icon name="checkbox-marked-circle" />
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
  }
}
</style>
