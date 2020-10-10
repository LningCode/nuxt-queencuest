const { Product, ProductCategory } = require('../../../database/model/product');
const { Subscribe } = require('../../../database/model/common');
const { successStructure } = require('../../../../utils/node');

module.exports = (router) => {
    // 邮件订阅
    router.post('/api/subscribe', async (ctx) => {
        const { email } = ctx.request.body;
        await new Subscribe({ email }).save();
        successStructure(ctx);
    });
    // 全局搜索
    router.get('/api/search', async (ctx) => {
        const { pageNo, pageMax, search } = ctx.request.query;
        const no = Number(pageNo) || 1;
        const max = Number(pageMax) || 10;
        const skip = (no - 1) * max;
        // 创建模糊查询条件，字母不区分大小写
        const reg = { productName: { $regex: search, $options: '$i' } };
        const total = await Product.find(reg);
        const totalList = await Product.find(reg, {
            productImage: 1,
            productPrice: 1,
            productName: 1
        }).limit(max).skip(skip).populate(['productImage']).exec();
        successStructure(ctx, {
            list: totalList,
            pageInfo: {
                total: total.length,
                pageMax: max,
                pageNo: no
            }
        });
    });
    // 获取导航分类
    router.get('/api/navMenu', async (ctx) => {
        const result = await ProductCategory.find().sort({ sort: 1 });
        successStructure(ctx, result);
    });
}