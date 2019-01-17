<template>
    <div class="setting_dialog">
    	<!-- <el-dialog title="设置" :visible.sync="dialogVisible"  width="1020px" :before-close="handleClose" class="setting_dialog"> -->
            <div class="setting_content" @mousemove='mousemove()' @mouseup='mouseup()'>
                <div id="setting_top" class="setting_top" style="height: 270px;width: 100%;">
                    <img src="https://console.xinxuejie.com.cn/learn/imguplaod/getpic?pictureId=/2018/9/6/8e7f64c09fae4e71af7a5accb7a6dffb.jpg" style="height: 100%;width: 100%;">
                </div>

                <div id="setting_logo" class="setting_logo" @mousedown='mousedownsl()'>
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
                </div>

                <div class="setting_logo_text" id="setting_logo_text">
                    <p class="logo_text" id="logo_text"></p>
                    <img src="../../images/setting/setting_a.png" id="text_compile" class="logo_upload setpng hidden">
                    <img src="../../images/setting/setting_c.png" id="text_stretch" class="logo_stretch setpng hidden">
                    <img src="../../images/setting/setting_e.png" id="text_stretch_a" class="logo_stretch_a setpng hidden">
                    <img src="../../images/setting/setting_f.png" id="text_stretch_b" class="logo_stretch_b setpng hidden">

                    <img src="../../images/setting/setting_d.png" id="text_move" class="logo_move setpng hidden">
                </div>
            </div>
            <p>背景图推荐尺寸1020X370,JPG/GIF/PNG,500K以内<el-button type="text" @click="uploadBg()">浏览/上传</el-button></p>
            
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span> -->
            
        <!-- </el-dialog>  -->

        <!-- <el-dialog title="图片裁剪上传" :visible.sync="cutImgdialog"  width="1020px"  class="setting_dialog">
            <app-cutimgdialog></app-cutimgdialog>
        </el-dialog> -->
        <app-modal :modalInfo='modalInfo'>
            <app-cutimgdialog></app-cutimgdialog>
        </app-modal>
    </div>
</template>

<script>
	import commonAction 		from "@/js/commonAction"
	import {_getUrl, _getData} 	from '@/service/getdata.js'
	import Cutimgdialog 		from '@/components/cutImg/cutimgdialog'
	import Quilleditor 			from '@/components/quilleditor/quilleditor'
	import modal        		from '@/components/modal/modal'
	export default {
		data() {
	        return {
	        	// contentCut: [false],
	        	modalInfo: {
	        		show: false,
	        		title:"上传图片",
	        		modal: false
	        	},
	        	// titileCut: '上传图片',
	        	modal: false,
	        	store: {
	        		bid: '',	//区分栏目标签
	        		stunetId: '',
	        	}
	        }
	    },
	    components: {
	    	'app-cutimgdialog': Cutimgdialog,
	    	'app-modal':        modal
	    },
	    mounted() {
	        this.init()
	    },

	    methods: {	
	    	init(){
	            
	        },
	        /**
	         * 上传头图
	         */
	        uploadBg() {
	            this.modalInfo.show = true;
	        },
	        mousemove() {
	            console.log(123)
	        },
	        
	        mousedownsl() {

	        },
			mousedownlm() {

			},
			/**
			 * 获取信息
			 */
			getInfo() {
				_getData(_getUrl('MEET_MYLIST'), {
	                stunetId: store.stunet_id,
					bid: store.bid,
					type: 1
	            }, res => {
	                this.meetInfo = res.data
	            });
			}
	    }
	}
</script>

<style lang="scss">
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
    }
</style>