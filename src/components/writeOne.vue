<template>
    <div id="writeOne">
        <div class="formBox">
            <el-form :model="form" label-width="80px">
                <el-row type="flex" justify="end">
                    <el-form-item label="体类">
                        <el-select v-model="form.categray">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
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
                            <el-input v-model="form.booktitle" placehoder="好文章要好题目"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="作者署名">
                            <el-select v-model="form.signature">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="类别">
                            <el-select v-model="form.class">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-form-item label="一级分类">
                            <el-select v-model="form.firstCategray">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="二级分类">
                            <el-select v-model="form.secondCategray">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="三级分类">
                            <el-input v-model="form.threecategory"></el-input>
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
                            <el-select v-model="form.bookScope">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="lastRow">
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="引语或提要：点此可以编写" name="first">
                            <el-input v-model="form.intro"></el-input>
                        </el-tab-pane>
                        <el-tab-pane label="关键词：点此可以编写" name="third">
                            <el-input type="textarea" v-model="form.keywords"></el-input>
                        </el-tab-pane>
                        <el-tab-pane label="题图： 点此可以上传、编辑" name="fourth">
                            <el-input v-model="form.Thematic">
                                <el-button type="info" @click="uploadThematic" class="uploadThematic">浏览/上传</el-button>
                            </el-input>
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

    export default {
        data () {
            return {
                id: 'write-fulledit',
                activeName: 'first',
                writeContent: {
                    content: '',
                    key: ''
                },
                form: {
                    categray: '',
                    booktitle: '',
                    intro: '',
                    keywords: '',
                    Thematic: '',

                }
            }
        },
        components: {
            'app-quilleditor': Quilleditor,
        },
        methods: {
            getContent () {
                console.log(11)
            },
            handleClick(tab, event) {
                console.log(tab, event);
            }
        },

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
                height: 150px;
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
        }
        .ql-container {
            height: 480px;
        }
    }
</style>
