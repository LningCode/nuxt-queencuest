const mongoose = require('mongoose');
const { userSchema } = require('../schema/user');
/**
 * 用户信息表
 * images 表名
 * schema 数据模型
 */
exports.user = mongoose.model('user', userSchema, 'user');