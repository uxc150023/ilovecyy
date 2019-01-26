<template>
    <div class="edit_container">
        <!--  新增时输入 -->
        <quill-editor
            v-model="content.content"
            :id="id"
            ref="myQuillEditor"
            :options="editorOption"
            @ready="onEditorReady($event)"
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quill-editor>
        <!-- 从数据库读取展示 -->
        <div v-html="str" class="ql-editor">
            {{str}}
        </div>

        <app-modal :modalInfo='colorModalInfo' v-on:modalOpened="colorOpen" :id="id_2" v-on:modalClosed="modalClosed">
            <div class="quill-cj">
                <div class="quill-imglist quill-item quill-item" data-key="wu">
                    <span>无</span>
                </div>
                <div class="quill-imglist quill-item" data-key="clip">
                    <img class="quill-img" src="../../assets/texture/clip.png" alt="clip">
                </div>
                <div class="quill-imglist quill-item" data-key="flying">
                    <img class="quill-img" src="../../assets/texture/flying.png" alt="flying">
                </div>
                <div class="quill-imglist quill-item" data-key="fractal">
                    <img class="quill-img" src="../../assets/texture/fractal.png" alt="fractal">
                </div>
                <div class="quill-imglist quill-item" data-key="intermittent">
                    <img class="quill-img" src="../../assets/texture/intermittent.png" alt="intermittent">
                </div>
                <div class="quill-imglist quill-item" data-key="lips">
                    <img class="quill-img" src="../../assets/texture/lips.png" alt="lips">
                </div>
                <div class="quill-imglist quill-item" data-key="lung">
                    <img class="quill-img" src="../../assets/texture/lung.png" alt="lung">
                </div>
                <div class="quill-imglist quill-item" data-key="ooxx">
                    <img class="quill-img" src="../../assets/texture/ooxx.png" alt="ooxx">
                </div>
                <div class="quill-imglist quill-item" data-key="sun">
                    <img class="quill-img" src="../../assets/texture/sun.png" alt="sun">
                </div>
                <div class="quill-imglist quill-item" data-key="twill">
                    <img class="quill-img" src="../../assets/texture/twill.png" alt="twill">
                </div>
                <div class="quill-imglist quill-item" data-key="cert">
                    <img class="quill-img" src="../../assets/texture/cert.png" alt="clip">
                </div>
            </div>
        </app-modal>

    </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import { quillRedefine } from 'vue-quill-editor-upload'
import 'quill/dist/quill.snow.css';
import {_getUrl, _getData} from '@/service/getdata.js'
import modal from '@/components/modal/modal'

