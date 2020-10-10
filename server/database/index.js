const mongoose = require('mongoose');
const esm = require("esm")(module);
const config = esm('../../config');
const logger = require('../../utils/log4');

/**
 * 创建数据库连接
 * @logger {Obj} 记录错误日志对象
 * @app {Obj} 当前环境app
 */
module.exports = (app) => {
    const { port, host, dbname } = config.default.db
    // 连接数据库
    mongoose.connect(`mongodb://${host}:${port}/${dbname}`, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
        let text = '数据库连接成功!'
        if (error) {
            logger.error(error);
            text = '数据库连接失败！'
        }
        console.log(`${text}主机地址：${host} 端口号：${port} 名称：${dbname}, 其他信息：${error || '成功'}`)
    });
}