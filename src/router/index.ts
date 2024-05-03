import { createRouter, createWebHistory } from 'vue-router';
import { constantRoutes, configRoutes } from './route';
const router = createRouter({
  history: createWebHistory(),
  routes: [...constantRoutes, ...configRoutes],
});
export default router;
