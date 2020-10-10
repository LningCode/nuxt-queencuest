<template>
<el-button @click="headlerClick" :loading="loading" :icon="icon" :size="size" :type="type">{{text}}</el-button>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    text: {
      type: String
    },
    icon: {
      type: String
    },
    size: {
      type: String
    },
    type: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    headlerClick () {
      if (this.path) {
        this.$router.push({path: this.path});
      } else {
        this.$emit('click');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-button{
  width: 100%;
}
.el-button.el-button--info{
    &:focus, &:hover{
      background: #606266;
      border-color: #606266;
      color: #fff;
    }
}
.el-button:focus,.el-button:hover {
    color: #606266;
    border-color: #DCDFE6;
    background-color: #fff;
}
</style>