<template>
    <div class="alliance-content">
        <app-tab v-bind:id="id"
                 v-bind:tabItem="tabOne"
                 v-on:change="change">
            <div v-if="type < 3">
                <div v-for="(item, index) in listInfo" :key='index'>
                    <app-list :info='item'
                              v-on:clickbtn="concern"></app-list>
                </div>
                <div v-if="listInfo.length === 0">
                    <app-empty></app-empty>
                </div>
                <div class="paging"
                     v-if="total > 10">
                    <el-pagination background
                                   layout="prev, pager, next, jumper"
                                   :total="total"
                                   :small=false
                                   :page-size=10
                                   :page-count=20
                                   @current-change="handleCurrentChange"
                                   @prev-click="prevClick"
                                   @next-click="nextClick">
                    </el-pagination>
                </div>
            </div>
            <div v-if="type === 3">
                <app-colmeeting title="我的主站">
                    <app-list :info='mainlistInfo'
                              ></app-list>
                </app-colmeeting>

                <app-colmeeting title="我的子站">
                    <div v-for="(item, index) in childlistInfo" :key='index'>
                        <app-list :info='item'></app-list>
                    </div>

                    <div v-if="childlistInfo.length === 0">
                        <app-empty></app-empty>
                    </div>

                    <div class="paging"
                         v-if="childtotal > 10">
                        <el-pagination background
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
                    <div v-for="(item, index) in memlistInfo" :key='index'>
                        <app-list :info='item'></app-list>
                    </div>

                    <div v-if="memlistInfo.length === 0">
                        <app-empty></app-empty>
                    </div>

                    <div class="paging"
                         v-if="memtotal > 10">
                        <el-pagination background
                                       layout="prev, pager, next, jumper"
                                       :total="memtotal"
                                       :small=false
                                       :page-size=10
                                       :page-count=20
                                       @current-change="handleCurrentChange"
                                       @prev-click="prevClick"
                                       @next-click="nextClick">
                        </el-pagination>
                    </div>
                </app-colmeeting>

                <app-colmeeting title="我为关注的学网">
                    <div v-for="(item, index) in attentlistInfo" :key='index'>
                        <app-list :info='item'></app-list>
                    </div>
                    <div v-if="attentlistInfo.length === 0">
                        <app-empty></app-empty>
                    </div>
                    <div class="paging"
                         v-if="attenttotal > 10">
                        <el-pagination background
                                       layout="prev, pager, next, jumper"
                                       :total="attenttotal"
                                       :small=false
                                       :page-size=10
                                       :page-count=20
                                       @current-change="handleCurrentChange"
                                       @prev-click="prevClick"
                                       @next-click="nextClick">
                        </el-pagination>
                    </div>
                </app-colmeeting>

                <app-colmeeting title="我取关的学网">
                    <div v-for="(item, index) in noattentlistInfo" :key='index'>
                        <app-list :info='item'></app-list>
                    </div>

                    <div v-if="noattentlistInfo.length === 0">
                        <app-empty></app-empty>
                    </div>
                    <div class="paging"
                         v-if="noattenttotal > 10">
                        <el-pagination background
                                       layout="prev, pager, next, jumper"
                                       :total="noattenttotal"
                                       :small=false
                                       :page-size=10
                                       :page-count=20
                                       @current-change="handleCurrentChange"
                                       @prev-click="prevClick"
                                       @next-click="nextClick">
                        </el-pagination>
                    </div>
                </app-colmeeting>
            </div>

        </app-tab>
    </div>
</template>

