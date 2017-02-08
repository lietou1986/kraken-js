$(document).ready(function () {
    (function init() {
        var tagOpen = $.cookie('tagopen');
        if (tagOpen == "0") {
            $('.moresearch_main ul li').css('position', 'static');
            $('.newlist_sx').slideUp(500);
            $('.search_sqtj').html('展开筛选条件');
        } else {
            $('.newlist_sx').slideDown(500);
            $('.search_sqtj').html('收起筛选条件');
            setTimeout(function () {
                $('.moresearch_main ul li').css('position', 'relative');
            }, 600);
        }
    })();

    $('.newlist_list_xlbtn').click(function () {
        var curDisplay = $(this).parents('tr').next().css("display");
        if (curDisplay == "none") {
            $(this).parents('tr').next().show()
            $(this).addClass('newlist_list_xlbtnhover');
        } else {
            $(this).parents('tr').next().hide();
            $(this).removeClass('newlist_list_xlbtnhover');
        }
    });

    $(".newlist_list_xlbtn").hover(function () {
        $(this).parents('tr').next().show();
        $(this).addClass('newlist_list_xlbtnhover');
    }, function () {
    });
    $(".newlist_tr_detail").hover(function () {
        $(this).show();
    }, function () {
    });
    /*工作地区，职位标签展开收起*/
    $('.search_newlist_toplast1').click(function () {
        if ($(this).prev().css('height') == '34px') {
            $(this).prev().css('height', 'auto');
        } else {
            $(this).prev().css('height', '34px');
        }
    });
    /*下拉菜单*/
    $('.moresearch_main ul li').hover(function () {
        $(this).find('div').css('display', 'block');
    }, function () {
        $(this).find('div').css('display', 'none');
    });
    $('.moresearch_main ul li div a').click(function () {
        $(this).parent().css('display', 'none');
        $(this).parent().prev().html($(this).html());
    });
    /*已保存下拉*/
    $('.search_ybc').click(function () {
        var oBc = $(this).next().css("display");
        if (oBc == "none") {
            $(this).next().show()
            $(this).removeClass('search_ybc');
            $(this).addClass('search_ybc_hover');
        }
        else {
            $(this).next().hide()
            $(this).removeClass('search_ybc_hover');
            $(this).addClass('search_ybc');
        };
    });
    $(document).mouseup(function (e) {
        var _con = $('.search_teshu');
        if (!_con.is(e.target) && _con.has(e.target).length === 0) {
            $('.search_teshu a.search_ybc_hover').addClass('search_ybc');
            $('.search_teshu a.search_ybc').removeClass('search_ybc_hover');
            $('.search_teshu ul').hide();
        }
    });

    $('.search_sqtj').click(function () {
        var display = $(".newlist_sx").css("display");
        if (display == "none") {
            $.cookie('tagopen', '1', { expires: 30, path: '/' });
            $('.newlist_sx').slideDown(500);
            $(this).html('收起筛选条件');
            setTimeout(function () {
                $('.moresearch_main ul li').css('position', 'relative');
            }, 600);
        } else {
            $.cookie('tagopen', '0', { expires: 30, path: '/' });
            $('.moresearch_main ul li').css('position', 'static');
            $('.newlist_sx').slideUp(500);
            $(this).html('展开筛选条件');
        }
    });

    $('.moresearch_main ul li div a').click(function () {
        $(this).parent().prev().css('background', 'none');
    });
    /*地标导航*/
    $('#db_btn').click(function () {
        var db_navDisplay = $('.db_nav').css('display');
        if (db_navDisplay == 'none') {
            $(this).removeClass('newlist_metroswitchup').addClass('newlist_metroswitchdown');
            $('.db_nav').show();
        }
        else {
            $(this).removeClass('newlist_metroswitchdown').addClass('newlist_metroswitchup');
            $('.db_nav').hide();
        }
    });
    $el_box = $('.db_nav');
    $el_box.click(function (e) {
        e.stopPropagation();
    });
    $(document).click(function (event) {

        var target = event.target;


        if (target.className == 'db_nav' || target.id == 'db_btn') {
            return false;
        } else {
            target = $(target)[0];
        }

        $('#db_btn').removeClass('newlist_metroswitchdown').addClass('newlist_metroswitchup');
        $('.db_nav').css('display', 'none');
    });


    $(".placemark_trigger a").mouseover(function () {
        $(".placemark_trigger a").css("background-color", "");
        $(".placemark").hide();
        $("#placeMark" + this.title).show();
        $(this).css("background-color", "#DADADA");
    });
});
