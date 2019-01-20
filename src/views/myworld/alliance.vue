<template>
    <div class="alliance-content">
    	<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="用户管理" name="first">
                <app-list :listInfo='listInfo'></app-list>         
            </el-tab-pane>
			<el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
			<el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
			<el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
		</el-tabs>
    </div>
</template>

<script>
    import list from '@/components/list/list_1'
    export default {
        data() {
            return {
                activeName: 'first',
                listInfo: [
                    {
                        name_1: '设置'
                    }
                ]
            }
        },
        mounted() {

        },

        methods: {
            handleClick() {

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
