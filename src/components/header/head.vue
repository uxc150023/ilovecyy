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
        <app-modal :dialogVisible='contentSet' :title='titileSet'>
            <app-mwsetting></app-mwsetting>
        </app-modal>

    </div>
</template>
<script>
import modal        from '@/components/modal/modal'
import mwsetting    from '@/views/setting/mwsetting'

export default {

    data() {
        return {
            contentSet: [false],     /*设置*/
            loginStatus: '',            //是否登陆
            cutImgdialog: false,        //图片裁剪
            titileSet:'设置',              //设置
        };
    },

    mounted() {
        
    },

    components: {
        'app-mwsetting':    mwsetting,
        'app-modal':        modal
    },

    methods: {
        gopage(page) {
            // this.$router.push({ name: page })
            switch (page) {
                case 'Setting':   /*设置*/
                    // this.$emit('showSetting',true);
                    this.contentSet = [true];
                    // this.$router.push({ name: 'Cutimgdialog' })
                    break;
            }
        }
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
</style>
