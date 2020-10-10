const mongoose = require('mongoose');
const {
    productCategorySchema,
    productSchema,
    collectSchema,
    cartSchema,
    orderSchema,
    orderDetailsSchema,
    brandSchema,
    ProductSkuSchema
} = require('../schema/product');

/**
 * 商品品牌
 * addcommodity 表名
 * schema 数据模型
 */
exports.Brand = mongoose.model('brand', brandSchema, 'brand');

/**
 * 商品分类模型
 * addcommodity 表名
 * schema 数据模型
 */
exports.ProductCategory = mongoose.model('productCategory', productCategorySchema, 'productCategory');

/**
 * 商品模型
 * commodity 表名
 * schema 数据模型
 */
exports.Product = mongoose.model('product', productSchema, 'product');

/**
 * 收藏商品
 * collect 表名
 * schema 数据模型
 */
exports.Collect = mongoose.model('collect', collectSchema, 'collect');

/**
 * 购物车
 * cart 表名
 * cartSchema 数据模型
 */
exports.Cart = mongoose.model('cart', cartSchema, 'cart');

/**
 * 订单主表
 * order 表名
 * orderSchema 数据模型
 */
exports.Order = mongoose.model('order', orderSchema, 'order');
/**
 * 订单详情表
 * orderDetails 表名
 * orderDetailsSchema 数据模型
 */
exports.OrderDetails = mongoose.model('orderDetails', orderDetailsSchema, 'orderDetails');
/**
 * 商品sku
 * productSku 表名
 * ProductSkuSchema 数据模型
 */
exports.ProductSku = mongoose.model('productSku', ProductSkuSchema, 'productSku');