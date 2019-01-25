<template>
    <div class="common-modal" id="common-modal">
        <div class="">
            <el-dialog :id="id" :title="modalInfo.title" :visible.sync="modalInfo.show" :modal='modalInfo.modal' @opened="modalOpened" @closed="modalClosed">
                <div id="modalContent">
                    <slot></slot>
                </div>
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
    props: {
        id: '',
        modalInfo: {
            title: '',
            show: false,
            modal: true,  //是否需要遮罩
        }
    },
    methods: {
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        modalOpened() {
            this.$emit('modalOpened')
        },
        modalClosed() {
            this.$emit('modalClosed')
        }
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
