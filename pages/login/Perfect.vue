<template>
<div class="perfect-group  mt-3">
  <div class="login-banner">
    <p class="my-tit">CrREATE MY ACCOUNT</p>
  </div>
  <div class="container mt-4 mb-4">
    <el-row>
      <el-col class="col-left" :xs="24" :sm="16" :lg="16">
        <div class="col-info">
          <h2 class="title mb-4">
            <span class="text">Create a my REGISTER account<span class="msg">Required items*</span></span>
          </h2>
          <p class="reading-info mb-3">Create a personal account to get more exclusive information and rich experience.</p>
          <el-form label-position="top" :rules="rules" :model="formData" ref="formData">
            <el-form-item prop="gender" class="radio-gender">
              <el-radio-group v-model="formData.gender">
                <el-radio :label="1">Male</el-radio>
                <el-radio :label="2">Female</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="Email" prop="email">
              <el-input placeholder="Email" v-model="formData.email"></el-input>
            </el-form-item>

            <el-form-item class="password" label="Password" prop="password">
              <el-input type="password" placeholder="Password" v-model="formData.password"></el-input>
            </el-form-item>

            <el-form-item class="password" label="Confirm Password" prop="confirmPassword">
              <el-input type="password" placeholder="Confirm Password" v-model="formData.confirmPassword"></el-input>
            </el-form-item>

            <el-form-item class="checkbox-group mt-3" prop="protocol">
              <div class="field-checkbox">
                <el-checkbox v-model="formData.subscribeEmail" label="Email me offers and Saera news" />
              </div>
              <div class="field-checkbox">
                <el-checkbox v-model="formData.protocol">
                  <div class="reg-agree">
                    <span>I agree</span>
                    <nuxt-link class="nuxtlink" to="/">《Terms and conditions》</nuxt-link>
                    <span>as well as</span>
                    <nuxt-link class="nuxtlink" to="/">《Privacy Policy》</nuxt-link>
                  </div>
                </el-checkbox>
                <p v-if="!formData.protocol" class="el-form-item__error">Please check the required option</p>
              </div>
            </el-form-item>

            <el-form-item class="pt-3">
              <el-tooltip class="mb-2" effect="dark" content="You need to tell us to log in" placement="top">
                <Buttons type="info" text="carry on" />
              </el-tooltip>
              <!-- <Buttons @click="submit()" type="info" text="NEXT" /> -->
              <nuxt-link to="/login">
                <Buttons text="Please log in if you already have an account" />
              </nuxt-link>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col class="col-right" :xs="24" :sm="8" :lg="8">
        <div class="contact">
          <Buttons icon="el-icon-message" path="/help/contactus" text="Having trouble with registration? You can contact us by Email" />
        </div>
        <div class="aside-reassu reassu-item mt-2">
          <h5 class="aside-title">About your Saear account</h5>
          <ul class="aside-list">
            <li class="aside-item">
              <i class="el-icon-shopping-bag-1"></i>
              <span>Check your online orders and historical purchase records</span>
            </li>
            <li class="aside-item">
              <i class="el-icon-wallet"></i>
              <span>Manage your personal information</span>
            </li>
            <li class="aside-item">
              <i class="el-icon-message"></i>
              <span>Get the latest newsletter</span>
            </li>
            <li class="aside-item">
              <i class="el-icon-star-off"></i>
              <span>Store your shopping bag and wish list</span>
            </li>
          </ul>
        </div>
      </el-col>
    </el-row>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  layout: 'DefaultLogin',
  data() {
    return {
      formData: {
        gender: 1,
        email: '',
        password: '',
        confirmPassword: '',
        subscribeEmail: true,
        protocol: true
      },
      rules: {
        email: [
          { required: true, message: 'Please confirm Email', trigger: 'blur' },
          { type: 'email', message: 'The email address is invalid.', trigger: 'blur' }
        ],
        password: [
          { required: true, message: 'Please enter a Password', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: 'Please confirm Password', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapActions({
      register: 'login/register'
    }),
    submit () {
      const {password, confirmPassword} = this.formData
      if (password !== confirmPassword) return this.$message.warning('Passwords are different. Please enter the same password');
      this.fromValidate(this, () => {
        this.register(this.formData).then(() => {
          this.$message.success('registration success');
          setTimeout(() => {
            this.$router.push({path: '/login'});
          }, 500);
        });
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.perfect-group{
  .login-banner{
    height: 256px;
    background: url('https://assets.burberry.com/is/image/Burberryltd/MyAccount.jpg?$BBY_V2_BASIC=&qty=80,1$&wid=1903') no-repeat center;
    background-size: cover;
    .my-tit{
      text-align: center;
      font-size: 36px;
      color: #fff;
      line-height: 256px;
      font-weight: 200;
    }
  }
  .container{
    .col-info{
      padding: 30px;
      background: #fff;
      /deep/ .checkbox-group{
        .el-form-item__content{
          line-height: 25px;
          .nuxtlink{
            color: #909399;
          }
        }
        .el-checkbox__label{
          font-size: 13px;
          font-weight: normal;
        }
      }
      .title{
        font-size: 20px;
        color: #333;
        font-weight: 500;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        padding-bottom: 13px;
        .msg{
          font-size: 12px;
          color: #606266;
          margin-left: 8px;
        }
      }
      .reading-info{
        font-size: 13px;
        color: #606266;
      }
    }
    .reassu-test{
      font-size: 14px;
      color: #606266;
      padding-left: 20px;
      li{
        padding: 6px 0;
      }
    }
    .aside-title{
      font-size: 16px;
      color: #606266;
      margin-bottom: 15px;
    }
    .reassu-item{
      background: #fff;
      padding: 25px;
      .aside-list{
        padding: 0;
        li{
          list-style: none;
          font-size: 14px;
          color: #606266;
          font-weight: 400;
          border-top: 1px solid #ddd;
          padding: 12px 0;
          i{
            font-size: 16px;
            margin-right: 5px;
          }
        }
      }
    }
  }
  .col-left{
    padding-right: 20px;
  }
  .col-right{
    padding-left: 20px;
    .contact{
      padding: 15px 20px;
      background: #fff;
      /deep/ .el-button{
        white-space: break-spaces;
      }
    }
  }
  @media only screen and (max-width: 768px){
    .col-left{
      padding-right: 0;
    }
    .col-right{
      padding-left: 0;
    }
  }
}
</style>
