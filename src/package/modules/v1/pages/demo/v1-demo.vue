<!--
 * @author 胡小右
 * @date 2023-01-12 13:13:57
 * @desc demo
-->

<template>
    <div class="demo">
        {{ user.name }} --- {{ count }}

        {{ appStore.appName }}
    </div>
</template>

<script lang="ts" setup>
// import { ref, reactive } from 'vue';
const { t, notice, appStore } = useApp();

const count = ref(1);
const user = reactive({
    name: '胡小右',
});
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
