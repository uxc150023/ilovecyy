import GVerify from './pngcode.js'
import modal from '@/components/modal/modal'

export default {
    data () {
        /**
         * 校验手机号码
         */
        var v_phone = (rule, value, callback) => {
            var reg = /^[1][3,4,5,7,8][0-9]{9}$/
            if (value === '') {
                callback(new Error('请输入手机号码'))
            } else if (!reg.test(value)) {
                callback(new Error('请输入正确的手机号码'))
            } else {
                callback()
            }
        }
        /**
         * 校验输入的密码
         */
        var v_pass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                callback()
            }
        }
        return {
            activeName: 'ruleFormPer',
            form: '',
            showpngcode: false, // 显示图形验证码
            imgcode: '', // 图形验证码
            img_vaild: 'FALSE', // 是否是图形验证码登陆
            ruleFormPer: {
                phoneNum: '', // 手机号码
                pass: ''
            },
            codeform: {
                smscode: '' // 异地验证码
            },
            btnshow: false, // 异地登录获取验证码按钮
            timer: null, // 异地登录验证码按钮倒计时
            count: '', // 异地登录倒计时
            ruleFormOrg: {
                name: '',
                pass: ''
            },
            loginType: 'ruleFormPer', // 登陆类型
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
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                pass: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ]
            },
            modalInfo: {
                title: '系统检测到异地登陆,请进行手机校验',
                show: false,
                style: {
                    width: '1200px',
                    margin: 'auto'
                }
            }
        }
    },
    mounted () {

    },

    created () {
        this.keyupSubmit()
    },

    components: {
        'app-modal': modal
    },

    methods: {
        submitForm () {
            this.$refs[this.loginType].validate((valid) => {
                if (valid) {
                    if (this.loginType === 'ruleFormPer') {
                        this.login('per', this.ruleFormPer.phoneNum, this.ruleFormPer.pass)
                    } else {
                        this.login('org', this.ruleFormOrg.name, this.ruleFormOrg.pass)
                    }
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm (formName) {
            this.$refs[formName].resetFields()
        },
        /**
         * 去注册
         */
        regiter () {
            this.$router.push({ name: 'Register' })
        },
        /**
         * @return {tab点击}
         */
        handleClick (tab, even) {
            this.loginType = tab.name
        },
        /**
         * 绑定enter事件
         */
        keyupSubmit () {
            document.onkeydown = e => {
                let _key = window.event.keyCode
                if (_key === 13) {
                    this.submitForm('ruleFormPer')
                }
            }
        },

        /**
         * 登陆
         */
        login (type, logname, pass, code, simisvalid) {
            if (this.showpngcode === false) {
                this.img_vaild = 'FALSE'
            }
            let params = {
                'simis_valid': simisvalid || 'FALSE',
                'logname': logname,
                'code': code || '',
                'password': pass,
                // "img_vaildcod": this.imgcode,
                'user_type': type,
                'img_vaild': this.img_vaild
            }
            this._getData(this._getUrl('USERLOGING'), params, res => {
                if (res.code === 200) {
                    this.$message({
                        message: '登陆成功',
                        type: 'success'
                    })
                    this.$store.commit('SET_TUSERID', res.data.userid)
                    this.$store.commit('SET_LOGINSTATUS', 'TRUE')
                    this.$store.commit('SET_USERTYPE', type)
                    this.$store.commit('SET_PHONE', res.data.phone)
                    this.$store.commit('SET_USERNAME', res.data.username)

                    let paramsa = {
                        userid: res.data.userid
                    }
                    /**
                     * 判断用户是否存在未完成订单
                     */
                    this._getData(this._getUrl('ISLIVORDERS'), paramsa, res_1 => {
                        this.$store.commit('SET_STUNETID', res_1.data.stunet_id)
                        this.$store.commit('SET_STUNETURL', res_1.data.stunet_url)
                        this.$store.commit('SET_STUNETNAME', res_1.data.stunet_name)
                        if (res_1.code === 200) {
                            this.$router.push({ name: 'Webbuild' })
                        } else if (res_1.code === 353) {
                            this.$router.push({ name: 'Index' })
                        } else if (res_1.code === 358) {
                            if (type === 'per') {
                                this.$router.push({ name: 'Myworld' })
                            } else {
                                this.$router.push({ name: 'Mystunet' })
                            }
                        }
                    })
                } else if (res.code === 315) { // 登陆频繁
                    this.showpngcode = true
                } else if (res.code === 316) { // 异地登陆
                    this.modalInfo.show = true
                } else {
                    this.$message({
                        message: res.message,
                        type: 'warning'
                    })
                }
            })
        },

        /**
         * 登陆频繁弹出图形验证码
         */
        showimgcode () {
            this.verifyCode = new GVerify('v_container')
            this.img_vaild = 'TRUE'
            console.log(this.verifyCode)
        },
        /**
         * 获取异地登录验证码
         */
        getSmscode () {
            this.btnshow = true
            const TIME_COUNT = 60
            /**
             * 获取手机号码
             */
            this._getData(this._getUrl('GETUSERS'), { userid: this._store.state.userid }, res => {
                if (res.code === 200) {
                    this._getData(this._getUrl('NOTESIMPORT'), { is_login: 'TRUE', phone: res.data.phone }, res => {
                        if (res.code === 200) {
                            if (!this.timer) {
                                this.count = TIME_COUNT
                                this.show = false
                                this.timer = setInterval(() => {
                                    if (this.count > 0 && this.count <= TIME_COUNT) {
                                        this.count--
                                    } else {
                                        this.btnshow = false
                                        clearInterval(this.timer)
                                        this.timer = null
                                    }
                                }, 1000)
                            }
                        }
                    })
                }
            })
        },
        /**
         * 异地登录
         */
        Plogin (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.loginType === 'ruleFormPer') {
                        this.login('per', this.ruleFormPer.phoneNum, this.ruleFormPer.pass, this.codeform.smscode, 'TRUE')
                    } else {
                        this.login('org', this.ruleFormOrg.name, this.ruleFormOrg.pass, this.codeform.smscode, 'TRUE')
                    }
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },

        /**
         * 提交图形验证码，后端判断
         */
        chechImgcode () {
            var res = this.verifyCode.validate(this.imgcode)
            if (res) {
                this.login('per')
            } else {
                this.$message.error('图形验证码输入错误')
                return false
            }
        },

        /**
         * 图形验证码切换时间
         */
        // changeImg () {
        //     var imgSrc = $('#imgObj')
        //     var src = imgSrc.attr('src')
        //     imgSrc.attr('src', this.changeUrl(src))
        // },

        /**
         * 为了使每次生成图片不一致，即不让浏览器读缓存，所以需要加上时间戳
         */
        // changeUrl (url) {
        //     var timestamp = (new Date()).valueOf()
        //     var index = url.indexOf('?', url)
        //     if (index > 0) {
        //         url = url.substring(index, url.indexOf(url, '?'))
        //     }
        //     var logname = $('#tel_per').val()
        //     if (tabVal === 1) {
        //         user_type = 'org'
        //         logname = $('#username_org').val()
        //     }

        //     if ((url.indexOf('&') >= 0)) {
        //         url = url + '&timestamp=' + timestamp + '&logname=' + logname
        //     } else {
        //         url = url + '?timestamp=' + timestamp + '&logname=' + logname
        //     }
        //     return url
        // },
        /**
         * 抹除登录信息
         */
        removeSession () {
            sessionStorage.clear()
        },

        /**
         * 重置密码
         */
        resetPass () {
            this.$router.push({ name: 'ResetPass' })
        }
    }
}
