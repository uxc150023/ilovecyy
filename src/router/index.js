import Vue from 'vue'
import Router from 'vue-router'

import Index 		 from '@/views/index'
import Login 		 from '@/views/login/login'
import Myworld 		 from '@/views/myworld/myworld'
import hy       	 from '@/views/myworld/mymeeting'
import Mystunet 	 from '@/views/mystunet/mystunet'
import MyGroupFriend from '@/views/mygroupfriend/myGroupFriend'
import Recome 		 from '@/views/recome/recome'
import Director      from '@/views/director/director'
import Uercenter 	 from '@/views/uercenter/uercenter'
import Financial  	 from '@/views/financial/financial'
import Archive 		 from '@/views/archive/archive'
import Mtsetting 		 from '@/views/setting/mtsetting'
import Register 	 from '@/views/register/register'
import ResetPass     from '@/views/login/resetPass'

Vue.use(Router)

export default new Router({
	mode:'history',
	routes: [
		{
			path: '/',
			name: 'Index',
			component: Index
		},
		/*登陆*/
		{
			path: '/login',
			name: 'Login',
			component: Login
		},
		/*我世界*/
		{
			path: '/myworld',
			name: 'Myworld',
			component: Myworld,
            children: [
                // { path: '/mymeeting', redirect: '/Home/login' },
                { path: '/myworld/mymeeting', name: 'hy', component: hy },
            ]
		},
		/*我的学网*/
		{
			path: '/mystunet',
			name: 'Mystunet',
			component: Mystunet
		},
		/*学群学友*/
		{
			path: '/myGroupFriend',
			name: 'MyGroupFriend',
			component: MyGroupFriend
		},
		/*推介*/
		{
			path: '/recome',
			name: 'Recome',
			component: Recome
		},
		/*理事*/
		{
			path: '/director',
			name: 'Director',
			component: Director
		},
		/*用户中心*/
		{
			path: '/uercenter',
			name: 'Uercenter',
			component: Uercenter
		},
		/*财务室*/
		{
			path: '/financial',
			name: 'Financial',
			component: Financial
		},
		/*资料馆*/
		{
			path: '/archive',
			name: 'Archive',
			component: Archive
		},
		/*设置*/
		{
			path: '/mtsetting',
			name: 'Mtsetting',
			component: Mtsetting
		},
		/*注册*/
		{
			path: '/register',
			name: 'Register',
			component: Register
		},
		/*重置密码*/
		{
			path: '/resetPass',
			name: 'ResetPass',
			component: ResetPass
		},
        /*我世界--会议*/
        // {
        //     path: '/mymeeting',
        //     name: 'hy',
        //     component: hy
        // },
	]
})
