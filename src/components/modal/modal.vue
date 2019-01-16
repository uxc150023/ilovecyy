<template>
    <div class="common-modal" id="common-modal">
        <div class="">
            <el-dialog :title="title" :visible.sync="dialogVisible[0]">
                <div id="modalContent">
                    <slot></slot>
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
    import neweeting from '@/components/meeting/newmeeting'
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
    props: {
        dialogVisible: '',
        title: ''
    },
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
    #common-modal {
        .el-dialog {
            width: 900px;
            .el-dialog__header {
                background: url('../../assets/alert.png') no-repeat;
                background-size: 900px 40px;
                height: 40px;
                padding: 0;
                line-height: 40px;
                .el-dialog__title {
                    position: absolute;
                    left: 0;
                    top: 10px;
                    font-size: 16px;
                    line-height: 30px;
                    color: #fff;
                    display: block;
                    height: 30px;
                    font-weight: 600;
                    background-color: #4C88FF;
                    padding: 0 30px;
                }
                .el-dialog__headerbtn {
                    top: 12px;
                }
            }
        }
    }
</style>
