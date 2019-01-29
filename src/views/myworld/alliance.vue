<template>
    <div class="alliance-content">
        <app-tab v-bind:id="id" v-bind:tabItem="tabOne" v-on:change="change">
            <div v-if="type < 3">
                <div v-for="(item, index) in listInfo">
                    <app-list :info='item' v-on:clickbtn="concern"></app-list>
                </div>
                <div v-if="listInfo === ''">
                    <app-empty></app-empty>
                </div>
                <div class="paging" v-if="total > 10">
                    <el-pagination
                        background
                        layout="prev, pager, next, jumper"
                        :total="total"
                        :small=false
                        :page-size=10
                        :page-count=20
                        @current-change="handleCurrentChange"
                        @prev-click="prevClick"
                        @next-click="nextClick"
                         >
                    </el-pagination>
                </div>
            </div>
            <div v-if="type === 3">
                <app-colmeeting title="我的主站">
                    <app-list :info='mainlistInfo' v-on:clickbtn="" ></app-list>
                </app-colmeeting>

                <app-colmeeting title="我的子站">
                    <div v-for="(item, index) in childlistInfo">
                        <app-list :info='item' v-on:clickbtn="" ></app-list>
                    </div>

                    <div class="paging" v-if="childtotal > 10">
                        <el-pagination
                            background
                            layout="prev, pager, next, jumper"
                            :total="childtotal"
                            :small=false
                            :page-size=10
                            :page-count=20
                            @current-change="handleCurrentChange"
                            @prev-click="prevClick"
                            @next-click="nextClick">
                        </el-pagination>
                    </div>
                </app-colmeeting>

                <app-colmeeting title="我为成员/会员的学网">
                    <div v-for="(item, index) in memlistInfo">
                        <app-list :info='item' v-on:clickbtn="" ></app-list>
                    </div>

                    <div class="paging" v-if="memtotal > 10">
                        <el-pagination
                            background
                            layout="prev, pager, next, jumper"
                            :total="memtotal"
                            :small=false
                            :page-size=10
                            :page-count=20
                            @current-change="handleCurrentChange"
                            @prev-click="prevClick"
                            @next-click="nextClick"
                             >
                        </el-pagination>
                    </div>
                </app-colmeeting>

                <app-colmeeting title="我为关注的学网">
                    <div v-for="(item, index) in attentlistInfo">
                        <app-list :info='item' v-on:clickbtn="" ></app-list>
                    </div>

                    <div class="paging" v-if="attenttotal > 10">
                        <el-pagination
                            background
                            layout="prev, pager, next, jumper"
                            :total="attenttotal"
                            :small=false
                            :page-size=10
                            :page-count=20
                            @current-change="handleCurrentChange"
                            @prev-click="prevClick"
                            @next-click="nextClick"
                             >
                        </el-pagination>
                    </div>
                </app-colmeeting>

                <app-colmeeting title="我取关的学网">
                    <div v-for="(item, index) in noattentlistInfo">
                        <app-list :info='item' v-on:clickbtn="" ></app-list>
                    </div>

                    <div class="paging" v-if="noattenttotal > 10">
                        <el-pagination
                            background
                            layout="prev, pager, next, jumper"
                            :total="noattenttotal"
                            :small=false
                            :page-size=10
                            :page-count=20
                            @current-change="handleCurrentChange"
                            @prev-click="prevClick"
                            @next-click="nextClick"
                             >
                        </el-pagination>
                    </div>
                </app-colmeeting>
            </div>

        </app-tab>
    </div>
</template>

