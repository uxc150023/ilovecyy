<template>
    <div id="mymeeting">
        <div class="btnBox">
            <el-row>
                <el-button type="primary" @click="newMeeting">发起会议</el-button>
            </el-row>
        </div>
        <app-colmeeting title="我发起的会议">
            <app-styleone v-bind:meetInfo="meetInfo"></app-styleone>
            <div v-if="meetInfo.length === 0">
                <app-empty></app-empty>
            </div>
            <!--<app-pagination :total="total1[0]" :id="pageId_1" :current-page.sync="currentPage" v-on:getCurrentPage="getCurrentPage"></app-pagination>-->
        </app-colmeeting>

        <app-tabmeeting v-bind:id="id_1" v-bind:tabItem="tabOne" v-on:change="change">
            <app-styletwo v-bind:meetInfo="tabOneData"></app-styletwo>
        </app-tabmeeting>

        <app-colmeeting title="会议邀请">
            <app-styleone v-bind:meetInfo="inviteInfo"></app-styleone>
            <div v-if="inviteInfo.length === 0">
                <app-empty></app-empty>
            </div>
        </app-colmeeting>

        <app-tabmeeting v-bind:id="id_2" v-bind:tabItem="tabTwo" v-on:change="change">
            <app-styletwo v-bind:meetInfo="tabTwoData"></app-styletwo>
        </app-tabmeeting>

        <app-modal v-bind:modalInfo="modalInfo">
            <app-neweeting v-bind:modalInfo="modalInfo" v-on:confirm="confirm"></app-neweeting>
        </app-modal>

    </div>
</template>

<script>
    import Mymeeting from '@/js/myworld/mymeeting.js'
    export default Mymeeting
</script>

<style lang="scss">
    #mymeeting {
        .btnBox {
			padding: 10px 0;
            text-align: right;
        }
        .el-collapse {
            border: none;
        }
        .quill-editor {
            height: 245px;
            .ql-toolbar.ql-snow {
                text-align: left;
            }
            .ql-container {
                height: 180px;
            }
        }
        .el-form-item__content {
            line-height: 0;
        }

    }
</style>
