import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/index'
import Login from '@/views/login/login'
import Myworld from '@/views/myworld/myworld'

Vue.use(Router)

export default new Router({
	mode:'history',
	routes: [
		{
			path: '/',
			name: 'Index',
			component: Index
		},
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		{
			path: '/myworld',
			name: 'Myworld',
			component: Myworld
		}
	]
})