<script>
import list from '@/components/list/list_1'
import empty from '@/components/list/empty'
import tab from '@/components/tabs/meeting'
import Colmeeting from '@/components/collapse/meeting'
export default {
    data () {
        return {
            currentPage: 1,
            type: 0,
            activeName: 'first',
            total: 0,
            childtotal: 0,
            attenttotal: 0,
            noattenttotal: 0,
            memtotal: 0,
            listInfo: [],
            mainlistInfo: '', // 我的主站
            childlistInfo: [], // 我的子站
            memlistInfo: [], // 我为成员/会员的学网
            attentlistInfo: [], // 我关注的学网
            noattentlistInfo: [], // 我取关的学网
            id: '1',
            tabOne: ['学网来潮', '学网尖峰', '学网专列', '我的学网']
        }
    },
    mounted () {
        this.getInfo(1)
    },

    methods: {
        /*
        * 获取list
        */
        getInfo (currentPage) {
            if (this.type === 3) {
                this.myMasterSite()
                this.mySubSites(currentPage)
                this.myJoinSites(currentPage)
                this.myConcernSites(currentPage)
                this.mynoConcernSites(currentPage)
                return false
            }
            let params = {
                userid: this.$store.state.userid,
                stmType: this.type,
                currentPage: currentPage || 1,
                onePageCount: 10
            }
            this._getData(this._getUrl('STUORG'), params, res => {
                this.total = res.data.countRecord
                this.listInfo = []
                res.data.listMap.forEach((elem, index) => {
                    let btnname = ''
                    let operate = ''
                    if (!elem.isConcern) {
                        btnname = '关    注'
                        operate = '1'
                    } else {
                        btnname = '取    关'
                        operate = '2'
                    }
                    this.listInfo.push({
                        name_0: elem.stunetName,
                        name_1: elem.sitetypeName,
                        mark: elem.stunetId,
                        bg: this._getUrl('SMALLIMGURL') + encodeURI(elem.logoUrl),
                        btnname: btnname,
                        operate: operate
                    })
                })
            })
        },
        handleCurrentChange (val) {
            this.getInfo(val)
        },
        prevClick (val) {
            this.getInfo(val)
        },
        nextClick (val) {
            this.getInfo(val)
        },
        /**
         * tab切换
         */
        change (tab, event) {
            this.type = Number(tab.index)
            this.getInfo(1)
        },
        /**
         * 关注 1/取关 2 operate
         */
        concern (obj) {
            console.log(obj)
            let params = {
                concernId: obj.info.mark,
                operate: obj.info.operate,
                type: 0,
                userid: this.$store.state.userid
            }
            this._getData(this._getUrl('STUCONCERN'), params, res => {
                if (res.code === 200) {
                    if (obj.info.operate === '1') {
                        this.$message({
                            showClose: true,
                            message: '关注成功',
                            type: 'success'
                        })
                    } else {
                        this.$message({
                            showClose: true,
                            message: '取关成功',
                            type: 'success'
                        })
                    }
                    this.listInfo.forEach((item, index) => {
                        console.log(item.mark, obj.info.mark)
                        if (item.mark === obj.info.mark) {
                            if (obj.info.operate === '1') {
                                item.btnname = '取    关'
                                item.operate = '2'
                            } else {
                                item.btnname = '关    注'
                                item.operate = '1'
                            }
                            return false
                        }
                    })
                }
            })
        },
        /**
         * 获取主站
         */
        myMasterSite () {
            this._getData(this._getUrl('MYMASTERSITE'), { stunetId: this.$store.state.stunetId }, res => {
                if (res.code === 200) {
                    this.mainlistInfo = {
                        name_0: this.$store.state.stunetName,
                        bg: this._getUrl('SMALLIMGURL') + res.data.logoUrl,
                        mark: this.$store.state.stunetId
                    }
                }
            })
        },
        /**
         * 我的子站
         */
        mySubSites (currentPage) {
            let params = {
                stunetId: this.$store.state.stunetId,
                currentPage: currentPage || 1,
                onePageCount: 10
            }
            this._getData(this._getUrl('MYSUBSITES'), params, res => {
                if (res.code === 200) {
                    this.childtotal = res.data.countRecord
                    this.childlistInfo = []
                    res.data.list.forEach(function (elem, index) {
                        this.childlistInfo.push({
                            name_0: elem.name,
                            name_1: elem.type,
                            bg: elem.bgurl ? this._getUrl('SMALLIMGURL') + encodeURI(elem.bgurl) : require('../../assets/noticebg.jpg'),
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
        myJoinSites (currentPage) {
            let params = {
                userid: this.$store.state.userid,
                currentPage: currentPage || 1,
                onePageCount: 10,
                stmType: -3
            }
            this._getData(this._getUrl('MYJOINSITES'), params, res => {
                if (res.code === 200) {
                    this.memtotal = res.data.countRecord
                    this.memlistInfo = []
                    res.data.list.forEach(function (elem, index) {
                        this.memlistInfo.push({
                            name_0: elem.stunetName,
                            name_1: elem.sitetypeName,
                            bg: elem.logoUrl ? this._getUrl('SMALLIMGURL') + encodeURI(elem.logoUrl) : require('../../assets/noticebg.jpg'),
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
        myConcernSites (currentPage) {
            let params = {
                userid: this.$store.state.userid,
                currentPage: currentPage || 1,
                onePageCount: 10,
                stmType: -2
            }
            this._getData(this._getUrl('MYCONCERNSITES'), params, res => {
                if (res.code === 200) {
                    this.attenttotal = res.data.countRecord
                    this.attentlistInfo = []
                    res.data.list.forEach(function (elem, index) {
                        this.attentlistInfo.push({
                            name_0: elem.stunetName,
                            name_1: elem.sitetypeName,
                            bg: elem.logoUrl ? this._getUrl('SMALLIMGURL') + encodeURI(elem.logoUrl) : require('../../assets/noticebg.jpg'),
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
        mynoConcernSites (currentPage) {
            let params = {
                userid: this.$store.state.userid,
                currentPage: currentPage || 1,
                onePageCount: 10,
                stmType: -1
            }
            this._getData(this._getUrl('MYNOCONCERNSITES'), params, res => {
                if (res.code === 200) {
                    this.noattenttotal = res.data.countRecord
                    this.noattentlistInfo = []
                    res.data.list.forEach(function (elem, index) {
                        this.noattentlistInfo.push({
                            name_0: elem.stunetName,
                            name_1: elem.sitetypeName,
                            bg: elem.logoUrl ? this._getUrl('SMALLIMGURL') + encodeURI(elem.logoUrl) : require('../../assets/noticebg.jpg'),
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
        'app-list': list,
        'app-empty': empty,
        'app-tab': tab,
        'app-colmeeting': Colmeeting
    }

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
