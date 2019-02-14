<template>
    <div id="classify">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item>
                <el-radio v-model="radio" label="1">暂不分类</el-radio>
            </el-form-item>
            <el-form-item class="btnBox">
                <el-button @click="">取&emsp;&emsp;消</el-button>
                <el-button type="primary" @click="">确&emsp;&emsp;定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                radio: '1',
                form: {

                },
            };
        }
    }
</script>

<style lang="scss">

</style>
