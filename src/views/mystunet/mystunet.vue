<template>
    <div class="mystunet">
        <div class="mystunet_head">
            <img class="bgImage"
                 :src='headImage'>
        </div>
        <app-myworldbanner v-bind:banners="banners"></app-myworldbanner>
    </div>
</template>

<script>
import myworldbanner from '@/components/banner/myworldbanner'
export default {
    data () {
        return {
            stunetId: this.$store.state.stunetId,
            banners: {
                type: 'stunet',
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
    created () {
        this.init()
    },

    mounted () {

    },

    components: {
        'app-myworldbanner': myworldbanner
    },

    methods: {
        init () {
            var params = {
                'stunetId': this.stunetId,
                'bid': 1,
                'type': 1
            }
            /* 查询学会信息 */
            this._getData(this._getUrl('STUORGINFO'), params, res => {
                // this.banners.type = 'stunet'
                this.banners.navlist = res.data.stunetMenuConfigs
            })
        }
    }
}
</script>

<style lang="scss">
.mystunet {
    .mystunet_head {
        height: 200px;
        width: 100%;
        .bgImage {
            width: 100%;
            height: 200px;
        }
    }
}
</style>
