const { successStructure } = require('../../../../utils/node');
const { Contactus } = require('../../../database/model/personal');

module.exports = (router) => {
    // 提交留意联系方式
    router.post('/api/contactus', async (ctx) => {
        const body = ctx.request.body;
        await new Contactus(body).save();
        successStructure(ctx);
    });
}