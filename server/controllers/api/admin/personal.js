const { Collect } = require('../../../database/model/product');
const { getLoginEmail, successStructure, failStructure } = require('../../../../utils/node');

module.exports = (router) => {
    router.get('/api/collectList', async (ctx) => {
        const result = await Collect.find({
            userMail: getLoginEmail(ctx)
        }, { productId: 1 }).limit(30).populate({
            path: 'productId',
            select: {
                productPrice: 1,
                productName: 1,
                productImage: 1
            },
            populate: 'productImage'
        }).exec();
        successStructure(ctx, result);
    });
}