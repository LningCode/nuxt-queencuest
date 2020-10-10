<template>
<div class="scrollbar__wrap">
  <el-container direction="vertical">
    <Header></Header>
    <nuxt />
    <Footer></Footer>
    <!-- 返回顶部 -->
    <el-backtop target=".scrollbar__wrap" :visibility-height="200">
      <i class="el-icon-caret-top"></i>
    </el-backtop>
    <!-- 联系客服 -->
    <div class="el-backtop chat-server-backtop">
      <a href="https://web.whatsapp.com/send?phone=+8615817043998&text=Hi" target="_blank" title="Click here Chat us by WhatsApp">
        <el-button type="danger" icon="el-icon-chat-line-round">Click here Chat us by WhatsApp</el-button>
      </a>
    </div>
  </el-container>
</div>
</template>

<script>
import Header from '@/pages/share/Header';
import Footer from '@/pages/share/Footer';

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}
a{
  text-decoration: none;
  &:hover{
    text-decoration: underline;
  }
}
.chat-server-backtop{
  bottom: 45px;
  right: 20px;
  width: auto;
}
</style>
