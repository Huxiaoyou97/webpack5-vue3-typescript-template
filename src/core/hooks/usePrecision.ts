/**
 * @author 胡小右
 * @date 2022-06-17 19:48:46
 * @desc 数学高精度计算封装,常用正则表达式
 */
import { getDivide, getMinus, getPlus, getTimes, myRegExp, toFixedTwoNum } from '@/core/utils/precision';

export default function usePrecision() {
    return {
        toFixedTwoNum,
        getPlus,
        getMinus,
        getTimes,
        getDivide,
        myRegExp,
    };
}
