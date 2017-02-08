'use strict';
var assistProxy = require('./proxy/assist');
var fs = require('fs');
/**
 * 系统启动时执行的操作
 */
exports.boot = function () {
    let logPath = './logs';
    //同步创建log目录
    if (!fs.existsSync(logPath)) {
        fs.mkdirSync(logPath);
    }
    //初始化全局变量
    global.isDebug = process.env.NODE_ENV == 'development'; //判断环境模式
    if (global.isDebug) {//根据环境加载配置文件
        global.appSettings = require('./config/development/appsettings.json');
    }
    else {
        global.appSettings = require('./config/production/appsettings.json');
    }
    global.Promise = require('bluebird');
    global.cache = require('memory-cache');
    global.logger = require('./utils/logger');
    global.tools = require('./utils/tools');
    global.appData = require('./utils/appdata');//加载基础数据
    global.debug = require('debug');

    try {
        global.assetsMap = require('./assets/assets.json');
    } catch (e) {
        logger.error('You must execute `grunt assetsbuild` before start app when debug is not true.');
        throw e;
    }


    appData.init();//启动时初始化基础数据
    assistProxy.initFeedbackBlackData();
    assistProxy.initBrandData();
}