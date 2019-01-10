<template>
    <div>
        <div class="btnBox">
            <el-row>
                <el-button type="primary" @click="newMeeting()">发起会议</el-button>
            </el-row>
        </div>
        <app-colmeeting title="我发起的会议"></app-colmeeting>
        <app-tabmeeting v-bind:tabItem="tabOne"></app-tabmeeting>
        <app-colmeeting title="会议邀请"></app-colmeeting>
        <app-tabmeeting v-bind:tabItem="tabTwo"></app-tabmeeting>
        <app-modal v-bind:dialogVisible="dialogVisible"></app-modal>
    </div>
</template>

<script>
    import Mymeeting from '@/js/myworld/mymeeting.js'
    export default Mymeeting

</script>

<style lang="scss">
    .btnBox {
        padding: 10px;
        text-align: right;
    }
    .el-collapse {
        border: none;

    }
</style>
