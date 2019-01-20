<template>
    <div class="list-content">
        <div>
            <div class="list-content-a">
                <img src="https://console.xinxuejie.com.cn/learn/imguplaod/smallpic?pictureId=default_bg.jpg" class="pub_stunet">
            </div>
            <el-row class="list-content-b">
                <el-col :span="2"><div class="grid-content" v-show="info.name_0"> <span>{{info.name_0}}</span> </div></el-col>
                <el-col :span="2"><div class="grid-content" v-show="info.name_1"> <span>{{info.name_1}}</span> </div></el-col>
                <el-col :span="2"><div class="grid-content" v-show="info.name_2"> <span>{{info.name_2}}</span> </div></el-col>
                <el-col :span="2"><div class="grid-content" v-show="info.name_3"> <span>{{info.name_3}}</span> </div></el-col>
                <el-col :span="12"><div class="grid-content" v-show="info.name_4"> <span>{{info.name_4}}</span> </div></el-col>
                <el-col :span="2"><div class="grid-content"><el-button>默认按钮</el-button></div></el-col>
                <el-col :span="2"><div class="grid-content"><el-button type="primary">主要按钮</el-button></div></el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        
        props: {
            info: {}
        },

        mounted() {

        },

        methods: {
            handleClick() {

            }
        }
    }

</script>

<style lang="scss">
    @import '../../style/theme-base';
    .list-content {
        border-bottom: 2px solid #F1F1F1;
        .list-content-a {
            height: 170px;
            width: 100%;
            background-color: #ddd;
            img {
                width: 100%;
                height: 100%;

            }
        }
        .list-content-b {
            height: 48px;
            line-height: 48px;
            .grid-content {
                text-align: left;
            }
        }
    }
</style>
