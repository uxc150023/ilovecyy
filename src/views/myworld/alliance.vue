<template>
    <div class="alliance-content">
        <app-tab v-bind:id="id" v-bind:tabItem="tabOne" v-on:change="change">
            <div v-for="(item, index) in listInfo">
                <app-list :info='item' v-on:clickbtn="concern" :btnmark="String(item.mark)"></app-list>
            </div>
            <div v-if="listInfo.length === 0">
                <app-empty></app-empty>
            </div>
        </app-tab>

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
</template>

<script>
    import list from '@/components/list/list_1'
    import commonAction from "@/js/commonAction"
    import store from '@/vuex/store.js'
    import empty from '@/components/list/empty'
    import {_getUrl, _getData} from '@/service/getdata.js'
    import tab from '@/components/tabs/meeting'
    export default {
        data() {
            return {
                currentPage: 1,
                type: 0,
                activeName: 'first',
                total: 0,
                listInfo:'',
                modalInfo: {
                    title: '新建会议',
                    show: false
                },
                id:'1',
                tabOne: ['学网来潮', '学网尖峰','学网专列', '我的学网'],
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
             * 关注
             */
            concern(obj){
                let params = {
                    concernId: obj.btnmark,
                    operate: "1",
                    type: 0,
                    userid: store.state.userid
                }
                _getData(_getUrl('STUCONCERN'), params, res => {
                    if(res.code === 200){
                        this.$message({
                            showClose: true,
                            message: '关注成功',
                            type: 'success'
                        });
                        this.listInfo.forEach(function(item, index){
                            if(item.mark == obj.btnmark){
                                item.btnname = '取    关'
                            }
                        })
                    }
                })
            }
            
        },
        components: {
            "app-list": list,
            "app-empty": empty,
            "app-tab": tab,
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
