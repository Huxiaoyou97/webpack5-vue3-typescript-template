<!--
 * @author 胡小右
 * @date 2023-01-12 15:29:20
 * @desc icon
-->

<template>
    <svg :class="svgClass" :style="style" aria-hidden="true">
        <use :xlink:href="iconName" />
    </svg>
</template>

<script lang="ts" setup>
import { ref, reactive, defineProps, computed } from 'vue';
import useApp from '@/core/hooks/useApp';
import { isNumber } from '@/core/utils';

const { t } = useApp();
const props = defineProps({
    name: {
        type: String,
    },
    className: {
        type: String,
    },
    size: {
        type: [String, Number],
    },
});

const style = ref<any>({
    fontSize: isNumber(props.size) ? `${props.size}px` : props.size,
});

const iconName = computed<string>(() => `#icon-${props.name}`);
const svgClass = computed<Array<string>>(() => {
    return ['icon-svg', `icon-svg__${props.name}`, String(props.className || '')];
});
</script>

<style scoped lang="scss">
.icon-svg {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>
