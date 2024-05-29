import '@/assets/styles/index.scss';

import { createApp } from 'vue';

import App from './App.vue';
import 'virtual:svg-icons-register';
import router from './router';
import pinia from './stores';
import '@/router/permissions';
import GlobalComponents from '@/components/index';

const app = createApp(App);
if (router) {
  app.use(router);
}
app.use(pinia);
app.use(GlobalComponents);
app.mount('#app');
