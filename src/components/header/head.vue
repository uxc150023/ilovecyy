<template>
    <div>
        <div class="header">
            <el-row>
                <el-button @click="gopage('Mystunet')">我的学网</el-button>
                <el-button @click="gopage('MyGroupFriend')">学群学友</el-button>
                <el-button @click="gopage('Recome')">推介</el-button>
                <el-button @click="gopage('Director')">理事</el-button>
                <el-button @click="gopage('Uercenter')">用户中心</el-button>
                <el-button @click="gopage('Financial')">财务室</el-button>
                <el-button @click="gopage('Archive')">资料馆</el-button>
                <el-button @click="gopage('Setting')">设置</el-button>
                <el-button @click="gopage('Register')">注册</el-button>
                <el-button @click="gopage('Login')">登陆</el-button>
            </el-row>
        </div>

        <el-dialog title="设置" :visible.sync="dialogVisible"  width="1020px" :before-close="handleClose" class="setting_dialog">
            <div class="setting_content">
                <div id="setting_top" class="setting_top" style="height: 270px;width: 100%;">
                    <img src="https://console.xinxuejie.com.cn/learn/imguplaod/getpic?pictureId=/2018/9/6/8e7f64c09fae4e71af7a5accb7a6dffb.jpg" style="height: 100%;width: 100%;">
                </div>

                <div id="setting_logo" class="setting_logo">
                    <img id="logoimg" class="logoimg" src="https://console.xinxuejie.com.cn/learn/imguplaod/getpic?pictureId=/2018/8/24/f28bc40759e647beabf87ca0c7dc8b2e.png">
                    <img id="logo_stretch" class="logo_stretch setpng hidden"     src="../../images/setting/setting_c.png">
                    <img id="logo_stretch_a" class="logo_stretch_a setpng hidden" src="../../images/setting/setting_e.png">
                    <img id="logo_stretch_b" class="logo_stretch_b setpng hidden" src="../../images/setting/setting_e.png">
                </div>

                <!-- <div id="setting_top" class="setting_top">
                    <img src="https://console.xinxuejie.com.cn/learn/imguplaod/getpic?pictureId=/2018/9/6/8e7f64c09fae4e71af7a5accb7a6dffb.jpg">
                </div>

                <div id="setting_logo" class="setting_logo">
                    <img id="logoimg" class="logoimg" src="https://console.xinxuejie.com.cn/learn/imguplaod/getpic?pictureId=/2018/8/24/f28bc40759e647beabf87ca0c7dc8b2e.png">
                    <img id="logo_stretch" class="logo_stretch setpng hidden"     src="../../images/setting/setting_c.png">
                    <img id="logo_stretch_a" class="logo_stretch_a setpng hidden" src="../../images/setting/setting_e.png">
                    <img id="logo_stretch_b" class="logo_stretch_b setpng hidden" src="../../images/setting/setting_e.png">
                </div>
                <div class="fileupload_1">
                    <div class="fileupload_text">
                        <img  src="../../images/setting/setting_b.png">
                    </div>
                </div>
                <input class="fileupload_input" id="setBannerUpload_1" type="file" name="files" placeholder=""> -->
            </div>
            <p>背景图推荐尺寸1020X370,JPG/GIF/PNG,500K以内</p>

            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog> 
    </div>
</template>
<script>
import modal from '@/components/modal/modal'

export default {

    data() {
        return {
            dialogVisible: false, /*设置*/
            loginStatus: '', //是否登陆
        };
    },

    mounted() {
        
    },

    methods: {
        gopage(page) {
            // this.$router.push({ name: page })
            switch (page) {
                case 'Setting':   /*设置*/
                    // this.$emit('showSetting',true);
                    this.dialogVisible = true;
                    break;
            }
        },
        handleClose(done) {
        this.$confirm('确认关闭？').then(_ => {
            done();
            })
            .catch(_ => {});
        },
    }
};

</script>
<style lang="scss">
@import 'src/style/theme-base';

.header {
    text-align: right;
    height: 46px;
    background-image: linear-gradient(90deg, #59ace7 0%, #5578ea 50%, #5254eb 84%, #5044ec 100%);
    font-size: 0;
    .el-row {
        button {
            margin: 0;
            background-color: transparent;
            color: #fff;
            border: 0;
            padding: 0 15px;
            font-size: 18px;
            line-height: 46px;
            border-radius: 0;
        }

        button:hover {
            background-color: rgba(255, 255, 255, 0.4);
        }
    }
}
.setting_dialog {
    .el-dialog__header {
        text-align: left;
    }
    .setting_top .bg-img {
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 0;
    }
    .setting_content {
        .setting_top {
            height: 0px;
            background-color: #fafafa;
            border: 1px dashed #999;
            overflow: hidden;
            position: relative;
        }
        .setting_logo {
            min-width: 50px;
            position: absolute;
            top: 50px;
            left: 306px;
            border: 1px dashed #999;
            text-align: center;
            display: table;
            width: 140px;
            height: 140px;
            .logoimg {
                width: 100%;
                height: 100%;
            }
            .logo_stretch {
                width: 24px;
                height: 24px;
                overflow: hidden;
                cursor: se-resize;
                position: absolute;
                right: 0;
                bottom: 0;
            }
            .logo_stretch_a {
                width: 24px;
                height: 24px;
                overflow: hidden;
                cursor: s-resize;
                position: absolute;
                margin-left: -12px;
                bottom: 0;
                left: 50%;
                margin-bottom: -12px;
            }
            .logo_stretch_b {
                width: 24px;
                height: 24px;
                overflow: hidden;
                cursor: e-resize;
                position: absolute;
                bottom: 50%;
                margin-bottom: -12px;
                right: 0;
                margin-right: -12px;
            }
        }
    }
}

</style>
