import { createI18n } from 'vue-i18n';

import zhCn from './locale/zh-cn.json';
import en from './locale/en.json';
import pt from './locale/pt.json';

export default (i18n): any => {
  return createI18n({
    legacy: false,
    locale: i18n || 'en',
    fallbackLocale: 'en',
    globalInjection: true,
    messages: {
      'zh-cn': zhCn,
      en,
      pt,
    },
  });
};
