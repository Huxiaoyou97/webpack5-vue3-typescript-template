import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw,
  Router,
} from 'vue-router';
import { routerMode } from '@/config/env';
import { HRouter } from '@/core/types';

// 忽略规则
const ignore: any = {
  token: ['/login', '/403', '/404', '/500', '/502', '/cookie', '/tokenFailure'],
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () =>
      import(/* webpackChunkName: "layout" */ '@/pages/layout-v1/index.vue'),
    children: [
      {
        path: '/',
        name: 'home',
        component: () =>
          import(/* webpackChunkName: "home" */ '@/views/home.vue'),
        // redirect: "/index"
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    name: 'index2',
    redirect: '/',
  },
];

const router = createRouter({
  history:
    routerMode === 'history' ? createWebHistory() : createWebHashHistory(),
  routes,
}) as HRouter | Router;

export default router;
export { ignore };
