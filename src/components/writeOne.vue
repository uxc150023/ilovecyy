<template>
    <div id="writeOne">
        <div class="formBox">
            <el-form :model="form" label-width="80px" ref="writeForm">
                <el-row type="flex" justify="end">
                    <el-form-item label="体类" prop="form">
                        <el-select v-model="form.form">
                            <el-option v-for="(item,index) in formList" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row>
                    <!--图像-->
                    <div class="imgPro probox" v-if="form.form === '图像' ">
                        <div class="production">
                            <img class="images" :src="bgimg" v-if="bgimg !== '' ">
                            <p class="text" v-if="bgimg === '' ">图片上传在此</p>
                        </div>
                        <div class="btnBox">
                            <el-button class="mybtn" @click="upImages">浏览/上传</el-button>
                        </div>
                    </div>
                    <!--视频-->
                    <div class="videoPro probox" v-if="form.form === '视频' ">
                        <div class="production">
                            <video controls class="videoshow" :src="videoShowUrl" v-if="videoShowUrl !== ''"></video>
                            <div class="progress">
                                <el-progress v-if="progressShow" type="circle" color="#0092ff" :percentage="videoUploadPercent"></el-progress>
                            </div>
                        </div>
                        <div class="btnBox">
                            <el-upload accept="video/mp4,video/wmv,video/avi" class="upload" :action="uploadUrl" :file-list="uploadFiles" :show-file-list="false" multiple :limit="1"
                                       :before-upload="beforeUploadVideo"
                                       :http-request="handleVideoSuccess">
                                <el-button class="mybtn">浏览/上传</el-button>
                            </el-upload>
                        </div>
                    </div>
                    <!--音频-->
                    <div class="audioPro probox" v-if="form.form === '音频' ">
                        <div class="production">
                            <audio class="audioshow" controls :src="audioShowUrl" v-if="audioShowUrl !== ''"></audio>
                            <div class="progress">
                                <el-progress v-if="progressShow_2" type="circle" color="#0092ff" :percentage="audioUploadPercent"></el-progress>
                            </div>
                        </div>
                        <div class="btnBox">
                            <el-upload accept="audio/mp3,audio/ogg"  class="upload" :action="uploadUrl" :file-list="uploadFiles" :show-file-list="false" multiple :limit="1"
                                       :before-upload="beforeUploadAudio"
                                       :http-request="handleAudioSuccess">
                                <el-button class="mybtn">浏览/上传</el-button>
                            </el-upload>
                        </div>
                    </div>
                </el-row>
                <el-row v-if="form.form !== '图像' && form.form !== '视频' && form.form !== '音频'">
                    <div>
                        <app-quilleditor v-bind:id="id" v-bind:content="writeContent" v-on:getContent="getQuillContent"></app-quilleditor>
                    </div>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="题目" prop="productionName">
                            <el-input v-model="form.productionName" placeholder="好文章要好题目"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="作者署名" prop="sign">
                            <el-select v-model="form.sign">
                                <el-option v-for="(item, index) in signList" :label="item" :value="item" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="类别" prop="productionType">
                            <el-select v-model="form.productionType" @change="productionTypeChange">
                                <el-option v-for="(item,index) in productionTypeList" :label="item" :value="item" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="一级分类" prop="oneType">
                            <el-select v-model="form.oneType" @change="firstSubChange">
                                <el-option v-for="(item,index) in firstSubList" :label="item.name" :value="item.code" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="二级分类" prop="twoType">
                            <el-select v-model="form.twoType">
                                <el-option v-for="(item,index) in secondSubList" :label="item.name" :value="item.code" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="三级分类" prop="threeType">
                            <el-input v-model="form.threeType" placeholder="请输入三级分类"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="是否首发" class="upmusic" prop="isValid">
                            <el-radio v-model="form.isValid" label="1">是</el-radio>
                            <el-radio v-model="form.isValid" label="2">否</el-radio>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="定价" class="upmusic" prop="money">
                            <el-input v-model="form.money" placeholder="0-1000元"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="发表范围" class="upmusic" prop="isOpen">
                            <el-select v-model="form.isOpen" @change="isOpenChange">
                                <el-option v-for="(item, index) in bookScope" :label="item" :key="index" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                         <el-form-item label="选择学群" v-if="form.isOpen === '特定对象' " prop="groupMembers">
                            <el-select v-model="form.groupMembers">
                                <el-option v-for="(item, index) in gMembersList" :label="item" :key="index" :value="item"></el-option>
                                <el-option label="新建学群" value="新建学群"></el-option>
                            </el-select>
                         </el-form-item>
                        <el-form-item label="选择学网" v-if="form.isOpen === '特定学网' " prop="siteMembers">
                            <el-select v-model="form.siteMembers">
                                <el-option v-for="(item, index) in sMembersList" :label="item.stunet_name" :key="index" :value="item.stunet_name" :data-stunetId="item.stunet_id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="lastRow">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="引语或提要：点此可以编写" name="first" prop="intro">
                            <el-input type="textarea" v-model="form.intro"></el-input>
                        </el-tab-pane>
                        <el-tab-pane label="关键词：点此可以编写" name="third" prop="antistop">
                            <el-input v-model="form.antistop"></el-input>
                        </el-tab-pane>
                        <el-tab-pane label="题图： 点此可以上传、编辑" name="fourth" prop="tehmatic">
                            <div class="btnBox uploadBtn">
                                <el-button @click="uploadTehmatic" class="uploadTehmatic mybtn">浏览/上传</el-button>
                            </div>
                            <div class="image-preview">
                                <img class="tehmatic" :src="showTehmatic" v-if="showTehmatic !== ''">
                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </el-row>
                <el-row>
                    <div class="btnBox">
                        <el-button type="text" @click="temStorage">暂&emsp;&emsp;存</el-button>
                        <el-button @click="" class="mybtn">预&emsp;&emsp;览</el-button>
                        <el-button type="primary" @click="publish">发&emsp;&emsp;表</el-button>
                        <el-button type="primary" @click="">发表并分享</el-button>
                    </div>
                </el-row>

                <app-modal :modalInfo='modalInfoOne' :id="modalId_1">
                    <app-cutimgdialog v-on:getCutimg='getCutimg' :id="id_1"></app-cutimgdialog>
                </app-modal>

                <app-modal :modalInfo='modalInfoTwo' :id="modalId_2">
                    <app-cutimgdialog v-on:getCutimg='getCutimg' :id="id_2"></app-cutimgdialog>
                </app-modal>

            </el-form>
        </div>
    </div>
