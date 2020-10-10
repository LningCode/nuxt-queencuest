const { Advertising, HostSearch, ProductMudule, Help } = require('../../../database/model/common');
const { Product } = require('../../../database/model/product');
const { successStructure, failStructure } = require('.././../../../utils/node');
const { Reviews } = require('../../../database/model');
// const mongoose = require('mongoose');
// mongoose.set('useFindAndModify', false);

module.exports = (router) => {
    // 获取广告
    router.get('/api/carousel', async (ctx) => {
        const { position } = ctx.request.query;
        const result = await Advertising.find({ position });
        successStructure(ctx, result);
    });
    // 获取热门搜索
    router.get('/api/hostSearch', async (ctx) => {
        const result = await HostSearch.find().sort({ sort: 1 });
        successStructure(ctx, result);
    });
    // 获取首页商品模块
    router.get('/api/productBlock', async (ctx) => {
        const { type } = ctx.request.query;
        const result = await ProductMudule.findOne({ type }).populate({
            path: 'product',
            // 深度关联
            populate: [
                { path: 'productImage' },
                { path: 'productImageList' }
            ]
        }).exec();
        successStructure(ctx, result ? result.product : []);
    });
    // 根据导航或者模块分类进入
    router.get('/api/goodsCategory', async (ctx) => {
        const { pageNo, pageMax, category } = ctx.request.query;
        if (!category) return failStructure(ctx);
        const no = Number(pageNo) || 1;
        const max = Number(pageMax) || 10;
        const skip = (no - 1) * max;
        const reg = { productCategory: { $regex: category, $options: '$i' } };
        const total = await Product.find(reg);
        const list = await Product.find(reg, {
            productPrice: 1,
            productName: 1,
            productImage: 1
        }).limit(max).skip(skip).populate(['productImage']).exec();
        successStructure(ctx, {
            list, pageInfo: {
                total: total.length,
                pageMax: max,
                pageNo: no
            }
        });
    });
    // 获取help
    router.get('/api/getHelp', async (ctx) => {
        const { type } = ctx.request.query;
        const find = await Help.findOne({ type }, {
            content: 1,
            type: 1
        });
        successStructure(ctx, find);
    });
    // 游客评论
    router.post('/api/reviews', async (ctx) => {
        const { body } = ctx.request;
        await new Reviews(body).save();
        successStructure(ctx);
    });
    router.get('/api/getReviews', async (ctx) => {
        const { product, pageNo, pageMax } = ctx.request.query;
        const no = Number(pageNo) || 1;
        const max = Number(pageMax) || 10;
        const skip = (no - 1) * max;
        const option = { product, verify: true };
        const total = await Reviews.find(option);
        const list = await Reviews.find(option, {
            __v: 0
        }).limit(max).skip(skip);
        successStructure(ctx, {
            list,
            pageInfo: {
                total: total.length,
                pageMax: max,
                pageNo: no
            }
        });
    });
}