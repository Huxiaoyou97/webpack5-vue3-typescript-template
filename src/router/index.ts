import { createRouter, createWebHistory, createWebHashHistory, RouteRecordRaw, Router } from 'vue-router';
import { routerMode } from '@/config/env';
import { HRouter } from '@/core/types';
import version from '@/core/utils/version'; // 可以更改当前版本

// 忽略规则
const ignore: any = {
    token: ['/login', '/403', '/404', '/500', '/502', '/cookie', '/tokenFailure'],
};

const layoutCompMap = {
    v1: import(/* webpackChunkName: "layout" */ '@/pages/layout-v1/index.vue'),
    v2: import(/* webpackChunkName: "layout" */ '@/pages/layout-v2/index.vue'),
};

const homeCompMap = {
    v1: import(/* webpackChunkName: "home" */ '@/views/v1/home.vue'),
    v2: import(/* webpackChunkName: "home" */ '@/views/v2/home.vue'),
};

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'index',
        component: () => layoutCompMap[version],
        children: [
            {
                path: '/',
                name: 'home',
                component: () => homeCompMap[version],
                // redirect: "/index"
            },
            ...require(`./dict/${version}`)[`${version}Views`],
            // {
            //     path: '/test',
            //     name: 'test',
            //     component: () => import(/* webpackChunkName: "v2Test" */ '@component/v2/views/v2-test.vue'),
            // },
        ],
    },
    {
        path: '/:catchAll(.*)',
        name: 'index2',
        redirect: '/',
    },
    ...require(`./dict/${version}`)[`${version}Pages`],
];

const router = createRouter({
    history: routerMode === 'history' ? createWebHistory() : createWebHashHistory(),
    routes,
}) as HRouter | Router;

export default router;
export { ignore };
