<template>
<el-main>
    <div class="container" v-if="showProductInfo">
        <BreadCrumb :list="[{name: this.productInfo.productName}]" />
        <div class="product-content mt-3">
            <el-row :gutter="30">
                <el-col :xs="24" :sm="14" :md="14" :lg="15">
                    <!-- 商品图片列表 -->
                    <Preview />
                </el-col>
                <el-col :xs="24" :sm="10" :md="10" :lg="9">
                    <!-- 商品信息 -->
                    <Gallery />
                </el-col>
            </el-row>
        </div>
        <!-- 商品A+/评论 -->
        <Stacked class="mt-5" />
        <!-- 相关产品 -->
        <div class="product-related">
            <FloorHeader class="mt-3" title="YOU MAY ALSO LIKE" />
            <GoodsList class="mt-2" :list="similarProduct" />
        </div>
    </div>
    <div class="not-found mb-5" v-else>
        <Notdata text="Page Not Found" :w="100" :h="100" />
        <router-link to="/">
            <el-button size="medium">CONTINUE SHOPPING</el-button>
        </router-link>
    </div>
</el-main>
</template>

<script>
import GoodsList from '@/pages/product/GoodsList'
import FloorHeader from '@/pages/share/FloorHeader'
import Gallery from './details/gallery'
import Preview from './details/preview'
import Stacked from './details/stacked'


export default {
    data () {
        return {
            // 相似商品推荐
            similarProduct: []
        }
    },
    computed: {
        productInfo () {
            return this.$store.state.productInfo;
        },
        showProductInfo () {
            return Object.keys(this.productInfo).length
        }
    },
    components: {
        FloorHeader,
        GoodsList,
        Gallery,
        Preview,
        Stacked
    },
    mounted () {
        this.queryProduct();
        const { productId } = this.$route.query;
        if (productId) this.queryDetails(productId);
    },
    methods: {
        queryProduct () {
            this.$axios.$get('productBlock?type=similar').then(({data}) => {
                this.similarProduct = data;
            }).catch(err => {})
        },
        queryDetails (productId) {
            this.$axios.$get(`productDetails?productId=${productId}`).then(({data}) => {
                this.$store.commit('keepProductInfo', data);
            }).catch(() => {
                this.$notify.error({
                    title: '获取商品失败'
                });
            });
        }
    },
    watch: {
        $route({query}){
            this.queryDetails(query.productId);
        }
    }
}
</script>

<style lang="scss" scoped>
.not-found{
    text-align: center;
}
</style>