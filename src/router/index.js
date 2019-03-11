import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/views/index'
import Login from '@/views/login/login'

import Myworld from '@/views/myworld/myworld' // 我世界
import Worldhome from '@/views/myworld/home' // 我世界 - 首页
import Worldread from '@/views/myworld/read' // 我世界 - 我读
import Worldwrite from '@/views/myworld/write' // 我世界 - 我写
import Worldmeeting from '@/views/myworld/mymeeting' // 我世界 - 会议
import Worldversion from '@/views/myworld/version' // 我世界 - 公众版管理
import Worldalliance from '@/views/myworld/alliance' // 我世界 - 新学联盟
import Worldperson from '@/views/myworld/person' // 我世界 - 新学人物

import Mystunet from '@/views/mystunet/mystunet' // 学会
import Stuhome from '@/views/mystunet/home' // 学会 - 首页
import Stusurvey from '@/views/mystunet/survey' // 学会 - 概况
import Stuleader from '@/views/mystunet/leader' // 学会 - 领导
import Stumember from '@/views/mystunet/member' // 学会 - 学员
import Stumeeting from '@/views/mystunet/meeting' // 学会 - 会议
import Stupaper from '@/views/mystunet/paper' // 学会 - 论坛
import Stushare from '@/views/mystunet/share' // 学会 - 文献共享
import Stujoin from '@/views/mystunet/join' // 学会 - 入会管理
import Stucert from '@/views/mystunet/cert' // 学会 - 证书管理

import MyGroupFriend from '@/views/mygroupfriend/myGroupFriend'
import Recome from '@/views/recome/recome'
import Director from '@/views/director/director'
import Uercenter from '@/views/uercenter/uercenter'
import Financial from '@/views/financial/financial'
import Archive from '@/views/archive/archive'
import Mwsetting from '@/views/setting/mwsetting' // 我世界 - 头部导航 - 设置
import Register from '@/views/register/register'
import ResetPass from '@/views/login/resetPass'
import Webbuild from '@/views/webbuild/Webbuild' // 建站

import Read from '@/views/myread/read' // 阅读
import Videoread from '@/views/myread/videoread' // video阅读
import Imageread from '@/views/myread/imageread' // video阅读

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Index',
            component: resolve => require(['@/views/index'], resolve)
        },
        /* 登陆 */
        {
            path: '/login',
            name: 'Login',
            component: resolve => require(['@/views/login/login'], resolve)
        },
        /* 我世界 */
        {
            path: '/myworld',
            name: 'Myworld',
            component: resolve => require(['@/views/myworld/myworld'], resolve),
            redirect: '/myworld/home', // 重定向
            children: [
                { path: '/myworld/home', name: 'Worldhome', component: resolve => require(['@/views/myworld/home'], resolve) },
                { path: '/myworld/read', name: 'Worldread', component: resolve => require(['@/views/myworld/read'], resolve) },
                { path: '/myworld/write', name: 'Worldwrite', component: resolve => require(['@/views/myworld/write'], resolve) },
                { path: '/myworld/mymeeting', name: 'Worldmeeting', component: resolve => require(['@/views/myworld/mymeeting'], resolve) },
                { path: '/myworld/version', name: 'Worldversion', component: resolve => require(['@/views/myworld/version'], resolve) },
                { path: '/myworld/alliance', name: 'Worldalliance', component: resolve => require(['@/views/myworld/alliance'], resolve) },
                { path: '/myworld/person', name: 'Worldperson', component: resolve => require(['@/views/myworld/person'], resolve) }
            ]
        },
        /* 我的学网 */
        {
            path: '/mystunet',
            name: 'Mystunet',
            component: Mystunet,
            redirect: '/mystunet/home', // 重定向
            children: [
                { path: '/mystunet/home', name: 'Stuhome', component: Stuhome },
                { path: '/mystunet/survey', name: 'Stusurvey', component: Stusurvey },
                { path: '/mystunet/leader', name: 'Stuleader', component: Stuleader },
                { path: '/mystunet/member', name: 'Stumember', component: Stumember },
                { path: '/mystunet/meeting', name: 'Stumeeting', component: Stumeeting },
                { path: '/mystunet/paper', name: 'Stupaper', component: Stupaper },
                { path: '/mystunet/share', name: 'Stushare', component: Stushare },
                { path: '/mystunet/join', name: 'Stujoin', component: Stujoin },
                { path: '/mystunet/cert', name: 'Stucert', component: Stucert }
            ]
        },
        /* 学群学友 */
        {
            path: '/myGroupFriend',
            name: 'MyGroupFriend',
            component: MyGroupFriend
        },
        /* 推介 */
        {
            path: '/recome',
            name: 'Recome',
            component: Recome
        },
        /* 理事 */
        {
            path: '/director',
            name: 'Director',
            component: Director
        },
        /* 用户中心 */
        {
            path: '/uercenter',
            name: 'Uercenter',
            component: Uercenter
        },
        /* 财务室 */
        {
            path: '/financial',
            name: 'Financial',
            component: Financial
        },
        /* 资料馆 */
        {
            path: '/archive',
            name: 'Archive',
            component: Archive
        },
        /* 设置 */
        {
            path: '/mwsetting',
            name: 'Mwsetting',
            component: Mwsetting
        },
        /* 注册 */
        {
            path: '/register',
            name: 'Register',
            component: Register
        },
        /* 重置密码 */
        {
            path: '/resetPass',
            name: 'ResetPass',
            component: ResetPass
        },
        /* 建站 */
        {
            path: '/webbuild',
            name: 'Webbuild',
            component: Webbuild
        },
        /* 阅读 */
        {
            path: '/read',
            name: 'Read',
            component: Read
        },
        /* video阅读 */
        {
            path: '/videoread',
            name: 'videoRead',
            component: Videoread
        },
        /* image阅读 */
        {
            path: '/imageread',
            name: 'imageRead',
            component: Imageread
        }
    ]
})
