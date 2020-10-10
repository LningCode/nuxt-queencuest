<template>
<div class="min-container mt-3 mb-3">
    <div class="profile-page">
        <h3 class="profile-title mb-2">Your information <span>Required items*</span></h3>
        <el-form :model="formData" ref="formData" :rules="rules" label-position="top">
            <el-form-item>
                <el-col :xs="24" :lg="6">
                    <el-form-item prop="appellation" label="Appellation" required>
                        <el-select v-model="formData.appellation" placeholder="appellation" style="width: 100%">
                            <el-option label="Mr." :value="1"></el-option>
                            <el-option label="Ms." :value="2"></el-option>
                            <el-option label="Miss" :value="3"></el-option>
                            <el-option label="Not to disclose" :value="4"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :lg="9">
                    <el-form-item prop="firstName" label="First Name">
                        <el-input placeholder="First Name" v-model="formData.firstName"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :lg="9">
                    <el-form-item prop="lastName" label="Last Name">
                        <el-input placeholder="Last Name" v-model="formData.lastName"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            
            <el-form-item>
                <el-col :xs="24" :lg="6">
                    <el-form-item label="Country" prop="country" required>
                        <el-select v-model="formData.country" placeholder="Country" style="width: 100%">
                            <el-option label="Australia" value="Australia"></el-option>
                            <el-option label="Canada" value="Canada"></el-option>
                            <el-option label="France" value="France"></el-option>
                            <el-option label="Germany" value="Germany"></el-option>
                            <el-option label="United Kingdom" value="United Kingdom"></el-option>
                            <el-option label="United States" value="United States"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :lg="9">
                    <el-form-item prop="city" label="City">
                        <el-input placeholder="City" v-model="formData.city"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :lg="9">
                    <el-form-item prop="state" label="State">
                        <el-input placeholder="State(Optional)" v-model="formData.state"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item label="Address Line" prop="addressLine" class="padlr5">
                <el-input v-model="formData.addressLine" placeholder="Area, Street Name/No., Building Name/No., Nearest Landmark etc." />
            </el-form-item>

            <el-form-item>
                <el-col :xs="24" :lg="11">
                    <el-form-item label="Birthday" prop="birthday">
                        <el-date-picker style="width: 100%" v-model="formData.birthday" type="date" placeholder="Choose birthday" />
                    </el-form-item>
                </el-col>
                <el-col :xs="24" :lg="13">
                    <el-form-item label="Phone" prop="phone">
                        <el-input v-model.number="formData.phone" placeholder="Phone" />
                    </el-form-item>
                </el-col>
            </el-form-item>

            <el-form-item label="E-mail Subscriptions" class="form-sub-email padlr5">
                <el-checkbox v-model="formData.subscribeEmail"></el-checkbox>
                <p class="text">I want to subscribe to Saear’s latest products, news and more</p>
            </el-form-item>
            
            <el-form-item class="form-btns pt-1">
                <Buttons path="/personal" text="CANCEL" />
                <Buttons @click="submit" type="info" text="UPDATE" />
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script>
import { getLocalStore } from '@/utils/storage';
import { mapActions } from 'vuex';

export default {
    data () {
        return {
            formData: {
                email: '',
                appellation: 1,
                firstName: '',
                lastName: '',
                country: 'United States',
                state: '',
                city: '',
                addressLine: '',
                phone: '',
                birthday: '',
                subscribeEmail: true
            },
            rules: {
                firstName: [
                    { required: true, min: 2, max: 50, message: 'Your First name must contain a minimum of 2 characters.', trigger: 'blur' }
                ],
                lastName: [
                    { required: true, min: 1, max: 15, message: 'Your Last name must contain a minimum of 1 characters.', trigger: 'blur' }
                ],
                city: [
                    { required: true, min: 3, message: 'Your city should be at least 3 characters long.', trigger: 'blur' }
                ],
                addressLine: [
                    { required: true, min: 5, message: 'Your shipping address should be at least 5 characters long.', trigger: 'blur' }
                ],
                phone: [
                    { required: true, type: 'number', min: 6, message: 'Your phone number must be at least 6 digits.', trigger: 'blur' },
                    { type: 'number', message: 'Phone should be numeric'}
                ]
            }
        }
    },
    mounted () {
        this.initInfo();
    },
    methods: {
        ...mapActions({
            baseInfo: 'fetchBaseInfo'
        }),
        submit () {
            this.fromValidate(this, () => {
                this.$axios.$post('editBaseInfo', this.formData).then(() => {
                    this.$message.success('Information modified successfully');
                    this.baseInfo(this.formData).then(() => {
                        this.$router.push({path: '/personal'});
                    });
                });
            });
        },
        initInfo () {
            const info = getLocalStore('baseInfo') || {};
            for (const key in this.formData) {
                this.formData[key] = info[key];
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.padlr5{
    padding-left: 5px;
    padding-right: 5px;
}
.profile-page{
    background: #fff;
    padding: 20px;
    .profile-title{
        color: #606266;
        span{
            font-size: 13px;
            color: #909399;
        }
    }
    /deep/ .el-form-item__content{
        .el-col{
            padding-right: 5px;
            padding-left: 5px;
        }
    }
    /deep/ .form-sub-email{
        .el-form-item__label{
            padding-bottom: 0;
        }
        .el-form-item__content{
            color: #909399;
            line-height: 1.1;
            display: flex;
            .text{
                margin-left: 10px;
            }
        }
    }
    .form-btns{
        text-align: center;
        .el-button{
            max-width:30%;
            min-width: 100px;
        }
    }
}
</style>