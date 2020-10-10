<template>
<div class="wish-block">
    <el-divider>
        <i class="el-icon-star-off"></i>
        <span>心愿单</span>
    </el-divider>
    <el-row class="pt-2" v-if="collectList.length">
        <el-col :xs="24" :sm="8" :md="8" :lg="6" v-for="(item, index) in collectList" :key="index">
            <div class="grid-cover">
                <i class="el-icon-close" @click="headlerRemove(item)" />
                <nuxt-link :to="`/product/details?productId=${item.productId}`">
                    <div class="grid-img">
                        <img width="100%" :src="item.productImage" alt="">
                    </div>
                    <h4 class="grid-name mb-1">{{item.productName}}</h4>
                </nuxt-link>
                <p class="grid-price mb-1">US$ {{item.productPrice}}</p>
                <!-- <nuxt-link class="add-cart" to="/cart">
                    <span>加入购物袋</span>
                    <i class="el-icon-arrow-right"></i>
                </nuxt-link> -->
            </div>
        </el-col>
    </el-row>
    <!-- 没有收货地址显示默认图标 -->
    <div class="pt-5 pb-5" v-else>
        <Notdata text="No favorite products added" />
    </div>
</div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    data () {
        return {
            collectList: []
        }
    },
    mounted () {
        this.queryCollectList();
    },
    methods: {
        ...mapActions(['fetchCollect']),
        // 获取商品收藏列表
        queryCollectList () {
            this.$axios.$get('collectList').then(({data}) => {
                const list = data || [];
                this.collectList = list.map(({_id, productId}) => {
                    return {
                        collecId: _id,
                        productName: productId.productName,
                        productPrice: productId.productPrice,
                        productImage: productId.productImage.url,
                        productId: productId._id
                    }
                });
            }).catch(_ => {});
        },
        // 取消收藏
        headlerRemove ({productId}) {
            this.$confirm('Confirm delete ?', 'Prompt').then(() => {
                this.fetchCollect({ productId, type: 'unCollect' }).then(({data}) => {
                    this.queryCollectList();
                    this.$notify({ title: '取消成功', type: 'success' });
                }).catch(err => {
                    this.$notify.error({ title: '取消失败' });
                });
            }).catch(err => {});
        }
    }
}
</script>

<style lang="scss" scoped>
.wish-block{
    background: #fff;
    padding: 20px;
    .el-divider{
        margin: 15px 0;
    }
    .grid-cover{
        position: relative;
        background: #e7e7e7;
        border: 1px solid #fff;
        text-align: center;
        padding: 15px 10px 20px;
        color: #606266;
        .el-icon-close{
            position: absolute;
            top: 15px;
            right: 15px;
            font-size: 30px;
            cursor: pointer;
        }
        .grid-name{
            color: #606266;
            height: 35px;
            overflow: hidden;
            font-size: 13px;
        }
        .add-cart{
            color: #606266;
            font-size: 13px;
        }
    }
}
</style>