<template>
    <div>
        <!--一级导航-->
        <app-tabmeeting v-bind:id="id"
                        :tabItem="firstCloumn"
                        v-on:change="change"
                        v-if="firstCloumn.length > 0">
            <!--二级导航-->
            <app-tabmeeting v-if="secondCloumn.length > 0"
                            v-bind:id="id_2"
                            v-bind:tabItem="secondCloumn"
                            v-on:change="change">
                <!--二级导航内容（空）-->
                <div v-if="dataListObj_2.dataList.length === 0">
                    <app-empty></app-empty>
                </div>
                <!--二级导航内容-->
                <app-listTwo v-bind:dataListObj="dataListObj_2"
                             v-on:sortCollect="sortCollect"
                             v-on:deletePro="deletePro">

				</app-listTwo>

				<!--三级导航-->
				<app-tabmeeting v-if="thirdCloumn.length > 0"
								v-bind:id="id_3"
								v-bind:tabItem="thirdCloumn"
								v-on:change="change">
					<!--三级导航内容（空）-->
					<div v-if="dataListObj_3.dataList.length === 0">
						<app-empty></app-empty>
					</div>
					<!--三级导航内容-->
					<app-listTwo v-bind:dataListObj="dataListObj_3"
								 v-on:sortCollect="sortCollect"
								 v-on:deletePro="deletePro">

					</app-listTwo>
				</app-tabmeeting>
            </app-tabmeeting>

            <!--一级导航内容（空）-->
            <div v-if="secondCloumn.length === 0 && dataListObj.dataList.length === 0">
                <app-empty></app-empty>
            </div>
            <!--一级导航内容-->
            <app-listTwo v-bind:dataListObj="dataListObj"
                         v-if="secondCloumn.length === 0"
                         v-on:sortCollect="sortCollect"
                         v-on:deletePro="deletePro">

			</app-listTwo>
        </app-tabmeeting>
        <!--分类收藏弹层-->
        <app-modal v-bind:modalInfo="modalInfo">
            <app-classify v-bind:columnList="columnList"
                          v-bind:pid="pid"
                          v-bind:isAgain="isAgain"
                          v-bind:oldForm="oldForm"
                          v-on:confirm="confirm"
                          v-on:changeRadio="changeRadio"
                          v-on:recoverPro="recoverPro"></app-classify>
        </app-modal>
    </div>
</template>

<script>
import tabmeeting from '@/components/tabs/meeting'
import classify from '@/components/myread/classify'
import listTwo from '@/components/list/list_2'
import empty from '@/components/list/empty'
import modal from '@/components/modal/modal'

