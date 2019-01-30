<template>
    <div>
        <p>这是首页</p>
        <div>
            <app-tabmeeting v-bind:id="id" v-bind:tabItem="tabOne" v-on:change="change">
                <div v-if="dataList.length === 0">
                    <app-empty></app-empty>
                </div>
                <app-listTwo v-bind:dataList="dataList"></app-listTwo>
            </app-tabmeeting>
        </div>
    </div>
</template>

<script>
    import Tabmeeting from '@/components/tabs/meeting'
    import listTwo from '@/components/list/list_2'
    import empty from '@/components/list/empty'
    import {_getUrl, _getData} from '@/service/getdata.js'
    import store from '@/vuex/store.js'

    export default {
        data () {
            return {
                id: '',
                tabOne: ['新学来潮','新学尖峰'],
                dataList: '',
            }
        },
        components: {
            "app-tabmeeting": Tabmeeting,
            "app-listTwo": listTwo,
            "app-empty": empty,
        },
        methods: {
            //新学来潮等数据
            getDataList () {
              _getData(_getUrl('SEMYWORDKAM'),{
                  userid: store.state.userid,
                  type: 2,
                  currentPage: 1,
                  onePageCount: 10
              },res=>{
                  console.log(res)
              })
            },
            change () {

            }
        },
        mounted () {
            this.getDataList();
        }
    }

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
