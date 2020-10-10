const mongoose = require('mongoose');
const { addressSchema, contactusSchema } = require('../schema/personal');
/**
 * 用户地址信息表
 * address 表名
 * schema 数据模型
 */
exports.Address = mongoose.model('address', addressSchema, 'address');

/**
 * 提交留意联系方式
 * contactus 表名
 * schema 数据模型
 */
exports.Contactus = mongoose.model('contactus', contactusSchema, 'contactus');