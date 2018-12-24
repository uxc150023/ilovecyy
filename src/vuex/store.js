import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    // 定义状态
    state: {
        author: 'Wise Wrong',
        userId: '',
    	stunetId: '',
    	myworldBanner: '',
    },

    mutations: {
    	/**
    	 * 使用
    	 * store.commit('newAuthor', 'xxxxxx');
    	 * 
    	 */
    	newAuthor: (state, msg) => {
    		state.author = msg
    	},

    	setUserId: (state, msg) => {
    		state.userId = msg
    	},

    	setStunetId: (state, msg) => {
    		state.stunetId = msg
    	},

    	setMyworldBanner: (state, msg) => {
    		state.myworldBanner = msg
    	}
    }
})

export default store