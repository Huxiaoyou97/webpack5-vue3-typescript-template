/**
 * @author 胡小右
 * @date 2023-01-12 13:39:16
 * @desc 日志工具类
 */
export default {
    info(text: string) {
        console.log(text);
    },
    success(text: string) {
        console.log(`%c ${text} `, 'color: #00c48f; font-size: 14px; background: #000; font-weight: bold;');
    },
    warning(text: string) {
        console.log(`%c ${text} `, 'color: #ff9800; font-size: 14px; background: #000; font-weight: bold;');
    },
    error(text: string) {
        console.log(`%c ${text} `, 'color: #f44336; font-size: 14px; background: #000; font-weight: bold;');
    },
    title(text: string) {
        console.log(`%c ${text} `, 'color: #409eff; font-size: 14px; background: #000; font-weight: bold;');
    },
};
