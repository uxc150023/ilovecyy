<template>
    <div>
        <div class="banner">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane v-for="(item, index) in banners.navlist" :key='index' :label="item.name" v-if="item.isDelete === 0" :name="String(item.bid)"></el-tab-pane>
            </el-tabs>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeName: '',
                // navmenus: ['home', 'read', 'write', 'hy']
                navmenus: { //匹配路由
                    'home':     '1',
                    'read':     '2',
                    'write':    '3',
                    'mymeeting':'6',
                    'version':  '13',
                    'alliance': '14',
                    'person':   '15',
                },
                navmenusStu: { //匹配路由
                    'home':     '1',
                    'survey':   '2',
                    'leader':   '3',
                    'mem':      '4',
                    'mymeeting':'5',
                    'paper':    '6',
                    'share':    '7',
                    'join':     '8',
                    'cert':     '9'
                },
                routers: {      //匹配我世界路由
                    '1':        'Worldhome',
                    '2':        'Worldread',
                    '3':        'Worldwrite',
                    '6':        'Worldmeeting',
                    '13':       'Worldversion',
                    '14':       'Worldalliance',
                    '15':       'Worldperson'
                },
                routersStu: {   //匹配学会路由
                    '1':    'Stuhome',
                    '2':    'Stusurvey',
                    '3':    'Stuleader',
                    '4':    'Stumember',
                    '5':    'Stumeeting',
                    '6':    'Stupaper',
                    '7':    'Stushare',
                    '8':    'Stujoin',
                    '9':    'Stucert'
                }
            }
        },
        name: 'users',
        props:{
            banners:{
                type: '',
                navlist: []
            }
        },
        methods: {
            handleClick(tab) {
                this._store.commit('SET_BID', tab.name);
                if(this.banners.type === 'myworld'){
                    this.$router.push({ name: this.routers[tab.name] })
                }else if(this.banners.type === 'stunet'){
                    this.$router.push({ name: this.routersStu[tab.name] })
                }
            },
            initPage() {
                /*设置tab焦点*/
                if(this.banners.type === 'myworld'){
                    /*我世界*/
                    this.activeName = this.navmenus[location.href.split('/')[location.href.split('/').length - 1]];
                }else if(this.banners.type === 'stunet'){
                    /*学网*/
                    this.activeName = this.navmenusStu[location.href.split('/')[location.href.split('/').length - 1]];
                }
                this._store.commit('SET_BID', this.activeName);
            }
        },
        created(){

        },
        mounted(){
            this.initPage();
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
        // padding: 15px;
        // background-color: #fafafa;
    }
</style>
