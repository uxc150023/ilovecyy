<template>
    <div class="person-content">
        <app-tab v-bind:id="id"
                 v-bind:tabItem="tabOne"
                 v-on:change="change">
            <div v-if="type < 2">
                <div v-for="(item, index) in stuperlistInfo"
                     :key='index'>
                    <app-list :info='item'
                              v-on:clickbtn="concern"></app-list>
                </div>
                <div v-if="stuperlistInfo.length === 0">
                    <app-empty></app-empty>
                </div>
                <div class="paging"
                     v-if="stupertotal > 10">
                    <el-pagination background
                                   layout="prev, pager, next, jumper"
                                   :total="stupertotal"
                                   :small=false
                                   :page-size=10
                                   :page-count=20
                                   @current-change="handleCurrentChange"
                                   @prev-click="prevClick"
                                   @next-click="nextClick">
                    </el-pagination>
                </div>
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
            type: 0,
            activeName: 'first',
            stupertotal: 0,
            stuperlistInfo: '', // 学人来潮
            tabOne: ['学人来潮', '学人尖峰', 'xxxx'],
            id: '1'
        }
    },
    components: {
        'app-list': list,
        'app-empty': empty,
        'app-tab': tab,
        'app-colmeeting': Colmeeting
    },
    methods: {
        /**
         * tab切换
         */
        change (tab, event) {
            this.type = Number(tab.index)
            this.getInfo(1)
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

        getInfo (currentPage) {
            this.stupers(currentPage)
        },

        /**
         * 学人来潮
         */
        stupers (currentPage) {
            var self = this
            var params = {
                currentPage: currentPage || 1,
                onePageCount: 10,
                stmType: this.type
            }
            this._getData(this._getUrl('STUPERS'), params, res => {
                if (res.code === 200) {
                    self.stupertotal = res.data.countRecord
                    self.stuperlistInfo = []
                    res.data.listMap.forEach(function (elem, index) {
                        self.stuperlistInfo.push({
                            name_0: elem.name,
                            bg: elem.headImg ? this._getUrl('SMALLIMGURL') + encodeURI(elem.headImg) : require('../../assets/noticebg.jpg'),
                            mark: elem.stunetId,
                            url: elem.stunetUrl,
                            btnmark: elem.stunetId,
                            btnname: elem.ConcernStatus
                        })
                    })
                }
            })
        },
        /**
         * 关注 1/取关 2 operate
         */
        concern (obj) {
            let operate = '1'
            let params = {
                concernId: obj.info.btnmark,
                operate: operate,
                type: 0,
                userid: this.$store.state.userid
            }
            this._getData(this._getUrl('STUCONCERN'), params, res => {
                if (res.code === 200) {
                    if (operate === '1') {
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

                    // this.listInfo.forEach(function(item, index){
                    //     if(item.mark == obj.btnmark){
                    //         item.btnname = '取    关'
                    //     }
                    // })
                }
            })
        }
    },
    mounted () {
        this.getInfo(1)
    }
}

</script>

<style lang="scss">
.person-content {
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
