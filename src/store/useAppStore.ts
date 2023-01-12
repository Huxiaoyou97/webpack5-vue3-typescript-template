import { defineStore } from 'pinia';

const useAppStore = defineStore('app', {
    state: () => ({
        appName: 'webpack 初始化架构',
    }),
    getters: {
        getAppName: state => state.appName,
    },
    actions: {
        setAppName(name) {
            this.appName = name;
        },
    },
});

export default useAppStore;