</template>

<script>
    import Quilleditor from '@/components/quilleditor/quilleditor'
    import Cutimgdialog from '@/components/cutImg/cutimgdialog'
    import modal from '@/components/modal/modal'

    export default {
        data () {
            return {
                id: 'write-fulledit',
                id_1: 'cutimgOne',
                id_2: 'cutimgTwo',
                modalId_1: 'modalOne',
                modalId_2: 'modalTwo',
                activeName: 'first',
                writeContent: {
                    content: '',
                    key: ''
                },
                formList: [],
                signList: ['实名', '新学名', '不署名', '其他人'],
                productionTypeList: ['学术与科研', '文学与艺术', '教育与教学', '其他'],
                firstSubList: [],
                secondSubList: [],
                thirdSubList: [],
                bookScope: ['公开', '特定对象', '特定学网', '私藏'],
                gMembersList: [],
                sMembersList: [],
                modalInfoOne: {
                    show: false,
                    title:"上传图片",
                    modal: false
                },
                modalInfoTwo: {
                    show: false,
                    title:"上传图片",
                    modal: false
                },
                bgimg: '',
                progressShow: '',
                progressShow_2: '',
                videoUploadPercent: 0,
                audioUploadPercent: 0,
                uploadUrl: this._getUrl('UPMUSIC'),
                videoShowUrl: '',
                audioShowUrl: '',
                uploadFiles: [],
                showTehmatic: '',
                form: {
                    form: '',
                    main: {
                        quillKey: '',
                        main: ''
                    },
                    productionType: '',
                    oneType: '',
                    twoType: '',
                    threeType: '',
                    isValid: '1',
                    money: '',
                    isOpen: '',
                    groupMembers: '',
                    siteMembers: '',
                    intro: '',
                    antistop: '',
                    Tehmatic: [],
                    productionName: '',
                    sign: '',
                    productionUrl: '',
                    isTs: '',
                    userid: this._store.state.userid,
                }
            }
        },
        components: {
            'app-quilleditor': Quilleditor,
            'app-cutimgdialog': Cutimgdialog,
            'app-modal': modal,
        },
        methods: {
            initPage () {
                this._getData(this._getUrl('SPROUSERU'),{
                    userid: this._store.state.userid
                },res=> {
                    console.log(res)
                });
            },
            //获取体类
            getForm () {
                let self = this;
                this._getData(this._getUrl('IRSFORM'),{
                    userid: this._store.state.userid,
                },res => {
                    if (res.code === 200) {
                        self.formList = JSON.parse(res.data);
                    }
                })
            },
            //获取quill内容
            getQuillContent (obj) {
                let key = document.getElementById(obj.id).getElementsByClassName('ql-editor')[0].dataset.key;
                this.form.main.main = obj.quill.html
                this.form.main.quillKey = key ? key : 'wu';
            },
            //类别改变
            productionTypeChange (e) {
                this.getFirstSub(e)
            },
            //获取一级学科
            getFirstSub (e) {
                let self = this
                if (e === '学术与科研') {
                    this._getData(this._getUrl('SUBGET'), {"levelCode": 0}, res => {
                        self.firstSubList = res.data;
                        self.form.oneType = self.firstSubList[0].name
                        self.firstSubChange(this.firstSubList[0].code)
                    })
                }else if (e === '文学与艺术' || e === '教育与教学') {
                    let type = e === '文学与艺术' ? '文艺' : '课程';
                    this._getData(this._getUrl('ARTCOURSE'), {
                        "levelCode": 0,
                        "firstSub": "",
                        "type": type
                    }, response=> {
                        self.firstSubList = response.data;
                        self.form.oneType = self.firstSubList[0].name
                        self.firstSubChange(this.firstSubList[0].code)
                    })
                }
            },
            firstSubChange (e) {
                let self = this;
                if (this.form.productionType === '学术与科研') {
                    self.getSecondSub(this._getUrl('SUBGET'),e)
                }else if (this.form.productionType === '文学与艺术' || this.form.productionType === '教育与教学') {
                    let type = this.form.productionType === '文学与艺术' ? '文艺' : '课程';
                    self.getSecondSub(this._getUrl('ARTCOURSE'),e,type)
                }
            },
            //获取二级学科
            getSecondSub (url,firstSub,type) {
                let self = this;
                let params = {
                    "levelCode": 1,
                    "firstSub": firstSub,
                }
                if (type) {
                    params.type = type
                }
                this._getData(url, params, response=> {
                    self.secondSubList = response.data;
                    self.form.twoType = self.secondSubList[0].name
                })
            },
            //获取三级学科
            getContent () {
            },
            //改变发表范围
            isOpenChange (e) {
                let self = this;
                if (e === '特定对象') {
                    this._getData(this._getUrl('GETMYGROUP'),{
                        userid: this._store.state.userid
                    },res=> {
                        self.gMembersList = res.data
                    });
                }else if (e === '特定学网') {
                    this._getData(this._getUrl('SELEUSERTEM'),{
                        userid: this._store.state.userid
                    },res=> {
                        self.sMembersList = res.data
                    })
                }
            },
            handleClick(tab, event) {
            },
            getCutimg (obj) {
                if (obj.id === 'cutimgOne') {
                    this.modalInfoOne.show = false
                    this.bgimg = this._getUrl('IMGURL') + encodeURI(encodeURI(obj.data))
                }else if (obj.id === 'cutimgTwo'){
                    this.modalInfoTwo.show = false
                    this.showTehmatic = this._getUrl('IMGURL') + encodeURI(encodeURI(obj.data))
                    this.form.Tehmatic[0] = encodeURI(encodeURI(obj.data))
                }
            },
            //上传图片作品
            upImages () {
                this.modalInfoOne.show = true
            },
            //上传题图
            uploadTehmatic () {
                this.modalInfoTwo.show = true
            },
            // 上传视频验证
            beforeUploadVideo (file) {
                const isLt10M = file.size / 1024 / 1024  < 10;
                if (!isLt10M) {
                    this.$message.error('上传文件大小不能超过10MB哦!');
                    return false;
                }
            },
            //上传进度显示
            uploadVideoProcess(event, file, fileList) {
                this.progressShow = true
                file.percent = event.loaded/event.total*100
                this.videoUploadPercent = Number(file.percent.toFixed(0));   //file.percentage获取文件上传进度
            },
            //上传视频
            handleVideoSuccess (params) {
                var self = this
                var form = new FormData();
                form.append("files",params.file);
                var xhr = new XMLHttpRequest();
                xhr.open("post", this.uploadUrl, true);
                xhr.upload.addEventListener("progress", function(event){
                    self.uploadVideoProcess(event,params.file)
                }, false); //监听上传进度
                xhr.onload = function () {
                    if(this.status == 200||this.status == 304){
                        let res = 'response' in xhr ? xhr.response : xhr.responseText
                        self.form.productionUrl = JSON.parse(JSON.parse(res)).data[0].data
                        self.videoShowUrl = this._getUrl('VEDIOURL') + JSON.parse(JSON.parse(res)).data[0].data
                        self.progressShow = false;
                    }
                };
                xhr.send(form);
            },
            // 上传音频验证
            beforeUploadAudio (file) {
                const isLt10M = file.size / 1024 / 1024  < 10;
                if (!isLt10M) {
                    this.$message.error('上传文件大小不能超过10MB哦!');
                    return false;
                }
            },
            //上传进度显示
            uploadAudioProcess(event, file, fileList) {
                this.progressShow_2 = true
                file.percent = event.loaded/event.total*100
                this.audioUploadPercent = Number(file.percent.toFixed(0));   //file.percentage获取文件上传进度
            },
            //上传音频
            handleAudioSuccess (params) {
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
                        self.form.productionUrl = JSON.parse(JSON.parse(res)).data[0].data
                        self.audioShowUrl = this._getUrl('VEDIOURL') + JSON.parse(JSON.parse(res)).data[0].data
                        self.progressShow_2 = false;
                    }
                };
                xhr.send(form);
            },
            //暂存
            temStorage () {
                console.log(this.form)
                if (this.form.main.main === '') {
                    this.$message({
                        showClose: true,
                        message: '书内容不能为空!',
                        type: 'error',
                    });
                }else {
                    this.form.isTs = '暂存';
                    this.form.type = 1;
                    this._getData(this._getUrl('SDPROUSERZ'), this.form ,res=> {
                        if (res.code === 200) {
                            this._getData(this._getUrl('IWUPLOAD'), this.form, response=> {
                                if (response.code === 200) {
                                    this.$message({
                                        showClose: true,
                                        message: '暂存成功!',
                                        type: 'success',
                                        onClose: function () {
                                            // this.$refs['writeForm'].resetFields();
                                        }
                                    });
                                }
                            })
                        }
                    })
                }
            },
            //发表
            publish () {
                this.form.type = 1;
                console.log(this.form)
                if (this.form.main.main === '') {
                    this.$message({
                        showClose: true,
                        message: '书内容不能为空!',
                        type: 'error',
                    });
                }else {
                    this._getData(this._getUrl('SDPROUSERZ'), this.form ,res=> {
                        console.log(res)
                        if (res.code === 200) {
                            this._getData(this._getUrl('IWUPLOAD'), this.form ,response=> {
                                console.log(response)
                                if (response.code === 200) {
                                    this.$message.success('发表成功!');
                                }
                            })
                        }
                    })
                }
            }
        },
        mounted () {
            this.getForm()
            this.initPage()
        }
    }

