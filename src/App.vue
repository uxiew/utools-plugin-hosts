<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Sidebar from './components/sidebar.vue';
import Editor from './components/editor.vue';
</script>

<template>
  <div class="container">
    <Sidebar msg="ss">span: 12</Sidebar>
    <Editor />
  </div>
</template>

<style>
/*override component styles */
:root {
  --button-border-radius: 0px;
  --dialog-width: 600px;
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
