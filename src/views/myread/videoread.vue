<template>
    <div id='video-read'>
        <div class="content">
            <video controls="controls"
                   :style='{height: height}'
                   ref='video'>
                <source :src='productionUrl'>
                </source>
            </video>
            <p class="title"
               :style="{width: width}">名称：{{title}}</p>
            <p class="writer"
               :style="{width: width}">作者：{{writer}}</p>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            productionUrl: '', // 作品播放连接
            height: String(Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - 100) + 'px', // 文档高
            writer: '', // 作者
            title: '', // 作品名称
            width: ''
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
            this.width = this.$refs.video.offsetWidth + `px`
        }
        this.width = this.$refs.video.offsetWidth + `px`
    },
    methods: {
        /**
         * 获取作品详情
         */
        getDetails () {
            this._getData(this._getUrl('SPRODITAI'), { production_id: this.productionId }, res => {
                if (res.code === 200) {
                    this.writer = res.data.Writer
                    this.title = res.data.title
                    this.productionUrl = res.data.productionUrl
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
#video-read {
    .title {
        text-align: left;
        margin: auto;
    }
    .writer {
        text-align: right;
        margin: auto;
        margin-top: -16px;
    }
}
</style>