export default {
    components: {
        quillEditor,
        quillRedefine,
        "app-modal": modal,
    },
    data() {
        return {
            str: '',
            id_2: 'colorEditModal',
            editorOption: {},
            colorModalInfo: {
                show: false,
                title: '彩笺',
                modal: false,  //是否需要遮罩
            },
            editorDom: '',
            key: '',
        }
    },
    props: {
        id: '',
        content: {
            content: '',
            key: ''
        }
    },
    methods: {
        // 准备编辑器
        onEditorReady(editor) {

            console.log(editor);
            let self = this;
            let dom = document.getElementById(self.id).getElementsByClassName('ql-editor')[0];
            if (self.content.key === 'wu') {
                dom.style.backgroundImage = 'none';
                dom.setAttribute('data-key','wu');
            } else if (self.content.key && self.content.key !== 'wu') {
                dom.style.backgroundImage = 'url(' + require("../../assets/texture/" + self.content.key + ".png") +')';
                dom.style.backgroundSize = '100% 100%';
                dom.style.backgroundRepeat = 'no-repeat';
                dom.setAttribute('data-key',self.content.key);
            }
        },
        // 失去焦点事件
        onEditorBlur(editor){
            // console.log('失去焦点事件 !', editor)
        },
        // 获得焦点事件
        onEditorFocus(editor){
            // console.log('获得焦点事件 !', editor)
        },
        // 内容改变事件
        onEditorChange(e){
            this.$emit('getContent', {quill: e, id: this.id});
        },
        // 转码
        escapeStringHTML(str) {
            str = str.replace(/&lt;/g,'<');
            str = str.replace(/&gt;/g,'>');
            return str;
        },
        //打开彩笺modal
        colorOpen(){
            let self = this;
            let colorDom = document.getElementsByClassName('quill-item');
            self.editorDom = document.getElementById(self.id).getElementsByClassName('ql-editor')[0];
            for (let i = 0; i<colorDom.length; i++) {
               colorDom[i].onclick = function () {
                   console.log(colorDom[i].dataset.key)
                   self.key = colorDom[i].dataset.key;
                   self.colorModalInfo.show = false;
               }
            }
        },
        //关闭彩笺modal
        modalClosed() {
            let self = this;
            if (self.key === 'wu') {
                self.editorDom.style.backgroundImage = 'none';
                self.editorDom.setAttribute('data-key','wu');
            } else {
                self.editorDom.style.backgroundImage = 'url(' + require("../../assets/texture/" + self.key + ".png") +')';
                self.editorDom.style.backgroundSize = '100% 100%';
                self.editorDom.style.backgroundRepeat = 'no-repeat';
                self.editorDom.setAttribute('data-key',self.key);
            }
        }

    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
    },
    mounted() {
        // let content = '';  // 请求后台返回的内容字符串
        // this.str = this.escapeStringHTML(content);
    },
    created () {
        var self = this
        this.editorOption = quillRedefine(
            {
                // 图片上传的设置
                uplpadConfig: {
                    action: _getUrl('UPMUSIC'),  // 必填参数 图片上传地址
                    // 必选参数  res是一个函数，函数接收的response为上传成功时服务器返回的数据
                    // 你必须把返回的数据中所包含的图片地址 return 回去
                    res: (respnse) => {
                        console.log(response)
                        return respnse.info
                    },
                    methods: 'POST',  // 可选参数 图片上传方式  默认为post
                    // token: sessionStorage.token,  // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage
                    // name: 'img',  // 可选参数 文件的参数名 默认为img
                    // size: 500,  // 可选参数   图片限制大小，单位为Kb, 1M = 1024Kb
                    accept: 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',  // 可选参数 可上传的图片格式
                    // input点击事件  formData是提交的表单实体
                    change: (formData) => {
                    },
                    // 设置请求头 xhr: 异步请求， formData: 表单对象
                    header: (xhr, formData) => {
                        // xhr.setRequestHeader('myHeader','myValue');
                        // formData.append('token', '1234')
                    },
                    // start: function (){}
                    start: () => {
                    },  // 可选参数 接收一个函数 开始上传数据时会触发
                    end: () => {
                    },  // 可选参数 接收一个函数 上传数据完成（成功或者失败）时会触发
                    success: () => {
                    },  // 可选参数 接收一个函数 上传数据成功时会触发
                    error: () => {
                    }  // 可选参数 接收一个函数 上传数据中断时会触发
                },
                // 以下所有设置都和vue-quill-editor本身所对应
                placeholder: '请输入内容...',  // 可选参数 富文本框内的提示语
                theme: 'snow',  // 可选参数 富文本编辑器的风格
                toolOptions: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{'header': 1}, {'header': 2}],
                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    [{'script': 'sub'}, {'script': 'super'}],
                    [{'indent': '-1'}, {'indent': '+1'}],
                    [{'direction': 'rtl'}],
                    [{'size': ['small', false, 'large', 'huge']}],
                    [{'header': [1, 2, 3, 4, 5, 6, false]}],
                    [{'color': []}, {'background': []}],
                    [{'font': []}],
                    [{'align': []}],
                    ['image', 'link', 'video', 'formula', 'background-upload'],
                    ['clean'],
                ],  // 可选参数  选择工具栏的需要哪些功能  默认是全部
                handlers: { // 可选参数 重定义的事件，比如link等事件
                    'background-upload': value => {
                        if (value) {
                            self.colorModalInfo.show = true;
                            // let dom = document.getElementsByClassName('quill-item');
                            // console.log(dom.length)
                            // for (let i; i<dom.length; i++) {
                            //     console.log(dom[i])
                            //     console.log(i)
                            // }
                        } else {
                            this.quill.format('quillUpload', false);
                        }
                    }
                }
            }
        )
        console.log(this.editorOption)
    }
}
</script>
<style lang="scss">
    .quill-cj {
        height: 220px;
        .quill-imglist {
            cursor: pointer;
            border: 1px solid #e4e4e4;
            text-align: center;
            line-height: 100px;
            width: 100px;
            height: 100px;
            float: left;
            color: #e4e4e4;
            margin: 4px;
            .quill-img {
                width:100px;
                height: 100px;
            }
        }
    }

</style>
