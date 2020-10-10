const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { mathRand } = require('../../../utils/node');

/**
 * 商品品牌
 * @brandName 商品品牌
 * @brandLogo 商品logo
 * @sort 排序
 * @createDate 创建时间
 * @updateDate 更新时间
 */
exports.brandSchema = new mongoose.Schema({
    brandName: {
        type: String,
        required: true
    },
    brandLogo: String,
    sort: {
        type: String,
        required: true,
        default: 'Y'
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date
    }
});

/**
 * 商品分类模型结构
 * @label 分类名称
 * @sort 排序
 * @position 显示位置 1、nav 2、sort
 * @status 状态 Y（开启）N（关闭）
 * @parentId 父ID
 * @type 操作类型：如点击跳转或打开下拉
 * @path 跳转链接
 * @createDate 创建时间
 * @updateDate 更新时间
 */
exports.productCategorySchema = new mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    sort: {
        type: Number,
        default: 0
    },
    position: {
        type: String,
        required: true,
        default: 'nav'
    },
    status: {
        type: String,
        required: true,
        default: 'Y'
    },
    parentId: {
        type: String,
        required: true,
        default: '0'
    },
    type: {
        type: String,
        required: true,
        default: 'url'
    },
    path: String,
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: Number
});

/**
 * 商品模型结构
 * @productNo 商品编号
 * @productName 商品名称
 * @productModel 商品型号
 * @productPrice 商品价格
 * @productNum 商品数量（库存）
 * @productStatus 商品状态 Y（开启）N（关闭）
 * @sort 选项排序 1（升序）0（降序）
 * @productBrand 商品品牌
 * @productCategory 商品分类
 * @productContent 商品描述
 * @productImage 商品图片（主图）
 * @productImageList 商品图片列表
 * @productSku 商品销售规格
 * @createDate 创建时间
 * @updateDate 更新时间
 */
const productInterface = {
    productNo: {
        type: String,
        required: true,
        default: mathRand()
    },
    productName: {
        type: String,
        required: true
    },
    productModel: {
        type: String,
        required: true
    },
    productPrice: {
        type: Number,
        required: true
    },
    productNum: {
        type: Number,
        required: true,
        default: 0
    },
    productStatus: {
        type: String,
        required: true,
        default: 'Y'
    },
    sort: Number,
    productBrand: {
        type: Schema.Types.ObjectId,
        ref: 'brand'
    },
    productCategory: Schema.Types.Mixed,
    productContent: String,
    productImage: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'images'
    },
    productImageList: [{
        type: Schema.Types.ObjectId,
        ref: 'images'
    }],
    productSku: [{
        type: Schema.Types.ObjectId,
        required: false,
        ref: 'productSku'
    }],
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
}
exports.productInterface = productInterface;
exports.productSchema = new mongoose.Schema(productInterface);

/**
 * 收藏商品
 * @productId 商品iID
 * @userMail 收藏用户(邮箱)
 * @createDate 创建时间
 * @updateDate 更新时间
 */
exports.collectSchema = new mongoose.Schema({
    productId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'product'
    },
    userMail: {
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
 * 购物车数据模型
 * @cartNo 购物车编号
 * @productInfo 商品信息
 * @productId 商品iID
 * @productName 商品名称
 * @productNum 商品数量
 * @productImage 商品图片
 * @productPrice 商品价格
 * @createDate 创建时间
 * @updateDate 更新时间
 * @selfUser 当前添加用户
 * @productInventory 库存
 */
const cartInterface = {
    cartNo: {
        type: String,
        required: true,
        default: mathRand()
    },
    productInfo: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'commodity'
    },
    productId: String,
    productName: {
        type: String,
        required: true
    },
    productNum: {
        type: Number,
        required: true
    },
    productImage: {
        type: String,
        required: true,
        default: ''
    },
    productPrice: {
        type: Number,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date
    },
    selfUser: {
        type: String,
        required: true
    },
    productInventory: Number
}
exports.cartInterface = cartInterface;
exports.cartSchema = new mongoose.Schema(cartInterface);

/**
 * 订单主表模型
 * @orderNo 订单编号
 * @orderStatus 订单状态：1（待付款）2（待发货）3（待收货）4（待评价）5（已取消）
 * @paymentStatus 支付状态：1（待付款）2（已付款）3（已取消）
 * @createDate 创建时间
 * @updateDate 更新时间
 * @total 订单总金额
 * @address 收货地址信息
 * @purchaseUser 购买用户
 * @paymentCard 支付类型：1（信用卡）2（paypal）3（其他支付）
 * @purchaseQuantity 购买商品总数
 */
const orderInterface = {
    orderNo: {
        type: String,
        required: true,
        default: mathRand()
    },
    orderStatus: {
        type: Number,
        required: true
    },
    paymentStatus: {
        type: Number,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date
    },
    total: {
        type: String,
        required: true
    },
    purchaseUser: {
        type: String,
        required: true
    },
    address: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'address'
    },
    paymentCard: {
        type: Number,
        required: true
    },
    purchaseQuantity: {
        type: Number,
        required: true
    }
}
exports.orderInterface = orderInterface;
exports.orderSchema = new mongoose.Schema(orderInterface);

/**
 * 订单详情表模型
 * @orderNo 订单编号
 * @productInfo: {
 *  productNo 商品编号
 *  productNum 购买数量
 *  productPrice 商品价格
 *  productImage 商品图片
 * }
 */
exports.orderDetailsSchema = new mongoose.Schema({
    orderNo: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'order'
    },
    productInfo: {
        type: Array,
        required: true
    }
});

/**
 * 商品销售规格模型
 * @skuSpec 选择组合
 * @stock 库存
 * @price 价格
 * @cost 成本价
 * @isUse 是否选中
 * @remark 备注
 * @image 主分类图片
 * @createDate 创建时间
 * @updateDate 更新时间
 */
exports.ProductSkuSchema = new mongoose.Schema({
    skuSpec: {
        type: Object
    },
    stock: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    cost: {
        type: Number,
        default: 0
    },
    isUse: Boolean,
    remark: String,
    image: String,
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date
    }
});