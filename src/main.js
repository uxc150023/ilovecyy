// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './style/theme-base.scss'
import commonAction         from "@/js/commonAction.js"
import Store from '@/vuex/store'
import {_getUrl, _getData}  from '@/service/getdata.js'


Vue.use(ElementUI)

Vue.config.productionTip = false
Vue.prototype._store = Store
Vue.prototype._getUrl = _getUrl
Vue.prototype._getData = _getData
Vue.prototype._common = commonAction

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	components: { App },
	template: '<App/>',
})
