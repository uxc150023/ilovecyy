import Colmeeting from '@/components/collapse/meeting'
import Tabmeeting from '@/components/tabs/meeting'
import modal from '@/components/modal/modal'

export default {
    data() {
        return {
            tabOne:['我参加的会议','我收藏的会议'],
            tabTwo:['会议来潮','会议尖峰','会议专列'],
            dialogVisible: [false],
        };
    },

    mounted() {
        this.init()
    },

    components: {
        "app-colmeeting": Colmeeting,
        "app-tabmeeting": Tabmeeting,
        "app-modal": modal,
    },

    methods: {
        init(){

        },
        newMeeting() {
            this.dialogVisible = [true];
        }
    }
}
