<template>
    <div id="version">
        <div class="content">
            <app-tabmeeting v-bind:id="id" v-bind:tabItem="tabOne" v-on:change="change">
                <!--我的作品-->
                <div v-if="myProduction"  class="panelOne">
                    <div v-if="dataListObj.dataList.length === 0">
                        <app-empty></app-empty>
                    </div>
                    <app-listTwo v-bind:dataListObj="dataListObj"></app-listTwo>
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
                    <el-button type="text" @click="temStorage">暂&emsp;&emsp;存</el-button>
                    <el-button class="mybtn" @click="preview">预&emsp;&emsp;览</el-button>
                    <el-button type="primary" @click="publishPro">发&emsp;&emsp;表</el-button>
                </div>
            </app-modal>
        </div>
    </div>
</template>

<script>
    import Tabmeeting from '@/components/tabs/meeting'
    import listTwo from '@/components/list/list_2'
    import modal from '@/components/modal/modal'
    import empty from '@/components/list/empty'
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
                dataListObj: {
                    dataList: [],
                    btnshow: true,
                },
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
                let self = this;
                this._getData(this._getUrl('SEUSALLPRO'),{
                  userid: this._store.state.userid,
                  "currentPage": 1,
                  "onePageCount": 10
                },(res) => {
                    console.log(res)
                    if (res.code === 200) {
                        self.dataListObj.dataList = res.data.listMap;
                        self.dataListObj.btnshow = false;
                        let len = res.data.listMap.length;
                        for(let i=0; i<len; i++) {
                            self.dataListObj.dataList[i].Tehmatic = JSON.parse(self.dataListObj.dataList[i].Tehmatic).length > 0 ? this._getUrl('SMALLIMGURL') + encodeURI(encodeURI(JSON.parse(self.dataListObj.dataList[i].Tehmatic)[0])) : [];
                        }
                    }
                });
            },
            //获取我的家门
            getPerResume () {
                let self = this;
                this._getData(this._getUrl('MSEPRODETAIL'),{
                    userid: this._store.state.userid,
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
                this._getData(this._getUrl('MSEPRODETAIL'),{
                    userid: this._store.state.userid,
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
                let key = document.getElementById(quill.id).getElementsByClassName('ql-editor')[0].dataset.key;
                this.mainText.content = quill.quill.html;
                this.mainText.key = key ? key : 'wu'
            },
            //暂存
            temStorage () {
                let self = this
                if (self.mainText.content !== '') {
                    this._getData(this._getUrl('MUPINDETAIL'),{
                        userid: this._store.state.userid,
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
                    this._getData(this._getUrl('MUPINDETAIL'),{
                        userid: this._store.state.userid,
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
                this._getData(this._getUrl('MUPINDETAIL'),{
                    userid: this._store.state.userid,
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
            .mybtn {
                color: #0092ff;
                border: 1px solid #0092ff;
            }
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
