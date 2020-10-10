<template>
<div class="product-gallery">
    <h3 class="prod-name mb-1">{{productInfo.productName}}</h3>
    <p class="product-no">NO SKU：{{productInfo.productModel}}</p>
    <h2 class="prod-pice mt-3">
        <span style="margin-right: 8px">US$ {{productInfo.productPrice}}</span>
    </h2>
    <el-collapse class="mt-2" v-model="activeNames">
        <el-collapse-item title="PRODUCT DESCRIPTION" name="1">
            <div class="content" v-html="productInfo.productContent"></div>
        </el-collapse-item>
    </el-collapse>
    <p class="ship-info mt-2">
        The delivery delay of this product is 7-30 working days. If it is out of stock, Queen Customer has the right to cancel the order and will not bear any legal responsibility. The customer service team will contact you to cancel the order and get a refund. By conducting online transactions, you have agreed to the above terms.
    </p>
    <el-popover
        class="contact-purchase"
        placement="top-start"
        trigger="hover"
        content="Contact us manual purchase discount 20%">
        <el-badge value="hot" slot="reference">
            <a :href="whatsapp" target="_blank" title="Click here Chat us by WhatsApp">
                <Buttons type="info" icon="el-icon-service" text="Contact us to buy" />
                <!-- <Buttons class="mt-2" icon="el-icon-goods" text="Add to cart" /> -->
            </a>
        </el-badge>
    </el-popover>
    <!-- 添加/移除商品收藏 -->
    <div class="add-favorites mt-2">
        <Buttons @click="addFavorites()" icon="el-icon-star-off" text="Add to favorites" />
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        productInfo () {
            return this.$store.state.productInfo;
        }
    },
    data() {
        return {
            activeNames: '1',
            collectState: false,
            whatsapp: 'https://web.whatsapp.com/send?phone=+8615817043998&text=Hi'
        }
    },
    methods: {
        // 添加/取消商品收藏
        addFavorites () {
            this.$store.dispatch('fetchCollect', { productId: this.productInfo._id, type: 'addCollect' }).then(({data}) => {
                const text = data ? '宝贝收藏成功' : '宝贝已经添加到心愿单';
                this.$notify({ title: `${text}`, type: 'success' });
            }).catch(err => {
                this.$notify.error({ title: '收藏失败' });
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.product-gallery{
    position: sticky;
    top: 10px;
    background: #fff;
    padding: 20px;
    color: #303133;
    .product-no{
        font-size: 13px;
    }
    .prod-pice{
        color: #F56C6C;
    }
    .contact-purchase{
        display: flex;
        flex-flow: column;
        margin-top: 30px;
        /deep/ .el-button{
            margin-left: 0;
        }
    }
    .ship-info, .content{
        font-size: 13px;
        color: #909399;
    }
}
</style>