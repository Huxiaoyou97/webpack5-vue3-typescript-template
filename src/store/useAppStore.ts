import { defineStore } from 'pinia';

import { SystemDataType } from '@/store/types/app';
import HiCache from '@/core/utils/hiCache';
import HiStance from '@/core/utils/hiStance';

interface AppStoreStateType {
    appName: string;
    timeDiff: number;
    systemData: SystemDataType | null;
}

const useAppStore = defineStore('app', {
    state: (): AppStoreStateType => ({
        appName: 'webpack 初始化架构',
        timeDiff: 0,
        systemData: null,
    }),
    getters: {
        getAppName: (state: AppStoreStateType) => state.appName,
        getSystemData: (state: AppStoreStateType) => state.systemData,
    },
    actions: {
        setAppName(name) {
            this.appName = name;
        },

        // 获取多语言配置
        getFrontEndLanguages() {
            return new Promise(async (resolve, reject) => {
                const result = await sysConfig.getFrontLanguages();
                const { code, data } = result;
                if (code === 0 && Array.isArray(data) && data.length > 0) {
                    if (data.length > 1) {
                        for (const item of data) {
                            if (Number(item.is_default) === 1) {
                                HiCache.setCache<any>(HiStance.LANGUAGE, item.value);
                                resolve(code);
                            }
                        }
                    } else {
                        // HiCache.setCache<any>(HiStance.LANGUAGE, data[0].value);
                        // resolve(code);

                        // TODO 临时修改
                        HiCache.setCache<any>(HiStance.LANGUAGE, 'zh-cn');
                        resolve(code);
                    }
                } else {
                    reject();
                }
            });
        },

        // 获取系统配置
        async handleGetSystemData() {
            try {
                const result = await sysConfig.getSysConfig();

                if (result.code === 0) {
                    const { data } = result;

                    if (data.timestamp) {
                        this.timeDiff = (data.timestamp * 1000 - Date.now()) as number;
                    }

                    this.systemData = data;
                    return result.data;
                }
            } catch (e) {
                await Promise.reject(e);
            }
        },
    },
});

export default useAppStore;
