<!--
 * @author 胡小右
 * @date 2023-01-19 18:21:01
 * @desc 消息提示的demo
-->

<template>
    <div class="example-message"></div>
</template>

<script lang="ts" setup>
const { locale, t, appStore, $baseNotify, $baseAlert, $baseMessage, $baseConfirm, $basePrompt } = useApp();

// 右上角通知
$baseNotify('success', 'success', 'success');

// 中间弹窗提示
$baseAlert('success', 'success', () => {
    // 点击确定或者x的回调
    console.log('success');
});

// 顶部通知信息
$baseMessage('success', 'success');

// 确认框
$baseConfirm(
    'success',
    'success',
    () => {
        console.log('点击确定');
    },
    () => {
        console.log('点击取消');
    },
    '确定1',
    '取消2'
);

// 输入框
$basePrompt(
    'success',
    'success',
    () => {
        console.log('点击确定');
    },
    () => {
        console.log('点击取消');
    },
    {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '请输入',
        inputPattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/,
        inputErrorMessage: '请输入正确的内容',
    }
);
</script>

<style scoped lang="scss"></style>
