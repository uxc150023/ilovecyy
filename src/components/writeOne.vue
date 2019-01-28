<template>
    <div id="writeOne">
        <div class="formBox">
            <el-form :model="form" label-width="80px">
                <el-row type="flex" justify="end">
                    <el-form-item label="体类">
                        <el-select v-model="form.categray">
                            <el-option v-for="(item,index) in categrayList" :key="index" :label="item" :value="item"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row>
                    <div>
                        <app-quilleditor v-bind:id="id" v-bind:content="writeContent" v-on:getContent="getContent"></app-quilleditor>
                    </div>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="题目">
                            <el-input v-model="form.booktitle" placeholder="好文章要好题目"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="作者署名">
                            <el-select v-model="form.signature">
                                <el-option v-for="(item, index) in signatureList" :label="item" :value="item" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="类别">
                            <el-select v-model="form.class" @change="classChange">
                                <el-option v-for="(item,index) in classList" :label="item" :value="item" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="一级分类">
                            <el-select v-model="form.firstCategray" @change="firstSubChange">
                                <el-option v-for="(item,index) in firstSubList" :label="item.name" :value="item.code" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="二级分类">
                            <el-select v-model="form.secondCategray">
                                <el-option v-for="(item,index) in secondSubList" :label="item.name" :value="item.code" :key="index"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="三级分类">
                            <el-input v-model="form.thirdCategray" placeholder="请输入三级分类"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="是否首发" class="upmusic">
                            <el-radio v-model="form.starting" label="1">是</el-radio>
                            <el-radio v-model="form.starting" label="2">否</el-radio>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="定价" class="upmusic">
                            <el-input v-model="form.bookprice"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="发表范围" class="upmusic">
                            <el-select v-model="form.scope" @change="scopeChange">
                                <el-option v-for="(item, index) in bookScope" :label="item" :key="index" :value="item"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                         <el-form-item label="选择学群" v-if="form.scope === '特定对象' ">
                            <el-select v-model="form.groupMembers">
                                <el-option v-for="(item, index) in gMembersList" :label="item" :key="index" :value="item"></el-option>
                                <el-option label="新建学群" value="新建学群"></el-option>
                            </el-select>
                         </el-form-item>
                        <el-form-item label="选择学网" v-if="form.scope === '特定学网' ">
                            <el-select v-model="form.siteMembers">
                                <el-option v-for="(item, index) in sMembersList" :label="item.stunet_name" :key="index" :value="item.stunet_name" :data-stunetId="item.stunet_id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="lastRow">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="引语或提要：点此可以编写" name="first">
                            <el-input type="textarea" v-model="form.intro"></el-input>
                        </el-tab-pane>
                        <el-tab-pane label="关键词：点此可以编写" name="third">
                            <el-input v-model="form.keywords"></el-input>
                        </el-tab-pane>
                        <el-tab-pane label="题图： 点此可以上传、编辑" name="fourth">
                            <div class="btnBox uploadBtn">
                                <el-button @click="uploadThematic" class="uploadThematic mybtn">浏览/上传</el-button>
                            </div>
                            <div class="image-preview">

                            </div>
                        </el-tab-pane>
                    </el-tabs>
                </el-row>
                <el-row>
                    <div class="btnBox">
                        <el-button type="text" @click="">暂&emsp;&emsp;存</el-button>
                        <el-button @click="" class="mybtn">预&emsp;&emsp;览</el-button>
                        <el-button type="primary" @click="">发&emsp;&emsp;表</el-button>
                        <el-button type="primary" @click="">发表并分享</el-button>
                    </div>
                </el-row>
            </el-form>
        </div>
    </div>
</template>

<script>
    import Quilleditor from '@/components/quilleditor/quilleditor'
    import store from '@/vuex/store.js'
    import {_getUrl, _getData} from '@/service/getdata.js'

    export default {
        data () {
            return {
                id: 'write-fulledit',
                activeName: 'first',
                writeContent: {
                    content: '',
                    key: ''
                },
                categrayList: [],
                signatureList: ['实名', '新学名', '不署名', '其他人'],
                classList: ['学术与科研', '文学与艺术', '教育与教学', '其他'],
                firstSubList: [],
                secondSubList: [],
                thirdSubList: [],
                bookScope: ['公开', '特定对象', '特定学网', '私藏'],
                gMembersList: [],
                sMembersList: [],
                form: {
                    categray: '',
                    class: '',
                    firstCategray: '',
                    secondCategray: '',
                    thirdCategray: '',
                    starting: '',
                    bookprice: '',
                    scope: '',
                    groupMembers: '',
                    siteMembers: '',
                    intro: '',
                    keywords: '',
                    Thematic: '',
                    booktitle: '',
                }
            }
        },
        components: {
            'app-quilleditor': Quilleditor,
        },
        methods: {
            //获取体类
            getCategray () {
                let self = this;
                _getData(_getUrl('IRSFORM'),{
                    userid: store.state.userid,
                },res => {
                    if (res.code === 200) {
                        self.categrayList = JSON.parse(res.data);
                    }
                })
            },
            //类别改变
            classChange (e) {
                this.getFirstSub(e)

            },
            //获取一级学科
            getFirstSub (e) {
                let self = this
                if (e === '学术与科研') {
                    _getData(_getUrl('SUBGET'), {"levelCode": 0}, res => {
                        self.firstSubList = res.data;
                        console.log(self.firstSubList)
                        self.form.firstCategray = self.firstSubList[0].name
                        self.firstSubChange(this.firstSubList[0].code)
                    })
                }else if (e === '文学与艺术' || e === '教育与教学') {
                    let type = e === '文学与艺术' ? '文艺' : '课程';
                    _getData(_getUrl('ARTCOURSE'), {
                        "levelCode": 0,
                        "firstSub": "",
                        "type": type
                    }, response=> {
                        self.firstSubList = response.data;
                        self.form.firstCategray = self.firstSubList[0].name
                        self.firstSubChange(this.firstSubList[0].code)
                    })
                }
            },
            firstSubChange (e) {
                console.log(e)
                let self = this;
                if (this.form.class === '学术与科研') {
                    self.getSecondSub(_getUrl('SUBGET'),e)
                }else if (this.form.class === '文学与艺术' || this.form.class === '教育与教学') {
                    let type = this.form.class === '文学与艺术' ? '文艺' : '课程';
                    self.getSecondSub(_getUrl('ARTCOURSE'),e,type)
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
                console.log(params)
                console.log(url)
                _getData(url, params, response=> {
                    self.secondSubList = response.data;
                    self.form.secondCategray = self.secondSubList[0].name
                })
            },
            //获取三级学科
            getContent () {
                console.log(11)
            },
            //改变发表范围
            scopeChange (e) {
                let self = this;
                if (e === '特定对象') {
                    _getData(_getUrl('GETMYGROUP'),{
                        userid: store.state.userid
                    },res=> {
                        console.log(res)
                        self.gMembersList = res.data
                    });
                }else if (e === '特定学网') {
                    _getData(_getUrl('SELEUSERTEM'),{
                        userid: store.state.userid
                    },res=> {
                        console.log(res)
                        self.sMembersList = res.data
                    })
                }
            },
            handleClick(tab, event) {
                console.log(tab, event);
            },
            uploadThematic() {

            }
        },
        mounted () {
            this.getCategray()
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
            }
        }
        .ql-container {
            height: 480px;
        }
    }
</style>
