$(document).ready(function () {
    //初始化屏蔽公司显示数目
    unit_layer.init_num_del_company();

    //为确定和关闭按钮关联关闭响应事件
    $("#close_save_com_layer").bind("click", unit_layer.save_and_close_comps);

    $(window).bind("scroll resize load", function () { scroll_position('div_01'); });
});
//  排除公司按钮的滚动效果
function scroll_position(id) {

    var o = $('#' + id);
    var div_02 = $('#div_02');
    var offsetY = $(window).height() - o.height() + $(window).scrollTop() - 200;
    if (div_02.get(0).style.display != "none" && offsetY >= 458) {
        var div02_offsetY = offsetY - div_02.height() + 63;
    }
}

//弹出层的命名空间
var unit_layer = {};

//  对cookie里排除公司保存操作
unit_layer.saveCookie = function (scope) {
    var jqSelectDom = $("#box_select_company");
    var selectDom = $("#box_select_company").get(0);
    var selectedIndex = selectDom.selectedIndex;
    var option = selectDom.options[selectedIndex];
    if (jqSelectDom.val() == "" || option.getAttribute("c_name") == null) {
        $(".alert_box").hide();
        return;
    } else {
        var compsCookieStr = jQuery.cookie("removeComps");
        if (compsCookieStr != null && compsCookieStr != "" && compsCookieStr.indexOf(jqSelectDom.val() + "|") != -1) {
            //  重复判断
            $(".alert_box").hide();
            return;
        }
        unit_layer.on_track_event(
            function () {
                compsCookieStr = (compsCookieStr == null || compsCookieStr == "" ? "" : (compsCookieStr + ",")) + jqSelectDom.val() + "|" + encodeURIComponent(option.getAttribute("c_name"));
                jQuery.cookie("removeComps", compsCookieStr, { expires: 3, path: '/' });
                unit_layer.refresh_joblist();
            }, scope, {
                dda_action: 'forbid',    //参数值为forbid或cancel 点“确定”按钮时，该参数值为forbid；点击公司名称后的X时，该参数为cancel；
                companyid: jqSelectDom.val(),	  //公司ID
                company: encodeURIComponent(option.getAttribute("c_name"))      //公司名称	参数值需URLEncoder
            });
    }
}

//  点击确定时需要保存cookie信息的操作   和关闭的响应事件函数
unit_layer.save_and_close_comps = function () {
    //  监控事件触发
    try {
        dyweTrackEvent('forbidcompwithsou', 'forbidcomp');
    } catch (e) {
    } finally {
        //   点击确定后先处理cookie，然后进行关闭和刷新
        unit_layer.saveCookie(this);
    }

}

