<template>
    <div class="paging">
        <el-pagination
            background
            layout="total,prev, pager, next, jumper"
            :total='total'
            :page-size=10
            :id="id"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                myCurrentPage: this.currentPage   //①创建props属性result的副本--myResult
            };
        },
        watch: {
            handleCurrentChange(val) {
                this.$emit("getCurrentPage",val)
            },
            prevClick(val) {
                this.$emit("getCurrentPage",val)
            },
            nextClick(val) {
                this.$emit("getCurrentPage",val)
            },
            // currentPage(val) {
            //     this.myCurrentPage = val;   //②监听外部对props属性result的变更，并同步到组件内的data属性myResult中
            // },
            // myCurrentPage(val){
            //     this.$emit("on-result-change",val);//③组件内对myResult变更后向外部发送事件通知
            // }
        },
        props: {
            currentPage: {
                type: Number,
                default: 1,
            },
            type: 0,
            total: [],
            id: '',
        },

        mounted() {

        }
    }
</script>

<style>

</style>
