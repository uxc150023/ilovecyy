<template>
    <div id="nemMeeting">
        <div class="banner">
            <img src="../../assets/noticebg.jpg" alt="会议题图" id="bannerShowImg" class="bannerShowImg">
            <p class="meetname" id="meetname">{{meetname}}</p>
            <el-upload
                class="upload"
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple
                :limit="1"
                :on-exceed="handleExceed">
                <el-button size="small" class="uploadBtn">浏览/上传</el-button>
            </el-upload>
        </div>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="会议名称">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="会议性质">
                <el-select v-model="form.region" placeholder="请选择会议性质">
                    <el-option label="学术会议" value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="会议时间">
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                    <el-date-picker type="date" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="会议地点">
                <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="参会嘉宾">
                <el-input v-model="form.guest"></el-input>
            </el-form-item>
            <el-form-item label="会议费用">
                <el-select v-model="form.fee">
                    <el-option label="免参会费" value="0"></el-option>
                    <el-option label="免参会费并免餐费" value="1"></el-option>
                    <el-option label="免参会费与食宿费" value="2"></el-option>
                    <el-option label="免参会费、食宿费，报销往来交通费" value="3"></el-option>
                    <el-option label="会议注册费" value="4"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="会议注册费">
                <el-input v-model="form.registeredFee"></el-input>
            </el-form-item>
            <el-form-item label="会议人数">
                <el-input v-model="form.meetScale"></el-input>
            </el-form-item>
            <el-form-item label="其他问题">
                <el-input v-model="form.otherQ"></el-input>
            </el-form-item>
            <el-form-item label="会议学科">
                <el-row>
                    <el-col :span="6">
                        <el-select v-model="form.firstSub">
                            <el-option label="免参会费" value="0"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="6">
                        <el-select v-model="form.secondSub">
                            <el-option label="免参会费" value="0"></el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="12">
                        <el-select v-model="form.thirdSub">
                            <el-option label="免参会费" value="0"></el-option>
                        </el-select>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="会议网址">
                <el-input v-model="form.website"></el-input>
            </el-form-item>
            <el-form-item label="配乐选择">
                <el-select v-model="form.music">
                    <el-option label="配乐" value="0"></el-option>
                    <el-option label="不配乐" value="1"></el-option>
                </el-select>
            </el-form-item>
            <div class="musicName">文件名</div>
            <el-form-item v-for="(ele, index) in form.host" :label="'主办者' + index" :key="ele.key" :prop="'host.' + index + '.value'">
                <el-input v-model="ele.value"></el-input><el-button @click.prevent="removeHost(ele)">删除</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="addHost">新增</el-button>
            </el-form-item>
            <el-form-item>
                <el-button @click="preview">预览</el-button>
                <el-button type="primary" @click="onSubmit">确定</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                meetname: '会议题目',
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    address: '',
                    guest: '',
                    fee: '',
                    registeredFee: '',
                    meetScale: '',
                    otherQ: '',
                    firstSub: '',
                    secondSub: '',
                    thirdSub: '',
                    website: '',
                    host: [{
                        value: ''
                    }],
                }
            }
        },
        methods: {
            handleExceed(files, fileList) {
                this.$message.warning('11');
            },
            removeHost(item) {
                var index = this.form.host.indexOf(item)
                if (index !== -1) {
                    this.form.host.splice(index, 1)
                }
            },
            addHost() {
                this.form.host.push({
                    value: '',
                    key: Date.now()
                });
            },
            preview() {
                console.log("yulan")
            },
            onSubmit() {
                console.log('submit!');
            },
        }
    }
</script>

<style lang="scss">
    #nemMeeting {
        .banner {
            width: 860px;
            height: 250px;
            margin-bottom: 20px;
            position: relative;
            .bannerShowImg {
                width: 860px;
                height: 250px;
            }
            .meetname {
                font-size:36px;
                font-family:PingFangSC-Regular;
                font-weight:400;
                color: #333;
                position: absolute;
                left: 50%;
                top: 50%;
                transform: translate(-50%,-50%);
            }
            .upload {
                position: absolute;
                right: 30px;
                bottom: 20px;
                .uploadBtn {
                    width: 120px;
                    height: 36px;
                    background: #AAA;
                    border-radius: 6px;
                    color: #fff;
                    font-size: 14px;
                    border-color: #aaa;
                }
            }
        }
        .el-select {
            display: block;
        }
    }
</style>
