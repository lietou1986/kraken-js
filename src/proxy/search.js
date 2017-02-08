'use strict';

var assistProxy = require('./assist');
var Stopwatch = require('../utils/stopwatch');
var SearchType = require('../models/searchtype');

function searchProxy(searchInfo) {

    var debugInfo = [];
    var querys;

    /**
     * 教育经历转换
     */
    function getEdu() {
        var dataMap = appData.getEducationMap();
        var edu = [];
        var temps = searchInfo.EduLevel.split(';');
        for (var v in temps) {
            var value = dataMap.get(temps[v]);
            if (value) {
                edu.push(value);
            }
        }
        return edu.join(';');
    }

    /**
     * 组装查询条件
     * 私有方法
     */
    function buildQuery() {
        if (searchInfo.IsDebug) {
            var timer = new Stopwatch();
            timer.start();
        }
        querys = new Object();

        if (tools.isNotNullOrEmpty(searchInfo.KeyWords)) {

            if (assistProxy.isSexism(searchInfo.KeyWords)) return null;

            switch (searchInfo.KeyWordType) {
                case 2:
                    querys.S_SOU_COMPANY_NAME = searchInfo.KeyWords;
                    break;
                case 3:
                    querys.S_SOU_POSITION_NAME = searchInfo.KeyWords;
                    break;
                default:
                    querys.S_SOU_FULL_INDEX = searchInfo.KeyWords;
                    break;

            }
        }
        if (tools.isNotNullOrEmpty(searchInfo.FilterJobTag)) {
            querys.S_SOU_WELFARETAB = searchInfo.FilterJobTag;
        }
        if (tools.isNotNullOrEmpty(searchInfo.CompanyID)) {
            querys.S_SOU_COMPANY_ID = searchInfo.CompanyID;//原来添加有*号
        }
        if (tools.isNotNullOrEmpty(searchInfo.Industry)) //行业
        {
            querys.S_SOU_INDUSTRY = searchInfo.Industry;
        }
        if (tools.isNotNullOrEmpty(searchInfo.PublishDate)) //发布时间
            querys.S_SOU_REFRESH_DATE = searchInfo.PublishDate;

        if (tools.isNotNullOrEmpty(searchInfo.CompanyType)) //公司类型
            querys.S_SOU_COMPANY_TYPE = searchInfo.CompanyType;

        if (tools.isNotNullOrEmpty(searchInfo.CompanySize)) //公司规模
            querys.S_SOU_COMPANY_SCALE = searchInfo.CompanySize;

        if (tools.isNotNullOrEmpty(searchInfo.EmplType)) //职位类型
        {
            querys.S_SOU_POSITION_TYPE = searchInfo.EmplType;
        }
        if (tools.isNotNullOrEmpty(searchInfo.JobLocation) && searchInfo.JobLocation != '489') //工作地点
        {
            var location = searchInfo.Region
                ? searchInfo.Region
                : searchInfo.FilterLocation ? searchInfo.FilterLocation : searchInfo.JobLocation;
            querys.S_SOU_WORK_CITY = location;
        }


        if (tools.isNotNullOrEmpty(searchInfo.SubJobType)) {
            querys.S_SOU_JOB_TYPE = searchInfo.SubJobType;
        }

        else if (tools.isNotNullOrEmpty(searchInfo.JobType)) {
            querys.S_SOU_JOB_TYPE = searchInfo.JobType;
        }

        if (tools.isNotNullOrEmpty(searchInfo.WorkingExp)) //工作经验
        {
            querys.S_SOU_WORK_EXPERIENCE = searchInfo.WorkingExp;
        }

        if (tools.isNotNullOrEmpty(searchInfo.SalaryFrom) && tools.isNotNullOrEmpty(searchInfo.SalaryTo)) //薪资范围
        {
            if (!(searchInfo.SalaryFrom == '0' && searchInfo.SalaryTo == '99999'))//针对高级搜索（0~不限）
            {
                if (searchInfo.SalaryFrom == '0' && searchInfo.SalaryTo == '0') {
                    querys.S_SOU_SALARY_MIN = '0,0';
                    querys.S_SOU_SALARY_MAX = '0,0';
                }
                else if (searchInfo.SalaryFrom != '-1' && searchInfo.SalaryTo != '-1') {
                    querys.S_SOU_SALARY_MIN = '0,' + searchInfo.SalaryTo;
                    querys.S_SOU_SALARY_MAX = searchInfo.SalaryFrom + ',900000';
                }
            }
        }

        //坐标
        if (searchInfo.GeoLatitude > 0 && searchInfo.GeoLongitude > 0) {
            querys.S_SOU_COORDINATE = tools.util.format('%s;%s;%s', searchInfo.GeoLatitude, searchInfo.GeoLongitude, searchInfo.GeoRadius);
        }

        if (tools.isNotNullOrEmpty(searchInfo.Jyywl))
            querys.S_SOU_FUTUREJOBS = 1;

        if (tools.isNotNullOrEmpty(searchInfo.EduLevel)) {
            var edu = getEdu();
            if (tools.isNotNullOrEmpty(edu))
                querys.S_SOU_EDUCATION_LOWESTLEVEL = edu;
        }


        if (searchInfo.ExcludedCompanyIds.length > 0) {
            querys.S_EXCLUSIVE_SOU_COMPANY_ID = searchInfo.ExcludedCompanyIds.join(';');
        }

        var facets = [];
        if (!searchInfo.IsCompanyJobSearch) {
            switch (searchInfo.SortBy) {
                case 0://复合排序
                    querys.orderBy = 'score';
                    break;

                case 1://相关度排序
                    querys.orderBy = 'relate';
                    break;

                case 2://发布时间
                    querys.orderBy = 'publish';
                    break;

                case 3://最匹配
                    if (searchInfo.IsUseResumeMatch) {
                        var userInfo = searchInfo.UserInfo;
                        querys.orderBy = 'recommend';
                        querys.number = userInfo.ResumeNumber;
                        querys.userId = userInfo.UserID;
                        querys.version = tools.isNullOrEmpty(userInfo.ResumeVersion) ? '1' : userInfo.ResumeVersion;
                        var recommendInfo = searchInfo.Cookier.get(appSettings.cookies.recommendInfo);
                        if (tools.isNotNullOrEmpty(recommendInfo))
                            querys.info = recommendInfo;
                    }
                    else {
                        querys.orderBy = 'score';
                    }
                    break;
            }

            if (!searchInfo.IsAdv) {
                if (querys.S_SOU_JOB_TYPE || searchInfo.KeyWords)
                    facets.push('SOU_JOB_TYPE,SOU_WELFARETAB');
                else
                    facets.push('SOU_WELFARETAB');
            }
        }
        querys.start = (searchInfo.Page - 1) * searchInfo.PageSize;
        querys.rows = searchInfo.PageSize;
        querys.debug = searchInfo.IsDebug;
        querys.client = appSettings.client;
        querys.ip = searchInfo.ClientIp;
        if (facets.length > 0) {
            querys.facets = facets.join(';');
        }
        if (timer) {
            timer.stop();
            debugInfo.push('搜索表达式转换耗时(毫秒)：' + timer.getTime());
        }
        return querys;
    }

    /**
       * 搜索结果转换
       */
    function jobConvert(searchResult) {
        try {
            if (searchInfo.IsDebug) {
                var timer = new Stopwatch();
                timer.start();
            }

            var exposureData = { paras: [], companys: [] };
            for (var i in searchResult.results) {
                var jobInfo = searchResult.results[i];

                var company = jobInfo.company;
                if (searchInfo.ExcludedCompanyIds.indexOf(company.number) < 0) {
                    exposureData.companys.push({ id: company.number, name: company.name });
                }

                var companyId = tools.convert(jobInfo.number.substring(2, 7), 0);

                //TODO:考虑挪到psapi
                jobInfo.isBest = assistProxy.isBestCompany(companyId);
                jobInfo.isJyywl = assistProxy.isJyywlCompany(companyId) || jobInfo.isFutureJob;
                jobInfo.isDrx = assistProxy.isDrxCompany(companyId);

                if (jobInfo.saleType > 0)
                    jobInfo.topLink = tools.util.format('<a href="http://e.zhaopin.com/products/1/detail.do" target="_blank" title="点击“顶”字，了解更多"><img src="/images/top.png" border="0"   align="absmiddle">&nbsp;<img src="/images/jp.gif" border="0" align="absmiddle"></a>');
                if (jobInfo.isBest)
                    jobInfo.bestLink = tools.util.format('<a href="%s" target="_blank" style="vertical-align: top;"><img src="/images/best.png" border="0" align="absmiddle"></a>', appData.getAssistData().bestCompanys.link);
                if (jobInfo.isJyywl)
                    jobInfo.jyywlLink = tools.util.format('<a href="%s" target="_blank" style="width:70px;vertical-align: top;padding-right:5px;"><img src="/images/jyywl.jpg" border="0" align="absmiddle"></a>', appData.getAssistData().jyywlCompanys.link);
                if (jobInfo.isDrx)
                    jobInfo.drxLink = tools.util.format('<a href="%s" target="_blank" style="vertical-align: top;"><img src="/images/drx.png" border="0" align="absmiddle"></a>', appData.getAssistData().drxCompanys.link);

                //TODO:考虑挪到psapi
                jobInfo.jobName = assistProxy.removeSexismWords(jobInfo.jobName);
                jobInfo.jobDesc = assistProxy.removeSexismWords(jobInfo.jobDesc);

                //TODO:考虑挪到psapi(高亮耗时较多)
                jobInfo.jobName = tools.highlighting(jobInfo.jobName, searchInfo.KeyWords, searchInfo.SafeKeyWords);
                jobInfo.jobDesc = tools.highlighting(jobInfo.jobDesc, searchInfo.KeyWords, searchInfo.SafeKeyWords);
                jobInfo.company.name = tools.highlighting(company.name, searchInfo.KeyWords, searchInfo.SafeKeyWords);

                jobInfo.jobDesc = tools.subString(jobInfo.jobDesc, 150, '...');

                //如果是反馈率黑名单，反馈率设置为0
                if (jobInfo.feedbackRation < 0.5 || assistProxy.isFeedbackBlackCompany(companyId))
                    jobInfo.feedbackRation = '';
                else
                    jobInfo.feedbackRation = Math.round(jobInfo.feedbackRation * 100) + '%';

                if (searchInfo.SortBy === 2)
                    jobInfo.displayDate = tools.dateFormat(jobInfo.createDate, false, 'MM-DD');
                else
                    jobInfo.displayDate = tools.dateFormat(jobInfo.updateDate, false, 'MM-DD');

                var exposurePara = 'ssidkey=y';
                //设置投递方式监控数据
                if (!jobInfo.applyType === '1') {
                    jobInfo.applyFlag = '0';
                    jobInfo.batchApplyFlag = '_0';
                } else {
                    if (searchInfo.SearchType == SearchType.noResultComplement) {
                        jobInfo.applyFlag = '_1_03_3010__2_';
                        jobInfo.batchApplyFlag = '_1_03_3010__1_';
                        exposurePara += '&ss=3010&ff=03';

                    } else if (searchInfo.SearchType == SearchType.lessResultComplement) {
                        jobInfo.applyFlag = '_1_03_3011__2_';
                        jobInfo.batchApplyFlag = '_1_03_3011__1_';
                        exposurePara += '&ss=3011&ff=03';
                    } else if (searchInfo.SortBy === '3') {
                        jobInfo.applyFlag = '_1_32_201__2_';
                        jobInfo.batchApplyFlag = '_1_32_201__1_';
                        exposurePara += '&ss=201&ff=32';
                    } else if (jobInfo.saleType > 0) {
                        jobInfo.applyFlag = '_1_03_409__2_';
                        jobInfo.batchApplyFlag = '_1_03_409__1_';
                        exposurePara += '&ss=409&ff=03';
                    } else {
                        jobInfo.applyFlag = '_1_03_201__2_';
                        jobInfo.batchApplyFlag = '_1_03_201__1_';
                        exposurePara += '&ss=201&ff=03';
                    }
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

                exposureData.paras.push(tools.util.format('%s%s', jobInfo.number, jobInfo.batchApplyFlag));
            }
            searchResult.exposureData = exposureData;

            if (timer) {
                timer.stop();
                debugInfo.push('搜索结果转换耗时(毫秒)：' + timer.getTime());
            }
            return searchResult;
        }
        catch (ex) {
            logger.error('search jobConvert error', ex);
            return null;
        }
    }

    /**
     * 获取调试信息
     */
    this.getDebugInfo = function () {
        return debugInfo;
    }

    /**
     * 职位搜索
     */
    var search = this.search = function (searchType) {
        return new Promise((resolve, reject) => {
            if (searchInfo.IsDebug) {
                var timer = new Stopwatch();
                timer.start();
                debugInfo.push('psapi请求开始');
            }

            var result = {
                numFound: 0,
                results: [],
                debugInfo: [],
                facets: [],
                exposureData: { ids: '', paras: [], companys: [] }
            }

            var resolver = function () {
                resolve(result);
                if (timer) {
                    timer.stop();
                    debugInfo = debugInfo.concat(result.debugInfo);
                    debugInfo.push(uri);
                    debugInfo.push('psapi请求耗时(毫秒)：' + timer.getTime());

                }
            }

            querys = querys || buildQuery();

            if (!querys) { resolve(result); return; };

            var uri = appSettings.api.search;

            if (querys.orderBy) {
                uri += '/' + querys.orderBy;
                delete querys.orderBy; //删除排序字段
            }
            var queryArray = [];
            for (var q in querys) {
                queryArray.push(q + '=' + encodeURIComponent(querys[q]));
            }
            uri += '?' + queryArray.join('&');
            tools.requestJson(uri).then(function (body) {
                if (body) {
                    result = jobConvert(body) || result;
                }

            }).finally(() => {
                resolver();
            });
        })
    };


    /**
     * 补数
     */
    this.complement = function (needSize) {

        if (searchInfo.IsDebug) {
            var timer = new Stopwatch();
            timer.start();
            debugInfo.push('****************************************');
            debugInfo.push('补数请求开始');
        }

        var complementResult = {
            numFound: 0,
            results: [],
            debugInfo: [],
            facets: [],
            exposureData: { paras: [], companys: [] }
        };

        searchInfo.searchType = needSize < appSettings.pageSize ? SearchType.lessResultComplement : SearchType.noResultComplement;

        var concatResult = result => {
            //此处需要排重
            complementResult.results = complementResult.results.concat(result.results);
            complementResult.debugInfo = complementResult.debugInfo.concat(result.debugInfo);
            complementResult.exposureData.paras = complementResult.exposureData.paras.concat(result.exposureData.paras);
            complementResult.exposureData.companys = complementResult.exposureData.companys.concat(result.exposureData.companys);
        }

        var step1 = () => {
            return new Promise((resolve, reject) => {
                if (tools.isNotNullOrEmpty(searchInfo.FilterJobTag)) {
                    delete querys.facets;
                    delete querys.S_SOU_WELFARETAB;
                    search().then(result => {
                        concatResult(result);
                        resolve(complementResult.results.length >= needSize);
                    });
                }
                else {
                    resolve(false);
                }
            });
        };

        var step2 = () => {
            return new Promise((resolve, reject) => {
                if (tools.isNotNullOrEmpty(searchInfo.GeoAddress) && tools.isNotNullOrEmpty(searchInfo.GeoCenterCate)) {
                    delete querys.S_SOU_COORDINATE;
                    search().then(result => {
                        concatResult(result);
                        resolve(complementResult.results.length >= needSize);
                    });
                }
                else {
                    resolve(false);
                }
            });
        };

        var step3 = () => {
            return new Promise((resolve, reject) => {
                if (tools.isNotNullOrEmpty(searchInfo.Region) && tools.isNotNullOrEmpty(searchInfo.GeoAddress)) {
                    delete querys.S_SOU_COORDINATE;
                    search().then(result => {
                        concatResult(result);
                        resolve(complementResult.results.length >= needSize);
                    });
                }
                else {
                    resolve(false);
                }
            });
        };

        var step4 = () => {
            return new Promise((resolve, reject) => {
                if (tools.isNotNullOrEmpty(searchInfo.Region)) {
                    querys.S_SOU_WORK_CITY = searchInfo.FilterLocation ? searchInfo.FilterLocation : searchInfo.JobLocation;
                    search().then(result => {
                        concatResult(result);
                        resolve(complementResult.results.length >= needSize);
                    });
                }
                else {
                    resolve(false);
                }
            });
        };

        var step5 = () => {
            return new Promise((resolve, reject) => {
                if (tools.isNotNullOrEmpty(searchInfo.SubJobType)) {
                    delete querys.S_SOU_JOB_TYPE;
                    if (tools.isNotNullOrEmpty(searchInfo.JobType)) {
                        querys.S_SOU_JOB_TYPE = searchInfo.JobType;
                    }
                    search().then(result => {
                        concatResult(result);
                        resolve(complementResult.results.length >= needSize);
                    });
                }
                else {
                    resolve(false);
                }
            });
        };

        var step6 = () => {
            return new Promise((resolve, reject) => {
                if (tools.isNotNullOrEmpty(searchInfo.KeyWords) && (tools.isNotNullOrEmpty(searchInfo.JobType) || tools.isNotNullOrEmpty(searchInfo.SubJobType))) {
                    delete querys.S_SOU_COMPANY_NAME;
                    delete querys.S_SOU_POSITION_NAME;
                    delete querys.S_SOU_FULL_INDEX;
                    search().then(result => {
                        concatResult(result);
                        resolve(complementResult.results.length >= needSize);
                    });
                }
                else {
                    resolve(false);
                }
            });
        };



        return new Promise((resolve, reject) => {

            var resolver = function () {
                resolve(complementResult);
                if (timer) {
                    timer.stop();
                    debugInfo.push('补数请求耗时(毫秒)：' + timer.getTime());
                }
            }

            step1().then(v => {
                if (v) { resolver(); } else {
                    step2().then(v => {
                        if (v) { resolver(); } else {
                            step3().then(v => {
                                if (v) { resolver(); } else {
                                    step4().then(v => {
                                        if (v) { resolver(); } else {
                                            step5().then(v => {
                                                if (v) { resolver(); } else {
                                                    step6().then(v => {
                                                        resolver();
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
    }

    /**
     * 获取品牌专区信息
     */
    this.getBrandInfo = function () {

        return new Promise((resolve, reject) => {
            if (searchInfo.IsDebug) {
                var timer = new Stopwatch();
                timer.start();
                debugInfo.push('品牌专区请求开始');
            }

            var resolver = result => {
                resolve(result);
                if (timer) {
                    timer.stop();
                    debugInfo.push('品牌专区请求耗时(毫秒)：' + timer.getTime());
                }
            }

            if (searchInfo.Page > 1 || searchInfo.SortBy !== 0) {
                resolver(null);
                return;
            };
            var brandData = appData.getBrandData();
            if (brandData.length == 0) {
                resolver(null);
                return;
            }

            var isShow = brandInfo => {
                if (searchInfo.JobLocation != brandInfo.city)
                    return false;
                //大类搜索时,购买的大类等于搜索大类,则展示品牌专区职位
                if (searchInfo.JobType == brandInfo.subType && tools.isNullOrEmpty(searchInfo.SubJobType))
                    return true;
                //小类搜索时,品牌专区职位所属任一小类匹配任一搜索中的小类,则展示品牌专区职位
                if (tools.isNotNullOrEmpty(searchInfo.SubJobType) && tools.isNotNullOrEmpty(brandInfo.smallJobType)) {
                    //JobTitle职位小类
                    var smallJobTypes = brandInfo.smallJobType.split(',');
                    var subJobTypes = searchInfo.SubJobType.split(';');
                    for (var v in smallJobTypes) {
                        if (subJobTypes.indexOf(smallJobTypes[v]) > -1)
                            return true;
                    }
                }
                //无类别搜索时,用关键词匹配,若购买关键词包含搜索关键词,则展示品牌专区职位
                return tools.isNullOrEmpty(searchInfo.JobType)
                    && tools.isNotNullOrEmpty(searchInfo.KeyWords)
                    && tools.isNotNullOrEmpty(brandInfo.keyWords)
                    && brandInfo.keyWords.split('|').indexOf(searchInfo.KeyWords) > -1;
            }

            for (var v in brandData) {
                var brandInfo = brandData[v];
                if (isShow(brandInfo)) {
                    resolver(brandInfo);
                    return;
                }
            }
            resolver(null);
        })
    }
}

module.exports = searchProxy;