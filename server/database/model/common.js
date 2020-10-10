const mongoose = require('mongoose');
const { imagesSchema, advertisingSchema, hostSearchSchema, productMuduleSchema, helpSchema } = require('../schema/common');
const { userSchema } = require('../schema/user');

/**
 * 广告表模型
 * advertising 表名
 */
exports.Advertising = mongoose.model('advertising', advertisingSchema, 'advertising');
/**
 * 热门搜索模型
 * hostSearch 表名
 */
exports.HostSearch = mongoose.model('hostSearch', hostSearchSchema, 'hostSearch');
/**
 * 图片存储
 * images 表名
 * schema 数据模型
 */
exports.Images = mongoose.model('images', imagesSchema, 'images');
/**
 * 商品模块
 * ProductMudule 表名
 */
exports.ProductMudule = mongoose.model('productMudule', productMuduleSchema, 'productMudule');
/**
 * help
 * help 表名
 */
exports.Help = mongoose.model('help', helpSchema, 'help');
/**
 * 邮件订阅
 * subscribe 表名
 */
exports.Subscribe = mongoose.model('subscribe', new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
}), 'subscribe');