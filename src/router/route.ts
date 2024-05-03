import type { RouteRecordRaw } from 'vue-router';

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login',
    meta: {
      title: '登录',
      hidden: true,
    },
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
    },
  },
];

const configRoutes: Array<RouteRecordRaw> = [
  // {
  //   path: '/:pathMatch(.*)*',
  //   redirect: '/404',
  //   name: 'any',
  //   meta: {
  //     title: 'any',
  //     hidden: true,
  //   },
  // },
  {
    path: '/',
    name: 'layout',
    redirect: 'index/home',
    meta: {
      title: 'layout',
      hidden: true,
    },
  },
];

export { constantRoutes, configRoutes };
