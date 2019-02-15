<template>
    <div class="myworld">
        <div class="myworld_head">
            <img class="bgImage"
                 :src='headImage'>
        </div>
        <app-myworldbanner v-bind:banners="banners"></app-myworldbanner>
    </div>
</template>

<script>
import modal from '@/components/modal/modal'
import myworldbanner from '@/components/banner/myworldbanner'

export default {
    data () {
        return {
            banners: {
                type: 'myworld',
                navlist: []
            }

        }
    },
    computed: {
        headImage: {
            get () {
                return this._getUrl('IMGURL') + encodeURI(this.$store.state.headImage)
            }
        }
    },
    mounted () {
        this.init()
    },
    components: {
        'app-myworldbanner': myworldbanner,
        'app-modal': modal
    },
    methods: {
        init () {
            var params = {
                'stunetId': this.$store.state.stunetId,
                'bid': this.$store.state.bid,
                'type': 1
            }
            /**
             *获取学会信息
             */
            this._getData(this._getUrl('STUORGINFO'), params, res => {
                if (res.code === 200) {
                    this.banners.navlist = res.data.stunetMenuConfigs
                    this.$store.commit('SET_HEADIMAGE', res.data.stunetBanners[0].picUrl)
                }
            })
        }
    }
}

</script>

<style lang="scss">
.myworld {
    .myworld_head {
        height: 200px;
        // background-color: #7FFF8EFF;
        width: 100%;
        .bgImage {
            width: 100%;
            height: 200px;
        }
    }
}
</style>
