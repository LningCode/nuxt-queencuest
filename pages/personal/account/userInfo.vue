<template>
<div class="userInfo-block">
    <el-divider>
        <i class="el-icon-s-custom"></i>
        <span>MY ACCOUNT</span>
    </el-divider>
    <div class="profile-info pt-1">
        <div class="delivery-profile">
            <h5>Name</h5>
            <p class="mb-1">{{baseInfo.firstName}} {{baseInfo.lastName}} {{appellation(baseInfo)}}</p>
            <h5>Phone</h5>
            <p class="mb-1">{{baseInfo.phone}}</p>
            <h5>Email</h5>
            <p class="mb-1">{{baseInfo.email}}</p>
            <h5>Birthday</h5>
            <p class="mb-1">{{birthday(baseInfo)}}</p>
            <h5>Password</h5>
            <p class="mb-1">*******</p>
            <h5>Address Line</h5>
            <p>{{baseInfo.city}}, {{baseInfo.state}}, {{baseInfo.addressLine}}, {{baseInfo.country}}</p>
        </div>
        <Buttons class="tray-btns" path="/personal/profile" size="mini" text="EDIT" />
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
        ...mapState({
            baseInfo: state => state.baseInfo || {}
        }),
        // 称呼
        appellation () {
            return ({appellation} = {}) => {
                switch (Number(appellation)) {
                    case 1:
                        return 'Mr.'
                        break;
                    case 2:
                        return 'Ms.'
                        break;
                    case 3:
                        return 'Miss'
                        break;
                    case 4:
                        return 'Not to disclose'
                        break;
                    default:
                        return 'Not to disclose'
                        break;
                }
            }
        },
        // 生日
        birthday () {
            return ({birthday} = {}) => {
                if (!birthday) return 'Unmodified birthday';
                return birthday;
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.userInfo-block{
    background: #fff;
    padding: 20px;
    .el-divider{
        margin: 15px 0;
    }
    .profile-info{
        position: relative;
        .tray-btns{
            position: absolute;
            top: 0;
            right: 0;
            width: auto;
        }
    }
    .delivery-profile p{
        font-size: 14px;
        color: #606266;
    }
}
</style>