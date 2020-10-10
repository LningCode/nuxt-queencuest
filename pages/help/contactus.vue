<template>
<el-main>
    <div class="min-container">
        <BreadCrumb class="mb-2" />
        <div v-if="sendContactus" class="pt-3 pb-3" style="text-align: center">
            <Notdata text="The submission is successful, we will contact you as soon as possible!" icon="el-icon-folder-checked" />
            <Buttons style="max-width: 225px" path="/" text="CONTINUE SHOPPING" />
        </div>
        <div v-else class="contactus">
            <div class="content mb-2">
                <p class="desc mb-1">If you want to import a larger quantity. You can contact us via the email below or fill in the following information so that we can contact you.</p>
                <p class="email">queenguests@gmail.com</p>
            </div>
            <el-form label-position="top" :rules="rules" :model="formData" ref="formData">
                <el-form-item prop="username" label="Name">
                    <el-input v-model="formData.username" placeholder="Name" />
                </el-form-item>
                <el-form-item prop="email" label="Email">
                    <el-input v-model="formData.email" placeholder="Email" />
                </el-form-item>
                <el-form-item prop="phone" label="Phone">
                    <el-input v-model.number="formData.phone" placeholder="Phone" />
                </el-form-item>
                <el-form-item prop="theme" label="Theme">
                    <el-input v-model="formData.theme" placeholder="theme" />
                </el-form-item>
                <el-form-item label="Leave Comments">
                    <el-input v-model="formData.comments" type="textarea" show-word-limit maxlength="500" placeholder="Leave Comments" />
                </el-form-item>
                <el-form-item class="from-btns pt-2">
                    <Buttons @click="submit()" type="info" text="SEND" />
                </el-form-item>
            </el-form>
        </div>
    </div>
</el-main>
</template>

<script>
export default {
    data() {
        return {
            formData: {
                username: '',
                email: '',
                phone: '',
                theme: '',
                comments: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入姓名', trigger: 'blur' },
                    { min: 2, max: 25, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
                ],
                phone: [
                    { required: true, type: 'number', message: '电话不能为空', trigger: 'change' },
                    { type: 'number', message: '电话应为数字值' }
                ],
                theme: [
                    { required: true, message: '请输入主题标题', trigger: 'blur' },
                    { min: 3, max: 150, message: '长度在 3 到 150 个字符', trigger: 'blur' }
                ]
            },
            sendContactus: false
        }
    },
    methods: {
        submit () {
            this.fromValidate(this, () => {
                this.$axios.$post('contactus', this.formData).then(_ => {
                    this.sendContactus = true;
                }).catch(_ => {});
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.contactus{
    background: #fff;
    padding: 20px;
    .contactus__body{
        border: #e6e6e6 1px solid;
        border-radius: 0 0 5px 5px;
        padding: 50px 60px;
        background: #fff;
        .content{
            .desc{
                color: #666;
            }
            .email{
                color: #999;
            }
        }
        /deep/ .el-form-item__label{
            padding-bottom: 0;
        }
        /deep/ .el-textarea__inner{
            min-height: 98px !important;
            padding: 10px 15px;
        }
        /deep/ .el-input__count{
            line-height: 20px;
        }
    }
    .from-btns{
        text-align: center;
        .el-button{
            max-width: 25%;
        }
    }
}
</style>
