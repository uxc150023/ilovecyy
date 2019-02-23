<template>
    <div id="image-read">
        <el-carousel indicator-position='none'
                     ref='carousel'
                     :autoplay=false
                     arrow='never'>
            <el-carousel-item v-for="(ele, index) in tehmatic"
                              :key="index">
                <div v-html="ele"
                     v-if='ele.imgurl'>
                    <img src=encodeURI(ele.imgurl) />
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>
<script>
export default {
    data () {
        return {
            paymoney: '',
            proUserid: '',
            tehmatic: '',
            title: '',
            writer: '',
            height: ''
        }
    },
    computed: {
        // 作品ID
        productionId: {
            get () {
                return this.$store.state.productionId
            }
        }
    },
    mounted () {
        this.getDetails()
        window.onresize = () => {
            this.height = String(Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - 100) + 'px'
        }
    },
    methods: {
        /**
         * 获取作评详情
         */
        getDetails () {
            this._getData(this._getUrl('SPRODITAI'), { production_id: this.productionId }, res => {
                if (res.code === 200) {
                    this.paymoney = res.data.money
                    this.proUserid = res.data.ProUserid
                    this.tehmatic = res.data.Tehmatic ? JSON.parse(res.data.Tehmatic) : []
                    this.title = res.data.title
                    this.writer = res.data.Writer
                    if (this.proUserid === this.$store.state.userid) {
                        /* 是否可以修改 */
                    }
                }
            })
        }
    }
}
</script>
<style lang='scss'>
.top-header {
    display: none;
}
</style>
