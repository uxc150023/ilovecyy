import modal from '@/components/modal/modal'
import myworldbanner from '@/components/banner/myworldbanner'

export default {
    data() {
        return {
            banners: {
                type: 'myworld',
                navlist: []
            },
            // dialogVisible: [false]   /*向子组件传值，因为子组件也需要修改这个值，所以要用数组或者对象的方式 传值*/

        };
    },

    mounted() {
        this.init()
    },

    components: {
        "app-myworldbanner": myworldbanner,
        "app-modal":modal,
    },

    methods: {
        init(){
            var params = {
                "stunetId": this._store.state.stunetId,
                "bid": 1,
                "type": 1
            }
            /*查询学会信息*/
            this._getData(this._getUrl('STUORGINFO'), params, res => {
                this.banners.navlist = res.data.stunetMenuConfigs
            })
        }
    }
}
