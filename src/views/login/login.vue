<template>
    <div class="login">
        <div class="login_content">
            <el-tabs v-model="activeName"
                     @tab-click="handleClick">
                <el-tab-pane label="个人登录"
                             name="ruleFormPer">
                    <el-form :model="ruleFormPer"
                             status-icon
                             :rules="rules_per"
                             ref="ruleFormPer"
                             label-width="100px"
                             class="demo-ruleForm">
                        <el-form-item label="个人手机："
                                      prop="phoneNum">
                            <el-input type="tel"
                                      v-model="ruleFormPer.phoneNum"
                                      autocomplete="off"
                                      placeholder="请输入个人手机"></el-input>
                        </el-form-item>
                        <el-form-item label="密码："
                                      prop="pass">
                            <el-input type="password"
                                      v-model="ruleFormPer.pass"
                                      autocomplete="off"
                                      placeholder="请输入密码"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>

                <el-tab-pane label="单位或其他用户登录"
                             name="ruleFormOrg">
                    <el-form :model="ruleFormOrg"
                             status-icon
                             :rules="rules_org"
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
                        <el-form-item label="密码："
                                      prop="pass">
                            <el-input type="password"
                                      v-model="ruleFormOrg.pass"
                                      autocomplete="off"
                                      placeholder="请输入密码"></el-input>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
            <el-button class="width-320"
                       type="primary"
                       @click="submitForm()"
                       @keyup.enter.native="submitForm()">登 陆</el-button>
            <el-row class="width-320 margin-auto">
                <el-button class="float-left"
                           type="text"
                           @click="resetPass()">重置密码</el-button>
                <el-button class="float-right"
                           type="text"
                           @click="regiter()">注册</el-button>
            </el-row>
        </div>

        <app-modal :modalInfo='modalInfo'>
            <div>
                <el-form :model="codeform"
                         :inline="true"
                         ref="codeform"
                         label-width="100px"
                         class="">
                    <el-form-item label=""
                                  prop="smscode"
                                  :rules="[
                            { required: true, message: '验证码不能为空'},
                        ]">
                        <el-form-item>
                            <el-input type="text"
                                      v-model.number="codeform.smscode"
                                      autocomplete="off"
                                      maxlength="6"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type=""
                                       @click="getSmscode"
                                       v-if='btnshow'
                                       disabled>&emsp;&emsp;{{count}}&emsp;&emsp;</el-button>
                            <el-button type=""
                                       @click="getSmscode"
                                       v-else>获取验证码</el-button>
                        </el-form-item>
                    </el-form-item>
                </el-form>
                <el-button type="primary"
                           @click="Plogin('codeform')">确&emsp;&emsp;定</el-button>
            </div>
        </app-modal>

        <el-dialog title="提示"
                   :visible.sync="showpngcode"
                   width="30%"
                   @opened="showimgcode"
                   center>
            <el-input type="text"
                      v-model="imgcode"
                      placeholder="请输入图形验证码"
                      maxlength="4"></el-input>
            <div id="v_container"
                 style="width: 100px;height: 40px;top: -61px;left: 220px;">
                <canvas id="verifyCanvas"
                        width="100"
                        height="46"
                        style="cursor: pointer;margin-top: -5px;"></canvas>
            </div>
            <span slot="footer"
                  class="dialog-footer">
                <el-button @click="showpngcode = false">取 消</el-button>
                <el-button type="primary"
                           @click="chechImgcode()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Login from '@/js/login/login.js'
export default Login
</script>

<style lang="scss">
/*登陆*/
.login {
    text-align: center;
    margin-top: 70px;
    .login_content {
        width: 550px;
        height: 400px;
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

    .demo-input-suffix {
        width: 300px;
        margin: auto;
    }
}
</style>
