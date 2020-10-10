<template>
<div class="container mt-3 mb-3">
    <el-row>
        <el-col :sm="24" :lg="15">
            <div class="cart-section mb-2">
                <Address :isChecked="true" class="address-item" />
                <div class="address-slot mt-2">
                    <h2 class="title pb-1">
                        <i class="el-icon-bank-card"></i>
                        <span>PAYMENT METHOD</span>
                    </h2>
                    <div class="pay-info pb-2">
                        <el-radio-group v-model="cardNo" @change="radioChange">
                            <el-radio :label="item.label" v-for="(item, index) in paymentList" :key="index">
                                <h4>
                                    <span>{{item.title}}</span>
                                    <el-popover
                                        v-if="item.pop"
                                        width="300"
                                        trigger="hover"
                                        :content="item.pop">
                                        <i class="el-icon-question" slot="reference"></i>
                                    </el-popover>
                                </h4>
                                <img class="pay-icon" v-if="item.icon" :src="item.icon" alt="">
                                <p class="payment-desc" v-if="item.desc && (item.label === cardNo)">{{item.desc}}</p>
                            </el-radio>
                        </el-radio-group>
                    </div>
                </div>
                <CartList :type="true" />
            </div>
        </el-col>
        <el-col class="col-cart-summary" :sm="24" :lg="9">
            <CartSummary :cartBtns="[
                {
                    text: 'CONTINUE CHECKOUT',
                    type: 'info'
                },
                {
                    path: '/cart',
                    icon: 'el-icon-back',
                    text: 'Edit Cart'
                }]"  />
        </el-col>
    </el-row>
</div>
</template>

<script>
import Address from '@/pages/personal/account/address';
import creditCard from '@/assets/img/creditCard.gif';
import paypal from '@/assets/img/paypal.png';
import CartList from './cartList';
import CartSummary from './cartSummary';

const paymentList = [
    {
        label: 1,
        title: 'Credit or Debit Card',
        icon: creditCard,
        desc: 'Click the "CONTINUE CHECKOUT" button on the right side of this page to be redirected to the card payment page where you are required to enter your credit card information. We do not collect or save any credit/debit card or personal information entered during payment.'
    },
    {
        label: 2,
        title: 'Paypal',
        pop: `If you don't have a paypal account,you can also pay via paypal with your credit card or bank debit card. (including local cards)`,
        icon: paypal,
        desc: 'Click the "CONTINUE CHECKOUT" button on the right side of this page to be redirected to the Paypal payment page. If Paypal does not support your currency, you will automatically be charged in US dollars.'
    },
    {
        label: 3,
        title: '联系客服付款',
        icon: '',
        desc: '在线支付'
    }
];

export default {
    asyncData({store}) {
        return Promise.all([
            store.dispatch('personal/addressList')
        ])
    },
    head () {
        return {
            script: [
                {src: 'https://www.paypal.com/sdk/js?client-id=sb&currency=USD'}
            ]
        }
    },
    data() {
        return {
            cardNo: 2,
            paymentList
        }
    },
    components: {
        Address,
        CartList,
        CartSummary
    },
    mounted () {
        this.storeCommit({ paymentCard: this.cardNo });
    },
    methods: {
        radioChange (cardNo) {
            this.storeCommit({ paymentCard: cardNo });
        },
        // 保存选中支付方式编号
        storeCommit (param) {
            this.$store.commit('pushOrderInfo', param);
        }
    }
}
</script>

<style lang="scss" scoped>
.cart-section{
    margin-right: 20px;
    background: #fff;
    /deep/ .order-section{
        margin-right: 0;
    }
    .address-slot{
        padding: 20px;
        .title{
            color: #606266;
            font-size: 18px;
            border-bottom: 1px solid #eee;
        }
    }
    .pay-info{
        /deep/ .el-radio-group{
            display: block;
            .el-radio{
                display: flex;
                margin-right: 0;
                margin-top: 30px;
                .el-radio__input{
                    display: flex;
                    align-items: center;
                    padding-left: 10px;
                    margin-right: 10px;
                }
                .el-radio__label{
                    width: 100%;
                    display: block;
                    white-space: normal;
                    .pay-icon{
                        margin-top: 8px;
                        display: block;
                    }
                    .payment-desc{
                        margin-top: 15px;
                        background: #f1f1f1;
                        padding: 15px;
                        border-radius: 3px;
                        font-size: 13px;
                        font-weight: 400;
                    }
                }
            }
        }
    }
    /deep/ .address-bar{
        text-align: center;
        .el-button{
            width: 240px;
        }
    }
}
.col-cart-summary{
    position: sticky;
    top: 10;
}
@media only screen and (max-width: 1200px){
    .cart-section{
        margin-right: 0;
    }
}
</style>
