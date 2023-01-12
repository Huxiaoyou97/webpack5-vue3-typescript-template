<!--
 * @author 胡小右
 * @date 2023-01-10 19:13:37
 * @desc
-->

<template>
    <el-config-provider :locale="providerLocal">
        <router-view />
    </el-config-provider>
</template>

<script setup lang="ts">
import version from '@/core/utils/version';
import theme from '@/theme';

import zhCN from 'element-plus/lib/locale/lang/zh-cn';
import En from 'element-plus/lib/locale/lang/en';
import Pt from 'element-plus/lib/locale/lang/pt';
import { colorMix } from '@/theme/tool';
import useApp from '@/core/hooks/useApp';
import { computed, ref } from 'vue';
import logger from '@/core/utils/logger';

const { locale, t } = useApp();
const providerLocal = computed({
    get() {
        return chanLocal();
    },
    set(val) {
        return val;
    },
});

function chanLocal() {
    switch (locale.value) {
        case 'zh-cn':
            return zhCN;
        case 'en':
            return En;
        case 'pt':
            return Pt;
    }
}

// 根据版本初始化对应的主题色
const themeObj = ref<any>({});

function installTheme() {
    const v = version ?? 'base';
    themeObj.value = theme[v];

    getsTheColorScale();

    // 设置css 变量
    Object.keys(themeObj.value).map(item => {
        document.documentElement.style.setProperty(item, themeObj.value[item]);
    });
}

// 需要动态颜色的函数
installTheme();

// 获取色阶
function getsTheColorScale() {
    const colorList = ['primary', 'success', 'warning', 'danger', 'error', 'info'];
    const prefix = '--el-color-';
    colorList.map(colorItem => {
        for (let i = 1; i < 10; i += 1) {
            if (i === 2) {
                // todo 深色变量生成未完成 以基本色设置
                themeObj.value[`${prefix}${colorItem}-dark-${2}`] = colorMix(themeObj.value[`${prefix}black`], themeObj.value[`${prefix}${colorItem}`], 1);
            } else {
                themeObj.value[`${prefix}${colorItem}-light-${10 - i}`] = colorMix(themeObj.value[`${prefix}white`], themeObj.value[`${prefix}${colorItem}`], i * 0.1);
            }
        }
    });
}
</script>

<style lang="scss"></style>
