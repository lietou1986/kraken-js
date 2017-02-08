'use strict';
var SearchProxy = require('../../proxy/search');
var AssistProxy = require('../../proxy/assist');
var fs = require('fs');

/**
 * 获取ip地址
 */
exports.getIp = function (req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json;charset=utf-8' });
    var ip = req.param('ip') || res.locals.clientIp;
    if (!ip)
        res.end(JSON.stringify({ message: 'IP地址不能为空' }));
    else {
        AssistProxy.getIp(ip).then(result => {
            result.ip = ip;
            if (req.query.debug === '1')
                result.debugInfo = req.headers;
            res.end(JSON.stringify(result));
        });
    }
};


/**
 * 获取职位数量
 */
exports.getJobCount = function (req, res) {

    var searchInfo = res.locals.searchInfo;

    searchInfo.Page = 1;
    searchInfo.PageSize = 0;

    var searchProxy = new SearchProxy(searchInfo);

    searchProxy.search().then(result => {

        var numFound = 0;

        if (result)
            numFound = result.numFound;

        var jsonresult = tools.util.format('({{"JobsCount":"%s"}})', numFound);

        var callback = req.params['jsoncallback'] || 'jsoncallback';

        res.end(callback + jsonresult);

    });
};

/**
 * seo跳转
 */
exports.seoRedirect = function (req, res) {

    var defaultUrl = appSettings.host;
    var seoInfo = res.locals.seoInfo;

    try {
        if (!seoInfo.IsSeo)
            return res.redirect(defaultUrl);

        var redirectUrl = tools.util.format('%s/jobs/searchresult.ashx?kt=%s&kw=%s%s', defaultUrl, seoInfo.KeyWordType, encodeURIComponent(seoInfo.KeyWord),
            tools.isNullOrEmpty(seoInfo.Location) ? '' : '&jl=' + encodeURIComponent(seoInfo.Location));

        res.redirect(tools.util.format('http://cnt.zhaopin.com/Market/whole_counter.jsp?sid=%s&site=%s&url=%s', seoInfo.Sid, seoInfo.Site, redirectUrl));
    }
    catch (ex) {
        logger.error('Seo跳转异常', tools.util.format('urlReferrer:%s exception:%s', req.headers.referer || '', ex));
        res.redirect(defaultUrl);
    }
};

