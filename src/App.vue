<template>
    <div id="app">
        <!-- <p style="height:2px"></p> -->
        <app-headTop></app-headTop>
        <router-view />
        <!-- <app-footer></app-footer> -->
    </div>
</template>

<script>
import headTop from '@/components/header/head'
import footer from '@/components/footer/footer'
export default {
    name: 'App',
    components: {
        'app-footer': footer,
        'app-headTop': headTop
    }
}
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
