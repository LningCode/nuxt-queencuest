<template>
<el-main>
    <div class="container">
        <div class="baseline-small mb-2">
            <BreadCrumb :list="[{name: paramInfo.category}]" />
            <div class="sort-toolbar mt-2">
                <span class="grid-icon el-icon-s-grid"></span>
                <div class="sort-info">
                    <span class="count">Showing {{pageInfo.total}} of {{goodsList.length}} results</span>
                    <span>Sort by：</span>
                    <el-link type="info" @click="headlerPriceSort">
                        <i :class="`el-icon-${priceSort}`"></i>By price
                    </el-link>
                </div>
            </div>
        </div>
        <div class="category-list">
            <GoodsList :list="goodsList" />
        </div>
        <div class="pagination-info sort-toolbar mt-1">
            <span class="count">Showing {{pageInfo.total}} of {{goodsList.length}} results</span>
            <el-pagination @current-change="pageChange" background :page-size="20" layout="prev, pager, next" :total="pageInfo.total" />
        </div>
    </div>
</el-main>
</template>

<script>
import FloorHeader from '@/pages/share/FloorHeader'
import GoodsList from '@/pages/product/GoodsList'

export default {
    data() {
        return {
            paramInfo: this.paramInfos(),
            pageInfo: {},
            goodsList: [],
            priceSort: 'top'
        }
    },
    components: {
        FloorHeader,
        GoodsList
    },
    mounted () {
        this.queryCategory();
    },
    methods: {
        // 价格排序（升/降）
        headlerPriceSort () {
            this.goodsList.sort((a, b) => {
                if (this.priceSort === 'top') {
                    this.priceSort = 'bottom';
                    return b.productPrice - a.productPrice;
                }
                this.priceSort = 'top';
                return a.productPrice - b.productPrice;
            });
        },
        // 翻页查询
        pageChange (pageNo) {
            this.paramInfo.pageNo = pageNo;
            this.queryCategory();
        },
        queryCategory () {
            this.paramInfo.category = this.$route.query.category;
            this.$axios.$get('goodsCategory', {
                params: this.paramInfo
            }).then(({data}) => {
                const {list, pageInfo} = data || {};
                this.goodsList = list;
                this.pageInfo = pageInfo;
            })
            .catch(err => {})
        },
        paramInfos () {
            return {
                sort: 0,
                category: '',
                pageNo: 1,
                pageMax: 10,
                total: 0
            }
        }
    },
    watch: {
        $route (query) {
            this.paramInfo.pageNo = 1;
            this.queryCategory();
        }
    }
}
</script>

<style lang="scss" scoped>
.sort-toolbar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 20px;
    color: #909399;
    font-size: 12px;
    .grid-icon{
        font-size: 24px;
    }
    .sort-info{
        display: flex;
        align-items: center;
        .count{
            margin-right: 20px;
        }
        .crumb-sepa{
            margin: 0 5px;
        }
    }
}
</style>