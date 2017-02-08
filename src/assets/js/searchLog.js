var brow = $.browser;
var h_log_info = $("#h_log_info").val();
if ($.browser.msie || $.browser.mozilla) {
    $(function () {
        var eventType = 0;//0页面加载,1单个投递,2查看职位,3批量投递
        submitLog(eventType,h_log_info);
    });
} else {
    //测试过程中,使用chrome浏览器，用页面加载完毕的方式会请求两次接口
    window.onload = function () {
        var eventType = 0;
        submitLog(eventType, h_log_info);
    }
}
//多选时，记录日志
function submitLogBatch(eventType) {
    var allArr = document.getElementsByName("vacancyid");
    var plogs = "";
    for (var i = 0; i < allArr.length; i++) {
        if (allArr[i].checked) {
            plogs += allArr[i].getAttribute("plog");
            if (i < allArr.length - 1)
                plogs += "|";
        }
    }
    if (plogs != "")
        plogs = plogs.substring(0, plogs.length - 1);
    submitLog(eventType, plogs);
}
function submitLog(eventType, positionLogInfo) {
    //alert(positionLogInfo);
    //如果是关键词搜索
    var keyword = $("#KeyWord_kw2").val();
    //eventType 0页面加载,1单个投递,2批量投递(上),3收藏职位(上),4批量投递(下),5收藏职位(下),6查看职位,7单个收藏
    var keywordtip = ["请输入关键词,例如:JAVA,销售代表,行政助理等", "请输入公司名称或关键词,例如:联想,华为等", "请输入职位名称或关键词,例如:会计经理,开发工程师等"];
    if (keyword != null && keyword.length > 0) {
        //alert(keyword);
        for (var i = 0; i < keywordtip.length; i++) {
            if (keywordtip[i] == keyword) {
                return;
            }
        }
        
        var kt = ($('#kt').val() == null || $('#kt').val().length < 1) ? '1' : $('#kt').val();        
        var aj = $.ajax({
            url: 'http://recommendapi.zhaopin.com/count',
            //url: 'http://localhost:8080/apply/searchLog',
            data: {
                'kw': keyword,
                'kt': kt,
                'et': eventType,
                'sj': $('#c5').val(),
                'in': $('#c8').val(),
                'jl': $('#c7').val(),
                'p': $('#c4').val(),
                'sb': $('#c15').val(),
                'adv': $('#isadv').val(),
                'pid': positionLogInfo
            },
            type: 'get',
            cache: false,
            async:true,
            dataType:'jsonp',
            jsonp: 'callback',
            success: function (data) {},
            error: function(){}
        });
    }
}