import commonAction from "@/js/commonAction"
import store from '@/vuex/store.js'
import {currentprice, userLoging} from '@/service/getdata.js'

export default {
    data() {
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('年龄不能为空'));
            }
            if (!Number.isInteger(value)) {
                callback(new Error('请输入数字值'));
            } else {
                if (value < 18) {
                    callback(new Error('必须年满18岁'));
                } else {
                    callback();
                }
            }
        };
        /**
         * 校验输入的密码
         */
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.ruleForm2.checkPass !== '') {
                    this.$refs.ruleForm2.validateField('checkPass');
                }
                callback();
            }
        };
        /**
         * 校验手机号码
         */
        var validatePass3 = (rule, value, callback) => {
            var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
            if(value === ''){
                callback(new Error('请输入手机号码'));
            }else if(!reg.test(value)){
                callback(new Error('请输入正确的手机号码'));
            }else {
                callback();
            }
        };
        return {
            activeName: 'login_per',
            form: '',
            ruleForm2: {
                phoneNum: '', //手机号码
                pass: '',
                age: ''
            },
            rules2: {
                phoneNum: [
                    { validator: validatePass3, trigger: 'blur' }
                ],
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                age: [
                    { validator: checkAge, trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                /**
                 * 登陆
                 */
                let params = {
                    "simis_valid": "FALSE",
                    "logname": '18017607670',
                    "code": '',
                    "password": '11111111',
                    "img_cod": '',
                    'user_type': 'org',
                    'img_vaild': ''
                }
                userLoging(params).then(res => {
                    console.log(res.data);
                })
                if (valid) {
                    alert('submit!');
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
    }
}
