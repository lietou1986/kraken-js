'use strict';
/**
 * 全局过滤
 */
module.exports = function () {
    return function (req, res, next) {
        res.locals.clientIp = req.headers[appSettings.clientIpHttpHeadName] ||
            req.headers[appSettings.clientIpSubHttpHeadName] ||
            '127.0.0.1';
        next();
    };
};