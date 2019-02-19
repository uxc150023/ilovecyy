// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import './style/theme-base.scss'
import commonAction from '@/js/commonAction.js'
import store from '@/vuex/store'
import { _getUrl, _getData } from '@/service/getdata.js'

Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype._store = store
Vue.prototype._getUrl = _getUrl
Vue.prototype._getData = _getData
Vue.prototype._common = commonAction

// 配置NProgress进度条选项  —— 动画效果
NProgress.configure({ ease: 'ease', speed: 500 })

router.beforeEach((to, from, next) => {
    // if (to.path === `${base}login`) {
    //     return next()
    // }

    // token验证，如果存储在sessionStorage里的auth的值丢失，就回到登陆页面，(开发时可以注释掉)
    // if (!sessionStorage.getItem('auth')) {
    //   return next(`${base}login`)
    // }

    // 如果页面在 /  默认页面，跳转到登陆页面(和vue路由重定向功能类似)
    // if (to.path === `${base}`) {
    //     return next(`${base}login`)
    // }
    // NProgress开始进度条
    NProgress.start()
    next()
})

// 全局后置钩子-常用于结束动画等
router.afterEach(transition => {
    // NProgress结束进度条
    NProgress.done()
    // console.log(transition)
})

/* eslint-disable no-new */
let that = new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    store
})

export default that
