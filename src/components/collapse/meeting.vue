<template>
    <div>
        <el-collapse accordion>
            <el-collapse-item>
                <template slot="title">
                    <span class="bar"></span>
                    {{title}}
                </template>
                <app-styleone></app-styleone>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
    import styleone from '@/components/meeting/styleone'

    export default {
        data() {
            return {
                activeName: '1'
            };
        },
        props: ['title'],
        mounted() {

        },
        components: {
            "app-styleone": styleone,
        },
        methods: {
            handleChange(val) {
                console.log(val);
            }
        }
    }
</script>
<style lang="scss">
    .el-collapse {
        margin-bottom: 10px;
        .el-collapse-item__header {
            font-size: 16px;
            color: #3366CC;
            border: none;
            .bar {
                width: 3px;
                height: 20px;
                background-color: #3366CC;
                margin-right: 10px;
            }
        }
        .el-collapse-item__wrap {
            border: none;
            .el-collapse-item__content {
                border: none;
            }
        }
    }

</style>
