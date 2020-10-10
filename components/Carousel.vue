<template>
<div class="slide-container clearfix">
  <el-carousel :height="height">
    <el-carousel-item v-for="(i,k) in carouselList" :key="k">
        <div class="carousel-item" :style="`background:url(${i.images});background-size: cover;background-position: 50%;`" :title="i.name"></div>
    </el-carousel-item>
  </el-carousel>
  <div class="small-banner">
    <div class="responsive" v-for="(i,k) in smallBanner" :key="k">
      <router-link :to="i.JumpLink">
        <img :src="i.images" alt="" srcset="">
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      carouselList: [],
      smallBanner: []
    }
  },
  props: {
    position: {
      type: String,
      default: 'main-banner'
    },
    height: {
      default: '480px',
      type: String
    }
  },
  async mounted () {
    this.carouselList = await this.queryServer(this.position);
    this.smallBanner = await this.queryServer('small-banner');
  },
  methods: {
    queryServer (position) {
      return new Promise((resolve) => {
        this.$axios.$get(`carousel?position=${position}`).then(({data}) => {
          resolve(data || []);
        }).catch(err => {
          resolve([]);
        });
      }); 
    }
  }
}
</script>

<style lang="scss" scoped>
.slide-container{
  display: flex;
  /deep/ .el-carousel{
    width: 100%;
    height: 100%;
  }
  .carousel-item{
    width: 100%;
    height: 100%;
  }
  .small-banner{
    width: 280px;
    margin-left: 20px;
    min-width: 280px;
    .responsive{
      margin-bottom: 20px;
      img{
        display: block;
        width: 100%;
      }
      &:last-child{
        margin-bottom: 0;
      }
    }
  }
}
@media only screen and (max-width: 1000px){
  /deep/ .el-carousel__container{
    height: 360px !important;
  }
  .slide-container .small-banner{
    width: 273px;
    min-width: 207px;
  }
}
@media only screen and (max-width: 768px){
  .slide-container{
    display: block;
    .small-banner{
      width: 100%;
      display: flex;
      margin-left: 0;
      margin-top: 15px;
      .responsive{
        width: 100%;
        margin-bottom: 0;
        margin-right: 15px;
        &:last-child{
          margin-right: 0;
        }
      }
    }
  }
}
</style>
