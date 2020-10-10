<template>
<div class="address-block">
    <el-divider>
        <i class="el-icon-location-information"></i>
        <span>Saear Address</span>
    </el-divider>
    <!-- 没有收货地址显示默认图标 -->
    <Notdata text="No shipping address added" v-if="addressList.length === 0" class="mt-5 mb-4" />
    <div class="address-info pt-1" v-for="(item, index) in addressList" :key="index">
        <!-- 个人中心页面不需要开启选中 -->
        <div class="address-checkbox" v-if="isChecked">
            <el-checkbox :value="addressNo === item._id" @change="addressChecked(item)" />
        </div>
        <div class="delivery-address" @click="isChecked && addressChecked(item)">
            <h5 class="name mb-1">{{item.lastName}} {{item.firstName}}</h5>
            <p class="phone mb5">{{item.phone}}</p>
            <p class="ads mb5">{{item.country}} {{item.city}} {{item.state}}</p>
            <p class="ads mb5">{{item.addressLine1}}</p>
            <p class="ads">{{item.addressLine2}}</p>
        </div>
        <div class="tray-btns mt-1">
            <Buttons @click="removeAddress(item, index)" size="mini" text="REMOVE" />
            <div class="mt-1">
                <Buttons @click="editAddress(item)" size="mini" text="EDIT" />
            </div>
        </div>
    </div>
    <div class="address-bar mt-2">
        <Buttons @click="addressDialog({visible: true})" icon="el-icon-plus" text="Add address" />
    </div>
    <AddressDrawer />
</div>
</template>

<script>
import AddressDrawer from '@/pages/share/drawer/AddressDrawer';
import { mapState } from 'vuex';

export default {
    props: {
        // 是否开启选择
        isChecked: {
            type: Boolean,
            default: false
        }
    },
    components: { AddressDrawer },
    data() {
        return {
            addressNo: ''
        }
    },
    computed: {
        ...mapState({
            addressList: state => state.personal.addressList
        })
    },
    methods: {
        addressChecked ({_id}) {
            // 取消选中
            if (this.addressNo === _id) {
                this.addressNo = '';
                this.saveAddress('pushOrderInfo', { address: '' });
                return
            };
            this.addressNo = _id;
            // 保存地址信息
            this.saveAddress('pushOrderInfo', { address: _id });
        },
        addressDialog (option) {
            this.saveAddress('pushAddressDialogInfo', option);
        },
        // 删除收货地址
        removeAddress ({_id}) {
            this.$confirm('Confirm delete ?', 'Prompt').then(_ => {
                this.$axios.$post('removeAddress', { id: _id }).then(() => {
                    // 删除就清除选中下标
                    if (this.addressNo === _id) {
                        this.addressNo = '';
                        this.saveAddress('pushOrderInfo', { address: '' });
                        return
                    };
                    // 重新拉取地址列表
                    this.$store.dispatch('personal/addressList');
                });
            }).catch(_ => {});
        },
        // 修改地址
        editAddress ({_id}) {
            this.$axios.$get(`queryAddress?id=${_id}`).then(({data}) => {
                this.addressDialog({
                    type: 'edit',
                    data: data[0],
                    visible: true
                });
            });
        },
        saveAddress (name, param) {
            this.$store.commit(name, param);
        }
    }
}
</script>

<style lang="scss" scoped>
.mb5{
    margin-bottom: 5px;
}
.address-block{
    background: #fff;
    padding: 20px;
    .el-divider{
        margin: 15px 0;
    }
    .address-info{
        display: flex;
        border-bottom: 1px solid #eee;
        padding-bottom: 15px;
        .address-checkbox{
            display: flex;
            align-items: center;
            padding-left: 10px;
            margin-right: 25px;
        }
        .tray-btns{
            text-align: right;
            .el-button{
                width: auto;
            }
        }
    }
    .delivery-address{
        width: 100%;
        p{
            font-size: 14px;
            color: #606266;
        }
    }
}
</style>