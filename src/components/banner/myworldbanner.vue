<template>
    <div>
        <div class="banner">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane v-for="(item, index) in banners" :key='index' :label="item.name" v-if="item.isDelete === 0" :name="item.code"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    // import store from '@/vuex/store.js'
    export default {
        data() {
            return {
                activeName: '',
                routers: {//匹配路由
                    'myhome':       'home',
                    'myread':       'read',
                    'mywrite':      'write',
                    'mymeetting':   'hy'
                }
            }
        },
        name: 'users',
        props:{
            banners:{}
        },
        methods: {
            handleClick(tab) {
                this.$router.push({ name: tab.name })
            }
        },
        created(){
            /*设置tab焦点*/
            this.activeName = this.routers[location.href.split('/')[location.href.split('/').length - 1]];
        },
        mounted(){
            
        }
    };

</script>

<style lang="scss">
    .banner {
        background-color: #0092ff;
        text-align: center;
        .el-tabs {
            .el-tabs__header {
                margin: 0;
                border: none;
                height: 40px;
                .el-tabs__nav {
                    border: none;
                    .el-tabs__item {
                        border: none;
                        color: #fff;
                    }
                    .el-tabs__item.is-active {
                        background-color: #2954aa;
                    }
                }
            }
        }
    }
    .content {
        padding-left: 15px;
        // background-color: #fafafa;
    }
</style>
