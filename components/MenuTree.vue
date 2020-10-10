<template>
<div :class="{'children-menu': tree}">
    <template v-for="item in menu">
        <el-submenu :key="item._id" v-if="item.children.length" :index="item._id">
            <template slot="title">
                <span slot="title" @click="linkPage(item)">{{item.label}}</span>
            </template>
            <MenuTree :tree="false" :menu="item.children" />
        </el-submenu>
        <el-menu-item :key="item._id" v-else :index="menuPath(item)">
            <span slot="title">{{item.label}}</span>
        </el-menu-item>
    </template>
</div>
</template>

<script>
export default {
  name: 'MenuTree',
  props: {
    menu: {
        type: Array
    },
    tree: {
        type: Boolean,
        default: true
    }
  },
  methods: {
    menuPath ({label, path, type, _id}) {
        if (type === 'url') return path;
        return `${path}?category=${label}&categoryId=${_id}&path=${path}`;
    },
    linkPage (item) {
        const envMest = this.$parent.$parent.selectMenu;
        if (envMest) envMest();
        this.$router.push({
            path: this.menuPath(item)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.children-menu{
    display: flex;
    outline: none;
    /deep/ .el-submenu__icon-arrow{
        position: static;
        vertical-align: middle;
        margin-left: 8px;
        margin-top: -3px;
    }
}
</style>