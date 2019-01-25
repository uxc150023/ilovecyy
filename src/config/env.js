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
	baseUrl = 'https://console.xinxuejie.com.cn/';
    // baseUrl = 'http://192.168.31.188:80/';
    // baseUrl = 'http://192.168.31.116:80/';
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
