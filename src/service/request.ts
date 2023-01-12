import axios from 'axios';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import router from '@/router';

import md5 from 'nano-md5';
import queryString from 'query-string';
import { ElMessage } from 'element-plus';
import HiCache from '@/core/utils/hiCache';
import HiStance from '@/core/utils/hiStance';
import { Router } from 'vue-router';

NProgress.configure({
    showSpinner: false,
});

axios.defaults.timeout = 30000;
// axios.defaults.withCredentials = true
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

axios.defaults.withCredentials = true;

// 创建一个axios实例
const instance = axios.create({
    timeout: 50000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
});

// 请求队列
const requests: Array<Function> = [];

// Token 是否刷新中
const isRefreshing = false;
// 请求等待队列
const waitQueue: Array<Function> = [];

// 忽略规则
const ignore = {
    NProgress: ['/sys/info/record'],
};

// 数组中匹配单个字符串的方法
async function searchStr(value: string, list: string[]) {
    if (value) {
        const arr: string[] = [];
        for (const item of list) {
            if (item.indexOf(value) >= 0) {
                arr.push(item);
            }
        }

        return arr;
    }
}

export function getCookie(cookieName: string) {
    let cookieValue: any = null;
    let CookieList: string[] | [] = [];
    if (document.cookie) {
        if (document.cookie.includes('; ')) {
            CookieList = document.cookie.split('; ');
        } else if (document.cookie.includes('=')) {
            CookieList = [document.cookie];
        } else {
            CookieList = [];
        }
    }
    if (CookieList.length > 0) {
        for (let i = 0; i < CookieList.length; i++) {
            if (CookieList[i].includes('=')) {
                const itemName = CookieList[i].split('=')[0];
                if (cookieName === itemName) {
                    cookieValue = CookieList[i].split('=')[1];
                }
            }
        }
    }
    return cookieValue;
}

// 将 Object 转 str eg {a:1, b: 1} -> a=1&b=1
function formatObjectToString(obj: any = {}, url: string, method: string) {
    const arr: any[] = [];
    if (url.indexOf('?') !== -1 && method === 'get') {
        const urlHash = url.split('?')[1];
        obj = { ...obj, ...queryString.parse(urlHash) };
    }
    const newArray = Object.keys(obj).sort();
    newArray.forEach(item => {
        arr.push(`${item}=${obj[item]}`);
    });
    return arr.join('&');
}

// Request
instance.interceptors.request.use(
    async (config: any) => {
        // const userStore = useUserStore();
        //
        // const token =
        //   userStore.getToken || HiCache.getCache<string>(HiStance.TOKEN);

        // if (token ?? '' !== '') {
        //   config.headers.Authorization = `bearer ${token}`;
        // }

        if (config.url.includes('refreshToken')) {
            config.headers.Authorization = '';
        }

        config.headers.lang = HiCache.getCache<string>(HiStance.LANGUAGE) || 'zh-cn';
        config.headers.device = 'Pc';

        // 公共参数
        let data: any = {
            // timestamp: new Date().getTime(),
        };
        if (config.method == 'post') {
            data = {
                ...data,
                ...config.data,
            };
        } else if (config.method == 'get') {
            data = {
                ...data,
                ...config.params,
            };
        }

        if (config.method == 'post') {
            config.data = data;
        } else if (config.method == 'get') {
            config.params = data;
        }

        data.timestamp = new Date().getTime();

        config.headers.sign = md5(
            formatObjectToString(
                {
                    ...data,
                    device: config.headers.device,
                },
                config.url,
                config.method
            )
        );

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response
instance.interceptors.response.use(
    async response => {
        // NProgress.done();
        // 这里根据后台返回来设置
        const { code, data, msg } = response.data;
        if (code === 0 || code === 50) {
            return Promise.resolve(response.data);
        }
        return Promise.reject(msg);
    },
    async err => {
        NProgress.done();
        // const userStore = useUserStore();

        if (err.response) {
            switch (err.response.status) {
                case 400:
                    err.message = window.$t('components.text161');
                    break;
                case 401:
                    // 跳转到登录页
                    // await userStore.FedLogOut();
                    // Message.error('未授权，请重新登录')
                    err.message = window.$t('components.text162');
                    await (router as Router).replace('/');
                    break;
                case 403:
                    // 跳转到登录页
                    // await userStore.FedLogOut();
                    // Message.error('拒绝访问')
                    err.message = window.$t('components.text163');
                    await (router as Router).replace('/');
                    break;
                case 404:
                    err.message = window.$t('components.text164');
                    break;
                case 405:
                    err.message = window.$t('components.text165');
                    break;
                case 408:
                    err.message = window.$t('components.text166');
                    break;
                case 500:
                    // Message.error('服务器端异常')
                    err.message = window.$t('components.text167');
                    break;
                case 501:
                    err.message = window.$t('components.text168');
                    break;
                case 502:
                    err.message = window.$t('components.text169');
                    break;
                case 503:
                    err.message = window.$t('components.text170');
                    break;
                case 504:
                    err.message = window.$t('components.text171');
                    break;
                case 505:
                    err.message = window.$t('components.text172');
                    break;
                default:
                    err.message = window.$t('components.text173', {
                        value: err.response.status,
                    });
            }
            ElMessage.error(err.message);
        }
        return Promise.reject(err.message);
    }
);

export default instance;
