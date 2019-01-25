<template>
    <div class="empty">
        <p class="text">暂无内容</p>
    </div>
</template>
<script>

export default {

    data() {
        return {

        };
    },

    mounted() {

    },

    components: {

    },

    methods: {

    }
};

</script>
<style lang="scss">
    @import 'src/style/theme-base';
    .empty {
        width: 100%;
        height: 400px;
        line-height: 550px;
        background: #fff;
        margin-bottom: 60px;
        background: url('../../assets/emptybox.jpg') no-repeat center;
    }
</style>
