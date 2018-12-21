<template>
    <div class="header">
        <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;">
            <el-radio-button label="wdxw">我的学网</el-radio-button>
            <el-radio-button label="xqxy">学群学友</el-radio-button>
            <el-radio-button label="tj">推介</el-radio-button>
            <el-radio-button label="ls">理事</el-radio-button>
            <el-radio-button label="yhzx">用户中心</el-radio-button>
            <el-radio-button label="cws">财务室</el-radio-button>
            <el-radio-button label="zlg">资料馆</el-radio-button>
            <el-radio-button label="zc">注册</el-radio-button>
            <el-radio-button label="dl">登陆</el-radio-button>
        </el-radio-group>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tabPosition: 'wdxw'
        };
    },
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
};

</script>

<style lang="scss">
    .header {
        text-align: right;
        height: 46px;
        background-image: linear-gradient(90deg, #59ace7 0%, #5578ea 50%, #5254eb 84%, #5044ec 100%);
        .el-radio-group {
            margin: 0;
            label {
                .el-radio-button__inner {
                    font-size: 18px;
                    color: #fff;
                    background-color: transparent;
                    border: none;
                    height: 46px;
                }
                .is-active {
                    .el-radio-button__inner {
                        background-color: #fff !important;
                    }
                }
            }
        }
        .el-tabs__nav {
            width: 100%;
            .l-tabs__item {
                font-size: 18px;
                color: #fff;
            }
        }
    }
</style>
