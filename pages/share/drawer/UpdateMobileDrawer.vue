<template>
<el-dialog class="spice-dialog" @close="$emit('close')" :title="editPhone ? 'Verify identidy' : 'Save modification information'" :visible="visible">
    <div class="spice-body">
        <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
        <el-form :model="fromData" ref="form" label-position="top">
            <el-form-item label="Phone">
                <el-input :disabled="editPhone" v-model="fromData.phone"></el-input>
            </el-form-item>
            <el-form-item v-if="editPhone" label="Captcha">
                <div class="verifCode">
                    <el-input placeholder="Please enter the verification code shown in the picture" v-model="fromData.phone"></el-input>
                    <el-button class="code">12334</el-button>
                    <i class="el-icon-refresh"></i>
                </div>
            </el-form-item>
            <el-form-item v-if="editPhone" label="Get mobile phone verification code">
                <div class="verifCode">
                    <el-input class="phoneCode" placeholder="Please enter SMS verification code" v-model="fromData.phone"></el-input>
                    <el-button>get verification code</el-button>
                </div>
            </el-form-item>
        </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
        <el-button v-if="editPhone" @click="editPhone = false;fromData.phone = ''">NEXT</el-button>
        <el-button v-else @click="$emit('close')">Save changes</el-button>
    </div>
</el-dialog>
</template>

<script>
export default {
    data () {
        return {
            editPhone: true,
            fromData: {
                phone: 12353453453
            }
        }
    },
    props: {
        // 控制显示
        visible: {
            type: Boolean,
            default: false
        }
    },
    methods: {
    }
}
</script>

<style lang="scss">
.spice-dialog{
    .el-dialog__body{
        padding: 0 20px;
    }
    .verifCode{
        display: flex;
        align-items: center;
        .el-input{
            width: 150px;
        }
        .code{
            margin-left: 10px;
            margin-right: 10px;
            border: none;
        }
        .phoneCode{
            margin-right: 10px;
        }
        .el-icon-refresh{
            font-size: 24px;
            cursor: pointer;
        }
    }
    @media only screen and (max-width: 768px){
        .el-dialog{
            width: 97% !important;
        }
    } 
}
</style>