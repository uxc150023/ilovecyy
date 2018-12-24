<template>
    <div class="banner">
        <el-radio-group v-model="tabPosition">
            <el-radio-button :label="item.code" v-for="(item, index) in banners" :key="index" v-if="item.isDelete === 0">{{item.name}}</el-radio-button>
        </el-radio-group>
    </div>
</template>

<script>
    // import store from '@/vuex/store.js'
    export default {
        data() {
            return {
                tabPosition: 'home',
            }
        },
        name: 'users',
        props:{
            banners:{
                type:Array,
                required:true
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    };

</script>

<style lang="scss">
    .banner {
        background-color: #0092ff;
        text-align: left;
        padding-left: 30px;
        .el-radio-group {

            .is-active {
                background-color: #2954aa;
            }
            .el-radio-button {
                .el-radio-button__inner {
                    background-color: transparent;
                    border: 0;
                    color: #fff;
                }
            }
        }
    }
</style>
