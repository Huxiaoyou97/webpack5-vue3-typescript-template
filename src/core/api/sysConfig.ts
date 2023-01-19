export default {
    // 获取系统配置
    getSysConfig(data: any = {}) {
        return useSend({
            url: '/Account/GetSysConfig',
            method: 'post',
            data,
        });
    },

    // 获取多语言
    getFrontLanguages() {
        return useSend({
            url: '/Language/GetFrontLanguages',
            method: 'post',
        });
    },
};
