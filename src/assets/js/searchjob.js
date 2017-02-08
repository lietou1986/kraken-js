(function () {
    function J() {
        var a = null;
        try {
            a = new XMLHttpRequest
        } catch (b) {
            for (var c = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], d = 0, h; h = c[d++];)
                try {
                    a = new ActiveXObject(h);
                    break
                } catch (e) {
                }
        }
        return a
    }
    function o(a) {
        return document.getElementById(a) || null
    }
    function x(a, b) {
        RegExp("(^|\\s+)" + b + "(\\s+|$)", "g").test(a.className) || (a.className += a.className == "" ? b : " " + b)
    }
    function w(a, b) {
        var c = RegExp("(^|\\s+)" + b + "(\\s+|$)", "g");
        if (RegExp("(^|\\s+)" + b + "(\\s+|$)", "g").test(a.className))
            a.className =
                a.className.replace(c, " ").trim()
    }
    function R(a) {
        var b = document.cookie;
        a += "=";
        var c = b.indexOf("; " + a);
        if (c == -1) {
            if (c = b.indexOf(a), c != 0)
                return null
        } else
            c += 2;
        var d = document.cookie.indexOf(";", c);
        if (d == -1)
            d = b.length;
        return b.substring(c + a.length, d).replace(/\+/g, " ").urlDecode()
    }
    function m(a, b) {
        if (a.style[b])
            return a.style[b];
        else if (a.currentStyle)
            return a.currentStyle[b];
        else if (document.defaultView && document.defaultView.getComputedStyle) {
            var b = b.replace(/([A-Z])/g, "-$1"), b = b.toLowerCase(), c = document.defaultView.getComputedStyle(a,
                "");
            return c && c.getPropertyValue(b)
        } else
            return null
    }
    function f(a) {
        for (var b = 1; b < arguments.length; b += 2) {
            var c = arguments[b], d = arguments[b + 1];
            c == "opacity" ? (c = a, p ? c.style.filter = (c.style.filter || "").replace(/alpha\([^)]*\)/, "") + "alpha(opacity=" + d * 100 + ")" : c.style.opacity = d) : c == "scrollTop" ? window.scrollTo(null, d) : a.style && c in a.style ? a.style[c] = d : c in a && (a[c] = d)
        }
        return a
    }
    function k(a, b, c) {
        a.addEventListener ? a.addEventListener(b, c, !1) : a.attachEvent && a.attachEvent("on" + b, c)
    }
    function K(a) {
        var b = typeof a;
        if (b == "object")
            if (a) {
                if (a instanceof Array || !(a instanceof Object) && Object.prototype.toString.call(a) == "[object Array]" || typeof a.length == "number" && typeof a.splice != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("splice"))
                    return "array";
                if (!(a instanceof Object) && (Object.prototype.toString.call(a) == "[object Function]" || typeof a.call != "undefined" && typeof a.propertyIsEnumerable != "undefined" && !a.propertyIsEnumerable("call")))
                    return "function"
            } else
                return "null";
        else if (b ==
            "function" && typeof a.call == "undefined")
            return "object";
        return b
    }
    function B(a) {
        return K(a) == "array"
    }
    function C(a) {
        return typeof a == "string"
    }
    function t(a) {
        return typeof a == "number"
    }
    function z(a) {
        return K(a) == "function"
    }
    function L(a) {
        if (p) {
            var b = d = 0, a = a.createTextRange(), c = document.selection.createRange();
            if (a.inRange(c))
                a.setEndPoint("EndToStart", c), d = a.text.length, a.setEndPoint("EndToEnd", c), b = a.text.length
        } else {
            var d = 0, b = 0;
            try {
                c = t(a.selectionStart)
            } catch (h) {
                c = !1
            }
            if (c)
                d = a.selectionStart, b = a.selectionEnd
        }
        return d &&
            b && d == b ? d : 0
    }
    function u(a) {
        for (var b = 0, c = 0; a;)
            b += a.offsetLeft, c += a.offsetTop, a = a.offsetParent;
        return { x: b, y: c }
    }
    function M() {
        return {
            x: function () {
                if (typeof window.pageXOffset == "number")
                    return window.pageXOffset;
                else if (document.documentElement && document.documentElement.scrollLeft)
                    return document.documentElement.scrollLeft;
                else if (document.body && document.body.scrollLeft)
                    return document.body.scrollLeft;
                return 0
            } (), y: function () {
                if (typeof window.pageYOffset == "number")
                    return window.pageYOffset;
                else if (document.documentElement &&
                    document.documentElement.scrollTop)
                    return document.documentElement.scrollTop;
                else if (document.body && document.body.scrollTop)
                    return document.body.scrollTop;
                return 0
            } ()
        }
    }
    function G() {
        return {
            w: function () {
                if (typeof window.innerWidth == "number")
                    return window.innerWidth;
                else if (document.documentElement && document.documentElement.clientWidth)
                    return document.documentElement.clientWidth;
                else if (document.body && document.body.clientWidth)
                    return document.body.clientWidth;
                return 0
            } (), h: function () {
                if (typeof window.innerHeight ==
                    "number")
                    return window.innerHeight;
                else if (document.documentElement && document.documentElement.clientHeight)
                    return document.documentElement.clientHeight;
                else if (document.body && document.body.clientHeight)
                    return document.body.clientHeight;
                return 0
            } ()
        }
    }
    function H() {
        return { w: Math.max(document.body.scrollWidth, document.documentElement.clientWidth || 0), h: Math.max(document.body.scrollHeight, document.documentElement.clientHeight || 0) }
    }
    function N() {
        var a = 0;
        if (!p) {
            var b = G(), c = H();
            b.h < c.h && (a = 21)
        }
        return a
    }
    function y(a,
        b) {
        function c() {
        }
        c.prototype = b.prototype;
        a.aa = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a
    }
    function q(a, b) {
        var c = arguments.callee.caller;
        if (c.aa)
            return c.aa.constructor.apply(a, Array.prototype.slice.call(arguments, 1));
        for (var d = Array.prototype.slice.call(arguments, 2), h = !1, e = a.constructor; e; e = e.aa && e.aa.constructor)
            if (e.prototype[b] === c)
                h = !0;
            else if (h)
                return e.prototype[b].apply(a, d);
        if (a[b] === c)
            return a.constructor.prototype[b].apply(a, d);
        else
            throw Error("base called from a method of one name to a method of a different name");
    }
    function O(a) {
        var b = this;
        b.html = a;
        b.direction = b.html.getAttribute("slidedir") || "left";
        b.width = b.html.getAttribute("slidewidth");
        b.height = b.html.getAttribute("slideheight");
        b.interval = b.html.getAttribute("slideinterval") || 1E3;
        b.speed = b.html.getAttribute("slidespeed") || 600;
        b.inner = b.html.getElementsByTagName("ul")[0];
        b.items = b.inner.getElementsByTagName("li");
        b.itemNum = b.items.length;
        b.initPosition();
        b.aniSlide = centralTimer.animation(b.speed, [[b.inner, b.dirClass, b.direction == "up" || b.direction == "down" ?
            b.startPointY : b.startPointX, b.direction == "up" || b.direction == "down" ? b.endPointY : b.endPointX, "linear", "px"]], function () {
                b.eachFrame()
            });
        b.intervalControl = centralTimer.delay(function () {
            b.aniSlide.restart()
        }, b.interval)
    }
    function P() {
        for (var a = 0, b; b = r[a++];)
            b.step();
        r.length || (window.clearInterval(A), A = 0)
    }
    var p = navigator.appName.indexOf("Microsoft") > -1, F = navigator.appVersion.indexOf("MSIE 6") > -1, I = navigator.appVersion.indexOf("MSIE 7") > -1;
    String.prototype.trim = function () {
        return this.replace(/^[\s\xa0\u3000]+|[\s\xa0\u3000]+$/g,
            "")
    };
    String.prototype.trimLeft = function () {
        return this.replace(/^[\s\xa0\u3000]+/, "")
    };
    String.prototype.trimRight = function () {
        return this.replace(/[\s\xa0\u3000]+$/, "")
    };
    String.prototype.urlEncode = function () {
        return window.encodeURIComponent ? encodeURIComponent(this) : escape(this)
    };
    String.prototype.urlDecode = function () {
        return window.decodeURIComponent ? decodeURIComponent(this) : unescape(this)
    };
    String.prototype.realLength = function () {
        return this.replace(/[^\x00-\xff]/g, "aa").length
    };
    zlzp.charW = 6.25;
    zlzp.checkAll =
        function (a, b) {
            for (var c = document.getElementsByName(a.name), d = document.getElementsByName(b), h = 0; h < c.length; h++)
                c[h].checked = a.checked;
            for (h = 0; h < d.length; h++)
                d[h].checked = a.checked
        };
    zlzp.uncheckAll = function (a) {
        for (var a = document.getElementsByName(a), b = 0; b < a.length; b++)
            a[b].checked &= 0
    };
    zlzp.setDefTxt = function (a, b) {
        a.value == "" || a.value == b ? (a.value = b, w(a, "inputAction"), x(a, "inputTips")) : (w(a, "inputTips"), x(a, "inputAction"))
    };
    zlzp.clearDefTxt = function (a, b) {
        if (a.value == b)
            a.value = "", w(a, "inputTips"), x(a,
                "inputAction")
    };
    zlzp.searchjob = zlzp.searchjob || {};
    zlzp.searchjob.directory = "http://s.zhaopin.com/jobs/";
    zlzp.searchjob.file_t = "jobsearch_jobtype.aspx";
    zlzp.searchjob.file_a = "jobsearch_adv.aspx";
    zlzp.searchjob.file_k = "jobsearch_keywords.aspx";
    zlzp.searchjob.file_g = "jobsearch_map.aspx";
    zlzp.searchjob.queryStrSepa = ";";
    zlzp.searchjob.f_s = document.frmSearch;
    zlzp.searchjob.f_m = document.frmMain;
    zlzp.searchjob.t = { h_n: "SchJobType", q_n: "bj" };
    zlzp.searchjob.st = { h_n: "subJobtype", q_n: "sj" };
    zlzp.searchjob.i =
        { h_n: "industry", q_n: "in" };
    zlzp.searchjob.d = { h_n: "PublishDate", q_n: "pd" };
    zlzp.searchjob.l = { h_n: "JobLocation", q_n: "jl" };
    zlzp.searchjob.k = { h_n: "KeyWord", q_n: "kw" };
    zlzp.searchjob.s = { h_n: "sortby", q_n: "sb", null_v: "0" };
    zlzp.searchjob.m = { h_n: "SearchModel", q_n: "sm" };
    zlzp.searchjob.p = { h_n: "page", q_n: "p" };
    zlzp.searchjob.s_f = { h_n: "SchSalaryFromAdv", q_n: "sf" };
    zlzp.searchjob.s_t = { h_n: "SchSalaryToAdv", q_n: "st" };
    zlzp.searchjob.kt = { h_n: "keywordtype", q_n: "kt", null_v: "1" };
    zlzp.searchjob.w = { h_n: "WorkingExp", q_n: "we" };
    zlzp.searchjob.e = { h_n: "EduLevel", q_n: "el" };
    zlzp.searchjob.ct = { h_n: "CompanyType", q_n: "ct" };
    zlzp.searchjob.cs = { h_n: "CompanySize", q_n: "cs" };
    zlzp.searchjob.et = { h_n: "EmplType", q_n: "et", null_v: "checkall" };
    zlzp.searchjob.ga = { h_n: "geo_addr", q_n: "ga" };
    zlzp.searchjob.gc = { h_n: "geo_cat", q_n: "gc" };
    zlzp.searchjob.gr = { h_n: "geo_r", q_n: "gr" };
    zlzp.searchjob.re = { h_n: "re", q_n: "re" };
    zlzp.searchjob.isadv = { h_n: "isadv", q_n: "isadv" };
    zlzp.searchjob.all_ele = "t,st,i,d,l,k,s,m,p,s_f,s_t,kt,w,e,ct,cs,et,ga,gc,gr,re,isadv".split(",");
    zlzp.searchjob.v = { h_n: "vacancyid", q_n: "vacancyid" };
    zlzp.searchjob.k_tips = "@\u8bf7\u8f93\u5165\u5173\u952e\u8bcd,\u4f8b\u5982:JAVA,\u9500\u552e\u4ee3\u8868,\u884c\u653f\u52a9\u7406\u7b49@\u8bf7\u8f93\u5165\u516c\u53f8\u540d\u79f0\u6216\u5173\u952e\u8bcd,\u4f8b\u5982:\u8054\u60f3,\u534e\u4e3a\u7b49@\u8bf7\u8f93\u5165\u804c\u4f4d\u540d\u79f0\u6216\u5173\u952e\u8bcd,\u4f8b\u5982:\u4f1a\u8ba1\u7ecf\u7406,\u5f00\u53d1\u5de5\u7a0b\u5e08\u7b49@";
    zlzp.searchjob.c_tips = "\u8f93\u5165/\u9009\u62e9\u57ce\u5e02";
    zlzp.searchjob.ga_tips = "\u9009\u62e9\u5730\u56fe\u4f4d\u7f6e";
    zlzp.searchjob.moreCondTrigID = "showmoreText";
    zlzp.searchjob.moreCondConID = "linesed";
    zlzp.searchjob.checkKeyword = function (a, b) {
        a = a.trim();
        if (b && a == "")
            return alert("\u5173\u952e\u8bcd\u8f93\u5165\u4e0d\u80fd\u4e3a\u7a7a, \u8bf7\u91cd\u65b0\u8f93\u5165\uff01"), !1;
        return a != "" && (a = a.replace(RegExp("`|~|!|@|#|\\$|%|\\^|&|\\*|\\(|\\)|-|_|=|\\+|\\[|\\{|\\]|\\}|;|:|'|\"|\\\\|\\||,|<|\\.|>|/|\\?|\u3002|\uff0c|\u300a|\u300b|\u3001|\uff1f|\uff1b|\u2018|\u2019|\uff1a|\u201c|\u201d|\u3010|\u3011|\u300e|\u300f|\u2014|\uff09|\uff08|\u00d7|\u2026|\uffe5|\uff01|\uff5e|\u00b7",
            "gi"), ""), a = a.trim(), a == "") ? (alert("\u5173\u952e\u8bcd\u8f93\u5165\u4e0d\u80fd\u5168\u90e8\u4e3a\u7279\u6b8a\u5b57\u7b26\uff0c\u8bf7\u91cd\u65b0\u8f93\u5165\uff01"), !1) : !0
    };
    zlzp.searchjob.submitSearch = function (a, b, c, d) {
        a = a || zlzp.searchjob.f_s;
        zlzp.searchjob.clearTips(a);
        c = typeof c != "undefined" && c !== null ? c : zlzp.searchjob.genSearchQueryStr(a);
        b = (b && typeof b == "string" ? zlzp.searchjob.directory + b : window.location.pathname) + (c != "" ? "?" + c : "");
        window.AdsClick && z(AdsClick) && AdsClick(121115223, "jobsearch_shanghai");
        typeof d != "undefined" && d == "new" ? window.open(b) : window.location = b;
        return !1
    };
    zlzp.searchjob.getFormEleValue = function (a, b) {
        var c = (b || zlzp.searchjob.f_s)[a.h_n], d = "";
        if (c)
            if (/checkbox|radio/i.test(c.type || c[0] && c[0].type)) {
                var h = 0;
                if (c.length) {
                    for (var e = 0; e < c.length; e++)
                        c[e].checked && (d += (d == "" ? "" : zlzp.searchjob.queryStrSepa) + c[e].value, h++);
                    typeof a.null_v != "undefined" && a.null_v == "checkall" && h == c.length && (d = "")
                } else if (c.checked)
                    d = c.value, typeof a.null_v != "undefined" && a.null_v == "checkall" && (d = "")
            } else
                d =
                    c.value, d = typeof a.null_v != "undefined" && d == a.null_v ? "" : d;
        return d != "" ? "&" + a.q_n + "=" + d.urlEncode() : ""
    };
    zlzp.searchjob.genSearchQueryStr = function (a) {
        function b(a) {
            var b;
            return (b = zlzp.searchjob[a]) && c[b.h_n] ? d(b, c) : ""
        }
        for (var c = a || zlzp.searchjob.f_s, d = zlzp.searchjob.getFormEleValue, a = "", h = 0; h < zlzp.searchjob.all_ele.length; h++)
            a += b(zlzp.searchjob.all_ele[h]);
        return a.charAt(0) == "&" ? a.substring(1) : a
    };
    zlzp.searchjob.updateQueryVal = function (a, b, c) {
        if (a != "") {
            var a = "&" + a, d = "&" + b + "=";
            a.indexOf(d) > -1 ? (a = a.split(d),
                b = a[1].indexOf("&") > -1 ? a[1].substring(a[1].indexOf("&")) : "", a = a[0] + (c != "" ? d + c : "") + b) : a += c != "" ? "&" + b + "=" + c : "";
            a = a.substring(1)
        } else
            c != "" && (a = b + "=" + c);
        return a
    };
    zlzp.searchjob.setTips = function (a) {
        var a = a || zlzp.searchjob.f_s, b, c, d;
        (b = a[zlzp.searchjob.k.h_n]) && b.onfocus && zlzp.setDefTxt(b, zlzp.searchjob.k_tips);
        (c = a[zlzp.searchjob.l.h_n]) && c.onfocus && zlzp.setDefTxt(c, zlzp.searchjob.c_tips);
        (d = a[zlzp.searchjob.ga.h_n]) && d.onfocus && zlzp.setDefTxt(d, zlzp.searchjob.ga_tips)
    };
    zlzp.searchjob.clearTips = function (a) {
        var a =
            a || zlzp.searchjob.f_s, b, c, d;
        (b = a[zlzp.searchjob.k.h_n]) && b.onfocus && zlzp.clearDefTxt(b, zlzp.searchjob.k_tips);
        (c = a[zlzp.searchjob.l.h_n]) && c.onfocus && zlzp.clearDefTxt(c, zlzp.searchjob.c_tips);
        (d = a[zlzp.searchjob.ga.h_n]) && d.onfocus && zlzp.clearDefTxt(d, zlzp.searchjob.ga_tips)
    };
    zlzp.searchjob.clearGeo = function (a) {
        var a = a || zlzp.searchjob.f_s, b, c, d;
        (b = a[zlzp.searchjob.ga.h_n]) && (b.value = "");
        (c = a[zlzp.searchjob.gc.h_n]) && (c.value = "");
        (d = a[zlzp.searchjob.gr.h_n]) && (d.value = "")
    };
    zlzp.searchjob.clearGa = function (a) {
        var b =
            a || zlzp.searchjob.f_s, a = b[zlzp.searchjob.ga.h_n], b = b[zlzp.searchjob.gc.h_n];
        if (a)
            a.value = "\u9009\u62e9\u5730\u56fe\u4f4d\u7f6e";
        if (b)
            b.value = ""
    };
    zlzp.searchjob.gotoSearch_t = function (a, b) {
        var c = a || zlzp.searchjob.f_s;
        zlzp.searchjob.clearTips(c);
        var d = c[zlzp.searchjob.k.h_n].value.trim();
        if (!zlzp.searchjob.checkKeyword(d))
            return zlzp.searchjob.setTips(c), !1;
        zlzp.searchjob.clearGeo(c);
        c[zlzp.searchjob.p.h_n].value = "1";
        return zlzp.searchjob.submitSearch(c, zlzp.searchjob.file_t, null, b)
    };
    zlzp.searchjob.gotoSearch_g =
        function (a) {
            a = a || zlzp.searchjob.f_s;
            zlzp.searchjob.clearTips(a);
            var b = a[zlzp.searchjob.l.h_n].value.trim();
            if (b === "" || b === "-1" || b === "\u9009\u62e9\u5de5\u4f5c\u57ce\u5e02")
                return zlzp.searchjob.setTips(a), alert("\u8bf7\u9009\u62e9\u5de5\u4f5c\u57ce\u5e02\uff01"), !1;
            b = a[zlzp.searchjob.ga.h_n].value.trim();
            if (b === "" || b === "\u9009\u62e9\u5730\u56fe\u4f4d\u7f6e")
                return zlzp.searchjob.setTips(a), alert("\u8bf7\u9009\u62e9\u5730\u56fe\u4f4d\u7f6e\uff01"), !1;
            b = a[zlzp.searchjob.k.h_n].value.trim();
            if (!zlzp.searchjob.checkKeyword(b))
                return zlzp.searchjob.setTips(a),
                    !1;
            if (zlzp.searchjob.k_tips.indexOf("@" + b + "@") > -1)
                a[zlzp.searchjob.k.h_n].value = "";
            a[zlzp.searchjob.p.h_n].value = "1";
            return zlzp.searchjob.submitSearch(a, zlzp.searchjob.file_g)
        };
    if (typeof window.sjModIns == "undefined" || !window.sjModIns)
        window.sjModIns = [];
    O.prototype.initPosition = function () {
        f(this.html, "position", "relative");
        if (this.direction == "up" || this.direction == "down")
            this.dirClass = "top", f(this.inner, "width", this.width + "px"), f(this.inner, "height", this.height * this.itemNum + "px");
        else {
            this.dirClass =
                "left";
            f(this.inner, "width", this.width * this.itemNum + "px");
            f(this.inner, "height", this.height + "px");
            for (var a = 0; a < this.itemNum; a++)
                f(this.items[a], "width", this.width + "px"), f(this.items[a], "styleFloat", "left"), f(this.items[a], "cssFloat", "left")
        }
        f(this.html, "overflow", "hidden");
        f(this.inner, "position", "absolute");
        this.startPointY = this.startPointX = 0;
        if (this.direction == "down")
            this.startPointY = -1 * this.height;
        if (this.direction == "right")
            this.startPointX = -1 * this.width;
        this.endPointX = this.direction == "left" ?
            -1 * this.width : 0;
        this.endPointY = this.direction == "up" ? -1 * this.height : 0;
        (this.direction == "down" || this.direction == "right") && this.inner.insertBefore(this.inner.lastChild, this.inner.firstChild);
        f(this.inner, "left", this.startPointX + "px");
        f(this.inner, "top", this.startPointY + "px")
    };
    O.prototype.eachFrame = function () {
        var a = this;
        a.direction == "down" || a.direction == "right" ? a.inner.insertBefore(a.inner.lastChild, a.inner.firstChild) : a.inner.appendChild(a.inner.firstChild);
        f(a.inner, "left", a.startPointX + "px");
        f(a.inner,
            "top", a.startPointY + "px");
        a.intervalControl ? a.intervalControl.fire() : a.intervalControl = centralTimer.delay(function () {
            a.aniSlide.restart()
        }, a.interval)
    };
    window.AutoComplete = AutoComplete = function (a) {
        var b = this;
        b.input = a;
        b.id = b.input.id;
        b.input.deactiIE = 0;
        b.form = b.input.form || null;
        b.asp = b.input.getAttribute("xhrasp") || "";
        b.suggHTML = b.input.getAttribute("xhrstyle") || "";
        b.clickItemSubmit = b.input.getAttribute("submitform") || "0";
        b.isKeyword = b.input.getAttribute("iskeyword") || "0";
        b.suggWidth = b.input.getAttribute("sugwidth") ||
            b.input.offsetWidth;
        b.period = 0;
        b.xhrerr = 0;
        b.xhrcall = null;
        b.jsonpjs = null;
        b.closeDefer = null;
        b.rows = null;
        b.actRowIndex = -1;
        b.actRow = null;
        b.flagActOnRow = !1;
        b.arrowKeyIte = 0;
        b.showFocusItem = 0;
        b.q_input = b.q_keyboard = b.q_xhr = b.input.value;
        if (!b.input.init)
            b.form && k(b.form, "submit", function () {
                b.fnSubmitForm()
            }), b.input.setAttribute("autocomplete", "off"), k(b.input, "blur", function () {
                b.closeSuggest()
            }), p && k(b.input, "beforedeactivate", function () {
                var a = window.event.srcElement;
                if (a.deactiIE)
                    window.event.cancelBubble =
                        !0, window.event.returnValue = !1;
                a.deactiIE = 0
            }), p ? k(b.input, "keydown", function (a) {
                b.fnKeydown(a)
            }) : b.input.onkeypress = function (a) {
                b.fnKeydown(a)
            }, k(b.input, "keyup", function (a) {
                b.fnKeyup(a)
            }), b.h_keyboard = b.createHidden("oq", b.q_keyboard), b.h_rowindex = b.createHidden("aq", "f"), b.suggestTab = document.createElement("table"), b.suggestTab.cellPadding = b.suggestTab.cellSpacing = 0, b.suggestTab.className = "autocomptab", (o("zljsc") || b.form || b.input.parentNode).appendChild(b.suggestTab), b.input.init = !0;
        b.closeSuggest();
        b.setSuggestTabStyle();
        if (!AutoComplete.flagCSS)
            AutoComplete.addCssToBody(), AutoComplete.flagCSS = !0;
        b.cursorIndex = L(b.input);
        p || k(window, "pageshow", function (a) {
            if (a.persisted)
                b.h_keyboard.value = b.input.value, b.h_rowindex.value = "f"
        });
        if (!AutoComplete.start)
            AutoComplete.PeriodicRefresh(), AutoComplete.start = !0
    };
    AutoComplete.prototype = {
        submitXHR: function (a, b, c) {
            var d = this;
            d.xhrcall && d.xhrcall.readyState != 0 && d.xhrcall.readyState != 4 && d.xhrcall.abort();
            if (d.xhrcall)
                d.xhrcall.onreadystatechange = function () {
                };
            if (d.xhrcall = J())
                d.xhrcall.open("GET", a + "?" + b + "=" + c.urlEncode() + (d.isKeyword == "1" ? d.getKeyType() : ""), !0), d.xhrcall.onreadystatechange = function () {
                    if (d.xhrcall.readyState == 4)
                        switch (d.xhrcall.status) {
                            case 403:
                                d.xhrerr = 1E3;
                                break;
                            case 302:
                            case 500:
                            case 502:
                            case 503:
                                d.xhrerr++;
                                break;
                            case 200:
                                d.handleResponse(d.xhrcall.responseText);
                            default:
                                d.xhrerr = 0
                        }
                }, d.xhrcall.send(null)
        }, handleResponse: function (a) {
            if (a != "") {
                var a = eval("(" + a + ")"), b = a[0];
                this.period > 0 && this.period--;
                if (this.suggestTab && b.toLowerCase() ==
                    this.q_keyboard.toLowerCase()) {
                    if (this.closeDefer)
                        window.clearTimeout(this.closeDefer), this.closeDefer = null;
                    this.q_xhr = a[0];
                    this.clearSuggest();
                    for (var a = a[1], b = 0, c, d, h; b < a.length; b++)
                        if (c = a[b])
                            if (d = AutoComplete["html_" + this.suggHTML])
                                h = this.suggestTab.insertRow(-1), this.addFn2SuggItem(h), h.t = b, d.genHTML(h, c), h.j = d.getQStr ? d.getQStr(c) : c[0];
                    (this.rows = this.suggestTab.rows) && this.rows.length > 0 ? (this.addOtherHTML2SuggTab(), this.openSuggest()) : this.closeSuggest();
                    this.actRowIndex = -1
                }
            }
        }, submitJSONP: function (a,
            b, c) {
            if (!AutoComplete.head)
                AutoComplete.head = document.getElementsByTagName("head")[0];
            this.jsonpjs && AutoComplete.head.removeChild(this.jsonpjs);
            this.jsonpjs = document.createElement("script");
            this.jsonpjs.src = a + "?" + b + "=" + c.urlEncode() + (this.isKeyword == "1" ? this.getKeyType() : "") + "&sjmodid=" + this.id + "&callback=zlzp.handleAutoComplete";
            AutoComplete.head.appendChild(this.jsonpjs)
        }, addOtherHTML2SuggTab: function () {
        }, addFn2SuggItem: function (a) {
            var b = this;
            a.onclick = function () {
                b.fnClickItem(this)
            };
            a.onmousedown =
                function (a) {
                    return b.fnMousedownItem(a)
                };
            a.onmouseover = function () {
                b.fnMouseoverItem(this)
            };
            a.onmousemove = function () {
                if (b.showFocusItem)
                    b.showFocusItem = 0, b.fnMouseoverItem(this)
            }
        }, fnClickItem: function (a) {
            this.setInputVal(a.j);
            this.clickItemSubmit == "1" ? this.triggerSubmit() : this.closeSuggest()
        }, fnMousedownItem: function (a) {
            p ? this.input.deactiIE = 1 : a.stopPropagation();
            return !1
        }, fnMouseoverItem: function (a) {
            this.flagActOnRow = !1;
            if (!this.showFocusItem) {
                if (this.actRow)
                    this.actRow.className = "";
                this.actRow = a;
                for (var a = 0, b; b = this.getRow(a); a++)
                    b == this.actRow && (this.actRowIndex = a);
                this.actRow.className = "focusrow"
            }
        }, clearSuggest: function () {
            if (this.suggestTab)
                if (p)
                    for (; this.suggestTab.rows.length;)
                        this.suggestTab.deleteRow(-1);
                else
                    this.suggestTab.innerHTML = ""
        }, fnSubmitForm: function () {
            this.closeSuggest();
            if (this.rows && this.getRow(this.actRowIndex) && this.h_keyboard.value != this.input.value)
                this.h_rowindex.value = this.getRow(this.actRowIndex).t;
            else if (this.h_keyboard.value = "", this.h_rowindex.value = "f", this.period >=
                10 || this.xhrerr >= 3)
                this.h_rowindex.value = "o"
        }, fnKeydown: function (a) {
            AutoComplete.activeInput = this;
            var b = a.keyCode;
            if (b == 27 && this.getDivState())
                return this.closeSuggest(), this.setInputVal(this.q_keyboard), a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0, a.returnValue = !1;
            if (b == 13)
                return this.pressEnter(a), a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0, a.returnValue = !1;
            if (b == 38 || b == 40)
                return this.arrowKeyIte++ ,
                    this.arrowKeyIte % 3 == 1 && this.operKeyInput(b), !1
        }, fnKeyup: function (a) {
            a = a.keyCode;
            this.arrowKeyIte || this.operKeyInput(a);
            this.arrowKeyIte = 0
        }, operKeyInput: function (a) {
            var b = this;
            if (b.input.value.toLowerCase() != b.q_input.toLowerCase())
                b.q_keyboard = b.input.value, b.cursorIndex = L(b.input), b.h_keyboard.value = b.q_keyboard;
            if (a == 38 || a == 40)
                b.pressArrow(a == 40), b.flagActOnRow = b.getDivState();
            b.setSuggestTabStyle();
            if (b.q_xhr.toLowerCase() != b.q_keyboard.toLowerCase() && !b.closeDefer)
                b.closeDefer = window.setTimeout(function () {
                    b.closeSuggest()
                },
                    500);
            b.q_input = b.input.value
        }, pressArrow: function (a) {
            if (this.q_keyboard.toLowerCase() == this.q_xhr.toLowerCase() && this.rows && this.rows.length)
                if (this.getDivState()) {
                    if (this.actRow)
                        this.actRow.className = "";
                    for (var b = this.rows.length, c = (this.actRowIndex + 1 + (a ? 1 : b)) % (b + 1) - 1; c != -1 && this.getRow(c).nonSuggItem;)
                        c = (c + 1 + (a ? 1 : b)) % (b + 1) - 1;
                    this.actRowIndex = c;
                    this.actRowIndex == -1 ? this.resetInputVal() : (this.actRow = this.getRow(c), this.actRow.className = "focusrow", this.setInputVal(this.actRow.j), this.h_rowindex.value =
                        this.actRow.t)
                } else
                    this.openSuggest()
        }, pressEnter: function () {
            if (this.actRow && this.actRowIndex != -1 && this.flagActOnRow)
                this.actRow.onclick();
            else
                this.input.value == "" && this.closeSuggest(), this.clickItemSubmit == "1" && this.triggerSubmit()
        }, triggerSubmit: function () {
            this.fnSubmitForm();
            this.form && (this.form.onsubmit && this.form.onsubmit() == !1 || this.form.submit())
        }, openSuggest: function () {
            f(this.suggestTab, "visibility", "visible");
            this.setSuggestTabStyle();
            this.showFocusItem = 1
        }, closeSuggest: function () {
            if (this.closeDefer)
                window.clearTimeout(this.closeDefer),
                    this.closeDefer = null;
            f(this.suggestTab, "visibility", "hidden")
        }, getRow: function (a) {
            return p ? this.rows[a] : this.rows.item(a)
        }, getDivState: function () {
            return !!this.suggestTab && this.suggestTab.style.visibility == "visible"
        }, setInputVal: function (a) {
            this.input.value = this.q_input = a
        }, resetInputVal: function () {
            this.input.focus();
            this.setInputVal(this.q_keyboard);
            this.actRow = null;
            this.h_rowindex.value = "f"
        }, setSuggestTabStyle: function () {
            if (this.suggestTab) {
                var a = u(this.input);
                f(this.suggestTab, "left", a.x + "px");
                f(this.suggestTab,
                    "top", a.y + this.input.offsetHeight + 1 + "px");
                f(this.suggestTab, "width", this.suggWidth + "px")
            }
        }, createHidden: function (a, b) {
            var c = document.createElement("input");
            c.type = "hidden";
            c.name = this.input.name + "_" + a;
            c.value = b;
            return (this.form || this.input.parentNode).appendChild(c)
        }, getKeyType: function () {
            return "&t=" + (this.form && this.form[zlzp.searchjob.kt.h_n] && this.form[zlzp.searchjob.kt.h_n].value ? this.form[zlzp.searchjob.kt.h_n].value : "1")
        }
    };
    AutoComplete.activeInput = null;
    AutoComplete.timer = null;
    AutoComplete.PeriodicRefresh =
        function () {
            var a = AutoComplete;
            if (a.activeInput) {
                var b = a.activeInput;
                if (!(b.xhrerr >= 3)) {
                    b.q_keyboard && b.q_keyboard.toLowerCase() != b.q_xhr.toLowerCase() && (b.period++ , b.submitJSONP(b.asp, "k", b.q_keyboard), b.input.focus());
                    b.q_xhr = b.q_keyboard;
                    for (var c = 100, d = 1; d <= (b.period - 2) / 2; d++)
                        c *= 2;
                    c += 50;
                    a.timer = window.setTimeout(a.PeriodicRefresh, c)
                }
            } else
                a.timer = window.setTimeout(a.PeriodicRefresh, 150)
        };
    AutoComplete.html_d = {
        genHTML: function (a, b) {
            var c = document.createElement("td");
            c.innerHTML = b;
            b.j = p ? c.innerText :
                c.textContent;
            a.appendChild(c)
        }, getQStr: function (a) {
            return a.j
        }
    };
    AutoComplete.html_c = {
        genHTML: function (a, b) {
            var c = document.createElement("td");
            c.innerHTML = b[0] + (b[1] != "" ? " (" + b[1] + ")" : "");
            c.noWrap = "true";
            a.appendChild(c);
            c = document.createElement("td");
            c.noWrap = "true";
            f(c, "textAlign", "right");
            f(c, "fontFamily", "Verdana");
            c.innerHTML = b[2];
            a.appendChild(c)
        }
    };
    AutoComplete.html_k = {
        genHTML: function (a, b) {
            var c = document.createElement("td");
            c.innerHTML = b[0];
            c.noWrap = "true";
            a.appendChild(c);
            c = document.createElement("td");
            c.noWrap = "true";
            f(c, "textAlign", "right");
            f(c, "fontFamily", "Verdana");
            f(c, "color", "#090");
            c.innerHTML = "\u7ea6" + b[1] + "\u4e2a\u804c\u4f4d";
            a.appendChild(c)
        }
    };
    AutoComplete.flagCSS = !1;
    AutoComplete.addCssToBody = function () {
        function a(a, c) {
            b.push(a, "{", c, "}")
        }
        var b = [];
        a(".autocomptab", "background:white;border:1px solid #000;cursor:default;font-size:12px;line-height:117%;margin:0;position:absolute;z-index:999;");
        a(".autocomptab td", "line-height:22px;nowrap:nowrap;padding:0 3px");
        a(".autocomptab .focusrow td",
            "background:#36c;color:#fff !important;");
        a(".autocomptab .focusrow", "background:#36c;color:#fff !important;");
        var c = document.createElement("style");
        c.setAttribute("type", "text/css");
        document.getElementsByTagName("head")[0].appendChild(c);
        b = b.join("");
        p ? c.styleSheet.cssText = b : c.appendChild(document.createTextNode(b))
    };
    k(window, "resize", function () {
        AutoComplete.activeInput && AutoComplete.activeInput.setSuggestTabStyle()
    });
    zlzp.handleAutoComplete = function (a) {
        if (a && a.length && sjModIns[a[a.length - 1]]) {
            var b =
                sjModIns[a[a.length - 1]], c = a[0];
            b.period > 0 && b.period--;
            if (b.suggestTab && c.toLowerCase() == b.q_keyboard.toLowerCase()) {
                if (b.closeDefer)
                    window.clearTimeout(b.closeDefer), b.closeDefer = null;
                b.q_xhr = a[0];
                b.clearSuggest();
                for (var a = a[1], c = 0, d, h, e; c < a.length; c++)
                    if (d = a[c])
                        if (h = AutoComplete["html_" + b.suggHTML])
                            e = b.suggestTab.insertRow(-1), b.addFn2SuggItem(e), e.t = c, h.genHTML(e, d), e.j = h.getQStr ? h.getQStr(d) : d[0];
                (b.rows = b.suggestTab.rows) && b.rows.length > 0 ? (b.addOtherHTML2SuggTab(), b.openSuggest()) : b.closeSuggest();
                b.actRowIndex = -1
            }
        }
    };
    window.ajax = ajax = function (a) {
        function b(a) {
            try {
                return !a.status && location.protocol == "file:" || a.status >= 200 && a.status < 300 || a.status == 304 || navigator.userAgent.indexOf("Safari") >= 0 && typeof a.status == "undefined"
            } catch (b) {
            }
            return !1
        }
        function c(a, b) {
            var c = a.getResponseHeader("content-type"), c = !b && c && c.indexOf("xml") >= 0, c = b == "xml" || c ? a.responseXML : a.responseText;
            b == "script" && eval.call(window, c);
            return c
        }
        var a = {
            type: a.type && a.type.toUpperCase() || "POST", url: a.url || "", timeout: a.timeout || 5E3,
            cache: "cache" in a ? a.cache : !0, onComplete: a.onComplete || function () {
            }, onError: a.onError || function () {
            }, onSuccess: a.onSuccess || function () {
            }, onAbort: a.onAbort || a.onComplete || function () {
            }, dataResType: a.dataResType || "", dataReqType: a.dataReqType || "form", data: a.data || ""
        }, d = { form: "application/x-www-form-urlencoded", xml: "application/xml", script: "application/json" }, h = a.url + (a.data != "" ? "?" + a.data : "");
        if (a.cache === !1 && a.type == "GET")
            var e = +new Date, f = h.replace(/(\?|&)_=.*?(&|$)/, "$1_=" + e + "$2"), h = f + (f == h ? (h.match(/\?/) ?
                "&" : "?") + "_=" + e : "");
        var j = J();
        j.open(a.type, a.type == "GET" ? h : a.url, !0);
        a.type == "POST" && j.setRequestHeader("content-type", d[a.dataReqType]);
        var g = !1;
        setTimeout(function () {
            g = !0
        }, a.timeout);
        j.onreadystatechange = function () {
            if (j.readyState == 4 && !g) {
                if (b(j))
                    a.onSuccess(c(j, a.dataResType));
                else
                    a.onError();
                a.onComplete();
                j = null
            } else if (g) {
                j.abort();
                if (j)
                    j.onreadystatechange = function () {
                    };
                a.onAbort()
            }
        };
        j.send(a.type == "POST" ? a.data : null)
    };
    ajax.serialize = function (a) {
        var b = [];
        if (a.constructor == Array)
            for (var c =
                0; c < a.length; c++)
                b.push(a[c].name + "=" + a[c].value.urlEncode());
        else
            for (c in a)
                b.push(c + "=" + a[c].urlEncode());
        return b.join("&")
    };
    window.jsonp = jsonp = function (a) {
        function b(a) {
            var b = a.parentNode;
            if (b && b.nodeType == 1)
                a.onreadystatechange = a.onload = null, b.removeChild(a)
        }
        a = {
            url: a.url || "", data: a.data || "", onSuccess: a.onSuccess || function () {
            }, onError: a.onError || function () {
            }, beforeCall: a.beforeCall || function () {
            }, noCallback: a.noCallback || !1, cache: a.cache || !1, callback: a.callback || "jsonp" + Math.floor(Math.random() *
                2147483648).toString(36), callbackParName: a.callbackParName || "callback"
        };
        if (a.url != "") {
            if (!a.noCallback) {
                var c = a.callbackParName + "=" + a.callback;
                a.data += a.data == "" ? c : "&" + c
            }
            a.cache || (c = "_=" + +new Date, a.data += a.data == "" ? c : "&" + c);
            a.url += a.data == "" ? "" : "?" + a.data;
            var c = window.document.getElementsByTagName("head")[0], d = !1, h = !1;
            !a.noCallback && !window[a.callback] && !z(window[a.callback]) && (h = !0, window[a.callback] = function () {
                d = !0;
                a.onSuccess.apply(this, arguments)
            });
            var e = /loaded|complete|undefined/i, f = document.createElement("script");
            f.charset = "utf-8";
            f.type = "text/javascript";
            f.defer = !0;
            f.async = !0;
            f.onerror = function () {
                a.onError(this);
                b(this)
            };
            f.onreadystatechange = f.onload = function () {
                var c = this;
                e.test(c.readyState) && (centralTimer.delay(function () {
                    h && !d && a.onError(c)
                }, 100), b(c))
            };
            f.src = a.url;
            a.beforeCall && z(a.beforeCall) && a.beforeCall(f);
            c.insertBefore(f, c.firstChild)
        }
    };
    var A = 0, v = [], r = [], Q = {
        linear: function (a) {
            return a
        }, easeOut: function (a) {
            return 1 - Math.pow(1 - a, 3)
        }, easeOutCos: function (a) {
            return -(Math.cos(Math.PI * a) - 1) / 2
        }, easeInAndOut: function (a) {
            return (3 -
                2 * a) * a * a
        }
    };
    window.centralTimer = centralTimer = {
        frequence: 15, animation: function (a, b, c, d) {
            for (var h = 0, e; e = b[h++];)
                e[4] = Q[e[4]] || Q.linear, f(e[0], e[1], e[2] + e[5]);
            v.push({
                duration: a, htmls: b, endFn: c, startFn: d, origPoint: 0, index: null, aniFlag: !0, aniDir: "f", setStartHTML: function (a, b) {
                    this.htmls[a] && (this.htmls[a][2] = b)
                }, setEndHTML: function (a, b) {
                    this.htmls[a] && (this.htmls[a][3] = b)
                }, reset: function () {
                    this.origPoint = 0;
                    this.aniDir = "f";
                    for (var a = 0, b; b = this.htmls[a++];)
                        f(b[0], b[1], b[2] + b[5])
                }, restart: function () {
                    this.aniFlag &&
                        (this.reset(), this.startFn && this.startFn(), this.onStart())
                }, resume: function () {
                    if (this.aniFlag)
                        this.onStart()
                }, forward: function () {
                    if (this.aniFlag)
                        this.aniDir = "f", this.resume()
                }, back: function () {
                    if (this.aniFlag)
                        this.aniDir = "b", this.resume()
                }, pause: function () {
                    if (this.index !== null) {
                        if (this.aniDir == "f")
                            this.origPoint = (new Date).getTime() - this.origPoint;
                        else if (this.aniDir == "b")
                            this.origPoint = this.backPoint * 2 - (new Date).getTime() - this.origPoint;
                        this.onStop()
                    }
                }, cancel: function () {
                    this.index != null && this.pause();
                    v.splice(this.regIndex, 1)
                }, onStart: function () {
                    this.aniFlag = !1;
                    this.origPoint = (new Date).getTime() - this.origPoint;
                    if (this.aniDir == "b")
                        this.backPoint = (new Date).getTime();
                    this.index = r.length;
                    r.push(this);
                    A = A || setInterval(P, centralTimer.frequence)
                }, onStop: function () {
                    this.aniFlag = !0;
                    r.splice(this.index, 1);
                    for (var a = this.index, b; b = r[a++];)
                        b.index--;
                    this.index = null
                }, step: function () {
                    var a = this.aniDir == "f" ? (new Date).getTime() - this.origPoint : this.backPoint * 2 - (new Date).getTime() - this.origPoint;
                    if (this.aniDir ==
                        "f" && a >= this.duration || this.aniDir == "b" && a <= 0) {
                        for (var b = 0, c; c = this.htmls[b++];)
                            f(c[0], c[1], (this.aniDir == "f" ? c[3] : c[2]) + c[5]);
                        this.origPoint = a < 0 ? 0 : a > this.duration ? this.duration : a;
                        this.onStop();
                        this.aniDir == "f" && this.endFn && this.endFn();
                        return 0
                    } else {
                        for (b = 0; c = this.htmls[b++];) {
                            var d = c[2] + (c[3] - c[2]) * c[4](a / this.duration);
                            c[5] == "px" && (d = Math.round(d));
                            f(c[0], c[1], d + c[5])
                        }
                        return 1
                    }
                }
            });
            return v[v.length - 1]
        }, delay: function (a, b) {
            var c = Math.round(b / centralTimer.frequence);
            v.push({
                index: null, fn: a, steps: c,
                count: 1, fireFlag: !0, fire: function () {
                    if (this.fireFlag)
                        this.fireFlag = !1, this.index = r.length, r.push(this), A = A || setInterval(P, centralTimer.frequence)
                }, cancel: function () {
                    if (this.index !== null)
                        this.onStop()
                }, onStop: function () {
                    r.splice(this.index, 1);
                    for (var a = this.index, b; b = r[a++];)
                        b.index--;
                    this.index = null;
                    this.fireFlag = !0;
                    this.count = 1
                }, step: function () {
                    return this.count >= this.steps ? (this.onStop(), this.fn(), 0) : (this.count++ , 1)
                }
            });
            v[v.length - 1].fire();
            return v[v.length - 1]
        }, periodical: function () {
        }
    };
    var e = zlzp.PopupDiv =
        function (a, b, c, d) {
            this.trigger = a != "" && o(a);
            this.id = a;
            this.hidden = b;
            this.data = c;
            e.allIns[this.id] = this;
            this.config = d || {};
            this.divWidth = d.width || this.trigger.offsetWidth;
            this.div || this.genDiv();
            this.trigger && this.initShowVal()
        };
    e.opened = null;
    e.allIns = {};
    e.itemSepa = "@";
    e.dataSepa = "|";
    e.hotCity = "@530@538@763@765@531@736@854@801@600@613@599@635@702@703@653@639@636@654@551@719@749@681@682@622@565@664@773@";
    e.chId = 489;
    e.chTxt = "\u5168\u56fd";
    e.gwId = 480;
    e.gwTxt = "\u56fd\u5916";
    e.qtId = 512;
    e.qtTxt = "\u5176\u4ed6";
    e.zxId = "@530@538@531@551@";
    e.spId = "@561@562@563@";
    e.getCById = function (a, b, c) {
        var d = [], b = RegExp("@(" + b + ")\\|([^\\|@]*)(\\|([^@]*)|@)", "gi");
        if (c && z(c))
            a.replace(b, function (a, b, d, e, f) {
                c(b, d, f);
                return ""
            });
        else
            return a.replace(b, function (a, b, c, e, f) {
                d.push([b, c, f]);
                return ""
            }), d
    };
    e.getCByPid = function (a, b, c) {
        if (a) {
            var d = [], b = RegExp("([^@]*)\\|([^\\|]*)\\|(" + b + ")@", "gi");
            if (c && z(c))
                a.replace(b, function (a, b, d, e) {
                    c(b, d, e);
                    return ""
                });
            else
                return a.replace(b, function (a, b, c, e) {
                    d.push([b, c, e]);
                    return ""
                }), d
        }
    };
    e.getCByTxt = function (a, b, c) {
        if (a) {
            var d = [], b = RegExp("([^@]*)\\|(" + b + ")(\\|([^@]*)|@)", "gi");
            if (c && z(c))
                a.replace(b, function (a, b, d, e, f) {
                    c(b, d, f);
                    return ""
                });
            else
                return a.replace(b, function (a, b, c, e, f) {
                    d.push([b, c, f]);
                    return ""
                }), d
        }
    };
    e.idStr2txtStr = function (a, b) {
        for (var c = a.split(i.dataSepa), d = "", h = 0, f; h < c.length; h++)
            c[h] != "" && (f = e.getCById(b, c[h]), f.length && (d += (d != "" ? i.textSepa : "") + f[0][1]));
        return d
    };
    e.htmlEleContainerId = "zljsc";
    e.htmlEleContainer = o(e.htmlEleContainerId) || null;
    e.addHTMLElement = function (a,
        b) {
        (b || e.htmlEleContainer || document.body).appendChild(a)
    };
    e.buildHTMLMainFrame = function (a, b) {
        function c(b) {
            var c = document.createElement("div");
            c.className = b;
            a.appendChild(c);
            return c
        }
        var d, e = !1;
        if (b.config.popdir && b.config.popdir == "up")
            d = c("sPopupBlock"), b.div.cb = d, e = !0;
        b.div.tp = c("student_tips");
        d = parseInt(m(b.trigger.parentNode, "width")) || "";
        d = c(b.config.popdir && b.config.popdir == "up" ? "sPopupTitle_down" + d : "sPopupTitle" + d);
        b.div.tb = d;
        d = c("clear");
        if (!e)
            d = c("sPopupBlock"), b.div.cb = d
    };
    e.buildSubdiv =
        function (a, b) {
            var c = document.createElement("div");
            c.className = b || "sPopupDivSub";
            c.state = "close";
            c.flagClose = !0;
            c.p = null;
            a.sdivWidth && t(a.sdivWidth) && f(c, "width", a.sdivWidth + "px");
            k(c, "click", function (a) {
                a = a || window.event;
                a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
            });
            e.addHTMLElement(c);
            return c
        };
    e.buildMask = function () {
        if (e.mask === void 0) {
            var a = document.createElement("div");
            a.className = "divMask";
            f(a, "opacity", 0.3);
            f(a, "zIndex", 990);
            f(a, "width", 0);
            f(a, "height", 0);
            f(a, "left", 0);
            f(a, "top",
                0);
            f(a, "visibility", "hidden");
            e.addHTMLElement(a);
            e.mask = a;
            e.mask.state = "hidden";
            e.mask.show = function () {
                if (e.opened && e.opened.needMask)
                    if (this.state == "hidden") {
                        this.state = "visible";
                        var a = H();
                        f(this, "width", a.w + "px");
                        f(this, "height", a.h + "px");
                        f(this, "visibility", "visible")
                    } else
                        e.fixPopupDivMask()
            };
            e.mask.hide = function () {
                if (this.state == "visible")
                    this.state = "hidden", f(this, "visibility", "hidden"), f(this, "width", 0), f(this, "height", 0)
            };
            e.opened && e.opened.needMask && e.mask.show()
        }
    };
    e.fixPopupDivMask = function () {
        if (e.opened !==
            null && e.opened.needMask && e.mask !== void 0 && e.mask.state == "visible") {
            var a = H();
            parseFloat(m(e.mask, "width")) != a.w * 1 && f(e.mask, "width", a.w * 1 + "px");
            parseFloat(m(e.mask, "height")) != a.h * 1 && f(e.mask, "height", a.h * 1 + "px")
        }
    };
    e.buildShim = function (a) {
        var b = document.createElement("iframe");
        b.src = "javascript:''";
        b.frameBorder = "0";
        b.scrolling = "no";
        b.className = "iframeShim";
        f(b, "position", "absolute");
        f(b, "visibility", "hidden");
        f(b, "zIndex", m(a, "zIndex") - 1);
        f(b, "top", "-100px");
        f(b, "left", "-100px");
        f(b, "width", isNaN(parseFloat(m(a,
            "width"))) ? "0px" : parseFloat(m(a, "width")) + "px");
        f(b, "height", "0px");
        return b
    };
    e.fnClickBody = function () {
        e.opened !== null && (e.mask === void 0 || e.mask.state == "hidden") && e.opened.hidePopup()
    };
    e.fnMOver = function (a, b) {
        x(a, b || "mOverItem")
    };
    e.fnMOut = function (a, b) {
        w(a, b || "mOverItem")
    };
    e.fnClickChebox = function (a) {
        (a.parentNode.tagName.toLowerCase() == "label" ? a.parentNode : a).className = a.checked ? "seledItem" : "noselItem"
    };
    e.fnClickCheckbox_all = function (a, b) {
        for (var c = 0; c < b.length; c++)
            if (b[c].checked != a.checked)
                b[c].checked =
                    a.checked, e.fnClickChebox(b[c])
    };
    e.fnClickCheckbox_item = function (a, b) {
        for (var c = 0; c < b.length; c++)
            if (!b[c].checked) {
                if (a.checked)
                    a.checked = !1, e.fnClickChebox(a);
                return
            }
        if (!a.checked)
            a.checked = !0
    };
    e.fixIEBack = function () {
        if (p)
            for (var a in e.allIns)
                e.allIns[a].initShowVal()
    };
    e.fixXY = function (a, b, c, d, e, f, g) {
        var j = e.offsetWidth, e = e.offsetHeight, E = M(), i = G();
        typeof f != "undefined" && t(f) && (c += f);
        typeof g != "undefined" && t(g) && (d += g);
        a && c + j - E.x > i.w - N() && (c = Math.max(i.w - N() - j, 0) + E.x);
        b && d + e - E.y > i.h && (d = d - e - E.y <
            0 ? Math.max(i.h - e, 0) + E.y : d - e);
        return { x: c, y: d }
    };
    e.scrollBodyY = function (a) {
        var b = a.offsetHeight, c = M(), d = G(), a = u(a);
        a.y + b > d.h + c.y && a.y > c.y ? (b = centralTimer.animation(600, [[window, "scrollTop", c.y, a.y, "easeOut", ""]]), b.restart()) : c.y > a.y && (b = centralTimer.animation(600, [[window, "scrollTop", c.y, a.y, "easeOut", ""]]), b.restart())
    };
    e.prototype.offsetX = 0;
    e.prototype.offsetY = 0;
    e.prototype.needMask = !0;
    e.prototype.initShowVal = function () {
        var a = "";
        this.hidden.value != "" && (a = e.idStr2txtStr(this.hidden.value, this.data),
            this.shidden && this.shidden.value != "" && (a != "" && (a += "\uff1a"), a += e.idStr2txtStr(this.shidden.value, this.sdata)), a != "" && this.showTxtOnTrigg(a))
    };
    e.prototype.getDefTriggTxt = function () {
        return "\u8bf7\u9009\u62e9" + this.config.title
    };
    e.prototype.genDiv = function () {
        var a = this;
        if (!a.div) {
            var b = document.createElement("div");
            k(b, "click", function (a) {
                a = a || window.event;
                a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
            });
            f(b, "width", a.divWidth + "px");
            b.className = "sPopupDiv";
            a.div = b;
            e.buildHTMLMainFrame(a.div,
                a);
            e.addHTMLElement(b);
            if (F)
                b = e.buildShim(a.div), e.addHTMLElement(b), a.div.shim = b;
            a.div.tb.innerHTML = a.genTitleHTML();
            k(a.trigger, "click", function (b) {
                a.fnClickTrigger(b)
            });
            k(a.trigger, "focus", function () {
                a.trigger.blur()
            })
        }
    };
    e.prototype.genTitleHTML = function () {
        var a = "<h1>" + (this.config.title && this.config.title != "" ? this.config.title : "") + "</h1>";
        a += '<div class="sButtonBlock">';
        this.noConfirmBtn || (a += '<a class="orgButton" href="#" onclick="return zlzp.PopupDiv.allIns[\'' + this.id + "'].fnClickOk()\">\u786e\u5b9a</a> ");
        this.noAllBtn || (a += '<a class="blueButton" href="#" onclick="return zlzp.PopupDiv.allIns[\'' + this.id + "'].fnClickAll()\">\u4e0d\u9650</a> ");
        a += '<a class="closeButton" href="#" onclick="return zlzp.PopupDiv.allIns[\'' + this.id + '\'].fnClickClose()"></a></div><div class="clear"></div>';
        this.hasSeledArea && (a += '<div id="seledCity">\u5df2\u9009\u62e9\uff1a</div>');
        return a
    };
    e.prototype.buildSubTitle = function (a, b, c) {
        var d = b[0], b = b[1], e = a.parentNode.offsetWidth, f = a.parentNode.offsetHeight;
        if (!this.scdiv)
            this.scdiv =
                document.createElement("div");
        this.scdiv.style.display = "block";
        a.style.display = "none";
        a.parentNode.insertBefore(this.scdiv, a);
        this.config.maxsel === 1 ? this.scdiv.innerHTML = '<div style="float:left;cursor:pointer;width:16px;height:' + (f - 8) + 'px;" onclick="return zlzp.PopupDiv.allIns[\'' + this.id + "'].fnMouOutSubdiv()\"></div>" + b.slice(0, c) : (this.scdiv.innerHTML = '<div style="float:left;cursor:pointer;width:16px;height:' + (f - 8) + 'px;" onclick="return zlzp.PopupDiv.allIns[\'' + this.id + '\'].fnMouOutSubdiv()"></div><label style="float:right;margin-left:4px;text-indent:0;height:14px;line-height:14px;width:' +
            (e - 32) + 'px;" for="c_' + this.id + "_" + d + '"><input id="c_' + this.id + "_" + d + '" name="' + this.cheboxN + "_" + d + '" class="availCbox" type="checkbox" onclick="return zlzp.PopupDiv.allIns[\'' + this.id + '\'].fnClickAll_sub(this)" value="' + d + '" iname="' + b + '" style="margin:0 2px 0 0;" />' + b.slice(0, c) + "</label>", this.cbox = this.scdiv.getElementsByTagName("input")[0])
    };
    e.prototype.genParentItemHTML = function (a, b) {
        return '<td width="' + 100 / this.col + '%" class="blurItem" onmouseover="zlzp.PopupDiv.allIns[\'' + this.id + "'].fnMOverParent(this,'" +
            b[0] + "')\" onmouseout=\"zlzp.PopupDiv.allIns['" + this.id + '\'].fnMOutParent(this)"><span class="' + (a ? "availItem" : "seledAvailItem") + '" onclick="zlzp.PopupDiv.allIns[\'' + this.id + "'].fnPopupChildren(this,['" + b[0] + "','" + b[1] + "'])\">" + b[1] + "</span></td>"
    };
    e.prototype.genItem = function (a, b, c, d, e) {
        var f = "", c = c ? "_" + c : "";
        f += this.config.maxsel === 1 ? "<span onclick=\"zlzp.PopupDiv.allIns['" + this.id + "'].fnClickSingItem('" + a + "', '" + b + '\')" class="' + (d ? "availItem" : "seledItem") + '" />' + b + "</span>" : '<label for="c_' + c +
            this.id + "_" + a + '" class="' + (d ? "noselItem" : "seledItem") + '"><input type="checkbox" name="' + this.cheboxN + '" id="c_' + c + this.id + "_" + a + '" value="' + a + '" iname="' + b + '" onclick="zlzp.PopupDiv.allIns[\'' + this.id + "'].fnClickChebox" + c + '(this)"' + (d ? "" : ' checked="checked"') + (e ? ' disabled = "true"' : "") + " />" + b + "</label>";
        return f
    };
    e.prototype.isNotSelected = function (a) {
        return (i.dataSepa + this.hidden.value + i.dataSepa).indexOf(i.dataSepa + a + i.dataSepa) < 0
    };
    e.prototype.fnClickTrigger = function (a) {
        a.stopPropagation ? a.stopPropagation() :
            a.cancelBubble = !0;
        if (e.opened != this)
            e.opened !== null && e.opened.hidePopup(), e.opened = this, this.genHTML(), a = this.trigger.offsetWidth / 2, f(this.div.tp, "left", -this.offsetX + (this.posTips || a || 45) + "px"), a = null, this.config.popdir && this.config.popdir == "up" && (a = u(this.trigger).y - this.div.offsetHeight + this.trigger.offsetHeight), this.showPopup(null, a, !0), this.needMask && (e.mask ? e.mask.show() : e.buildMask())
    };
    e.prototype.hidePopup = function () {
        if (e.opened == this)
            e.opened = null;
        this.div.state = "close";
        f(this.div, "visibility",
            "hidden");
        f(this.div, "left", "-100px");
        //alert("hide");
        var cd = document.getElementById('search_bottom_content_demo');
        if (cd != null)
            cd.style.display = "block";

        f(this.div, "top", "-100px");
        this.div.shim && (f(this.div.shim, "visibility", "hidden"), f(this.div.shim, "width", "0"), f(this.div.shim, "height", "0"), f(this.div.shim, "left", "-100px"), f(this.div.shim, "top", "-100px"));
        this.div.mask && this.div.mask.state == "visible" && this.div.mask.hide();
        e.opened === null && e.mask && e.mask.state == "visible" && e.mask.hide()
    };
    e.prototype.showPopup = function (a, b) {
        this.div.state = "open";
        var c = this.div.offsetWidth, d = this.div.offsetHeight, h = u(this.trigger),
            g = t(this.config.titOffset) ? this.config.titOffset : 0, g = a && t(a) ? a : h.x + g, h = b && t(b) ? b : h.y, h = e.fixXY(!0, !1, g, h, this.div, this.offsetX, this.offsetY);
        this.div.x = h.x;
        this.div.y = h.y;
        f(this.div, "left", h.x + "px");
        f(this.div, "top", h.y + "px");
        f(this.div, "visibility", "visible");
        //alert("show");
        //alert(document.getElementById('search_bottom_content_demo').offsetHeight);
        //search_content
        var cd = document.getElementById('search_bottom_content_demo');
        if (cd != null)
            cd.style.display = "none";

        this.div.shim && (f(this.div.shim, "width", c + "px"), f(this.div.shim, "height", d + "px"), f(this.div.shim, "left", h.x + "px"), f(this.div.shim, "top", h.y + "px"), f(this.div.shim, "visibility", "visible"))
    };
    e.prototype.fixYIfDirUp = function () {
        if (this.config.popdir &&
            this.config.popdir == "up") {
            var a = u(this.trigger).y - this.div.offsetHeight + this.trigger.offsetHeight;
            this.div.y = a;
            f(this.div, "top", a + "px");
            this.div.shim && f(this.div.shim, "top", a + "px")
        }
        e.scrollBodyY(this.div)
    };
    e.prototype.showTxtOnTrigg = function (a) {
        var b = a;
        if (!this.txtN)
            this.txtN = parseInt((parseFloat(m(this.trigger, "width")) - (p ? parseFloat(m(this.trigger, "paddingLeft")) + parseFloat(m(this.trigger, "paddingRight")) : 0)) / zlzp.charW);
        if (a.realLength() > this.txtN)
            for (var b = "", c = 0, d = 0, e, f; c < a.length; c++) {
                e = a.charAt(c);
                (f = /[^\x00-\xff]/.test(e)) ? d += 2 : d++;
                if (d > this.txtN - 1)
                    break;
                b += e
            }
        this.trigger.value = b + (b != a ? "..." : "");
        this.trigger.title = a
    };
    e.prototype.fnClickClose = function () {
        this.hidePopup();
        this.onClose();
        return !1
    };
    e.prototype.onClose = function () {
    };
    e.prototype.clearValue = function () {
        this.hidden.value = "";
        this.showTxtOnTrigg(this.getDefTriggTxt())
    };
    e.prototype.fnClickAll = function () {
        this.hidden.value = "";
        this.showTxtOnTrigg("\u4e0d\u9650");
        this.fnClickClose();
        return !1
    };
    e.prototype.buildDivMask = function () {
        var a = this;
        if (!a.div.mask) {
            var b = document.createElement("div");
            b.className = "divMask";
            f(b, "opacity", 0.3);
            f(b, "zIndex", 1);
            f(b, "width", 0);
            f(b, "height", 0);
            f(b, "left", 0);
            f(b, "top", 0);
            f(b, "visibility", "hidden");
            (a.div.parentNode && a.div.parentNode.nodeType == 1 ? a.div.parentNode : document.body).appendChild(b);
            a.div.mask = b;
            a.div.mask.state = "hidden";
            a.div.mask.show = function () {
                if (a.div.state == "open" && this.state == "hidden")
                    this.state = "visible", f(this, "width", a.div.offsetWidth + "px"), f(this, "height", a.div.offsetHeight + "px"),
                        f(this, "zIndex", parseInt(m(a.div, "zIndex")) + 1), f(this, "left", m(a.div, "left")), f(this, "top", m(a.div, "top")), f(this, "visibility", "visible")
            };
            a.div.mask.hide = function () {
                if (this.state == "visible")
                    this.state = "hidden", f(this, "visibility", "hidden"), f(this, "width", 0), f(this, "height", 0), f(this, "left", "-100px"), f(this, "top", "-100px")
            };
            a.div.mask.onclick = function (b) {
                b = b || window.event;
                b.stopPropagation ? b.stopPropagation() : b.cancelBubble = !0;
                this.hide();
                if ((b = a.parent || a.child) && b.div.state == "open")
                    f(a.div, "zIndex",
                        parseInt(m(b.div, "zIndex")) + 2), b.div.mask || b.buildDivMask(), b.div.mask.show()
            }
        }
    };
    e.prototype.fnPopupChildren = function (a, b) {
        var c = this;
        c.buildSubTitle(a, b, c.subTitleLength || 10);
        if (!c.subdiv || !(c.subdiv.state == "open" && c.subdiv.p == b)) {
            if (!c.subdiv)
                c.subdiv = e.buildSubdiv(c, "sPopupDivSubJobname"), c.moversd = function () {
                    c.fnMouOverSubdiv()
                }, c.moutsd = function () {
                    c.fnMouOutSubdiv()
                }, k(c.subdiv, "mouseover", c.moversd), k(c.subdiv, "mouseout", c.moutsd);
            c.subdiv.flagClose = !1;
            var d = a.parentNode;
            if (c.subdiv.p != b) {
                c.subdiv.p =
                    b;
                if (c.subdiv.trig && c.subdiv.trig != d)
                    c.subdiv.trig.className = "blurItem";
                c.subdiv.trig = d;
                c.subdiv.innerHTML = c.genSubdivHTML()
            }
            d = c.fixXYByTrig();
            c.showSubdiv(d)
        }
    };
    e.prototype.fixXYByTrig = function () {
        var a = u(this.subdiv.trig), b = a.x, a = a.y + this.subdiv.trig.offsetHeight;
        this.subdiv.trig.className = "focusItemTop";
        a -= 2;
        if (F || I)
            a -= 2;
        var c = "", c = this.subdiv.trig.offsetWidth - 4 + "px";
        c += " top";
        this.subdiv.style.backgroundPosition = c;
        x(this.subdiv, "sPopupDivSubCity");
        return { x: b, y: a }
    };
    e.prototype.showSubdiv = function (a) {
        f(this.subdiv,
            "zIndex", parseInt(m(this.div, "zIndex")) + 1);
        f(this.subdiv, "left", a.x + parseInt(m(this.div, "borderLeftWidth")) + "px");
        f(this.subdiv, "top", a.y + "px");
        f(this.subdiv, "visibility", "visible");
        if (this.subdiv.state != "open")
            this.subdiv.state = "open";
        this.subdiv.shim && (f(this.subdiv.shim, "zIndex", m(this.subdiv, "zIndex") - 1), f(this.subdiv.shim, "left", a.x + "px"), f(this.subdiv.shim, "top", a.y + "px"), f(this.subdiv.shim, "width", this.subdiv.offsetWidth + "px"), f(this.subdiv.shim, "height", this.subdiv.offsetHeight + "px"), f(this.subdiv.shim,
            "visibility", "visible"))
    };
    e.prototype.hideSubdiv = function () {
        if (this.subdiv.state == "open" && this.subdiv.flagClose) {
            if (this.subdiv.timeControl)
                clearTimeout(this.subdiv.timeControl), this.subdiv.timeControl = null;
            f(this.subdiv, "left", "-100px");
            f(this.subdiv, "top", "-100px");
            f(this.subdiv, "visibility", "hidden");
            if (this.subdiv.state == "open" && this.subdiv.flagClose && this.subdiv.trig)
                this.subdiv.trig.className = "blurItem";
            if (this.scdiv)
                this.scdiv.nextSibling.style.display = "block", this.scdiv.style.display = "none";
            this.subdiv.shim && (f(this.subdiv.shim, "left", "-100px"), f(this.subdiv.shim, "top", "-100px"), f(this.subdiv.shim, "width", "0"), f(this.subdiv.shim, "height", "0"), f(this.subdiv.shim, "visibility", "hidden"));
            this.subdiv.state = "close";
            this.subdiv.flagClose = !1
        }
    };
    e.prototype.fnMOverParent = function (a, b) {
        e.fnMOver(a);
        this.subdiv && this.subdiv.state == "open" && this.subdiv.p && this.subdiv.p[0] == b && (this.subdiv.flagClose = !1)
    };
    e.prototype.fnMOutParent = function (a) {
        e.fnMOut(a);
        this.fnMouOutSubdiv()
    };
    e.prototype.fnMouOverSubdiv =
        function () {
            this.subdiv && (this.subdiv.flagClose = !1)
        };
    e.prototype.fnMouOutSubdiv = function () {
        var a = this;
        if (a.subdiv && a.subdiv.state == "open")
            a.subdiv.flagClose = !0, a.subdiv.timeControl = setTimeout(function () {
                a.hideSubdiv.apply(a)
            }, 200)
    };
    var s = zlzp.PopupSingle = function (a, b, c, d) {
        this.noConfirmBtn = d.noConfirmBtn === !1 ? !1 : !0;
        this.noAllBtn = d.noAllBtn === !1 ? !1 : !0;
        q(this, a, b, c, d || {});
        this.col = this.config.col || 2;
        this.cellW = parseInt(100 / this.col) + "%"
    };
    y(s, e);
    s.prototype.genHTML = function () {
        var a = '<div class="paddingDiv">',
            b = this.dataArr || this.data.split(e.itemSepa), c, d = -1, h, f = !0;
        a += '<table cellspacing="0" cellpadding="0" border="0">';
        for (c = 0; c < b.length; c++)
            h = null, B(b[c]) ? h = b[c] : C(b[c]) && b[c] != "" && (h = b[c].split(e.dataSepa)), h !== null && (f = this.hidden.value != h[0], d++ , d % this.col == 0 && (a += "<tr>"), a += this.genItemHTML(f, h), d % this.col == this.col - 1 && (a += "</tr>"));
        a += "</table></div>";
        this.div.cb.innerHTML = a
    };
    s.prototype.genItemHTML = function (a, b) {
        return '<td width="' + 100 / this.col + '%" class="mOutItem" onmouseover="zlzp.PopupDiv.fnMOver(this)" onmouseout="zlzp.PopupDiv.fnMOut(this)"><span class="' +
            (a ? "availItem" : "seledItem") + '"' + (a ? " onclick=\"zlzp.PopupDiv.allIns['" + this.id + "'].fnClickSingItem('" + b[0] + "','" + b[1] + "')\"" : "") + ">" + b[1] + "</span></td>"
    };
    s.prototype.fnClickSingItem = function (a, b) {
        this.hidden.value = a;
        this.showTxtOnTrigg(b);
        this.fnClickClose()
    };
    var i = zlzp.PopupMutil = function (a, b, c, d) {
        q(this, a, b, c, d || {});
        this.cheboxN = "c_" + this.id;
        this.col = this.config.col || 2;
        this.cellW = parseInt(100 / this.col) + "%"
    };
    y(i, e);
    i.dataSepa = ";";
    i.textSepa = "+";
    i.prototype.genHTML = function () {
        var a = '<div class="paddingDiv">',
            b = this.dataArr || this.data.split(e.itemSepa), c, d = -1, h, f = !0;
        a += '<table class="chebox" cellspacing="0" cellpadding="0" border="0">';
        for (c = this.selNum = 0; c < b.length; c++)
            h = null, B(b[c]) ? h = b[c] : C(b[c]) && b[c] != "" && (h = b[c].split(e.dataSepa)), h !== null && ((f = this.isNotSelected(h[0])) || this.selNum++ , d++ , d % this.col == 0 && (a += "<tr>"), a += this.genItemHTML(f, h), d % this.col == this.col - 1 && (a += "</tr>"));
        a += "</table></div>";
        this.div.cb.innerHTML = a
    };
    i.prototype.genItemHTML = function (a, b) {
        return '<td  width="' + 100 / this.col + '%" class="mOutItem" onmouseover="zlzp.PopupDiv.fnMOver(this)" onmouseout="zlzp.PopupDiv.fnMOut(this)"><label for="c_' +
            this.id + "_" + b[0] + '" class="' + (a ? "noselItem" : "seledItem") + '"><input type="checkbox" name="' + this.cheboxN + '" id="c_' + this.id + "_" + b[0] + '" value="' + b[0] + '" iname="' + b[1] + '" onclick="zlzp.PopupDiv.allIns[\'' + this.id + "'].fnClickChebox(this)\"" + (a ? "" : ' checked="checked"') + " />" + b[1] + "</label></td>"
    };
    i.prototype.fnClickChebox = function (a) {
        a.checked ? this.selNum++ : this.selNum--;
        this.config.maxsel && t(this.config.maxsel) && this.config.maxsel < this.selNum ? (alert("\u60a8\u6700\u591a\u53ef\u4ee5\u9009\u62e9" + this.config.maxsel +
            "\u4e2a" + this.config.title), a.checked = !1, this.selNum--) : e.fnClickChebox(a)
    };
    i.prototype.fnClickOk = function () {
        for (var a = this.getChebox(), b = "", c = "", d = 0; d < a.length; d++)
            a[d].checked && (b += (b == "" ? "" : i.dataSepa) + a[d].value, c += (c == "" ? "" : i.textSepa) + a[d].getAttribute("iname"));
        this.hidden.value = b;
        this.showTxtOnTrigg(c == "" ? "\u4e0d\u9650" : c);
        this.fnClickClose();
        return !1
    };
    i.prototype.getChebox = function () {
        for (var a = this.div.cb.getElementsByTagName("input"), b = [], c = 0; c < a.length; c++)
            a[c].name == this.cheboxN && b.push(a[c]);
        return b
    };
    var g = zlzp.PopupIndustry = function (a, b, c, d) {
        q(this, a, b, c, d || {})
    };
    y(g, i);
    g.prototype.genHTML = function () {
        var a = '<div class="paddingTB"><table class="chebox" cellspacing="0" cellpadding="0" border="0" width="100%">', b = this.dataArr || this.data.split(e.itemSepa), c, d = -1, h = -1, f = -1, g, j = !0;
        for (c = this.selNum = 0; c < b.length; c++)
            if (g = null, B(b[c]) ? g = b[c] : C(b[c]) && b[c] != "" && (g = b[c].split(e.dataSepa)), g !== null) {
                (j = this.isNotSelected(g[0])) || this.selNum++;
                if (d != g[2]) {
                    if (d != -1) {
                        for (; h % this.col < this.col - 1;)
                            a +=
                                "<td></td>", ++h % this.col == this.col - 1 && (a += "</tr>");
                        a += "</table></td></tr>"
                    }
                    d = g[2];
                    f++;
                    a += '<tr class="zebraCol' + f % 2 + '"><td class="leftClass industryLCla" nowrap="nowrap" valign="middle">' + dataHandle.getNameById(industryClass, d) + '</td><td class="jobtypeItems"><table cellspacing="0" cellpadding="0" border="0" width="100%">'
                }
                h++;
                h % this.col == 0 && (a += "<tr>");
                a += this.genItemHTML(j, g);
                h % this.col == this.col - 1 && (a += "</tr>")
            }
        a += "</table></div>";
        this.div.cb.innerHTML = a
    };
    g.prototype.genItemHTML = function (a, b) {
        return '<td width="' +
            this.cellW + '" class="mOutItem" onmouseover="zlzp.PopupDiv.fnMOver(this)" onmouseout="zlzp.PopupDiv.fnMOut(this)"><label for="c_' + this.id + "_" + b[0] + '" class="' + (a ? "noselItem" : "seledItem") + '"><input type="checkbox" name="' + this.cheboxN + '" id="c_' + this.id + "_" + b[0] + '" value="' + b[0] + '" iname="' + b[1] + '" onclick="zlzp.PopupDiv.allIns[\'' + this.id + "'].fnClickChebox(this)\"" + (a ? "" : ' checked="checked"') + " />" + b[1] + "</label></td>"
    };
    g = zlzp.PopupCityS = function (a, b, c, d) {
        this.shidden = d.shidden;
        this.noAllBtn = d.noAllBtn;
        this.hasSeledArea = d.hasSeledArea === !1 ? !1 : !0;
        this.limit = d.maxsel;
        if (this.limit === 1)
            this.hasSeledArea = !1, this.noConfirmBtn = this.noAllBtn = !0;
        q(this, a, b, c, d || {});
        this.upDefaultTxt()
    };
    y(g, i);
    g.prototype.hSeled = !1;
    g.prototype.oSeled = !1;
    g.prototype.dataTabLM = 21;
    g.prototype.initShowVal = function () {
    };
    g.prototype.upDefaultTxt = function () {
        var a, b, c = "";
        if (this.hidden && this.hidden.value) {
            a = this.hidden.value.replace(/\s/g, "").split(i.dataSepa);
            for (var d = 0; d < a.length; d++)
                a[d] && (b = e.getCById(this.data, a[d]), (b = b.length ?
                    b[0] : null) && b[1] && (c += i.textSepa + b[1]))
        }
        if (c)
            this.shidden.value = c.slice(1), this.shidden.setAttribute("title", c.slice(1))
    };
    g.prototype.buildDivFrame = function () {
        var a = this;
        if (!a.divFrame) {
            var a = this, b = function (b) {
                var c = document.createElement("div");
                c.className = b;
                a.div.cb.appendChild(c);
                return c
            }, c = b("clear");
            f(c, "height", "5px");
            c = b("pCityTitB");
            a.div.hctb = c;
            c = b("pCityItemB");
            a.div.hcb = c;
            a.div.hcb.state = "open";
            c = b("pCityTitB");
            a.div.pctb = c;
            c = b("pCityItemB");
            a.div.pcb = c;
            a.div.pcb.state = "open";
            c = b("pCityTitB");
            a.div.octb = c;
            c = b("pCityItemB");
            a.div.ocb = c;
            a.div.ocb.state = "open";
            c = b("clear");
            f(c, "height", "5px");
            a.divFrame = !0
        }
    };
    g.prototype.fnSwitch = function (a) {
        var b = this.div[a + "ctb"], a = this.div[a + "cb"];
        if (b && a)
            if (a.state == "open")
                f(a, "display", "none"), b.getElementsByTagName("span")[0].className = "pIconPlus", a.state = "close";
            else if (a.state == "close")
                f(a, "display", "block"), b.getElementsByTagName("span")[0].className = "pIconMinus", a.state = "open";
        this.div.shim && (f(this.div.shim, "width", this.div.offsetWidth + "px"), f(this.div.shim,
            "height", this.div.offsetHeight + "px"));
        this.fixYIfDirUp()
    };
    g.prototype.genHTML = function () {
        this.selNum = 0;
        this.divFrame || this.buildDivFrame();
        this.genHotHTML();
        this.genProOveHTML();
        this.genSeledHTML()
    };
    g.prototype.fnClickSingItem = function (a, b) {
        this.hidden.value = a;
        this.shidden.value = b;
        zlzp.setDefTxt(this.hidden, zlzp.searchjob.c_tips);
        if (this.subdiv)
            this.subdiv.flagClose = !0, this.hideSubdiv();
        this.fnClickClose()
    };
    g.prototype.fnClickProvItem = function (a, b) {
        this.hidden.value = b;
        zlzp.setDefTxt(this.hidden, zlzp.searchjob.c_tips);
        this.genProvinceHTML(a);
        if (this.hSeled)
            this.genHotHTML(this.div.hcb.state), this.hSeled = !1;
        if (this.oSeled)
            this.genOverseaHTML(this.div.ocb.state), this.oSeled = !1;
        this.div.shim && (f(this.div.shim, "width", this.div.offsetWidth + "px"), f(this.div.shim, "height", this.div.offsetHeight + "px"));
        this.fixYIfDirUp()
    };
    g.prototype.gotoChinaPro = function () {
        this.genProvinceHTML(e.chId);
        this.div.shim && (f(this.div.shim, "width", this.div.offsetWidth + "px"), f(this.div.shim, "height", this.div.offsetHeight + "px"));
        this.fixYIfDirUp()
    };
    g.prototype.genHotHTML = function (a) {
        a = a || "open";
        this.cheboxN = this.cheboxN || "c_" + this.id;
        f(this.div.hcb, "display", a == "open" ? "block" : "none");
        this.div.hcb.state != a && (this.div.hcb.state = a);
        var b = e.hotCity.split(e.itemSepa), a = '<span class="' + (a == "open" ? "pIconMinus" : "pIconPlus") + '" onclick="zlzp.PopupDiv.allIns[\'' + this.id + "'].fnSwitch('h')\"></span>\u4e3b\u8981\u57ce\u5e02";
        this.div.hctb.innerHTML = a;
        for (var a = '<div class="sPopupTabCB"><table cellspacing="0" cellpadding="0" border="0" class="sPopupTabC">',
            c = 0, d, h, g = !0, n = !1, j = 0; c < b.length; c++)
            if (b[c] != "" && (d = e.getCById(this.data, b[c]), d.length)) {
                h = d[0][0];
                d = d[0][1];
                g = this.isNotSelected(h);
                n = !1;
                RegExp("@" + h + "\\|[^@]+\\|([^@]+)@").test(this.data) && RegExp.$1 && this.hidden.value.search(RegExp.$1) > -1 && (g = !1, n = !0);
                if (!this.hSeled && !g)
                    this.hSeled = !0;
                j % this.col == 0 && (a += "<tr>");
                a += '<td width="' + this.cellW + '" class="mOutItem" onmouseover="zlzp.PopupDiv.fnMOver(this)" onmouseout="zlzp.PopupDiv.fnMOut(this)">';
                a += this.genItem(h, d, "", g, n);
                a += "</td>";
                j % this.col ==
                    this.col - 1 && (a += "</tr>");
                j++
            }
        a += "</table></div>";
        this.div.hcb.innerHTML = a
    };
    g.prototype.genProOveHTML = function () {
        this.div.pcb.state = "open";
        this.div.ocb.state = "close";
        this.proId = e.chId;
        this.genProvinceHTML(this.proId, this.div.pcb.state);
        this.genOverseaHTML(this.div.ocb.state)
    };
    g.prototype.genProvinceHTML = function (a, b) {
        var c = this, b = b || "open";
        f(c.div.pcb, "display", "block");
        c.div.pcb.state != b && (c.div.pcb.state = b);
        if (!c.tdWPix)
            c.tdWPix = (c.div.pcb.offsetWidth - c.dataTabLM) / c.col;
        f(c.div.pcb, "display", b ==
            "open" ? "block" : "none");
        var d = "";
        if (a == e.chId)
            d = e.chTxt;
        else {
            var h = e.getCById(c.data, a);
            h.length && (d = h[0][1])
        }
        h = e.getCByPid(c.data, a);
        if (h.length) {
            var g = c.isNotSelected(a), d = '<span class="' + (b == "open" ? "pIconMinus" : "pIconPlus") + '" onclick="zlzp.PopupDiv.allIns[\'' + c.id + "'].fnSwitch('p')\"></span>" + (a != e.chId ? '<font class="mOutItem" onmouseover="zlzp.PopupDiv.fnMOver(this)" onmouseout="zlzp.PopupDiv.fnMOut(this)"><span class="' + (g ? "availItem" : "seledItem") + '"' + (g ? " onclick=\"zlzp.PopupDiv.allIns['" + c.id +
                "'].fnClickSingItem('" + d + "')\"" : "") + ">" + d + '</span></font>&nbsp;&nbsp;<a href="#" onclick="zlzp.PopupDiv.allIns[\'' + c.id + '\'].gotoChinaPro();return false;" class="gotoup">[\u8fd4\u56de\u4e0a\u4e00\u7ea7]</a>' : "\u5176\u4ed6\u7701\u5e02");
            c.div.pctb.innerHTML = d;
            for (var g = !0, d = '<div class="sPopupTabCB"><table cellspacing="0" cellpadding="0" border="0" class="sPopupTabC">', n = 0, j = -1, i, l, k = 1; n < h.length; n++)
                i = h[n][0], l = h[n][1], a == e.chId && (e.itemSepa + e.zxId + e.itemSepa).indexOf(e.itemSepa + i + e.itemSepa) > -1 ||
                    (l = (a == e.chId && (i !== '563' && i !== '562' && i !== '561')) ? l.substr(0, 2) : l, l = l == "\u9ed1\u9f99" ? "\u9ed1\u9f99\u6c5f" : l, k = Math.min(Math.ceil(l.realLength() * zlzp.charW / c.tdWPix), c.col), (g = c.isNotSelected(i)) && e.getCByPid(c.data, i, function (a) {
                        c.isNotSelected(a) || (g = !1)
                    }), c.data.indexOf(e.dataSepa + i + e.itemSepa), j++ , j % c.col > (j + k - 1) % c.col && (d += "</tr>", j = 0), j % c.col == 0 && (d += "<tr>"), a == e.chId && (e.itemSepa + e.spId + e.itemSepa).indexOf(e.itemSepa + i + e.itemSepa) > -1 ? (d += '<td width="' + (parseInt(c.cellW) * k + "%") + '" class="mOutItem" onmouseover="zlzp.PopupDiv.fnMOver(this)" onmouseout="zlzp.PopupDiv.fnMOut(this)">',
                        d += c.genItem(i, l, "", g), d += "</td>") : d += '<td width="' + (parseInt(c.cellW) * k + "%") + '" class="blurItem" onmouseover="zlzp.PopupDiv.allIns[\'' + c.id + "'].fnMOverParent(this,'" + i + "')\" onmouseout=\"zlzp.PopupDiv.allIns['" + c.id + '\'].fnMOutParent(this)"><span class="' + (g ? "availItem" : "seledAvailItem") + '" onclick="zlzp.PopupDiv.allIns[\'' + c.id + "'].fnPopupChildren(this,['" + i + "','" + l + "'])\">" + l + "</span></td>", j += k - 1, j % c.col == c.col - 1 && (d += "</tr>"));
            d += "</table></div>";
            c.div.pcb.innerHTML = d
        }
    };
    g.prototype.genOverseaHTML =
        function (a) {
            a = a || "open";
            this.cheboxN = this.cheboxN || "c_" + this.id;
            f(this.div.ocb, "display", a == "open" ? "block" : "none");
            this.div.ocb.state != a && (this.div.ocb.state = a);
            var b = e.getCByPid(this.data, "0");
            if (b.length) {
                var c = this.isNotSelected(b[0]);
                if (!this.oSeled && !c)
                    this.oSeled = !0;
                a = '<span class="' + (a == "open" ? "pIconMinus" : "pIconPlus") + '" onclick="zlzp.PopupDiv.allIns[\'' + this.id + "'].fnSwitch('o')\"></span>" + e.gwTxt;
                this.div.octb.innerHTML = a;
                for (var a = '<div class="sPopupTabCB"><table cellspacing="0" cellpadding="0" border="0" class="sPopupTabC">',
                    d = 0, h = -1, g, n; d < b.length; d++)
                    if (g = b[d][0], n = b[d][1], g != e.gwId && g != e.chId) {
                        h++;
                        c = this.isNotSelected(g);
                        if (!this.oSeled && !c)
                            this.oSeled = !0;
                        h % this.col == 0 && (a += "<tr>");
                        a += '<td width="' + this.cellW + '" class="mOutItem" onmouseover="zlzp.PopupDiv.fnMOver(this)" onmouseout="zlzp.PopupDiv.fnMOut(this)">';
                        a += this.genItem(g, n, "", c);
                        a += "</td>";
                        h % this.col == this.col - 1 && (a += "</tr>")
                    }
                a += "</table></div>";
                this.div.ocb.innerHTML = a
            }
        };
    g.prototype.genSeledHTML = function () {
        var a, b, c = "";
        this.seledCity = this.seledCity || o("seledCity");
        if (!this.seledCity)
            return "";
        if (this.hidden && this.hidden.value) {
            a = this.hidden.value.replace(/\s/g, "").split(i.dataSepa);
            for (var d = 0; d < a.length; d++)
                a[d] && (b = e.getCById(this.data, a[d]), (b = b.length ? b[0] : null) && b[1] && (c += '<span class="seledCityItem" val="' + b[0] + '" iname="' + b[1] + '">' + b[1] + '<a href="javascript:void(0);" class="seledCityClose" onclick="zlzp.PopupDiv.allIns[\'' + this.id + "'].fnClickSeled_close(this)\">&nbsp;</a></span>"))
        }
        this.seledCity.innerHTML = c
    };
    g.prototype.genSeledCityHTML = function (a) {
        var b =
            a.getAttribute("iname"), c = a.getAttribute("value");
        this.isSeledMax(a) || a.checked && !(this.seledCity.innerHTML.indexOf(b) > -1) && (this.seledCity.innerHTML += '<span class="seledCityItem" val="' + c + '" iname="' + b + '">' + b + '<a href="javascript:void(0);" class="seledCityClose" onclick="zlzp.PopupDiv.allIns[\'' + this.id + "'].fnClickSeled_close(this)\">&nbsp;</a></span>")
    };
    g.prototype.fnClickChebox = function (a) {
        this.isSeledMax(a) || (a.checked ? this.genSeledCityHTML(a) : this.removeSeledItem(a.value))
    };
    g.prototype.fnPopupChildren =
        function (a, b) {
            var c = this;
            c.buildSubTitle(a, b, 10);
            if (!c.subdiv || !(c.subdiv.state == "open" && c.subdiv.p == b)) {
                if (!c.subdiv)
                    c.subdiv = e.buildSubdiv(c, "sPopupDivSubJobname"), c.moversd = function () {
                        c.fnMouOverSubdiv()
                    }, c.moutsd = function () {
                        c.fnMouOutSubdiv()
                    }, k(c.subdiv, "mouseover", c.moversd), k(c.subdiv, "mouseout", c.moutsd);
                c.subdiv.flagClose = !1;
                var d = a.parentNode;
                if (c.subdiv.p != b) {
                    c.subdiv.p = b;
                    if (c.subdiv.trig && c.subdiv.trig != d)
                        c.subdiv.trig.className = "blurItem";
                    c.subdiv.trig = d;
                    c.subdiv.innerHTML = c.genSubdivHTML()
                }
                if (c.getSeledItemById(b[0]))
                    c.cbox.checked =
                        !0;
                for (var d = c.subdiv.getElementsByTagName("input"), h = 0; h < d.length; h++)
                    if (d[h].checked = c.cbox.checked, d[h].disabled = c.cbox.checked, c.getSeledItemById(d[h].value))
                        d[h].checked = !0;
                d = c.fixXYByTrig();
                c.showSubdiv(d)
            }
        };
    g.prototype.fixXYByTrig = function () {
        var a = u(this.subdiv.trig), b = a.x, a = a.y + this.subdiv.trig.offsetHeight;
        this.subdiv.trig.className = "focusItemTop";
        a -= 2;
        if (F || I)
            a -= 2;
        var c = "", c = this.subdiv.trig.offsetWidth - 4 + "px";
        c += " top";
        this.subdiv.style.backgroundPosition = c;
        x(this.subdiv, "sPopupDivSubCity");
        return { x: b, y: a }
    };
    g.prototype.hideSubdiv = function () {
        if (this.subdiv.state == "open" && this.subdiv.flagClose && this.subdiv.trig)
            this.subdiv.trig.className = "blurItem";
        q(this, "hideSubdiv")
    };
    g.prototype.genSubdivHTML = function () {
        var a = this, b = '<div class="paddingBlock">';
        if (a.subdiv && a.subdiv.p) {
            var c = 0;
            a.cheboxN = a.cheboxN || "c_" + a.id;
            e.getCByPid(a.data, a.subdiv.p[0], function (d, e) {
                var f = a.isNotSelectedSub(d);
                b += '<span style="width:' + (e.length > 7 ? 219 : 107) + 'px;" class="subCboxItem mOutItem" onmouseover="zlzp.PopupDiv.fnMOver(this)" onmouseout="zlzp.PopupDiv.fnMOut(this)">';
                b += a.genItem(d, e, "sub", f);
                b += "</span>";
                c++
            })
        }
        b += '<div class="clear"></div></div>';
        return b
    };
    g.prototype.fnClickChebox_sub = function (a) {
        if (!this.isSeledMax(a)) {
            var b = a.value;
            if (this.subdiv && this.subdiv.p) {
                o("c_sub_" + this.id + "_" + b);
                for (var c = this.subdiv.getElementsByTagName("input"), d = [], e = 0; e < c.length; e++)
                    c[e].name == this.cheboxN && d.push(c[e]);
                this.fnCbox_checked(b, a.checked);
                a.checked ? this.genSeledCityHTML(a) : this.removeSeledItem(a.value)
            }
        }
    };
    g.prototype.fnClickAll_sub = function (a) {
        var b = 0;
        if (this.subdiv &&
            this.subdiv.p)
            for (var c = this.subdiv.getElementsByTagName("input"), d = 0; d < c.length; d++)
                if (c[d].name == this.cheboxN && a.checked && this.getSeledItemById(c[d].value)) {
                    b++;
                    break
                }
        if (b || !this.isSeledMax(a)) {
            if (this.subdiv && this.subdiv.p) {
                c = this.subdiv.getElementsByTagName("input");
                b = [];
                for (d = 0; d < c.length; d++)
                    if (c[d].name == this.cheboxN) {
                        var f = c[d].value;
                        a.checked && this.removeSeledItem(f);
                        c[d].disabled = a.checked;
                        this.fnCbox_checked(f, a.checked);
                        this.fnCbox_disabled(f, a.checked);
                        b.push(c[d])
                    }
                e.fnClickCheckbox_all(a,
                    b)
            }
            a.checked ? this.genSeledCityHTML(a) : this.removeSeledItem(a.value)
        }
    };
    g.prototype.fnClickSeled_close = function (a) {
        this.removeSeledItem(a.parentNode.getAttribute("val"))
    };
    g.prototype.getSeledItems = function () {
        for (var a = [], b = this.seledCity ? this.seledCity.getElementsByTagName("span") : [], c = 0; c < b.length; c++)
            b[c].className === "seledCityItem" && a.push(b[c]);
        return a
    };
    g.prototype.getSeledItemById = function (a) {
        for (var b = this.getSeledItems(), c = 0; c < b.length; c++)
            if (b[c].getAttribute("val") === a)
                return b[c];
        return null
    };
    g.prototype.removeSeledItem = function (a) {
        var b = this, c = b.getSeledItemById(a);
        c && (b.seledCity.removeChild(c), b.fnCbox_checked(a, !1), b.fnCbox_disabled(a, !1), e.getCByPid(b.data, a, function (a) {
            b.fnCbox_checked(a, !1);
            b.fnCbox_disabled(a, !1)
        }))
    };
    g.prototype.isSeledMax = function (a) {
        a.getAttribute("iname");
        var b = this.getSeledItemById(a.getAttribute("value")) ? this.getSeledItems().length : a.checked ? this.getSeledItems().length + 1 : this.getSeledItems().length - 1;
        return this.config.maxsel && t(this.config.maxsel) && this.config.maxsel <
            b ? (alert("\u60a8\u6700\u591a\u53ef\u4ee5\u9009\u62e9" + this.config.maxsel + "\u4e2a" + this.config.title), a.checked = !1, !0) : !1
    };
    g.prototype.fnCbox_disabled = function (a, b) {
        for (var c = this.div.getElementsByTagName("input"), d = 0; d < c.length; d++)
            if (c[d].value === a)
                c[d].disabled = b
    };
    g.prototype.fnCbox_checked = function (a, b) {
        for (var c = this.div.getElementsByTagName("input"), d = 0; d < c.length; d++)
            if (c[d].value === a)
                c[d].checked = b
    };
    g.prototype.fnClickOk = function () {
        for (var a = this.getSeledItems(), b = "", c = "", d = 0; d < a.length; d++)
            b +=
                (b == "" ? "" : i.dataSepa) + a[d].getAttribute("val"), c += (c == "" ? "" : i.textSepa) + a[d].getAttribute("iname");
        this.hidden.value = b;
        this.shidden.value = c || this.config.title;
        this.shidden.title = c;
        this.fnClickClose();
        return !1
    };
    g.prototype.isNotSelectedSub = function (a) {
        return (i.dataSepa + this.shidden.value + i.dataSepa).indexOf(i.dataSepa + a + i.dataSepa) < 0
    };
    g = zlzp.PopupJobTypeName = function (a, b, c, d) {
        this.shidden = d.shidden;
        this.sdata = d.sdata;
        this.sdivWidth = d.swidth;
        d.noAllBtn = d.noAllBtn || !1;
        this.hasSeledArea = d.hasSeledArea;
        q(this, a, b, c, d || {})
    };
    y(g, s);
    g.prototype.fnClickAll = function () {
        q(this, "fnClickAll");
        this.shidden.value = "";
        if (this.subdiv)
            this.subdiv.flagClose = !0, this.hideSubdiv();
        return !1
    };
    g.prototype.fnClickClose = function () {
        q(this, "fnClickClose");
        if (this.subdiv)
            this.subdiv.flagClose = !0, this.hideSubdiv();
        this.onClose();
        return !1
    };
    g.prototype.genHTML = function () {
        var a = '<table cellspacing="0" cellpadding="0" border="0" width="100%" id="jobTab">', b = this.dataArr || this.data.split(e.itemSepa), c, d = -1, f = -1, g = -1, n, j = !0;
        for (c =
            0; c < b.length; c++)
            if (n = null, B(b[c]) ? n = b[c] : C(b[c]) && b[c] != "" && (n = b[c].split(e.dataSepa)), n !== null) {
                j = this.isNotSelected(n[0]);
                if (d != n[2]) {
                    if (d != -1) {
                        for (; f % this.col < this.col - 1;)
                            a += "<td></td>", ++f % this.col == this.col - 1 && (a += "</tr>");
                        a += "</table></td></tr>"
                    }
                    d = n[2];
                    g++;
                    a += '<tr class="zebraCol' + g % 2 + '"><td class="leftClass jobtypeLCla" nowrap="nowrap" valign="middle">' + dataHandle.getNameById(jobtypeClass, d) + '</td><td class="jobtypeItems"><table cellspacing="0" cellpadding="0" border="0" width="100%">'
                }
                f++;
                f % this.col == 0 &&
                    (a += "<tr>");
                a += this.genItemHTML(j, n);
                f % this.col == this.col - 1 && (a += "</tr>")
            }
        a += '</table></td></tr></table><div class="clear"></div>';
        this.div.cb.innerHTML = a
    };
    g.prototype.genItemHTML = function (a, b) {
        return '<td width="' + this.cellW + '" class="blurItem" onmouseover="zlzp.PopupDiv.allIns[\'' + this.id + "'].fnMOverJobtype(this,'" + b[0] + "')\" onmouseout=\"zlzp.PopupDiv.allIns['" + this.id + '\'].fnMOutJobtype(this)"><span class="' + (a ? "availItem" : "seledAvailItem") + '" onclick="zlzp.PopupDiv.allIns[\'' + this.id + "'].fnPopupChildren(this,['" +
            b[0] + "','" + b[1] + '\'])" title="' + b[1] + '">' + b[1] + "</span></td>"
    };
    g.prototype.fnMOverJobtype = function (a, b) {
        e.fnMOver(a);
        this.subdiv && this.subdiv.state == "open" && this.subdiv.p && this.subdiv.p[0] == b && (this.subdiv.flagClose = !1)
    };
    g.prototype.fnMOutJobtype = function (a) {
        e.fnMOut(a);
        this.fnMouOutSubdiv()
    };
    g.prototype.fnPopupChildren = function (a, b) {
        var c = this;
        c.buildSubTitle(a, b, 10);
        if (!c.subdiv || !(c.subdiv.state == "open" && c.subdiv.p[0] == b[0])) {
            if (!c.subdiv)
                c.subdiv = e.buildSubdiv(c, "sPopupDivSubJobname"), c.moversd =
                    function () {
                        c.fnMouOverSubdiv()
                    }, c.moutsd = function () {
                        c.fnMouOutSubdiv()
                    }, k(c.subdiv, "mouseover", c.moversd), k(c.subdiv, "mouseout", c.moutsd);
            c.subdiv.flagClose = !1;
            var d = a.parentNode;
            if (c.subdiv.p != b) {
                c.subdiv.p = b;
                if (c.subdiv.trig && c.subdiv.trig != d)
                    c.subdiv.trig.className = "blurItem";
                c.subdiv.trig = d;
                c.subdiv.innerHTML = c.genSubdivHTML()
            }
            d = c.fixXYByTrig();
            c.showSubdiv(d)
        }
    };
    g.prototype.fixXYByTrig = function () {
        var a = this.div.x + this.div.offsetWidth, b = this.div.y + this.div.offsetHeight, c = this.sdivWidth, d = this.subdiv.offsetHeight,
            e = u(this.subdiv.trig), f = e.x, e = e.y + this.subdiv.trig.offsetHeight, g = "sPopupDiv", j = "", j = this.subdiv.trig.offsetWidth, i = this.subdiv.trig.offsetHeight;
        f + c > a ? (f = f + j - c - 2 - 2, g += "Right", j = j + 4 - 400 + "px") : (g += "Left", j = j - 4 + "px");
        if (e + d > b)
            e = e - i - d, this.subdiv.trig.className = "focusItemBottom", g += "Bottom", e += 4, j += " bottom";
        else {
            this.subdiv.trig.className = "focusItemTop";
            g += "Top";
            e -= 2;
            if (F || I)
                e -= 2;
            j += " top"
        }
        this.subdiv.style.backgroundPosition = j;
        w(this.subdiv, "sPopupDivLeftTop");
        w(this.subdiv, "sPopupDivLeftBottom");
        w(this.subdiv, "sPopupDivRightTop");
        w(this.subdiv, "sPopupDivRightBottom");
        x(this.subdiv, g);
        return { x: f, y: e }
    };
    g.prototype.hideSubdiv = function () {
        if (this.subdiv.state == "open" && this.subdiv.flagClose && this.subdiv.trig)
            this.subdiv.trig.className = "blurItem";
        q(this, "hideSubdiv")
    };
    g.prototype.genSubdivHTML = function () {
        var a = this, b = !0;
        a.cbox.checked = !a.isNotSelected(a.cbox.value) && !a.shidden.value;
        var c = '<div class="paddingBlock"><table width="100%" cellspacing="0" cellpadding="0" border="0" class="chebox">';
        if (a.subdiv && a.subdiv.p) {
            var d = 0, f = a.config.scol || a.col;
            a.cheboxN = a.cheboxN || "c_" + a.id;
            e.getCByPid(a.sdata, a.subdiv.p[0], function (e, g) {
                var j = a.isNotSelectedSub(e);
                (j = !a.cbox.checked && j) && (b = !1);
                d % f == 0 && (c += "<tr>");
                c += '<td width="' + parseInt(100 / f) + '%" class="mOutItem" onmouseover="zlzp.PopupDiv.fnMOver(this)" onmouseout="zlzp.PopupDiv.fnMOut(this)"><label for="c_' + a.id + "_" + e + '" class="' + (j ? "noselItem" : "seledItem") + '"><input type="checkbox" name="' + a.cheboxN + '" id="c_' + a.id + "_" + e + '" value="' + e + '" iname="' +
                    g + '" onclick="zlzp.PopupDiv.allIns[\'' + a.id + "'].fnClickChebox_sub(this)\"" + (j ? "" : ' checked="checked"') + " />" + g + "</label></td>";
                d % f == f - 1 && (c += "</tr>");
                d++
            });
            a.cbox.checked = b
        }
        c += "</table></div>";
        c += a.genSubDivTitleHTML();
        return c
    };
    g.prototype.genSubDivTitleHTML = function () {
        var a = "";
        this.subdiv && this.subdiv.p && (a = '<div class="sButtonBlock"><a class="orgButton" href="#" onclick="return zlzp.PopupDiv.allIns[\'' + this.id + '\'].fnClickOk_sub()">\u786e\u5b9a</a> <a class="blueButton" href="#" onclick="return zlzp.PopupDiv.allIns[\'' +
            this.id + '\'].fnClickClose_sub()">\u53d6\u6d88</a></div><div class="clear"></div>');
        return a
    };
    g.prototype.fnClickChebox_sub = function (a) {
        e.fnClickChebox(a);
        if (this.subdiv && this.subdiv.p) {
            for (var b = o("c_" + this.id + "_" + this.subdiv.p[0]), c = this.subdiv.getElementsByTagName("input"), a = [], d = 0; d < c.length; d++)
                c[d].name == this.cheboxN && a.push(c[d]);
            e.fnClickCheckbox_item(b, a)
        }
    };
    g.prototype.fnClickAll_sub = function (a) {
        if (this.subdiv && this.subdiv.p) {
            for (var b = this.subdiv.getElementsByTagName("input"), c = [], d = 0; d <
                b.length; d++)
                b[d].name == this.cheboxN && c.push(b[d]);
            e.fnClickCheckbox_all(a, c)
        }
    };
    g.prototype.fnClickOk_sub = function () {
        if (this.subdiv && this.subdiv.p) {
            for (var a = this.subdiv.getElementsByTagName("input"), b = [], c = 0; c < a.length; c++)
                a[c].name == this.cheboxN && b.push(a[c]);
            var a = o("c_" + this.id + "_" + this.subdiv.p[0]), d = "", e = "";
            if (a.checked && !this.config.acceptAll)
                this.shidden.value = "", this.showTxtOnTrigg(this.subdiv.p[1]);
            else {
                for (var c = 0, f, g; c < b.length; c++)
                    if (b[c].checked)
                        f = b[c].value, g = b[c].getAttribute("iname"),
                            d += (d == "" ? "" : i.dataSepa) + f, e += (e == "" ? "" : i.textSepa) + g;
                this.shidden.value = d
            }
            d || a.checked ? (this.hidden.value = this.subdiv.p[0], this.showTxtOnTrigg(this.subdiv.p[1] + (e == "" ? "" : "\uff1a" + e))) : (this.hidden.value = "", this.showTxtOnTrigg(this.config.title));
            this.subdiv.flagClose = !0;
            this.hideSubdiv();
            this.fnClickClose()
        }
        return !1
    };
    g.prototype.fnClickClose_sub = function () {
        this.subdiv.flagClose = !0;
        this.hideSubdiv();
        return !1
    };
    g.prototype.isNotSelectedSub = function (a) {
        return (i.dataSepa + this.shidden.value + i.dataSepa).indexOf(i.dataSepa +
            a + i.dataSepa) < 0
    };
    g = zlzp.PopupMarkCity = function (a, b, c, d) {
        this.shidden = d.shidden;
        this.sdata = d.sdata;
        this.sdivWidth = d.swidth;
        this.hasSeledArea = d.hasSeledArea;
        q(this, a, b, c, d || {})
    };
    y(g, s);
    g.prototype.initShowVal = function () {
        var a = "";
        if (this.shidden.value != "" && (a = e.idStr2txtStr(this.shidden.value, this.data), a != ""))
            this.hidden.value = a, this.complete("", a)
    };
    g.prototype.fnClickSingItem = function (a, b) {
        this.hidden.value = b;
        this.shidden.value = a;
        this.fnClickClose();
        this.complete(a, b);
        zlzp.searchjob.clearGa()
    };
    g.prototype.complete =
        function (a, b) {
            function c(a) {
                a && (a = a.urlEncode());
                return a
            }
            var d = o("markedcity"), e = o("landmark"), f = o("subway"), g, j, i, l, k = "", D = "";
            l = "";
            if (d)
                d.innerHTML = b;
            if (dMetro) {
                d = dMetro.split("@" + b + "|");
                for (i = 0; i < d.length; i++)
                    if (d[i])
                        l = d[i].indexOf("@") > -1 ? d[i].indexOf("@") : d[i].length, d[i] = d[i].slice(0, l), g = d[i].split("|"), g.length = 4, l = "mapsearchresult.ashx?ga=" + c(g[1]) + "&jl=" + c(b) + "&gr=3&gc=" + c(g[0]), g[2] === "2" ? (j !== g[0] && (j && (D += "</ul></div></div>"), D += '<div class="subway clearfix"><div class="subwayLeft">' +
                            g[0] + '</div><div class="subwayRight"><ul class="clearfix">'), D += '<li><a href="' + l + '">' + g[1] + "</a></li>", j = g[0]) : g[2] === "1" && (k += '<li><a href="' + l + '">' + g[1] + "</a></li>")
            }
            if (e)
                e.innerHTML = k;
            if (f)
                f.innerHTML = D + "</ul></div></div>", f.parentNode.style.display = D ? "block" : "none"
        };
    g.prototype.mapInit = function (a) {
        var b, c;
        if (!window.maplet)
            window.MOUSEWHEEL = !1, window.maplet = new Maplet("mapbar"), window.maplet.addControl(new MStandardControl);
        a = dCitymap.match(RegExp(a + ".*?(?=@)"));
        a[0] && (a = a[0].split("|"), b = a[1],
            c = a[2]);
        window.maplet.centerAndZoom(new MPoint(b || 116.38672, c || 39.90805), 8)
    };
    g = zlzp.PopupLandMark = function (a, b, c, d) {
        this.shidden = d.shidden;
        this.sdata = d.sdata;
        this.sdivWidth = d.swidth;
        this.hasSeledArea = d.hasSeledArea;
        d.maxsel = d.maxsel || 1;
        this.subTitleLength = 6;
        q(this, a, b, c, d || {})
    };
    y(g, s);
    g.prototype.initShowVal = function () {
    };
    g.prototype.genHTML = function () {
        this.sdata = [];
        dc = 0;
        ddc = 0;
        var a = '<div class="paddingDiv">', b = this.dataArr || this.data.split(e.itemSepa), c, d = -1, f, g = !0, i = "", j = [];
        a += '<table cellspacing="0" cellpadding="0" border="0">';
        for (c = 0; c < b.length; c++)
            f = null, B(b[c]) ? f = b[c] : C(b[c]) && b[c] != "" && (f = b[c].split(e.dataSepa)), f !== null && this.config.cityTxtInput && f[0] === this.config.cityTxtInput.value && (f[3] === "1" ? (d++ , f[0] = "", f[1] = f[2], d % this.col == 0 && (a += "<tr>"), g = this.hidden.value !== f[1], a += this.genItemHTML(g, f), d % this.col == this.col - 1 && (a += "</tr>")) : f[3] === "2" && (i && f[1] === i ? dc > 0 && this.sdata[dc - 1].push(["" + ddc++, f[2]]) : (i = f[1], this.sdata.push([["" + ddc++, f[2]]]), j.push(["" + dc, i]), dc++)));
        for (c = 0; c < j.length; c++)
            c === 0 && (a += '<tr class="spaceHoriz"><td colspan="' +
                this.col + '"></td></tr>'), c % this.col == 0 && (a += "<tr>"), g = this.shidden.value !== j[c][1] || this.hidden.value === this.config.title, a += this.genParentItemHTML(g, j[c]), c % this.col == this.col - 1 && (a += "</tr>");
        a += "</table></div>";
        this.div.cb.innerHTML = a
    };
    g.prototype.genSubdivHTML = function () {
        var a = '<div class="paddingBlock">';
        if (this.subdiv && this.subdiv.p) {
            var b = 0;
            this.cheboxN = this.cheboxN || "c_" + this.id;
            for (var c = this.sdata[this.subdiv.p[0]]; b < c.length; b++) {
                var d = c[b][0], e = c[b][1], f = this.shidden.value !== this.subdiv.p[1] ||
                    this.hidden.value !== e;
                a += '<span style="width:160px;" class="subCboxItem mOutItem" onmouseover="zlzp.PopupDiv.fnMOver(this)" onmouseout="zlzp.PopupDiv.fnMOut(this)">';
                a += this.genItem(d, e, "sub", f);
                a += "</span>"
            }
        }
        a += '<div class="clear"></div></div>';
        return a
    };
    g.prototype.fnClickSingItem = function (a, b) {
        this.hidden.value = b;
        if (this.subdiv)
            this.shidden.value = this.shidden && this.subdiv.p && this.isSubwayStation(a) ? this.subdiv.p[1] : "", this.subdiv.flagClose = !0, this.hideSubdiv();
        this.fnClickClose()
    };
    g.prototype.isSubwayStation =
        function (a) {
            if (this.sdata)
                for (var b = 0; b < this.sdata.length; b++)
                    for (var c = 0; c < this.sdata[b].length; c++)
                        if (this.sdata[b][c][0] === a)
                            return !0;
            return !1
        };
    k(window, "resize", e.fixPopupDivMask);
    k(document, "click", e.fnClickBody);
    k(window, "load", e.fixIEBack);
    zlzp.fnShowMoreCity = function () {
        var a = o("moreCityTrig");
        if (a)
            a.className = "org more opened";
        var a = u(o("ctt")), b = o("light1"), c = o("fade");
        f(b, "top", a.y + 160 + "px");
        f(b, "left", a.x + "px");
        f(b, "display", "block");
        f(c, "display", "block")
    };
    zlzp.cityChannel = function () {
        function a(a) {
            for (var b =
                i[a], c = o("cityList"), d = '<span>\u57ce\u5e02\u9891\u9053</span><ul><li><a href="http://www.zhaopin.com/' + b[0] + '/" onmousedown="return AdsClick(121115223,\'' + b[0] + '\')" class="hl">' + a + "</a></li>", a = b[1].split("|"), b = 0; b < a.length; b++)
                e.getCById(dCity, a[b], function (a, b) {
                    a == "749" && (b = j);
                    a == "773" && (b = k);
                    if (i[b]) {
                        var c = i[b][0];
                        d += '<li><a href="http://www.zhaopin.com/' + c + '/" onmousedown="return AdsClick(121115223,\'' + c + "')\">" + b + "</a></li>"
                    }
                });
            d += "</u>";
            c.innerHTML = d
        }
        function b(a) {
            var b = "";
            a == j ? (a = l[j], b =
                "749;750;751") : a == k ? (a = l[k], b = "779;780;768;766;769;773;772") : e.getCByTxt(dCity, a.replace(/;/g, "|"), function (a) {
                    b += (b == "" ? "" : ";") + a;
                    return ""
                });
            var c = (new Date((new Date).getTime() + 2592E6)).toGMTString();
            document.cookie = "LastCity=" + a.urlEncode().toLowerCase() + "; expires=" + c + "; path=/; domain=zhaopin.com";
            document.cookie = "LastCity%5Fid=" + b.urlEncode().toLowerCase() + "; expires=" + c + "; path=/; domain=zhaopin.com"
        }
        var c = zlzp.searchjob.f_s[zlzp.searchjob.l.h_n], d = "", f = "", g = R("LastCity"), i = {
            "\u5317\u4eac": ["beijing",
                "538|763|765|531|600|599|702|565|568|566|570|567|704|708|707", 1], "\u4e0a\u6d77": ["shanghai", "530|763|765|635|653|664|639|654|641|645|655|637|656|636|638", 1], "\u6df1\u5733": ["shenzhen", "530|538|763|682|681|749|780|769|779|768|766|773|822|697|685", 1], "\u5e7f\u5dde": ["guangzhou", "530|538|765|682|681|749|779|768|769|780|766|773|822|697|685", 1], "\u5929\u6d25": ["tianjin", "530|538|763|765|565|600|599|702|703|570|566|567|568|704|708", 1], "\u6b66\u6c49": ["wuhan", "530|538|763|765|664|749|551|635|697|645|636|638|641|740|665",
                    1], "\u897f\u5b89": ["xian", "530|538|763|765|736|719|801|551|702|565|576|864|806|890", 1], "\u6d4e\u5357": ["jinan", "530|538|763|765|703|531|565|719|721|637|704|711|714|707|708", 1], "\u6210\u90fd": ["chengdu", "530|538|763|765|551|719|854|736|749|721|740|822|691|697|721", 1], "\u5357\u4eac": ["nanjing", "530|538|763|765|639|664|653|665|654|656|658|641|638|636|637", 1], "\u957f\u6625": ["changchun", "530|538|763|765|599|600|622|531|702|614|568|627|570|566|567", 1], "\u6c88\u9633": ["shenyang", "530|538|763|765|613|600|622|531|702|614|627|567|568|570|566",
                        1], "\u9752\u5c9b": ["qingdao", "530|538|763|765|702|531|565|719|708|704|711|714|707|568|721", 1], "\u82cf\u5dde": ["suzhou", "530|538|763|765|664|653|635|656|636|638|658|654|641|645|655", 1], "\u5927\u8fde": ["dalian", "530|538|763|765|613|599|622|531|702|614|627|567|568|570|566", 1], "\u54c8\u5c14\u6ee8": ["haerbin", "530|538|763|765|599|600|613|531|702|614|627|567|568|570|566", 1], "\u676d\u5dde": ["hangzhou", "530|538|763|765|635|639|655|658|656|654|636|638|641|645|664", 1], "\u90d1\u5dde": ["zhengzhou", "530|538|763|765|702|703|635|664|854|721|704|711|714|707|708",
                            1], "\u91cd\u5e86": ["chongqing", "530|538|763|765|801|749|736|854|664|635|645|806|822|740|831", 1], "\u957f\u682a\u6f6d": ["changzhutan", "530|538|763|765|736|551|801|740|691|697|822|806|768|779|691", 1], "\u798f\u5dde": ["fuzhou", "530|538|763|765|682|749|685|780|769|766|773|779|768|697|691", 1], "\u53a6\u95e8": ["xiamen", "530|538|763|765|681|749|685|780|769|766|773|779|768|697|691", 1], "\u77f3\u5bb6\u5e84": ["shijiazhuang", "530|538|763|765|531|600|599|702|703|707|566|570|568|567|704", 1], "\u5408\u80a5": ["hefei",
                                "530|538|763|765|635|639|653|665|637|645|641|638|636|656|658", 1], "\u5510\u5c71": ["tangshan", "530|538|763|765|565|531|600|599|702|703|570|568|567|704|711", 1], "\u4fdd\u5b9a": ["baoding", "530|538|763|765|531|565|600|599|702|703|566|568|567|704|711", 1], "\u90af\u90f8": ["handan", "530|538|763|765|531|565|600|599|702|703|566|570|567|704|711", 1], "\u79e6\u7687\u5c9b": ["qinhuangdao", "530|538|763|765|531|565|600|599|702|703|566|570|568|704|711", 1], "\u5409\u6797": ["jilin", "530|538|763|765|613|599|600|622|531|702|627|567|568|570|566",
                                    1], "\u5927\u5e86": ["daqing", "530|538|763|765|622|600|613|599|531|702|614|567|568|570|566", 1], "\u6dc4\u535a": ["zibo", "530|538|763|765|702|703|531|565|719|711|708|714|707|568|721", 1], "\u5a01\u6d77": ["weihai", "530|538|763|765|702|703|531|565|719|704|708|714|707|568|721", 1], "\u4e34\u6c82": ["linyi", "530|538|763|765|702|703|531|565|719|704|708|711|707|568|721", 1], "\u70df\u53f0": ["yantai", "530|538|763|765|702|703|531|565|719|704|708|711|714|568|721", 1], "\u6f4d\u574a": ["weifang", "530|538|763|765|702|703|531|565|719|704|707|711|714|568|721",
                                        1], "\u592a\u539f": ["taiyuan", "530|538|763|765|565|531|719|854|702|703|566|570|568|567|721", 1], "\u5609\u5174": ["jiaxing", "530|538|763|765|639|653|635|636|638|658|654|641|645|655|637", 1], "\u7ecd\u5174": ["shaoxing", "530|538|763|765|653|639|635|656|636|638|654|641|645|655|637", 1], "\u5b81\u6ce2": ["ningbo", "530|538|763|765|653|639|635|658|656|636|638|641|645|655|637", 1], "\u6e29\u5dde": ["wenzhou", "530|538|763|765|653|639|635|654|658|656|636|638|641|645|637", 1], "\u5f90\u5dde": ["xuzhou", "530|538|763|765|635|639|664|653|641|638|636|645|665|656|658",
                                            1], "\u626c\u5dde": ["yangzhou", "530|538|763|765|635|639|664|653|637|641|638|636|665|656|658", 1], "\u5357\u901a": ["nantong", "530|538|763|765|635|639|664|653|645|637|638|636|665|656|658", 1], "\u5e38\u5dde": ["changzhou", "530|538|763|765|635|639|664|653|641|645|637|636|665|656|658", 1], "\u65e0\u9521": ["wuxi", "530|538|763|765|639|664|635|653|656|638|658|654|641|645|655", 1], "\u5357\u660c": ["nanchang", "530|538|763|765|664|749|653|736|639|697|665|656|658|654|655", 1], "\u8d63\u5dde": ["ganzhou", "530|538|763|765|664|749|653|736|639|691|665|656|658|654|655",
                                                1], "\u6d1b\u9633": ["luoyang", "530|538|763|765|719|635|703|702|664|854|704|711|714|707|708", 1], "\u829c\u6e56": ["wuhu", "530|538|763|765|635|639|653|665|637|645|641|638|636|656|658", 1], "\u7ef5\u9633": ["mianyang", "530|538|763|765|801|551|854|719|736|749|721|740|822|691|697", 1], "\u5170\u5dde": ["lanzhou", "530|538|763|765|854|801|551|719|565|702|890|806|576|721", 1], "\u8d35\u9633": ["guiyang", "530|538|763|765|801|551|749|806|831|785|780|769|766|779|773", 1], "\u5357\u5b81": ["nanning", "530|538|763|765|801|551|681|780|769|766|779|773|768|831|822",
                                                    1], "\u8944\u9633": ["xiangfan", "530|538|763|765|736|664|749|551|635|665|691|697|645|636|638", 1], "\u6606\u660e": ["kunming", "530|538|763|765|801|551|749|822|806|831|785|780|769|766|779", 1], "\u4e2d\u5c71": ["zhongshan", "530|538|763|765|682|681|779|768|769|780|766|773|697|685|822", 1], "\u6c5f\u95e8": ["jiangmen", "530|538|763|765|682|681|780|779|768|766|773|697|685|822|831", 1], "\u73e0\u6d77": ["zhuhai", "530|538|763|765|682|681|769|780|779|768|773|697|685|822|831", 1], "\u73e0\u4e09\u89d2": ["zhusanjiao", "530|538|763|765|682|681|766|769|780|779|768|697|685|822|831",
                                                        1], "\u4e1c\u839e": ["dongguan", "530|538|763|765|682|681|773|766|769|780|768|697|685|822|831", 1], "\u4f5b\u5c71": ["foshan", "530|538|763|765|682|681|779|773|766|769|780|697|685|822|831", 1], "\u4e4c\u9c81\u6728\u9f50": ["wulumuqi", "530|538|763|765|854|801|551|719|565|702|864|806|576|721|568", 1], "\u6cc9\u5dde": ["quanzhou", "530|538|763|765|681|749|682|780|769|766|773|779|768|697|691", 1], "\u629a\u987a": ["fushun", "530|538|763|765|613|600|622|531|702|614|627|567|568|570|566", 1], "\u94c1\u5cad": ["tieling", "530|538|763|765|613|600|622|531|702|614|627|567|568|570|566",
                                                            1], "\u4e39\u4e1c": ["dandong", "530|538|763|765|613|600|622|531|702|614|627|567|568|570|566", 1], "\u8425\u53e3": ["yingkou", "530|538|763|765|613|600|622|531|702|614|627|567|568|570|566", 1]
        }, j = "\u957f\u682a\u6f6d", k = "\u73e0\u4e09\u89d2", l = { "\u957f\u682a\u6f6d": "\u957f\u6c99;\u682a\u6d32;\u6e58\u6f6d", "\u73e0\u4e09\u89d2": "\u4e1c\u839e;\u4e2d\u5c71;\u4f5b\u5c71;\u73e0\u6d77;\u6c5f\u95e8;\u60e0\u5dde;\u8087\u5e86" };
        if (g !== null && g != "" && g != "null" && g != "\u5168\u56fd") {
            if (g == l[j])
                d = "\u957f\u6c99", f = j;
            else if (g ==
                l[k])
                d = "\u73e0\u6d77", f = k;
            else {
                var f = g.replace(RegExp(";", "gi"), "|"), m = e.getCByTxt(dCity, f);
                m.length || (m = e.getCById(dCity, f));
                m.length && (d = m[0][1]);
                f = d
            }
            c.value = zlzp.cityChannel.city = d;
            g.indexOf(";") < 0 && (l[j].indexOf(g) > -1 && (f = j), l[k].indexOf(g) > -1 && (f = k));
            f != "" && i[f] && i[f][2] && a(f)
        } else
            ajax({
                type: "get", url: "/jobs/ajax/ip2city.aspx", onSuccess: function (d) {
                    if (d != "" && d.indexOf("|") > 0 && (d = d.split("|")[0]))
                        i[d] && i[d][2] && a(d), b(d), d == j ? d = l[j] : d == k && (d = l[k]), c.value = zlzp.cityChannel.city = d.split(";")[0]
                },
                onError: function () {
                    c.value = ""
                }, onComplete: function () {
                    zlzp.setDefTxt(c, zlzp.searchjob.c_tips)
                }, data: ""
            })
    };
    zlzp.cityChannel.city = "";
    zlzp.cityChannel.fixIEBug = function () {
        try {
            if (p && zlzp.searchjob.f_s) {
                var a = zlzp.searchjob.f_s[zlzp.searchjob.l.h_n];
                if (a) {
                    if (a.value != zlzp.cityChannel.city)
                        a.value = zlzp.cityChannel.city;
                    zlzp.searchjob.setTips()
                }
            }
        } catch (b) {
        }
    };
    if (zlzp.first) {
        for (s = 0; g = zlzp.first[s]; ++s)
            g();
        delete zlzp.first
    }
})();