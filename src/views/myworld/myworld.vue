<template>
    <div class="myworld">
        <app-headtop v-on:showSetting="showSetting()"></app-headtop>
        <div class="myworld_head">
            <img class="bgImage" src="../../assets/example.jpg">
        </div>
        <app-myworldbanner v-bind:banners="banners"></app-myworldbanner>
        <!-- <app-modal v-bind:modalInfo="modalInfo">
        </app-modal> -->
    </div>
</template>

<script>
    import Myworld from '@/js/myworld/Myworld.js';
    export default Myworld

</script>

<style lang="scss">
    .myworld {
        .myworld_head {
            height: 200px;
            // background-color: #7FFF8EFF;
            width: 100%;
            .bgImage {
                width: 1440px;
                height: 200px;
            }
        }
    }
</style>
