<template>
    <div id="nemMeeting">
        <div class="banner">
            <img src="../../assets/noticebg.jpg" class="bannerShowImg" v-if="bgimg === ''">
            <img :src="bgimg" class="bannerShowImg" v-if="bgimg !== ''">
            <p class="meetname" id="meetname">{{form.name}}</p>
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
                        <el-select v-model="form.type" placeholder="请选择会议性质">
                            <el-option label="学术会议" value="0"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="会议时间" class="date">
                <div class="datePicker">
                    <el-date-picker
                        v-model="date"
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
                        <el-input v-model="form.place"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="参会嘉宾">
                        <el-input v-model="form.mguestVos[0].name"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-form-item label="嘉宾介绍">
                <app-quilleditor v-bind:id="id_1" v-bind:content="guestIntro" v-on:getContent="getContent"></app-quilleditor>
            </el-form-item>

            <el-row :gutter="20">
                <el-col :span="12">
                    <el-form-item label="会议费用">
                        <el-select v-model="form.feeType">
                            <el-option label="免参会费" value="0"></el-option>
                            <el-option label="免参会费并免餐费" value="1"></el-option>
                            <el-option label="免参会费与食宿费" value="2"></el-option>
                            <el-option label="免参会费、食宿费，报销往来交通费" value="3"></el-option>
                            <el-option label="会议注册费" value="4"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="12" v-if="form.feeType == '4'">
                    <el-form-item label="注册费">
                        <el-input v-model="form.enrollFee"></el-input>
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
                <app-quilleditor v-bind:id="id_2" v-bind:content="remark" v-on:getContent="getContent"></app-quilleditor>
            </el-form-item>

            <el-form-item label="会议学科" class="subject">
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-select v-model="form.firstSub" @change="changeFirstSub">
                            <el-option v-for="(ele, index) in firstSubArr" :key='index' :label="ele.name" :value="ele.code"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <el-select v-model="form.secondSub">
                            <el-option v-for="(ele, index) in secondSubArr" :key='index' :label="ele.name" :value="ele.code"></el-option>
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
                        <el-radio v-model="form.music" label="1">配乐</el-radio>
                        <el-radio v-model="form.music" label="2">不配乐</el-radio>
                    </el-col>
                    <el-col :span="16" v-if="form.music === '1'">
                        <el-upload accept="audio/mp3,audio/ogg"  class="upload" :action="uploadUrl" :file-list="uploadFiles" :show-file-list="false" multiple :limit="1"
                                   :before-upload="beforeUploadAudio"
                                   :http-request="handleAudioSuccess">
                            <div class="el-upload__text">浏览/选择</div>
                        </el-upload>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-progress v-if="progressShow" color="#0092ff" :percentage="audioUploadPercent"></el-progress>
            <div class="musicName" v-if="mnameShow && form.music === '1'">{{form.mcname}}</div>

            <el-form-item>
                <app-quilleditor v-bind:id="id_3" v-bind:content="mremark" v-on:getContent="getContent"></app-quilleditor>
            </el-form-item>

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

        <app-modal :modalInfo='cutimgModalInfo'>
            <app-cutimgdialog v-on:getCutimg='getCutimg' :id="id_bg"></app-cutimgdialog>
        </app-modal>

    </div>
