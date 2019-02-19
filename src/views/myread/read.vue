<template>
    <div id="read">
        <div class="read-content">
            <div class="read-content-a"
                 :style="{background: 'url('+bgimg+') no-repeat 100% 100%' }">
                <el-carousel indicator-position='none'
                             :height=height
                             :loop=false
                             ref='carousel'
                             :autoplay=false
                             arrow='never'>
                    <el-carousel-item v-for="(ele, index) in mainList"
                                      :key="index">
                        <div v-html="ele"
                             :style="{fontSize: fontsize, lineHeight: lineheight}"></div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div class="j-md-ctrl">
                <i class="el-icon-arrow-left"
                   @click='handleClick(0)'></i>
                <p></p>
                <i class="el-icon-arrow-right"
                   @click='handleClick(1)'></i>
                <p></p>
                <i class="el-icon-message"
                   @click='handleClick(2)'></i>
                <p></p>
                <i class="el-icon-date"
                   @click='handleClick(3)'></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            npage: 1, // 当前章节所处的页数
            pageCount: 0, // 当前章节总页数
            proreadId: '', // 章节id
            minprid: '', // 最小章节
            maxprid: '', // 最大章节
            proId: '1662', // 作评id
            mainList: [], // 章节内容
            paymoney: '', // 付费
            proUserid: '', // 作者
            quillkey: '', // 彩笺
            bgimg: '', // 背景图片
            height: String(Math.max(document.body.scrollHeight, document.documentElement.scrollHeight) - 100) + 'px', // 文档高
            fontsize: '16px', // 默认字体大小
            lineheight: '1.75', // 默认
            firstbg: '', // 作品说明 bg
            title: '', // 作评名称
            intro: '', //
            writer: '' // 作者
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
         * 加载页面
         * page_i 页数
         */
        loadPage (page_i) {
            if (page_i === 0) {

            } else {

            }
        },
        /**
         * 功能按钮
         */
        handleClick (key) {
            switch (key) {
                case 0: /* 前一页 */

                    if (this.npage > 2) {
                        this.npage--
                        this.$refs.carousel.setActiveItem(this.npage)
                    } else {
                        if (this.minprid === this.proreadId) { /* 第一章 */
                            this._common.showMsg('已经是第一页')
                        } else {
                            this.proreadId--
                            this.getMain(0)
                        }
                    }
                    break
                case 1: /* 后一页 */
                    console.log(this.npage, this.pageCount)
                    /* 第一章 */
                    if (this.proreadId === this.minprid) {
                        if (this.npage < this.pageCount - 1) {
                            this.npage++
                            this.$refs.carousel.setActiveItem(this.npage)
                            return false
                        }
                    }

                    /* 不是第一章 */
                    if (this.npage < this.pageCount - 1 && this.proreadId !== this.minprid) {
                        this.npage++
                        this.$refs.carousel.setActiveItem(this.npage)
                        return false
                    }

                    if (this.maxprid === this.proreadId) { /* 第一章 */
                        this._common.showMsg('已经是最后一页')
                    } else {
                        this.npage = 1
                        this.proreadId++
                        this.getMain(1)
                    }

                    break
                case 2: /* 评论 */

                    break
                case 3: /*  */

                    break
                case 4: /* 前一页 */
                    alert(1)
                    break
                case 5: /* 后一页 */
                    alert(2)
                    break
                default:
                    break
            }
        },
        /**
         * 获取章节内容 页面跳转
         * type 1后 0前
         */
        getMain (type) {
            let params = {
                production_id: this.proId,
                pro_readID: this.proreadId,
                page: -1, // 取章节所有页面内容
                userid: this.$store.state.userid
            }
            this._getData(this._getUrl('SPMREADAI'), params, res => {
                if (res.code === 200) {
                    this.pageCount = res.data.pageCount // 获取 此章多少页
                    this.mainList = []
                    /* 若是第一章 插入作品说明 */
                    if (this.proreadId === this.minprid) {
                        let html = '<div id="page-first">'
                        html += '<div class="read-theme-photo" style="background: ' + this.firstbg + ' no-repeat 100% 100%">'
                        html += '<p>' + this.title + '</p>'
                        html += '<div class="read-writer-name pull-right">'
                        html += '<span>' + this.writer + '</span>'
                        html += '<span></span>'
                        html += '</div>'
                        html += '</div>'
                        html += '<div class="read-citation">'
                        html += '<p class="rcitation">' + this.intro + '</p>'
                        html += '</div>'
                        html += '<div class="read-keywords">'
                        html += '<p class="rkeywords"></p>'
                        html += '</div>'
                        html += '</div>'
                        this.mainList.push(html)
                        this.pageCount++
                    }
                    res.data.Pro_Content.forEach(element => {
                        this.mainList.push(element)
                    })
                    if (type === 0) {
                        this.npage = this.pageCount
                        setTimeout(() => {
                            this.$refs.carousel.setActiveItem(this.npage - 1)
                        }, 100)
                    } else {
                        this.$refs.carousel.setActiveItem(0)
                        this.npage = 1
                    }
                }
            })
        },
        /**
         * 获取作品详情
         */
        getDetails () {
            this._getData(this._getUrl('SPRODITAI'), { production_id: this.proId }, res => {
                if (res.code === 200) {
                    this.minprid = res.data.ReadIDs[0].pro_readID
                    this.maxprid = res.data.ReadIDs[res.data.ReadIDs.length - 1].pro_readID
                    this.proreadId = this.minprid
                    this.paymoney = res.data.money
                    this.proUserid = res.data.ProUserid
                    let tehmatic = res.data.Tehmatic ? JSON.parse(res.data.Tehmatic) : []
                    this.firstbg = tehmatic.length > 0 ? 'url(' + this._getUrl('IMGURL') + encodeURI(encodeURI(tehmatic[0])) + ')' : 'url(' + require('../../images/noticebg.jpg') + ')'
                    this.title = res.data.title
                    this.intro = res.data.intro
                    this.writer = res.data.Writer
                    if (this.proUserid === this.$store.state.userid) {
                        /* 是否可以修改 */
                    }
                    this.getMain(1)
                    /* 彩笺 */
                    if (res.data.quillKey !== '') {
                        this.quillkey = (JSON.parse(res.data.quillKey)).quillKey
                        if (this.quillkey !== 'wu') {
                            this.bgimg = require('../../images/texture/' + this.quillkey + '.png')
                            // $('#read-read-artcle').css({
                            //     'background-image': 'url("../../../images/texture/' + quillkey + '.png")',
                            //     'background-size': '100% 100%',
                            //     'background-repeat': 'no-repeat'
                            // }).attr({
                            //     'data-key': quillkey
                            // });
                        }
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
#read {
    // background: #3d3e45;
    .read-content-a {
        width: 667px;
        margin: auto;
        text-align: left;
        background: #3d3e45;
        .el-carousel {
            height: 100%;
            padding: 30px;
            background-color: #fbfaf8;
            .el-carousel__container {
                height: 100%;
                .read-theme-photo {
                    margin-top: 30px;
                    margin-bottom: 20px;
                    width: 100%;
                    height: 172px;
                    overflow: hidden;
                    text-align: center;
                    line-height: 172px;
                    background-repeat: no-repeat;
                    background-size: 100%;
                    position: relative;
                    p {
                        font-size: 24px;
                        font-weight: 400;
                        color: #333;
                        line-height: 172px;
                    }
                    .read-writer-name {
                        overflow: hidden;
                        position: absolute;
                        bottom: 2px;
                        right: 10px;
                        font-size: 14px;
                        font-weight: 400;
                        color: #333;
                        line-height: 28px;
                        margin-top: 8px;
                    }
                }
                .read-citation {
                    background: #ebe8de;
                }
                .is-active {
                    overflow-y: scroll;
                }
                .is-active::-webkit-scrollbar {
                    /*滚动条整体样式*/
                    width: 4px; /*高宽分别对应横竖滚动条的尺寸*/
                    height: 4px;
                }
            }
        }
        // .el-carousel__item:nth-child(2n) {
        //     background-color: #99a9bf;
        // }

        // .el-carousel__item:nth-child(2n + 1) {
        //     background-color: #d3dce6;
        // }
    }
    .j-md-ctrl {
        position: fixed;
        top: 50%;
        left: 50%;
        width: 40px;
        height: 316px;
        margin: -158px 0 0 354px;
        border: 1px solid #505157;
        i {
            font-size: 40px;
            margin-bottom: 30px;
        }
    }
}
</style>
