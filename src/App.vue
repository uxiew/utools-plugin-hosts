<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Sidebar from './components/Sidebar.vue';
import Editor from './components/Editor.vue';

utools.onPluginReady(() => {
  // TODO sync hosts
  //   utools.dbStorage.setItem('pai', 3.1415926)
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
