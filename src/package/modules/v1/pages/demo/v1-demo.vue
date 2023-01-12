<!--
 * @author 胡小右
 * @date 2023-01-12 13:13:57
 * @desc demo
-->

<template>
    <div class="demo"></div>
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
            path: '/demo',
        },
    },
};
</script>
