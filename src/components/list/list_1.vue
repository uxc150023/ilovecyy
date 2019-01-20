<template>
    <div class="list-content">
        <div>
            <div class="list-content-a">
                <img src="https://console.xinxuejie.com.cn/learn/imguplaod/smallpic?pictureId=default_bg.jpg" class="pub_stunet">
            </div>
            <el-row class="list-content-b" v-for="(item, index) in listInfo">
                <el-col :span="2"><div class="grid-content" v-if="item.name_0"> <span>{{item.name_0}}</span> </div></el-col>
                <el-col :span="4"><div class="grid-content" v-if="item.name_1"> <span>{{item.name_1}}</span> </div></el-col>
                <el-col :span="4"><div class="grid-content" v-if="item.name_2"> <span>{{item.name_2}}</span> </div></el-col>
                <el-col :span="4"><div class="grid-content" v-if="item.name_3"> <span>{{item.name_3}}</span> </div></el-col>
                <el-col :span="4"><div class="grid-content" v-if="item.name_4"> <span>{{item.name_4}}</span> </div></el-col>
                <el-col :span="4"><div class="grid-content"><el-button type="primary">主要按钮</el-button></div></el-col>
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
            listInfo: [],
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
        }
    }
</style>
