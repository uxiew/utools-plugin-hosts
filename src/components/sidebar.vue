<script setup lang="ts">
import CommonRule from './CommonRule.vue';
import CustomRule from './CustomRule.vue';
import Actions from './Actions.vue';
import { useHostsStore } from '@/stores/hosts';
import { SYSTEM_ID } from '@/common/config';
</script>

<template>
  <div class="sidebar">
    <div>
      <div class="sidebar-top">
        <var-button
          text
          type="primary"
          size="large"
          @click="useHostsStore().currentId = SYSTEM_ID"
          :class="{
            'hosts-active': useHostsStore().currentId === SYSTEM_ID
          }"
        >
          当前系统 hosts
        </var-button>
      </div>
      <CommonRule />
      <CustomRule />
    </div>

    <!-- footer  Settings-->
    <Actions />
  </div>
</template>

<style lang="scss">
.sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #e7eaed;
  border-right: 1px solid #c6cbd1;
  width: 230px;
  padding: 10px 0;
  color: #333;

  .var-button {
    border-radius: 0;
  }

  &-top button {
    display: block;
    width: 100%;
    text-align: left;
  }
  &-list {
    overflow: auto;
    text-align: left;
  }

  &-list button {
    color: #333;
    font-size: 14px;
  }

  .var-button--text:hover {
    background-color: var(--hover-background);
  }
}
</style>
