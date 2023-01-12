/**
 * @author 胡小右
 * @date 2022-06-17 19:42:51
 * @desc Storage缓存管理封装
 */

class storage {
    setCache<T = any>(key: string, value: T): boolean;

    setCache<T = any>(key: string, value: T, localOrSessionStorage: boolean): boolean;

    /**
     * 设置缓存
     * @param key
     * @param value
     * @param localOrSessionStorage true => localStorage 默认就是true  如果需要使用sessionStorage 需要传递该参数 false
     * @returns
     */
    setCache<T = any>(key: string, value: T, localOrSessionStorage = true): boolean {
        try {
            const val = JSON.stringify(value);
            if (localOrSessionStorage) {
                window.localStorage.setItem(key, val);
            } else {
                window.sessionStorage.setItem(key, val);
            }
        } catch (error) {
            return false;
        }
        return true;
    }

    getCache<T = any>(key: string): T;

    getCache<T = any>(key: string, localOrSessionStorage: boolean): T;

    /**
     *
     * @param key 获取缓存
     * @param localOrSessionStorage
     * @returns
     */
    getCache<T>(key: string, localOrSessionStorage = true): T {
        let res: any;
        if (localOrSessionStorage) {
            const val = window.localStorage.getItem(key);

            // 判断有没有引号
            if (val && val.includes('"')) {
                res = JSON.parse(val);
            } else {
                res = val;
            }
        }
        const val = window.sessionStorage.getItem(key);
        if (val) {
            // 判断有没有引号
            if (val && val.includes('"')) {
                res = JSON.parse(val);
            } else {
                res = val;
            }
        }
        return res as T;
    }

    deleteCache(key: string): void;

    deleteCache(key: string, localOrSessionStorage: boolean): void;

    deleteCache(key: string, localOrSessionStorage = true): void {
        if (localOrSessionStorage) window.localStorage.removeItem(key);
        else window.sessionStorage.removeItem(key);
    }

    clearCache(): void;

    clearCache(localOrSessionStorage: boolean): void;

    clearCache(localOrSessionStorage = true): void {
        if (localOrSessionStorage) window.localStorage.clear();
        else window.sessionStorage.clear();
    }
}

const HiCache = new storage();
export default HiCache;
