'use strict';
var Map = require('hashmap');



/**
 * 读取数据并缓存
 */
function getData(name) {
    var data = cache.get(name);
    if (data) return data;
    var data = require('../app_data/' + name.toLowerCase() + '.json');
    cache.put(name, data);
    return data;
}

/**
 * 同步读取文件内容并缓存
 */
function getFileData(name) {
    var data = null;
    try {
        data = cache.get(name);
        if (data) return data;
        var rf = require('fs');
        var data = rf.readFileSync(tools.util.format("./app_data/%s", name.toLowerCase()), 'utf-8');
        if (!tools.isNullOrEmpty(data)) {
            cache.put(name, data);
        }
    }
    catch (ex) {
        logger.error(tools.util.format('read file error:%s', name), ex);
    }
    return data;
}

/**
 * 获取行业数据
 */
exports.getIndustry = function () {
    return getData('industry');
}

/**
 * 热门行业
 */
exports.getHotIndustry = function () {
    return [
        {
            "en_name": "Internet/E-Commerce",
            "code": "210500",
            "name": "互联网/电子商务"
        },
        {
            "en_name": "Computer Software",
            "code": "160400",
            "name": "计算机软件"

        },
        {
            "en_name": "IT Service/General IT",
            "code": "160000",
            "name": "IT服务(系统/数据/维护)"

        },
        {
            "en_name": "Electronic/Semiconductor/IC",
            "code": "160500",
            "name": "电子技术/半导体/集成电路"

        },
        {
            "en_name": "Computer Hardware",
            "code": "160200",
            "name": "计算机硬件"

        },
        {
            "en_name": "Telecom & Network Equipment",
            "code": "300100",
            "name": "通信/电信/网络设备"

        },
        {
            "en_name": "Telecom Operators/Service Providers",
            "code": "160100",
            "name": "通信/电信运营、增值服务"

        },
        {
            "en_name": "Online Game",
            "code": "160600",
            "name": "网络游戏"

        }, {
            "en_name": "Security/Futures",
            "code": "180000",
            "name": "基金/证券/期货/投资"
        }
    ];
}

/**
 * 获取标签数据
 */
var getTagFilter = exports.getTagFilter = function () {
    return getData('tagfilter');
}

/**
 * 获取地铁数据
 */
exports.getMetro = function () {
    var data = cache.get('metro1');
    if (data) return data;

    data = getData('metro').Result;
    data.forEach(n => {
        n.SubLines.forEach(m => {
            m.LineId = tools.md5(m.LineName);
        })
    })

    cache.put('metro1', data);
    return data;
}

/**
 * 获取类别数据
 */
exports.getJobType = function () {
    return getData('jobtype');
}

/**
 * 获取城市数据
 */
exports.getCity = function () {
    return getData('city');
}

/**
 * 类别字典
 * code->name
 */
exports.getJobTypeMap = function () {
    var dataMap = cache.get('jobtypemap');
    if (dataMap) return dataMap;


    dataMap = new Map();

    exports.getJobType().forEach(t => {
        dataMap.set(t.code, t.name);
        t.sublist.forEach(t1 => {
            dataMap.set(t1.code, t1.name);
            t1.sublist.forEach(t2 => {
                dataMap.set(t2.code.padLeft(3, '0'), t2.name);
            });
        });
    });

    cache.put('jobtypemap', dataMap);
    return dataMap;
}

/**
 * 获取类别数组
 */
exports.getJobTypeArray = function () {
    var dataArray = cache.get('jobtypearray');
    if (dataArray) return dataArray;

    dataArray = [];

    exports.getJobType().forEach(t => {
        t.sublist.forEach(t1 => {
            t1.sublist.forEach(t2 => {
                dataArray.push(
                    {
                        rootName: t.name, rootCode: t.code, name: t1.name, code: t1.code, subName: t2.name, subCode: t2.code.padLeft(3, '0')
                    });
            });
        });
    });
    cache.put('jobtypearray', dataArray);
    return dataArray;
}

/**
 * 城市字典
 * code->name
*/
exports.getCityMap = function () {
    var dataMap = cache.get('citymap');
    if (dataMap) return dataMap;

    dataMap = new Map();

    var data = exports.getCity();

    data.province.forEach(t => {
        dataMap.set(t.code, t.name);
        if (t.sublist) {
            t.sublist.forEach(t1 => {
                dataMap.set(t1.code, t1.name);
                if (t1.sublist) {
                    t1.sublist.forEach(function (t2) {
                        dataMap.set(t2.code, t2.name);
                    });
                }
            });
        }
    });

    data.other.forEach(t => {
        dataMap.set(t.code, t.name);
        if (t.sublist) {
            t.sublist.forEach(t1 => {
                dataMap.set(t1.code, t1.name);
                if (t1.sublist) {
                    t1.sublist.forEach(function (t2) {
                        dataMap.set(t2.code, t2.name);
                    });
                }
            });
        }
    });

    data.hotcitys.forEach(t => {
        dataMap.set(t.code, t.name);
        if (t.sublist) {
            t.sublist.forEach(t1 => {
                dataMap.set(t1.code, t1.name);
                if (t1.sublist) {
                    t1.sublist.forEach(function (t2) {
                        dataMap.set(t2.code, t2.name);
                    });
                }
            });
        }
    });

    data.all.forEach(t => {
        dataMap.set(t.code, t.name);
    });

    cache.put('citymap', dataMap);
    return dataMap;
}

