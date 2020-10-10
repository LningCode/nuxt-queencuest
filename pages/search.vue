<template>
<el-main>
    <div class="container">
        <div class="product-grid" v-if="productList.length">
            <GoodsList :list="productList" />
            <div class="page-data mt-3">
                <Buttons v-if="noMoredata" text="No more products" />
                <Buttons v-else @click="headlerLoadMore" text="load more" />
            </div>
        </div>
        <!-- 没有搜索到商品显示 -->
        <Notdata v-else text="No products found" :w="100" :h="100" />
    </div>
</el-main>
</template>

<script>
import GoodsList from '@/pages/product/GoodsList'

export default {
    data () {
        return {
            productList: [],
            searchFrom: {
                pageNo: 1,
                pageMax: 2
            }
        }
    },
    components: { GoodsList },
    computed: {
        noMoredata () {
            const {pageNo, total, pageMax} = this.searchFrom;
            return (pageNo * pageMax) >= (total || 0);
        }
    },
    mounted () {
        this.searchInfo();
    },
    methods: {
        headlerLoadMore () {
            this.searchFrom.pageNo++;
            this.searchInfo();
        },
        searchInfo () {
            this.searchFrom['search'] = this.$route.query.q;
            this.$axios.$get('search', {params: this.searchFrom}).then(({data = {}}) => {
                this.searchFrom = data.pageInfo;
                this.productList = this.searchFrom.pageNo === 1 ? data.list : [...this.productList, ...data.list];
            });
        }
    },
    watch: {
        $route: {
            deep: true,
            handler () {
                this.searchFrom = {
                    pageNo: 1,
                    pageMax: 2
                }
                this.searchInfo();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
// .page-data{
//     text-align: center;
//     /deep/ .el-button{
//         max-width: 275px;
//     }
// }
// .Notdata{
//     display: flex;
//     justify-content: center;
//     align-items: center;
// }
</style>