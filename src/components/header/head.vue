<template>
    <div>
        <div class="top-header">
            <el-row>
                <img src="../../images/icon.gif" class="top-img">
                <el-button class='btn-0' v-if='!this._store.state.userid' @click="gopage('share')">雪花勇闯天涯</el-button>

                <el-button class='btn-0' v-if='this._store.state.userType === "per"' @click="gopage('Mysorld')">我世界</el-button>
                <el-button class='btn-0' v-if='this._store.state.userType === "org"' @click="gopage('Mystunet')">我团队</el-button>

                <el-button @click="gopage('Mystunet')">我的学网</el-button>
                <el-button @click="gopage('MyGroupFriend')">学群学友</el-button>
                <el-button @click="gopage('Recome')">推介</el-button>
                <el-button @click="gopage('Director')">理事</el-button>
                <el-button @click="gopage('Uercenter')">办公室</el-button>
                <el-button @click="gopage('Financial')">财务室</el-button>
                <el-button @click="gopage('Archive')">资料馆</el-button>
                <el-button v-if='this._store.state.userid' @click="gopage('Setting')">设置</el-button>
                <el-button v-if='!this._store.state.userid' @click="gopage('Register')">注册</el-button>
                <el-button v-if='this._store.state.userid'  @click="gopage('Quit')">退出</el-button>
                <el-button v-if='!this._store.state.userid' @click="gopage('Login')">登陆</el-button>
            </el-row>
        </div>
        <app-modal :modalInfo='modalInfo'>
            <app-mwsetting v-on:closeModal="closeModal"></app-mwsetting>
        </app-modal>

    </div>
</template>
<script>
import modal        from '@/components/modal/modal'
import mwsetting    from '@/views/setting/mwsetting'

export default {

    data() {
        return {
            loginStatus: '',            //是否登陆
            cutImgdialog: false,        //图片裁剪
            modalInfo: {
                title: '设置',
                show: false
            }
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
                    this.modalInfo.show = true
                    // this.$router.push({ name: 'Cutimgdialog' })
                    break
                case 'Quit': /*退出*/
                    this._common.warnMsg('确定退出么?', function(){
                        sessionStorage.clear()
                        this._common.clearStore()
                        this.$router.push({ name: 'Index' })
                    })
                    break
                case 'Login': /*登陆*/
                    this.$router.push({ name: 'Login' })
                    break
            }
        },
        closeModal() {
            this.modalInfo.show = false
        }
    }
};

</script>
<style lang="scss">
    .top-header {
        text-align: right;
        height: 46px;
        background-image: linear-gradient(90deg, #59ace7 0%, #5578ea 50%, #5254eb 84%, #5044ec 100%);
        font-size: 0;
        .top-img {
            width: 46px;
            height: 46px;
            float: left;
            margin-left: 2px;
        }
        .btn-0 {
            float: left;
        }
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
