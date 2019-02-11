<template>
    <div class="setting_dialog">
    	<el-form ref="form" :model="form" label-width="80px">
            <div class="setting_content" @mousemove='mousemove()' @mouseup='mouseup()'>
                <div id="setting_top" class="setting_top" style="height: 270px;width: 100%;">
                    <img :src=bgimg style="height: 100%;width: 100%;">
                </div>

                <!-- <div id="setting_logo" class="setting_logo" @mousedown='mousedownsl()'>
                    <img id="logoimg" class="logoimg" src="https://console.xinxuejie.com.cn/learn/imguplaod/getpic?pictureId=/2018/8/24/f28bc40759e647beabf87ca0c7dc8b2e.png">
                    <img id="logo_stretch" class="logo_stretch setpng hidden"     src="../../images/setting/setting_c.png">
                    <img id="logo_stretch_a" class="logo_stretch_a setpng hidden" src="../../images/setting/setting_e.png">
                    <img id="logo_stretch_b" class="logo_stretch_b setpng hidden" src="../../images/setting/setting_e.png">

                    <div class="fileuploadl">
                        <div class="fileupload_text">
                            <img src="../../images/setting/setting_b.png" id="" class="logo_upload setpng hidden">
                        </div>
                    </div>
                    <img src="../../images/setting/setting_d.png" id="logo_move" class="logo_move setpng hidden" @mousedown='mousedownlm()'>
                </div> -->

                <!-- <div class="setting_logo_text" id="setting_logo_text">
                    <p class="logo_text" id="logo_text"></p>
                    <img src="../../images/setting/setting_a.png" id="text_compile" class="logo_upload setpng hidden">
                    <img src="../../images/setting/setting_c.png" id="text_stretch" class="logo_stretch setpng hidden">
                    <img src="../../images/setting/setting_e.png" id="text_stretch_a" class="logo_stretch_a setpng hidden">
                    <img src="../../images/setting/setting_f.png" id="text_stretch_b" class="logo_stretch_b setpng hidden">

                    <img src="../../images/setting/setting_d.png" id="text_move" class="logo_move setpng hidden">
                </div> -->
            </div>
            <p class="text-right">背景图推荐尺寸1020X370,JPG/GIF/PNG,500K以内<el-button type="text" @click="uploadBg()">浏览/上传</el-button></p>

            <div class="setting_a">
                <p>栏目编辑</p>
                <el-row>
                    <el-col :span="4" v-for='(elem, index) in navlist' :key='index'>
                        <el-checkbox v-if='elem.isDelete != 1 && elem.isVisible === 1' v-model='checked'>{{elem.name}}</el-checkbox>
                        <el-checkbox v-if='elem.isDelete != 1 && elem.isVisible === 0' >{{elem.name}}</el-checkbox>
                    </el-col>
                </el-row>
            </div>
            <div class="setting_b">
                <p>栏目头图编辑</p>
                <el-row>
                    <el-col :span="3" v-for='(elem, index) in navlist' :key='index'>
                        <el-button v-if='elem.isDelete != 1' type="text">{{elem.name}}</el-button>
                    </el-col>
                </el-row>
            </div>
            <el-form-item class="btnBox">
                <el-button type="primary" @click="onSubmit">确&emsp;&emsp;定</el-button>
            </el-form-item>
        </el-form>
        <app-modal :modalInfo='modalInfo'>
            <app-cutimgdialog v-on:getCutimg='getCutimg'></app-cutimgdialog>
        </app-modal>
    </div>
</template>

