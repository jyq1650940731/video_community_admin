import '@/assets/styles/index.scss';

import { createApp } from 'vue';

import App from './App.vue';
import 'virtual:svg-icons-register';
import router from './router';
import pinia from './stores';
import 'element-plus/theme-chalk/el-message.css';
import 'element-plus/es/components/notification/style/css';
import 'element-plus/theme-chalk/el-message-box.css';
import '@/router/permissions';

import GlobalComponents from '@/components/index';

const app = createApp(App);
app.use(router);
app.use(pinia);
app.use(GlobalComponents);
app.mount('#app');
