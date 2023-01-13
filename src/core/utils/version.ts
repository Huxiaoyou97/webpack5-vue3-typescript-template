// 获取版本
import { getCookie } from '@/service/request';

const version = getCookie('pc_theme') || 'v1';

export default version;
