<template>
<div class="login-page mt-3">
    <div class="login-banner">
      <p class="my-tit">MY ACCOUNT</p>
    </div>
    <div class="login-group mt-3 mb-3">
      <div class="min-container pt-3 pb-3">
        <el-row>
            <el-col class="col-left" :xs="24" :sm="10" :lg="10">
              <h3 class="title log-t pb-2 mb-4">Repeat customer<span class="msg">Required items*</span></h3>
              <el-form label-position="top" :model="formData" ref="formData">
                <el-form-item label="Email" prop="email" :rules="[
                  { required: true, message: 'Please confirm Email', trigger: 'blur' },
                  { type: 'email', message: 'The email address is invalid.', trigger: 'blur' }
                  ]">
                  <el-input placeholder="Email" v-model="formData.email"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="password" :rules="[
                  { required: true, message: 'Please enter a Password', trigger: 'blur' },
                  { min: 6, max: 18, message: '6 to 18 characters in length', trigger: 'blur' }
                  ]">
                  <el-input placeholder="Password" type="password" v-model="formData.password"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-tooltip effect="dark" content="You need to tell us to log in" placement="top">
                    <Buttons @click="submitLogin()" type="info" text="SIGN IN" />
                  </el-tooltip>
                  <p class="find-pwd">
                    <nuxt-link to="/login/forgot">Forgot your password?</nuxt-link>
                  </p>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :xs="24" :sm="14" :lg="14" class="col-right add-bar">
              <h3 class="title mb-5">CREATE AN ACCOUNT</h3>
              <div class="aside-reassu mb-4">
                <h5 class="aside-title">Through your account, you will be able to:</h5>
                <ul class="reassu-test">
                  <li>View shopping bag</li>
                  <li>View all your orders and download sales receipts</li>
                  <li>Manage your address book to facilitate future orders</li>
                  <li>Update your personal information</li>
                </ul>
              </div>
              <div class="aside-reassu reassu-item mb-3">
                <h5 class="aside-title">About your login account</h5>
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
              <nuxt-link to="/login/perfect">
                <Buttons type="info" text="REGISTER" />
              </nuxt-link>
            </el-col>
        </el-row>
      </div>
    </div>
</div>
</template>

<script>
import FloorHeader from '@/pages/share/FloorHeader';
import { mapMutations, mapActions } from 'vuex';

export default {
  data() {
    return {
      formData: {
        email: '',
        password: ''
      }
    }
  },
  components: {
    FloorHeader
  },
  methods: {
    ...mapMutations({
      pushToken: 'pushToken'
    }),
    ...mapActions({
      baseInfo: 'fetchBaseInfo',
      login: 'login/login'
    }),
    submitLogin () {
      return false;
      this.fromValidate(this, () => {
        this.login(this.formData).then(({data = {}}) => {
          this.pushToken(data.token);
          this.$cookies.set('token', data.token);
          this.baseInfo(this.formData).then(() => {
            this.$message.success('Login Success');
            this.$router.push({path: '/'});
          });
        });
      })
    }
  }
}
</script>

<style lang="scss">
.login-page{
  .login-banner{
    height: 256px;
    background: url('../../assets/img/banner.jpg') no-repeat center;
    background-size: cover;
    .my-tit{
      text-align: center;
      font-size: 36px;
      color: #fff;
      line-height: 256px;
      font-weight: 200;
    }
  }
  .login-group{
    .min-container{
      background: #fff;
    }
    .add-bar{
      border-left: 1px solid #eee;
    }
    .title{
      font-size: 20px;
      color: #333;
      font-weight: 500;
      .msg{
        font-size: 12px;
        color: #606266;
        margin-left: 12px;
      }
      &.log-t{
        border-bottom: 1px solid #eee;
      }
    }
    .find-pwd{
      color: #606266;
      text-align: center;
      a{
        color: #606266;
        font-size: 13px;
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
      background: #f5f1eb;
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
    padding-right: 30px;
  }
  .col-right{
    padding-left: 30px;
  }
  @media only screen and (max-width: 768px){
      .login-group .btn-login{
        &.cad{
          max-width: 100%;
        }
      }
      .col-left{
        padding-right: 0;
      }
      .col-right{
        padding-left: 0;
        border-left: none !important;
      }
  }
}
</style>
