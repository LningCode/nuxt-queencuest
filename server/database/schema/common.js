const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * 商品图片
 * @name 标题
 * @url 图片地址
 * @type 是否首图
 * @createDate 创建时间
 * @updateDate 更新时间
 */
exports.imagesSchema = new mongoose.Schema({
    name: String,
    url: {
        type: String,
        required: true
    },
    type: {
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
});

/**
 * 广告
 * @name 广告名称
 * @position 广告显示位置 1、main-banner首页轮播
 * @JumpType 跳转类型（1、product图片 2、article文章）
 * @JumpLink 跳转链接
 * @images 广告图片
 * @createDate 创建时间
 * @updateDate 更新时间
 */
exports.advertisingSchema = new mongoose.Schema({
    name: String,
    position: {
        type: String,
        default: 'main-banner'
    },
    JumpType: {
        type: String,
        default: 'no'
    },
    JumpLink: String,
    images: String,
    sort: {
        type: Number,
        default: 0,
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
});
/**
 * 热门搜索
 * @words 热门词
 * @frequency 搜索次数
 * @sort 排序
 * @createDate 创建时间
 * @updateDate 更新时间
 */
exports.hostSearchSchema = new mongoose.Schema({
    words: {
        type: String,
        required: true
    },
    frequency: {
        type: Number,
        default: 0
    },
    sort: {
        type: Number,
        default: 0
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
})

/**
 * 商品模块
 * @type 模块类型
 * @name 模块名称
 * @id 模块Id
 * @product 商品
 * @createDate 创建时间
 * @updateDate 更新时间
 */
exports.productMuduleSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    name: String,
    id: String,
    product: [{
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true
    }],
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
})

/**
 * help
 * @type 类型：conditions-of-use/
 * @content desc内容
 * @createDate 创建时间
 * @updateDate 更新时间
 */
exports.helpSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    type: {
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
})