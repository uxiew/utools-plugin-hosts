<script setup lang="ts">
import { useRulesStore, Rule } from '@/stores/rules';
import { useHostsStore } from '@/stores/hosts';
import Editor from './components/Editor.vue';
import Sidebar from './components/Sidebar.vue';

utools.onPluginEnter(({ code, type, payload }) => {
  console.log(code, type, payload);
});
utools.onPluginReady(() => {
  // TODO sync hosts
  console.log('onPluginReady');
});

utools.onPluginOut(() => {
  // TODO 对比后进行上传同步...
  console.log('onPluginOut');
});
</script>

<template>
  <div class="container">
    <Sidebar />
    <Editor />
  </div>
</template>

<style lang="scss">
/*override component styles */

// 选定的 hosts
.var-button.hosts-active {
  background-color: #d3d3d3;
}

.var-menu__menu {
  background-color: #ebebeb;

  .var-cell {
    cursor: pointer;
    &:hover {
      background-color: var(--hover-background);
    }
  }
}

:root {
  --dialog-width: 600px;
  --hover-background: rgba(223, 223, 223, 1);
}

/* for monaco editor */
/* .editor-widget, */
.monaco-editor-overlaymessage,
.monaco-aria-container {
  display: none !important;
}

/* for app */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
html,
body {
  padding: 0;
  margin: 0;
  height: 100vh;
  overflow: hidden;
}
.container {
  display: flex;
  height: 100vh;
}
</style>
