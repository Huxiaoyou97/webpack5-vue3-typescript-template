<!--
 * @author 胡小右
 * @date 2023-01-11 15:16:06
 * @desc
-->

<template>
    <h1>V2版本的Home {{ $t('语言') }}</h1>

    <router-link to="/test">跳转test</router-link>

    <br />

    <el-button type="danger">按钮</el-button>

    <img style="width: 200px; height: 200px" v-lazy="`https://img1.baidu.com/it/u=1026360805,1567430550&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800`" alt="" />
</template>

<script setup lang="ts"></script>

<style scoped lang="scss"></style>
