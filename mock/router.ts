import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/dev-api/router/menu',
    method: 'get',
    response(config) {
      if (config.headers['admin-token'] !== '1234') {
        return {
          code: 1001,
          success: false,
          message: 'token失效',
        };
      }
      return {
        success: true,
        message: '操作成功!',
        code: 200,
        result: [
          {
            path: '/index',
            component: 'Layout',
            meta: {
              title: '首页',
              hidden: false,
              icon: 'HomeFilled',
            },
            children: [
              {
                path: '/index/home',
                name: 'home',
                component: 'views/home',
                meta: {
                  title: '首页',
                  hidden: false,
                  icon: 'HomeFilled',
                },
              },
            ],
          },
          {
            path: '/control',
            component: 'Layout',
            name: 'control',
            meta: {
              title: '主控台',
              hidden: false,
              icon: 'Platform',
            },
            children: [
              {
                path: '/control/m_control',
                name: 'm_control',
                component: 'views/m_control',
                meta: {
                  title: '主控台',
                  icon: 'Platform',
                  hidden: false,
                },
              },
            ],
          },
          {
            path: '/manage_home',
            component: 'Layout',
            name: 'manage_home',
            meta: {
              title: '首页管理',
              icon: 'Management',
              hidden: false,
            },
            children: [
              {
                path: '/manage_home/referral',
                name: 'referral',
                component: 'views/manage_home/referral',
                meta: {
                  title: '推荐管理',
                  icon: 'Star',
                  hidden: false,
                },
              },
              {
                path: '/manage_home/banner',
                name: 'banner',
                component: 'views/manage_home/banner',
                meta: {
                  title: 'banner管理',
                  icon: 'PictureFilled',
                  hidden: false,
                },
              },
            ],
          },
          {
            path: '/manage_system',
            component: 'Layout',
            name: 'manage_system',
            meta: {
              title: '系统管理',
              icon: 'TrendCharts',
              hidden: false,
            },
            children: [
              {
                path: '/manage_system/menu',
                name: 'menu',
                component: 'views/manage_system/menu',
                meta: {
                  title: '菜单管理',
                  icon: 'Menu',
                  hidden: false,
                },
              },
              {
                path: '/manage_system/user',
                name: 'user',
                component: 'views/manage_system/user',
                meta: {
                  title: '用户管理',
                  icon: 'UserFilled',
                  hidden: false,
                },
              },
            ],
          },
        ],
      };
    },
  },
] as MockMethod[];
