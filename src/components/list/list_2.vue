<template>
    <div id="listTwo">
        <div class="item"
             v-for="(item, index) in dataListObj.dataList"
             :key="index"
             v-if="item.Type === 'Pro'"
             @click="openRead({pid: item.production_id})">
            <div class="media-left">
                <img src="../../assets/meeting.jpg"
                     v-if="item.Tehmatic.length === 0">
                <img :src="item.Tehmatic">
            </div>
            <div class="media-body">
                <el-row>
                    <el-col :span="3">
                        <div class="grid-content">{{item.name || item.Writer}}</div>
                    </el-col>
                    <el-col :span="14">
                        <div class="grid-content title">{{item.productionName ? item.productionName : "无题"}} <span class="integral">{{item.Integral}}</span></div>
                    </el-col>
                    <el-col :span="3">
                        <div class="grid-content title">{{item.ForumName}}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content">{{item.upload_time.split(" ")[0]}}</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="21">
                        <div class="grid-content">{{item.intro}}</div>
                    </el-col>
                    <el-col :span="3"
                            v-if="dataListObj.btnshow === true">
                        <div class="grid-content"
                             v-if="item.CRead === 'Y'">
                            <div class="">内部阅读</div>
                            <el-button type="text"
                                       class="mybtn—text"
                                       @click="collectPro({pid:item.production_id,oldForm:item.oldForm,Type:item.Type,mark:index})"
                                       v-text="item.btnText"></el-button>
                        </div>
                        <div class="grid-content"
                             v-if="item.CRead === 'N'">
                            <el-button type="text"
                                       class="mybtn—text"
                                       @click="collectPro({pid:item.production_id,oldForm:item.oldForm,Type:item.Type,mark:index})"
                                       v-text="item.btnText"></el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="item"
             v-for="(item, index) in dataListObj.dataList"
             :key="index"
             v-if="item.Type === 'styleOne'"
             @click="openRead({pid: item.production_id})">
            <div class="media-left">
                <img src="../../assets/meeting.jpg"
                     v-if="item.Tehmatic.length === 0">
                <img :src="item.Tehmatic">
            </div>
            <div class="media-body">
                <el-row>
                    <el-col :span="3">
                        <div class="grid-content">{{item.name}}</div>
                    </el-col>
                    <el-col :span="14">
                        <div class="grid-content title">{{item.productionName ? item.productionName : "无题"}} <span class="integral">{{item.Integral}}</span></div>
                    </el-col>
                    <el-col :span="3">
                        <div class="grid-content title">{{item.ForumName}}</div>
                    </el-col>
                    <el-col :span="4">
                        <div class="grid-content">{{item.upload_time.split(" ")[0]}}</div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="21">
                        <div class="grid-content">{{item.intro}}</div>
                    </el-col>
                    <el-col :span="3"
                            v-if="dataListObj.btnshow === true && dataListObj.oneType !== '已删读品' && dataListObj.oneType !== '收藏读品'">
                        <div class="grid-content">
                            <el-button type="text"
                                       class="mybtn—text"
                                       @click="sortCollect({pid:item.production_id,mark:index,isAgain:dataListObj.oneType !== '最新读品',oldForm:item.oldForm})">分类收藏</el-button>
                        </div>
                    </el-col>
                    <el-col :span="3"
                            v-if="dataListObj.btnshow === true && dataListObj.oneType === '已删读品'">
                        <div class="grid-content">
                            <el-button type="text"
                                       class="mybtn—text"
                                       @click="recoverPro({pid:item.production_id,mark:index,e:$event})">恢复</el-button>
                            <el-button type="text"
                                       class="mybtn—text"
                                       @click="deletePro({pid:item.production_id,mark:index,isClear:dataListObj.oneType == '已删读品',e:$event})">清除</el-button>
                        </div>
                    </el-col>
                    <el-col :span="3"
                            v-if="dataListObj.btnshow === true && dataListObj.oneType === '收藏读品'">
                        <div class="grid-content">
                            <el-button type="text"
                                       class="mybtn—text"
                                       @click="sortCollect({pid:item.production_id,mark:index,isAgain:dataListObj.oneType !== '最新读品',oldForm:item.oldForm})">分类</el-button>
                            <el-button type="text"
                                       class="mybtn—text"
                                       @click="deletePro({pid:item.production_id,mark:index,isClear:dataListObj.oneType == '已删读品',e:$event})">清除</el-button>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="item styleTwo">
            <el-row>
                <el-col :span="6"
                        v-for="(item, index) in dataListObj.dataList"
                        :key="index"
                        v-if="item.Type === 'styleTwo'">
                    <div class="grid-content proList">
                        <div class="media-top">
                            <img class="tehmatic"
                                 src="../../assets/meeting.jpg"
                                 v-if="item.Tehmatic.length === 0">
                            <img class="tehmatic"
                                 :src="item.Tehmatic">
                        </div>
                        <div class="media-down">
                            <p class="info author overHide">{{ item.name }}</p>
                            <p class="info bookname overHide">{{ item.productionName ? item.productionName : "无题"}}</p>
                            <div class="info intro"
                                 style="display: none">{{ item.intro }}</div>
                            <div class="btnBox"
                                 v-if="dataListObj.btnshow === true && dataListObj.oneType !== '已删读品'">
                                <el-button type="text"
                                           class="mybtn—text leftbtn"
                                           @click="sortCollect({pid:item.production_id,mark:index,isAgain:dataListObj.oneType !== '最新读品',oldForm:item.oldForm})">重新分类</el-button>
                                <el-button type="text"
                                           class="mybtn—text rightbtn"
                                           @click="deletePro({pid:item.production_id,mark:index,isClear:dataListObj.oneType == '已删读品',e:$event})">删除</el-button>
                            </div>
                            <div class="btnBox"
                                 v-if="dataListObj.btnshow === true && dataListObj.oneType === '已删读品'">
                                <el-button type="text"
                                           class="mybtn—text rightbtn"
                                           @click="recoverPro({pid:item.production_id,mark:index,e:$event})">恢复</el-button>
                                <el-button type="text"
                                           class="mybtn—text rightbtn"
                                           @click="deletePro({pid:item.production_id,mark:index,isClear:dataListObj.oneType == '已删读品',e:$event})">清除</el-button>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {

        }
    },
    props: {
        dataListObj: {
            dataList: [],
            btnshow: ''
        }
    },
    mounted () {
    },
    methods: {
        // 收藏
        collectPro (data) {
            this.$emit('collectPro', data)
        },
        // 分类收藏
        sortCollect (data) {
            this.$emit('sortCollect', data)
        },
        // 删除作品
        deletePro (data) {
            this.$emit('deletePro', data)
        },
        // 恢复作品
        recoverPro (data) {
            this.$emit('recoverPro', data)
        },
        // read
        openRead (pid) {
            this.$emit('openread', pid)
        }
    }
}
</script>
<style lang="scss" scoped>
#listTwo {
    .item {
        padding: 10px;
        height: 96px;
        box-sizing: border-box;
        border-bottom: 2px solid #fafafa;
        .media-left {
            background-color: #fafafa;
            width: 118px;
            height: 74px;
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
						overflow: hidden;
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
    .styleTwo {
        height: 220px;
        border-bottom: none;
        .proList {
            width: 180px;
            height: 200px;
            margin: 0 auto;
            box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 15px 1px;
            padding: 10px 10px 0;
            margin-bottom: 20px;
            box-sizing: border-box;
            .media-top {
                height: 100px;
                width: 160px;
                background-color: #eeeeee;
                text-align: center;
                line-height: 100px;
                .tehmatic {
                    max-height: 100%;
                    max-width: 100%;
                    vertical-align: middle;
                }
            }
            .media-down {
                .info {
                    padding: 5px 0;
                }
                .author {
                    font-size: 14px;
                    color: #707070;
                }
                .btnBox {
                    padding: 0;
                    position: relative;
                    opacity: 0;
                    .leftbtn {
                        position: absolute;
                        left: 0;
                    }
                    .rightbtn {
                        position: absolute;
                        right: 0;
                    }
                }
            }
        }
        .proList:hover {
            cursor: pointer;
            .btnBox {
                opacity: 1;
            }
        }
    }
}
</style>