</script>

<style lang="scss">
    #writeOne {
        background-color: #fff;
        padding: 20px 50px 80px;
        .formBox {
            width: 1020px;
            margin: 0 auto;
            .probox {
                margin-bottom: 25px;
                .production {
                    position: relative;
                    height: 450px;
                    border: 2px #F1F1F1 solid;
                    line-height: 450px;
                    .images {
                        height: 450px;
                        width: 100%;
                        position: absolute;
                        top: 0;
                        left: 0;
                    }
                    .text {
                        position: absolute;
                        color: #BBBBBB;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%,-50%);
                    }

                }
                .btnBox {
                    .mybtn {
                        margin-top: 22px;
                    }
                }
            }
            .videoPro,.audioPro {
                .production {
                    .videoshow {
                        max-width: 100%;
                        max-height: 100%;
                    }
                    .progress {
                        height: 250px;
                        width: 100%;
                        padding-top: 50px;
                    }
                }
            }
            .el-form-item__label {
                text-align: justify;
                text-align-last: justify;
            }
            .el-form-item__content {
                text-align: left;
            }
            .el-select {
                display: inline;
            }
            .lastRow {
                height: 276px;
                margin-top: 20px;
                .el-textarea {
                    textarea {
                        height: 95px;
                        resize: none;
                    }
                }
            }
            .btnBox {
                text-align: right;
                .mybtn {
                    color: #0092ff;
                    border: 1px solid #0092ff;
                    margin-top: 40px;
                }
            }
            .uploadBtn {
                text-align: left;
                .mybtn {
                    margin-top: 0;
                }
            }
            .image-preview {
                height: 172px;
                width: 586px;
                background-color: #fafafa;
                margin-top: 10px;
                .tehmatic {
                    max-height: 100%;
                    max-width: 100%;
                }
            }
        }
        .ql-toolbar {
            text-align: left;
        }
        .ql-container {
            height: 480px;
        }
    }
</style>
