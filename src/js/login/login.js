import commonAction from "@/js/commonAction"
import store from '@/vuex/store.js'
import GVerify from './pngcode.js'
import {_getUrl, _getData} from '@/service/getdata.js'

export default {
    data() {
        /**
         * 校验手机号码
         */
        var v_phone = (rule, value, callback) => {
            var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (value === '') {
                callback(new Error('请输入手机号码'));
            } else if (!reg.test(value)) {
                callback(new Error('请输入正确的手机号码'));
            } else {
                callback();
            }
        };
        /**
         * 校验输入的密码
         */
        var v_pass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
        };
        return {
            activeName: 'ruleFormPer',
            form: '',
            showpngcode: false, //显示图形验证码
            imgcode: '',        //图形验证码
            img_vaild: 'FALSE', //是否是图形验证码登陆
            ruleFormPer: {
                phoneNum: '',   //手机号码
                pass: '',
            },
            ruleFormOrg: {
                name: '',
                pass: '',
            },
            loginType: 'ruleFormPer',   //登陆类型
            verifyCode: '',
            rules_per: {
                phoneNum: [
                    { required: true, validator: v_phone, trigger: 'blur' }
                ],
                pass: [
                    { required: true, validator: v_pass, trigger: 'blur' }
                ]
            },
            rules_org: {
                name: [
                    { required: true,  message: '请输入用户名', trigger: 'blur' }
                ],
                pass: [
                    { required: true,  message: '请输入密码', trigger: 'blur' }
                ]
            }
        };
    },
    mounted() {

    },

    created() {
        this.keyupSubmit();
    },

    methods: {
        submitForm() {
            this.$refs[this.loginType].validate((valid) => {
                if (valid) {
                    if(this.loginType === 'ruleFormPer'){
                        this.login('per', this.ruleFormPer.phoneNum, this.ruleFormPer.pass);
                    }else{
                        this.login('org', this.ruleFormOrg.name, this.ruleFormOrg.pass);
                    }
                    
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        /**
         * @return {tab点击}
         */
        handleClick(tab, even) {
            this.loginType = tab.name;
            console.log(tab.name);
        },
        /**
         * 绑定enter事件
         */
        keyupSubmit(){
            document.onkeydown = e=> {
                let _key=window.event.keyCode;
                if(_key===13){
                    this.submitForm('ruleFormPer');
                }
            }
        },

        /**
         * 登陆
         */
        login(type, logname, pass) {
            if(this.showpngcode === false){
                this.img_vaild = 'FALSE'
            }
            let params = {
                "simis_valid": "FALSE",
                "logname": logname,
                "code": '',
                "password": pass,
                // "img_vaildcod": this.imgcode,
                'user_type': type,
                'img_vaild': this.img_vaild
            }
            _getData(_getUrl('USERLOGING'),params, res =>{
                if (res.code === 200) {
                    this.$message({
                        message: '登陆成功',
                        type: 'success'
                    });
                    store.commit('SET_TUSERID', res.data.userid);
                    store.commit('SET_LOGINSTATUS', 'TRUE');
                    store.commit('SET_USERTYPE', type);
                    store.commit('SET_PHONE', res.data.phone);
                    store.commit('SET_USERNAME', res.data.username);

                    this.storeSession(res);
                    let paramsa = {
                        userid: res.data.userid
                    }
                    /*判断用户是否存在未完成订单*/
                    _getData(_getUrl('ISLIVORDERS'), paramsa, res => {
                        commonAction.setStorage('webinfo', {
                            stunet_name: res.data.stunet_name,
                            stunet_url: res.data.stunet_url,
                            stunet_id: res.data.stunet_id,
                            userid: res.data.userId
                        });
                        if(type === 'per'){
                            this.$router.push({ name: 'Myworld' })
                        }else{
                            this.$router.push({ name: 'Mystunet' })
                        }
                        
                    })
                } else if (res.code === 315) { //登陆频繁
                    this.showpngcode = true
                } else if (res.code === 316) { //异地登陆
                    
                }else {
                    this.$message({
                        message: res.message,
                        type: 'warning'
                    });
                }
            })
        },

        /**
         * 登陆频繁弹出图形验证码
         */
        showimgcode() {
            this.verifyCode = new GVerify("v_container")
            this.img_vaild = 'TRUE';
            console.log(this.verifyCode)
        },

        //提交图形验证码，后端判断
        chechImgcode () {
            var res = this.verifyCode.validate(this.imgcode);
            if (res) {
                this.login('per');
            } else {
                this.$message.error('图形验证码输入错误');
                return;
            }
        },

        /**
         * 图形验证码切换时间
         */
        changeImg () {
            var imgSrc = $("#imgObj");
            var src = imgSrc.attr("src");
            imgSrc.attr("src", this.changeUrl(src));
        },

        /**
         * 为了使每次生成图片不一致，即不让浏览器读缓存，所以需要加上时间戳
         */
        changeUrl (url) {
            var timestamp = (new Date()).valueOf();
            var index = url.indexOf("?", url);
            if (index > 0) {
                url = url.substring(index, url.indexOf(url, "?"));
            }
            var logname = $("#tel_per").val();
            if (tabVal == 1) {
                user_type = 'org';
                logname = $("#username_org").val();
            }

            if ((url.indexOf("&") >= 0)) {
                url = url + "&timestamp=" + timestamp + '&logname=' + logname;
            }
            else {
                url = url + "?timestamp=" + timestamp + '&logname=' + logname;
            }
            return url;
        },

        /**
         * 存储登录信息
         */
        storeSession (res) {
            commonAction.setStorage("loginStatus", "TRUE");     //存储登录状态
            commonAction.setStorage("username", res.data.username);     //存储用户名，个人是手机号，公司是机构名
            commonAction.setStorage("userid",  res.data.userid);     //存储userid
            commonAction.setStorage("new_stuname",  res.data.new_stuname);     //存储userid
            commonAction.setStorage("isAdmin",  res.data.admin);     //存储状态
        },
        /**
         * 抹除登录信息
         */
        removeSession () {
            sessionStorage.clear();
        },

        /**
         * 重置密码
         */
        resetPass() {
            this.$router.push({ name: 'ResetPass' })
        },
    }
}
