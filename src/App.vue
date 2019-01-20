<template>
    <div id="app">
        <router-view/>
        <app-footer></app-footer>
    </div>
</template>

<script>
	import footer from '@/components/footer/footer'
	export default {
	    name: 'App',
	    components: {
		    "app-footer": footer,
		},
	}
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
