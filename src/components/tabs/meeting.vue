<template>
    <div id="tabsMeeting">
        <el-tabs v-bind:id="id" v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in tabItem" :label="item" :name="item" :key="index">
                <slot></slot>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                activeName:''
            };
        },
        props:{
            tabItem:'',
            id: '',
        },
        components: {
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event)
                let tabId = tab.$el.parentNode.parentNode.getAttribute('id')
                this.$emit('change',{tabId: tabId, index: tab.index});
            }
        },
        created() {
            this.activeName = this.tabItem[0]
        }
    };
</script>
<style lang="scss">
    #tabsMeeting {
        .el-tabs {
            background-color: #fff;
            margin-bottom: 10px;
            .el-tabs__header {
                .el-tabs__active-bar {
                    background-color: #3366CC;
                }
                .el-tabs__item {
                    color: #3366CC;
                    font-size: 16px;
                }
                .el-tabs__item.is-active {
                    color: #3366CC;
                }
            }
        }
    }
</style>
