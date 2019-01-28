<template>
    <div class="wrapper" id="cutimg">
        <div class="model" v-show="model">
            <div class="model-show" @click="model = false">
                <img :src="modelSrc" alt="" @click="model = false">
			</div>
            </div>
            <div class="content">
                <div class="show-info">
                    <el-row :gutter="20">
                        <el-col :span="16">
                            <div class="test test1">
                                <vueCropper ref="cropper" :img="option.img" :outputSize="option.size" :outputType="option.outputType" :info="true" :full="option.full" :canMove="option.canMove" :canMoveBox="option.canMoveBox" :fixedBox="option.fixedBox" :original="option.original" :autoCrop="option.autoCrop" :autoCropWidth="option.autoCropWidth" :autoCropHeight="option.autoCropHeight" :centerBox="option.centerBox" :high="option.high" :infoTrue="option.infoTrue" @realTime="realTime" @imgLoad="imgLoad" @cropMoving="cropMoving" :enlarge="option.enlarge" :mode="option.mode"></vueCropper>
                            </div>
                        </el-col>
                        <el-col :span="8">
                            <section class="pre-item">
                                <p>预览：</p>
                                <div class="show-preview" :style="{'width': previews.w + 'px', 'height': previews.h + 'px',  'overflow': 'hidden',
                                'margin': '5px'}">
                                    <div :style="previews.div">
                                        <img :src="previews.url" :style="previews.img">
                                    </div>
                                </div>
                            </section>
                        </el-col>
                    </el-row>

                    <div class="test-button">
                        <label class="btn" for="uploads">浏览/上传</label>
                        <input type="file" id="uploads" style="position:absolute; clip:rect(0 0 0 0);" accept="image/png, image/jpeg, image/gif, image/jpg" @change="uploadImg($event, 1)">
                        <button @click="refreshCrop" class="btn">refresh</button>
                        <button @click="changeScale(1)" class="btn">+</button>
                        <button @click="changeScale(-1)" class="btn">-</button>
                        <button @click="rotateLeft" class="btn">rotateLeft</button>
                        <button @click="rotateRight" class="btn">rotateRight</button>
                        <!-- <a @click="down('base64')" class="btn">download(base64)</a> -->
                        <!-- <a @click="down('blob')" class="btn">download(blob)</a> -->
                        <a :href="downImg" download="demo.png" ref="downloadDom"></a>

                        <button @click="commitImg()" class="btn">提交</button>
                    </div>
                </div>
            </div>
        </div>
</template>
<script>
import VueCropper from "./vue-cropper/vue-cropper";
import store from '@/vuex/store.js'
import {_getUrl, _getData} from '@/service/getdata.js'

import codes from "./code";

