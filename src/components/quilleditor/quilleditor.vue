<template>
    <div class="edit_container">
        <!--  新增时输入 -->
        <quill-editor
            v-model="content"
            ref="myQuillEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quill-editor>
        <!-- 从数据库读取展示 -->
        <div v-html="str" class="ql-editor">
            {{str}}
        </div>
    </div>
</template>
<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import 'quill/dist/quill.snow.css';
export default {
    components: {
        quillEditor
    },
    data() {
        return {
            content: [],
            str: '',
            editorOption: {},
            quill: [],
        }
    },
    methods: {
        // 准备编辑器
        onEditorReady(editor) {
            console.log('准备编辑器', editor);
            this.quill.push(editor);
        },
        // 失去焦点事件
        onEditorBlur(editor){
            console.log('失去焦点事件 !', editor)
        },
        // 获得焦点事件
        onEditorFocus(editor){
            console.log('获得焦点事件 !', editor)
        },
        // 内容改变事件
        onEditorChange(e){
            console.log(e)
            // console.log(text)
            this.$emit('getContent', this.quill[0]);
        },
        // 转码
        escapeStringHTML(str) {
            str = str.replace(/&lt;/g,'<');
            str = str.replace(/&gt;/g,'>');
            return str;
        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
    },
    mounted() {
        let content = '';  // 请求后台返回的内容字符串
        this.str = this.escapeStringHTML(content);
        this.onEditorReady()
    }
}
</script>
