'use strict';

var log4js = require('log4js');
log4js.configure('./config/log4js.json');

const logger = log4js.getLogger('log');

logger.level = 'debug';

module.exports = logger;
