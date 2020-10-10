const Router = require('koa-router');
const router = new Router();
const cors = require('koa2-cors');
const { JwtJson, koaJwt } = require('../../utils/node');
const { login, register, forgot, loginOut } = require('./api/web/login');
const {
  address,
  queryAddress,
  removeAddress,
  editAddress,
  baseInfo, editBaseInfo, collectProduct } = require('./api/web/personal');
const { productDetails, collect, cartList, addCart, removeCart, editCart, createOrder } = require('./api/web/product');
/**
 * 分别给每个接口添加'/'
 * @param {string} path 
 */
function api(path) {
  const alias = '/api/'
  return alias + path
}

module.exports = (app) => {
  require('./api/admin')(router);
  require('./api/admin/product')(router);
  require('./api/admin/personal')(router);
  require('./api/web')(router);
  require('./api/web/help')(router);
  require('./api/web/common')(router);
  // 登录
  router.post(api('login'), login());
  // 登录
  router.get(api('loginOut'), loginOut());
  // 注册
  router.post(api('register'), register());
  // 找回密码
  router.post(api('forgot'), forgot());
  // 收货地址操作
  router.post(api('address'), koaJwt, address());
  // 获取地址
  router.get(api('queryAddress'), koaJwt, queryAddress());
  router.post(api('removeAddress'), koaJwt, removeAddress());
  router.post(api('editAddress'), koaJwt, editAddress());
  // 获取基础信息
  router.get(api('baseInfo'), koaJwt, baseInfo());
  // 修改信息
  router.post(api('editBaseInfo'), koaJwt, editBaseInfo());
  // 商品详情
  router.get(api('productDetails'), productDetails());
  // 添加/移除商品收藏
  router.post(api('collect'), koaJwt, collect());
  // 获取收藏商品（心愿单）
  router.get(api('collectProduct'), koaJwt, collectProduct());
  // 查询购物车数据
  router.get(api('cartList'), koaJwt, cartList());
  // 添加商品到购物车
  router.post(api('addCart'), koaJwt, addCart());
  router.post(api('removeCart'), koaJwt, removeCart());
  router.post(api('editCart'), koaJwt, editCart());
  // 创建订单
  router.post(api('createOrder'), koaJwt, createOrder());
  // 添加跨域请求
  app.use(cors({
    origin: (ctx) => {
      return '*'
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept']
  }));
  // 对需要登录状态下的接口进行验证
  app.use((ctx, next) => {
    const { authorization } = ctx.header
    if (authorization) {
      const parts = authorization.split(' ');
      const token = parts[parts.length - 1];
      try {
        const jwt = new JwtJson();
        const restk = jwt.verifyToken(token);
        if (restk) {
          const { email } = restk.payload;
          const jwt = new JwtJson();
          const token = jwt.generateToken({ email });
          ctx.cookies.set('token', token);
        }
      } catch (error) {
        //token过期 生成新的token
        //将新token放入Authorization中返回给前端
        ctx.cookies.set('token', '', { signed: false, maxAge: 0 })
        ctx.res.setHeader('Authorization', null);
      }
    }
    return next().catch((error) => {
      const { status } = error || {};
      if (401 == status) {
        ctx.status = status;
        ctx.body = {
          status,
          message: 'fail',
          errorMessage: 'Protected resource, use Authorization header to get access\n',
          errorCode: status
        }
      } else {
        throw error;
      }
    });
  });
  app.use(router.routes()).use(router.allowedMethods());
}
