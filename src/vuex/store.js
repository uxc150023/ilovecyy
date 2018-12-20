import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    // 定义状态
    state: {
        author: 'Wise Wrong'
    },

    mutations: {
    	/**
    	 * 使用
    	 * store.commit('newAuthor', 'xxxxxx');
    	 */
    	newAuthor: (state, msg) => {
    		state.author = msg;
    	}
    }
})

export default store