export default {
    data () {
        return {
            id: 'navOne',
            id_2: 'navTwo',
            id_3: 'navThree',
            firstCloumn: [],
            irsCloumn: [],
            secondCloumn: ['读品来潮', '读品尖峰', '读品专列'],
			thirdCloumn: [],
            dataListObj: {
                dataList: [],
                btnshow: true
            },
            dataListObj_2: {
                dataList: [],
                btnshow: true
            },
			dataListObj_3: {

			},
            modalInfo: {
                title: '分类收藏',
                show: false
            },
            columnList: {

            },
            pid: '',
            isAgain: '',
            oldForm: '',
            oneType: '',
            twoType: '',
            isClear: ''
        }
    },
    components: {
        'app-tabmeeting': tabmeeting,
        'app-classify': classify,
        'app-listTwo': listTwo,
        'app-empty': empty,
        'app-modal': modal
    },
    methods: {
        getCloumn () {
            this._getData(this._getUrl('IRSCLOUMN'), {
                userid: this.$store.state.userid
            }, res => {
                this.irsCloumn = JSON.parse(res.data.column)
                this.irsCloumn.forEach((ele, index) => {
                    this.firstCloumn.push(ele[1])
                })
            })
            this.initNewRead('Time')
        },
        // 获取一级导航内容
        getMainContent (oneType) {
            let url = oneType === '已删读品' ? this._getUrl('IRSDEPRO') : this._getUrl('IRSETYPEAL')
            let style = ''
            if (oneType === '收藏读品' || oneType === '已阅读品' || oneType === '已删读品') {
                style = 'styleOne'
            } else if (oneType === '至爱读品' || oneType === '文字读品' || oneType === '图像读品' || oneType === '视频读品' || oneType === '音频读品') {
                style = 'styleTwo'
            }
            let param = {
                userid: this.$store.state.userid,
                oneType: oneType,
                onePageCount: 150,
                currentPage: 1
            }
            this._getData(url, param, res => {
                let len = res.data.listMap.length
                for (let i = 0; i < len; i++) {
                    this.dataListObj.oneType = oneType
                    this.dataListObj.dataList.push({
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
                        Type: style
                    })
                    this.dataListObj.dataList[i].Tehmatic = JSON.parse(this.dataListObj.dataList[i].Tehmatic).length > 0 ? this._getUrl('SMALLIMGURL') + encodeURI(encodeURI(JSON.parse(this.dataListObj.dataList[i].Tehmatic)[0])) : []
                }
            })
        },
        // 获取二级导航内容--最新读品，Time读品来潮,Integral读品尖峰,Money读品专列
        initNewRead (orderBy) {
            this.dataListObj_2.dataList = []
            this._getData(this._getUrl('IRSNEWPRO'), {
                'userid': this.$store.state.userid,
                'orderBy': orderBy,
                'onePageCount': 150,
                'currentPage': 1
            }, res => {
            	console.log(res)
				let len = res.data.listMap.length
				for (let i = 0; i < len; i++) {
					this.dataListObj_2.oneType = '最新读品'
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
						Type: 'styleOne'
					})
					this.dataListObj_2.dataList[i].Tehmatic = JSON.parse(this.dataListObj_2.dataList[i].Tehmatic).length > 0 ? this._getUrl('SMALLIMGURL') + encodeURI(encodeURI(JSON.parse(this.dataListObj_2.dataList[i].Tehmatic)[0])) : []
				}
            })
        },
        change (obj) {
            // 二级导航
            if (obj.tabId === 'navOne') {
                this.secondCloumn = []
                this.dataListObj.dataList = []
                // 最新读品
                if (obj.tab.label === '最新读品') {
                    this.secondCloumn.push('读品来潮', '读品尖峰', '读品专列')
                    this.initNewRead('Time')
                } else if (obj.tab.label === '分类设置') {
                    // 分类设置
                } else {
                    this.irsCloumn.forEach((ele, index) => {
                        if (obj.tab.label === ele[1].split('-')[0]) {
                            if (ele[2] && ele[2].length > 0) {
                                this.secondCloumn = ele[2]
								console.log(this.secondCloumn)
                            } else {
                                this.getMainContent(obj.tab.label)
                            }
                        }
                    })
                }
            } else if (obj.tabId === 'navTwo') {
                if (obj.tab.label === '读品来潮') {
                    this.initNewRead('Time')
                } else if (obj.tab.label === '读品尖峰') {
                    this.initNewRead('Integral')
                } else if (obj.tab.label === '读品专列') {
                    this.initNewRead('Money')
                }else {
                	//获取三级导航
					this._getData(this._getUrl('IRSCLOUMNLE3'),{
						userid: this._store.state.userid,
						le2Column: obj.tab.label,
					},res=> {
						console.log(res)
						if (res.data.length > 0) {
							res.data.forEach((ele,index)=>{
								this.thirdCloumn.push(ele.typeName);
							})
						}
					})
				}
            }
        },
        // 分类收藏
        sortCollect (data) {
            this._getData(this._getUrl('IRSCLOUMN'), {
                productionId: data.pid,
                userid: this._store.state.userid
            }, res => {
                this.columnList = JSON.parse(res.data.column)
                if (res.code === 200) {
                    this.modalInfo.show = true
                    this.pid = data.pid
                    this.isAgain = data.isAgain
                    this.oldForm = data.oldForm
                }
            })
        },
        // 删除作品
        deletePro (data) {
            this._common.warnMsg('确定删除么?', function () {
                let param = {
                    userid: this._store.state.userid,
                    productionId: data.pid,
                    isClear: this.isClear ? 'Y' : 'N'
                }
                let url = this._getUrl('IRDPRO')
                this._getData(url, param, res => {
                    if (res.code === 200) {

                    }
                })
            })
        },
        // 恢复作品
        recoverPro (data) {

        },
        confirm (data) {
            let url = data.isAgain ? this._getUrl('IRAGAINTYPE') : this._getUrl('IRINTYPE')
            let param = {
                userid: this._store.state.userid,
                productionId: data.pid,
                oldForm: data.oldForm,
                oneType: this.oneType,
                form: this.oneType,
                twoType: this.twoType || ''
            }
            this._getData(url, param, res => {
                if (res.code === 200) {
                    this.modalInfo.show = false
                }
            })
        },
        changeRadio (data) {
            this.oneType = data.oneType
            this.twoType = data.twoType
        }
    },
    mounted () {
        this.getCloumn()
    }
}

</script>

<style lang="scss">
</style>
