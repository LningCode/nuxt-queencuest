<template>
<div class="loginpage-group">
  <h1 class="title mb-3">FORGOT PASSWORD</h1>
  <p class="forgot-tip mb-3">Enter the e-mail address associated with your vova.com account, then click Send. We'll email you a link to a page where you can easily create a new password.</p>
  <el-form :model="formData" ref="formData">
    <el-form-item class="mb-2" prop="email" :rules="[
      { required: true, message: 'Please confirm Email'},
      { type: 'email', message: 'The email address is invalid.'}
      ]">
      <el-input placeholder="Email" v-model="formData.email"></el-input>
    </el-form-item>
    <el-form-item>
      <Verify ref="slideblock" @verify="verify" />
    </el-form-item>
    <div class="forgot-btns mt-3">
      <el-tooltip effect="dark" content="You need to tell us to log in" placement="top">
        <Buttons type="info" text="SEND" />
      </el-tooltip>
      <!-- <div class="btns">
        <Buttons @click="submit()" type="info" text="SEND" />
      </div> -->
      <div class="btns mt-2">
        <Buttons @click="$router.push({path: '/login'})" text="SIGN IN" />
      </div>
    </div>
  </el-form>
  <!-- 发送邮件成功提示 -->
  <el-dialog
    title="Please check your email"
    :close-on-click-modal="false"
    :visible.sync="dialogVisible"
    width="40%">
    <span>Thank you for submitting your email address. We have sent the information required to reset the password to your email address. It will take a few minutes for the email to reach your mailbox. Please check spam to make sure you receive it.</span>
    <div slot="footer">
      <Buttons @click="dialogVisible = false;$router.push({path: '/'})" type="info" text="回到首页" />
    </div>
  </el-dialog>
</div>
</template>

<script>

export default {
  layout: 'DefaultLogin',
  data() {
    return {
      formData: {
        type: 'send',
        email: ''
      },
      dialogVisible: false,
      verifyfield: '',
      resetfield: false
    }
  },
  methods: {
    // 发送邮件密码
    submit () {
      this.fromValidate(this, () => {
        if (!this.verifyfield) return this.$message.warning('Verification code failed');
        forgot(this.formData).then(() => {
          this.dialogVisible = true;
        })
        this.headlerReset()
      })
    },
    verify (e) {
      this.verifyfield = e
    },
    // 重置验证码
    headlerReset () {
      const children = this.$refs.slideblock.$children[0] || {}
      if (children.reset) {
        children.reset()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.loginpage-group{
  width: 320px;
  margin: 60px auto;
  .title{
    text-align: center;
  }
  .forgot-tip{
    font-size: 13px;
    text-align: center;
  }
  .item-tit{
    font-size: 14px;
  }
  /deep/ .el-dialog{
    .el-dialog__close{
      font-size: 22px;
      &:hover{
        color: #666;
      }
    }
  }
}
</style>
