/**
 * 全局方法
 * by cyy zb
 * 2018 12 13
 */
let commonAction = {
    /**
     * @param  获取URL传参并转化为数组，支持指定参数获取
     */
    getParam: (key) => {
        let ser = location.search;
        if (ser) {
            let arrays = ser.substring(1).split('&');
            let params = {};
            arrays.forEach(function(v, k) {
                let a = v.split('=');
                params[a[0]] = a[1];
            });
            if (key) {
                return params[key];
            }
            return params;
        }
    },
    /**
     * 存储sessionStorage
     */
    setStorage: (key, data) => {
        let value = JSON.stringify(data);
        let name = commonConfig.sessionStore[key];
        sessionStorage.setItem(name, value);
    },

    /**
     * 获取sessionStorage
     */
    getStorage: (key) => {
        let name = commonConfig.sessionStore[key];
        let value = sessionStorage.getItem(name);
        if (!value || value === 'undefined') {
            return {};
        }
        return JSON.parse(value);
    },

    /**
     * 删除sessionStorage
     */
    removeStorage: (config) => {
        if (typeof config === 'string') {
            sessionStorage.removeItem(commonConfig.sessionStore[config]);
        } else if (typeof config === 'object' && config.length !== 0) {
            config.forEach(function (item) {
                sessionStorage.removeItem(commonConfig.sessionStore[item]);
            });
        }
    },

    /**
     * 写cookies
     */
    setCookie: (name, value, day) => {
        if (!day) {
            var day = 1;
        }
        var exp = new Date();
        exp.setTime(exp.getTime() + day * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
    },
    /**
     * 读取cookies
     */
    readCookie: (name) => {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2]);
        } else {
            return null;
        }

    },

    /**
     * 删除cookies
     */
    delCookie: (name) => {
        var cval = commonAction.readCookie(name);
        if (cval != null) {
            document.cookie = name + "=;path=/;expires=" + (new Date(0)).toGMTString();
            document.cookie = name + "=;expires=" + (new Date(0)).toGMTString();
        }
    },

    /**
     * 数组去重（元素是对象）
     * 将对象元素转换成字符串以作比较
     */
    obj2key: (obj, keys) => {
        var n = keys.length,
            key = [];
        while (n--) {
            key.push(obj[keys[n]]);
        }
        return key.join('|');
    },

    /**
     * 去重操作
     */
    uniqeByKeys: (array, keys) => {
        var arr = [];
        var hash = {};
        for (var i = 0, j = array.length; i < j; i++) {
            var k = this.obj2key(array[i], keys);
            if (!(k in hash)) {
                hash[k] = true;
                arr.push(array[i]);
            }
        }
        return arr;
    },

    /**
     * 格式化时间添加 -
     */
    timeFormat: (str) => {
        let newstr = "";
        let tmp1 = str.substring(0, 0 + 4);
        newstr += tmp1 + '-';
        let tmp2 = str.substring(4, 4 + 2);
        newstr += tmp2 + '-';
        let tmp3 = str.substring(6, 6 + 2);
        newstr += tmp3;
        return newstr;
    },
}

export default commonAction

