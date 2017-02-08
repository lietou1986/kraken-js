
var Map = require('hashmap');
var url = require('url');
var qs = require('querystring');
var assistProxy = require('../../proxy/assist');
var Stopwatch = require('../../utils/stopwatch');

/**
 * 填充视图数据
 */
function DataHandler(req, res, searchInfo, searchResult, complementResult) {

    var debugInfo = [];

    if (searchResult.numFound > 0) {
        searchInfo.IsHasSearchResult = true;

        //最匹配推荐信息
        var recommendInfo = searchInfo.Cookier.get(appSettings.cookies.recommendInfo);
        if (searchResult.Extend != recommendInfo) {
            searchInfo.Cookier.set(appSettings.cookies.recommendInfo, searchResult.Extend, 10);
        }
    }

    if (complementResult && complementResult.results.length > 0) {
        searchInfo.IsHasSearchResult = true;
        searchInfo.IsUseSearchComplement = true;
    }

    /**
     * 处理曝光数据
     */
    this.getExposureData = function () {
        var exposureData = { ids: '', paras: [], companys: [] };
        exposureData.paras = exposureData.paras.concat(searchResult.exposureData.paras);
        exposureData.companys = exposureData.companys.concat(searchResult.exposureData.companys);
        if (complementResult) {
            exposureData.paras = exposureData.paras.concat(complementResult.exposureData.paras);
            exposureData.companys = exposureData.companys.concat(complementResult.exposureData.companys);
        }
        exposureData.ids = exposureData.paras.join(',');
        return exposureData;
    }

    /**
     * 获取调试信息
     */
    this.getDebugInfo = function () {
        if (searchInfo.IsDebug)
            debugInfo.unshift('****************************************');
        return debugInfo;
    }

    this.getSearchResult = function () {
        return searchResult;
    }

    this.getComplementResult = function () {
        return complementResult;
    }

    /**
     * 生成html head meta
     */
    this.getHeadMeta = function () {
        if (searchInfo.IsDebug) {
            var timer = new Stopwatch();
            timer.start();
        }
        var title = [], keywords = [], description = [];
        var zpName = '智联招聘';
        var location = tools.isNullOrEmpty(searchInfo.FilterLocationCN) ? searchInfo.JobLocationCN : searchInfo.FilterLocationCN;
        var kw = searchInfo.KeyWords;
        var jobType = searchInfo.JobTypeCN;
        var subJobType = searchInfo.SubJobTypeCN;
        var industry = searchInfo.IndustryCN;
        location = location.replace(/\;/g, '');

        if (!tools.isNullOrEmpty(kw)) {

            title.push(location);
            title.push(kw);
            title.push('招聘（求职） ');
            title.push(kw);
            title.push('招聘（求职）尽在' + zpName);

            description.push(zpName + '为您提供以下信息：');
            description.push(location);
            description.push(kw);
            description.push('的招聘信息，与');
            description.push(location);
            description.push(kw);
            description.push('相关的工作尽在' + zpName + '。');

            keywords.push(location);
            keywords.push(kw);
            keywords.push('招聘，');
            keywords.push(location);
            keywords.push('，');
            keywords.push(kw);
        }

        else if (!tools.isNullOrEmpty(subJobType) && subJobType.indexOf(';') < 0) {

            title.push(location);
            title.push(subJobType);
            title.push('招聘（求职） ');
            title.push(subJobType);
            title.push('招聘（求职）尽在' + zpName);

            description.push(zpName + '为您提供以下信息：');
            description.push(location);
            description.push(subJobType);
            description.push('的招聘信息，与');
            description.push(location);
            description.push(subJobType);
            description.push('相关的工作尽在' + zpName + '。');

            keywords.push(location);
            keywords.push(subJobType);
            keywords.push('招聘，');
            keywords.push(location);
            keywords.push('，');
            keywords.push(subJobType);

        }
        else if (!tools.isNullOrEmpty(jobType)) {
            title.push(location);
            title.push(jobType);
            title.push('招聘（求职） ');
            title.push(jobType);
            title.push('招聘（求职）尽在' + zpName);

            description.push(zpName + '为您提供以下信息：');
            description.push(location);
            description.push(jobType);
            description.push('的招聘信息，与');
            description.push(location);
            description.push(jobType);
            description.push('相关的工作尽在' + zpName + '。');

            keywords.push(location);
            keywords.push(jobType);
            keywords.push('招聘，');
            keywords.push(location);
            keywords.push('，');
            keywords.push(jobType);

        }
        else if (!tools.isNullOrEmpty(industry)) {

            if (industry.indexOf(';') > -1) {
                title.push(location);
                title.push('招聘（求职） ');
                title.push(location);
                title.push('招聘（求职）尽在' + zpName);

                description.push(zpName + '为您提供以下信息：');
                description.push(location);
                description.push('的招聘信息，与');
                description.push(location);
                description.push('相关的工作尽在' + zpName + '。');

                keywords.push(location);
                keywords.push('招聘，');
                keywords.push(location);
                keywords.push('，');
                keywords.push(location);
                keywords.push('求职');
            }
            else {
                title.push(location);
                title.push(industry);
                title.push('招聘（求职） ');
                title.push(industry);
                title.push('招聘（求职）尽在' + zpName);

                description.push(zpName + '为您提供以下信息：');
                description.push(location);
                description.push(industry);
                description.push('的招聘信息，与');
                description.push(location);
                description.push(industry);
                description.push('相关的工作尽在' + zpName + '。');

                keywords.push(location);
                keywords.push(industry);
                keywords.push('招聘，');
                keywords.push(location);
                keywords.push('，');
                keywords.push(industry);
            }
        }

        var headMeta = {
            title: title.join(''),
            keywords: keywords.join(''),
            description: description.join('')
        };

        if (tools.isNullOrEmpty(headMeta.title))
            headMeta.title = '招聘（求职）尽在智联招聘';
        if (tools.isNullOrEmpty(headMeta.keywords))
            headMeta.keywords = '招聘,找工作,职位搜索';
        if (tools.isNullOrEmpty(headMeta.description))
            headMeta.description = '智联招聘为求职者找工作提供最新最全的职位招聘信息,并通过地点,行业,职位,薪资等搜索出适合您的职位,帮您快速锁定身边的好工作。';

        if (timer) {
            timer.stop();
            debugInfo.push('html head meta耗时(毫秒)：' + timer.getTime());
        }
        return headMeta;
    };

    /**
     * 生成关联链接
     */
    this.getRelationLink = function () {
        if (searchInfo.IsDebug) {
            var timer = new Stopwatch();
            timer.start();
        }
        var links = [];
        var baseUrl = 'http://sou.zhaopin.com/jobs/searchresult.ashx';
        var location = searchInfo.JobLocation.split(';')[0];
        var locationName = searchInfo.JobLocationCN.split(';')[0];
        var jobTypes = appData.getJobTypeArray();
        var industrys = appData.getHotIndustry();

        if (!tools.isNullOrEmpty(locationName) && !tools.isNullOrEmpty(searchInfo.JobTypeCN) && tools.isNullOrEmpty(searchInfo.IndustryCN) &&
            tools.isNullOrEmpty(searchInfo.KeyWords)) {

            for (var i in jobTypes) {
                if (links.length >= 10) break;
                var jobType = jobTypes[i];
                if (searchInfo.JobType == jobType.code) {
                    links.push(tools.util.format('<a rel="nofollow" href="%s?jl=%s&bj=%s&sj=%s">%s/%s</a>', baseUrl, location, searchInfo.JobType, jobType.subCode, locationName, jobType.subName));
                }
            }
        }

        if (!tools.isNullOrEmpty(locationName) && !tools.isNullOrEmpty(searchInfo.JobTypeCN) && !tools.isNullOrEmpty(searchInfo.IndustryCN) &&
            tools.isNullOrEmpty(searchInfo.KeyWords)) {

            for (i in jobTypes) {
                if (links.length >= 10) break;
                jobType = jobTypes[i];
                if (searchInfo.JobType == jobType.code) {
                    links.push(tools.util.format('<a rel="nofollow" href="%s?jl=%s&bj=%s&sj=%s">%s/%s</a>', baseUrl, location, searchInfo.JobType, jobType.subCode,locationName, jobType.subName));
                }
            }
        }

        if (!tools.isNullOrEmpty(locationName) &&
            (!tools.isNullOrEmpty(searchInfo.KeyWords) ||
                (!tools.isNullOrEmpty(searchInfo.IndustryCN) && tools.isNullOrEmpty(searchInfo.SubJobTypeCN) && tools.isNullOrEmpty(searchInfo.JobTypeCN)))) {

            for (i in industrys) {
                if (links.length >= 10) break;
                var industry = industrys[i];
                links.push(tools.util.format('<a rel="nofollow" href="%s?jl=%s&in=%s">%s/%s</a>', baseUrl, location, industry.code, locationName, industry.name));
            }
        }

        if (!tools.isNullOrEmpty(locationName) && !tools.isNullOrEmpty(searchInfo.KeyWords) && !tools.isNullOrEmpty(searchInfo.JobTypeCN) &&
            tools.isNullOrEmpty(searchInfo.IndustryCN) && tools.isNullOrEmpty(searchInfo.SubJobType)) {

            for (i in jobTypes) {
                if (links.length >= 10) break;
                jobType = jobTypes[i];
                if (searchInfo.JobType == jobType.code) {
                    links.push(tools.util.format('<a rel="nofollow" href="%s?jl=%s&bj=%s&sj=%s">%s/%s</a>', baseUrl, location, searchInfo.JobType, jobType.subCode, locationName, jobType.subName));
                }
            }
        }
        if (timer) {
            timer.stop();
            debugInfo.push('生成关联链接(毫秒)：' + timer.getTime());
        }
        return links;
    };

    /**
     * 拼接当前搜索条件中文名称
     */
    function buildSearchCondition(maxLength) {

        var conditions = [];

        var si = searchInfo;

        if (si.WorkingExp == '-1') si.WorkingExpCN = '不限';
        if (si.EduLevel == '-1') si.EduLevelCN = '无';
        if (si.EduLevel == '9') si.EduLevelCN = '初中';
        if (si.EduLevel == '7') si.EduLevelCN = '高中';
        if (si.EduLevel == '12') si.EduLevelCN = '中专';
        if (si.EduLevel == '13') si.EduLevelCN = '中技';

        if (!tools.isNullOrEmpty(si.KeyWords)) conditions.push(si.KeyWords + ' + ');
        if (tools.isNullOrEmpty(si.FilterLocationCN)) {
            if (si.JobLocationCN.length > 0) conditions.push(si.JobLocationCN.replace(/\;/g, '+') + ' + ');
        }
        else {
            conditions.push(si.FilterLocationCN.replace(/\;/g, '+') + ' + ');
        }

        if (si.RegionCN.length > 0) conditions.push(si.RegionCN + ' + ');
        if (si.GeoAddress.length > 0) conditions.push(si.GeoAddress + ' + ');
        if (si.JobTypeCN.length > 0) conditions.push(si.JobTypeCN.replace(/\;/g, '、') + ' + ');
        if (si.SubJobTypeCN.length > 0) conditions.push(si.SubJobTypeCN.replace(/\;/g, '/') + ' + ');
        if (si.PublishDateCN.length > 0) conditions.push(si.PublishDateCN + ' + ');
        if (si.WorkingExpCN.length > 0) conditions.push(si.WorkingExpCN.replace(/\;/g, '、') + ' + ');
        if (si.EduLevelCN.length > 0) conditions.push(si.EduLevelCN.replace(/\;/g, '、') + ' + ');
        if (si.CompanyTypeCN.length > 0) conditions.push(si.CompanyTypeCN.replace(/\;/g, '/') + ' + ');
        if (si.CompanySizeCN.length > 0) conditions.push(si.CompanySizeCN.replace(/\;/g, '/') + ' + ');
        if (si.IndustryCN.length > 0) conditions.push(si.IndustryCN.replace(/\;/g, '/') + ' + ');
        if (si.EmplTypeCN.length > 0 && si.EmplTypeCN != '全职;兼职;实习')
            conditions.push(si.EmplTypeCN.replace(/\;/g, '、') + ' + ');
        if (si.SalaryFrom.length > 0 && si.SalaryTo.length > 3)
            conditions.push(si.SalaryFrom + '-' + si.SalaryTo + ' + ');
        if (!tools.isNullOrEmpty(si.FilterJobTag)) conditions.push(si.FilterJobTag.replace(/\;/g, '+') + ' + ');

        var searchCondition = conditions.join('');

        searchCondition = searchCondition.substring(0, searchCondition.length - 3);

        return tools.subString(searchCondition, maxLength, '...');
    }

    /**
     * 生成搜索相关信息
     */
    this.getSearchData = function () {
        if (searchInfo.IsDebug) {
            var timer = new Stopwatch();
            timer.start();
        }
        var maxNumber = 100000;
        var numFound = searchResult.numFound;
        var showInfo = numFound > maxNumber ? tools.util.format('多于<em>%s</em>', maxNumber) : tools.util.format('共<em>%s</em>', numFound);
        var history = {
            name: buildSearchCondition(25),
            url: searchInfo.SearchUrl
        };

        var data = {
            numFound: searchResult.numFound,
            showInfo: showInfo,
            history: history
        };

        //history 写入cookie
        searchInfo.Cookier.set(appSettings.cookies.lastSearchHistory, JSON.stringify(history), 30);
        if (timer) {
            timer.stop();
            debugInfo.push('生成搜索相关信息(毫秒)：' + timer.getTime());
        }
        return data;
    };

    /**
     * 生成分页信息
     */
    this.getPagination = function () {
        if (searchInfo.IsDebug) {
            var timer = new Stopwatch();
            timer.start();
        }
        var guid = searchInfo.SearchGuid;
        var uri = url.parse(searchInfo.SearchUrl);
        var query = qs.parse(uri.query);
        if (!query) query = {};
        if (!query.sg) {
            guid = tools.guid().replace(/\-/g, '');
            query.sg = guid;
        }

        delete query.p;

        var requestUrl = tools.util.format('%s?%s', uri.pathname, qs.stringify(query));

        var totalPage = 0, s_page = 0, e_page = 0, currentPage = searchInfo.Page;
        var maxNumber = appSettings.pageSize * appSettings.maxPage;
        var numFound = searchResult.numFound;
        if (numFound > maxNumber) numFound = maxNumber;

        totalPage = Math.ceil(numFound / appSettings.pageSize);

        if (currentPage < 1 || currentPage > totalPage) currentPage = 1;

        if (currentPage < 5) {
            s_page = 1;
            e_page = 8;
        }
        else {
            s_page = currentPage - 2;
            e_page = currentPage + 3;
        }

        if (currentPage > totalPage - 5 || totalPage < 8) {
            s_page = totalPage - 7;
            e_page = totalPage;
        }

        if (s_page <= 0) {
            s_page = 1;
        }
        var pager = [];
        if (s_page > 1) {
            pager.push(tools.util.format('<li><a href="%s&p=%s">%s</a></li>', requestUrl, 1, 1));
            if (currentPage >= 5 && totalPage > 8) {
                pager.push(tools.util.format('<li><a href="%s&p=%s" class="pagesmore">...</a></li>', requestUrl,
                    s_page - 1));
            }
        }

        for (var i = s_page; i <= e_page; i++) {
            if (i == currentPage) {
                pager.push(tools.util.format('<li><a href="#" class="current" >%s</a></li>', i));
            }
            else {
                pager.push(tools.util.format('<li><a href="%s&p=%s">%s</a></li>', requestUrl, i, i));
            }
        }

        if (currentPage < totalPage - 4 && totalPage > 8) {
            pager.push(tools.util.format('<li><a href="%s&p=%s" class="pagesmore">...</a></li>', requestUrl,
                e_page + 1));
        }

        //上一页
        if (currentPage == 1 || totalPage == 1) {
            pager.unshift('<li><a  class="pre-page nopress">上一页</a></li>');
        }
        else {
            pager.unshift(
                tools.util.format('<li><a href="%s&p=%s" class="pre-page">上一页</a></li>', requestUrl,
                    currentPage - 1));
        }

        //下一页
        if (currentPage < totalPage) {
            pager.push(tools.util.format('<li class="pagesDown-pos"><a href="%s&p=%s" class="next-page">下一页</a>',
                requestUrl, currentPage + 1));
        }
        else {
            pager.push('<li><a  class="next-page nopress2">下一页</a></li>');
        }


        pager.push(tools.util.format(
            '<li class=\'nextpagego-box\'><input type=\'hidden\' id=\'guid\' value=\'%s\' />到&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页<input type=\'text\' class=\'pagesnum\' name=\'goto\' id=\'goto\' value=\'%s\' onkeyup=\'zlapply.searchjob.fnCheckInt(this,event)\' onchange=\'zlapply.searchjob.fnCheckInt(this,event)\' onkeypress=\'zlapply.searchjob.enter2Page(this,event,%s)\'  /><button type=\'button\' class=\'nextpagego-btn\' name=\'go\' onclick=\'zlapply.searchjob.gotoPage(this.form.goto.value,%s,"","%s")\'></button></li>',
            guid, currentPage, totalPage, totalPage, guid));

        var result = pager.join('');
        if (timer) {
            timer.stop();
            debugInfo.push('生成分页信息耗时(毫秒)：' + timer.getTime());
        }
        return result;
    };

    /**
     * 生成标签筛选数据
     */
    this.getTagFilterData = function () {
        if (searchInfo.IsDebug) {
            var timer = new Stopwatch();
            timer.start();
        }
        if (searchInfo.JobLocation == '489' || !searchInfo.IsHasSearchResult) {
            return { display: 0 };
        }

        if (searchInfo.Query.isjts === '1') {
            delete searchInfo.Query.isjts;
        }
        var tagInfo = {
            display: 1,
            JobType: buildTypeModel(),
            City: buildCityModel(),
            Hot: buildHotModel(),
            JobTag: buildJobTagModel(),
            More: buildMoreModel(),
            PlaceMark: buildPlaceMark(),
            SubLine: buildSubLine()
        };
        if (timer) {
            timer.stop();
            debugInfo.push('生成标签筛选数据耗时(毫秒)：' + timer.getTime());
        }
        return tagInfo;
    };

    /**
     * 生成seo聚合链接
     */
    this.getJuLink = function () {
        if (searchInfo.IsDebug) {
            var timer = new Stopwatch();
            timer.start();
        }
        var result = null;
        var linkMap = appData.getJuLink();
        if (linkMap) {
            var juLink = [];
            var links = linkMap.get('1');
            if (links && links.length > 0) {
                var randomIndex = tools.random(0, links.length - 2);
                juLink = juLink.concat(links.slice(randomIndex, randomIndex + 2));
            }
            links = linkMap.get('2');
            if (links && links.length > 0) {
                randomIndex = tools.random(0, links.length - 4);
                juLink = juLink.concat(links.slice(randomIndex, randomIndex + 4));
            }
            links = linkMap.get('3');
            if (links && links.length > 0) {
                randomIndex = tools.random(0, links.length - 4);
                juLink = juLink.concat(links.slice(randomIndex, randomIndex + 4));
            }
            result = juLink;
        }
        if (timer) {
            timer.stop();
            debugInfo.push('生成seo聚合链接耗时(毫秒)：' + timer.getTime());
        }
        return result;
    };

    /**
     * 生成seo城市链接
     */
    this.getCityLink = function () {
        if (searchInfo.IsDebug) {
            var timer = new Stopwatch();
            timer.start();
        }
        var result = null;
        var linkMap = appData.getCityLink();
        if (linkMap && searchInfo.JobLocation !== '489') {
            var cityLink = [];
            var citys = searchInfo.JobLocation.split(';');
            for (var v in citys) {
                var city = citys[v];
                var map = linkMap.get(city);
                if (!map) continue;
                map.forEach(function (value, key) {
                    cityLink.push({ key: key, value: value });
                });
            }

            if (citys.length > 1 && cityLink.length > 10) {
                var randomIndex = tools.random(0, cityLink.length - 10);
                cityLink = cityLink.slice(randomIndex, randomIndex + 10);
            }
            result = cityLink;
        }
        if (timer) {
            timer.stop();
            debugInfo.push('生成seo城市链接耗时(毫秒)：' + timer.getTime());
        }
        return result;
    };

    /**
     * 生成排除公司信息
     * 已经迁移到客户端处理
     */
    this.getExcludeCompanys = function () {
        if (searchInfo.IsDebug) {
            var timer = new Stopwatch();
            timer.start();
        }
        var excludeCompanys = [];
        var exposureMap = new Map();
        var companyMap = new Map();
        var results = [].concat(searchResult.results);

        if (complementResult && complementResult.numFound > 0) {
            results = results.concat(complementResult.results);
        }

        for (var i in results) {
            var jobInfo = results[i];
            var companyId = jobInfo.company.number;
            if (searchInfo.ExcludedCompanyIds.indexOf(companyId) > -1) continue;

            if (!companyMap.has(companyId)) {
                companyMap.set(companyId, jobInfo.company.name);
            }

            var exposureCount = exposureMap.get(companyId);
            if (exposureCount) {
                exposureCount += 1;
            }
            else {
                exposureCount = 1;
            }
            exposureMap.set(companyId, exposureCount);
        }

        //按照曝光数排序

        companyMap.forEach(function (value, key) {
            if (exposureMap.get(key) > 1)
                excludeCompanys.push({ id: key, name: value });
        });
        var result = tools.sortObj(excludeCompanys);
        if (timer) {
            timer.stop();
            debugInfo.push('生成排除公司信息耗时(毫秒)：' + timer.getTime());
        }
        return result;
    };
    /**
     * 生成职位类别信息
     */
    function buildTypeModel() {
        var list = [];
        var facets = searchResult.facets;
        for (var facet in facets) {
            var typeFacets = facets[facet];
            if (typeFacets.name !== 'SOU_POSITION_LARGETYPE') continue;
            var items = typeFacets.items;
            var removeType = {
                sj: '',
                fjt: ''
            };
            var removeModel = removeQuery(searchInfo.Query, removeType);
            var type = '0';
            if(items.length > 1){
                type = '1';
            }
            for (var num in items) {
                var typeInfo = items[num];
                var urlModel = {
                    bj: typeInfo.code
                };
                var classInfo = '';
                if (searchInfo.JobType === urlModel.bj && searchInfo.SubJobType === '') {
                    classInfo = 'xzbold';
                }
                if (list.length > 9) {
                    break;
                }
                var model = {
                    name: typeInfo.name,
                    url: getUrl(getQuery(removeModel, urlModel)),
                    class: classInfo,
                    font: typeInfo.total,
                    type: type
                };
                list.push(model);
            }

        }
        for (var facet in facets) {
            var typeFacets = facets[facet];
            if (typeFacets.name !== 'SOU_POSITION_SMALLTYPE') continue;
            var items = typeFacets.items;
            var removeType = {
                fjt: ''
            };
            var removeModel = removeQuery(searchInfo.Query, removeType);
            for (var num in items) {
                var typeInfo = items[num];
                var urlModel = {
                    sj: typeInfo.code.padLeft(3, '0')
                };
                var classInfo = '';
                if (searchInfo.SubJobType === urlModel.sj) {
                    classInfo = 'xzbold';
                }
                var model = {
                    name: typeInfo.name,
                    url: getUrl(getQuery(removeModel, urlModel)),
                    class: classInfo,
                    font: typeInfo.total,
                    type: '1'
                };
                list.push(model);
            }

        }
        var style = '';
        if (list.length === 0) {
            style = 'display:none';
        }
        var urlModel = {
            bj: '',
            sj: '',
            fjt: ''
        };
        return {
            'url': getUrl(removeQuery(searchInfo.Query, urlModel)),
            'class': '',
            'name': '不限',
            'style': style,
            list: list
        };
    }
    /**
     * 生成城市信息
     */
    function buildCityModel() {

        if (searchInfo.JobLocation.indexOf(';') < 1) {
            return { 'style': 'display:none' };
        }
        var classInfo = 'xzbold fl';
        var citys = searchInfo.JobLocation.split(';');
        var cityCN = searchInfo.JobLocationCN.split(';');
        var list = [];
        var removeType = {
            fjt: ''
        };
        var removeModel = removeQuery(searchInfo.Query, removeType);
        for (var i in citys) {
            var cityId = citys[i];
            var urlModel = {
                fl: cityId
            };
            var city = {
                name: cityCN[i],
                url: getUrl(getQuery(removeModel, urlModel)),
                'class': ''
            };
            if (searchInfo.FilterLocation === cityId) {
                city.class = 'xzbold';
                classInfo = '';
            }
            list.push(city);
        }
        var urlModel = {
            fl: '',
            fjt: ''
        };
        var model = {
            'name': '不限',
            'url': getUrl(removeQuery(searchInfo.Query, urlModel)),
            'class': classInfo,
            'style': '',
            'list': list
        };
        return model;
    }

    /**
     * 生成热门地区信息
     */
    function buildHotModel() {
        if (searchInfo.JobLocation === undefined || searchInfo.JobLocation === '') {
            return { 'style': 'display: none' };
        }
        var flag;
        var list = [];
        var Businessareas = appData.getTagFilter().Businessareas;
        var placeList = [];
        for (i in Businessareas) {
            var businessInfo = Businessareas[i];
            if (businessInfo.Name === searchInfo.FilterLocationCN) {
                var sublist = businessInfo.Sublist;
                var gaModel = {
                    ga: '',
                    gc: '',
                    fjt: ''
                };
                var removeModel = removeQuery(searchInfo.Query, gaModel);
                for (var j in sublist) {
                    var subInfo = sublist[j];
                    var urlModel = {
                        re: subInfo.Code
                    };
                    var classInfo = '';
                    if (searchInfo.Region === urlModel.re) {
                        classInfo = 'xzbold';
                        flag = true;
                        /**
                         * 下面的商圈信息
                         */
                        var removeType = {
                            fjt: ''
                        };
                        var removeModel = removeQuery(searchInfo.Query, removeType);
                        for (var i = 65; i < 91; i++) {
                            var char = String.fromCharCode(i);
                            var hotList = [];
                            var inList = subInfo.Sublist;
                            for (var hot in inList) {
                                var lineModel = inList[hot];
                                var code = urlModel.re;
                                var group = lineModel.Group;
                                var name = lineModel.Name;
                                if (char === group) {
                                    var urlModelInfo = {
                                        re: code,
                                        ga: name
                                    };
                                    if (name === '全部') {
                                        continue;
                                    }
                                    var InClassInfo = '';
                                    if (searchInfo.GeoAddress === name) {
                                        InClassInfo = 'xzbold';
                                    }
                                    var hotplace = {
                                        name: name,
                                        url: getUrl(getQuery(removeModel, urlModelInfo)),
                                        class: InClassInfo
                                    };
                                    hotList.push(hotplace);
                                }
                            }
                            if (hotList.length > 0) {
                                var hotinfo = {
                                    char: char,
                                    list: hotList
                                };
                                placeList.push(hotinfo);
                            }
                        }
                    }
                    var model = {
                        'name': subInfo.Name,
                        'url': getUrl(getQuery(removeModel, urlModel)),
                        'class': classInfo
                    };
                    list.push(model);
                }
            }
        }
        var urlModel = {
            re: '',
            ga: '',
            fjt: ''
        };
        var classInfo = 'xzbold fl';
        if (flag) {
            classInfo = '';
        }
        var style = '';
        if (list.length === 0) {
            style = 'display: none;';
        }
        var placestyle = '';
        if (placeList.length === 0) {
            placestyle = 'display: none;';
        }
        var place = {
            style: placestyle,
            list: placeList
        };
        var outclass = 'newlist_list1';
        if (placeList.length > 0) {
            outclass = 'newlist_list1_zk';
        }
        return {
            'name': '不限',
            'url': getUrl(removeQuery(searchInfo.Query, urlModel)),
            'outclass': outclass,
            'class': classInfo,
            'style': style,
            'list': list,
            'place': place
        };
    }

    /**
     * 职位标签信息
     */
    function buildJobTagModel() {
        var facets = searchResult.facets;
        var list = [];
        var flag;
        var instyle = 'height:34px';
        if (!searchInfo.IsJobTagSwitch) {
            for (var i in facets) {
                var typeFacets = facets[i];
                if (typeFacets.name !== 'SOU_WELFARETAB') continue;
                var items = typeFacets.items;
                for (var num in items) {
                    var item = items[num];
                    var urlModel = {
                        fjt: item.name,
                        isjts: 1
                    };
                    var classInfo = '';
                    if (searchInfo.FilterJobTag === item.name) {
                        classInfo = 'xzbold';
                        if (Number(num) > 12) {
                            instyle = 'height: auto;';
                        };
                        flag = true;
                    }
                    var model = {
                        name: item.name,
                        url: getUrl(getQuery(searchInfo.Query, urlModel)),
                        class: classInfo
                    };
                    list.push(model);
                }
                if (list.length > 0) {
                    var cookList = [];
                    for (var info in list) {
                        cookList.push(list[info].name);
                    }
                    searchInfo.Cookier.set(appSettings.cookies.lastJobTag, cookList.join('|'), 30);
                }
            }
        } else {
            var lastJobTag = searchInfo.Cookier.get(appSettings.cookies.lastJobTag).split('|');
            for (var num in lastJobTag) {
                var info = lastJobTag[num];
                var urlModel = {
                    fjt: info,
                    isjts: 1
                };
                var classInfo = '';
                if (searchInfo.FilterJobTag === info) {
                    classInfo = 'xzbold';
                    if (Number(num) > 12) {
                        instyle = 'height: auto;';
                    }
                    flag = true;
                }
                var model = {
                    name: info,
                    url: getUrl(getQuery(searchInfo.Query, urlModel)),
                    class: classInfo
                };
                list.push(model);
            }
        }

        var classInfo = 'xzbold fl';
        if (flag) {
            classInfo = '';
        }
        var style = '';
        if (list.length === 0) {
            style = 'display: none;';
        }
        var urlModel = {
            fjt: ''
        };
        return {
            'name': '不限',
            'url': getUrl(removeQuery(searchInfo.Query, urlModel)),
            'class': classInfo,
            'style': style,
            'instyle': instyle,
            'list': list
        };
    }
    /**
     * 更多筛选标签信息
     */
    function buildMoreModel() {

        var Salary = appData.getTagFilter().Salary;
        var salaryName = '薪资';
        var companyName = '公司性质';
        var educationName = '学历';
        var workExperienceName = '工作经验';
        var employmentTypeName = '职位类型';
        var publishDateName = '发布时间';
        var SalaryList = [];
        var salInStyle = '';
        var comInStyle = '';
        var eduInStyle = '';
        var workInStyle = '';
        var empInStyle = '';
        var pubInStyle = '';
        var removeUrl = {
            fjt: ''
        };
        var removeModel = removeQuery(searchInfo.Query, removeUrl);
        for (var prop in Salary) {
            var sal = Salary[prop];
            var code = sal.Code;
            var urlModel = {
                sf: '-1',
                st: '-1'
            };
            if (code.length > 6) {
                urlModel.sf = Number(code.substr(0, 5));
                urlModel.st = Number(code.substr(5));
            }
            var classInfo = '';
            if (searchInfo.SalaryFrom === urlModel.sf + '' && searchInfo.SalaryTo === urlModel.st + '') {
                if (sal.Name != '全部') {
                    salaryName = sal.Name;
                    salInStyle = 'background:none';
                }
                classInfo = 'xzbold';
            }
            var tag = {
                name: sal.Name,
                url: getUrl(getQuery(removeModel, urlModel)),
                class: classInfo
            };
            SalaryList.push(tag);
        }

        var companyType = appData.getTagFilter().CompanyType;
        var companyList = [];
        for (var prop in companyType) {
            var sal = companyType[prop];
            var urlModel = {
                ct: sal.Code
            };
            var classInfo = '';
            if (searchInfo.CompanyType === sal.Code) {
                if (sal.Name != '全部') {
                    companyName = sal.Name;
                    comInStyle = 'background:none';
                }
                classInfo = 'xzbold';
            }
            var tag = {
                name: sal.Name,
                url: getUrl(getQuery(removeModel, urlModel)),
                class: classInfo
            };
            companyList.push(tag);
        }

        var Education = appData.getTagFilter().Education;
        var educationList = [];
        for (var prop in Education) {
            var sal = Education[prop];
            var urlModel = {
                el: sal.Code
            };
            var classInfo = '';
            if (searchInfo.EduLevel === urlModel.el) {
                if (sal.Name != '不限') {
                    educationName = sal.Name;
                    eduInStyle = 'background:none';
                }
                classInfo = 'xzbold';
            }
            var tag = {
                name: sal.Name,
                url: getUrl(getQuery(removeModel, urlModel)),
                class: classInfo
            };
            educationList.push(tag);
        }

        var WorkExperience = appData.getTagFilter().WorkExperience;
        var workExperienceList = [];
        for (var prop in WorkExperience) {
            var sal = WorkExperience[prop];
            var urlModel = {
                we: sal.Code
            };
            var classInfo = '';
            if (searchInfo.WorkingExp === urlModel.we) {
                if (sal.Name != '全部') {
                    workExperienceName = sal.Name;
                    workInStyle = 'background:none';
                }
                classInfo = 'xzbold';
            }
            var tag = {
                name: sal.Name,
                url: getUrl(getQuery(removeModel, urlModel)),
                class: classInfo
            };
            workExperienceList.push(tag);
        }

        var EmploymentType = appData.getTagFilter().EmploymentType;
        var employmentTypeList = [];
        for (var prop in EmploymentType) {
            var sal = EmploymentType[prop];
            var urlModel = {
                et: sal.Code
            };
            var classInfo = '';
            if (searchInfo.EmplType === urlModel.et) {
                if (sal.Name != '全部') {
                    employmentTypeName = sal.Name;
                    empInStyle = 'background:none';
                }
                classInfo = 'xzbold';
            }
            var tag = {
                name: sal.Name,
                url: getUrl(getQuery(removeModel, urlModel)),
                class: classInfo
            };
            employmentTypeList.push(tag);
        }

        var PublishDate = appData.getTagFilter().PublishDate;
        var publishDateList = [];
        for (var prop in PublishDate) {
            var sal = PublishDate[prop];
            var urlModel = {
                pd: sal.Code
            };
            var classInfo = '';
            if (searchInfo.PublishDate === urlModel.pd) {
                if (sal.Name != '不限') {
                    publishDateName = sal.Name;
                    pubInStyle = 'background:none';
                }
                classInfo = 'xzbold';
            }
            var tag = {
                name: sal.Name,
                url: getUrl(getQuery(removeModel, urlModel)),
                class: classInfo
            };
            publishDateList.push(tag);
        }
        return [{
            'style': 'position: relative;',
            'class': '',
            'inclass': 'moresearch_main_select',
            'instyle': salInStyle,
            'name': salaryName,
            'tag': SalaryList
        }, {
                'style': 'position: relative;',
                'class': '',
                'name': companyName,
                'instyle': comInStyle,
                'tag': companyList
            }, {
                'style': 'position: relative;',
                'class': 'moresearch_main_li',
                'name': educationName,
                'instyle': eduInStyle,
                'tag': educationList
            }, {
                'style': 'position: relative;',
                'class': '',
                'name': workExperienceName,
                'instyle': workInStyle,
                'tag': workExperienceList
            }, {
                'style': 'position: relative;',
                'class': '',
                'name': employmentTypeName,
                'instyle': empInStyle,
                'tag': employmentTypeList
            }, {
                'style': 'position: relative;',
                'class': '',
                'name': publishDateName,
                'instyle': pubInStyle,
                'tag': publishDateList
            }];
    }
    /**
     * 热门商圈信息
     */
    function buildPlaceMark() {
        if (searchInfo.JobLocation === '') {
            return { 'style': 'display: none' };
        }
        var list = [];
        var Placemarks = appData.getTagFilter().placemarks;
        for (var prop in Placemarks) {
            var sal = Placemarks[prop];
            if (sal.name === searchInfo.FilterLocationCN) {
                var removeType = {
                    fjt: ''
                };
                var removeModel = removeQuery(searchInfo.Query, removeType);
                for (var i = 65; i < 91; i++) {
                    var char = String.fromCharCode(i);
                    var inList = [];
                    var subList = sal.sublist;
                    for (var num in subList) {
                        var listInfo = subList[num];
                        if (listInfo.group === char) {
                            var urlModel = {
                                re: listInfo.code,
                                ga: listInfo.name
                            };
                            if (listInfo.name === '全部') {
                                continue;
                            }

                            var palceInfo = {
                                'name': listInfo.name,
                                'url': getUrl(getQuery(removeModel, urlModel)),
                                're': listInfo.code
                            };
                            inList.push(palceInfo);
                        }
                    }
                    var searchstyle = 'display: none';
                    var model = {
                        'id': 'placeMark' + char,
                        'searchstyle': searchstyle,
                        'style': 'display: none',
                        'place': inList,
                        'char': char
                    };
                    if (inList.length > 0) {
                        list.push(model);
                    }
                }
                break;
            }
        }
        var style = 'display: none';
        //判断是否隐藏
        if (searchInfo.GeoAddress != '') {
            style = '';
        }
        var re = '';
        if (searchInfo.Region != '') {
            re = searchInfo.Region;
        }
        var searchResultModel = {
            list: list,
            'style': style,
            're': re
        };
        return searchResultModel;
    }

    /**
     * 地铁标签信息
     */
    function buildSubLine() {
        if (searchInfo.JobLocation === '') {
            return { 'style': 'display: none' };
        }
        var firstClass = 'xzbold fl';
        var outClass = 'newlist_list1 newlist_metro';
        var list = [];
        var subline = appData.getMetro();
        for (var i in subline) {
            var subInfo = subline[i];
            if (subInfo.CityId + '' === searchInfo.JobLocation || subInfo.CityId + '' === searchInfo.FilterLocation) {
                var subLineList = subInfo.SubLines;
                var removeUrl = {
                    re: '',
                    fjt: ''
                };
                var removeModel = removeQuery(searchInfo.Query, removeUrl);
                for (var j in subLineList) {
                    var numList = [];
                    var numline = subLineList[j];
                    var stations = numline.SubStations;
                    for (var k in stations) {
                        var line = stations[k];
                        var urlModel = {
                            ga: line.StationName,
                            gc: numline.LineName
                        };

                        var inClass = '';
                        if (searchInfo.GeoAddress === tools.convert(line.StationName).toLowerCase()) {
                            inClass = 'xzbold';
                        }
                        var model = {
                            name: line.StationName,
                            class: inClass,
                            url: getUrl(getQuery(removeModel, urlModel))
                        };
                        numList.push(model);
                    }
                    var lineClass = 'tagfilter_metro';
                    var lineStyel = 'display:none';
                    if (searchInfo.GeoCenterCate === numline.LineName) {
                        lineClass = 'xzbold tagfilter_metro';
                        firstClass = '';
                        outClass = 'newlist_metro newlist_list1_zk';
                        lineStyel = 'display:block';
                    }
                    var model = {
                        id:numline.LineId,
                        name: numline.LineName,
                        class: lineClass,
                        style: lineStyel,
                        list: numList
                    };
                    list.push(model);
                }
            }
            if (list.length > 0) {
                break;
            }
        }
        var urlModel = {
            ga: '',
            gc: '',
            re: '',
            fjt: ''
        };
        var style = '';
        if (list.length === 0) {
            style = 'display:none';
            var outClass = 'newlist_list1';
        }
        return {
            'name': '不限',
            'url': getUrl(removeQuery(searchInfo.Query, urlModel)),
            'class': firstClass,
            'outClass': outClass,
            'style': style,
            'list': list
        };
    }

    function getUrl(query) {
        var url = '/jobs/searchResult.ashx?';
        query.isfilter = 1;
        var queryArray = [];
        for (var q in query) {
            queryArray.push(q + '=' + encodeURIComponent(query[q]));
        }
        url += queryArray.join('&');
        return url;
    }

    function getQuery(query, info) {
        var model = {};
        model = JSON.parse(JSON.stringify(query));
        for (var i in info) {
            model[i] = info[i];
        }
        return model;
    }

    function removeQuery(query, info) {
        var model = {};
        model = JSON.parse(JSON.stringify(query));
        for (var i in info) {
            delete model[i];
        }
        return model;
    }
}

module.exports = DataHandler;