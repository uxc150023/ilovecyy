<template>
    <div class="myworld">
        <app-headtop></app-headtop>
        <div class="myworld-head"></div>
        <app-myworldbanner v-bind:banners="banners"></app-myworldbanner>
    </div>
</template>

<script>
    import Myworld from '@/js/myworld/Myworld.js';
    export default Myworld

</script>

<style lang="scss">
    .myworld {
        .myworld-head {
            height: 200px;
            background-color: #ddd;
            width: 100%;
        }
    }
</style>
