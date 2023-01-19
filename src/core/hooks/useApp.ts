import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ElNotification } from 'element-plus';
import { Emitter } from 'mitt';
import { inject } from 'vue';

// 全局状态管理
import useAppStore from '@/store/useAppStore';

import { gp } from '@/core/utils/message';

export default function useApp() {
    const route = useRoute();
    const router = useRouter();
    const { locale, t } = useI18n();
    const mitt = inject<Emitter<any>>('mitt');

    const appStore = useAppStore();

    return {
        route,
        router,
        locale,
        t,
        mitt,

        appStore,

        $baseNotify: gp.$baseNotify,

        $baseAlert: gp.$baseAlert,

        $baseMessage: gp.$baseMessage,

        $baseConfirm: gp.$baseConfirm,

        $basePrompt: gp.$basePrompt,

        notice(message: any, type: 'success' | 'warning' | 'info' | 'error' = 'success', title = '') {
            let data: any = {
                message,
                type,
            };
            if (!title) {
                data = {
                    ...data,
                    duration: 2000,
                };
            } else {
                data = {
                    title,
                    ...data,
                    duration: 2000,
                };
            }

            ElNotification(data);
        },
    };
}
