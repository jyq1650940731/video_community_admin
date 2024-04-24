import { MockMethod } from "vite-plugin-mock";

export default [
    {
        url: '/dev-api/router/menu',
        method: 'get',
        response(config) {
            if (config.headers['admin-token'] !== '1234') {
                return {
                    code: 1001,
                    success: false,
                    message: "token失效"
                }
            }
            return {
                success: true,
                message: '操作成功!',
                code: 200,
                result: [
                    {
                        path: '/',
                        component: 'layout',
                        redirect: 'home',
                        meta: {
                            requiresAuth: true,
                            title: '首页',
                            icon: 'user-filled'
                        },
                        children: [
                            {
                                path: 'home',
                                name: 'home',
                                component: '@/views/home/index',
                                meta: {
                                    title: '首页',
                                    icon: 'user-filled'
                                }
                            },
                            {
                                path: 'dashboard',
                                name: 'Dashboard',
                                component: '@/views/home/dashboard',
                                meta: {
                                    title: '看板',
                                    icon: 'dashboard-line'
                                }
                            },
                            {
                                path: 'workbench',
                                name: 'Workbench',
                                component: '@/views/home/workbench',
                                meta: {
                                    title: '工作台',
                                    icon: 'settings-6-line',
                                    dot: true
                                }
                            }
                        ]
                    },
                    {
                        path: 'home',
                        name: 'home',
                        component: '@/views/home/index',
                        meta: {
                            title: '首页',
                            icon: 'user-filled'
                        }
                    }
                ]
            }
        },
    }
] as MockMethod[];