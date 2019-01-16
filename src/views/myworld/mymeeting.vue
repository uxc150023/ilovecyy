<template>
    <div id="mymeeting">
        <div class="btnBox">
            <el-row>
                <el-button type="primary" @click="newMeeting">发起会议</el-button>
            </el-row>
        </div>
        <app-colmeeting title="我发起的会议"></app-colmeeting>
        <app-tabmeeting v-bind:tabItem="tabOne"></app-tabmeeting>
        <app-colmeeting title="会议邀请"></app-colmeeting>
        <app-tabmeeting v-bind:tabItem="tabTwo"></app-tabmeeting>
        <app-modal v-bind:dialogVisible="dialogVisible" v-bind:title="title" @cutimgShowa="cutimgShowa">
            <app-neweeting slot="part1"></app-neweeting>
        </app-modal>
        <!--<app-modal v-bind:cutimgShow="cutimgShow" v-bind:title="title">-->
            <!--<app-cutimgdialog slot="part1"></app-cutimgdialog>-->
        <!--</app-modal>-->
    </div>
</template>

<script>
    import Mymeeting from '@/js/myworld/mymeeting.js'
    export default Mymeeting
</script>

<style lang="scss">
    #mymeeting {
        .btnBox {
            padding: 10px;
            text-align: right;
        }
        .el-collapse {
            border: none;
        }
    }
</style>
