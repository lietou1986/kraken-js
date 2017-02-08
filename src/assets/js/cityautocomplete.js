$("#JobLocation").autocomplete({
    source: function (request, response) {
        $.ajax({
            url: "http://rclx.zhaopin.com/SearchHandler.ashx",
            dataType: "jsonp",
            jsonp: "jsonpcallback",
            data: {
                keyword: request.term,
                type: "5"
            },
            success: function (data) {
                response($.map(data.HotWords, function (item) {
                    return {
                        label: item.Word,
                        value: item.Word
                    }
                }));
            }
        });
    },
    minLength: 1,
    select: function (event, ui) {

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