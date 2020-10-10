<template>
<el-dialog class="address-dialog" @opened="onOpened" @close="onClose" :visible="dialogVisible.visible" :destroy-on-close="true">
    <div slot="title">
        <span class="el-icon-map-location"></span> Saear Address
    </div>
    <el-form label-position="left" :model="formData" ref="formData" :rules="rules" label-width="120px">
        <!-- 姓名 -->
        <el-form-item label="Name">
            <el-col :span="11">
                <el-form-item prop="firstName">
                    <el-input placeholder="First Name" v-model="formData.firstName"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="1">
                <span class="interval">-</span>
            </el-col>
            <el-col :span="12">
                <el-form-item prop="lastName">
                    <el-input placeholder="Last Name" v-model="formData.lastName"></el-input>
                </el-form-item>
            </el-col>
        </el-form-item>
        <!-- 国家 -->
        <el-form-item label="Country" prop="country">
            <el-select v-model="formData.country" placeholder="Country" style="width: 100%">
                <el-option label="Australia" value="Australia"></el-option>
                <el-option label="Canada" value="Canada"></el-option>
                <el-option label="France" value="France"></el-option>
                <el-option label="Germany" value="Germany"></el-option>
                <el-option label="United Kingdom" value="United Kingdom"></el-option>
                <el-option label="United States" value="United States"></el-option>
            </el-select>
        </el-form-item>
        <!-- 地区 -->
        <el-form-item label="State/City" required>
            <el-col :span="11">
                <el-form-item prop="state">
                    <el-input placeholder="State(Optional)" v-model="formData.state"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="1">
                <span class="interval">-</span>
            </el-col>
            <el-col :span="12">
                <el-form-item prop="city">
                    <el-input placeholder="City" v-model="formData.city"></el-input>
                </el-form-item>
            </el-col>
        </el-form-item>
        <!-- 详细地址1 -->
        <el-form-item label="Address Line 1" prop="addressLine1">
            <el-input placeholder="Area, Street Name/No., Building Name/No., Nearest Landmark etc." v-model="formData.addressLine1"></el-input>
        </el-form-item>
        <!-- 详细地址2 -->
        <el-form-item label="Address Line 2" prop="addressLine2">
            <el-input placeholder="Apartment, suite, unit, building, floor, etc.(Optional)" v-model="formData.addressLine2"></el-input>
        </el-form-item>
        <!-- 邮政编码 -->
        <el-form-item label="ZIP/Post Code" prop="postCode">
            <el-input placeholder="ZIP/Post Code" v-model.number="formData.postCode"></el-input>
        </el-form-item>
        <!-- 电话 -->
        <el-form-item label="Phone" prop="phone">
            <el-input placeholder="Phone number" v-model.number="formData.phone"></el-input>
        </el-form-item>
        <el-form-item class="mt-3">
            <div class="note mb-2">
                <span>Note: </span>
                Please ensure your shipping information is complete and accurate in case we or the shipping carrier need to reach you regarding your order.
            </div>
            <Buttons @click="submit()" type="info" text="SAVE" />
        </el-form-item>
    </el-form>
</el-dialog>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
const rules = {
    firstName: [
        { required: true, min: 2, max: 50, message: 'Your First name must contain a minimum of 2 characters.', trigger: 'blur' }
    ],
    lastName: [
        { required: true, min: 1, max: 15, message: 'Your Last name must contain a minimum of 1 characters.', trigger: 'blur' }
    ],
    country: [
        { required: true, message: 'Please select a country', trigger: 'blur' }
    ],
    city: [
        { required: true, message: 'Your city should be at least 3 characters long.', trigger: 'blur' }
    ],
    addressLine1: [
        { required: true, min: 5, message: 'Your shipping address should be at least 5 characters long.', trigger: 'blur' }
    ],
    postCode: [
        { required: true, type: 'number', message: 'Zip Code cannot be empty.', trigger: 'blur' },
        { type: 'number', message: 'ZIP/Post Code should be numeric', trigger: 'blur' }
    ],
    phone: [
        { required: true, type: 'number', min: 6, message: 'Your phone number must be at least 6 digits.', trigger: 'blur' },
        { type: 'number', message: 'Phone should be numeric', trigger: 'blur' }
    ]
};

export default {
    data () {
        return {
            rules,
            formData: {
                id: '',
                firstName: '',
                lastName: '',
                country: 'United States',
                state: '',
                city: '',
                addressLine1: '',
                addressLine2: '',
                postCode: '',
                phone: ''
            }
        }
    },
    computed: {
        ...mapState({
            dialogVisible: state => state.addressDialogInfo
        })
    },
    methods: {
        onClose () {
            // 关闭弹层重置默认值
            this.$store.commit('pushAddressDialogInfo', {
                visible: false,
                type: 'add',
                keep: false,
                data: {}
            });
            this.resetFormData();
        },
        onOpened () {
            const { data } = this.dialogVisible;
            this.resetFormData(data);
        },
        // 添加/修改收货地址
        submit () {
            const { type } = this.dialogVisible;
            const apiurl = type === 'edit' ? 'editAddress' : 'address';
            this.fromValidate(this, () => {
                this.$axios.$post(apiurl, this.formData).then(() => {
                    this.$store.dispatch('personal/addressList');
                    this.$store.commit('pushAddressDialogInfo', {
                        visible: false
                    });
                }).catch(() => {});
            });
        },
        // 重置表单参数
        resetFormData (json = {}) {
            // 此id提供编辑信息
            json['id'] = json._id;
            const { type } = this.dialogVisible;
            for (const key in this.formData) {
                // 转类型
                if ((key === 'postCode' || key === 'phone') && type === 'edit') {
                    this.formData[key] = Number(json[key]);
                } else {
                    this.formData[key] = json[key];
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.address-dialog{
    /deep/ .el-dialog{
        width: 70%;
        .el-dialog__header{
            padding-bottom: 20px;
            line-height: 1;
            background: #e2e2e2;
            color: #909399;
        }
        .note{
            line-height: 1.2;
            span{
                color: #F56C6C;
            }
        }
    }
    .interval{
        display: block;
        text-align: center;
        color: #fff;
    }
    @media only screen and (max-width: 768px){
        .el-dialog{
            width: 96%;
        }
    }
}
</style>