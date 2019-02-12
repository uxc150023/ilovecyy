<template>
    <div>
        <app-tabmeeting v-bind:id="id" v-bind:tabItem="firstCloumn" v-on:change="change">
            <div v-if="dataListObj.dataList.length === 0">
                <app-empty></app-empty>
            </div>
            <app-listTwo v-bind:dataListObj="dataListObj"></app-listTwo>
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
                firstCloumn: [],
                irsCloumn: [],
                secondCloumn: [],
                dataListObj: {
                    dataList: []
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
                let self = this;
                this._getData(this._getUrl('IRSCLOUMN'),{
                    userid: this._store.state.userid
                },res=> {
                    console.log(res)
                    self.irsCloumn = JSON.parse(res.data.column);
                    self.irsCloumn.forEach( (ele,index) => {
                        let obj = {}
                        obj[index] = ele[1]
                        self.firstCloumn.push(obj)
                    })
                    console.log(self.firstCloumn)
                })
            },
            change (obj) {
                let self = this;
                console.log(obj)
                //二级导航
                if (obj.tabId === 'navOne') {
                    console.log(obj.tab)
                    //最新读品
                    if (obj.tab.label === '最新读品') {
                        self.secondCloumn = ['读品来潮','读品尖峰','读品专列'];
                    }
                }
                // this.getDataList(type);
            },
        },
        mounted () {
            this.getCloumn();
        }
    }

</script>

<style lang="scss">

</style>
