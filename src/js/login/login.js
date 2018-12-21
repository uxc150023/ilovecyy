import commonAction from "@/js/commonAction"
import store from '@/vuex/store.js'
import {currentprice, userLoging} from '@/service/getdata.js'
import headTop from '@/components/header/head'

export default {
    data() {
        /**
         * 校验手机号码
         */
        var validatePhoneNum = (rule, value, callback) => {
            var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if(value === ''){
                callback(new Error('请输入手机号码'));
            }else if(!reg.test(value)){
                callback(new Error('请输入正确的手机号码'));
            }else {
                callback();
            }
        };
        /**
         * 校验输入的密码
         */
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
        };
        return {
            activeName: 'login_per',
            form: '',
            ruleFormPer: {
                phoneNum: '', //手机号码
                pass: '',
            },
            ruleFormOrg: {
                name: '',
                pass: '',
            },
            rules: {
                phoneNum: [
                    { validator: validatePhoneNum, trigger: 'blur' }
                ],
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ]
            }
        };
    },
    mounted: {
        
    },
    components: {
        headTop,
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.login(this.ruleFormPer.phoneNum, this.ruleFormPer.pass, 'per');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        handleClick(){

        },
        /**
         * 登陆
         */
        login(phoneNum, pass, type) {
            let params = {
                "simis_valid": "FALSE",
                "logname": phoneNum,
                "code": '',
                "password": pass,
                "img_cod": '',
                'user_type': type,
                'img_vaild': ''
            }
            userLoging(params).then(res => {
                console.log(res.data);
                if(res.data.code === 200){
                    this.$message({
                        message: '登陆成功',
                        type: 'success'
                    });
                    this.$router.push({ name: 'Myworld'})
                }else{
                    this.$message({
                        message: res.data.message,
                        type: 'warning'
                    });
                }
            })
        },
    }
}
