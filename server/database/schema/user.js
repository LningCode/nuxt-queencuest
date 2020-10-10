const mongoose = require('mongoose');
const { mathRand } = require('../../../utils/node');

/**
 * 用户信息结果
 * @userName 用户名称
 * @nickname 昵称
 * @phone 手机号码
 * @email 邮箱
 * @password 密码
 * @registerIp 注册ip
 * @registerDevice 注册设备
 * @subscribeEmail 是否订阅邮件(true/false)
 * @gender 性别(1男/2女)
 * @appellation 称呼
 * @firstName 名字
 * @lastName 性氏
 * @country 国家
 * @state 地区
 * @city 城市
 * @addressLine 详细地址
 * @birthday 生日
 * @createDate 创建时间
 * @updateDate 更新时间
 */
exports.userSchema = new mongoose.Schema({
    userNo: {
        type: String,
        required: true,
        default: mathRand()
    },
    userName: String,
    nickname: String,
    phone: Number,
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    registerIp: String,
    registerDevice: String,
    subscribeEmail: Boolean,
    gender: {
        type: Number,
        required: true
    },
    appellation: Number,
    firstName: String,
    lastName: String,
    country: String,
    state: String,
    city: String,
    addressLine: String,
    birthday: String,
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
});