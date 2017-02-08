'use strict';
var assistProxy = require('../proxy/assist');

/**
 * 获取ip
 */
exports.getIp = function (ip) {
    return new Promise((resolve, reject) => {
        var result = {};
        var uri = appSettings.api.ip + '?ip=' + ip;
        tools.request(uri).then(() => {
            if (tools.isNotNullOrEmpty(body)) {
                result = JSON.parse(body);
            }
        }).finally(() => {
            resolve(result);
        });
    })
}

/**
 * 是否存在性别歧视
 */
exports.isSexism = function (input) {
    var data = appData.getAssistData();
    if (!data) return false;
    return data.sexismWords.indexOf(input) > -1;
}

/**
 * 移除性别歧视词语
 */
exports.removeSexismWords = function (input) {
    var data = appData.getAssistData();
    if (!data) return input;
    for (var v in data.sexismWords) {
        input = tools.replaceAll(input, data.sexismWords[v], '');
    }
    return input;
}

/**
 * 是否是参与活动企业的职位
 */
exports.isJyywlCompany = function (companyId) {
    var data = appData.getAssistData();
    return data.jyywlCompanys.ids.indexOf(companyId) > -1;
}


/**
 * 是否是达人秀企业
 */
exports.isDrxCompany = function (companyId) {
    var data = appData.getAssistData();
    return data.drxCompanys.ids.indexOf(companyId) > -1;
}

/**
 * 是否为最佳雇主企业
 */
exports.isBestCompany = function (companyId) {
    var data = appData.getAssistData();
    return data.bestCompanys.ids.indexOf(companyId) > -1;
}



/**
 * 是否为反馈率黑名单
 */
exports.isFeedbackBlackCompany = function (companyId) {
    var data = appData.getFeedbackBlacksData();
    return data.indexOf(companyId) > -1;
}


/**
  * 获取公司信息
  * 
  */
exports.getCompanyInfo = function (companyId) {
    return new Promise((resolve, reject) => {
        var companyInfo = {
            companyLogoUrl: '',
            companyLogo: '',
            companyName: '',
            companyIndustryName: '',
            companyTypeName: '',
            companySizeName: '',
            companyType: '',
            companySize: '',
            companyUrl: '',
            isCompany: false,
            isLogin: false
        };

        if (companyId.toLowerCase().indexOf('cz') > -1) {
            exports.getCzCompanyInfo(companyId).then(result => {
                if (result) {
                    var data = result.data;
                    if (data.logourl) {
                        companyInfo.companyLogoUrl = data.logourl;
                        companyInfo.companyLogo = '<img src="' + data.logourl + '" style="padding-right:5px;"/>';
                    }
                    companyInfo.companyName = data.companyname;
                    companyInfo.companyType = data.companytype;
                    companyInfo.companySize = data.companysize;
                    companyInfo.companyUrl = data.introurl;
                    companyInfo.companyIndustryName = tools.util.format('%s %s', appData.getIndustryName(data.industryid), appData.getIndustryName(data.industryid2))
                    companyInfo.companyTypeName = appData.getCompanyTypeName(companyInfo.companyType);
                    companyInfo.companySizeName = appData.getCompanySizeName(companyInfo.companySize);
                }
            }).finally(() => {
                resolve(companyInfo);
            });
        }
        else {
            exports.getRdCompanyInfo(companyId).then(result => {
                if (result) {
                    var data = result.Data;
                    if (data.LogoInfo && data.LogoInfo.LogoUrl) {
                        companyInfo.companyLogoUrl = data.LogoInfo.LogoUrl;
                        companyInfo.companyLogo = '<img src="' + data.LogoInfo.LogoUrl + '" style="padding-right:5px;"/>';
                    }
                    companyInfo.companyName = data.CompanyName;
                    companyInfo.companyType = data.CompanyType;
                    companyInfo.companySize = data.CompanySize;
                    companyInfo.companyUrl = data.IntroUrl;
                    companyInfo.isCompany = data.IsCompany == 'Y';
                    companyInfo.isLogin = data.IsLogin == 'Y';
                    for (var v in data.IndustryId) {
                        companyInfo.companyIndustryName += appData.getIndustryName(data.IndustryId[v]) + ' '
                    }
                    companyInfo.companyTypeName = appData.getCompanyTypeName(companyInfo.companyType);
                    companyInfo.companySizeName = appData.getCompanySizeName(companyInfo.companySize);
                }
            }).finally(() => {
                resolve(companyInfo);
            });
        }
    });
}


/**
 * 获取深圳公司信息
 */
exports.getCzCompanyInfo = function (companyId) {
    return new Promise((resolve, reject) => {
        var result = null;
        var uri = appSettings.api.czCompany + companyId;
        tools.requestJson(uri).then(body => {
            if (body) {
                result = body
            }
        }).finally(() => {
            resolve(result);
        });
    })
}


/**
 * 获取Rd公司信息
 */
exports.getRdCompanyInfo = function (companyId) {
    return new Promise((resolve, reject) => {
        var result = null;
        var uri = appSettings.api.company + companyId + '/1';
        tools.requestJson(uri).then(body => {
            if (body) {
                result = body
            }
        }).finally(() => {
            resolve(result);
        });
    })
}


/**
  * 加载反馈率白名单，缓存6小时
  */