//   点击关闭后直接刷新
unit_layer.close_comps = function () {
    $("#div_02").hide();
    unit_layer.refresh_joblist();
}
//  对上层window的url刷新
unit_layer.refresh_joblist = function () {
    location.href = location.href.replace(/&p=\d/, "").replace(/#$/, "");
}

//   排除公司信息展示初始化
unit_layer.init_remove_comps = function () {
    var removeCompsStr = $.cookie("removeComps");
    var num = 0;
    if (removeCompsStr != null && removeCompsStr != "") {
        var removeComps = removeCompsStr.split(",");
        if (removeComps.length > 0) {
            $(".com_name").each(function () {
                var remComInfo = removeComps[arguments[0]];
                if (remComInfo != undefined && remComInfo.indexOf("|") != -1) {
                    var _innerHtml = $(this).html();
                    var companyId = remComInfo.split("|")[0];
                    var companyName = decodeURIComponent(remComInfo.split("|")[1]);
                    num++;
                    //  为显示名字的A标记里添加一个c_id的属性，值表示的时公司id，在点击后面叉号的时候从节点里取得公司信息，去掉cookie信息
                    $(this).attr({
                        "c_id": companyId,
                        "c_name": companyName
                    });

                    var htmlstr = $(this).text();
                    $(this).html(companyName + "<i class='alt_close02 __ga__i_forbidcompwithsou_cancelfc_cancel_00" + arguments[0] + 1 + "'></i>");
                    $(this).parent(".dsp_none").show();
                } else {
                    return;
                }
            });
        }
        $(".alt_close02").each(function () {
            var index = arguments[0];
            var jqThisDom = $(this);
            jqThisDom.bind("click", function () {
                //绑定去掉cookie里不需要排除的公司信息
                var removeCompsStr = $.cookie("removeComps");
                if (removeCompsStr == null) {
                    return;
                }
                var jqADom = jqThisDom.parent(".com_name");
                var reCompanyId = jqADom.attr("c_id");
                var reCompanyName = jqADom.attr("c_name");
                //把不排除的公司从cookie里去掉
                if (removeCompsStr != null && removeCompsStr != "") {
                    removeCompsStr = removeCompsStr.replace(reCompanyId + "|" + encodeURIComponent(reCompanyName), "");
                    removeCompsStr = removeCompsStr.replace(/,,/g, ",");
                    removeCompsStr = removeCompsStr.replace(/^,|,$/g, "");
                }
                $.cookie("removeComps", removeCompsStr, { expires: 3, path: '/' });

                unit_layer.on_track_event(unit_layer.close_comps(), this, {
                    dda_action: 'cancel',    //参数值为forbid或cancel 点“确定”按钮时，该参数值为forbid；点击公司名称后的X时，该参数为cancel；
                    companyid: reCompanyId,	  //公司ID
                    company: encodeURIComponent(reCompanyName)      //公司名称	参数值需URLEncoder
                });
            });
        });
    }
    var jqNumRemoveCom = $("#remove_com_num");
    jqNumRemoveCom.html(num);
}
//  初始化弹出层按钮的数字
unit_layer.init_num_del_company = function () {
    var optionLen = $("#box_select_company").get(0).options.length;
    var removeedCom = $.cookie("removeComps");
    if (optionLen > 1 || removeedCom) {
        $(".del_company").show();
        $(".del_company .f_number").html(removeedCom ? removeedCom.split(",").length : "0");
    } else {
        $(".del_company").hide();
    }
}
//  公司最多选择5个
unit_layer.onSelect_limit = function () {
    var totalSelectd = 0;
    $(".com_name").each(function () {
        if ($(this).attr("c_id") != null) {
            totalSelectd++;
        }
    });
    if (totalSelectd >= 5) {
        var jqSelectDom = $("#box_select_company");
        var selectDom = $("#box_select_company").get(0);
        selectDom.options[0].selected = "selected";
        alert("最多可排除5家公司，请先删除已排除公司后再选择。");
    }
}
//  公司最多选择5个 del_company
unit_layer.on_track_event = function (callback, scope, paramCfg) {
    try {
        var _me = unit_layer;
        var params = {
            dda_action: '',    //参数值为forbid或cancel 点“确定”按钮时，该参数值为forbid；点击公司名称后的X时，该参数为cancel；
            companyid: '',   //公司ID
            company: ''      //公司名称	参数值需URLEncoder
        };
        $.extend(params, paramCfg);
        var monitor_url = "http://pv.zhaopin.cn/track.gif?dda_source=souresultpage&dda_position=forbidcompany";
        monitor_url = _me.init_monitor_url(params, monitor_url);
        var i = new Image(1, 1);
        i.src = monitor_url;
    } catch (e) {
    } finally {
        setTimeout(callback instanceof Function ? callback : function () {
        }, 100);
    }
}

//  初始化URL参数；
unit_layer.init_monitor_url = function (params, url) {
    var _me = unit_layer;
    var monitor_url = url || '';
    var url_parmas = {
        //	Cookie中的用户ID
        dywesu: $.cookie("JsNewlogin") || '',
        //当前URL	参数值需URLEncoder
        dda_path: _me.URIencode(location.href),
        //当前referer	参数值需URLEncoder
        dda_dywea: _me.URIencode($.cookie("dywea")),
        //Cookie中的dwyea	参数值需URLEncoder
        dda_referer: document.referrer ? _me.URIencode(document.referrer) : '-'
    };
    if (params) {
        $.extend(url_parmas, params);
    }
    for (var key in url_parmas) {
        monitor_url += '&' + key + '=' + url_parmas[key];
    }
    return monitor_url;
}
//  URI encode
unit_layer.URIencode = function (d, a) {
    var c = encodeURIComponent;
    return c instanceof Function ? (a ? encodeURI(d) : c(d)) : escape(d);
}

//  为点击元素初始化监控事件
unit_layer.init_monitor_event = function (dom, catelog, action, optionAction) {
    var _me = unit_layer;
    _me.on_track_event(dom, catelog);
}