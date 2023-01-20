<!--
 * @author 胡小右
 * @date 2023-01-11 21:46:32
 * @desc test
-->

<template>
    <xb-page>
        <div class="test">v1 test page</div>
        <router-link to="/example-message">跳转 message demo页面</router-link>
        <br />
        <router-link to="/example-useState">跳转 useState demo页面</router-link>
    </xb-page>
</template>

<script lang="ts" setup>
const { t } = useApp();
</script>

<style scoped lang="scss"></style>
