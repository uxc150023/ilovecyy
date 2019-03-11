<template>
    <div id="register">
        <div class="register_content">
            <el-tabs v-model="activeName"
                     @tab-click="handleClick">
                <el-tab-pane label="个人注册"
                             name="ruleFormPer">
                    <el-form :model="ruleFormPer"
                             status-icon
                             :rules="rules"
                             ref="ruleFormPer"
                             label-width="100px"
                             class="demo-dynamic">
                        <el-form :model="phonePer"
                                 status-icon
                                 :rules="rules"
                                 ref="phonePer"
                                 label-width="100px"
                                 class="demo-dynamic">
                            <el-form-item label="手机号："
                                          prop="phone">
                                <el-input type="tel"
                                          v-model="phonePer.phone"
                                          autocomplete="off"
                                          placeholder="请输入个人手机"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-form-item label="验证码："
                                      prop="code">
                            <el-input type="text"
                                      v-model="ruleFormPer.code"
                                      autocomplete="off"
                                      maxlength="6"
                                      placeholder="请输入手机验证码">
                                <el-button type
                                           v-if="btnshow"
                                           disabled
                                           slot="append">&emsp;&emsp;{{count}}&emsp;&emsp;</el-button>
                                <el-button type
                                           @click="getCode('phonePer')"
                                           v-else
                                           slot="append">获取验证码</el-button>
                            </el-input>
                        </el-form-item>

                        <el-form-item label="密码："
                                      prop="pass">
                            <el-input type="password"
                                      v-model="ruleFormPer.pass"
                                      autocomplete="off"
                                      placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码："
                                      prop="pass_t">
                            <el-input type="password"
                                      v-model="ruleFormPer.pass_t"
                                      autocomplete="off"
                                      placeholder="请输入密码"></el-input>
                        </el-form-item>

                        <el-form-item label="协议："
                                      prop="select">
                            <el-checkbox-group v-model="ruleFormPer.select">
                                <el-checkbox label="同意协议"
                                             name="ruleFormPer.select"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>

                    </el-form>
                </el-tab-pane>

                <el-tab-pane label="单位注册"
                             name="ruleFormOrg">
                    <el-form :model="ruleFormOrg"
                             status-icon
                             :rules="rules"
                             ref="ruleFormOrg"
                             label-width="100px"
                             class="demo-ruleForm">
                        <el-form-item label="用户名："
                                      prop="name">
                            <el-input type="tel"
                                      v-model="ruleFormOrg.name"
                                      autocomplete="off"
                                      placeholder="请输入用户名"></el-input>
                        </el-form-item>
                        <el-form :model="phoneOrg"
                                 status-icon
                                 :rules="rules"
                                 ref="phoneOrg"
                                 label-width="100px"
                                 class="demo-dynamic">
                            <el-form-item label="手机号："
                                          prop="phone">
                                <el-input type="tel"
                                          v-model="phoneOrg.phone"
                                          autocomplete="off"
                                          placeholder="请输入个人手机号"></el-input>
                            </el-form-item>
                        </el-form>
                        <el-form-item label="验证码："
                                      prop="code">
                            <el-input type="text"
                                      v-model="ruleFormOrg.code"
                                      autocomplete="off"
                                      maxlength="6"
                                      placeholder="请输入手机验证码">
                                <el-button type
                                           v-if="btnshow"
                                           disabled
                                           slot="append">&emsp;&emsp;{{count}}&emsp;&emsp;</el-button>
                                <el-button type
                                           @click="getCode('phoneOrg')"
                                           v-else
                                           slot="append">获取验证码</el-button>
                            </el-input>
                        </el-form-item>

                        <el-form-item label="密码："
                                      prop="pass">
                            <el-input type="password"
                                      v-model="ruleFormOrg.pass"
                                      autocomplete="off"
                                      placeholder="请输入密码"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码："
                                      prop="pass_t">
                            <el-input type="password"
                                      v-model="ruleFormOrg.pass_t"
                                      autocomplete="off"
                                      placeholder="请输入密码"></el-input>
                        </el-form-item>

                        <el-form-item label="协议："
                                      prop="select">
                            <el-checkbox-group v-model="ruleFormOrg.select">
                                <el-checkbox label="同意协议"
                                             name="ruleFormOrg.select"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <el-button class="width-320"
                       type="primary"
                       @click="submitForm()"
                       @keyup.enter.native="submitForm()">注 册</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        /**
         * 手机号校验
         */
        let v_phone = (rule, value, callback) => {
            let reg = /^[1][3,4,5,7,8][0-9]{9}$/
            if (value === '') {
                callback(new Error('请输入手机号码'))
            } else if (!reg.test(value)) {
                callback(new Error('请输入正确的手机号码'))
            } else {
                callback()
            }
        }
        /**
         * 密码校验
         */
        let v_pass = (rule, value, callback) => {
            let reg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/
            if (value === '') {
                callback(new Error('请输密码'))
            } else if (!reg.test(value)) {
                callback(new Error('密码格式为8-20位数字加字母'))
            } else {
                callback()
            }
        }
        /**
         * 密码校验
         */
        let v_pass_t = (rule, value, callback) => {
            let reg = /^(?!([a-zA-Z]+|\d+)$)[a-zA-Z\d]{8,20}$/
            if (value === '') {
                callback(new Error('请输密码'))
            } else if (!reg.test(value)) {
                callback(new Error('密码格式为8-20位数字加字母'))
            } else {
                if (this.regType === 'ruleFormPer') {
                    if (value !== this.ruleFormPer.pass) {
                        callback(new Error('两次输入的密码不一致'))
                    } else {
                        callback()
                    }
                } else {
                    if (value !== this.ruleFormOrg.pass) {
                        callback(new Error('两次输入的密码不一致'))
                    } else {
                        callback()
                    }
                }
            }
        }
        /**
         * 协议校验
         */
        let v_select = (rule, value, callback) => {
            if (value === false) {
                callback(new Error('请先同意协议'))
            } else {
                callback()
            }
        }
        return {
            regType: 'ruleFormPer', // 注册类型
            phone: '', // 手机号码s
            password: '', // 密码
            code: '', // 验证码
            newStuname: '', // 新学名
            activeName: 'ruleFormPer',
            btnshow: false,
            isRegPer: false,
            isRegOrg: false,
            count: '', // 验证码倒计时
            timer: '',
            phonePer: {
                phone: ''
            },
            phoneOrg: {
                phone: ''
            },
            ruleFormPer: {
                phone: '',
                code: '',
                pass: '',
                pass_t: '',
                select: false
            },
            ruleFormOrg: {
                name: '',
                phone: '',
                code: '',
                pass: '',
                pass_t: '',
                select: false
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'change' }
                ],
                phone: [
                    { required: true, validator: v_phone, trigger: 'change' }
                ],
                code: [
                    { required: true, message: '请输入手机验证码', trigger: 'change' }
                ],
                pass: [
                    { required: true, validator: v_pass, trigger: 'change' }
                ],
                pass_t: [
                    { required: true, validator: v_pass_t, trigger: 'change' }
                ],
                select: [
                    { required: true, validator: v_select, trigger: 'change' }
                ]
            }
        }
    },
    mounted () {
        this.keyupSubmit()
    },

    components: {},

    methods: {
        handleClick (tab, even) {
            this.regType = tab.name
        },
        /**
         * 提交注册
         */
        submitForm () {
            let rulePhone = ''
            if (this.regType === 'ruleFormPer') {
                rulePhone = 'phonePer'
            } else {
                rulePhone = 'phoneOrg'
            }
            this.$refs[this.regType].validate(valid => {
                this.$refs[rulePhone].validate(valid_1 => {
                    if (valid_1) {
                        if (valid) {
                            if (this.regType === 'ruleFormPer') {
                                if (this.ruleFormPer.pass !== this.ruleFormPer.pass_t) {
                                    this._common.showMsg('两次输入的密码不一样')
                                    return false
                                }
                                this.register('per', this.phonePer.phone, this.ruleFormPer.pass, this.ruleFormPercode, '')
                            } else {
                                if (this.ruleFormOrg.pass !== this.ruleFormOrg.pass_t) {
                                    this._common.showMsg('两次输入的密码不一样')
                                    return false
                                }
                                this.register('org', this.phoneOrg.phone, this.ruleFormOrg.pass, this.ruleFormOrg.code, this.ruleFormOrg.name)
                            }
                        }
                    }
                })
            })
        },
        /**
         * 提交注册
         */
        register (type, phone, password, code, stuname) {
            let params = {
                is_register: 'TRUE',
                phone: phone,
                password: password,
                user_type: type,
                new_stuname: stuname,
                code: code
            }
            this._getData(this._getUrl('REGISTER'), params, res => {
                if (res.code === 200) {
                    this._common.showMsg('注册成功', () => {
                        this._store.commit('SET_TUSERID', res.data.userid)
                        this._store.commit('SET_LOGINSTATUS', 'TRUE')
                        this._store.commit('SET_USERTYPE', type)
                        this._store.commit('SET_PHONE', res.data.phone)
                        this._store.commit('SET_USERNAME', res.data.username)

                        if (type === 'per') {
                            this.$router.push({ name: 'Myworld' })
                        } else {
                            this.$router.push({ name: 'Mystunet' })
                        }
                    })
                } else {
                    this._common.showMsg(res.message)
                }
            })
        },
        /**
         * 获取验证码
         */
        getCode (type) {
            let phone = ''
            /**
             * 获取手机号码
             */
            if (type === 'phonePer') {
                phone = this.phonePer.phone
            } else {
                phone = this.phoneOrg.phone
            }
            this.$refs[type].validate((valid) => {
                if (valid) {
                    this.btnshow = true
                    const TIME_COUNT = 60
                    this._getData(this._getUrl('NOTESIMPORT'), { is_login: 'TRUE', phone: phone }, res => {
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
                        } else {
                            this._common.showMsg(res.message)
                        }
                    })
                }
            })
        },
        /**
         * 绑定enter事件
         */
        keyupSubmit () {
            document.onkeydown = e => {
                let _key = window.event.keyCode
                if (_key === 13) {
                    this.submitForm()
                }
            }
        },
        /**
         * 手机号查重 / 暂时不用
         */
        repetPhone (type, phone, stuname) {
            return new Promise((resolve, reject) => {
                let params = {
                    new_stuname: stuname,
                    phone: phone,
                    user_type: type
                }
                this._getData(this._getUrl('CHECKNAAM'), params, res => {
                    if (res.code === 200) {
                        resolve('false')
                    } else {
                        resolve('true')
                    }
                })
            })
        }
    }
}
</script>

<style lang="scss">
#register {
    text-align: center;
    padding-top: 120px;
    .register_content {
        width: 550px;
        margin: 0 auto;
        box-shadow: 0 0 30px rgba(0, 0, 0, 0.3);
        margin-bottom: 90px;
        border-radius: 8px;
        position: relative;
        background-color: #fff;
        padding: 30px 30px;
        .el-tabs__nav {
            width: 100%;
        }

        .el-tabs__active-bar {
            width: 50% !important;
        }

        .el-tabs__item {
            width: 50%;
            font-size: 24px;
        }

        .el-tab-pane {
            text-align: center;
        }
        .el-form-item__content {
            margin-left: 0;
        }
    }
}
</style>
