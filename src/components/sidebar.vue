<script setup lang="ts">
import { ref, onMounted } from 'vue';
import Common from './common.vue';
import Custom from './custom.vue';
import Settings from './settings.vue';
import { useHostsStore } from '@/stores/hosts';
// import { login } from '@/coomon/cloud_dev';

defineProps<{ msg: string }>();
const active = ref(0);
const items = [
  { text: 'Real-Time', icon: 'mdi-clock' },
  { text: 'Audience', icon: 'mdi-account' },
  { text: 'Conversions', icon: 'mdi-flag' }
];

const { revealHostsFile } = useHostsStore();

/* const loginCB = () => {
  console.log('start login!');
   login();
}; */
</script>

<template>
  <div class="sidebar">
    <div>
      <div class="sidebar-top">
        <var-button text type="primary" size="large">当前系统 hosts</var-button>
      </div>
      <Common />
      <Custom />
    </div>

    <!-- footer  Settings-->
    <Settings />
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
  &-footer {
    height: 50px;
  }
}
</style>
