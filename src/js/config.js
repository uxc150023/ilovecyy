/**
 * 全局配置
 * by cyy zb
 * 2018 12 13
 */
var commonConfig = {
    ENV: 'test',
    path: {
        dev: '/mock/', // 本地开发环境
        test: 'http://192.168.2.218:10060/',
        sit: 'http://120.27.233.133:10060/',
    },

    /**
     * 接口配置
     */
    setting: {
        CRETIFY_PRE: 'apply/user_authentication',//用户认证
    },

    /**
     * 页面跳转配置
     */
     page: {
        'formDemo': 'demo/formDemo.html', // demo
    },

    /**
     * 本地缓存键值配置
     */
    sessionStore: {
        username: 'username',   //登录用户名，个人是手机号，公司是用户名
    }
}

/**
 * 数据请求
 */
var CGI = {

}