import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    // 定义状态
    state: {
        userId: '',     //用户id 唯一
        bid: '',        //区分模块的id
        isAdmin: '',    //是否是管理员
        loginStatus: '',//是否登录
        newStuname: '', //新学名
        userType: '',   //用户类型 - per 个人 org 单位
        phone: '',      //用户或单位手机号码
        username: '',   //用户名称

        stunetName: '',
        stunetUrl:"",
        stunetId:""
    },

    mutations: {
    	/**
    	 * 使用
    	 * store.commit('newAuthor', 'xxxxxx');
    	 * 
    	 */
        SET_TUSERID: (state, token) => {
            state.userId = token
        },
        SET_LOGINSTATUS: (state, token) => {
            state.loginStatus = token
        },
        SET_USERTYPE: (state, token) => {
            state.userType = token
        },
        SET_PHONE: (state, token) => {
            state.phone = token
        },
        SET_USERNAME: (state, token) => {
            state.username = token
        },
    	// setUserId: (state, msg) => {
    	// 	state.userId = msg
    	// },

    	// setStunetId: (state, msg) => {
    	// 	state.stunetId = msg
    	// },

    	// setMyworldBanner: (state, msg) => {
    	// 	state.myworldBanner = msg
    	// }
    }
})

export default store