<template>
    <div id="classify">
        <el-form ref="form" :model="form" label-width="80px" v-bind:pid="pid">
            <el-form-item>
                <el-radio v-model="radio" label="暂不分类" v-on:change="changeRadio">暂不分类</el-radio>
            </el-form-item>
            <el-form-item v-for="(item, index) in columnList">
                <el-radio v-model="radio" :label="item[1].split('-')[0]" v-on:change="changeRadio">{{ item[1].split("-")[0] }}</el-radio>
                <div v-if="item[2] && item[2].length > 0" class="secondItem">
                    <div v-for="(ele, i) in item[2]" v-if="ele.split('-')[0] !== '文字读品'" class="item">
                        <el-radio v-on:changeRadio="changeRadio" v-model="radio" :label="ele.split('-')[0]" >{{ ele.split("-")[0] }}</el-radio>
                    </div>
                    <div v-for="(ele, i) in item[2]" v-if="ele.split('-')[0] === '文字读品'" class="item">
                        <el-radio v-on:change="changeRadio" v-model="radio" :label="ele.split('-')[0]">{{ ele.split("-")[0] }}</el-radio>
                    </div>
                </div>
            </el-form-item>
            <div class="btnBox">
                <el-button @click="">取&emsp;&emsp;消</el-button>
                <el-button type="primary" @click="confirm({pid: pid, isAgain: isAgain,oldForm: oldForm,radio: radio})">确&emsp;&emsp;定</el-button>
            </div>
        </el-form>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                radio: '暂不分类',
                form: {

                },
            };
        },
        props: {
            columnList: {

            },
            pid: '',
            isAgain: '',
            oldForm: '',
        },
        methods: {
            confirm (data) {
                this.$emit('confirm', data);
            },
            changeRadio (data) {
                this.$emit('changeRadio', data);
            }
        },
    }
</script>

<style lang="scss">
    #classify {
        .el-form {
            padding: 0 10px;
            .el-form-item {
                border-bottom: 1px solid #f1f1f1;
                margin-bottom: 0;
                .el-form-item__content {
                    line-height: 54px;
                    margin-left: 0!important;
                    .el-radio__label {
                        font-size: 16px;
                        font-weight: normal;
                    }
                }
                .secondItem {
                    .item {
                        border-bottom: 1px solid #f1f1f1;
                    }
                    .item:last-child {
                        border-bottom: none;
                    }
                }
                .secondItem {
                    padding-left: 60px;
                }
            }
            .btnBox {
                text-align: center;
                margin-top: 30px;
            }
        }

    }

</style>
