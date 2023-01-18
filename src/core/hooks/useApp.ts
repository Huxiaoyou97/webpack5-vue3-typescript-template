import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ElNotification } from 'element-plus';
import { Emitter } from 'mitt';
import { inject, UnwrapRef } from 'vue';
import { $ref, RefValue } from 'vue/macros';

// 全局状态管理
import useAppStore from '@/store/useAppStore';

export default function useApp() {
    const route = useRoute();
    const router = useRouter();
    const { locale, t } = useI18n();
    const mitt: Emitter<any> = inject<any>('mitt');

    const appStore = useAppStore();

    // function useState2<T>(initial: T): [RefValue<UnwrapRef<T>>, (value: T) => void] {
    //     let state = $ref(initial);
    //
    //     const updater = (newValue: T): void => {
    //         state = newValue as RefValue<UnwrapRef<T>>;
    //     };
    //
    //     return [state, updater];
    // }

    return {
        route,
        router,
        locale,
        t,
        mitt,

        appStore,

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
