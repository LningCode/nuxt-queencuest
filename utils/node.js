const nodemailer = require('nodemailer');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const secret = 'jwt_token_secret';
const koaJwt = require('koa-jwt')({ secret });
const logger = require('./log4');

const publicKey = fs.readFileSync(path.join(__dirname, './rsa_key/rsa_public_key.pem'));
const privateKey = fs.readFileSync(path.join(__dirname, './rsa_key/rsa_private_key.pem'));

/**
 * 创建文件夹
 * @dirname 文件名称
 */
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}

/**
 * @getClientIP
 * @desc 获取用户 ip 地址
 * @param {Object} req - 请求
 */
function getClientIP(req) {
    const { remoteAddress, socket = {} } = req.connection || {}
    return req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
        remoteAddress || // 判断 connection 的远程 IP
        req.socket.remoteAddress || // 判断后端的 socket 的 IP
        socket.remoteAddress;
};

// 创建可重用邮件传输器
const transporter = nodemailer.createTransport({
    host: 'smtpdm.aliyun.com', // 阿里云的邮件地址
    port: 80, // 端口
    secureConnection: false, // use SSL
    auth: {
        // 邮箱账号(发信地址)
        user: 'cody@email.saear.net',
        // 其他邮箱为授权码，在阿里云是SMTP密码，需要设置一下 LFNabc115200
        pass: 'LFNabc115200'
    }
});

function sendEmail(mailOptions = {}) {
    const option = {
        // 发件人地址(发信地址)
        from: 'cody@email.saear.net',
        ...mailOptions
    }
    return new Promise((resolve) => {
        transporter.sendMail(option, (error) => {
            if (error) {
                resolve(false)
            } else {
                resolve(true)
            }
        });
    })
}

/**
 * 生成随机数
 * @param {*} leng 长度
 * @param {*} type
 * - mixing 混合
 * - number 数字
 */
function mathRand(leng = 24, type) {
    const str = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
    const limt = type === 'number' ? 10 : str.length;
    let Num = '';
    for (let i = 0; i < leng; i++) {
        const random = Math.floor(Math.random() * limt);
        Num += str.substr(random, 1);
    }
    return Num
}

/**
 * 创建加密/解密方法
 * @data 加密数据或解密数据
 */
class Crypt {
    constructor(data) {
        this.data = data
    }
    // 公钥加密
    publicCrypt() {
        const encrypted = crypto.publicEncrypt(publicKey, Buffer.from(this.data));
        return encrypted.toString('base64');
    }
    // 私钥解密
    privateCrypt(enc_by_pub) {
        return new Promise((resolve) => {
            try {
                const buffer2 = Buffer.from(enc_by_pub.replace(/\s+/g, '+'), 'base64');
                const decrypted = crypto.privateDecrypt(privateKey, buffer2);
                resolve(decrypted.toString('utf-8'));
            } catch (error) {
                resolve(false);
            }
        });
    }
}

/**
 * Token
 * @generateToken 生成token
 * @verifyToken 校验token
 */
class JwtJson {
    generateToken(payload) {
        return jwt.sign(payload, secret, { expiresIn: '1h' });
    }
    verifyToken(token) {
        return jwt.verify(token, secret, {
            complete: true
        });
    }
}

/**
 * 获取登录邮箱
 * @param {*} ctx koa上下文
 */
function getLoginEmail({ cookies }) {
    const token = cookies.get('token');
    const jwt = new JwtJson();
    const restk = jwt.verifyToken(token);
    if (!restk) return null;
    const { email } = restk.payload;
    return email;
}

/**
 * 成功返回前端响应结构
 * @param {*} ctx 上下文
 * @param {*} data 数据
 * @param {*} message 提示语
 */
function successStructure(ctx, data = null, message = 'success') {
    ctx.status = 200
    ctx.body = {
        data, message, errorCode: 200, status: 200
    }
}

/**
 * 失败返回前端响应结构
 * @param {*} ctx 上下文
 * @param {*} errorCode 错误码
 * @param {*} message 提示语
 * @param {*} status 响应状态
 * @param {*} errorMessage 错误提示语
 */
function failStructure(ctx, errorCode = 500, message = 'error', status = 500, errorMessage = 'error') {
    ctx.status = status
    ctx.body = {
        errorCode, message, status, errorMessage
    }
}

/**
 * 监听全局报错
 * @param {*} app node根app
 */
function errorHandler(app) {
    app.use(async (ctx, next) => {
        try {
            await next();
        } catch (error) {
            logger.error(error);
            const code = error.status || 500;
            const message = error.status === 200 ? 'success' : 'error';
            failStructure(ctx, code, message, code, 'There is an error in the program, please contact customer service! 1170096634@qq.com');
        }
    })
}

/**
 * 设置当前年月日的格式
 * 2019-11-11
 */
function nowFormatDate() {
    const date = new Date();
    const sep = '-';
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    const currentdate = date.getFullYear() + sep + month + sep + strDate;
    return currentdate.toString();
}

/**
 * 格式化添加模型数据
 * @ctx 上下文
 * @schema 模型
 */
function mapSchemamodel(ctx, schema) {
    const elemt = {};
    const bodyJson = ctx.request.body || {};
    Object.keys(schema).forEach(item => {
        elemt[item] = bodyJson[item]
    });
    return elemt
}

module.exports = {
    getClientIP,
    sendEmail,
    mathRand,
    Crypt,
    JwtJson,
    koaJwt,
    getLoginEmail,
    successStructure,
    failStructure,
    errorHandler,
    nowFormatDate,
    mkdirsSync,
    mapSchemamodel
}