<template>
    <div>
        <div class="top-header">
            <el-row>
                <el-button class='btn-0'
                           v-if='!this._store.state.userid'
                           @click="gopage('read')">read</el-button>
                <el-button class='btn-0'
                           v-if='!this._store.state.userid'
                           @click="gopage('write')">write</el-button>

                <el-button v-if='this.type === 0'
                           @click="gopage('wddp')">wddp</el-button>
                <el-button v-if='this.type === 0'
                           @click="gopage('wysc')">wysc</el-button>
                <el-button v-if='this.type === 1'
                           @click="gopage('wdzp')">wdzp</el-button>
                <el-button v-if='this.type === 1'
                           @click="gopage('wxwx')">wxwx</el-button>
                <el-button v-if='this.type === 1'
                           @click="gopage('xzzs')">xzzs</el-button>
            </el-row>
        </div>
        <app-modal :modalInfo='modalInfo'>
            <app-mwsetting v-on:closeModal="closeModal"></app-mwsetting>
        </app-modal>

    </div>
</template>
<script>
export default {

    data () {
        return {

        }
    },
    props: {
        type: 0 /* 0我读1我写 */
    },
    mounted () {

    },

    components: {
    },

    methods: {
        gopage (page) {
            // this.$router.push({ name: page })
            switch (page) {
                case 'Setting': /* 设置 */
                    // this.$emit('showSetting',true);
                    this.modalInfo.show = true
                    // this.$router.push({ name: 'Cutimgdialog' })
                    break
                case 'Quit': /* 退出 */
                    this._common.warnMsg('确定退出么?', function () {
                        sessionStorage.clear()
                        this._common.clearStore()
                        this.$router.push({ name: 'Index' })
                    })
                    break
                case 'Login': /* 登陆 */
                    this.$router.push({ name: 'Login' })
                    break
                case 'Register': /* 注册 */
                    this.$router.push({ name: 'Register' })
                    break
            }
        },
        closeModal () {
            this.modalInfo.show = false
        }
    }
}

</script>
<style lang="scss">
.top-header {
    text-align: right;
    height: 46px;
    background-image: linear-gradient(
        90deg,
        #59ace7 0%,
        #5578ea 50%,
        #5254eb 84%,
        #5044ec 100%
    );
    font-size: 0;
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
