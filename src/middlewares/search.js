'use strict';
var Cookier = require('../utils/cookier');
var SearchInfo = require('../models/search');
var Stopwatch = require('../utils/stopwatch');
var userManager = require('../utils/usermanager');
/**
 * 注入职位搜索参数
 */
exports.setSearchInfo = function (req, res, next) {

  var cookier = new Cookier(req, res);

  var sui = new SearchInfo();
  sui.IsDebug = req.query.zpssz === '1';
  if (sui.IsDebug) {
    var timer = new Stopwatch();
    timer.start();
  }
  sui.Cookier = cookier;
  sui.Query = req.query;
  sui.IsAdv = req.query.isadv === '1';
  sui.Jyywl = tools.convert(req.query.jy, '').toLowerCase();
  sui.PublishDate = tools.convert(req.query.pd, '').toLowerCase();
  if (sui.PublishDate == '-1') {
    sui.PublishDate = '';
  }
  sui.JobLocation = tools.convert(req.query.jl, '').toLowerCase();
  sui.JobLocation = sui.JobLocation.replace(/\+/g, ';');
  sui.KeyWords = tools.convert(req.query.kw, '').toLowerCase();

  if (sui.KeyWords.indexOf('请输入') > -1) {
    sui.KeyWords = '';
  }
  else {
    sui.SafeKeyWords = sui.KeyWords.replaceSpecialChar();
  }
  sui.SortBy = tools.convert(req.query.sb, 0);
  sui.JobType = tools.convert(req.query.bj, '').toLowerCase();
  sui.SubJobType = tools.convert(req.query.sj, '').toLowerCase();
  sui.ShowModel = tools.convert(req.query.sm, -1);
  sui.WorkingExp = tools.convert(req.query.we, '').toLowerCase();
  if (sui.WorkingExp == '-1') {
    sui.WorkingExp = '';
  }
  sui.EduLevel = tools.convert(req.query.el, '').toLowerCase();
  if (sui.EduLevel == '-2') {
    sui.EduLevel = '';
  }
  sui.KeyWordType = tools.convert(req.query.kt, 1);
  sui.SearchGuid = tools.convert(req.query.sg, '').toLowerCase();
  sui.Page = tools.convert(req.query.p, 1);
  sui.Page = sui.Page > appSettings.MaxPage ? appSettings.MaxPage : sui.Page;
  sui.Page = sui.Page <= 0 ? 1 : sui.Page;
  sui.Region = tools.convert(req.query.re, '').toLowerCase();
  sui.CompanyType = tools.convert(req.query.ct, '').toLowerCase();
  if (sui.CompanyType == '-1') {
    sui.CompanyType = '';
  }
  sui.CompanyID = tools.convert(req.query.cid, '').toLowerCase();
  sui.GeoAddress = tools.convert(req.query.ga, '').toLowerCase();
  sui.GeoCenterCate = tools.convert(req.query.gc, '').toLowerCase();
  sui.Industry = tools.convert(req.query.in, '').toLowerCase();
  sui.SalaryFrom = tools.convert(req.query.sf, '').toLowerCase();
  sui.SalaryTo = tools.convert(req.query.st, '').toLowerCase();
  if (sui.SalaryFrom == '-1') {
    sui.SalaryFrom = '';
  }
  if (sui.SalaryTo == '-1') {
    sui.SalaryFrom = '';
  }
  sui.CompanySize = tools.convert(req.query.cs, '').toLowerCase();
  if (sui.CompanySize == '-1') {
    sui.CompanySize = '';
  }

  sui.EmplType = tools.convert(req.query.et, '').toLowerCase();
  if (sui.EmplType == '-1') {
    sui.EmplType = '';
  }

  sui.ClientIp = res.locals.clientIp;

  var cShowModel = cookier.getWithType(appSettings.cookies.showModel, 0);
  var cJobLocation = cookier.get(appSettings.cookies.lastCityId);

  if (sui.ShowModel < 0 && cShowModel) sui.ShowModel = cShowModel;
  if (sui.ShowModel < 0) sui.ShowModel = 0;

  if (sui.JobLocation == '' && cJobLocation) sui.JobLocation = cJobLocation;

  //TODO:识别ip
  if (!sui.JobLocation) {
    sui.JobLocation = '530';
    sui.JobLocationCN = '北京';
  }
  else {
    var locations = tools.utils.split(sui.JobLocation, ';');
    var codes = [];
    var names = [];
    for (var v in locations) {
      var location = locations[v];
      if (isNaN(location)) {
        codes.push(appData.getCityCode(location));
        names.push(location);
      }
      else {
        names.push(appData.getCityName(location));
        codes.push(location);
      }
    }
    sui.JobLocation = codes.join(';');
    sui.JobLocationCN = names.join(';');
  }
  if (sui.JobLocation == '') {
    sui.JobLocation = '489';
    sui.JobLocationCN = '全国';
  }

  if (sui.Region) {
    sui.RegionCN = appData.getCityName(sui.Region);
  }

  if (sui.JobType) {
    codes = tools.utils.split(sui.JobType, ';');
    names = [];
    for (v in codes) {
      names.push(appData.getJobTypeName(codes[v]));
    }
    sui.JobTypeCN = names.join(';');
  }

  if (sui.SubJobType) {
    codes = tools.utils.split(sui.SubJobType, ';');
    names = [];
    for (v in codes) {
      names.push(appData.getJobTypeName(codes[v]));
    }
    sui.SubJobTypeCN = names.join(';');
  }

  if (sui.Industry) {
    codes = tools.utils.split(sui.Industry, ';');
    names = [];
    for (v in codes) {
      names.push(appData.getIndustryName(codes[v]));
    }
    sui.IndustryCN = names.join(';');
  }

  if (sui.PublishDate) {
    sui.PublishDateCN = appData.getPublishDateName(sui.PublishDate);
  }

  if (sui.WorkingExp) {
    codes = tools.utils.split(sui.WorkingExp, ';');
    names = [];
    for (v in codes) {
      names.push(appData.getWorkExperienceName(codes[v]));
    }
    sui.WorkingExpCN = names.join(';');
  }

  if (sui.EduLevel) {
    codes = tools.utils.split(sui.EduLevel, ';');
    names = [];
    for (v in codes) {
      names.push(appData.getEducationName(codes[v]));
    }
    sui.EduLevelCN = names.join(';');
  }

  if (sui.CompanyType) {
    codes = tools.utils.split(sui.CompanyType, ';');
    names = [];
    for (v in codes) {
      names.push(appData.getCompanyTypeName(codes[v]));
    }
    sui.CompanyTypeCN = names.join(';');
  }

  if (sui.CompanySize) {
    codes = tools.utils.split(sui.CompanySize, ';');
    names = [];
    for (v in codes) {
      names.push(appData.getCompanySizeName(codes[v]));
    }
    sui.CompanySizeCN = names.join(';');
  }

  if (sui.EmplType) {
    codes = tools.utils.split(sui.EmplType, ';');
    names = [];
    for (v in codes) {
      names.push(appData.getEmploymentTypeName(codes[v]));
    }
    sui.EmplTypeCN = names.join(';');
  }

  sui.FilterJobTag = tools.convert(req.query.fjt, '').toLowerCase();
  sui.IsFilter = req.query.isfilter === '1';
  sui.IsJobTagSwitch = req.query.isjts === '1';
  sui.FilterLocation = tools.convert(req.query.fl, '').toLowerCase();
  var locations = sui.JobLocation.split(';'), locationNames = sui.JobLocationCN.split(';');
  if (locations.length == 1) sui.FilterLocation = sui.JobLocation;
  for (v in locations) {
    if (sui.FilterLocation != locations[v])
      continue;
    sui.FilterLocationCN = locationNames[v];
    break;
  }

  //如果不是高级搜索才启用
  if (!sui.isadv && tools.isNotNullOrEmpty(sui.GeoAddress)) {
    //坐标转换
    if (tools.isNullOrEmpty(sui.GeoCenterCate)) {
      var dataMap = appData.getBusinessAreasMap();
      var dataMap1 = dataMap.get(sui.FilterLocation);
      if (dataMap1) {
        var dataMap2 = dataMap1.get(sui.Region);
        if (dataMap2) {
          var data = dataMap2.get(sui.GeoAddress);
          if (data && data.Longitude > 0 && data.Latitude > 0) {
            sui.GeoLongitude = data.Longitude;
            sui.GeoLatitude = data.Latitude;
          }
        }
      }
    }
    else {
      dataMap = appData.getMetroMap();
      dataMap1 = dataMap.get(sui.FilterLocation);
      if (dataMap1) {
        dataMap2 = dataMap1.get(sui.GeoCenterCate);
        if (dataMap2) {
          data = dataMap2.get(sui.GeoAddress);
          if (data && data.Longitude > 0 && data.Latitude > 0) {
            sui.GeoLongitude = data.Longitude;
            sui.GeoLatitude = data.Latitude;
          }
        }
      }

    }
  }

  sui.SearchUrl = req.url
    .replace('请输入关键词,例如:JAVA,销售代表,行政助理等', '')
    .replace('请输入公司名称或关键词,例如:联想,华为等', '')
    .replace('请输入职位名称或关键词,例如:会计经理,开发工程师等', '');

  if (sui.ShowModel > -1 && sui.ShowModel != cShowModel) {
    cookier.set(appSettings.cookies.showModel, sui.ShowModel, 30);
  }
  if (sui.JobLocation.indexOf(';') < 0 && sui.JobLocation != cJobLocation) {
    cookier.set(appSettings.cookies.lastCityId, sui.JobLocation, 30);
    cookier.set(appSettings.cookies.lastCity, sui.JobLocationCN, 30);
  }


  // 获取排除公司信息
  var ids = [];
  var companyCookies = cookier.get(appSettings.cookies.excludedCompany);
  if (tools.isNotNullOrEmpty(companyCookies)) {
    var temps = companyCookies.split(',');
    for (v in temps) {
      ids.push(temps[v].split('|')[0]);
    }
  }
  sui.ExcludedCompanyIds = ids;

  if (sui.IsDebug) {
    var timer1 = new Stopwatch();
    timer1.start();
  }

  sui.UserInfo = userManager.getUserInfo(cookier);
  if (sui.UserInfo && tools.isNotNullOrEmpty(sui.UserInfo.ResumeNumber)) {
    sui.IsUseResumeMatch = true;
  }

  if (timer1) {
    timer1.stop();
    sui.debugInfo.push('解码用户信息耗时(毫秒)：' + timer1.getTime());
  }

  if (timer) {
    timer.stop();
    sui.debugInfo.push('search中间件耗时(毫秒)：' + timer.getTime());
    sui.debugInfo.push('****************************************');
  }

  res.locals.searchInfo = sui;

  next();
};

