<template>
    <div>
        <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                    <span class="bar"></span>
                    {{title}}
                </template>
                <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeName: '1'
            };
        },
        props: ['title'],
        mounted() {
        },
        methods: {
            handleChange(val) {
                console.log(val);
            }
        }
    }
</script>
<style lang="scss">
    .el-collapse {
        margin-bottom: 10px;
        .el-collapse-item__header {
            font-size: 16px;
            color: #3366CC;
            border: none;
            .bar {
                width: 3px;
                height: 20px;
                background-color: #3366CC;
                margin-right: 10px;
            }
        }
        .el-collapse-item__wrap {
            border: none;
            .el-collapse-item__content {
                border: none;
            }
        }
    }

</style>