exports.initFeedbackBlackData = function () {
    var data = [], cacheTime = 1000 * 60 * 5;

    var setCache = () => {
        cache.put('feedbackblacksdata', data, cacheTime, function (key, value) {
            logger.info('反馈率白名单缓存过期,等待重新加载。。。');
            exports.initFeedbackBlackData();
        });
        logger.info('反馈率白名单缓存加载完成');
    }

    tools.requestJson(appSettings.api.feedbackBlack).then(body => {
        if (body) {
            data = body.Data;
            cacheTime = 1000 * 60 * 30;
        }
        setCache();
    }).catch(ex => {
        logger.error('init feedback black data error', ex);
        setCache();
    })
}

/**
 * 搜索结果转换
 */
function jobConvert(searchResult) {
    try {
        for (var i in searchResult.results) {
            var jobInfo = searchResult.results[i];
            jobInfo.jobName = assistProxy.removeSexismWords(jobInfo.jobName);
            jobInfo.displayDate = tools.dateFormat(jobInfo.updateDate, false, 'MM-DD');
            var exposurePara = 'ssidkey=y';
            //设置投递方式监控数据
            if (!jobInfo.applyType === '1') {
                jobInfo.applyFlag = '0';
                jobInfo.batchApplyFlag = '_0';
            } else {
                jobInfo.applyFlag = '_1_03_201__2_';
                jobInfo.batchApplyFlag = '_1_03_201__1_';
                exposurePara += '&ss=201&ff=03';
            }
            var salary = jobInfo.salary;
            if (salary.min != 0 || salary.max != 0) {
                if (salary.max == 1000) {
                    salary.display = '1000元以下';
                }
                else if (salary.max == 99999) {
                    salary.display = tools.util.format('%s', salary.min - 1);
                }
                else {
                    salary.display = tools.util.format('%s-%s', salary.min, salary.max);
                }
            }
            else {
                salary.display = '面议';
            }
            jobInfo.exposurePara = exposurePara;
            jobInfo.number = tools.util.format('%s_%s', jobInfo.number, jobInfo.city.items[0].code);
            if (jobInfo.positionURL.toLowerCase().indexOf('.zhaopin.com') < 1) {
                var url = jobInfo.positionURL.toLowerCase();
                var sign = tools.utils.md5(tools.util.format('%s%s', url, appSettings.safeKey));
                jobInfo.positionURL = tools.util.format('redirecturl?url=%s&sign=%s', tools.utils.encodeURIComponent(url), sign);
            }
        }
        return searchResult;
    }
    catch (ex) {
        logger.error('search convert error', ex);
        return null;
    }
}

/**
 * 加载品牌专区数据，缓存30分钟
 */
exports.initBrandData = function () {
    var data = [], cacheTime = 1000 * 60 * 5;

    var setCache = () => {
        cache.put('branddata', data, cacheTime, function (key, value) {
            logger.info('品牌专区缓存过期,等待重新加载。。。');
            exports.initBrandData();
        });
        logger.info('品牌专区缓存加载完成');
    }

    tools.requestJson(appSettings.api.brand).then(body => {

        if (!body || body.length == 0) {
            setCache();
            return;
        }

        data = body;

        var promises = [];
        data.forEach(function (item) {
            item.welfare = [];
            item.smallJobType = '';
            item.companyName = '';
            item.companyUrl = '';
            item.jobInfo = [];
            promises.push(exports.getCompanyInfo(item.promoteCompany));
        })

        //并行获取公司信息
        Promise.all(promises).then(results => {

            promises = [];

            for (var v in data) {
                var item = data[v];
                var companyInfo = results[v];

                if (companyInfo.isCompany && companyInfo.isLogin) {
                    item.companyName = companyInfo.companyName;
                    item.companyUrl = companyInfo.companyUrl;
                }

                var positionIds = [];
                if (tools.isNotNullOrEmpty(item.promotePosition1))
                    positionIds.push(tools.trim(item.promotePosition1));
                if (tools.isNotNullOrEmpty(item.promotePosition2))
                    positionIds.push(tools.trim(item.promotePosition2));
                if (tools.isNotNullOrEmpty(item.promotePosition3))
                    positionIds.push(tools.trim(item.promotePosition3));

                promises.push(tools.requestJson(tools.util.format('%s?rows=10&start=0&client=%s&ip=127.0.0.1&S_SOU_POSITION_ID=%s', appSettings.api.search, appSettings.client, positionIds.join(';'))));

            }

            //并行获取职位信息
            Promise.all(promises).then(results => {
                for (var v in data) {
                    var item = data[v];
                    var result = results[v];
                    if (!result) continue;
                    result = jobConvert(result);
                    if (!result) continue;
                    result.results.forEach(jobInfo => {
                        if (tools.isNullOrEmpty(item.companyName))
                            item.companyName = jobInfo.company.name;
                        if (tools.isNullOrEmpty(item.companyUrl))
                            item.companyUrl = jobInfo.company.url;
                        if (jobInfo.jobType.items.length > 0) {
                            item.smallJobType += tools.util.format("%s,", jobInfo.jobType.items[1].code.padLeft(3, '0'));
                        }
                        if (tools.isNotNullOrEmpty(jobInfo.welfare)) {
                            jobInfo.welfare.split(',').forEach(function (w) {
                                if (item.welfare.indexOf(w) < 0 && item.welfare.length < 7) {
                                    item.welfare.push(w);
                                }
                            });
                        }
                        item.jobInfo = result.results;
                    });
                }
                cacheTime = 1000 * 60 * 30;
            }).catch(ex => {
                logger.error('init brand data error', ex);
            }).finally(() => {
                setCache();
            });
        }).catch(ex => {
            logger.error('init brand data error', ex);
            setCache();
        })
    }).catch(ex => {
        logger.error('init brand data error', ex);
        setCache();
    });
}