<script>
	import commonAction 		from "@/js/commonAction"
	import {_getUrl, _getData} 	from '@/service/getdata.js'
	import Cutimgdialog 		from '@/components/cutImg/cutimgdialog'
	import Quilleditor 			from '@/components/quilleditor/quilleditor'
	import modal        		from '@/components/modal/modal'
	import store from '@/vuex/store.js'
	export default {
		data() {
	        return {
	        	modalInfo: {
	        		show: false,
	        		title:"上传图片",
	        		modal: false
	        	},
        		bid: '',	//区分栏目标签
        		stunetId: '',
	        	bgimg: _getUrl('IMGURL') + '/2018/9/6/8e7f64c09fae4e71af7a5accb7a6dffb.jpg',
                navlist: '',
                form: {},
                checked: true,
	        }
	    },
	    components: {
	    	'app-cutimgdialog': Cutimgdialog,
	    	'app-modal':        modal
	    },
	    mounted() {
	        this.getInfo()
	    },

	    methods: {
            /**
             * 提交
             */
            onSubmit() {
                _getData(_getUrl('SAVEMENU'), {configs: this.navlist}, res => {
                    if(res.code === 200){
                        commonAction.showMsg('设置成功', function(){
                            this.$emit('closeModal')
                        })
                        // this.$message({
                        //     message: '设置成功',
                        //     type: 'success',
                        //     onClose: function(){
                        //         alert(1)
                        //     }
                        // })
                        // setTimeout(function(){
                        //     this.$emit('closeModal');
                        // })
                    }
                })
            },
	        /**
	         * 上传头图
	         */
	        uploadBg() {
	            this.modalInfo.show = true;
	        },
	        mousemove() {
	            
	        },
	        
	        mousedownsl() {

	        },
			mousedownlm() {

			},
			/**
			 * 获取信息
			 */
			getInfo() {
                /*查询信息*/
                var params = {
                    "stunetId": store.state.stunetId,
                    "bid": store.state.bid,
                    "type": 1
                }
                _getData(_getUrl('STUORGINFO'), params, res => {
                    // console.log('---', this)
                    // this.banners.type = 'myworld';
                    this.navlist = res.data.stunetMenuConfigs
                })
			},
			getCutimg(data) {
                console.log(data)
				this.modalInfo.show = false
                this.bgimg = _getUrl('IMGURL') + encodeURI(encodeURI(data.data)); 
			},
	    }
	}
</script>

<style lang="scss">
    @import '../../style/theme-base';
	.setting_dialog {
        .el-dialog__header {
            text-align: left;
        }
        .setting_top .bg-img {
            width: 100%;
            height: 100%;
            overflow: hidden;
            z-index: 0;
        }
        .setting_content {
            .setting_top {
                height: 0px;
                background-color: #fafafa;
                border: 1px dashed #999;
                overflow: hidden;
                position: relative;
            }
            .setting_logo {
                min-width: 50px;
                position: absolute;
                top: 50px;
                left: 306px;
                border: 1px dashed #999;
                text-align: center;
                display: table;
                width: 140px;
                height: 140px;
                .logoimg {
                    width: 100%;
                    height: 100%;
                }
                .logo_stretch {
                    width: 24px;
                    height: 24px;
                    overflow: hidden;
                    cursor: se-resize;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                }
                .logo_stretch_a {
                    width: 24px;
                    height: 24px;
                    overflow: hidden;
                    cursor: s-resize;
                    position: absolute;
                    margin-left: -12px;
                    bottom: 0;
                    left: 50%;
                    margin-bottom: -12px;
                }
                .logo_stretch_b {
                    width: 24px;
                    height: 24px;
                    overflow: hidden;
                    cursor: e-resize;
                    position: absolute;
                    bottom: 50%;
                    margin-bottom: -12px;
                    right: 0;
                    margin-right: -12px;
                }
            }
            .setting_logo_text {
                min-width: 50px;
                position: absolute;
                top: 50px;
                left: 506px;
                border: 1px dashed #999;
                text-align: center;
                display: table;
                width: 140px;
                height: 140px;
                .logoimg {
                    width: 100%;
                    height: 100%;
                }
                .logo_stretch {
                    width: 24px;
                    height: 24px;
                    overflow: hidden;
                    cursor: se-resize;
                    position: absolute;
                    right: 0;
                    bottom: 0;
                }
                .logo_stretch_a {
                    width: 24px;
                    height: 24px;
                    overflow: hidden;
                    cursor: s-resize;
                    position: absolute;
                    margin-left: -12px;
                    bottom: 0;
                    left: 50%;
                    margin-bottom: -12px;
                }
                .logo_stretch_b {
                    width: 24px;
                    height: 24px;
                    overflow: hidden;
                    cursor: e-resize;
                    position: absolute;
                    bottom: 50%;
                    margin-bottom: -12px;
                    right: 0;
                    margin-right: -12px;
                }
            }
        }
        .setting_a {
            text-align: left;
            .el-row {
                padding: 10px 30px;
            }
        }
        .setting_b {
            text-align: left;
            .el-row {
                padding: 10px 30px;
            }
        }
    }
</style>