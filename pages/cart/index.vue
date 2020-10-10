<template>
<div class="chat-views mb-4">
    <div class="login-banner mt-1 mb-4">
        <p class="log">saear</p>
        <h2 class="my-tit">Shopping Bag</h2>
    </div>
    <div class="container">
        <!-- 没有商品默认图标 -->
        <div class="not-cartList pb-5" v-if="pageTotal">
            <Notdata text="There are no items in the shopping bag" />
            <Buttons class="mt-3" icon="el-icon-goods" path="/" text="Go add baby" />
        </div>
        <el-row v-else>
            <el-col :sm="24" :lg="15">
                <CartList />
            </el-col>
            <el-col :sm="24" :lg="9">
                <CartSummary />
            </el-col>
        </el-row>
    </div>
</div>
</template>

<script>
import CartSummary from './cartSummary';
import CartList from './cartList';

export default {
    data() {
        return {
        }
    },
    components: {
        CartSummary,
        CartList
    },
    computed: {
        pageTotal(){
            const {cartList = []} = this.$store.state;
            return cartList.length === 0
        }
    }
}
</script>

<style lang="scss" scoped>
.chat-views{
    .not-cartList{
        text-align: center;
        .el-button{
            width: auto;
        }
    }
    /deep/ .page-wrapper{
        display: flex;
        justify-content: center;
    }
    .login-banner{
        height: 300px;
        background: url('../../assets/img/banner.jpg') no-repeat center top;
        background-size: cover;
        padding-top: 95px;
        .my-tit{
            text-align: center;
            font-size: 36px;
            color: #fff;
            font-weight: 200;
            line-height: 36px;
        }
        .log{
            text-align: center;
            font-size: 18px;
            color: #fff;
            margin-bottom: 13px;
        }
    }
    @media only screen and (max-width: 768px){
        .order-wrapper{
            .shopping-item{
                display: block !important;
            }
            .shopping-num{
                position: absolute;
            }
        }
    }
}
</style>
