<template>
<!-- 从邮件跳转过来修改密码 -->
<div class="loginpage-group">
  <h1 class="title mb-2">设置新密码</h1>
  <div class="forgot-tip mb-2">
    <p>您是否需要帮助？请与我们的客户服务专员联系:</p>
    <p>Email: queenguests@gmail.com</p>
    <p>WhatsApp: +86 15817043998</p>
  </div>
  <el-form label-position="top" :model="formData" ref="formData">
    <el-form-item label="New Password" prop="password" :rules="[
        { required: true, message: 'Please enter a Password'}
      ]">
      <el-input type="password" placeholder="New Password" v-model="formData.password"></el-input>
    </el-form-item>
    <el-form-item label="Confirm Password" prop="confirmPassword" :rules="[
        { required: true, message: 'Please confirm Password'}
      ]">
      <el-input type="password" placeholder="Confirm Password" v-model="formData.confirmPassword"></el-input>
    </el-form-item>
    <div class="forgot-btns pt-2 mb-3">
      <Buttons @click="submit()" type="info" text="APPLY" />
    </div>
  </el-form>
</div>
</template>

<script>

export default {
  layout: 'DefaultLogin',
  data() {
    return {
      formData: {
        type: 'alter',
        Token: null,
        password: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    // 修改密码
    submit () {
      const {Token} = this.$route.query
      this.formData.Token = Token
      const {password, confirmPassword} = this.formData
      if (password !== confirmPassword) return this.$message.warning('Passwords are different. Please enter the same password');
      this.fromValidate(this, () => {
        forgot(this.formData).then(() => {
          this.$message.success('Password reset complete');
          setTimeout(() => {
            this.$router.push({path: '/login'});
          }, 300)
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.loginpage-group{
  width: 320px;
  margin: 60px auto;
  /deep/ .el-form-item{
    margin-bottom: 10px;
    .el-form-item__label{
      padding-bottom: 0;
    }
  }
  .title{
    text-align: center;
  }
  .forgot-tip{
    font-size: 13px;
    text-align: center;
  }
}
</style>