/**
 * 城市字典
 * name->code
 */
exports.getCityNcMap = function () {
    var dataMap = cache.get('cityncmap');
    if (dataMap) return dataMap;

    dataMap = new Map();

    var data = exports.getCity();

    data.province.forEach(t => {
        dataMap.set(t.name, t.code);
        if (t.sublist) {
            t.sublist.forEach(t1 => {
                dataMap.set(t1.name, t1.code);
                if (t1.sublist) {
                    t1.sublist.forEach(function (t2) {
                        dataMap.set(t2.name, t2.code);
                    });
                }
            });
        }
    });

    data.other.forEach(t => {
        dataMap.set(t.name, t.code);
        if (t.sublist) {
            t.sublist.forEach(t1 => {
                dataMap.set(t1.name, t1.code);
                if (t1.sublist) {
                    t1.sublist.forEach(function (t2) {
                        dataMap.set(t2.name, t2.code);
                    });
                }
            });
        }
    });

    data.hotcitys.forEach(t => {
        dataMap.set(t.name, t.code);
        if (t.sublist) {
            t.sublist.forEach(t1 => {
                dataMap.set(t1.name, t1.code);
                if (t1.sublist) {
                    t1.sublist.forEach(function (t2) {
                        dataMap.set(t2.name, t2.code);
                    });
                }
            });
        }
    });

    data.all.forEach(t => {
        dataMap.set(t.name, t.code);
    });

    cache.put('cityncmap', dataMap);
    return dataMap;
}

/**
 * 行业字典
 */
exports.getIndustryMap = function () {
    var dataMap = cache.get('industrymap');
    if (dataMap) return dataMap;

    dataMap = new Map();

    exports.getIndustry().forEach(t => {
        dataMap.set(t.code, t.name);
        t.sublist.forEach(t1 => {
            dataMap.set(t1.code, t1.name);
        });
    });

    cache.put('industrymap', dataMap);
    return dataMap;
}

/**
 * 获取类别名称
 */
exports.getJobTypeName = function (code) {
    code = code.padLeft(3, '0');
    var dataMap = exports.getJobTypeMap();
    if (!dataMap) return '';
    return dataMap.get(code) || '';
}

/**
 * 获取城市名称
 */
exports.getCityName = function (code) {
    var dataMap = exports.getCityMap();
    if (!dataMap) return '';
    return dataMap.get(code) || '';

}

/**
 * 获取城市编码
 */
exports.getCityCode = function (name) {
    var dataMap = exports.getCityNcMap();
    if (!dataMap) return '';
    return dataMap.get(name) || '';
}

/**
 * 获取行业名称
 */
exports.getIndustryName = function (code) {
    var dataMap = exports.getIndustryMap();
    if (!dataMap) return '';
    return dataMap.get(code) || '';

}

/**
 * 获取发布时间名称
 */
exports.getPublishDateName = function (code) {
    var dataList = getTagFilter().PublishDate;
    if (!dataList) return '';
    for (var v in dataList) {
        var d = dataList[v];
        if (d.Code == code) return d.Name;
    }
    return '';
}

/**
 * 获取工作经验名称
 */
exports.getWorkExperienceName = function (code) {
    var dataList = getTagFilter().WorkExperience;
    if (!dataList) return '';
    for (var v in dataList) {
        var d = dataList[v];
        if (d.Code == code) return d.Name;
    }
    return '';
}

/**
 * 获取教育经历名称
 */
exports.getEducationName = function (code) {
    var dataList = getTagFilter().Education;
    if (!dataList) return '';
    for (var v in dataList) {
        var d = dataList[v];
        if (d.Code == code) return d.Name;
    }
    return '';
}

/**
 * 获取公司类型名称
 */
exports.getCompanyTypeName = function (code) {
    var dataList = getTagFilter().CompanyType;
    if (!dataList) return '';
    for (var v in dataList) {
        var d = dataList[v];
        if (d.Code == code) return d.Name;
    }
    return '';
}

/**
 * 获取公司规模名称
 */
exports.getCompanySizeName = function (code) {
    var dataList = getTagFilter().CompanySize;
    if (!dataList) return '';
    for (var v in dataList) {
        var d = dataList[v];
        if (d.Code == code) return d.Name;
    }
    return '';
}

/**
 * 获取职位类型名称
 */
exports.getEmploymentTypeName = function (code) {
    var dataList = getTagFilter().EmploymentType;
    if (!dataList) return '';
    for (var v in dataList) {
        var d = dataList[v];
        if (d.Code == code) return d.Name;
    }
    return '';
}

