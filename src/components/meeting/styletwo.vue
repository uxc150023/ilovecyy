<template>
    <div>
        <div class="item" v-for="(item, index) in meetInfo">
            <div class="media-left">
                <img src="../../assets/meeting.jpg">
            </div>
            <div class="media-body">
                <el-row>
                    <el-col :span="12"><div class="grid-content title">
                        <span v-for="ele in JSON.parse(item.host)">{{ele}}</span>
                    </div></el-col>
                    <el-col :span="12"><div class="grid-content title">{{item.name.replace(/<\/?.+?>/g,"")}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content">{{item.startTime.substring(0,10)}} 至 {{item.endTime.substring(0,10)}}</div></el-col>
                    <el-col :span="12"><div class="grid-content">{{item.place}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="4" :offset="20"><div class="grid-content"><el-button type="text" class="mybtn—text">文字按钮</el-button></div></el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {

            };
        },
        props:{
            meetInfo: {},
        },
        mounted() {

        },
        methods: {

        }
    }
</script>
<style lang="scss" scoped>
    .item {
        height: 96px;
        border-bottom: 2px solid #fafafa;
        box-sizing:border-box;
        padding: 10px;
        .media-left {
            background-color: #fafafa;
            width: 118px;
            height: 74px;
            /*margin: 0 8px 40px 12px;*/
            float: left;
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }
        .media-body {
            margin-left: 138px;
            height: 74px;
            .el-row {
                height: 16px;
                margin-bottom: 12px;
                .el-col {
                    height: 16px;
                    .grid-content {
                        height: 16px;
                        line-height: 16px;
                        font-size: 14px;
                        font-family: PingFangSC-Regular;
                        font-weight: 400;
                        color: #707070;
                        text-align: left;
                    }
                    .title {
                        font-size: 16px;
                        font-weight: 600;
                        color: #333333;
                    }
                }
            }
        }
        .mybtn—text {
            padding: 0;
        }
    }
</style>
