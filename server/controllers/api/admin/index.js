const { Advertising, HostSearch, ProductMudule, Images, Help } = require('../../../database/model/common');
const { Product } = require('../../../database/model/product');
const { successStructure, failStructure } = require('.././../../../utils/node');
const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);

module.exports = (router) => {
    // 添加广告
    router.post('/api/admin/v1/createAdv', async (ctx) => {
        const body = ctx.request.body;
        const find = await Advertising.findOne({ _id: body._id });
        if (find) {
            await Advertising.findByIdAndUpdate(body._id, {
                name: body.name,
                position: body.position,
                JumpType: body.JumpType,
                JumpLink: body.JumpLink,
                images: body.images,
                sort: body.sort,
                updateDate: ''
            })
        } else {
            await new Advertising(ctx.request.body).save();
        }
        successStructure(ctx);
    });
    // 获取广告列表
    router.get('/api/admin/v1/queryAdvList', async (ctx) => {
        const { _id } = ctx.request.query;
        const option = _id ? { _id } : {};
        const result = await Advertising.find(option).sort({ sort: 1 });
        successStructure(ctx, result);
    });
    // 添加热门搜索
    router.post('/api/admin/v1/createHostSearch', async (ctx) => {
        const body = ctx.request.body;
        await new HostSearch(body).save();
        successStructure(ctx);
    });
    // 获取热门搜索
    router.get('/api/admin/v1/hostSearch', async (ctx) => {
        const result = await HostSearch.find().sort({ sort: 1 });
        successStructure(ctx, result);
    });
    // 模块商品列表
    router.get('/api/admin/v1/applicationProductList', async (ctx) => {
        const { pageNo, pageMax, search } = ctx.request.query;
        const no = Number(pageNo) || 1;
        const max = Number(pageMax) || 10;
        const skip = (no - 1) * max;
        // 排除字段
        const exclude = {
            productModel: 0,
            productContent: 0,
            productCategory: 0,
            productSku: 0,
            productNo: 0,
            productImage: 0,
            productBrand: 0
        };
        // 查询条件
        const option = { productName: { $regex: search, $options: '$i' } };
        const total = await Product.find(option);
        successStructure(ctx, {
            list: await Product.find(option, exclude).limit(max).skip(skip),
            pageInfo: {
                total: total.length,
                pageMax: max,
                pageNo: no
            }
        });
    });
    // 保存商品模块选择
    router.post('/api/admin/v1/ProductMudule', async (ctx) => {
        const { body } = ctx.request;
        const find = await ProductMudule.findOne({ type: body.type });
        if (find) {
            await ProductMudule.findByIdAndUpdate(find._id, {
                product: body.product
            })
        } else {
            await new ProductMudule(body).save();
        }
        successStructure(ctx);
    });
    // 获取对应模块商品列表
    router.get('/api/admin/v1/queryMuduleProduct', async (ctx) => {
        const { type } = ctx.request.query;
        // 只关联显示这些字段
        const exclude = {
            productNum: 1,
            productName: 1,
            productPrice: 1
        };
        const result = await ProductMudule.findOne({ type }).populate('product', exclude).exec();
        successStructure(ctx, result);
    });
    // 图片上传
    router.post('/api/admin/v1/uploadImage', async (ctx) => {
        const body = ctx.request.body;
        await new Images(body).save();
        successStructure(ctx);
    })
    // 获取图片
    router.get('/api/admin/v1/Images', async (ctx) => {
        const { type } = ctx.request.query;
        const result = await Images.find({ type });
        successStructure(ctx, result);
    })
    // help
    router.post('/api/admin/v1/help', async (ctx) => {
        const { type, content } = ctx.request.body;
        const find = await Help.findOne({ type });
        let result = 'save';
        if (find) {
            result = 'edit';
            await Help.findOneAndUpdate({ type }, { content })
        } else {
            await new Help({ type, content }).save();
        }
        successStructure(ctx, result);
    })
    // 获取help
    router.get('/api/admin/v1/getHelp', async (ctx) => {
        const { type } = ctx.request.query;
        const find = await Help.findOne({ type }, {
            content: 1,
            type: 1
        });
        successStructure(ctx, find);
    });
}