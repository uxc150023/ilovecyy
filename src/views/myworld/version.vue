<template>
    <div id="version">
        <div class="content">
            <app-tabmeeting v-bind:id="id" v-bind:tabItem="tabOne" v-on:change="change">
                <!--我的作品-->
                <div v-if="myProduction"  class="panelOne">
                    <div v-if="dataList.length === 0">
                        <app-empty></app-empty>
                    </div>
                    <app-listTwo v-bind:dataList="dataList"></app-listTwo>
                </div>

                <!--我的家门-->
                <div v-if="myHouse" class="panelTwo">
                    <div v-if="perResume.content === ''">
                        <app-empty></app-empty>
                    </div>
                    <div class="mainContent" ref="myResume" v-html="perResume.content" v-bind:data-key="perResume.key" v-bind:style="{backgroundImage:perResume.bgimg}"></div>
                    <div class="btnBox"><el-button type="primary" @click="editMyhouse">编辑与上传</el-button></div>
                </div>
            </app-tabmeeting>

            <app-modal v-bind:modalInfo="modalInfo" :id="id_1">
                <div class="editor">
                    <app-quilleditor v-bind:id="id_editor" v-bind:content="mainText" v-on:getContent="getContent"></app-quilleditor>
                </div>

                <div class="btnBox">
                    <el-button type="primary" @click="temStorage">暂存</el-button>
                    <el-button type="primary" @click="preview">预览</el-button>
                    <el-button type="primary" @click="publishPro">发表</el-button>
                </div>
            </app-modal>
        </div>
    </div>
</template>

<script>
    import Tabmeeting from '@/components/tabs/meeting'
    import listTwo from '@/components/list/list_2'
    import modal from '@/components/modal/modal'
    import {_getUrl, _getData} from '@/service/getdata.js'
    import empty from '@/components/list/empty'
    import store from '@/vuex/store.js'
    import Quilleditor from '@/components/quilleditor/quilleditor'

    export default {
        data () {
            return {
                id: '',
                id_1: 'resumeModal',
                id_editor: 'resumeEditor',
                mainText: {
                    content: '',
                    key: ''
                },
                dataList: [],
                perResume: {
                    content: '',
                    key: '',
                    bgimg: '',
                },
                tabOne: ['我的作品', '我的家门'],
                myProduction: true,
                myHouse: false,
                modalInfo: {
                    title: '编辑',
                    show: false
                },
            }
        },
        components: {
            "app-tabmeeting": Tabmeeting,
            "app-listTwo": listTwo,
            "app-modal": modal,
            "app-empty": empty,
            'app-quilleditor': Quilleditor,
        },
        methods: {
            change (tab,event) {
                console.log(tab)
                if (tab.index === "0") {              //我的家门
                  this.myProduction = true;
                  this.myHouse = false;
                }else {
                    this.myProduction = false;
                    this.myHouse = true;
                    this.getPerResume();
                }
            },
            //获取我的作品
            getProData () {
                _getData(_getUrl('SEUSALLPRO'),{
                  userid: store.state.userid,
                  "currentPage": 1,
                  "onePageCount": 10
                },(res) => {
                    if (res.code === 200) {
                        this.dataList = res.data.listMap;
                    }
                });
            },
            //获取我的家门
            getPerResume () {
                let self = this;
                _getData(_getUrl('MSEPRODETAIL'),{
                    userid: store.state.userid,
                    isTs: 'N',
                },(res) => {
                    if (res.code === 200) {
                        self.perResume.content = JSON.parse(res.data.intro).main;
                        self.perResume.key = JSON.parse(res.data.intro).quillKey;
                        if (self.perResume.key === 'wu') {
                            self.perResume.bgimg = 'none';
                        }else {
                            self.perResume.bgimg = 'url(' + require("../../assets/texture/" + self.perResume.key + ".png") +')'
                        }
                    }
                });
            },
            //编辑我的家门
            editMyhouse () {
                var self = this;
                _getData(_getUrl('MSEPRODETAIL'),{
                    userid: store.state.userid,
                    isTs: 'Y'
                },(res) => {
                    console.log(res)
                    this.modalInfo.show = true;
                    if (res.code === 200 && res.data) {
                        this.mainText.content = JSON.parse(res.data.intro).main;
                        this.mainText.key = JSON.parse(res.data.intro).quillKey;
                    }
                });
            },
            //获取quilleditor的内容
            getContent (quill) {
                this.mainText.content = quill.quill.html;
                this.mainText.key = document.getElementById(quill.id).getElementsByClassName('ql-editor')[0].dataset.key;
            },
            //暂存
            temStorage () {
                let self = this
                if (self.mainText.content !== '') {
                    _getData(_getUrl('MUPINDETAIL'),{
                        userid: store.state.userid,
                        isTs: "Y",
                        contxt: JSON.stringify({
                            quillKey: self.mainText.key,
                            main: self.mainText.content
                        })
                    }, (res) => {
                        console.log(res)
                        if (res.code === 200) {
                            self.$message({
                                showClose: true,
                                message: '暂存成功',
                                type: 'success',
                                onClose: function () {
                                    self.modalInfo.show = false;
                                }
                            })
                        }
                    })
                }else {
                    this.$message({
                        showClose: true,
                        message: "请填写内容",
                        type: 'error'
                    })
                }
            },
            //预览
            preview () {
                let self = this
                if (self.mainText.content !== '') {
                    _getData(_getUrl('MUPINDETAIL'),{
                        userid: store.state.userid,
                        isTs: "Y",
                        contxt: JSON.stringify({
                            quillKey: self.mainText.key,
                            main: self.mainText.content
                        })
                    }, (res) => {

                    })
                }else {
                    this.$message({
                        showClose: true,
                        message: "请填写内容",
                        type: 'error'
                    })
                }
            },
            //发表
            publishPro () {
                let self = this
                _getData(_getUrl('MUPINDETAIL'),{
                    userid: store.state.userid,
                    isTs: "N",
                    contxt: JSON.stringify({
                        quillKey: self.mainText.key,
                        main: self.mainText.content
                    })
                }, (res) => {
                    if (res.code === 200) {
                        self.$message({
                            showClose: true,
                            message: '发表成功',
                            type: 'success',
                            onClose: function () {
                                self.modalInfo.show = false;
                                self.getProData();
                            }
                        })
                    }
                })
            },
        },
        mounted () {
            this.getProData();
        }
    }
</script>

<style lang="scss">
    #version {
        .content {
            padding: 15px;
            .panelTwo {
                padding: 15px;
                .mainContent {
                    height: 300px;
                }
                .btnBox {
                    text-align: right;
                }
            }
        }
        .btnBox {
            text-align: right;
        }
        .quill-editor {
            height: 645px;
            .ql-toolbar.ql-snow {
                text-align: left;
            }
            .ql-container {
                height: 580px;
            }
        }
    }
    .grey {
        color: #999;
    }
</style>
