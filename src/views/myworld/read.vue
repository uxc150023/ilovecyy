<template>
    <div>
        <app-tabmeeting v-bind:id="id" :tabItem="firstCloumn" v-on:change="change" v-if="firstCloumn.length > 0">
            <app-tabmeeting v-if="secondCloumn.length > 0" v-bind:id="id_2" v-bind:tabItem="secondCloumn" v-on:change="change">
                <div v-if="dataListObj_2.dataList.length === 0">
                    <app-empty></app-empty>
                </div>
                <app-listTwo v-bind:dataListObj="dataListObj_2"></app-listTwo>
            </app-tabmeeting>
            <div v-if="secondCloumn.length === 0 && dataListObj.dataList.length === 0">
                <app-empty></app-empty>
            </div>
            <app-listTwo v-bind:dataListObj="dataListObj" v-if="secondCloumn.length === 0"></app-listTwo>
        </app-tabmeeting>
    </div>
</template>

<script>
    import Tabmeeting from '@/components/tabs/meeting'
    import listTwo from '@/components/list/list_2'
    import empty from '@/components/list/empty'

    export default {
        data () {
            return {
                id: 'navOne',
                id_2: 'navTwo',
                firstCloumn: [],
                irsCloumn: [],
                secondCloumn: ['读品来潮','读品尖峰','读品专列'],
                dataListObj: {
                    dataList: [],
                    btnshow: true
                },
                dataListObj_2: {
                    dataList: [],
                    btnshow: true
                },
            }
        },
        components: {
            "app-tabmeeting": Tabmeeting,
            "app-listTwo": listTwo,
            "app-empty": empty,
        },
        methods: {
            getCloumn () {
                this._getData(this._getUrl('IRSCLOUMN'),{
                    userid: this._store.state.userid
                },res=> {
                    this.irsCloumn = JSON.parse(res.data.column);
                    this.irsCloumn.forEach( (ele,index) => {
                        this.firstCloumn.push(ele[1])
                    })
                })
            },
            //获取一级导航内容
            getMainContent (oneType) {
                let url = oneType == '已删读品' ? this._getUrl('IRSDEPRO') : this._getUrl('IRSETYPEAL');
                let param = {
                    userid: this._store.state.userid,
                    oneType: oneType,
                    onePageCount: 150,
                    currentPage: 1
                };
                this._getData(url,param,res => {
                    console.log(res)
                })
            },
            //获取二级导航内容--最新读品，Time读品来潮,Integral读品尖峰,Money读品专列
            initNewRead (orderBy) {
                this.dataListObj_2.dataList = []
                this._getData(this._getUrl('IRSNEWPRO'),{
                    'userid': this._store.state.userid,
                    'orderBy': orderBy,
                    'onePageCount': 150,
                    'currentPage': 1
                },res=> {
                    console.log(res)
                    this._getData(this._getUrl('IRSNEWPRO'),{
                        'userid': this._store.state.userid,
                        'orderBy': orderBy,
                        'onePageCount': 150,
                        'currentPage': 1
                    },res=> {
                        console.log(res)
                        let len = res.data.listMap.length;
                        for(let i=0; i<len; i++) {
                            this.dataListObj_2.dataList.push({
                                production_id: res.data.listMap[i].production_id,
                                oldForm: res.data.listMap[i].oldForm,
                                Tehmatic: res.data.listMap[i].Tehmatic,
                                name: res.data.listMap[i].name,
                                productionName: res.data.listMap[i].productionName,
                                ForumName: res.data.listMap[i].ForumName,
                                upload_time: res.data.listMap[i].upload_time,
                                intro: res.data.listMap[i].intro,
                                Integral: res.data.listMap[i].Integral,
                                money: res.data.listMap[i].money,
                                productionUrl: res.data.listMap[i].productionUrl,
                                Type: 'styleOne',
                            })
                            this.dataListObj_2.dataList[i].Tehmatic = JSON.parse(this.dataListObj_2.dataList[i].Tehmatic).length > 0 ? this._getUrl('SMALLIMGURL') + encodeURI(encodeURI(JSON.parse(this.dataListObj_2.dataList[i].Tehmatic)[0])) : [];
                        }
                    })
                })
            },
            change (obj) {
                //二级导航
                if (obj.tabId === 'navOne') {
                    this.secondCloumn=[];
                    //最新读品
                    if (obj.tab.label === '最新读品') {
                        this.secondCloumn.push('读品来潮','读品尖峰','读品专列');
                        this.initNewRead('Time');
                    }else if (obj.tab.label == '分类设置') {
                        //分类设置
                    }else {
                        this.irsCloumn.forEach((ele,index) => {
                            if (obj.tab.label === ele[1].split('-')[0]) {
                                if (ele[2]) {
                                    this.secondCloumn = ele[2]
                                }else {

                                }
                            }
                        })
                    }
                }else if (obj.tabId === 'navTwo') {
                    if (obj.tab.label === '读品来潮') {
                        this.initNewRead('Time');
                    }else if (obj.tab.label === '读品尖峰') {
                        this.initNewRead('Integral');
                    }else if (obj.tab.label === '读品专列') {
                        this.initNewRead('Money');
                    }
                }
            },
            //分类收藏
            classify () {

            },
        },
        mounted () {
            this.getCloumn();
        }
    }

</script>

<style lang="scss">

</style>
