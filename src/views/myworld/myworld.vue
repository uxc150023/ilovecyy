<template>
    <div class="myworld">
        <app-headtop v-on:showSetting="showSetting()"></app-headtop>
        <div class="myworld-head">
            <img src="../../images/snow.gif">
            <p>xxxxxxx</p>
        </div>
        <app-myworldbanner v-bind:banners="banners"></app-myworldbanner>
        <app-modal v-bind:dialogVisible="dialogVisible">
            <div>123123123123</div>
        </app-modal>
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
            background-color: #7FFF8EFF;
            width: 100%;
        }
    }
</style>
