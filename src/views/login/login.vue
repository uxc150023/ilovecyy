<template>
	<div class="login">
	    <el-form ref="form" :model="form" label-width="80px">
			<div class="demo-input-suffix">
				<el-form-item label="用户名：">
			    	<el-input v-model="form.name" placeholder="请输入用户名"></el-input>
			  	</el-form-item>
			  	<el-form-item label="密码：">
			    	<el-input v-model="form.password" placeholder="请输入用户密码"></el-input>
			  	</el-form-item>
			</div>
			<el-form-item>
			    <el-button type="primary" @click="onSubmit">登入</el-button>
			    <el-button>注册</el-button>
	 	 	</el-form-item>
	    </el-form>
	</div>
</template>
 

<script>
	import Login from '@/js/login/login.js';
	export default Login
</script>

<style lang="scss" scoped>
	$background: red;
	.login {
		text-align: center;
		.demo-input-suffix {
			width: 300px;
			margin: auto;
		}
	}
</style>
