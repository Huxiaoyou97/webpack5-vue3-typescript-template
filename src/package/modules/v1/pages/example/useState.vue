<!--
 * @author 胡小右
 * @date 2023-01-19 18:22:44
 * @desc useState的使用demo
-->

<template>
    <div class="example-useState">
        <el-button @click="setCounter(++counter)">点击+1: {{ counter }}</el-button>

        <el-button :disabled="timerDisabled" @click="getCode">{{ timerText }}</el-button>

        <div>{{ userinfo }} <el-button @click="editUsername('李四')">修改名称为 李四</el-button></div>
    </div>
</template>

<script lang="ts" setup>
const [counter, setCounter] = useState(0);

const { t, appStore } = useApp();

interface UserInfo {
    username?: string;
    age: number;
}

const [userinfo, setUserinfo] = useState<UserInfo>({
    username: '张三',
    age: 18,
});

function editUsername(name: string) {
    setUserinfo({
        ...userinfo.value,
        username: name,
    });
}

// 验证码倒计时函数案例
let timerInterval: NodeJS.Timer | null = null;
const [timer, setTimer] = useState(5);
const [timerText, setTimerText] = useState('获取验证码');
const [timerDisabled, setTimerDisabled] = useState(false);

function countdown() {
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
</script>

<style scoped lang="scss"></style>
