const log4js = require('log4js');

// 打印node错误日志
log4js.configure({
    appenders: { cheese: { type: 'file', filename: './logs/error-log.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
});

const logger = log4js.getLogger('cheese');

module.exports = logger