/**
 * 注入公司职位搜索参数
 */
exports.setCompanySearchInfo = function (req, res, next) {

  var cookier = new Cookier(req, res);

  var sui = new SearchInfo();
  sui.IsDebug = req.query.zpssz === '1';
  if (sui.IsDebug) {
    var timer = new Stopwatch();
    timer.start();

  }
  sui.Cookier = cookier;
  sui.Query = req.query;
  sui.CompanyID = tools.convert(req.query.CompID, '').toUpperCase();
  if (sui.CompanyID.indexOf('D') > 0) {
    sui.CompanyID = sui.CompanyID.substring(0, sui.CompanyID.indexOf('D'));
  }
  sui.SortBy = tools.convert(req.query.sb, 0);
  sui.ShowModel = tools.convert(req.query.sm, -1);
  var cShowModel = cookier.getWithType(appSettings.cookies.showModel, 0);
  if (sui.ShowModel < 0 && cShowModel) sui.ShowModel = cShowModel;
  if (sui.ShowModel < 0) sui.ShowModel = 0;

  sui.JobLocation = '489';
  sui.JobLocationCN = '全国';
  sui.SearchUrl = req.url
    .replace('请输入关键词,例如:JAVA,销售代表,行政助理等', '')
    .replace('请输入公司名称或关键词,例如:联想,华为等', '')
    .replace('请输入职位名称或关键词,例如:会计经理,开发工程师等', '');

  sui.ClientIp = res.locals.clientIp;
  if (sui.ShowModel > -1 && sui.ShowModel != cShowModel) {
    cookier.set(appSettings.cookies.showModel, sui.ShowModel, 30);
  }
  sui.IsCompanyJobSearch = true;
  if (timer) {
    timer.stop();
    sui.debugInfo.push('search中间件耗时(毫秒)：' + timer.getTime());
    sui.debugInfo.push('****************************************');
  }
  res.locals.searchInfo = sui;
  next();
};
