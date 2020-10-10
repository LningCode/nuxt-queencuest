<template>
<el-drawer size="325px" title="MENU" direction="ltr" :visible.sync="visible">
    <div class="drawer-menunav">
        <MenuNav menuMode="vertical" />
    </div>
</el-drawer>
</template>

<script>
import MenuNav from '@/pages/share/MenuNav'

export default {
    components: {MenuNav},
    data () {
        return {
            visible: false
        }
    },
    methods: {
        openDrawerMenu(state = true) {
            this.visible = state;
        }
    }
}
</script>

<style lang="scss" scoped>
/deep/ .el-drawer, /deep/ .el-drawer__header span{
    outline: none;
}
/deep/ .el-drawer__body{
    height: calc(100% - 71px);
    padding-bottom: 20px;
    box-sizing: border-box;
    .margin-bottom{
        margin-bottom: 20px;
    }
    .children-menu{
        display: block;
    }
}
.drawer-menunav{
    height: 100%;
    overflow-y: scroll;
}
</style>