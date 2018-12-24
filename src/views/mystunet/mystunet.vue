<template>
    <div class="mystunet">
        <app-headtop></app-headtop>
        <div class="myworld-head"></div>
        <app-myworldbanner v-bind:banners="banners"></app-myworldbanner>
    </div>
</template>

<script>
	import commonAction from "@/js/commonAction"
	import headTop from '@/components/header/head'
	import myworldbanner from '@/components/banner/myworldbanner'

	data() {
        return {

        };
    },

    components: {
        "app-headtop":headTop,
        "app-myworldbanner": myworldbanner
    },

    methods: {	

    }
</script>

<style lang="scss">
	

</style>