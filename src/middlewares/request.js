'use strict';
/**
 * 记录请求执行时间
 */
module.exports = function () {
  return function (req, res, next) {
    // Assets do not out log.
    if (exports.ignore.test(req.url)) {
      next();
      return;
    }

    var t = new Date();
    logger.info('Request Started', tools.dateFormat(t, false, 'YYYY-MM-DD HH:mm:ss'), req.method, req.url, res.locals.clientIp);

    res.on('finish', function () {
      var duration = ((new Date()) - t);

      logger.info('Request Completed', res.statusCode, ('(' + duration + 'ms)'));
    });

    next();
  };
};
exports.ignore = /^\/(assets|agent)/;
