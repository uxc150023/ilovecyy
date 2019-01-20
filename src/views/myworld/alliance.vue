<template>
    <div class="alliance-content">
    	<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="学网来潮" name="first">
                <div v-for="(item, index) in listInfo">
                    <app-list :info='item'></app-list>
                </div>
                <el-pagination
                    background
                    layout="prev, pager, next"
                    :total="1000"
                    :small=false
                    :page-size=10
                    :page-count=20>
                </el-pagination>
            </el-tab-pane>
			<el-tab-pane label="学网尖峰" name="second">配置管理</el-tab-pane>
			<el-tab-pane label="学网专列" name="third">角色管理</el-tab-pane>
			<el-tab-pane label="我的学网" name="fourth">定时任务补偿</el-tab-pane>
		</el-tabs>
    </div>
</template>

<script>
    import list from '@/components/list/list_1'
    import commonAction from "@/js/commonAction"
    import store from '@/vuex/store.js'
    import {_getUrl, _getData} from '@/service/getdata.js'
    export default {
        data() {
            return {
                activeName: 'first',
                listInfo: [
                    {name_1: 'hao'},
                    {name_1: 'hao1'}
                ],
            }
        },
        mounted() {

        },

        methods: {
            handleClick() {

            },
            /*
            * 获取list
            */
            getInfo() {
                _getData(_getUrl('STUORG'), {}, function(){

                })
            }
        },
        components: {
            "app-list":list,
        },


    }

</script>

<style lang="scss">
    .alliance-content {
        padding: 15px;
    	.el-tabs__nav-scroll {
            .el-tabs__nav {
                float: right;
            }
    	}
    }
</style>
