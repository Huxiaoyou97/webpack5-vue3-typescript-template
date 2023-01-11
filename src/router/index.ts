import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
  RouteRecordRaw,
} from 'vue-router';
import { routerMode } from '@/config/env';

// 忽略规则
const ignore: any = {
  token: ['/login', '/403', '/404', '/500', '/502', '/cookie', '/tokenFailure'],
};

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home.vue'),
    // children: [
    //   {
    //     path: "/",
    //     name: "home",
    //     // component: () => import("@/views/home.vue"),
    //     component: () => homeComp,
    //     // redirect: "/index"
    //   }
    // ]
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
});

export default router;
export { ignore };
