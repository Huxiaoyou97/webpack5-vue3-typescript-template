import { createApp } from 'vue';
import App from './App.vue';

import HiCache from '@/core/utils/hiCache';
import HiStance from '@/core/utils/hiStance';

// tailwind css
import './assets/css/tailwind.css';

// element-plus
import 'element-plus/dist/index.css';

// element-plus icon
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

// pinia
import pinia from './store';

// router
import router from './router';

// i18n
import vueI18n from './core/i18n';

// mitt
import mitt from 'mitt';

// 图片懒加载
import VueLazyLoad from 'vue3-lazyload';
import { Router } from 'vue-router';
import bootstrap from '@/core';

// 设置多语言
const i18nFunc = vueI18n(HiCache.getCache(HiStance.LANGUAGE) || 'zh-cn');
window.$t = i18nFunc.global.t;

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app
  .use(pinia)
  .use(i18nFunc)
  .use(VueLazyLoad, {
    error: require('./assets/images/lazyload/404.jpg'),
    loading: require('./assets/images/lazyload/loading.svg'),
    log: false,
  });

bootstrap(app)
  .then(() => {
    app.provide('mitt', mitt());

    app.use(router as Router).mount('#app');

    console.log('启动成功');
  })
  .catch(err => {
    console.error(`启动失败`, err);
  });

// @ts-ignore
window.__app__ = app;
