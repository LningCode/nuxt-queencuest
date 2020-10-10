<template>
<el-footer>
  <div class="container mt-5">
    <div class="top-footer">
      <div class="logo-wrapper">
        <router-link to="/">
          <img class="footer-logo" src="https://www.luxbagsgirl.com/skin/frontend/codazon_fastest/handbag/images/media/logo.png" alt="" srcset="">
        </router-link>
      </div>
      <div class="links-wrapper">
        <ul class="el-menu el-menu--horizontal">
          <li class="el-menu-item" :index="k" v-for="(i,k) in links" :key="k">
            <router-link :to="i.link">{{i.name}}</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom-footer pb-4 mt-1">
      <div class="social-icons mb-1">
        <router-link class="icon" :to="i.link" v-for="(i,k) in socialIcon" :key="k">
          <i :class="i.icon"></i>
        </router-link>
      </div>
      <address class="address">© 2018. ALL RIGHTS RESERVED.</address>
    </div>
  </div>
</el-footer>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          name: 'F.A.Q',
          link: '/help/faq'
        },
        {
          name: 'CONDITIONS OF USE',
          link: '/help/conditions-of-use'
        },
        {
          name: 'CONTACT US',
          link: '/help/contactus'
        }
      ],
      socialIcon: [
        {
          icon: 'icon-twitter-sign',
          link: '/'
        },
        {
          icon: 'icon-facebook-sign',
          link: '/'
        },
        {
          icon: 'icon-camera-retro',
          link: '/'
        }
      ]
    }
  }
}
</script>

<style scoped lang="scss">
.el-footer{
  height: auto !important;
  background: #fff;
  text-align: center;
  .top-footer{
    .links-wrapper{
      display: flex;
      justify-content: center;
      /deep/ .el-menu{
        border: none;
        .el-menu-item{
          font-size: 13px;
          padding: 0 10px;
        }
      }
    }
  }
  .bottom-footer{
    color: #909399;
    font-size: 12px;
    .social-icons{
      font-size: 30px;
      .icon{
        margin: 0 5px;
        color: #909399;
      }
    }
    .address{
      font-style: normal;
    }
  }
}
</style>
