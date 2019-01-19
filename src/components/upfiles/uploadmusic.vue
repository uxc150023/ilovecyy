<template>
    <div>
        <el-upload accept class="upload" :action= "uploadUrl" :file-list="uploadFiles" :show-file-list="false" multiple :limit="1"
                   :before-upload="beforeUploadAudio"
                   :on-change="loadJsonFromFile"
                   :on-success="handleAudioSuccess">
            <el-button size="small" type="primary">点击上传</el-button>
            <div class="el-upload__tip">只能上传mp3文件，且不超过10M</div>
        </el-upload>
        <el-button type="primary">取消</el-button>
        <el-button type="primary">确定</el-button>
    </div>
</template>

<script>
    export default {
        data () {
            return {

            }
        },
        props: {

        }

    }

</script>

<style lang="scss">

</style>
