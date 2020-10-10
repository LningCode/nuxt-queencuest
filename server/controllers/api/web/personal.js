const { address } = require('../../../database/model/personal');
const { Collect, commodity } = require('../../../database/model/product');
const { user } = require('../../../database/model/user');
const { getLoginEmail, successStructure } = require('../../../../utils/node');

function resEvent(state, ctx, code) {
    state ? resSuccess(ctx) : resFail(ctx, code);
}

// 获取用户信息
exports.baseInfo = () => {
    return async (ctx) => {
        const email = getLoginEmail(ctx);
        const info = await user.findOne({ email }, { password: 0 });
        successStructure(ctx, info);
    }
}

// 修改用户信息
exports.editBaseInfo = () => {
    return async (ctx) => {
        const body = ctx.request.body;
        const term = { email: getLoginEmail(ctx) };
        const findUser = await user.findOne(term);
        if (!findUser) return resFail(ctx, 10032);
        const updateRes = await user.updateOne(term, body);
        resEvent(updateRes, ctx, 10032);
    }
}

/**
 * 获取收货地址
 */
exports.queryAddress = () => {
    return async (ctx) => {
        const { pageMax = 10, id } = ctx.request.query;
        // 根据id查询单条，反之查询列表
        const param = id ? { _id: id } : { selfEmail: getLoginEmail(ctx) };
        const list = await address.find(param).limit(Number(pageMax));
        resSuccess(ctx, list);
    }
}
/**
 * 删除收货地址
 */
exports.removeAddress = () => {
    return async (ctx) => {
        const { id } = ctx.request.body;
        if (!id) resFail(ctx, 10034);
        const delRes = await new Promise((resolve) => {
            address.deleteMany({ _id: id }, (err) => {
                resolve(err ? false : true);
            });
        })
        resEvent(delRes, ctx, 10034);
    }
}
/**
 * 修改收货地址
 */
exports.editAddress = () => {
    return async (ctx) => {
        const { body } = ctx.request;
        const term = { _id: body.id };
        const findUser = await address.findOne(term);
        if (!findUser) return resFail(ctx, 10032);
        body['time'] = Date.now();
        const updateRes = await address.updateOne(term, body);
        resEvent(updateRes, ctx, 10032);
    }
}

/**
 * /添加收货地址
 */
exports.address = () => {
    return async (ctx) => {
        const { body } = ctx.request
        body['time'] = Date.now();
        body['selfEmail'] = getLoginEmail(ctx);
        const addRes = await new address(body).save();
        resEvent(addRes, ctx, 10033);
    }
}

// 根据登录用户名（邮箱）获取收藏商品（心愿单）
exports.collectProduct = () => {
    return async (ctx) => {
        const userEmail = getLoginEmail(ctx);
        const findCollect = await Collect.find({ userEmail });
        const collectIds = findCollect.map(({ productId }) => {
            return productId
        });
        const findProducts = await commodity.find({ _id: { $in: collectIds } });
        resSuccess(ctx, findProducts);
    }
}