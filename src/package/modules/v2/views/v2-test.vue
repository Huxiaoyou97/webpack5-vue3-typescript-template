<!--
 * @author 胡小右
 * @date 2023-01-11 21:46:48
 * @desc test
-->

<template>
    <div class="test">v2 test page</div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';

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