export default {
    data: function() {
        return {
            model: false,
            modelSrc: "",
            crap: false,
            previews: {},
            option: {
                img: "",
                size: 1,
                full: false,
                outputType: "png",
                canMove: true,
                fixedBox: false,
                original: false,
                canMoveBox: true,
                autoCrop: true,
                // 只有自动截图开启 宽度高度才生效
                autoCropWidth: 200,
                autoCropHeight: 150,
                centerBox: false,
                high: true,
                cropData: {},
                enlarge: 1,
                mode: 'contain'
            },
            downImg: "#",
            previewStyle1: {},
            previewStyle2: {},
            code2: '',
            code3: '',
            preview3: '',
        };
    },
    methods: {
        refreshCrop() {
            // clear
            this.$refs.cropper.refresh();
        },
        changeScale(num) {
            num = num || 1;
            this.$refs.cropper.changeScale(num);
        },
        rotateLeft() {
            this.$refs.cropper.rotateLeft();
        },
        rotateRight() {
            this.$refs.cropper.rotateRight();
        },
        finish(type) {
            // 输出
            // var test = window.open('about:blank')
            // test.document.body.innerHTML = '图片生成中..'
            if (type === "blob") {
                this.$refs.cropper.getCropBlob(data => {
                    var img = window.URL.createObjectURL(data);
                    this.model = true;
                    this.modelSrc = img;
                    console.log(this.modelSrc)
                });
            } else {
                this.$refs.cropper.getCropData(data => {
                    this.model = true;
                    this.modelSrc = data;
                });
            }
        },
        /**
         * 实时预览
         */
        realTime(data) {
            var previews = data;
            var h = 0.5;
            var w = 0.2;

            this.previewStyle1 = {
                width: previews.w + "px",
                height: previews.h + "px",
                overflow: "hidden",
                margin: "0",
                zoom: h
            };

            this.previewStyle2 = {
                width: previews.w + "px",
                height: previews.h + "px",
                overflow: "hidden",
                margin: "0",
                zoom: w
            };
            this.previews = data;
        },
        /**
         * 下载
         */
        down(type) {
            // event.preventDefault()
            // 输出
            if (type === "blob") {
                this.$refs.cropper.getCropBlob(data => {
                    this.downImg = window.URL.createObjectURL(data);
                    if (window.navigator.msSaveBlob) {
                        var blobObject = new Blob([data]);
                        window.navigator.msSaveBlob(blobObject, "demo.png");
                    } else {
                        this.$nextTick(() => {
                            this.$refs.downloadDom.click();
                        });
                    }
                });
            } else {
                this.$refs.cropper.getCropData(data => {
                    this.downImg = data;
                    if (window.navigator.msSaveBlob) {
                        var blobObject = new Blob([data]);
                        window.navigator.msSaveBlob(blobObject, "demo.png");
                    } else {
                        this.$nextTick(() => {
                            this.$refs.downloadDom.click();
                        });
                    }
                });
            }
        },

        uploadImg(e, num) {
            //上传图片
            // this.option.img
            var file = e.target.files[0];
            if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
                alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
                return false;
            }
            var reader = new FileReader();
            reader.onload = e => {
                let data;
                if (typeof e.target.result === "object") {
                    // 把Array Buffer转化为blob 如果是base64不需要
                    data = window.URL.createObjectURL(new Blob([e.target.result]));
                } else {
                    data = e.target.result;
                }
                if (num === 1) {
                    this.option.img = data;
                } else if (num === 2) {
                    this.example2.img = data;
                }
            };
            // 转化为base64
            // reader.readAsDataURL(file)
            // 转化为blob
            reader.readAsArrayBuffer(file);
        },
        imgLoad(msg) {
            console.log(msg);
        },

        cropMoving(data) {
            this.option.cropData = data;
        },
        /**
         * 提交图片
         */
        commitImg() {
            this.$refs.cropper.getCropData(data => {
                /*将base64 图片转换为路径png*/
                console.log(data)
                var params = {
                    base64Str: data.replace("data:image/png;base64,","")
                };
                _getData(_getUrl('CUTIMG'), params, res => {
                    this.option.img = ''
                    // store.commit('SET_CUTIMG', JSON.parse(res).data.data)
                    this.$emit('getCutimg', JSON.parse(res).data.data);
                })
            });
        }
    },
    components: {
        VueCropper,
        codes
    }
};
</script>
<style lang="scss">
    #cutimg {
    * {
        margin: 0;
        padding: 0;
    }
    .content {
        margin: auto;
        max-width: 1200px;
        margin-bottom: 100px;
    }

    .test-button {
        display: flex;
        flex-wrap: wrap;
    }

    .btn {
        display: inline-block;
        line-height: 1;
        white-space: nowrap;
        cursor: pointer;
        background: #fff;
        border: 1px solid #c0ccda;
        color: #1f2d3d;
        text-align: center;
        box-sizing: border-box;
        outline: none;
        margin: 20px 10px 0px 0px;
        padding: 9px 15px;
        font-size: 14px;
        border-radius: 4px;
        color: #fff;
        background-color: #50bfff;
        border-color: #50bfff;
        transition: all 0.2s ease;
        text-decoration: none;
        user-select: none;
    }

    .des {
        line-height: 30px;
    }

    code.language-html {
        padding: 10px 20px;
        margin: 10px 0px;
        display: block;
        background-color: #333;
        color: #fff;
        overflow-x: auto;
        font-family: Consolas, Monaco, Droid, Sans, Mono, Source, Code, Pro, Menlo,
        Lucida, Sans, Type, Writer, Ubuntu, Mono;
        border-radius: 5px;
        white-space: pre;
    }

    .show-info {
        margin-bottom: 50px;
    }

    .show-info h2 {
        line-height: 50px;
    }

    /*.title, .title:hover, .title-focus, .title:visited {
            color: black;
        }*/

    .title {
        display: block;
        text-decoration: none;
        text-align: center;
        line-height: 1.5;
        margin: 20px 0px;
        background-image: -webkit-linear-gradient(left,
        #3498db,
        #f47920 10%,
        #d71345 20%,
        #f7acbc 30%,
        #ffd400 40%,
        #3498db 50%,
        #f47920 60%,
        #d71345 70%,
        #f7acbc 80%,
        #ffd400 90%,
        #3498db);
        color: transparent;
        -webkit-background-clip: text;
        background-size: 200% 100%;
        animation: slide 5s infinite linear;
        font-size: 40px;
    }

    .test {
        height: 500px;
    }

    .model {
        position: fixed;
        z-index: 10;
        width: 100vw;
        height: 100vh;
        overflow: auto;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.8);
    }

    .model-show {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
        text-align: center;
    }

    .model img {
        display: block;
        margin: auto;
        max-width: 80%;
        width: auto;
        user-select: none;
        background-position: 0px 0px, 10px 10px;
        background-size: 20px 20px;
        background-image: linear-gradient(45deg,
        #eee 25%,
        transparent 25%,
        transparent 75%,
        #eee 75%,
        #eee 100%),
        linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);
    }

    .c-item {
        display: block;
        padding: 10px 0;
        user-select: none;
    }

    .pre {
        display: flex;
    }

    .pre-item {
        padding-right: 20px;
    }

    @keyframes slide {
        0% {
            background-position: 0 0;
        }

        100% {
            background-position: -100% 0;
        }
    }

    @media screen and (max-width: 1000px) {
        .content {
            max-width: 90%;
            margin: auto;
        }

        .test {
            height: 400px;
        }
    }
}


</style>
