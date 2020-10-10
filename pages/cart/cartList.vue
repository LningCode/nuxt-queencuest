<template>
<div class="order-section mb-2">
    <div class="section-title">
        <p>
            <i class="el-icon-s-goods"></i> SHOPPING CART <span class="sum">( {{cartList.length}} )</span>
        </p>
        <span class="dist">Direct mail to the world, expected to arrive in <span style="color: #F56C6C">15-50</span> days</span>
    </div>
    <div class="order-wrapper">
        <div class="shopping-item" v-for="(item, index) in cartList" :key="index">
            <div class="shopping-img">
                <img width="120px" src="https://res.gucci.cn/resources/2019/10/18/15713745354415266_g_370X370.jpg" alt="">
            </div>
            <div class="shopping-details">
                <h5 class="shopping-name mb-1">{{item.productName}}</h5>
                <p>N0: {{setCartNo(item)}}</p>
                <p>Color: {{setCartAttr(item, 'colorNo')}}</p>
                <p>Size: {{setCartAttr(item, 'sizeNo')}}</p>
                <p>Stock: {{productNumMax(item)}}</p>
                <!-- Settlement 页面不显示 -->
                <p v-if="!type" class="mt-2">FREE SHIPPING: <span style="color: #F56C6C">15-50</span> Days</p>
                <!-- Settlement 页面不显示 -->
                <div class="btns mt-1" v-if="!type">
                    <Buttons @click="headlerForLater(item)" size="small" text="Save for later" />
                    <Buttons @click="removeCart(item)" size="small" text="Delete" />
                </div>
            </div>
            <div class="shopping-num">
                <div class="total-num">US$ {{productPrice(item)}}</div>
                <!-- Settlement 页面不显示 -->
                <div class="total-del" v-if="!type">
                    <del>US$ {{productPrice(item)}}</del>
                </div>
                <!-- Settlement 页面不显示 -->
                <div class="total-number mt-1" v-if="!type">
                    <label for="label">Qty:&nbsp;</label>
                    <el-input-number :value="item.productNum" @change="handleChange($event, item)" :min="1" :max="productNumMax(item)" size="mini" />
                </div>
                <div class="total-number mt-1" v-else>
                    Qty: {{item.productNum}}
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    props: {
        // 表示是否确认订单
        type: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState({
            cartList: state => state.cartList
        }),
        setCartAttr () {
            return (item, type) => {
                const json = item[type] || {};
                return json.name
            }
        },
        setCartNo () {
            return ({productInfo = {}}) => {
                return productInfo.model
            }
        },
        // 计算商品价格
        productPrice () {
            return ({salePrice = 0, productNum = 0} ={}) => {
                return (salePrice * productNum).toFixed(2);
            }
        },
        // 设置商品最大值（库存数量）
        productNumMax () {
            return ({productInfo = {}}) => {
                const {quantity} = productInfo;
                return quantity;
            }
        }
    },
    methods: {
        // 删除购物车商品
        removeCart ({_id}) {
            this.$confirm('Confirm delete ?', 'Prompt').then(async () => {
                await this.createHttp('$post', 'removeCart', {idList: [_id]});
                this.fetchCartList();
                this.notify('success deleted!');
            }).catch(_ => {});
        },
        fetchCartList () {
            this.$store.dispatch('fetchCartList');
        },
        // 添加收藏
        async headlerForLater ({productId}) {
            const getCollect = await this.createHttp('$get', `getCollect?productId=${productId}`);
            if (getCollect) return this.notify();
            await this.createHttp('$post', 'collect', { productId });
            this.notify();
        },
        // 购物车商品数量加减
        async handleChange (productNum, {_id}) {
            await this.createHttp('$post', 'editCart', {id: _id, productNum});
            this.fetchCartList();
        },
        notify (message = 'Your item has been saved for later!') {
            this.$notify.success({ message, showClose: false });
        },
        createHttp (type, url, param = {}) {
            return new Promise((resolve) => {
                this.$axios[type](url, param).then(({data}) => {
                    resolve(data)
                }).catch(() => {});
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.order-section{
    margin-right: 20px;
    background: #fff;
    .section-title{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        align-items: center;
        padding: 15px;
        .sum, .dist{
            font-size: 12px;
            color: #606266;
        }
    }
    .order-wrapper{
        .shopping-item{
            display: flex;
            padding: 20px;
        }
        .shopping-img{
            margin-right: 20px;
        }
        .shopping-details{
            flex: 1;
            font-size: 13px;
            color: #606266;
            .sub{
                color: #333;
                font-size: 15px;
            }
            .shopping-name{
                font-size: 15px;
            }
            .btns .el-button{
                width: auto;
            }
        }
        .shopping-num{
            text-align: right;
            .total-del, .total-number{
                color: #999;
            }
        }
    }
}
@media only screen and (max-width: 1200px){
    .order-section{
        margin-right: 0;
    }
}
</style>