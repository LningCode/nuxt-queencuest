<template>
<el-menu @select="selectMenu" class="header-menu" :class="`header-${menuMode}`" :default-active="$route.path" :mode="menuMode" router>
    <menuTree :menu="navMenu" />
</el-menu>
</template>

<script>
import {mapState} from 'vuex';
import MenuTree from '@/components/MenuTree';
import Router from 'vue-router'

export default {
    components: { MenuTree },
    props: {
        menuMode: {
            type: String,
            default: 'horizontal'
        }
    },
    computed: {
        ...mapState({
            navMenu: state => state.navMenu
        })
    },
    methods: {
        selectMenu () {
            // 关闭Drawer导航
            const envMest = this.$parent.$parent.openDrawerMenu;
            if (envMest) envMest(false);
        }
    },
    mounted() {
        if (!this.navMenu.length) {
            this.$store.dispatch('fetchVavMenu');
        }
        // 防止饿了么点击index路由报错
        const originalPush = Router.prototype.push
        Router.prototype.push = function push(location) {
            return originalPush.call(this, location)
        }
    }
}
</script>

<style lang="scss" scoped>
.header-menu{
    display: flex;
    justify-content: center;
    border-bottom: none;
    background: none;
    &.header-vertical{
        display: block;
        border-right: none;
        margin-top: 0;
    }
}
@media only screen and (max-width: 767px){
    .header-horizontal{
        display: none;
    }
}
</style>
