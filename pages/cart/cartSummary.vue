<template>
<div class="order-cart-summary">
    <div class="order-summary mb-2">
        <h5 class="shopping-title pb-1 mb-2">
            <span class="lab">Order subtotal</span>
            <span class="num">Selected {{productAmount}} Items</span>
        </h5>
        <div class="cart-info mb-2">
            <p>
                <label>Subtotal</label>
                <span>US$ {{productPrice}}</span>
            </p>
            <p>
                <label>Standard Shipping Fee</label>
                <span style="color: #F56C6C">FREE</span>
            </p>
            <p>
                <label>GRAND TOTAL</label>
                <span class="total">US$ {{productPriceTotal}}</span>
            </p>
        </div>
        <!-- 优惠券模块 -->
        <div class="cart-coupon mb-2" >
            <el-collapse class="collapse-block">
                <el-collapse-item title="USE COUPON CODE">
                    <Notdata text="No coupons" />
                    <!-- <div class="coupons" v-for="(item, index) in couponList" :key="index">
                        <div class="info" @click="couponsCheckbox(item.no)">
                            <h4>US$ <span>{{item.price}}</span> {{item.type}}</h4>
                            <p>{{item.desc}}</p>
                            <p>Period of use: {{item.startTime}} - {{item.endTime}}</p>
                        </div>
                        <el-checkbox :value="checkedCoupon === item.no" @change="couponsCheckbox(item.no)" />
                    </div> -->
                </el-collapse-item>
            </el-collapse>
        </div>
        <div class="cart-det pb-2">
            <p>Description:</p>
            <p>If the order is not paid within 1 hour after the order is submitted, the order will be automatically cancelled by the system. Please complete the payment as soon as possible to ensure that the goods can be delivered in time.</p>
        </div>
        <div class="mt-1" v-for="(item, index) in cartBtns" :key="index">
            <Buttons
                :path="item.path"
                :type="item.type"
                :icon="item.icon"
                :text="item.text"
                @click="headlerCartBtn(item)"
            />
        </div>
    </div>
    <div class="order-summary">
        <h5 class="summary-title pb-2">
            <i class="el-icon-truck"></i>
            <span class="text">Standard Shipping Fee</span>
        </h5>
        <el-menu
            :default-openeds="['1']"
            text-color="#606266"
            active-text-color="#ffd04b">
            <el-submenu index="1">
                <template slot="title"><span>Need help?</span></template>
                <el-menu-item index="1-1">
                    <Buttons path="/personal/contactus" size="small" icon="el-icon-chat-dot-round" text="在线顾问" />
                </el-menu-item>
                <el-menu-item index="1-2">
                    <Buttons size="small" icon="el-icon-message" text="1232434e@mile.com" />
                </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template slot="title"><span>Free gift wrapping</span></template>
                <el-menu-item index="2-1">
                    <img src="https://res.gucci.cn/images/checkout/bags.jpg" alt="">
                </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><span>Delivery Method</span></template>
                <el-menu-item index="3-1">The first logistics will arrive in 3-7 days</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title"><span>Return policy</span></template>
                <el-menu-item index="4-1">
                    <span>The official website provides you with 14 days of ease</span>
                    <nuxt-link to="/login/perfect">Return and exchange service</nuxt-link>
                </el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title"><span>payment method</span></template>
                <el-menu-item index="5-1">Support contact customer service for payment</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
const couponList = [
    {
        no: 'co001',
        price: 100,
        type: '通用优惠券',
        desc: '订单满428元可以使用（不含邮费）',
        startTime: '2020/01/01',
        endTime: '2020/10/19'
    },
    {
        no: 'co002',
        price: 200,
        type: '通用优惠券',
        desc: '订单满566元可以使用（不含邮费）',
        startTime: '2020/01/01',
        endTime: '2020/11/19'
    }
];

export default {
    props: {
        cartBtns: {
            type: Array,
            default() {
                return [
                    {
                        path: '/cart/Settlement',
                        icon: 'el-icon-bank-card',
                        text: 'CHECKOUT',
                        type: 'info'
                    },
                    {
                        path: '/',
                        icon: 'el-icon-sell',
                        text: 'Continue Shopping',
                        type: ''
                    }
                ]
            }
        }
    },
    data () {
        return {
            couponList,
            checkedCoupon: null
        }
    },
    computed: {
        ...mapState({
            cartList: state => state.cartList,
            orderInfo: state => state.createOrderInfo
        }),
        // 计算商品数量
        productAmount () {
            return this.cartList.reduce((pre, cur) => {
                return pre + (cur.productNum || 0);
            }, 0);
        },
        // 计算商品价格总和
        productPrice () {
            const sum = this.cartList.reduce((pre, cur) => {
                const pic = (cur.salePrice || 0); // 商品价格
                const num = (cur.productNum || 0); // 数量
                return pre + (pic * num);
            }, 0);
            return sum.toFixed(2);
        },
        // 计算商品价格总和（包含邮费等）
        productPriceTotal () {
            const sum = this.cartList.reduce((pre, cur) => {
                const pic = (cur.salePrice || 0); // 商品价格
                const num = (cur.productNum || 0); // 数量
                return pre + (pic * num);
            }, 0);
            return sum.toFixed(2);
        }
    },
    methods: {
        headlerCartBtn (item) {
            const {address} = this.orderInfo;
            if (!address) return this.$message('Delivery address required');
            const option = {
                ...this.orderInfo,
                orderStatus: 1,
                paymentStatus: 1,
                total: this.productPriceTotal,
                purchaseQuantity: this.productAmount,
                productInfo: this.mapProduct()
            }
            this.$axios.$post('createOrder', option).then(() => {
                console.log(1)
            });
        },
        mapProduct () {
            const list = [];
            this.cartList.forEach(({productNum, productId, salePrice, productImage, productName}) => {
                list.push({
                    productNum,
                    productId,
                    salePrice,
                    productImage,
                    productName
                });
            });
            return list;
        }
    }
}
</script>

<style lang="scss" scoped>
.order-cart-summary{
    position: sticky;
    top: 10px;
    .order-summary{
        background: #fff;
        padding: 20px;
        .shopping-title{
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #eee;
            color: #606266;
            font-weight: 400;
            color: #606266;
            .num{
                color: #333;
            }
        }
        .cart-info{
            p{
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: 13px;
                color: #606266;
                padding: 10px 0;
                .total{
                    font-size: 20px;
                }
            }
        }
        .cart-coupon{
            .coupons{
                display: flex;
                justify-content: space-between;
                padding: 10px;
                .info{
                    font-size: 12px;
                    color: #606266;
                    width: 100%;
                }
            }
        }
        .cart-det{
            font-size: 12px;
            color: #999;
        }
        .summary-title{
            text-align: center;
        }
        .el-menu{
            border-right: none;
        }
        .el-submenu{
            border-top: 1px solid #eee;
            .el-menu-item{
                height: auto;
                padding: 0 20px 15px !important;
                line-height: inherit;
                color: #999 !important;
                &:focus, &:hover{
                    background: #fff;
                }
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