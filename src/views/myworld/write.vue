<template>
    <div id="mywrite">
        <div class="content">
            <app-writeOne></app-writeOne>
        </div>

    </div>
</template>

<script>
    import writeOne from '@/components/writeOne.vue'

    export default {
        data () {
            return {

            }
        },
        components: {
            'app-writeOne': writeOne,
        }

    }
</script>

<style lang="scss">
    #mywrite {
        .content {
            padding: 15px;
        }
    }

</style>
