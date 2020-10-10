<template>
<el-main>
  <div class="container">
    <Carousel />
    <!-- 商品列表模块 -->
    <ProductBlock class="mt-5" />
    <!-- 推荐品牌 -->
    <div class="pav-custom mb-2 mt-5">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="12" :lg="12" v-for="(i, k) in custom" :key="k">
          <div class="pav-col">
            <div class="banner">
              <router-link :to="i.JumpLink">
                <img class="img" :src="i.images" :alt="i.name">
              </router-link>
              <div class="desc">
                {{i.name}}
              </div>
            </div>
            <div class="group-info">
              <h3 class="title mb-2">{{i.name}}</h3>
              <router-link :to="i.JumpLink">
                <el-button type="info" plain>SHOP NOW</el-button>
              </router-link>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- 订阅邮件 -->
    <div class="letter-wrapper">
      <el-row :gutter="20">
        <el-col :xs="24" :lg="12">
          <div class="letter-ads">
            <h3>YOUR DAILY CLOSE OF STYLE</h3>
            <p class="mt-1">The latest look and style just for you</p>
          </div>
        </el-col>
        <el-col :xs="24" :lg="12">
          <div class="from-subscribe">
            <el-form :model="formData" ref="formData">
              <el-form-item prop="email" :rules="[
                  { required: true, message: 'Email address required', trigger: 'blur' },
                  { type: 'email', message: 'Correct email address', trigger: 'blur' }
                ]"
              >
                <el-input type="email" placeholder="SIGN UP FOR OUR NEWSLETTER" v-model="formData.email">
                  <template slot="prepend">
                    <i class="el-icon-message"></i>
                  </template>
                  <el-button @click="subscribe()" slot="append">SUBSCRIBE</el-button>
                </el-input>
              </el-form-item>
            </el-form>
            <p class="from-desc mt-2">By entering your email address, you are agreeing to our Terms of service, Privacy Policy, and to receive emails from Fastest Store.</p>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</el-main>
</template>

<script>
import Carousel from '@/components/Carousel'
import ProductBlock from '@/pages/home/ProductBlock'

export default {
  async asyncData({store}) {
    return Promise.all([
      store.dispatch('fetchVavMenu')
    ]);
  },
  data() {
    return {
      formData: {
        email: ''
      },
      custom: [
        {
          images: 'https://www.luxbagsgirl.com/media/wysiwyg/codazon/handbag/home/cdz_img_03.jpg',
          JumpLink: '/product/category?category=FENDI',
          name: 'HIGH QUALITY FENDI BAGS'
        },
        {
          images: 'https://www.luxbagsgirl.com/media/wysiwyg/codazon/handbag/home/cdz_img_04.jpg',
          JumpLink: '/product/category?category=DIOR',
          name: 'CHRISTIAN DIOR OUTLET'
        }
      ]
    }
  },
  components: {
    Carousel,
    ProductBlock
  },
  methods: {
    subscribe () {
      this.fromValidate(this, () => {
        this.$axios.$post('subscribe', this.formData).then(_ => {
          this.notify('success', 'Successfully subscribed');
        }).catch(_ => {
          this.notify('error', 'Subscription failed');
        })
      })
    },
    notify (type, title) {
      this.$notify[type]({title})
    }
  }
}
</script>

<style lang="scss" scoped>
.pav-custom{
  .pav-col{
    position: relative;
    background: #fff;
    .banner{
      overflow: hidden;
      position: relative;
      .img{
        display: block;
        width: 100%;
      }
      .desc{
        position: absolute;
        bottom: -100%;
        left: 0;
        right: 0;
        z-index: 2;
        background: rgba($color: #fff, $alpha: .6);
        padding: 20px;
        text-align: center;
        transition: 800ms;
        font-size: 13px;
      }
      &:hover{
        .desc{
          bottom: 0;
        }
      }
    }
    .group-info{
      text-align: center;
      padding: 30px 20px;
      color: #909399;
    }
  }
}
.letter-wrapper{
  padding: 20px;
  background: #fff;
  .letter-ads{
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    min-height: 134px;
    background: url('~assets/img/letter.png') no-repeat center left;
    color: #909399;
  }
  .from-subscribe{
    margin-top: 15px;
    .from-desc{
      color: #909399;
    }
    .el-icon-message{
      font-size: 20px;
    }
  }
}
</style>
