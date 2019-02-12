<template>
    <div>
        <div>
            <app-colmeeting title="新学锦鲤">
                <div v-if="dataListObj_2.dataList.length === 0">
                    <app-empty></app-empty>
                </div>
                <app-listTwo v-bind:dataListObj="dataListObj_2"></app-listTwo>
            </app-colmeeting>
        </div>
        <div>
            <app-tabmeeting v-bind:id="id" v-bind:tabItem="tabOne" v-on:change="change">
                <div v-if="dataListObj.dataList.length === 0">
                    <app-empty></app-empty>
                </div>
                <app-listTwo v-bind:dataListObj="dataListObj" v-on:collectPro="collectPro"></app-listTwo>
            </app-tabmeeting>
        </div>
    </div>
</template>

<script>
    import Tabmeeting from '@/components/tabs/meeting'
    import Colmeeting from '@/components/collapse/meeting'
    import listTwo from '@/components/list/list_2'
    import empty from '@/components/list/empty'

    export default {
        data () {
            return {
                id: '',
                tabOne: ['新学来潮','新学尖峰'],
                dataListObj: {
                    dataList: [
                    ],
                    btnshow: true,
                    add: 'xxx'
                 },
                dataListObj_2: {
                    dataList: [],
                    btnshow: true
                 },
                type: 2,
            }
        },
        components: {
            "app-tabmeeting": Tabmeeting,
            "app-colmeeting": Colmeeting,
            "app-listTwo": listTwo,
            "app-empty": empty,
        },
        methods: {
            //新学来潮等数据,type=2新学来潮
            getDataList (type) {
                let self = this;
                this._getData(this._getUrl('SEMYWORDKAM'),{
                  userid: this._store.state.userid,
                  type: type,
                  currentPage: 1,
                  onePageCount: 10
                },res=>{
                    if (type === 1) {  //新学锦鲤
                        self.dataListObj_2.dataList = res.data.listMap;
                        let len = res.data.listMap.length;
                        for(let i=0; i<len; i++) {
                            self.dataListObj_2.dataList[i].Tehmatic = JSON.parse(self.dataListObj_2.dataList[i].Tehmatic).length > 0 ? this._getUrl('SMALLIMGURL') + encodeURI(encodeURI(JSON.parse(self.dataListObj_2.dataList[i].Tehmatic)[0])) : [];
                        }
                    }else {  //新学尖峰
                        let len = res.data.listMap.length;
                        for(let i=0; i<len; i++) {
                            self.dataListObj.dataList.push(
                                {
                                    production_id: res.data.listMap[i].production_id,
                                    oldForm: res.data.listMap[i].oldForm,
                                    Type: res.data.listMap[i].Type,
                                    Tehmatic: res.data.listMap[i].Tehmatic,
                                    name: res.data.listMap[i].name,
                                    productionName: res.data.listMap[i].productionName,
                                    ForumName: res.data.listMap[i].ForumName,
                                    upload_time: res.data.listMap[i].upload_time,
                                    intro: res.data.listMap[i].intro,
                                    CRead: res.data.listMap[i].CRead,
                                    btnText: '收藏',
                                }
                            )
                            self.dataListObj.dataList[i].Tehmatic = JSON.parse(self.dataListObj.dataList[i].Tehmatic).length > 0 ? this._getUrl('SMALLIMGURL') + encodeURI(encodeURI(JSON.parse(self.dataListObj.dataList[i].Tehmatic)[0])) : [];
                        }
                    }
                })
            },
            change (obj) {
                let type = 2;
                type = obj.index === '0' ? 2 : 3
                this.getDataList(type);
            },
            collectPro (data) {
                let self = this;
                this._getData(this._getUrl('IRINTYPE'),{
                    userid: this._store.state.userid,
                    productionId: data.pid,
                    oneType: "暂不分类",
                    form: "暂不分类",
                    oldForm: data.oldForm
                },res=>{
                    console.log(self.dataListObj.dataList[data.mark].btnText);
                    if (res.code === 200) {
                        alert(2)
                        self.dataListObj.dataList[data.mark].btnText = '已收藏'
                    }
                })
            }
        },
        mounted () {
            this.getDataList(1);
            this.getDataList(2);
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
