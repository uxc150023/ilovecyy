<template>
    <div class="mystunet">
        <app-headtop></app-headtop>
        <div class="mystunet-head"></div>
        <app-myworldbanner v-bind:banners="banners"></app-myworldbanner>
    </div>
</template>

<script>
	import commonAction from "@/js/commonAction"
	import store from '@/vuex/store.js'
	import {GETMYWORLDINFO } from '@/service/getdata.js'
	import headTop from '@/components/header/head'
	import myworldbanner from '@/components/banner/myworldbanner'
	export default {
		data() {
	        return {
	        	stunetId: commonAction.getStorage("webinfo").stunet_id,
	        	banners: []
	        }
	    },
	    mounted() {
	        this.init()
	    },

	    components: {
	        "app-headtop":headTop,
	        "app-myworldbanner": myworldbanner
	    },

	    methods: {	
	    	init(){
	            var params = {
	                "stunetId": this.stunetId,
	                "bid": 1,
	                "type": 1
	            }
	            /*查询学会信息*/
	            GETMYWORLDINFO(params).then(res => {
	                console.log(res.data)
	                this.banners = res.data.data.stunetMenuConfigs
	                console.log(store.state.myworldbanner);
	            })
	        }
	    }
	}
</script>

<style lang="scss">
	

</style>