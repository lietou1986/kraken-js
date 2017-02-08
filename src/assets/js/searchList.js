$(document).ready(function () {
    $('.nextpagego-btn').click(function () {
        var str = $('.pagesnum').val();
        if (isNaN(str) || str === "") {
            $('.pagesnum').addClass("redbg");
            return false;
        }
    });

    $(".pagesnum").focus(function () {
        $(this).val("").removeClass("redbg");
    })
    var WorkingExp = $("input[name='WorkingExp']").val();
    var EduLevel = $("input[name='EduLevel']").val();
    var EmplType = $("input[name='EmplType_h']").val();
    var PublishDate = $("input[name='PublishDate']").val();
    var CompanyType = $("input[name='CompanyType']").val();
    var CompanySize = $("input[name='CompanySize']").val();
    var SalaryFrom_h = $("input[name='SalaryFrom_h']").val();
    var SalaryTo_h = $("input[name='SalaryTo_h']").val();
    var CompID = $("input[name='CompID']").val();
    var isadv = $("#isadv").val();
    if (WorkingExp != "" || EduLevel != "" || PublishDate != "" || CompanyType != "" || CompanySize != "" || (EmplType != "" && typeof (EmplType) != "undefined" && EmplType != "undefined") || (SalaryFrom_h != "0" && SalaryFrom_h != "") || SalaryTo_h != "" || isadv == "1") {
        if (typeof (CompID) != "undefined" && CompID != "" && CompID != "undefined" && CompanyType != "") {
        } else {
            $(".slideUp a").text("收起").toggleClass('down');
            $("#moreoption").show();
        }
    }

    var ralink = $("#relationlink").find("a");
    if (ralink.length < 1) {
        $("#relationlink").hide();
    }

    $("#Release-time").change(function () {
        $("input[name=PublishDate]").val($(this).val());
    });
});

function submitfrom() {
    var keyword = $("#KeyWord_kw2").val();
    if (keyword === "请输入关键词,例如:JAVA,销售代表,行政助理等" || keyword === "请输入公司名称或关键词,例如:联想,华为等" || keyword === "请输入职位名称或关键词,例如:会计经理,开发工程师等") {
        $("#KeyWord_kw2").val("");
    }
    var city = $("#JobLocation").val();
    if (city === "选择城市" || city === "" || city === "全国" || city === "489") {
        alert("请选择城市！");
        return false;
    }

    return true;
}