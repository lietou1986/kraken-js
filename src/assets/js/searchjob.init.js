/* 搜索器启动*/
window.zlzp = {};
zlzp.first = [];
zlzp.first.push(function () {
    zlzp.searchjob.setTips();
    var sForm = document.frmSearch;
    if (sForm.action) {
        zlzp.searchjob.directory = "";
        zlzp.searchjob.file_t = sForm.action;
    }
    var pIndustry, pJobtype, pCity, pExpe, pDegree, pComptype, pCompsize;
    if (document.getElementById("buttonSelIndustry")) {
        pIndustry = new zlzp.PopupIndustry("buttonSelIndustry", sForm.industry, dIndustry, {
            title: "选择行业",
            col: 2,
            width: 705,
            maxsel: 10,
            titOffset: -24
        });
        pIndustry.offsetX = -295;
        pIndustry.offsetY = 28;
    }
    if (document.getElementById("buttonSelJobType")) {
        pJobtype = new zlzp.PopupJobTypeName("buttonSelJobType", sForm.SchJobType, dJobtype, {
            title: "选择职位",
            col: 3,
            width: 705,
            shidden: sForm.subJobtype,
            sdata: dSubjobtype,
            scol: 2,
            swidth: 360,
            titOffset: -24
        });
        pJobtype.offsetX = 25;
        pJobtype.offsetY = 28;
    }
    if (document.getElementById("buttonSelCity")) {
        pCity = new zlzp.PopupCityS("buttonSelCity", sForm.Location ? sForm.Location : sForm.location, dCity, {
            title: "选择地区",
            col: 6,
            width: 705,
            shidden: sForm.JobLocation,
            maxsel: 5,
            titOffset: -24,
            noAllBtn: 1
        });
        pCity.offsetX = -630;
        pCity.offsetY = 28;
        pCity.posTips = -80;
    }
    if (document.getElementById("buttonSelWorkingTime")) {
        pExpe = new zlzp.PopupMutil("buttonSelWorkingTime", sForm.WorkingExp, dExpe, {
            title: "选择工作经验",
            col: 2,
            width: 275,
            maxsel: 5,
            titOffset: -24
        });
        pExpe.offsetX = 25;
        pExpe.offsetY = 28;
    }
    if (document.getElementById("buttonSelDegree")) {
        pDegree = new zlzp.PopupMutil("buttonSelDegree", sForm.EduLevel, dDegree, {
            title: "选择学历要求",
            col: 1,
            width: 275,
            maxsel: 5,
            titOffset: -24
        });
        pDegree.offsetX = 25;
        pDegree.offsetY = 28;
    }
    if (document.getElementById("buttonSelComptype")) {
        pComptype = new zlzp.PopupMutil("buttonSelComptype", sForm.CompanyType, dComptype, {
            title: "选择公司性质",
            col: 2,
            width: 275,
            maxsel: 5,
            titOffset: -24
        });
        pComptype.offsetX = 25;
        pComptype.offsetY = 28;
    }
    if (document.getElementById("buttonSelCompsize")) {
        pCompsize = new zlzp.PopupMutil("buttonSelCompsize", sForm.CompanySize, dCompsize, {
            title: "选择公司规模",
            col: 2,
            width: 275,
            maxsel: 5,
            titOffset: -24
        });
        pCompsize.offsetX = 25;
        pCompsize.offsetY = 28;
    }
});

(function () {
    var args = arguments;
    var i = 1;
    function getScript(url, fn) {
        var a = document.createElement("script");
        a.async = !!arguments[0];
        a.src = args[i];
        a.onload = a.onreadystatechange = function (c, b) {
            if (b || !a.readyState || /loaded|complete/.test(a.readyState)) {
                a.onload = a.onreadystatechange = null;
                if (fn instanceof Function) {
                    fn(i);
                }
                if (args[++i]) {
                    getScript(args[i], fn);
                }
            }
        };
        (document.getElementById("zljsc") || document.body).appendChild(a);
    }
    getScript(args[i]);
})(true, "/js/basedata.js?v=20160421", "/js/searchjob.js");
