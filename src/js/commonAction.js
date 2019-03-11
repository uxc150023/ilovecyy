/**
 * 全局方法
 */
import commonConfig from './config'
import _this from '../main.js'
let commonAction = {
    /**
     * @param  获取URL传参并转化为数组，支持指定参数获取
     */
    getParam: (key) => {
        let ser = location.search
        if (ser) {
            let arrays = ser.substring(1).split('&')
            let params = {}
            arrays.forEach(function (v, k) {
                let a = v.split('=')
                params[a[0]] = a[1]
            })
            if (key) {
                return params[key]
            }
            return params
        }
    },
    /**
     * 存储sessionStorage
     */
    setStorage: (key, data) => {
        let value = JSON.stringify(data)
        let name = commonConfig.sessionStore[key]
        sessionStorage.setItem(name, value)
    },

    /**
     * 获取sessionStorage
     */
    getStorage: (key) => {
        let name = commonConfig.sessionStore[key]
        let value = sessionStorage.getItem(name)
        if (!value || value === 'undefined') {
            return {}
        }
        return JSON.parse(value)
    },

    /**
     * 删除sessionStorage
     */
    removeStorage: (config) => {
        if (typeof config === 'string') {
            sessionStorage.removeItem(commonConfig.sessionStore[config])
        } else if (typeof config === 'object' && config.length !== 0) {
            config.forEach(function (item) {
                sessionStorage.removeItem(commonConfig.sessionStore[item])
            })
        }
    },

    /**
     * 写cookies
     */
    setCookie: (name, value, day) => {
        let time = day
        if (!day) {
            time = 1
        }
        let exp = new Date()
        exp.setTime(exp.getTime() + time * 24 * 60 * 60 * 1000)
        document.cookie = name + '=' + escape(value) + ';path=/;expires=' + exp.toGMTString()
    },
    /**
     * 读取cookies
     */
    readCookie: (name) => {
        let arr = ''
        let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
        if (arr = document.cookie.match(reg)) {
            return unescape(arr[2])
        } else {
            return null
        }
    },

    /**
     * 删除cookies
     */
    delCookie: (name) => {
        let cval = commonAction.readCookie(name)
        if (cval != null) {
            document.cookie = name + '=;path=/;expires=' + (new Date(0)).toGMTString()
            document.cookie = name + '=;expires=' + (new Date(0)).toGMTString()
        }
    },

    /**
     * 数组去重（元素是对象）
     * 将对象元素转换成字符串以作比较
     */
    obj2key: (obj, keys) => {
        let n = keys.length
        let key = []
        while (n--) {
            key.push(obj[keys[n]])
        }
        return key.join('|')
    },

    /**
     * 去重操作
     */
    uniqeByKeys: (array, keys) => {
        let arr = []
        let hash = {}
        for (let i = 0, j = array.length; i < j; i++) {
            let k = this.obj2key(array[i], keys)
            if (!(k in hash)) {
                hash[k] = true
                arr.push(array[i])
            }
        }
        return arr
    },

    /**
     * 格式化时间添加 -
     */
    timeFormat: (str) => {
        let newstr = ''
        let tmp1 = str.substring(0, 0 + 4)
        newstr += tmp1 + '-'
        let tmp2 = str.substring(4, 4 + 2)
        newstr += tmp2 + '-'
        let tmp3 = str.substring(6, 6 + 2)
        newstr += tmp3
        return newstr
    },

    /**
     * 校验是否全由数字组成
     * @return {[type]}
     */
    isDigit: (s) => {
        let patrn = /^[0-9]{1,20}$/
        if (!patrn.exec(s)) return false
        return true
    },
    /**
     * 清空vuex 中的值
     */
    clearStore: () => {
        _this.$store.commit('SET_TUSERID', '')
        _this.$store.commit('SET_LOGINSTATUS', '')
        _this.$store.commit('SET_USERTYPE', '')
        _this.$store.commit('SET_PHONE', '')
        _this.$store.commit('SET_USERNAME', '')

        _this.$store.commit('SET_STUNETID', '')
        _this.$store.commit('SET_STUNETURL', '')
        _this.$store.commit('SET_STUNETNAME', '')
        _this.$store.commit('SET_MEETINFO', '')
    },

    /**
     * 消息提示
     * fn: 关闭回调
     * title: 标题
     */
    showMsg: (text, fn) => {
        _this.$message({
            message: text,
            duration: 2000,
            center: true,
            onClose: () => {
                if (fn) fn.call(_this)
            }
        })
    },
    /**
     * [确认消息]
     * @return {[type]} [description]
     * text 内容
     * fn1  确定回调
     * fn2  取消回调
     */
    warnMsg: (text, fn1, fn2, title, btn1, btn2) => {
        _this.$confirm(text, title || '提示', {
            confirmButtonText: btn1 || '确定',
            cancelButtonText: btn2 || '取消',
            type: 'warning'
        }).then(() => {
            if (fn1) fn1.call(_this)
        }).catch(() => {
            if (fn2) fn2()
        })
    }
}
export default commonAction
