import router from '.';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { useUserStore } from '@/stores/modules/user';
import config from '@/config';
import { useRouterStore } from '@/stores/modules/router';
import { ElMessageBox } from 'element-plus';
const { loginInterception, routesWhiteList } = config;

import { useRouter } from 'vue-router';
router.beforeEach(async (to, from, next) => {
  nprogress.start();
  const router = useRouter();
  const { token, nickname, getUserInfo } = useUserStore();
  const { getRouteList, routeList } = useRouterStore();
  if (token) {
    if (!nickname) {
      try {
        await getUserInfo();
      } catch (err) {
        ElMessageBox.confirm(
          '您的登录已过期，您可以取消停留在此页面,或确认重新登录',
          '登录过期',
          {
            confirmButtonText: '确认',
            cancelButtonText: '取消',
          },
        ).then(() => {
          useUserStore().userLogout();
        });
      }
    }
    // 禁止已登录用户返回登录页
    if (to.path === '/login') {
      next({ path: '/' });
    }
    if (routeList.length || to.name != null) {
      next();
    } else {
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
