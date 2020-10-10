<template>
<div class="product-wrap">
    <el-tabs v-model="activeTabs" @tab-click="queryProduct">
        <el-tab-pane :label="i.name" :name="i.type" v-for="(i,k) in tabsPane" :key="k">
            <GoodsList :list="productBlock" />
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
import GoodsList from '@/pages/product/GoodsList'

export default {
    components: {
        GoodsList
    },
    data () {
        return {
            tabsPane: [
                {
                    name: 'FEATURED',
                    type: 'featured'
                },
                {
                    name: 'POPULAR',
                    type: 'popular'
                },
                {
                    name: 'BEST SELLER',
                    type: 'bestSeller'
                }
            ],
            activeTabs: 'featured',
            productBlock: []
        }
    },
    mounted () {
        this.queryProduct();
    },
    methods: {
        queryProduct () {
            this.$axios.$get(`productBlock?type=${this.activeTabs}`).then(({data}) => {
                this.productBlock = data;
            }).catch(err => {})
        }
    }
}
</script>

<style lang="scss" scoped>
.product-wrap{
    /deep/ .el-tabs{
        .el-tabs__content{
            margin-top: 50px;
            overflow: visible;
        }
        .el-tabs__item{
            color: #909399;
            &.is-active{
            color: #303133;
            }
        }
        .el-tabs__active-bar{
            background-color: #909399;
        }
        .el-tabs__nav-scroll{
            display: flex;
            justify-content: center;
        }
        .el-tabs__nav-wrap::after{
            background-color: transparent;
        }
    }
}
</style>