$(document).ready(function () {
    var kw = getQueryString("kw");
    var sj = decodeURIComponent(getQueryString("sj"));
    if (kw == "" && sj == "") {
    } else {
        $.ajax({
            url: "http://rclx.zhaopin.com/relatedDataHandler.ashx",
            dataType: "jsonp",
            jsonp: "jsonpcallback",
            data: {
                kw: kw,
                sj: sj
            },
            success: function (data) {
                if (data.StatusCode == 200) {
                    var ritem = "";

                    for (var i = 0; i < data.RelatedData.length; i++) {
                        if (i == data.RelatedData.length - 1) {
                            ritem += "<li class=\"backnone\"><a class=\"recomCon\" title=\"" + data.RelatedData[i].Name + "\" href=\"" + data.RelatedData[i].Url + "\" target=\"_blank\">" + data.RelatedData[i].Name + "</a></li>";
                        } else {
                            ritem += "<li><a class=\"recomCon\" title=\"" + data.RelatedData[i].Name + "\" href=\"" + data.RelatedData[i].Url + "\" target=\"_blank\">" + data.RelatedData[i].Name + "</a></li>";
                        }
                    }
                    if (ritem !== "") {
                        var html = "<ul>" + ritem + "</ul>";
                        $("#recomitem1").html(html);
                        $("#recomitem2").html(html.replaceAll("dda=1", "dda=3").replaceAll("dda=2", "dda=4"));
                        $(".recommendPosition").show();
                        $(".recommendPositionBottom").show();
                    } else {
                        $(".recommendPosition").hide();
                        $(".recommendPositionBottom").hide();
                    }
                } else {
                    $(".recommendPosition").hide();
                    $(".recommendPositionBottom").hide();
                }
            }
        });
    }
});
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2]; return "";
}
String.prototype.replaceAll = function (reallyDo, replaceWith, ignoreCase) {
    if (!RegExp.prototype.isPrototypeOf(reallyDo)) {
        return this.replace(new RegExp(reallyDo, (ignoreCase ? "gi" : "g")), replaceWith);
    } else {
        return this.replace(reallyDo, replaceWith);
    }
} 