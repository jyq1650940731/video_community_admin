import { defineStore } from 'pinia';
import { reactive } from 'vue';
import { getMenu } from '@/api/router';
import { constantRoutes } from '@/router/route';
import type { RouteRecordRaw } from 'vue-router';
import router from '@/router';
const modules = import.meta.glob('@/views/**/*.vue');

export const useRouterStore = defineStore('router', () => {
  const routeList: RouteRecordRaw[] = reactive([]);

  const getRouteList = async () => {
    let { result } = await getMenu();
    convertRouter(result);
    addRouter(result);
  };

  const convertRouter = (asyncRoutes: RouteRecordRaw[]) => {
    return asyncRoutes.map((route: any) => {
      if (route.component) {
        route.component === 'Layout'
          ? (route.component = () => import('@/layout/index.vue'))
          : (route.component = modules[`/src/${route.component}/index.vue`]);
      }
      if (route.children) convertRouter(route.children);
    });
  };

  const addRouter = (routers: RouteRecordRaw[]) => {
    routeList.push(...routers);
    routers.forEach((route: any) => {
      router.addRoute(route);
    });
    constantRoutes.forEach((route: any) => {
      router.addRoute(route);
    });
  };

  return {
    routeList,
    getRouteList,
  };
});
