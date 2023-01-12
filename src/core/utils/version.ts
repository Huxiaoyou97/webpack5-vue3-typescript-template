function getCookie(cookieName: string) {
    let cookieValue: any = null;
    let CookieList: string[] | [] = [];
    if (document.cookie) {
        if (document.cookie.includes('; ')) {
            CookieList = document.cookie.split('; ');
        } else if (document.cookie.includes('=')) {
            CookieList = [document.cookie];
        } else {
            CookieList = [];
        }
    }
    if (CookieList.length > 0) {
        for (let i = 0; i < CookieList.length; i++) {
            if (CookieList[i].includes('=')) {
                const itemName = CookieList[i].split('=')[0];
                if (cookieName === itemName) {
                    cookieValue = CookieList[i].split('=')[1];
                }
            }
        }
    }
    return cookieValue;
}

// 获取版本  默认base
const version = getCookie('pc_theme') || 'v2';

export default version;
