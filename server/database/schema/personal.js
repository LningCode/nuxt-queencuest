const mongoose = require('mongoose');
const { mathRand } = require('../../../utils/node');

/**
 * 收货地址信息
 * @addressNo 地址编号
 * @firstName 名字
 * @lastName 姓氏
 * @country 国家
 * @state 地区
 * @city 城市
 * @addressLine1 详细地址1
 * @addressLine1 详细地址2
 * @postCode 邮编
 * @phone 手机
 * @selfEmail 当前添加用户名（邮箱）
 * @createDate 创建时间
 * @updateDate 更新时间
 */
const addressInterface = {
    addressNo: {
        type: String,
        required: true,
        default: mathRand()
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: String,
    postCode: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    selfEmail: {
        type: String,
        required: true
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date
    }
}
exports.addressInterface = addressInterface;
exports.addressSchema = new mongoose.Schema(addressInterface);

/**
 * 提交留意联系方式
 * @contactusNo 编号
 * @username 用户名
 * @email 邮箱
 * @phone 手机
 * @theme 主题（标题）
 * @comments 内容
 * @createDate 创建时间
 * @updateDate 更新时间
 */
exports.contactusSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    theme: {
        type: String,
        required: true
    },
    comments: String,
    createDate: {
        type: Date,
        default: Date.now
    },
    updateDate: {
        type: Date,
        default: Date.now
    }
});