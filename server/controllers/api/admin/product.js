const { successStructure, failStructure, mathRand } = require('.././../../../utils/node');
const { ProductCategory, Product, ProductSku, Brand } = require('../../../database/model/product');
const { ProductImage } = require('../../../database/model/common');
const { Reviews } = require('../../../database/model');
const mongoose = require('mongoose');

module.exports = (router) => {
    // 添加商品品牌
    router.post('/api/admin/v1/createBrand', async (ctx) => {
        const body = ctx.request.body;
        const findBrand = await Brand.findOne({ brandName: body.brandName });
        if (findBrand) return failStructure(ctx, 10040, '该品牌已经存在');
        await new Brand(body).save();
        successStructure(ctx);
    });
    // 品牌列表
    router.get('/api/admin/v1/brandList', async (ctx) => {
        const { brandNo } = ctx.request.query;
        const option = brandNo ? { brandNo } : {};
        const brand = await Brand.find(option);
        successStructure(ctx, brand);
    });
    // 获取商品分类
    router.get('/api/admin/v1/productCategory', async (ctx) => {
        const { categoryNo } = ctx.request.query;
        const param = categoryNo ? { categoryNo } : {};
        await ProductCategory.find(param).sort({ sort: 1 });
        successStructure(ctx, result);
    });
    // 添加商品分类
    router.post('/api/admin/v1/createProductCategory', async (ctx) => {
        const body = ctx.request.body;
        const find = await ProductCategory.findOne({ _id: body._id });
        if (find) {
            await ProductCategory.findByIdAndUpdate(body._id, {
                $set: {
                    sort: body.sort,
                    position: body.position,
                    status: body.status,
                    parentId: body.parentId,
                    type: body.type,
                    label: body.label,
                    path: body.path
                }
            });
        } else {
            await new ProductCategory(body).save();
        }
        successStructure(ctx);
    });
    // 获取商品
    router.get('/api/admin/v1/productList', async (ctx) => {
        const result = await Product.find({}, {
            productSku: 0,
            productImageList: 0,
            productContent: 0,
            productCategory: 0,
            productBrand: 0
        }).populate(['productImage']).exec();
        successStructure(ctx, result);
        // const body = {};
        // const { pageNo, pageMax, id, keyword } = ctx.request.query;
        // // 通过id查询
        // if (id) {
        //     body.data = { list: await commodity.find({ _id: id }) }
        // } else {
        //     const no = Number(pageNo) || 1;
        //     const max = Number(pageMax) || 10;
        //     const skip = (no - 1) * max;
        //     body.data = {
        //         list: await commodity.find({ name: { $regex: keyword, $options: '$i' } }).limit(max).skip(skip),
        //         page: {
        //             total: await commodity.estimatedDocumentCount(),
        //             pageMax: max,
        //             pageNo: no
        //         }
        //     }
        // }
    });
    // 添加商品
    router.post('/api/admin/v1/createProduct', async (ctx) => {
        const {
            productName,
            productModel,
            productPrice,
            productNum,
            productBrand,
            productCategory,
            productContent,
            productStatus,
            skuInfo,
            productImage,
            productImageList
        } = ctx.request.body;
        const option = { productName, productModel, productPrice, productNum, productContent, productStatus, productImage, productImageList };
        if (productBrand) option['productBrand'] = productBrand;
        if (productCategory) option['productCategory'] = productCategory;
        const result = await new Product(option).save();
        // 保存sku信息
        if (skuInfo) {
            const skuinfo = await ProductSku.insertMany(skuInfo);
            await Product.updateMany({
                productSku: skuinfo.map(item => item._id)
            });
        }
        successStructure(ctx);
    });
    // 获取单条评论或多条根据reviewsId作为条件
    router.get('/api/admin/v1/getReviews', async (ctx) => {
        const { reviewsId, pageNo, pageMax } = ctx.request.query;
        let resultList = null;
        const populate = {
            path: 'product',
            select: { productName: 1 }
        }
        if (reviewsId) {
            resultList = await Reviews.findOne({ _id: reviewsId }).populate(populate).exec();
        } else {
            const no = Number(pageNo) || 1;
            const max = Number(pageMax) || 10;
            const skip = (no - 1) * max;
            const total = await Reviews.find();
            const list = await Reviews.find().limit(max).skip(skip).populate(populate).exec();
            resultList = {
                list,
                pageInfo: {
                    total: total.length,
                    pageMax: max,
                    pageNo: no
                }
            }
        }
        successStructure(ctx, resultList);
    });
    // 操作游客评论
    router.post('/api/admin/v1/reviews', async (ctx) => {
        const { type, reviewsId, nickname, ratePrice, rateQuality, review, verify } = ctx.request.body;
        // 更新评论内容
        if (type === 'update') {
            await Reviews.findByIdAndUpdate({ _id: reviewsId }, {
                nickname, ratePrice, rateQuality, review, verify
            });
        }
        // 删除评论
        if (type === 'remove') {
            await Reviews.findByIdAndRemove({ _id: reviewsId });
        }
        return successStructure(ctx);
    });
}
