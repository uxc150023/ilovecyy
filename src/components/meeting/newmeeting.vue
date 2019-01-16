<template>
    <div id="nemMeeting">
        <div class="banner">
            <img src="../../assets/noticebg.jpg" alt="会议题图" id="bannerShowImg" class="bannerShowImg">
            <p class="meetname" id="meetname">{{meetname}}</p>
            <el-button type="info" @click="uploadBanner" class="uploadBanner">浏览/上传</el-button>
        </div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="会议名称">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="会议性质">
                        <el-select v-model="form.region" placeholder="请选择会议性质">
                            <el-option label="学术会议" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="会议时间" class="date">
                <div class="datePicker">
                    <el-date-picker
                        v-model="form.date"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">>
                    </el-date-picker>
                </div>
            </el-form-item>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="会议地点">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="参会嘉宾">
                        <el-input v-model="form.guest"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="会议费用">
                        <el-select v-model="form.fee">
                            <el-option label="免参会费" value="0"></el-option>
                            <el-option label="免参会费并免餐费" value="1"></el-option>
                            <el-option label="免参会费与食宿费" value="2"></el-option>
                            <el-option label="免参会费、食宿费，报销往来交通费" value="3"></el-option>
                            <el-option label="会议注册费" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12" v-if="form.fee == '4'">
                    <el-form-item label="注册费">
                        <el-input v-model="form.registeredFee"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="会议网址">
                        <el-input v-model="form.website"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="会议人数">
                        <el-input v-model="form.scale"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="会议主题" class="theme">
                <div class="themeList" v-for="(ele, index) in form.theme" :key="ele.key" :prop="'theme.' + index + '.value'">
                    <el-row>
                        <el-col :span="22">
                            <el-input v-model="ele.value"></el-input>
                        </el-col>
                        <el-col :span="2">
                            <el-button type="text" @click.prevent="addTheme" v-if="index == form.theme.length -1">+增加</el-button>
                            <el-button type="text" @click.prevent="delTheme(ele)" v-if="index < form.theme.length -1">-减少</el-button>
                        </el-col>
                    </el-row>
                </div>
            </el-form-item>

            <el-form-item label="其他问题">
                <app-quilleditor v-bind="form.otherQ"></app-quilleditor>
            </el-form-item>

            <el-form-item label="会议学科" class="subject">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-select v-model="form.firstSub">
                            <el-option label="免参会费" value="0"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <el-select v-model="form.secondSub">
                            <el-option label="免参会费" value="0"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="8" class="thirdSub">
                        <el-input v-model="form.thirdSub"></el-input>
                    </el-col>
                </el-row>
            </el-form-item>

            <el-form-item label="配乐选择" class="upmusic">
                <el-row>
                    <el-col :span="8" class="pdr10">
                        <el-select v-model="form.music">
                            <el-option label="配乐" value="0"></el-option>
                            <el-option label="不配乐" value="1"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="16">
                        <el-upload
                            class="upload"
                            action="https://jsonplaceholder.typicode.com/posts/"
                            multiple
                            :limit="1"
                            :on-exceed="handleExceed">
                            <div class="el-upload__text">浏览/选择</div>
                        </el-upload>
                    </el-col>
                </el-row>
            </el-form-item>
            <div class="musicName">文件名</div>

            <div class="holder">
                <el-form-item label="主办者">
                    <div class="hostList" v-for="(ele, index) in form.host" :key="ele.key" :prop="'host.' + index + '.value'">
                        <el-row>
                            <el-col :span="21">
                                <el-input v-model="ele.value"></el-input>
                            </el-col>
                            <el-col :span="3">
                                <el-button type="text" @click.prevent="addHost" v-if="index == form.host.length -1">+增加</el-button>
                                <el-button type="text" @click.prevent="delHost(ele)" v-if="index < form.host.length -1">-减少</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-form-item>
                <el-form-item label="协办者">
                    <div class="coHostList" v-for="(ele, index) in form.coHost" :key="ele.key" :prop="'coHost.' + index + '.value'">
                        <el-row>
                            <el-col :span="21">
                                <el-input v-model="ele.value"></el-input>
                            </el-col>
                            <el-col :span="3">
                                <el-button type="text" @click.prevent="addcoHost" v-if="index == form.coHost.length -1">+增加</el-button>
                                <el-button type="text" @click.prevent="delcoHost(ele)" v-if="index < form.coHost.length -1">-减少</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-form-item>
                <el-form-item label="承办者">
                    <div class="coTakeList" v-for="(ele, index) in form.coTake" :key="ele.key" :prop="'coTake.' + index + '.value'">
                        <el-row>
                            <el-col :span="21">
                                <el-input v-model="ele.value"></el-input>
                            </el-col>
                            <el-col :span="3">
                                <el-button type="text" @click.prevent="addcoTake" v-if="index == form.coTake.length -1">+增加</el-button>
                                <el-button type="text" @click.prevent="delcoTake(ele)" v-if="index < form.coTake.length -1">-减少</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </el-form-item>
            </div>

            <el-form-item class="btnBox">
                <el-button @click="preview">预&emsp;&emsp;览</el-button>
                <el-button type="primary" @click="onSubmit">确&emsp;&emsp;定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import Quilleditor from '@/components/quilleditor/quilleditor'
    export default {
        data() {
            return {
                meetname: '会议题目',
                letter: [],
                form: {
                    name: '',
                    region: '',
                    date: '',
                    date1: '',
                    date2: '',
                    address: '',
                    guest: '',
                    fee: '',
                    registeredFee: '',
                    scale: '',
                    theme: [{
                        value: '',
                        key: Date.now()
                    }],
                    otherQ: '',
                    music: '',
                    firstSub: '',
                    secondSub: '',
                    thirdSub: '',
                    website: '',
                    host: [{
                        value: '',
                        key: Date.now()
                    }],
                    coHost: [{
                        value: '',
                        key: Date.now()
                    }],
                    coTake: [{
                        value: '',
                        key: Date.now()
                    }],
                }
            }
        },
        mounted() {

        },
        components: {
            'app-quilleditor': Quilleditor,
        },
        methods: {
            uploadBanner() {
                // this.$parent.cutimgShowa()
                this.$emit('cutimgShowa')
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            selectFee(e) {
                console.log(this.form.fee)
            },
            addTheme() {
                this.form.theme.push({
                    value: '',
                    key: Date.now()
                });
            },
            delTheme(item) {
                var index = this.form.theme.indexOf(item)
                if (index !== -1) {
                    this.form.theme.splice(index, 1)
                }
            },
            addHost() {
                this.form.host.push({
                    value: '',
                    key: Date.now()
                });
            },
            delHost(item) {
                var index = this.form.host.indexOf(item)
                if (index !== -1) {
                    this.form.host.splice(index, 1)
                }
            },
            addcoHost() {
                this.form.coHost.push({
                    value: '',
                    key: Date.now()
                });
            },
            delcoHost(item) {
                var index = this.form.coHost.indexOf(item)
                if (index !== -1) {
                    this.form.coHost.splice(index, 1)
                }
            },
            addcoTake() {
                this.form.coTake.push({
                    value: '',
                    key: Date.now()
                });
            },
            delcoTake(item) {
                var index = this.form.coTake.indexOf(item)
                if (index !== -1) {
                    this.form.coTake.splice(index, 1)
                }
            },
            preview() {
                console.log("yulan")
            },
            onSubmit() {
                console.log('submit!');
            },
        },

    }
</script>

<style lang="scss">
    #nemMeeting {
        .banner {
            width: 860px;
            height: 250px;
            margin-bottom: 20px;
            position: relative;
            .bannerShowImg {
                width: 860px;
                height: 250px;
            }
            .meetname {
                font-size:36px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color: #333;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
            }
            .uploadBanner {
                position: absolute;
                right: 30px;
                bottom: 20px;
            }
        }
        .el-form {
            padding:  0 70px;
            .el-select {
                display: block;
            }
            .ql-container.ql-snow {
                height: 180px;
            }
            .date {
                .datePicker {
                    text-align: left;
                }
            }
            .theme {
                margin-bottom: 12px;
                .themeList {
                    margin-bottom: 10px;
                }
            }
            .subject {
                .el-col {
                    padding-left: 0!important;
                }
                .el-row {
                    margin: 0!important;
                }
                .thirdSub {
                    padding-right: 0!important;
                }
            }
            .upmusic {
                .upload {
                    text-align: left;
                    padding-left: 20px;
                    .el-upload__text {
                        color: #0092ff;
                        font-size: 14px;
                    }
                }
                .pdr10 {
                    padding-right: 10px;
                }
            }
            .musicName {
                height: 36px;
                line-height: 36px;
                background-color: #fafafa;
                text-align: left;
                padding: 0 12px;
                margin: -12px 0 22px 0;
            }
            .holder {
                padding-left: 210px;
            }
            .btnBox {
                text-align: right;
                margin-top: 40px;
            }
        }
    }
</style>
