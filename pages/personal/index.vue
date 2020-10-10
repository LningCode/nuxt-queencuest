<template>
<div class="personal-page mt-3 mb-3">
    <div class="min-container">
        <div class="account-wrapper">
            <el-row>
                <el-col :xs="24" :lg="12">
                    <Userinfo class="mr2 mb4" />
                </el-col>
                <!-- 收货地址显示 -->
                <el-col :xs="24" :lg="12">
                    <Address class="mr2 mb4" />
                </el-col>
                <!-- 订单显示 -->
                <!-- <el-col :lg="24">
                    <Order />
                </el-col> -->
                <!-- 心愿单 -->
                <el-col :lg="24">
                    <Wish class="mt4" />
                </el-col>
            </el-row>
        </div>
    </div>
</div>
</template>

<script>
import Address from '@/pages/personal/account/address';
import Order from '@/pages/personal/account/order';
import Wish from '@/pages/personal/account/wish';
import Userinfo from '@/pages/personal/account/userInfo';

export default {
    asyncData({store}) {
        // return Promise.all([
        //     store.dispatch('personal/addressList')
        // ])
    },
    components: {
        Address,
        Order,
        Wish,
        Userinfo
    }
}
</script>
<style lang="scss" scoped>
.personal-page{
    .account-wrapper{
        .mb4{
            margin-bottom: 4px;
        }
        .mt4{
            margin-top: 4px;
        }
        .ml2{
            margin-left: 2px;
        }
        .mr2{
            margin-right: 2px;
        }
    }
    @media only screen and (max-width: 1200px){
        .account-wrapper{
            .ml2{
                margin-left: 0;
            }
            .mr2{
                margin-right: 0;
            }
        }
    }
}
</style>