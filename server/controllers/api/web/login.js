const { user } = require('../../../database/model/user');
const bcrypt = require('bcryptjs');
const { getClientIP, sendEmail, Crypt, JwtJson, successStructure, failStructure } = require('../../../../utils/node');

function hashSync(text) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(text, salt);
}

function sendmail(email) {
    const Token = {
        time: Date.now(),
        email
    }
    // 加密数据
    const crypt = new Crypt(JSON.stringify(Token));
    const hash = crypt.publicCrypt();
    return {
        // 收件人地址，多个收件人可以使用逗号分隔
        to: email,
        // 邮件标题
        subject: '密码重置',
            // 邮件内容
        html: `
            <p style="font-family:Arial, Verdana, sans-serif;font-size:13px;color: #000000;margin:10px 0 20px 0;font-weight: bold;">尊敬的 ${email}：</p>
            <p style="font-family:Arial, Verdana, sans-serif;font-size:13px;color: #000000;margin:10px 0; line-height: 20px;">我们最近收到了您账户的密码更改请求。
            <br>如果这是您本人的操作，请点击以下链接重置您的密码。</p>
            <p style="font-family:Arial, Verdana, sans-serif;font-size:13px;color: #000000;margin:10px 0; line-height: 20px;">
                <a style="color: #515151" href="http://localhost:3030/login/forgotPassword?Token=${hash}" rel="noopener" target="_blank">请点击此处设置新密码</a>
            </p>
            <p style="font-family:Arial, Verdana, sans-serif;font-size:13px;color: #000000;margin:10px 0; line-height: 20px;">如果这不是您本人的操作，请忽略此邮件，您的密码将保持不变。</p>
            <p style="font-family:Arial, Verdana, sans-serif;font-size:13px;color: #000000;margin:10px 0; line-height: 20px;">此致，<br>Saear官方网站</p>
        `
    };
}

// 登出
exports.loginOut = () => {
    return (ctx) => {
        ctx.cookies.set('token', null, { signed: false, maxAge: 0 });
        successStructure(ctx);
    }
}

// 登录
exports.login = () => {
    return async (ctx) => {
        const { email, password } = ctx.request.body || {};
        const findInfo = await user.findOne({ email });
        if (!findInfo) return failStructure(ctx, 10016, '该用户不存在');
        // 密码错误登录失败
        if (!bcrypt.compareSync(password, findInfo.password)) return failStructure(ctx, 10015, '密码错误');
        // 登录成功，返回token到前端
        const jwt = new JwtJson();
        const token = jwt.generateToken({ email });
        successStructure(ctx, { token });
    }
}

// 注册
exports.register = () => {
    return async (ctx) => {
        const { body, header } = ctx.request;
        const { email, gender, subscribeEmail, password } = body;
        const res = await user.findOne({ email });
        if (res) return failStructure(ctx, 1001);
        // 保存用户信息
        const saveInfo = await new user({
            // 获取设备信息
            registerDevice: header['user-agent'],
            // 获取IP地址
            registerIp: getClientIP(ctx.request),
            email, gender, subscribeEmail, password: hashSync(password)
        }).save()
        saveInfo ? successStructure(ctx) : failStructure(ctx, 10010);
    }
}

/**
 * 找回密码
 * type
 * - send 发送邮件
 * - alter 修改密码
 */
exports.forgot = () => {
    return async (ctx) => {
        const { type, email, password, Token } = ctx.request.body;
        if (type === 'send') {
            const findUser = await user.findOne({ email });
            if (!findUser) return failStructure(ctx, 10016);
            const mailOptions = sendmail(email);
            // 发送邮件
            const sendState = await sendEmail(mailOptions);
            sendState ? successStructure(ctx) : failStructure(ctx, 10019);
        } else {
            const crypt = new Crypt();
            const private = await crypt.privateCrypt(Token);
            // 解密失败
            if (!private) return failStructure(ctx, 10031);
            const testData = JSON.parse(private) || {};
            // // 1个小时失效
            const invalid = 60 * 60 * 1000;
            if (Date.now() - testData.time > invalid) return failStructure(ctx, 10030);
            const findUser = await user.findOne({ email: testData.email });
            if (!findUser) return failStructure(ctx, 10016);
            const editPwd = await user.updateOne({ email: testData.email }, {
                password: hashSync(password)
            })
            editPwd ? successStructure(ctx) : failStructure(ctx, 10032);
        }
    }
}