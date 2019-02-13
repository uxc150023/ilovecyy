import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)
const store = new Vuex.Store({
    plugins: [createPersistedState({ storage: window.sessionStorage })],
    strict: true,
    // 定义状态
    state: {
        userid: '',     //用户id 唯一
        bid: '',        //区分模块的id
        isAdmin: '',    //是否是管理员
        loginStatus: '',//是否登录
        newStuname: '', //新学名
        userType: '',   //用户类型 - per 个人 org 单位
        phone: '',      //用户或单位手机号码
        username: '',   //用户名称
        stunetName: '',
        stunetUrl:"",
        stunetId:"",
        headImage: '',  //顶部头图
        meetInfo: {
            meetId: ''
        },
    },

    mutations: {
    	/**
    	 * 使用
    	 * store.commit('newAuthor', 'xxxxxx');
    	 */
        SET_TUSERID (state, token) {
            state.userid = token
        },
        SET_LOGINSTATUS (state, token) {
            state.loginStatus = token
        },
        SET_USERTYPE (state, token) {
            state.userType = token
        },
        SET_PHONE (state, token) {
            state.phone = token
        },
        SET_USERNAME (state, token) {
            state.username = token
        },
        SET_STUNETID (state, token) {
            state.stunetId = token
        },
        SET_STUNETURL (state, token) {
            state.stunetUrl = token
        },
        SET_STUNETNAME (state, token) {
            state.stunetName = token
        },
        SET_MEETINFO (state, token) {
            state.meetInfo = token
        },
        SET_BID (state, token) {
            state.bid = token
        },
        SET_HEADIMAGE (state, token) {
            state.headImage = token
        }
    },
    actions: {
        
    }
})

export default store
