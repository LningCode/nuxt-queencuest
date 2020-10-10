<template>
<el-dialog title="Search our store" :visible.sync="visible" @opened="handleOpened">
  <el-input ref="searchInput" @keyup.enter.native="headlerSearch" v-model="search" prefix-icon="el-icon-search" />
  <div class="search-host mt-1">
    <p class="host-tit">Popular words</p>
    <el-tag type="warning" class="host-tag" v-for="(i,k) in hostWorws" :key="k" @click="tageleTag(i)">
      <i class="el-icon-time"></i>
      {{i.words}}
    </el-tag>
  </div>
</el-dialog>
</template>

<script>
export default {
    data () {
        return {
            visible: false,
            search: '',
            hostWorws: []
        }
    },
    methods: {
        tageleTag ({words}) {
          this.headlerVisible(false);
          this.$router.push({
            path: `/search?q=${words}`
          })
        },
        headlerSearch (e) {
          const keyCode = window.event ? e.keyCode:e.which;
          if (keyCode === 13 && this.search) {
            this.headlerVisible(false);
            this.$router.push({path: `/search?q=${this.search}`});
          }
        },
        headlerVisible (status = true) {
          this.visible = status;
        },
        handleOpened () {
          this.$nextTick(() => {
            this.search = this.$route.query.q;
            this.$refs.searchInput.focus();
            // 获取热门搜索
            this.$axios.$get('hostSearch').then(({data}) => {
              this.hostWorws = data || [];
            })
          })
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-dialog{
  .el-dialog__body{
    padding: 20px;
  }
  .host-tit{
    font-size: 12px;
    color: #999;
    margin-bottom: 8px;
  }
  .host-tag{
    cursor: pointer;
    margin-right: 10px;
  }
}
@media only screen and (max-width: 768px){
    /deep/ .el-dialog{
        margin-top: 0 !important;
        width: 100%;
    }
}
</style>