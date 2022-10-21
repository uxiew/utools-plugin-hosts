<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
const active = ref(0);
const tabs = ['本地', '远程', '预设'];
const value = ref('');

const formData = reactive({
  hostsName: '',
  hostsUrl: '',
  hostsUpdateStatus: ''
});
</script>

<template>
  <var-tabs
    elevation
    color="#2979ff"
    active-color="#fff"
    inactive-color="hsla(0, 0%, 100%, .6)"
    v-model:active="active"
  >
    <var-tab v-for="(tabName, index) in tabs" :key="index">
      {{ tabName }}
    </var-tab>
  </var-tabs>

  <var-tabs-items v-model:active="active">
    <!-- 本地自定义 -->
    <var-tab-item>
      <var-input placeholder="hosts 方案名称" v-model="value" />
    </var-tab-item>

    <!-- 自定义源 -->
    <var-tab-item>
      <var-form ref="form">
        <var-input
          placeholder="hosts 方案名称"
          :rules="[(v:string) => !!v || 'hosts 方案名称不能为空']"
          v-model="formData.hostsName"
        />
        <var-input
          type="password"
          placeholder="hosts 地址:https://,file:///"
          :rules="[(v:string) => !!v || 'hosts 地址不能为空']"
          v-model="formData.hostsUrl"
        />
        <var-select placeholder="自动更新" v-model="formData.hostsUpdateStatus">
          <var-option label="从不" />
          <var-option label="每日更新" />
          <var-option label="每周更新" />
        </var-select>
      </var-form>
    </var-tab-item>

    <!-- 预设ip检测 -->
    <var-tab-item></var-tab-item>
  </var-tabs-items>
</template>

<style lang="scss" scoped></style>
