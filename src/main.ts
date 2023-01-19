import { createApp } from 'vue';
import App from './App.vue';

import HiCache from '@/core/utils/hiCache';
import HiStance from '@/core/utils/hiStance';

// tailwind css
import './assets/css/tailwind.css';

// element-plus
import 'element-plus/dist/index.css';
/**
 * 方便测试 此处只是方便调试多主题 真正的主题变更在App.vue中 核心文件在theme 借助css变量的方式来实现element的多主题
 * 这样做性能更快 也更方便 并且在开发环境下启动项目速度很快
 */
// import './styles/reset.scss';
// import './styles/elementPlus.scss';

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

// svg
import '@/core/utils/svg';

// 图片懒加载
import VueLazyLoad from 'vue3-lazyload';
import { Router } from 'vue-router';
import bootstrap from '@/core';
import logger from '@/core/utils/logger';
import useAppStore from '@/store/useAppStore';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.use(pinia).use(VueLazyLoad, {
    error: require('./assets/images/lazyload/404.jpg'),
    loading: require('./assets/images/lazyload/loading.svg'),
    log: false,
});

bootstrap(app)
    .then(() => {
        const appStore = useAppStore();

        appStore.getFrontEndLanguages().finally(async () => {
            // 设置多语言
            const i18nFunc = vueI18n(HiCache.getCache(HiStance.LANGUAGE));

            window.$t = i18nFunc.global.t;

            app.provide('mitt', mitt());

            app.use(i18nFunc)
                .use(router as Router)
                .mount('#app');

            logger.success('App start success...');
        });
    })
    .catch(err => {
        logger.error(`start error: ${err}`);
    });

// @ts-ignore
window.__app__ = app;
