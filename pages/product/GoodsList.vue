<template>
<el-row :gutter="15">
  <el-col :xs="12" :sm="8" :md="6" class="el-col-df" v-for="(i, k) in list" :key="k">
    <div class="product-body">
      <router-link :to="routerPage(i)">
        <div class="product-image">
          <img :src="productImage(i)" :alt="i.productName">
        </div>
      </router-link>
      <div class="product-details">
        <h3 class="product-name mb-1">
          <router-link :title="i.productName" :to="routerPage(i)">
            {{i.productName}}
          </router-link>
        </h3>
        <p class="price mb-1">${{i.productPrice}}</p>
        <div class="cdz-bottom">
          <span class="icon el-icon-goods" @click="addCart(i)" title="Add to Cart"></span>
          <span class="icon el-icon-star-off" title="Add to Wishlist" @click="starProduct(i)"></span>
        </div>
      </div>
    </div>
  </el-col>
</el-row>
</template>

<script>
export default {
    props: {
      // 商品数据
      list: {
          type: Array,
          default: []
      }
    },
    methods: {
      addCart () {
        this.$notify.info({
          title: 'You need to log in first'
        });
      },
      productImage ({productImage = {}}) {
        return productImage.url;
      },
      // 收藏商品
      starProduct ({_id}) {
        this.$store.dispatch('fetchCollect', { productId: _id }).then(({data}) => {
          this.$notify({ title: 'Collection success', type: 'success' });
        }).catch(err => {
          this.$notify.error({ title: 'Collection failed' });
        })
      },
      routerPage ({_id}) {
        return `/product/details?productId=${_id}`;
      }
    }
}
</script>

<style lang="scss" scoped>
@media only screen and (min-width: 1140px) {
  .el-col-df{
    width: 20%;
  }
}
.product-body{
  position: relative;
  background: #fff;
  transition: .5s;
  margin-bottom: 15px;
  &:hover{
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    transform: scale(1.05);
    z-index: 2;
  }
  .product-image{
    img{
      display: block;
      width: 100%;
    }
  }
  .product-details{
    position: relative;
    padding: 10px;
    text-align: center;
    .product-name{
      font-size: 13px;
      height: 55px;
      overflow: hidden;
      a{
        color: #909399;
      }
    }
    .price{
      color: #303133;
      font-weight: 500;
    }
    .cdz-bottom{
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 2;
      background: #fff;
      transition: all 500ms ease;
      transform: scale(0, 0);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      .icon{
        color: #fff;
        font-size: 24px;
        background: #F56C6C;
        margin: 0 6px;
        width: 36px;
        height: 36px;
        line-height: 36px;
        cursor: pointer;
      }
    }
    &:hover{
      .cdz-bottom{
        transform: scale(1, 1);
      }
    }
  }
}
</style>