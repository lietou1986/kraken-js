Array.prototype.isContains = function (e) {
    for (i = 0; i < this.length && this[i] != e; i++);
    return !(i == this.length);
}
$(document).ready(function () {

    var keywordAutocomplete = function () {
        var ktype = $("#kt").val();
        $("#KeyWord_kw2").autocomplete({
            source: function (request, response) {
                if (ktype !== "2") {
                    $.ajax({
                        url: "http://smart.zhaopin.com/hotword/jsonp",
                        dataType: "jsonp",
                        jsonp: "callback",
                        data: {
                            S_HOT_FULL: request.term,
                            S_HOT_TYPE: 4,
                            rows: 10,
                            format: "small",
						    client:"sou",
							ip:"127.0.0.1"
                        },
                        success: function (data) {
                            response($.map(data.results, function (item) {
                                if (item.word.toLowerCase() !== request.term.toLowerCase()) {
                                    return {
                                        label: item.word,
                                        value: item.word
                                    }
                                }
                            }));
                        }
                    });
                } else {
                    return;
                }
            },

            minLength: 0,
            select: function (event, ui) {
                $("#KeyWord_kw2").val(ui.item.value);
                zlzp.searchjob.gotoSearch_t();
            },
            open: function () {
                if ($.browser.msie && ($.browser.version == "6.0") && !$.support.style) {
                    $(".ui-autocomplete").width($(this).innerWidth());
                }
                $(this).removeClass("ui-corner-all").addClass("ui-corner-top");
            },
            close: function () {
                $(this).removeClass("ui-corner-top").addClass("ui-corner-all");
            }
        });

    }

    //关键字输入类型

    var keywordtip = ["请输入关键词,例如:JAVA,销售代表,行政助理等", "请输入公司名称或关键词,例如:联想,华为等", "请输入职位名称或关键词,例如:会计经理,开发工程师等"];

    //关键词文本框获取焦点
    $("#KeyWord_kw2").focus(function () {
        var keyword = $('#KeyWord_kw2');
        var ktype = $("#kt").val();
        if (ktype === "" || ktype == "0") {
            ktype = "1";
        }
        zlapply.clearDefTxt(this, keywordtip[Number(ktype) - 1]);
    });
    //关键词文本框失去焦点
    $("#KeyWord_kw2").blur(function () {
        var keyword = $('#KeyWord_kw2');
        var ktype = $("#kt").val();
        if (ktype === "" || ktype == "0") {
            ktype = "1";
        }
        zlapply.setDefTxt(this, keywordtip[Number(ktype) - 1]);

    });


    //设置关键词提示信息
    $('.keyword-tab a').click(function () {
        var index = $(this).prevAll().length;
        var keyword = $('#KeyWord_kw2');
        $('.keyword-tab a').removeClass('current');
        $(this).addClass('current');
        var currentKeyWord = keyword.val().trim();
        if (currentKeyWord.length > 0 && !keywordtip.isContains(currentKeyWord))
            keyword.val(currentKeyWord);
        else
            keyword.val(keywordtip[index]);
        $("#kt").val(index + 1);
        keywordAutocomplete();
    });
    //初始化关键词选择标签
    $('.keyword-tab a').each(function (i) {
        var index = i;
        var ktype = $("#kt").val();
        $(this).removeClass();
        if (ktype != "" && Number(ktype) === index + 1) {
            $(this).addClass('current');
            if ($('#KeyWord_kw2').val() === "") {
                $('#KeyWord_kw2').val(keywordtip[index]);
            }
        }
        if (ktype === "") {
            if (index === 0) {
                $(this).addClass('current');
            }
        }
        if ((ktype === "" && $('#KeyWord_kw2').val() === "") || $("#kt").val() == "0") {
            if (index === 0) {
                $(this).addClass('current');
            }
            $('#KeyWord_kw2').val(keywordtip[0]);
        }


    });
    keywordAutocomplete();
    //搜索调查begin
    $(".satisfied").click(function () {
        $.ajax({
            url: "/assist/FeedBack",
            data: "isOK=1",
            success: function () {
                $(".satsurvey").hide();
                $(".result").show();
            },
            error: function () {
                $(".satsurvey").hide();
                $(".result").show();
            }
        });

    });
    $(".unsatisfied").click(function () {
        $("#advise").val("");
        $.popupBase.init({ div: $("#content"), maskClose: false, posx: "center", posy: "center" });
    });
    $("#sugesstion").click(function () {
        submitAdvice();
    });
    $(".titleclose").click(function () {

        submitAdvice();
    });
    var scrTop = $(window).scrollTop();
    var conhTop = (scrTop + 266) + "px";
    var submitAdvice = function () {
        var content = encodeURIComponent($("#advise").val());
        $.ajax({
            url: "/assist/FeedBack",
            data: "isOK=0&advise=" + content,
            success: function () {
                $(".contentTip").css('_top', conhTop);
                $(".satsurvey").hide();
                $(".result").show();
                $(".contentTip").show();
                setTimeout("$('.contentTip').fadeOut('500')", 750);
            },
            error: function () {
                $(".satsurvey").hide();
                $(".result").show();
                $(".contentTip").show();
                setTimeout("$('.contentTip').fadeOut('500')", 750);
            }
        });
    }

});


