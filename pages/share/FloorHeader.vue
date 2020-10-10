<template>
<div class="floor-header">
    <h2 class="title" :style="innerStyle['title']" v-show="title" v-text="title"></h2>
    <p class="taps" :style="innerStyle['desc']" v-show="desc" v-text="desc"></p>
</div>
</template>

<script>
export default {
    data () {
        return {
        }
    },
    props: {
        title: {
            type: String,
            default: ''
        },
        desc: {
            type: String,
            default: ''
        },
        innerStyle: {
            type: Object,
            default: () => {
                return {}
            }
        }
    }
}
</script>

<style lang="scss">
.floor-header{
    padding: 15px 0;
    .title{
        display: table;
        font-size: 23px;
        text-transform: uppercase;
        letter-spacing: 1px;
        white-space: nowrap;
        color: #333;
    }
    .title:before, .title:after{
        background-clip: padding-box;
        background-image: linear-gradient(rgba(0,0,0,0) 47%,#ddd 48%,#ddd 52%,rgba(0,0,0,0) 52%);
        content: "";
        display: table-cell;
        width: 50%;
    }
    .title:before{
        border-right: 12px solid transparent;
    }
    .title:after{
        border-left: 12px solid transparent;
    }
    .taps{
        text-align: center;
        color: #999;
        font-size: 14px;
    }
}
</style>