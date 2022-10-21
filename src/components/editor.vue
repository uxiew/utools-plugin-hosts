<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useHostsStore } from '@/stores/hosts';
import { createEditor } from '@/monaco';

const { systemHosts, readSystemHosts, changeHostsContent, revealHostsFile } =
  useHostsStore();

const systemHostContent = readSystemHosts();
onMounted(() => {
  createEditor('#editor', {
    value: systemHostContent
  });
  console.log(systemHosts);
  setTimeout(() => {
    changeHostsContent({
      selected: 'custom',
      tmpContent: '你好啊👌！'
    });
  }, 3000);
});
</script>

<template>
  <div class="content">
    <div id="editor"></div>

    <!-- footer  底部区域-->
    <div class="footer">
      <p class="footer-local" @click="revealHostsFile">打开 hosts 文件</p>
      <p class="footer-status">只读，无法直接编辑</p>
    </div>
  </div>
</template>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;

  #editor {
    height: calc(100% - 40px);
  }
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  padding-left: 5px;
  background-color: #fff;
  border-top: 1px solid #c6cbd1;
  &-local {
    color: var(--button-primary-color);
    cursor: pointer;
  }
  &-status {
    color: rgba(0, 0, 0, 0.55);
  }
}
</style>
