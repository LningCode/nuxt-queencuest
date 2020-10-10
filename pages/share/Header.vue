<template>
<el-header class="share-header">
  <p class="delivery-cart mb-1">
    <nuxt-link to="/cart" class="link">
      <i class="el-icon-truck"></i>
      <span class="text">FREE Delivery when you spend $49</span>
    </nuxt-link>
  </p>
  <div class="container">
    <div class="row-block mb-1">
      <div class="col">
        <Buttons icon="el-icon-s-fold" class="nav-button" @click="colseDrawer(true)" />
        <Buttons icon="el-icon-search" @click="$refs.searchVisible.headlerVisible()" />
      </div>
      <nuxt-link class="logo" to="/"></nuxt-link>
      <div class="col">
        <!-- 登录 -->
        <div v-if="token" style="text-align: center;">
          <nuxt-link to="/cart">
            <el-button>
              <el-badge :max="99" :value="cartList.length">
                <i class="el-icon-goods"></i>
              </el-badge>
            </el-button>
          </nuxt-link>
          <el-dropdown @command="handleCommand">
            <nuxt-link to="/personal">
              <el-button icon="el-icon-user" />
            </nuxt-link>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="account">My Account</el-dropdown-item>
              <el-dropdown-item command="orders">My Orders</el-dropdown-item>
              <el-dropdown-item command="wishlist">My Wishlist</el-dropdown-item>
              <el-dropdown-item command="signOut">Sign Out</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- 未登录 -->
        <div v-else style="text-align: center;">
          <el-popover trigger="hover" content="Your Shopping Cart is empty.">
            <el-button @click="link('login')" slot="reference">
              <el-badge :max="99" :value="0">
                <i class="el-icon-goods"></i>
              </el-badge>
            </el-button>
          </el-popover>
          <nuxt-link to="/login"><el-button icon="el-icon-user" /></nuxt-link>
        </div>
      </div>
    </div>
    <MenuNav />
  </div>
  <SearchDrawer ref="searchVisible" />
  <MenuNavDrawer ref="menunavVisible" />
</el-header>
</template>

<script>
import MenuNav from '@/pages/share/MenuNav'
import SearchDrawer from '@/pages/share/drawer/SearchDrawer'
import MenuNavDrawer from '@/pages/share/drawer/MenuNavDrawer'
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      token: state => state.token,
      cartList: state => state.cartList
    })
  },
  components: {
    MenuNav,
    SearchDrawer,
    MenuNavDrawer
  },
  methods: {
    ...mapMutations({
      pushBaseInfo: 'pushBaseInfo'
    }),
    ...mapActions({
      loginOut: 'login/loginOut'
    }),
    handleCommand (command) {
      // 退出登录清空token值
      if (command === 'signOut') {
        this.loginOut().then(() => {
          this.pushBaseInfo({});
          this.link('login');
        })
      } else {
        this.link();
      }
    },
    link (url = 'personal') {
      const path = `/${url}`
      this.$router.push({path});
    },
    colseDrawer (state) {
      this.$refs.menunavVisible.openDrawerMenu(state);
    }
  }
}
</script>

<style lang="scss" scoped>
.share-header{
  // background: #f5f1eb;
  background: #fff;
  height: auto !important;
  padding: 0;
  border-bottom: solid 1px #ddd;
  .delivery-cart{
    display: flex;
    justify-content: center;
    background: #e2e2e2;
    .link{
      display: flex;
      padding: 10px 15px;
      color: #909399;
      font-size: 13px;
      align-items: center;
      .el-icon-truck{
        font-size: 24px;
        margin-right: 10px;
      }
      &:hover{
        text-decoration: none;
      }
    }
  }
  .container{height: 100%;}
  .row-block{
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 95px;
    width: 100%;
    .logo{
      width: 145px;
      height: 80px;
      display: block;
      background: url('~assets/img/logo.png') no-repeat center center;
      background-size: 100%;
    }
    .nav-button{
      display: none;
    }
    /deep/ .el-button{
      border: none;
      background: none;
      margin-left: 0;
      padding: 12px 10px;
      &:hover, &:focus{
        color: #606266;
      }
      .el-icon-goods, .el-icon-user, .el-icon-search, .el-icon-s-fold{
        font-size: 22px;
        font-weight: bold;
        vertical-align: middle;
      }
    }
  }
  @media only screen and (max-width: 767px){
    .row-block .el-button .text{
      display: none;
    }
    .nav-button{
      display: inline-block !important;
    }
  }
}
</style>
