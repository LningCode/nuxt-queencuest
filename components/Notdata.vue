<template>
<div class="not-data-boack">
    <img v-if="!icon" :width="w" :height="h" :src="src" alt="">
    <span class="icon" v-if="icon" :class="icon"></span>
    <p class="text mt-1">{{text}}</p>
</div>
</template>

<script>
import notdata from '@/assets/img/not-data.png';

export default {
    props: {
        w: {
            type: Number,
            default: 80
        },
        h: {
            type: Number,
            default: 80
        },
        src: {
            type: String,
            default: notdata
        },
        text: {
            type: String
        },
        icon: {
            type: String
        }
    }
}
</script>

<style lang="scss" scoped>
.not-data-boack{
    display: flex;
    justify-content: center;
    padding: 20px;
    flex-flow: column;
    color: #909399;
    font-size: 14px;
    align-items: center;
    img{
        display: block;
    }
    .text{
        text-align: center;
    }
    .icon{
        text-align: center;
        font-size: 52px;
    }
}
</style>