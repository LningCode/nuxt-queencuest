<template>
<div class="slide-verify-block">
    <slide-verify
        :w="w"
        :h="h"
        :imgs="imgs"
        ref="slideblock"
        :accuracy="accuracy"
        :slider-text="text"
        @success="onSuccess"
        @again="onAgain"
        @fail="onFail"
        @fulfilled="onFulfilled"
        @refresh="onRefresh" />
    <p class="msg">{{msg}}</p>
</div>
</template>

<script>
import img from '../assets/img/paypal.png';

export default {
  data() {
    return {
      msg: '',
      // 精确度小，可允许的误差范围小；为1时，则表示滑块要与凹槽完全重叠，才能验证成功。默认值为5
      accuracy: 5
    }
  },
  props: {
    text: {
      type: String
    },
    w: {
      type: Number,
      default: 320
    },
    h: {
      type: Number,
      default: 150
    },
    imgs: {
      type: Array,
      default () {
        return [img, img, img]
      }
    }
  },
  methods: {
    onSuccess (times) {
      this.msg = `time consuming ${(times / 1000).toFixed(1)}s`;
    },
    onFail () {
      this.msg = ''
    //   console.log('验证不通过');
    },
    onRefresh () {
      this.msg = ''
    //   console.log('点击了刷新小图标');
    },
    onFulfilled() {
      this.msg = ''
    //   console.log('刷新成功啦！');
    },
    onAgain () {
    //   console.log('检测到非人为操作的哦！');
      this.$message.warning('Non-human operation detected!');
      this.msg = ''
      this.handleClick();
    },
    handleClick() {
      this.$refs.slideblock.reset();
    }
  },
  watch: {
    msg (v) {
      this.$emit('verify', v)
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-verify-block{
    /deep/ canvas:last-child{
        background: #fff;
    }
    /deep/ .slide-verify-slider{
        margin-top: 0;
        .slide-verify-slider-mask-item{
            width: 38px;
            height: 38px;
            border: 1px solid #909399;
            background-color: #909399 !important;
        }
        .slide-verify-slider-mask{
            border: 1px solid #DCDFE6;
            background-color: #e2e2e2;
        }
    }
    .msg{
        text-align: center;
    }
}
</style>