<template>
    <div class="modal">
        <div class="">
            <el-dialog title="设置" :visible.sync="dialogVisible[0]">
                <span>这是一段信息</span>

                <div id="modalContent">

                </div>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = [false]">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = [false]">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                name: 'zb',
                region: 'eee'
            },
            formLabelWidth: '100px'
        };
    },
    props: ['dialogVisible'],

    mounted(){
        
    },

    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
    }
};

</script>
<style lang="scss">
.banner {
    background-color: #0092ff;
    text-align: left;
    padding-left: 30px;

    .el-radio-group {

        .is-active {
            background-color: #2954aa;
        }

        .el-radio-button {
            .el-radio-button__inner {
                background-color: transparent;
                border: 0;
                color: #fff;
            }
        }
    }
}

</style>
