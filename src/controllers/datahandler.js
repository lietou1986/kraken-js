var Cookier = require('../utils/cookier');

/**
 * 填充视图数据
 */
function DataHandler(req, res) {

    var cookier = new Cookier(req, res);
    /**
     * 获取查询历史
     */
    this.getSearchHistory = function () {
        var lastSearchHistory = cookier.get(appSettings.cookies.lastSearchHistory);
        if (tools.isNullOrEmpty(lastSearchHistory)) return null;
        return JSON.parse(lastSearchHistory);
    };



    /**
     * 获取分类html
     */
    this.getJobTypeHtml = function () {
        return '占据个位置';
    };
}



module.exports = DataHandler;