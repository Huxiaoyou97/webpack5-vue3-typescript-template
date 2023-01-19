// 路由模式
const routerMode: String = 'history';

// 开发模式
const isDev: Boolean = process.env.NODE_ENV === 'development';

// 请求地址
const baseUrl: string = (() => {
    return isDev ? `/api` : `http://192.168.80.40/api`;
})();

export { routerMode, isDev, baseUrl };
