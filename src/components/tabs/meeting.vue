<template>
    <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="item of tabItem" :label="item" :name="item"></el-tab-pane>
    </el-tabs>
</template>
<script>
    export default {
        data() {
            return {
                activeName:''
            };
        },
        props:{
            tabItem:'',
        },
        methods: {
            handleClick(tab, event) {
            }
        },
        created() {
            this.activeName = this.tabItem[0]
        }
    };
</script>
<style lang="scss" scoped>
    .el-tabs {
        background-color: #fff;
        margin-bottom: 10px;
        .el-tabs__header {
            .el-tabs__item {
                color: #3366CC;
            }
            .el-tabs__item.is-active {
                color: #3366CC;
            }
        }
    }
</style>
