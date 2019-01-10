<template>
    <div>
        <div class="item">
            <div class="media-left">
                <img src="../../assets/logo.png">
            </div>
            <div class="media-body">
                <el-row>
                    <el-col :span="12"><div class="grid-content title">fsdafsa</div></el-col>
                    <el-col :span="12"><div class="grid-content">fasf</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="12"><div class="grid-content title">fsdafsa</div></el-col>
                    <el-col :span="12"><div class="grid-content">fasf</div></el-col>
                </el-row>
                <el-row>
                    <el-col :span="24"><div class="grid-content"><el-button type="text">文字按钮</el-button></div></el-col>
                </el-row>
            </div>
        </div>
    </div>
</template>
<script>

</script>
<style lang="scss" scoped>
    .item {
        height: 128px;
        border-bottom: 2px solid #fafafa;
        .media-left {
            background-color: #fafafa;
            width: 118px;
            height: 74px;
            margin: 0 8px 40px 12px;
            float: left;
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }
        .media-body {
            margin-left: 138px;
            .el-row {
                height: 16px;
                margin-bottom: 15px;
                .el-col {
                    height: 16px;
                    .grid-content {
                        height: 16px;
                        line-height: 16px;
                        font-size: 14px;
                        font-family: PingFangSC-Regular;
                        font-weight: 400;
                        color: #707070;
                        text-align: left;
                    }
                    .title {
                        font-size: 16px;
                        font-weight: 600;
                        color: #333333;
                    }
                }
            }
        }
    }
</style>