<script>
    import list from '@/components/list/list_1'
    import commonAction from "@/js/commonAction"
    import store from '@/vuex/store.js'
    import empty from '@/components/list/empty'
    import {_getUrl, _getData} from '@/service/getdata.js'
    import tab from '@/components/tabs/meeting'
    import Colmeeting from '@/components/collapse/meeting'
    export default {
        data() {
            return {
                currentPage: 1,
                type: 0,
                activeName: 'first',
                total: 0,
                childtotal: 0,
                attenttotal: 0,
                noattenttotal: 0,
                memtotal: 0,
                listInfo:'',
                mainlistInfo: '',   //我的主站
                childlistInfo: [],  //我的子站
                memlistInfo: [],    //我为成员/会员的学网
                attentlistInfo: [], //我关注的学网
                noattentlistInfo: [], //我取关的学网
                modalInfo: {
                    title: '新建会议',
                    show: false
                },
                id:'1',
                tabOne: ['学网来潮', '学网尖峰','学网专列', '我的学网'],
                stunetName: store.state.stunetName
            }
        },
        mounted() {
            this.getInfo(1);
        },

        methods: {
            /*
            * 获取list
            */
            getInfo(currentPage) {
                if(this.type === 3){
                    this.myMasterSite()
                    this.mySubSites(currentPage)
                    this.myJoinSites(currentPage)
                    this.myConcernSites(currentPage)
                    this.mynoConcernSites(currentPage)
                    return false
                }
                var params = {
                    userid: store.state.userid,
                    stmType: this.type,
                    currentPage: currentPage ? currentPage : 1,
                    onePageCount: 10
                };
                _getData(_getUrl('STUORG'), params, res => {
                    this.total = res.data.countRecord
                    this.listInfo = res.data.listMap
                    this.listInfo.forEach(elem => {
                        elem.name_0 = elem.stunetName
                        elem.name_1 = elem.sitetypeName
                        elem.mark = elem.stunetId
                        elem.bg = _getUrl('SMALLIMGURL')+ elem.logoUrl
                        if(!elem.isConcern){
                            elem.btnname = '关    注'
                        }else{
                            elem.btnname = '取    关'
                        }
                    })
                })
            },
            handleCurrentChange(val) {
                this.getInfo(val)
            },
            prevClick(val) {
                this.getInfo(val)
            },
            nextClick(val) {
                this.getInfo(val)
            },
            /**
             * tab切换
             */
            change(tab,event){
                this.type = Number(tab.index)
                this.getInfo(1)
            },
            /**
             * 关注 1/取关 2 operate
             */
            concern(obj){
                let params = {
                    concernId: obj.btnmark,
                    operate: '1',
                    type: 0,
                    userid: store.state.userid
                }
                _getData(_getUrl('STUCONCERN'), params, res => {
                    if(res.code === 200){
                        if(operate === '1'){
                            message = "关注成功"
                        }else{
                            message = "取关成功"
                        }
                        this.$message({
                            showClose: true,
                            message: message,
                            type: 'success'
                        });
                        // this.listInfo.forEach(function(item, index){
                        //     if(item.mark == obj.btnmark){
                        //         item.btnname = '取    关'
                        //     }
                        // })
                    }
                })
            },
            /**
             * 获取主站
             */
            myMasterSite() {
                _getData(_getUrl('MYMASTERSITE'), {stunetId: store.state.stunetId}, res => {
                    if(res.code === 200){
                        this.mainlistInfo = {
                            name_0: store.state.stunetName,
                            bg: _getUrl('SMALLIMGURL') + res.data.logoUrl,
                            mark: store.state.stunetId
                        }
                    }
                })
            },
            /**
             * 我的子站
             */
            mySubSites(currentPage) {
                var self = this
                var params = {
                    stunetId: store.state.stunetId,
                    currentPage: currentPage? currentPage: 1,
                    onePageCount: 10
                }
                _getData(_getUrl('MYSUBSITES'), params, res => {
                    if(res.code === 200){
                        this.childtotal = res.data.countRecord
                        self.childlistInfo = []
                        res.data.list.forEach(function(elem, index){
                            self.childlistInfo.push({
                                name_0: elem.name,
                                name_1: elem.type,
                                bg: elem.bgurl ? _getUrl('SMALLIMGURL') + elem.bgurl: require('../../assets/noticebg.jpg'),
                                mark: elem.mtId,
                                url: elem.url
                            })
                        })
                    }
                })
            },
            /**
             * 我为成员/会员的学网
             */
            myJoinSites(currentPage) {
                var self = this
                var params = {
                    userid: store.state.userid,
                    currentPage: currentPage? currentPage: 1,
                    onePageCount: 10,
                    stmType: -3
                }
                _getData(_getUrl('MYJOINSITES'), params, res => {
                    if(res.code === 200){
                        this.memtotal = res.data.countRecord
                        self.memlistInfo = []
                        res.data.list.forEach(function(elem, index){
                            self.memlistInfo.push({
                                name_0: elem.stunetName,
                                name_1: elem.sitetypeName,
                                bg: elem.bgurl ? _getUrl('SMALLIMGURL') + elem.bgurl: require('../../assets/noticebg.jpg'),
                                mark: elem.stunetId,
                                url: elem.stunetUrl
                            })
                        })
                    }
                })
            },
            /**
             * 我关注的学网
             */
            myConcernSites(currentPage) {
                var self = this
                var params = {
                    userid: store.state.userid,
                    currentPage: currentPage? currentPage: 1,
                    onePageCount: 10,
                    stmType: -2
                }
                _getData(_getUrl('MYCONCERNSITES'), params, res => {
                    if(res.code === 200){
                        this.attenttotal = res.data.countRecord
                        self.attentlistInfo = []
                        res.data.list.forEach(function(elem, index){
                            self.attentlistInfo.push({
                                name_0: elem.stunetName,
                                name_1: elem.sitetypeName,
                                bg: elem.logoUrl ? _getUrl('SMALLIMGURL') + elem.bgurl: require('../../assets/noticebg.jpg'),
                                mark: elem.stunetId,
                                url: elem.stunetUrl,
                                btnname: '取  关'
                            })
                        })
                    }
                })
            },
            /**
             * 我取关的学网
             */
            mynoConcernSites(currentPage) {
                var self = this
                var params = {
                    userid: store.state.userid,
                    currentPage: currentPage? currentPage: 1,
                    onePageCount: 10,
                    stmType: -1
                }
                _getData(_getUrl('MYNOCONCERNSITES'), params, res => {
                    if(res.code === 200){
                        this.noattenttotal = res.data.countRecord
                        self.noattentlistInfo = []
                        res.data.list.forEach(function(elem, index){
                            self.noattentlistInfo.push({
                                name_0: elem.stunetName,
                                name_1: elem.sitetypeName,
                                bg: elem.logoUrl ? _getUrl('SMALLIMGURL') + elem.bgurl: require('../../assets/noticebg.jpg'),
                                mark: elem.stunetId,
                                url: elem.stunetUrl,
                                btnname: '恢  复'
                            })
                        })
                    }
                })
            }
        },
        components: {
            "app-list": list,
            "app-empty": empty,
            "app-tab": tab,
            "app-colmeeting": Colmeeting,
        },


    }

</script>

<style lang="scss">
    .alliance-content {
        padding: 15px;
        .paging {
            margin-top: 15px;
            background-color: #fff;
        }
        .el-tabs__content {
            padding: 0 15px;
            background-color: #fff;
        }
    	.el-tabs__nav-scroll {
            background-color: #fff;
            .el-tabs__nav {
                float: right;
            }
    	}
    }
</style>
