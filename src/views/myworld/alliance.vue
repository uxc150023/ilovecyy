<template>
    <div class="alliance-content">
    	<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="学网来潮" name="first">
                <div v-for="(item, index) in listInfo">
                    <app-list :info='item'></app-list>
                </div>
                <div v-if="listInfo.length === 0">
                    <app-empty></app-empty>
                </div>
            </el-tab-pane>
			<el-tab-pane label="学网尖峰" name="second">
                <div v-for="(item, index) in listInfo">
                    <app-list :info='item'></app-list>
                </div>
                <div v-if="listInfo.length === 0">
                    <app-empty></app-empty>
                </div>        
            </el-tab-pane>
			<!-- <el-tab-pane label="学网专列" name="third">角色管理</el-tab-pane> -->
			<!-- <el-tab-pane label="我的学网" name="fourth">我的学网</el-tab-pane> -->
		</el-tabs>
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
    export default {
        data() {
            return {
                currentPage: 1,
                type: 0,
                activeName: 'first',
                total: 0,
                listInfo: [
                    
                ],
            }
        },
        mounted() {
            this.getInfo(1);
        },

        methods: {
            handleClick(tab) {
                this.type = Number(tab.index)
                this.getInfo()
            },
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
        },
        components: {
            "app-list": list,
            "app-empty": empty,
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
