<template>
    <div id="listTwo">
        <div class="item" v-for="(item, index) in dataListObj.dataList" v-if="item.Type === 'Pro'">
            <div class="media-left">
                <img src="../../assets/meeting.jpg" v-if="item.Tehmatic.length === 0">
                <img :src="item.Tehmatic">
            </div>
            <div class="media-body">
                <el-row>
                    <el-col :span="3"><div class="grid-content">{{item.name || item.Writer}}</div></el-col>
                    <el-col :span="15"><div class="grid-content title">{{item.productionName ? item.productionName : "无题"}} <span class="integral">{{item.Integral}}</span></div></el-col>
                    <el-col :span="3"><div class="grid-content title">{{item.ForumName}}</div></el-col>
                    <el-col :span="3"><div class="grid-content">{{item.upload_time.split(" ")[0]}}</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="21"><div class="grid-content">{{item.intro}}</div></el-col>
                    <el-col :span="3" v-if="dataListObj.btnshow === true">
                        <div class="grid-content" v-if="item.CRead === 'Y'">
                            <div class="">内部阅读</div>
                            <el-button type="text" class="mybtn—text" @click="collectPro"
                                       :data-pid="item.production_id"
                                       :data-form="item.oldForm"
                                       :data-type="item.Type">收藏</el-button>
                        </div>
                        <div class="grid-content" v-if="item.CRead === 'N'">
                            <el-button type="text" class="mybtn—text" @click="collectPro">收藏</el-button>
                        </div>
                    </el-col>
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
            dataListObj: {
                dataList: [],
                btnshow: '',
            }
        },
        mounted() {

        },
        methods: {
            collectPro($event) {
                this.$emit('collectPro',$event);
            }
        }
    }
</script>
<style lang="scss" scoped>
    #listTwo {
        .item {
            padding: 10px;
            height: 96px;
            box-sizing:border-box;
            border-bottom: 2px solid #fafafa;
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
                    margin-bottom: 15px;
                    .integral {
                        color: #999;
                    }
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
                .mybtn—text {
                    padding: 0;
                }
            }
        }
    }
</style>

