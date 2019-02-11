/**
 * 配置编译环境和线上环境之间的切换
 *
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

let baseUrl = '';
let routerMode = 'hash';
let imgBaseUrl = '';

if (process.env.NODE_ENV == 'development') {
	// baseUrl = 'https://console.xinxuejie.com.cn/';
<<<<<<< HEAD
    // baseUrl = 'http://192.168.31.188:80/';
    baseUrl = 'http://dtw9hk.natappfree.cc/';
=======
    baseUrl = 'http://192.168.31.188:80/';
    // baseUrl = 'http://uiiqda.natappfree.cc/';
>>>>>>> 5864ef206a4fd7571f70f0502c4f8b2f6ce35d74
    // imgBaseUrl = '/img/';

}else if(process.env.NODE_ENV == 'production'){
	baseUrl = 'https://console.xinxuejie.com.cn/';
    // imgBaseUrl = '//elm.cangdu.org/img/';
}
export {
	baseUrl,
	// routerMode,
	// imgBaseUrl,
}
