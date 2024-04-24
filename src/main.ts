import '@/assets/styles/index.scss';

import { createApp } from 'vue'

import App from './App.vue'
import 'virtual:svg-icons-register';
import router from './router';
import pinia from './stores';

const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount('#app')
