<!--
 * @author 胡小右
 * @date 2023-01-12 13:13:57
 * @desc demo
-->

<template>
    <div class="demo">demo --- {{ count }} --- {{ userinfo.username }}</div>

    <el-button @click="setCount(++count)">数字+1</el-button>
    <el-button @click="editUsername('李四')">修改名称</el-button>

    <el-button @click="getCode" :disabled="timerDisabled">{{ timerText }}</el-button>

    <router-link to="/test">跳转test</router-link>
</template>

<script lang="ts" setup>
import { onBeforeUnmount } from 'vue';

const { t } = useApp();
const [count, setCount] = useState(0);

const [userinfo, setUserinfo] = useState({
    username: '张三',
});

// 验证码倒计时函数案例
let timerInterval: NodeJS.Timer | null = null;
const [timer, setTimer] = useState(5);
const [timerText, setTimerText] = useState('获取验证码');
const [timerDisabled, setTimerDisabled] = useState(false);

function countdown() {
    console.log('执行 countdown');
    if (timer.value > 1) {
        setTimer(timer.value - 1);
        setTimerText(`${timer.value}秒后重新获取`);
        timerInterval = setTimeout(() => {
            countdown();
        }, 1000);
    } else {
        setTimer(5);
        setTimerText('获取验证码');
        setTimerDisabled(false);
        clearInterval(timerInterval);
    }
}

function getCode() {
    if (timerDisabled.value) return;
    setTimerDisabled(true);
    countdown();
}

onBeforeUnmount(() => {
    setTimer(5);
    setTimerText('获取验证码');
    setTimerDisabled(false);
    clearInterval(timerInterval);
});

function editUsername(name: string) {
    setUserinfo({
        ...userinfo,
        username: name,
    });
}
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
