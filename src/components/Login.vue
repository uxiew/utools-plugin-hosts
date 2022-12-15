<script setup lang="ts">
import { reactive, ref } from 'vue';
defineProps(['show']);
defineEmits(['update:show']);

const loginData = reactive({
  username: '',
  password: ''
});

const form = ref(null);
</script>

<template>
  <var-dialog
    title="登录-同步数据"
    confirm-button-text="登录"
    :cancel-button="false"
    v-model:show="show"
    @closed="$emit('update:show', false)"
    style="width: 20rem"
  >
    <!-- TODO 已经登陆只需要 -->
    <var-form ref="form">
      <var-space direction="column" :size="[14, 0]">
        <var-input
          placeholder="请输入用户名"
          :rules="[(v) => !!v || '用户名不能为空']"
          v-model="loginData.username"
        />
        <var-input
          type="password"
          placeholder="请输入密码"
          :rules="[(v) => !!v || '密码不能为空']"
          v-model="loginData.password"
        />
      </var-space>
    </var-form>
  </var-dialog>
</template>

<style lang="scss" scoped></style>
