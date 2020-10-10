const { Product, Collect, Cart, Order, OrderDetails } = require('../../../database/model/product');
const { getLoginEmail, successStructure, failStructure } = require('../../../../utils/node');
const mongoose = require('mongoose');

// 获取商品详情
exports.productDetails = () => {
    return async (ctx) => {
        const { productId } = ctx.request.query;
        const product = await Product.findOne({ _id: productId })
            .populate(['productImage', 'productImageList', 'productSku']).exec();
        successStructure(ctx, product);
    }
}

// 收藏商品
exports.collect = () => {
    return async (ctx) => {
        // type 取消或收藏（unCollect/addCollect）
        const { productId, type = 'addCollect' } = ctx.request.body;
        if (!productId) return failStructure(ctx);
        const option = { productId, userMail: getLoginEmail(ctx) };
        const findResult = await Collect.findOne(option);
        let result = false;
        if (findResult) {
            // 取消收藏
            if (type === 'unCollect') {
                result = await Collect.deleteMany(option);
            }
        } else {
            if (type === 'addCollect') {
                // 收藏
                result = await new Collect(option).save();
            }
        }
        successStructure(ctx, result);
    } 
}

// 添加商品到购物车列表
exports.addCart = () => {
    return async (ctx) => {
        const body = ctx.request.body;
        // 查询购物车是否存在商品，存在就更新否则就是添加到购物车
        const findCart = await Cart.findOne({
            productId: mongoose.Types.ObjectId(body.productId),
            sizeNo: mongoose.Types.ObjectId(body.sizeNo),
            colorNo: mongoose.Types.ObjectId(body.colorNo),
            selfUser: getLoginEmail(ctx)
        });
        const param = { ...body, selfUser: getLoginEmail(ctx) };
        let resault = null;
        if (findCart) {
            resault = await Cart.updateOne({ _id: findCart._id }, { ...param, updateDate: Date.now() });
        } else {
            resault = await new Cart({ ...param, createDate: Date.now() }).save();
        }
        resault ? successStructure(ctx) : resFail(ctx, 10037);
    }
}

// 删除购物车商品
exports.removeCart = () => {
    return async (ctx) => {
        const { idList } = ctx.request.body;
        const delres = await Cart.deleteMany({ _id: { $in: idList } });
        delres ? successStructure(ctx) : resFail(ctx, 10034)
    }
}

// 查询购物车列表数据
exports.cartList = () => {
    return async (ctx) => {
        /**
         * populate 关联查询
         * sizeNo/colorNo/productId
         */
        const list = await Cart.find({
            selfUser: getLoginEmail(ctx)
        }).populate(['sizeNo', 'colorNo', 'productInfo']).limit(30).exec();
        successStructure(ctx, list);
    }
}

// 修改购物车商品信息
exports.editCart = () => {
    return async (ctx) => {
        const { id, productNum } = ctx.request.body;
        const num = Number(productNum) || 1;
        if (typeof num !== 'number' || num < 1) return resFail(ctx, 10038);
        const updateRes = await Cart.updateOne({ _id: id }, { productNum });
        if (updateRes) successStructure(ctx);
    }
}

// 创建订单
exports.createOrder = () => {
    return async (ctx) => {
        const body = ctx.request.body;
        // 设置当前下单用户邮箱
        body['purchaseUser'] = getLoginEmail(ctx);
        const productIds = body.productInfo.map(item => {
            return item.productId
        });
        console.log(productIds)
        successStructure(ctx);
        // 保存订单
        // const saveOrder = await new Order(body).save();
        // if (saveOrder && saveOrder._id) {
        //     // 保存订单详情
        //     await new OrderDetails({
        //         orderNo: saveOrder._id,
        //         productInfo: body.productInfo
        //     }).save();
        //     // 减少产品库存量
        //     const commodityInfo = await commodity.find()
        //     // 清除购物车列表
            
        //     successStructure(ctx);
        // } else {
        //     resFail(ctx, 10039)
        // }
    }
}
