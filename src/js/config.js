/**
 * 全局配置
 * by cyy zb
 * 2018 12 13
 */
let commonConfig = {
    ENV: 'test',
    path: {
        dev: '/mock/', // 本地开发环境
        test: 'http://192.168.2.218:10060/',
        sit: 'http://120.27.233.133:10060/',
    },

    /**
     * 本地缓存键值配置
     */
    sessionStore: {
        username: 'username',   //登录用户名，个人是手机号，公司是用户名
        loginStatus: 'loginStatus',  //是否登录
        userid: 'userid',    //登录用户的userid
        webinfo: 'webinfo',  //抢注学网的网名网址和网名id
        per_or_org: 'per_or_org',   //是个人还是公司
        new_stuname: 'new_stuname', //新学名
        subsidyAgree: 'subsidyAgree',//同意优惠协议
        userInfo: 'userInfo', //用户信息
        pubwebinfo: 'pubwebinfo', //用户在公众端的学网信息
        meetId: 'meetId', //会议主键
        // sdktoken: 'sdktoken', //网易
        // uid: 'uid', //网易
        searchInfo: 'searchInfo', //学搜跳转页面
        live_num: 'live_num', //直播分会场序号
        meetinfo: 'meetinfo', //会议id及各类信息存储
        isAdmin: 'isAdmin'
    }
}

export default commonConfig