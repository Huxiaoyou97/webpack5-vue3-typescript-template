<!--
 * @author 胡小右
 * @date 2023-01-12 13:13:57
 * @desc demo
-->

<template>
    <div class="demo">demo --- {{ count }}</div>

    <el-button @click="setCount(++count)">click</el-button>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';

const { t } = useApp();
const [count, setCount] = useState(0);
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
