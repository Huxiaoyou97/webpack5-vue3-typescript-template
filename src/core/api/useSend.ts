import request from '@/service/request';
import { baseUrl } from '@/config/env';

export default function useSend(options: any = {}): Promise<any> {
    if (!options.params) options.params = {};
    if (!options.data) options.data = {};

    // 处理 http
    if (options.url.indexOf('http') !== 0) {
        options.url = baseUrl + options.url;
    }

    return request(options);
}
