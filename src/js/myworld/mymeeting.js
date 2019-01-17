import Colmeeting from '@/components/collapse/meeting'
import Tabmeeting from '@/components/tabs/meeting'
import modal from '@/components/modal/modal'
import {_getUrl, _getData} from '@/service/getdata.js'
import commonAction from "@/js/commonAction"
import neweeting from '@/components/meeting/newmeeting'
import mwsetting    from '@/views/setting/mwsetting'
import Vue from 'vue'

export default {
    data() {
        return {
            stunetId: commonAction.getStorage("webinfo").stunet_id,
            meetInfo: {},
            tabOne:['我参加的会议','我收藏的会议'],
            tabTwo:['会议来潮','会议尖峰','会议专列'],
            // dialogVisible: [false],
            // title: '',
            modalInfo: {
                title: '新建会议',
                show: false
            }
            // cutimgShow: [false],
        };
    },
    mounted() {
        // this.initMeetInfo(0)
        // this.initMeetInfo(1)
        this.initMeetInfo(2)
        // this.initMeetInfo(3)
    },
    components: {
        "app-colmeeting": Colmeeting,
        "app-tabmeeting": Tabmeeting,
        "app-modal": modal,
        'app-neweeting': neweeting,
    },
    methods: {
        initMeetInfo(stmType){
            /*查询会议信息*/
            _getData(_getUrl('MEET_MYLIST'), {
                "stunetId": this.stunetId,
                "stmType": stmType,
            }, res => {
                this.meetInfo = res.data
            });
        },
        newMeeting() {
            this.modalInfo.show = true;
            // this.title = '新建会议';
        },
        cutimgShowa() {
            this.cutimgShow = [true]
        }

    }
}
