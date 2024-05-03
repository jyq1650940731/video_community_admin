import router from '.';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { useUserStore } from '@/stores/modules/user';
import config from '@/config';
import { useRouterStore } from '@/stores/modules/router';
const { loginInterception, routesWhiteList } = config;

router.beforeEach(async (to, from, next) => {
  nprogress.start();
  const { token, username, getUserInfo } = useUserStore();
  const { getRouteList, routeList } = useRouterStore();
  if (token) {
    // 禁止已登录用户返回登录页
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      if (routeList.length === 0) {
        await getRouteList();
        next({ ...to, replace: true });
        router.addRoute({
          path: '/:pathMatch(.*)*',
          redirect: '/404',
          name: 'any',
          meta: {
            title: 'any',
            hidden: true,
          },
        });
      }
      if (username) next();
      else {
        try {
          await getUserInfo();
          next();
        } catch (error) {}
      }
    }
  } else {
    if (loginInterception) {
      //白名单
      if (routesWhiteList.includes(to.path)) {
        next();
      } else {
        next({ path: '/login', query: { redirect: to.path } });
      }
    }
  }
});

router.afterEach((to, from) => {
  // to and from are both route objects.
  nprogress.done();
});
function RouteRecordName(
  name: import('vue-router').RouteRecordName | null | undefined,
  RouteRecordName: any,
): any {
  throw new Error('Function not implemented.');
}
