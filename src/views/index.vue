<template>
	<div>
		<div>
			周斌喜欢程雲雲~
		</div>
		<el-button type="text" @click = "goLogin()">去登陆</el-button>
	</div>
</template>
 

<script>

export default {
    name: 'GOGOGO',
    data() {
        return {
            form: {
            	name: '',
            	password: '',
            }
        }
    },
    methods: {
    	goLogin () {
    		this.$router.push({path: '/login'})
    	}
    },
    mounted() {
        // window.location.reload()
    }
}

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
