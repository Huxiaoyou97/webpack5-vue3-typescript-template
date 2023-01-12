<!--
 * @author 胡小右
 * @date 2023-01-11 21:46:32
 * @desc test
-->

<template>
    <xb-page>
        <div class="test">v1 test page</div>

        <router-link to="/demo">跳转demo</router-link>
    </xb-page>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import useApp from '@/core/hooks/useApp';

const { t } = useApp();
</script>

<style scoped lang="scss"></style>

<script lang="ts">
export default {
    app: {
        route: {
            path: '/test',
        },
    },
};
</script>
