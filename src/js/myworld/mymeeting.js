import Vue from 'vue'
import Colmeeting from '@/components/collapse/meeting'
import Tabmeeting from '@/components/tabs/meeting'
import modal from '@/components/modal/modal'
import neweeting from '@/components/meeting/newmeeting'
import mwsetting    from '@/views/setting/mwsetting'
import styleone from '@/components/meeting/styleone'
import styletwo from '@/components/meeting/styletwo'
import empty from '@/components/list/empty'
import pagination from '@/components/pagination'

export default {
    data() {
        return {
            stunetId: this._common.getStorage("webinfo").stunet_id,
            id_1: 'tabOne',
            id_2: 'tabTwo',
            pageId_1: 'pageOne',
            pageId_2: 'pageTwo',
            pageId_3: 'pageThree',
            pageId_4: 'pageFour',
            meetInfo: {},
            inviteInfo: {},
            tabOneArray: [],
            tabOneData: '',
            tabTwoData: '',
            tabTwoArray: [],
            tabOne:['我参加的会议','我收藏的会议'],
            tabTwo:['会议来潮','会议尖峰','会议专列'],
            modalInfo: {
                title: '新建会议',
                show: false
            },
            currentPage: 1,
            total1: [],
        };
    },
    mounted() {
        this.getDataList(0)  //会议邀请
        this.getDataList(2)   //发起会议
        this.getDataList(3)  //参加的会议
        this.getDataList(5)  //会议来潮
        this.getDataList(6)  //会议尖峰
    },
    components: {
        "app-colmeeting": Colmeeting,
        "app-tabmeeting": Tabmeeting,
        "app-modal": modal,
        'app-neweeting': neweeting,
        "app-styleone": styleone,
        "app-styletwo": styletwo,
        "app-empty": empty,
        "app-pagination": pagination,
    },
    methods: {
        getDataList(stmType,currentPage){
            /*查询会议信息*/
            this._getData(this._getUrl('MEET_MYLIST'), {
                "stunetId": this._store.state.stunetId,
                "stmType": stmType,
                "currentPage": currentPage ? currentPage : 1,
                "onePageCount": 10
            }, res => {
                switch (stmType) {
                    case 0:
                        this.inviteInfo = res.data.list;
                        break;
                    case 2:
                        this.meetInfo = res.data.list;
                        console.log(res)
                        this.total1[0] = res.data.countRecord;
                        break;
                    case 3:
                        this.tabOneArray[0] = res.data.list;
                        this.tabOneData = res.data.list;
                        break;
                    case 5:
                        this.tabTwoArray[0] = res.data.list;
                        this.tabTwoData = res.data.list;
                        break;
                    case 6:
                        this.topInfo = res.data.list;
                        this.tabTwoArray[1] = res.data.list;
                        break;
                }
            });
        },
        newMeeting() {
            this.modalInfo.show = true;
        },
        confirm(res) {
            this.modalInfo.show = res;
        },
        //tab切换改变数据
        change(obj) {
            if (obj.tabId === 'tabOne') {
                this.tabOneData = this.tabOneArray[obj.index];  //我参加的会议等
            }else {
                this.tabTwoData = this.tabTwoArray[obj.index];  //会议尖峰等
            }
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        },
        getCurrentPage(val) {
            this.currentPage = val;
        }

    }
}
