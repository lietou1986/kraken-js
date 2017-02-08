'use strict';

var SearchProxy = require('../../proxy/search');
var assistProxy = require('../../proxy/assist');
var DataHandler = require('./datahandler');

exports.index = function (req, res) {
    var searchInfo = res.locals.searchInfo;
    if (searchInfo.IsAdv)
        return exports.advJobSearch(req, res);
    return exports.jobSearch(req, res);
};

/**
 * 职位搜索
 */
exports.jobSearch = function (req, res) {

    var searchInfo = res.locals.searchInfo;
    var searchProxy = new SearchProxy(searchInfo);

    Promise.all([searchProxy.search(), searchProxy.getBrandInfo()]).then(values => {
        var searchResult = values[0];
        var brandInfo = values[1];

        var dataHandler, initViewData = function () {
            return {
                searchResult: dataHandler.getSearchResult(),
                complementResult: dataHandler.getComplementResult(),
                searchInfo: searchInfo,
                tagInfo: dataHandler.getTagFilterData(),
                searchData: dataHandler.getSearchData(),
                brandInfo: brandInfo,
                pagination: dataHandler.getPagination(),
                exposureData: dataHandler.getExposureData(),
                seoInfo: {
                    relationLink: dataHandler.getRelationLink(),
                    headMeta: dataHandler.getHeadMeta(),
                    juLink: dataHandler.getJuLink(),
                    cityLink: dataHandler.getCityLink(),
                },
                debugInfo: searchInfo.debugInfo.concat(searchProxy.getDebugInfo()).concat(dataHandler.getDebugInfo())
            };
        }

        //多职位或者少职位补数
        if (searchResult.numFound <= 10 && searchInfo.SortBy !== 3) {
            var needSize = appSettings.pageSize - searchResult.numFound;
            searchProxy.complement(needSize).then(complementResult => {
                dataHandler = new DataHandler(req, res, searchInfo, searchResult, complementResult);
                res.render('jobs/jobsearch', initViewData());
            });
        }
        else {
            dataHandler = new DataHandler(req, res, searchInfo, searchResult);
            res.render('jobs/jobsearch', initViewData());
        }
    })
};

/**
 * 高级职位搜索
 */
exports.advJobSearch = function (req, res) {

    var searchInfo = res.locals.searchInfo;
    var searchProxy = new SearchProxy(searchInfo);

    Promise.all([searchProxy.search(), searchProxy.getBrandInfo()]).then(values => {
        var searchResult = values[0];
        var brandInfo = values[1];

        var dataHandler, initViewData = function () {
            return {
                searchResult: dataHandler.getSearchResult(),
                complementResult: dataHandler.getComplementResult(),
                searchInfo: searchInfo,
                searchData: dataHandler.getSearchData(),
                brandInfo: brandInfo,
                pagination: dataHandler.getPagination(),
                exposureData: dataHandler.getExposureData(),
                seoInfo: {
                    relationLink: dataHandler.getRelationLink(),
                    headMeta: dataHandler.getHeadMeta(),
                    juLink: dataHandler.getJuLink(),
                    cityLink: dataHandler.getCityLink(),
                },
                debugInfo: searchInfo.debugInfo.concat(searchProxy.getDebugInfo()).concat(dataHandler.getDebugInfo())
            };
        }

        //多职位或者少职位补数
        if (searchResult.numFound <= 10 && searchInfo.SortBy !== 3) {
            var needSize = appSettings.pageSize - searchResult.numFound;
            searchProxy.complement(needSize).then(complementResult => {
                dataHandler = new DataHandler(req, res, searchInfo, searchResult, complementResult);
                res.render('jobs/advjobsearch', initViewData());
            });
        }
        else {
            dataHandler = new DataHandler(req, res, searchInfo, searchResult);
            res.render('jobs/advjobsearch', initViewData());
        }
    })
};


/**
 * 公司职位搜索
 */
exports.companySearch = function (req, res) {

    var searchInfo = res.locals.searchInfo;
    var searchProxy = new SearchProxy(searchInfo);

    Promise.all([searchProxy.search(), searchProxy.getBrandInfo(), assistProxy.getCompanyInfo(searchInfo.CompanyID)]).then(values => {
        var searchResult = values[0];
        var brandInfo = values[1];
        var companyInfo = values[2];

        var dataHandler = new DataHandler(req, res, searchInfo, searchResult);

        var viewData = {
            searchResult: dataHandler.getSearchResult(),
            searchInfo: searchInfo,
            searchData: dataHandler.getSearchData(),
            brandInfo: brandInfo,
            pagination: dataHandler.getPagination(),
            exposureData: dataHandler.getExposureData(),
            seoInfo: {
                juLink: dataHandler.getJuLink(),
                cityLink: dataHandler.getCityLink(),
            },
            companyInfo: companyInfo,
            debugInfo: searchInfo.debugInfo.concat(searchProxy.getDebugInfo()).concat(dataHandler.getDebugInfo())
        };
        res.render('jobs/companysearch', viewData);
    });
};


exports.redirectUrl = function (req, res) {

    var defaultUrl = 'http://www.zhaopin.com';

    if (!req.query.url || !req.query.sign) {
        res.redirect(defaultUrl);
        return;
    };

    var sign = sign.substr(0, 32).toLowerCase();

    if (sign != tools.utils.md5(tools.util.format('%s%s', url.toLowerCase(), appSettings.safeKey)).toLowerCase()) {
        res.redirect(defaultUrl);
        return;
    }

    res.redirect(url);
}



