<template>
    <div class="login">
        <div class="login_content">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="个人登录" name="login_per">
                    <el-form :model="ruleFormPer" status-icon :rules="rules" ref="ruleFormPer" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="个人手机：" prop="phoneNum">
                            <el-input type="tel" v-model="ruleFormPer.phoneNum" autocomplete="off" placeholder="请输入个人手机"></el-input>
                        </el-form-item>
                        <el-form-item label="密码：" prop="pass">      
                            <el-input type="password" v-model="ruleFormPer.pass" autocomplete="off" placeholder="请输入密码" ></el-input>
                        </el-form-item>
                    </el-form>
                    <el-button class="width-320" type="primary" @click="submitForm('ruleFormPer')" @keyup.enter.native="submitForm('ruleFormPer')">登 陆</el-button>

                    <el-row class="width-320 margin-auto">
                        <el-button class="float-left" type="text" @click="resetPass()">重置密码</el-button>
                        <el-button class="float-right" type="text" @click="regiter()">注册</el-button>
                    </el-row>
                </el-tab-pane>

                <el-tab-pane label="单位或其他用户登录" name="login_org">
                    <div class="demo-input-suffix">
                        <el-form ref="form" :model="ruleFormOrg" label-width="80px">
                            <el-form-item label="新学名：">
                                <el-input v-model="ruleFormOrg.name" placeholder="新学名"></el-input>
                            </el-form-item>
                            <el-form-item label="密码：">
                                <el-input type="password" v-model="ruleFormOrg.pass" placeholder="密码或手机验证码"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>


        <el-dialog
        title="提示"
        :visible.sync="showpngcode"
        width="30%"
        @opened = "showimgcode"
        center>
            <el-input type="text" v-model="imgcode" placeholder="请输入图形验证码" maxlength="4"></el-input>
            <div id="v_container" style="width: 100px;height: 40px;top: -61px;left: 220px;">　　　　　　　
                <canvas id="verifyCanvas" width="100" height="46" style="cursor: pointer;margin-top: -5px;"></canvas>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showpngcode = false">取 消</el-button>
                <el-button type="primary" @click="chechImgcode()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import Login from '@/js/login/login.js';
    export default Login
</script>

<style lang="scss">
    @import '../../style/theme-base';
</style>
