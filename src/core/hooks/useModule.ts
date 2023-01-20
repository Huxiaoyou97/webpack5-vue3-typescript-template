import all from '@/package';
import router from '@/router';
import { deepMerge, isFunction, isObject, isEmpty } from '../utils';
import version from '@/core/utils/version';
import { App } from 'vue';
import { Router } from 'vue-router';
import { HRouter } from '@/core/types';

// 模块列表
const modules: any[] = [...all.modules];

export function removeEmpty(arr: any) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] == '' || typeof arr[i] == 'undefined') {
            arr.splice(i, 1);
            i -= 1;
        }
    }
    return arr;
}

async function useModule(app: App) {
    // 安装模块
    function install(mod: any) {
        const { directives, components, pages, views, name } = mod;

        try {
            // 注册组件
            if (components) {
                for (const i in components) {
                    if (components[i]) {
                        if (components[i].app?.global || i.indexOf('xb-') === 0) {
                            app.component(components[i].name, components[i]);
                        }
                    }
                }
            }

            // 注册指令
            if (directives) {
                for (const i in directives) {
                    app.directive(i, directives[i]);
                }
            }

            // 注册页面
            if (pages) {
                pages.forEach((e: any) => {
                    if (e) {
                        (router as Router).addRoute(e);
                    }
                });
            }

            // 注册视图
            if (views) {
                const getArr = views.map((item: any) => {
                    const newArr: any[] = [];
                    views.forEach((e: any) => {
                        const name = e.parent || null;
                        if (name && item.path === name) {
                            newArr.push(e);
                        }
                    });

                    if (!item.parent) {
                        if (newArr.length > 0) {
                            item.children = newArr;
                        }
                        return item;
                    }
                    return null;
                });

                getArr.forEach((e: any) => {
                    if (e == null) return;
                    if (e && !e.meta) {
                        e.meta = {};
                    }
                    if (e && e.path) {
                        console.log(e, '-------e');
                        (router as HRouter).$plugin?.addViews([e]);
                    } else {
                        console.error(`[${name}-views]：缺少 path 参数`);
                    }
                });
            }
        } catch (e) {
            console.error(`模块 ${name} 异常`, e);
        }
    }

    // @ts-ignore
    const f = require.context('../../package/modules', true, /\.vue$|\.tsx$/);
    const files = f.keys();

    const pagesViews: any[] = [];

    for (const i of files) {
        const value: any = f(i).default;
        const [, name, fn, cname, fname, fname2, fname3, fname4] = i.split('/');

        if (fn === 'pages' || fn === 'views') {
            let path: any = null;
            if (value.app) {
                if (value.app.route instanceof Array) {
                    path = value.app.route[0].path;
                } else {
                    path = value.app.route.path;
                }
            }

            const parent = value.app ? value.app.parent : null;
            if (cname && (cname.includes('.vue') || cname.includes('.tsx'))) {
                // pagesViews[cname] = value
                pagesViews.push({
                    i: value.__file,
                    newI: i,
                    m: name,
                    path,
                    name: cname,
                    parent,
                    value: f(i),
                });
            }

            if (fname && (fname.includes('.vue') || fname.includes('.tsx'))) {
                pagesViews.push({
                    i: value.__file,
                    newI: i,
                    m: name,
                    path,
                    name: fname,
                    parent,
                    value: f(i),
                });
            }

            if (fname2 && (fname2.includes('.vue') || fname2.includes('.tsx'))) {
                pagesViews.push({
                    i: value.__file,
                    newI: i,
                    m: name,
                    path,
                    name: fname2,
                    parent,
                    value: f(i),
                });
            }

            if (fname3 && (fname3.includes('.vue') || fname3.includes('.tsx'))) {
                pagesViews.push({
                    i: value.__file,
                    newI: i,
                    m: name,
                    path,
                    name: fname3,
                    parent,
                    value: f(i),
                });
            }

            if (fname4 && (fname4.includes('.vue') || fname4.includes('.tsx'))) {
                pagesViews.push({
                    i: value.__file,
                    newI: i,
                    m: name,
                    path,
                    name: fname4,
                    parent,
                    value: f(i),
                });
            }
        } else {
            pagesViews.push({
                i: value.__file,
                newI: i,
                m: name,
                path: null,
                name: null,
                value: f(i),
            });
        }
    }

    // @ts-ignore
    const res = await import('../../../version.json');
    const versionJson = res.default;

    const list = pagesViews;

    for (let i = 0; i < list.length; i++) {
        const item = list[i];

        if (versionJson[item.path]) {
            const l = versionJson[item.path];
            if (l[item.name]) {
                const val = l[item.name];

                if (!val.includes(version)) {
                    delete pagesViews[i];
                }
            }
        }
    }

    removeEmpty(pagesViews);

    const files2: any = {};

    for (const item of pagesViews) {
        files2[item.newI] = item['value'];
    }

    for (const i in files2) {
        const [, name, fn, cname] = i.split('/');
        const value: any = files2[i].default;
        const fname: string = (cname || '').split('.')[0];

        function next(d: any) {
            // 配置参数入口
            if (fn == 'config.ts') {
                d.options = value || {};
            }

            // 模块入口
            if (fn == 'en.ts') {
                if (value) {
                    // 阻止往下加载
                    d.isLoaded = true;

                    // 之前
                    d._beforeFn = (e: any) => {
                        if (e.components) {
                            for (const i in e.components) {
                                // 全局注册
                                e.components[i].app = {
                                    global: true,
                                };
                            }
                        }
                    };

                    d.value = value;

                    return d;
                }
            }
            // 其他功能
            switch (fn) {
                case 'service':
                    // d._services.push({
                    //     path: i.replace(`/src/package/modules/${name}/service`, `${name}`),
                    //     value: new value()
                    // });
                    break;

                case 'pages':
                    if (value.app) {
                        if (value.app.route instanceof Array) {
                            value.app.route.forEach((e: any) => {
                                d[fn].push({
                                    ...e,
                                    component: value,
                                });
                            });
                        } else {
                            d[fn].push({
                                ...value.app.route,
                                component: value,
                            });
                        }
                    }
                    break;
                case 'views':
                    if (value.app) {
                        if (value.app.route instanceof Array) {
                            value.app.route.forEach((e: any) => {
                                d[fn].push({
                                    ...e,
                                    component: value,
                                });
                            });
                        } else {
                            d[fn].push({
                                ...value.app.route,
                                // component: () => import(`../../package/modules/${name}/views/${fname}.vue`),
                                component: value,
                            });
                        }
                    }
                    break;

                case 'components':
                    d.components[value.name] = value;
                    break;

                case 'store':
                    d.store[fname] = value;
                    break;

                case 'directives':
                    d.directives[fname] = value;
                    break;
            }

            return d;
        }

        const item: any = modules.find(e => e.name === name);

        if (item) {
            if (!item.isLoaded) {
                next(item);
            }
        } else {
            modules.push(
                next({
                    name,
                    options: {},
                    directives: {},
                    components: {},
                    pages: [],
                    views: [],
                    store: {},
                    _services: [],
                })
            );
        }
    }

    // 模块安装
    modules.forEach((e: any) => {
        if (!isEmpty(e._services)) {
            // e.service = deepFiles(e._services);
        }

        if (isObject(e.value)) {
            if (isFunction(e.value.install)) {
                Object.assign(e, e.value.install(app, e.options));
            } else {
                Object.assign(e, e.value);
            }
        }

        if (e._beforeFn) {
            e._beforeFn(e);
        }

        install(e);
    });
}

export default useModule;
