<template>
<div class="product-stacked">
    <el-tabs :value="pageInfo.total ? 'second' : 'first'">
        <el-tab-pane label="PRODUCT DESCRIPTION" name="first">
            <div class="content" v-html="productInfo.productContent" />
        </el-tab-pane>
        <el-tab-pane :label="`CUSTOMER REVIEWS (${pageInfo.total})`" name="second">
            <div class="reviews-list">
                <div class="rate-pane" v-for="(item, index) in reviewsList" :key="index">
                    <el-row :gutter="20">
                        <el-col :xs="24" :sm="9" :md="7" :lg="6">
                            <h4 class="name mb-1">{{item.nickname}}</h4>
                            <p class="time mb-1">{{item.updateDate}}</p>
                            <div class="rate">
                                <span class="rate-type">QUALITY：</span>
                                <el-rate :value="item.rateQuality" disabled />
                            </div>
                            <div class="rate">
                                <span class="rate-type">PRICE：</span>
                                <el-rate :value="item.ratePrice" disabled />
                            </div>
                        </el-col>
                        <el-col :xs="24" :sm="15" :md="17" :lg="18">
                            <div class="rate-desc">{{item.review}}</div>
                        </el-col>
                    </el-row>
                </div>
                <div class="rate-pagination" v-if="reviewsList.length">
                    <el-pagination
                        background
                        @current-change="sizeChange"
                        :page-size="pageInfo.pageMax"
                        layout="prev, pager, next"
                        :total="pageInfo.total">
                    </el-pagination>
                </div>
            </div>
            <div class="reviews-pane">
                <h4 class="title mb-1 mt-3">HOW DO YOU RATE THIS PRODUCT? *</h4>
                <el-form :model="formData" ref="formData" label-width="100px">
                    <el-form-item class="rate-form-item" label="QUALITY" required>
                        <el-rate :texts="rateTexts" v-model="formData.rateQuality" show-text />
                    </el-form-item>
                    <el-form-item label="PRICE" required>
                        <el-rate :texts="rateTexts" v-model="formData.ratePrice" show-text />
                    </el-form-item>
                    <el-form-item label="Nickname" prop="nickname" :rules="[
                        { required: true, message: 'Nickname Required', trigger: 'blur' },
                        { min: 3, max: 60, message: '3 to 60 characters in length', trigger: 'blur' }
                    ]">
                        <el-input v-model="formData.nickname" />
                    </el-form-item>
                    <el-form-item label="Review" prop="review" :rules="[
                        { required: true, message: 'Review Required', trigger: 'blur' },
                        { min: 15, max: 1800, message: '15 to 1800 characters in length', trigger: 'blur' }
                    ]">
                        <el-input type="textarea" :rows="6" v-model="formData.review" maxlength="1800" show-word-limit />
                    </el-form-item>
                    <el-form-item>
                        <el-button :disabled="serverLimt" type="danger" @click="submit()">SUBMIT REVIEW</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-tab-pane>
    </el-tabs>
</div>
</template>

<script>
export default {
    data () {
        return {
            rateTexts: ['Very bad', 'Disappointed', 'general', 'satisfaction', 'Surprise'],
            reviewsList: [],
            formData: {
                nickname: '',
                review: '',
                rateQuality: 5,
                ratePrice: 5,
                product: ''
            },
            pageInfo: {
                pageNo: 1,
                pageMax: 6,
                total: 0
            },
            serverLimt: false
        }
    },
    computed: {
        productInfo () {
            return this.$store.state.productInfo;
        }
    },
    mounted () {
        this.getReviews();
    },
    methods: {
        sizeChange (page) {
            this.pageInfo.pageNo = page;
            this.getReviews();
        },
        getReviews (id) {
            this.pageInfo.product = id || this.productInfo._id;
            this.$axios.$get('getReviews', {
                params: this.pageInfo
            }).then(({data: {list, pageInfo}}) => {
                const {total, pageNo} = pageInfo;
                this.pageInfo.total = total;
                this.pageInfo.pageNo = pageNo;
                this.reviewsList = list;
            }).catch(_ => {})
        },
        submit () {
            this.fromValidate(this, () => {
                this.serverLimt = true;
                this.pageInfo.pageNo = 1;
                this.formData.product = this.productInfo._id;
                this.$axios.$post('reviews', this.formData).then(_ => {
                    this.getReviews();
                    this.notify('success', 'Reviews subscribed');
                    this.formData.nickname = '';
                    this.formData.review = '';
                    this.formData.rateQuality = 5;
                    this.formData.ratePrice = 5;
                    this.serverLimt = false;
                }).catch(_ => {
                    this.serverLimt = false;
                    this.notify('error', 'Reviews failed');
                })
            })
        },
        notify (type, title) {
            this.$notify[type]({title});
        }
    },
    watch: {
        productInfo ({_id}) {
            this.getReviews(_id);
        }
    }
}
</script>

<style lang="scss" scoped>
.content{
    font-size: 15px;
    color: #606266;
}
.product-stacked{
    background: #fff;
    padding: 10px 20px 20px;
    .rate{
        display: flex;
        align-items: center;
        .rate-type{
            font-size: 12px;
            color: #606266;
        }
    }
    .rate-pane{
        padding: 15px;
        margin-bottom: 10px;
        border: 1px solid #F1F1F1;
        .time{
            font-size: 12px;
            color: #606266;
        }
        .rate-desc{
            word-break: break-all;
        }
    }
    .rate-pagination{
        text-align: right;
    }
    .reviews-pane{
        max-width: 640px;
        .title{
            color: #606266;
        }
        .rate-form-item{
            margin-bottom: 0;
        }
        /deep/ .el-form-item__content{
            display: flex;
            align-items: center;
            min-height: 40px;
        }
    }
}
</style>