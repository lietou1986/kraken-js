'use strict';
var SeoRedirectInfo = require('../models/seoredirect');
var Map = require('hashmap');
var url = require('url');
var qs = require('querystring');
var Stopwatch = require('../utils/stopwatch');

var seoSourceMap = null, sidMap = null;
var excludeWords = ['招聘', '招聘网', '招聘信息', '企业招聘', '公司招聘', '人才招聘', '最新招聘', '校园招聘', '招聘要求', '招聘内容', '诚聘', '急聘', '应聘', '直聘', '公司直聘', '企业直聘', '兼职', '兼职网', '实习生', '实习', '工作内容', '工作描述', '工作职责', '岗位职责', '岗位要求', '岗位信息', '职责', '任职要求', '工资', '年薪', '要求', '薪酬', '待遇 ', '求职', '求职网', '求职网站', '网上求职', '招工', '实习生招聘', '找工作求职', '求职咨询', '求职指导', '诚聘信息', '急聘信息', '应聘信息', '直聘信息', '应聘求职', '急需找工作', '找工作', '找工作网站', '兼职招聘', '双休日兼职'];
var identifyCitys = ['上海', '广州', '深圳', '北京', '成都', '青岛', '杭州', '武汉', '南京', '郑州', '合肥', '石家庄', '长沙', '重庆', '天津', '太原', '沈阳', '西安', '长春', '苏州', '哈尔滨', '济南', '大连', '无锡', '南昌', '厦门', '南宁', '昆明', '福州', '宁波', '兰州'];

function init() {
  seoSourceMap = cache.get('seosourcemap');
  if (!seoSourceMap) {
    seoSourceMap = new Map();
    seoSourceMap.set('localhost', 'kw');
    seoSourceMap.set('www.baidu.com', 'wd');
    seoSourceMap.set('cn.bing.com', 'q');
    seoSourceMap.set('www.sogou.com', 'query');
    seoSourceMap.set('www.haosou.com', 'q');

  }
  sidMap = cache.get('sidmap');
  if (!sidMap) {
    sidMap = new Map();
    sidMap.set('localhost', '111111');
    sidMap.set('www.baidu.com', '121122523');
    sidMap.set('cn.bing.com', '121124551');
    sidMap.set('www.sogou.com', '121122530');
    sidMap.set('www.haosou.com', '121122526');
  }
}

/**
 * 注入seo跳转参数
 */
exports.setRedirectInfo = function (req, res, next) {
  var si = new SeoRedirectInfo();

  si.IsDebug = req.query.zpssz === '1';
  if (si.IsDebug) {
    var timer = new Stopwatch();
    timer.start();
  }
  init();
  var referer = req.headers.referer;
  if (referer) {
    var uri = url.parse(referer);
    var qn = seoSourceMap.get(uri.hostname.toLowerCase());
    if (qn) {
      var query = qs.parse(uri.query);
      var kw = query[qn];
      excludeWords.forEach(function (v) {
        kw = tools.replace(kw, v, '');
      });

      var location = '';
      for (var v in identifyCitys) {
        var city = identifyCitys[v];
        if (kw.indexOf(city) > -1) {
          kw = tools.replace(kw, city, '');
          location = city;
          break;
        }
      }

      si.Site = req.query.site || '';
      si.Sid = sidMap.get(uri.hostname.toLowerCase());
      si.IsSeo = true;
      si.KeyWord = kw;
      si.Location = location;
      si.KeyWordType = tools.convert(req.query.kt, 1);
    }
  }
  if (timer) {
    timer.stop();
    si.debugInfo.push('seo中间件耗时(毫秒)：' + timer.getTime());
  }
  res.locals.seoInfo = si;
  next();
};