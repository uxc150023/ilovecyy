<template>
    <div class="list-content">
        <div>
            <div class="list-content-a">
                <img :src="info.bg"
                     class="pub_stunet">
            </div>
            <el-row class="list-content-b">
                <el-col :span="2">
                    <div class="grid-content"
                         v-show="info.name_0"> <span>{{info.name_0}}</span> </div>
                </el-col>
                <el-col :span="2"
                        class="">
                    <div class="grid-content nowrap"
                         v-show="info.name_1"> <span>{{info.name_1}}</span> </div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content"
                         v-show="info.name_2"> <span>{{info.name_2}}</span> </div>
                </el-col>
                <el-col :span="2">
                    <div class="grid-content"
                         v-show="info.name_3"> <span>{{info.name_3}}</span> </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content"
                         v-show="info.name_4"> <span>{{info.name_4}}</span> </div>
                </el-col>
                <el-button v-show="info.btnname"
                           type="primary"
                           class="float-right"
                           @click="clickbtn"
                           :mark="info.btnmark"
                           v-text='info.btnname'></el-button>
            </el-row>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {

        }
    },

    props: {
        info: {}
    },

    mounted () {

    },

    methods: {
        handleClick () {

        },
        clickbtn () {
            this.$emit('clickbtn', { btnmark: this.btnmark, info: this.info })
        }
    }
}

</script>

<style lang="scss">
@import "../../style/theme-base";
.list-content {
    border-bottom: 2px solid #f1f1f1;
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
        padding: 4px 0 4px 0;
        .grid-content {
            text-align: left;
        }
    }
    span {
        white-space: nowrap;
    }
}
</style>
