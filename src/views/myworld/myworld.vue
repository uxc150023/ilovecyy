<template>
    <div class="myworld">
		<div class="wrap">
			<div class="content-left">
				<div class="myworld_head">
					<img class="bgImage"
						 :src='headImage'>
				</div>
				<app-myworldbanner v-bind:banners="banners"></app-myworldbanner>
			</div>
			<div class="content-right">

			</div>
		</div>
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
	padding-top: 46px;
	.wrap {
		max-width: 1050px;
		margin: 0 auto;
		display: flex;
		background-color: #FAFAFA;
		padding: 9px 14px 0;
	}
	.content-left {
		flex-shrink: 0;
		width: 690px;
		margin-right: 10px;
	}
	.myworld_head {
		height: 200px;
		z-index: 1000;
		.bgImage {
			width: 100%;
			height: 200px;
		}
	}
	.content-right {
		flex: 1 1;
		flex-grow: 1;
		flex-shrink: 1;
		flex-basis: 0%;
		background-color: #fff;
	}
}
</style>