</template>
<script>
    import modal from '@/components/modal/modal'
    import Quilleditor from '@/components/quilleditor/quilleditor'
    import Uploadmusic from '@/components/upfiles/uploadmusic'
    import Cutimgdialog from '@/components/cutImg/cutimgdialog'
    import {_getUrl, _getData} from '@/service/getdata.js'
    import store from '@/vuex/store.js'

    export default {
        data() {
            return {
                uploadUrl: _getUrl('UPMUSIC'),
                uploadFiles:[],
                progressShow: false,
                audioUploadPercent: 0,
                mnameShow: false,
                id_1: "guestIntro",
                id_2: "otherQ",
                id_3: "mremark",
                date: '',
                remark: {content: ''},
                mremark: {content: '<p>欢迎感兴趣的学友报名参会，共襄盛事。报名者可以选择正式参会、也可以远程参会。报到、注册与会议的更详细消息，均请登录会议官网。</p>'},
                guestIntro: {content: ''},
                cutimgModalInfo: {
                    show: false,
                    title: '上传图片',
                    modal: false
                },
                id_bg: 'bgCutimg',
                bgimg: '',
                firstSubArr: [],
                secondSubArr: [],
                form: {
                    name: '',
                    type: '',
                    startTime: '',
                    endTime: '',
                    place: '',
                    feeType: '',
                    mguestVos: [{name: '',introduce: ''}],
                    enrollFee: '',
                    scale: '',
                    theme: [{
                        value: '',
                        key: Date.now()
                    }],
                    music: '1',
                    mcname: '',
                    mUrl:'',
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
        props: {
            modalInfo: {
                title: '',
                show: ''
            }
        },
        mounted() {
            this.getFirstSub();

        },
        components: {
            "app-modal": modal,
            'app-quilleditor': Quilleditor,
            'app-cutimgdialog': Cutimgdialog,
            'app-uploadmusic': Uploadmusic,
        },
        methods: {
            // 点击上传banner
            uploadBanner() {
                this.cutimgModalInfo.show = true
            },
            getCutimg (obj) {
                this.cutimgModalInfo.show = false
                this.bgimg = _getUrl('IMGURL') + encodeURI(encodeURI(obj.data))
            },
            //获取editor内容
            getContent(quill) {
                console.log(quill)
                switch (quill.id) {
                    case 'guestIntro':
                        this.guestIntro.content = quill.quill.html;
                        break;
                    case 'otherQ':
                        this.remark.content = quill.quill.html;
                        break;
                    case 'mremark':
                        this.mremark.content = quill.quill.html;
                        break;
                }
            },
            // 上传音乐验证
            beforeUploadAudio(file) {
                const isLt10M = file.size / 1024 / 1024  < 10;
                if (!isLt10M) {
                    this.$message.error('上传文件大小不能超过10MB哦!');
                    return false;
                }
            },
            //上传进度显示
            uploadAudioProcess(event, file, fileList) {
                this.progressShow = true
                this.form.mcname = file.name;
                file.percent = event.loaded/event.total*100
                this.audioUploadPercent = Number(file.percent.toFixed(0)); //file.percentage获取文件上传进度
            },
            //上传成功
            handleAudioSuccess(params) {
                var self = this
                var form = new FormData();
                form.append("files",params.file);
                var xhr = new XMLHttpRequest();
                xhr.open("post", this.uploadUrl, true);
                xhr.upload.addEventListener("progress", function(event){
                    self.uploadAudioProcess(event,params.file)
                }, false); //监听上传进度
                xhr.onload = function () {
                    if(this.status == 200||this.status == 304){
                        let res = 'response' in xhr ? xhr.response : xhr.responseText
                        self.form.mUrl = JSON.parse(JSON.parse(res)).data[0].data
                        self.form.mcname = params.file.name;
                        self.mnameShow = true;
                        self.progressShow = false;
                    }
                };
                xhr.send(form);
            },
            //获取一级学科
            getFirstSub() {
                _getData(_getUrl('SUBGET'), {"levelCode": 0}, res => {
                    for(var index in res.data){
                        this.firstSubArr.push(res.data[index]);
                    }
                });
            },
            //获取二级学科
            changeFirstSub() {
                _getData(_getUrl('SUBGET'), {"levelCode": 1,"firstSub": this.form.firstSub}, res => {
                    for(var index in res.data){
                        this.secondSubArr.push(res.data[index]);
                    }
                })
            },
            //增加主题
            addTheme() {
                this.form.theme.push({
                    value: '',
                    key: Date.now()
                });
            },
            //删除主题
            delTheme(item) {
                var index = this.form.theme.indexOf(item)
                if (index !== -1) {
                    this.form.theme.splice(index, 1)
                }
            },
            // 增加主办者
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
            // 增加协办者
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
            // 增加承办者
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
            // 预览
            preview() {
                console.log("yulan")
            },
            // 提交数据
            onSubmit() {
                var self = this;
                let theme = [];
                let coTake = [];
                let coHost = [];
                let host = [];

                this.form.startTime = this.date[0];
                this.form.endTime = this.date[1];
                this.form.mguestVos[0].introduce = this.guestIntro.content;
                this.form.remark = this.remark.content;
                this.form.mremark = this.mremark.content;

                for(let i in this.form.theme) {
                    theme.push(this.form.theme[i].value);
                }
                this.form.theme = theme;

                for(let i in this.form.coTake) {
                    coTake.push(this.form.coTake[i].value);
                }
                this.form.coTake = coTake;

                for(let i in this.form.coHost) {
                    coHost.push(this.form.coHost[i].value);
                }
                this.form.coHost = coHost;

                for(let i in this.form.host) {
                    host.push(this.form.host[i].value);
                }
                this.form.host = host;
                this.form.userid = store.state.userid;

                _getData(_getUrl('MEET_SAVE'),this.form,res => {
                    console.log(res)
                    if (res.code === 200) {
                        store.commit('SET_MEETINFO', {meetId: res.data});
                        this.$message({
                            message: '恭喜您，新建会议成功！',
                            type: 'success'
                        });
                        self.$emit('confirm',false);
                    }else {
                        this.$message({
                            message: res.message,
                            type: 'warning'
                        });
                    }
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
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
            .el-progress {
                margin: -12px 0 30px 0;
                height: 36px;
                line-height: 36px;
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
