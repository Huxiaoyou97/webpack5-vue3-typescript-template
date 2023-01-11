/**
 * @author 胡小右
 * @date 2022-06-17 19:46:00
 * @desc 精确加法 plus 精确减法 minus 精确乘法 times  精确除法 divide 包含部分正则表达式
 */
import NP, { plus, minus, times, divide } from 'number-precision';

NP.enableBoundaryChecking(false);

/**
 * @author: 胡小右
 * @description: '截取两位小数'
 * @params: num:number | string
 * @date: 2021/11/15 2:20 下午
 */
export function toFixedTwoNum(num: number | string) {
  return divide(Math.floor(times(num || 0, 100)), 100).toFixed(2);
}

/**
 * @author: 胡小右
 * @description: '加法'
 * @params: num1:string|number,num2:string | number
 * @date: 2021/11/15 2:23 下午
 */
export function getPlus(num1: string | number, num2: string | number) {
  return plus(num1, num2);
}

/**
 * @author: 胡小右
 * @description: '减法'
 * @params: num1:string|number,num2:string | number
 * @date: 2021/11/15 2:24 下午
 */
export function getMinus(num1: string | number, num2: string | number) {
  return minus(num1, num2);
}

/**
 * @author: 胡小右
 * @description: '乘法'
 * @params: num1: string | number, num2: string | number
 * @date: 2021/11/15 2:26 下午
 */
export function getTimes(num1: string | number, num2: string | number) {
  return times(num1, num2);
}

/**
 * @author: 胡小右
 * @description: '除法，num2为0时默认return 0'
 * @params: num1: string | number, num2: string | number
 * @date: 2021/11/15 2:27 下午
 */
export function getDivide(num1: string | number, num2: string | number) {
  if (Number(num2) !== 0) {
    return divide(num1, num2);
  }
  return 0;
}

/**
 * @author: 胡小右
 * @description: '检查是否为合法的QQ号,手机号,Email,身份证,邮政编码,URL,IP地址,去掉前后空格,日期格式,数字,中文'
 * @params: {(string)=>boolean}
 * @date: 2021/11/17 9:59 上午
 */

export const myRegExp = {
  // 检查字符串是否为合法QQ号码
  isQQ(str: string) {
    // 1 首位不能是0  ^[1-9]
    // 2 必须是 [5, 11] 位的数字  \d{4, 9}
    const reg = /^[1-9][0-9]{4,9}$/gim;
    if (reg.test(str)) {
      console.log('QQ号码格式输入正确');
      return true;
    }
    console.log('请输入正确格式的QQ号码');
    return false;
  },
  // 检查字符串是否为合法手机号码
  isPhone(str: string) {
    const reg =
      /^(0|86|17951)?(13[0-9]|15[012356789]|18[0-9]|14[57]|17[678])[0-9]{8}$/;
    if (reg.test(str)) {
      console.log('手机号码格式输入正确');
      return true;
    }
    console.log('请输入正确格式的手机号码');
    return false;
  },
  // 检查字符串是否为合法Email地址
  isEmail(str: string) {
    const reg =
      /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
    // const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    if (reg.test(str)) {
      console.log('Email格式输入正确');
      return true;
    }
    console.log('请输入正确格式的Email');
    return false;
  },
  // 检查字符串是否是数字
  isNumber(str: string) {
    const reg = /^\d+$/;
    if (reg.test(str)) {
      console.log(`${str}是数字`);
      return true;
    }
    console.log(`${str}不是数字`);
    return false;
  },
  // 去掉前后空格
  trim(str: string) {
    const reg = /^\s+|\s+$/g;
    return str.replace(reg, '');
  },
  // 检查字符串是否存在中文
  isChinese(str: string) {
    const reg = /[\u4e00-\u9fa5]/gm;
    if (reg.test(str)) {
      console.log(`${str} 中存在中文`);
      return true;
    }
    console.log(`${str} 中不存在中文`);
    return false;
  },
  // 检查字符串是否为合法邮政编码
  isPostcode(str: string) {
    // 起始数字不能为0，然后是5个数字  [1-9]\d{5}
    const reg = /^[1-9]\d{5}$/g;
    // const reg = /^[1-9]\d{5}(?!\d)$/;
    if (reg.test(str)) {
      console.log(`${str} 是合法的邮编格式`);
      return true;
    }
    console.log(`${str} 是不合法的邮编格式`);
    return false;
  },
  // 检查字符串是否为合法身份证号码
  isIDcard(str: string) {
    const reg =
      /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
    if (reg.test(str)) {
      console.log(`${str} 是合法的身份证号码`);
      return true;
    }
    console.log(`${str} 是不合法的身份证号码`);
    return false;
  },
  // 检查字符串是否为合法URL
  isURL(str: string) {
    const reg =
      /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i;
    if (reg.test(str)) {
      console.log(`${str} 是合法的URL`);
      return true;
    }
    console.log(`${str} 是不合法的URL`);
    return false;
  },
  // 检查字符串是否为合法日期格式 yyyy-mm-dd
  isDate(str: string) {
    const reg = /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/;
    if (reg.test(str)) {
      console.log(`${str} 是合法的日期格式`);
      return true;
    }
    console.log(`${str} 是不合法的日期格式，yyyy-mm-dd`);
    return false;
  },
  // 检查字符串是否为合法IP地址
  isIP(str: string) {
    // 1.1.1.1  四段  [0 , 255]
    // 第一段不能为0
    // 每个段不能以0开头
    //
    // 本机IP: 58.50.120.18 湖北省荆州市 电信
    const reg =
      /^([1-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])(\.([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])){3}$/gi;
    if (reg.test(str)) {
      console.log(`${str} 是合法的IP地址`);
      return true;
    }
    console.log(`${str} 是不合法的IP地址`);
    return false;
  },
  // 判断字符串长度
  isLength(str: string, minLength: number, maxLength: number) {
    return !(str.length < minLength || str.length > maxLength);
  },
  // 检验只能是数字，字母或者特殊字符
  isPassword: function passWord(str: string) {
    const reg = /[A-Z]/gi; // 存在大小写字母
    const reg1 = /[\s]/g; // 存在空字符
    const reg2 = /[0-9]/g; // 存在为数字
    const reg3 = /[!@#$.]/g; // 存在以下特殊字符
    const reg4 = /[\u4e00-\u9fa5]/gi; // 存在中文
    return (
      str !== '' &&
      !reg1.test(str) &&
      !reg4.test(str) &&
      (reg.test(str) || reg2.test(str) || reg3.test(str))
    );
  },
};
