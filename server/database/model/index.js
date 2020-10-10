const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * 首页游客评论
 * reviews 表名
 * @nickname 用户名称
 * @review 评论内容
 * @rateQuality 产品质量
 * @ratePrice 产品价格
 * @product 产品id关联
 * @verify 是否审核
 */
exports.Reviews = mongoose.model('reviews', new mongoose.Schema({
    nickname: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    rateQuality: {
        type: Number,
        required: true
    },
    ratePrice: {
        type: Number,
        required: true
    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    },
    verify: {
        type: Boolean,
        required: true,
        default: false
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
}), 'reviews');