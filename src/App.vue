<!--
 * @author 胡小右
 * @date 2023-01-10 19:13:37
 * @desc
-->

<template>
  <h1>Vue</h1>
  <el-button type="primary">Primary</el-button>

  <router-view />
</template>

<script setup lang="ts">
console.log(process.env.VUE_BASE_URL, '------p');
</script>

<style scoped lang="scss"></style>
