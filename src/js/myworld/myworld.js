import modal from '@/components/modal/modal'
import myworldbanner from '@/components/banner/myworldbanner'

export default {
    data() {
        return {
            banners: {
                type: 'myworld',
                navlist: []
            },
            
        };
    },

    computed: {
        headImage: {
            get () {
                return this._getUrl('IMGURL') + encodeURI(this.$store.state.headImage)
            }
        }
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
                "stunetId": this.$store.state.stunetId,
                "bid": this.$store.state.bid,
                "type": 1
            }
            /*查询学会信息*/
            this._getData(this._getUrl('STUORGINFO'), params, res => {
                if(res.code === 200){
                    this.banners.navlist = res.data.stunetMenuConfigs
                    this.$store.commit('SET_HEADIMAGE',res.data.stunetBanners[0].picUrl);
                }
            })
        }
    }
}