/**
 * 获取其它数据
 */
exports.getAssistData = function () {
    return getData('assist');
}

/**
 * 获取反馈率白名单
 */
exports.getFeedbackBlacksData = function () {
    var data = cache.get('feedbackblacksdata');
    if (data) return data;
    return [];
}

/**
 * 获取品牌数据
 */
exports.getBrandData = function () {
    var data = cache.get('branddata');
    if (data) return data;
    return [];
}

/**
 * 获取seo城市链接
 */
exports.getCityLink = function () {
    var dataMap = cache.get('citylink');
    if (dataMap) return dataMap;
    var fileData = getFileData('citylink.txt');
    if (fileData) {
        //转换成需要的对象
        dataMap = new Map();
        var alllines = fileData.split((/\r?\n/ig));
        alllines.forEach(line => {
            if (tools.isNullOrEmpty(line)) return false;

            var data = line.split('&');

            var city = data[0];
            var relateCity = data[1];

            var cityData = city.split('|');
            var relateCityData = relateCity.split('%');

            var relateCityMap = new Map();
            relateCityData.forEach(function (city) {
                var temps = city.split('|');
                relateCityMap.set(temps[0], tools.util.format('http://%s.zhaopin.com/%s/', temps[2] === '0' ? 'www' : 'jobs', temps[1]));
            });

            dataMap.set(cityData[1], relateCityMap);
        });
        cache.put('citylink', dataMap);
    }
    return dataMap;
}

/**
 * 获取seo聚合链接
 */
exports.getJuLink = function () {
    var dataMap = cache.get('julink');
    if (dataMap) return dataMap;
    var fileData = getFileData('julink.txt');
    if (fileData) {

        //转换成需要的对象
        dataMap = new Map();

        dataMap.set('1', []);
        dataMap.set('2', []);
        dataMap.set('3', []);

        var alllines = fileData.split((/\r?\n/ig));
        alllines.forEach(line => {
            if (tools.isNullOrEmpty(line)) return false;

            var data = line.split('|');
            if (data.length < 5) return false;

            var subJobType = data[0];
            var keyword = data[2];
            var pinyin = data[3];
            var level = data[4];

            if (dataMap.has(level)) {
                dataMap.get(level).push(tools.util.format('<a href="http://jobs.zhaopin.com/sj%s/ju_%s/" target="_blank">%s</a>', subJobType, pinyin, keyword));
            }
        });

        cache.put('julink', dataMap);
    }
    return dataMap;
}

/**
 * 教育背景转换字典
 */
exports.getEducationMap = function () {
    var dataMap = cache.get('edumap');
    if (dataMap) return dataMap;
    dataMap = new Map();

    dataMap.set('12', '12');
    dataMap.set('13', '13');
    dataMap.set('9', '9');
    dataMap.set('7', '9;13;7;12');
    dataMap.set('5', '5');
    dataMap.set('4', '4');
    dataMap.set('3', '3;10');
    dataMap.set('10', '10');
    dataMap.set('1', '11;1');
    dataMap.set('11', '11');
    dataMap.set('8', '8');
    dataMap.set('-1', '-1');

    cache.put('edumap', dataMap);

    return dataMap;
}

exports.getBusinessAreasMap = function () {
    var dataMap = cache.get('businessareasmap');
    if (dataMap) return dataMap;

    dataMap = new Map();
    getTagFilter().Businessareas.forEach(data1 => {
        var dataMap1 = new Map();
        data1.Sublist.forEach(data2 => {
            var dataMap2 = new Map();
            data2.Sublist.forEach(data3 => {
                dataMap2.set(data3.Name, data3);
            })
            dataMap1.set(data2.Code, dataMap2);
        });
        dataMap.set(data1.Code, dataMap1);
    });

    cache.put('businessareasmap', dataMap);
    return dataMap;
}


exports.getMetroMap = function () {
    var dataMap = cache.get('metromap');
    if (dataMap) return dataMap;

    dataMap = new Map();

    exports.getMetro().forEach(function (metro) {
        var dataMap1 = new Map();
        metro.SubLines.forEach(line => {
            var dataMap2 = new Map();
            line.SubStations.forEach(function (station) {
                dataMap2.set(station.StationName, station);
            });
            dataMap1.set(line.LineName, dataMap2);
        });

        dataMap.set(metro.CityId, dataMap1);
    });

    cache.put('metromap', dataMap);
    return dataMap;
}

/**
 * 启动时加载到缓存
 */
exports.init = function () {
    exports.getJobTypeMap();
    exports.getJobTypeArray();
    exports.getCityMap();
    exports.getCityNcMap();
    exports.getIndustryMap();
    exports.getTagFilter();
    exports.getJuLink();
    exports.getCityLink();
    exports.getBusinessAreasMap();
    exports.getMetroMap();
    exports.getEducationMap();
    logger.info('基础数据加载完毕');
}


