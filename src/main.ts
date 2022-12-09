import { createApp } from 'vue';
import '@varlet/touch-emulator';

import { createPinia } from 'pinia';
import App from './App.vue';

// @ts-ignore 打开 Monaco Editor 中的链接
window.open = utools.shellOpenExternal;

createApp(App).use(createPinia()).mount('#app');
