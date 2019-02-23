<template>
    <div class="block">
        <div>
            周斌喜欢程雲雲~
        </div>
        <el-button type="text"
                   @click="goLogin()">去登陆</el-button>
    </div>
</template>
<script>

export default {
    name: 'GOGOGO',
    data () {
        return {
            form: {
                name: '',
                password: ''
            }
        }
    },
    methods: {
        goLogin () {
            this.$router.push({ path: '/login' })
        },

        playsnow () {
            var v_h = document.documentElement.clientHeight - 50
            var v_w = document.documentElement.clientWidth
            var block = document.getElementsByClassName('block')[0]
            /**
             * 创建雪花
             */
            for (var i = 0; i < 50; i++) {
                var snow = document.createElement('img')
                snow.className = 'snow'
                snow.src = require('../images/snow1.png')
                /**
                 * 随机大小
                 */
                var s_w = Math.random() * 30 + 5
                snow.style.width = s_w + 'px'
                snow.style.height = s_w + 'px'
                /**
                 * 随机位置分布
                 */
                // top值 left值
                // 若top值小于自身高度，则设置top,若大于自身高度则top值为获取的高度减去自身高度
                var s_t = Math.random() * v_h < parseInt(snow.style.height) ? Math.random() * v_h : (Math.random() * v_h - parseInt(snow.style.height))
                snow.style.top = s_t + 'px'
                var s_l = Math.random() * v_w < parseInt(snow.style.width) ? Math.random() * v_w : (Math.random() * v_w - parseInt(snow.style.width))
                snow.style.left = s_l + 'px'

                block.appendChild(snow)
            }
            var snowh = document.getElementsByClassName('snow')
            setInterval(function () {
                for (var j = 0; j < snowh.length; j++) {
                    // top的改变
                    var snow_t = parseInt(snowh[j].style.top)
                    snow_t++
                    if (snow_t > v_h) {
                        snow_t = 0
                    }
                    snowh[j].style.top = snow_t + 'px'
                    // left的改变
                    var snow_l = parseInt(snowh[j].style.left)
                    snow_l += Math.sin(snow_t / 2 * 0.1)
                    if (snow_l < 0) {
                        snow_l = v_w - parseInt(snowh[j].style.left)
                    }
                    // if(snow_l>v_w){
                    //     snow_l=0;
                    // }
                    snowh[j].style.left = snow_l + 'px'
                }
            }, 20)
        }
    },
    mounted () {
        // this.playsnow();
    }
}

</script>

<style lang="scss">
.top-header {
    display: none;
}
$background: red;
html,
body {
    width: 100%;
    height: 100%;
}
body::-webkit-scrollbar {
    width: 1px;
    height: 1px;
}
.block {
    width: 100%;
    height: 100%;
    // background: url("./image/bg.png")0 0 no-repeat;
    -webkit-background-size: 100% 100%;
    background-size: 100% 100%;
}
.snow {
    position: absolute;
}
.login {
    text-align: center;
    .demo-input-suffix {
        width: 300px;
        margin: auto;
    }
}
</style>
