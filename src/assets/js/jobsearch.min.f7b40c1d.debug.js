//'#########################################################################
//'#                            CHANGE LOG
//'#########################################################################
//'# Author      : jianhuan.weng
//'# Auditor     : jane.gu[Double Checker]
//'# Modified    : 2009-1-12 16:00
//'# Task No     : 90033 [MYZHAOPINA注册时检查用户EMAIL是否可用BUG]
//'# Requirement : [需求人-技术部 赵永江]
//'# Purpose     : 进行用户EMAIL检测提交时增加当前时间参数
//'# Scope       : My.zhaopin.com
//'# Risk        : [修改带来的潜在风险]
//'# Approved by : [ruud.zhao]
//'########################################################################
if(typeof MZ_REG=="undefined"||!MZ_REG) var MZ_REG = {};
MZ_REG.HTML_class = {
	infoboxOk : 'msg_ok',
	infoboxWarning : 'msg_warning',
	infoboxError : 'msg_error',
	infoboxHint : 'msg_hint'
}

MZ_REG.iniForm = function(formName){
	var s = this;
	s.objForm = document.forms[formName]||null;
	if(!s.objForm) return;
	s.objForm.allVarFormEle = new Array();
	var i,objFormEle,varFormEle;
	for(i=0;i<s.objForm.length;i++){
		objFormEle = s.objForm.elements[i];
		if(window[objFormEle.name]&&!window[objFormEle.name].tagName){
			varFormEle = eval(objFormEle.name);
			varFormEle.o = objFormEle;
			varFormEle.setInfobox();
			s.objForm.allVarFormEle.push(varFormEle);
//			if(varFormEle.o.getAttribute('type').toLowerCase()!='checkbox'){
//				varFormEle.o.onblur = function(){window[this.name].fnBlur();};
//				varFormEle.o.onfocus = function(){window[this.name].fnFocus();};
//			}
//			else varFormEle.o.onclick = function(){window[this.name].fnBlur();};
		}
	}
	s.checkForm = function(){
		var s = this.objForm;
		var flag = true;
		for(var i=0;i<s.allVarFormEle.length;i++){
			s.allVarFormEle[i].fnBlur();
			if(s.allVarFormEle[i].s!=0) flag=false;
		}
		return flag;
	}
}

MZ_REG.formEle = function(required,datatype,parameter,infobox,errormsg,status,combine){
	var s = this;
	s.r	= required;	
	s.d	= datatype;
	s.p	= parameter;
	s.i	= infobox;
	s.e	= errormsg;
	s.s = status;
	s.c = combine;
	s.o = null;
	switch(s.d){
		case 'email' : s.checkData = MZ_REG.checkEmail;break;
        case 'mobile':
		s.checkData = MZ_REG.checkMobileVal;
		break;
	case 'authCodeformail':
		s.checkData = MZ_REG.checkAuthCode;
		break;
		case 'password' : s.checkData = MZ_REG.checkPassword;break;
		case 'mirror' : s.checkData = MZ_REG.checkMirror;break;
		case 'checkbox' : s.checkData = MZ_REG.checkCheckbox;break;
		case 'text' : s.checkData = MZ_REG.checkText;break;
		default : break;
	}
	
	s.fnBlur = function(){
		var s = this;
		if(s.o){
			var status = s.checkData(s.o);
			s.setStatus(status);
			s.setInfobox();
		}
		else return;
	};
	s.fnFocus = function(){
		var s = this;
		if(s.o){
			var infobox = s.getInfobox();
			var status = s.getStatus();
			if(typeof status=='undefined' || status==0){
				if(s.getMsg(0)!=null){
					infobox.innerHTML = s.getMsg(0);
					infobox.className = MZ_REG.HTML_class.infoboxWarning;
				}
			}
		}
		else return;
	};
	s.setInfobox = function(){
		var s = this;
		if(s.o){
			var infobox = s.getInfobox();
			var status = s.getStatus();
			if(typeof status=='undefined' || status=='' || status == 0){
				if(s.getMsg(0)!=null) infobox.innerHTML = s.getMsg(0);
				else infobox.innerHTML = '';
				infobox.className = MZ_REG.HTML_class.infoboxHint;
			}
			else if(status==-1){
				if(s.isRequired()){
					if(s.getMsg(2)!=null) infobox.innerHTML = s.getMsg(2);
					else infobox.innerHTML = ''; 
					infobox.className = MZ_REG.HTML_class.infoboxError;
				}
				else if(!s.isRequired()){
					if(s.getMsg(0)!=null) infobox.innerHTML = s.getMsg(0);
					else infobox.innerHTML = '';
					infobox.className = MZ_REG.HTML_class.infoboxHint;
				}
			}
			else if(status==1){
				if(s.getMsg(1)!=null) infobox.innerHTML = s.getMsg(1);
				else infobox.innerHTML = '';
				infobox.className = MZ_REG.HTML_class.infoboxOk;
			}
			else if(status>1){
				if(s.getMsg(status)!=null){
					infobox.innerHTML = s.getMsg(status);
					infobox.className = MZ_REG.HTML_class.infoboxError;
				}
			}
		}
		else return;
	};
	s.isRequired = function(){
		var s = this;
		return s.r;
	};
	s.getDatatype = function(){
		var s = this;
		return s.d;
	};
	s.getInfobox = function(){
		var s = this;
		if(document.getElementById(s.i)) return document.getElementById(s.i);
		else return null;
	};
	s.getMsg = function(errorCode){
		var s = this;
		if(s.e[errorCode]) return s.e[errorCode];
		else return null;
	};
	s.getStatus = function(){
		var s = this;
		return s.s;
	};
	s.setStatus = function(v){
		var s = this;
		s.s=v;
	}
}

MZ_REG.checkText = function(obj){
	var str = obj.value;
	if(str.trim()=='') return -1;
	return 0;
}

MZ_REG.checkEmail = function(obj){
	var str = obj.value;
	if(str.trim()=='') return -1;
	if(str.length>100) return 3;
	
	
	str = str.toLowerCase();
	var strSuffix = "cc|com|edu|gov|int|net|org|biz|info|pro|name|coop|al|dz|af|ar|ae|aw|om|az|eg|et|ie|ee|ad|ao|ai|ag|at|au|mo|bb|pg|bs|pk|py|ps|bh|pa|br|by|bm|bg|mp|bj|be|is|pr|ba|pl|bo|bz|bw|bt|bf|bi|bv|kp|gq|dk|de|tl|tp|tg|dm|do|ru|ec|er|fr|fo|pf|gf|tf|va|ph|fj|fi|cv|fk|gm|cg|cd|co|cr|gg|gd|gl|ge|cu|gp|gu|gy|kz|ht|kr|nl|an|hm|hn|ki|dj|kg|gn|gw|ca|gh|ga|kh|cz|zw|cm|qa|ky|km|ci|kw|cc|hr|ke|ck|lv|ls|la|lb|lt|lr|ly|li|re|lu|rw|ro|mg|im|mv|mt|mw|my|ml|mk|mh|mq|yt|mu|mr|us|um|as|vi|mn|ms|bd|pe|fm|mm|md|ma|mc|mz|mx|nr|np|ni|ne|ng|nu|no|nf|na|za|aq|gs|eu|pw|pn|pt|jp|se|ch|sv|ws|yu|sl|sn|cy|sc|sa|cx|st|sh|kn|lc|sm|pm|vc|lk|sk|si|sj|sz|sd|sr|sb|so|tj|tw|th|tz|to|tc|tt|tn|tv|tr|tm|tk|wf|vu|gt|ve|bn|ug|ua|uy|uz|es|eh|gr|hk|sg|nc|nz|hu|sy|jm|am|ac|ye|iq|ir|il|it|in|id|uk|vg|io|jo|vn|zm|je|td|gi|cl|cf|cn";
	var regu = "^[a-z0-9][_a-z0-9\-]*([\.][_a-z0-9\-]+)*@([a-z0-9\-_]+[\.])+(" + strSuffix + ")$";
	var re = new RegExp(regu);
	if(str.search(re)==-1) return 4;
	if(str.indexOf('@yahoo.cn') >0 || str.indexOf('@yahoo.com.cn') >0) return 7;//chris.cai
	return 0;

}
MZ_REG.checkAuthCode = function(obj){
	var str = obj.value.trim();
	if (str == '' || str == '输入验证码') {
		$('#authCodeformail_error').css('display', 'block');
		changeVerCode();
		return 1; 
	}
	if ( str.length < 4 ){
		$('#authCodeformail_error').css('display', 'block');
		changeVerCode();
		return 2;
	}
		$('#authCodeformail_error').css('display', 'none');	
		return 0;
}
MZ_REG.checkMobileVal = function(obj){
	var val = obj.value.trim();
	var reMobile = /^1[3|4|5|7|8]\d{9}$/;
	if(val=='' || val=='输入11位手机号码'){    
		$('#mobile_info').css('display', 'block'); 
		       
		return 2;
	}else{
		if (reMobile.test(val)){	
			$('#mobile_info').css('display', 'none'); 		
			return 0;
		}else{
			$('#mobile_info').css('display', 'block'); 
			
			return 3;
		}
	}
}
MZ_REG.checkPassword = function(obj){
	var str = obj.value;
	var patn = /^[a-zA-Z0-9_]{6,12}$/; 
	if(str.trim()=='') return -1;
	else if(!patn.test(str)) return 3;
	return 0;
}

MZ_REG.checkMirror = function(obj){
	var v1=obj.value,v2;
	if(v1.trim()=='') return -1;
	if(!MZ_REG.getAttrValueByName(obj,"sameas")) return 0;
	v2=obj.form.elements[MZ_REG.getAttrValueByName(obj,"sameas")].value;
	if(v1 == v2) return 0;
	return 3;
}

MZ_REG.checkCheckbox = function(obj){
	var flagChecked = obj.checked;
	if(flagChecked) return 0;
	else return 2;
}

MZ_REG.getAttrValueByName = function(obj,str){
	function getAttrName(str){
		var s=str.split("=");
		return s[0];
	}
	function getAttrValue(str){
		var s=str.split("=");
		return s[1];
	}
	var para;
	if(obj.name){
		if(eval(obj.name).p) para=eval(obj.name).p;
		else return;
	}
	else return;
	var s = para.split(",");
	for(var i=0;i<s.length;i++){
		if(getAttrName(s[i]) == str){
			if(getAttrValue(s[i])) return getAttrValue(s[i]);
			else return;
		}
	}
	return;
}

String.prototype.trim = function(){
	var x=this;
	x=x.replace(/^\s*(.*)/, "$1");
    //x=x.replace(/(.*?)\s*$/, "$1");
    return x;
}

MZ_REG.checkMailByAJAX = function(mailInput){
	var varInput = window[mailInput.name]||null;
	var status = 2;
	if(varInput){
		status = varInput.checkData(varInput.o);
	}
	if((status<2 || status==7 ) && status!=-1  ){
		if(varInput){
			var infobox = window[mailInput.name].getInfobox();
			infobox.innerHTML = '正在检测E-mail是否已被注册，请稍等...';
			infobox.className = MZ_REG.HTML_class.infoboxWarning;
		}
		mailInput.form['istest'].value = 1;
		//以下由 jianhuan.weng 修改 Task No: 90033
		var data = 'email=' + ua(mailInput.value) + '&t=' + new Date().getTime();
		//以上由 jianhuan.weng 修改 Task No: 90033
		submitCallback(data,'../../loginmgr/checked_register_name.asp',MZ_REG.handleCheckMailResponse,'get');
	}
	else return;
}

MZ_REG.handleCheckMailResponse = function(success,responseText){
	var mailVarName = 'email';
	if(window[mailVarName]){
		if(success){
			var errorIndex = responseText.charAt(responseText.length-1);
			if(!isNaN(errorIndex)){
				window[mailVarName].setStatus(errorIndex);
				window[mailVarName].setInfobox();
                if(errorIndex == 1){document.getElementById("email").parentNode.className = "inputTexts" ;}
			}
		}
		else{// something went wrong with the AJAX callback
			window[mailVarName].setStatus(99);
			var infobox = window[mailVarName].getInfobox();
			infobox.innerHTML = '操作失败！请再试一次！';
			infobox.className = MZ_REG.HTML_class.infoboxError;
		}
	}
}
﻿$(document).ready(function () {
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

zlapply = {};
zlapply.searchjob = {};
sstj = "" ;
(function () {
    function log(info) {
        try {
            console.log(info)
        } catch (e) {
            alert(info)
        }
    }
    var isIE = navigator.appName.indexOf("Microsoft") > -1;
    var isIE6 = navigator.appVersion.indexOf("MSIE 6") > -1;
    var piximg = "http://sou.zhaopin.com/images/blank.gif";
    function xhr() {
        var a = null;
        try {
            a = new XMLHttpRequest
        } catch (b) {
            for (var c = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], d = 0, e; e = c[d++]; ) try {
                a = new ActiveXObject(e);
                break
            } catch (f) { }
        }
        return a
    }
    function $(id) {
        return document.getElementById(id) || null
    }
    function getUid() {
        return Math.floor(Math.random() * 2147483648).toString(36)
    }
    function getCookie(name) {
        var dc = document.cookie;
        var prefix = name + "=";
        var begin = dc.indexOf("; " + prefix);
        if (begin == -1) {
            begin = dc.indexOf(prefix);
            if (begin != 0) return null
        } else begin += 2;
        var end = document.cookie.indexOf(";", begin);
        if (end == -1) end = dc.length;
        return dc.substring(begin + prefix.length, end).replace(/\+/g, ' ').urlDecode()
    }
    function getElementsByClass(name, type, parent) {
        var r = [];
        var re = new RegExp("(^|\\s)" + name + "(\\s|$)");
        var e = (parent && parent.nodeType == 1 ? parent : document).getElementsByTagName(type || "*");
        for (var j = 0; j < e.length; j++) if (re.test(e[j].className)) r.push(e[j]);
        return r
    }
    function getStyle(ele, name) {
        if (ele.style[name]) return ele.style[name];
        else if (ele.currentStyle) return ele.currentStyle[name];
        else if (document.defaultView && document.defaultView.getComputedStyle) {
            name = name.replace(/([A-Z])/g, "-$1");
            name = name.toLowerCase();
            var s = document.defaultView.getComputedStyle(ele, "");
            return s && s.getPropertyValue(name)
        } else return null
    }
    function setStyle(ele) {
        for (var i = 1; i < arguments.length; i += 2) {
            var sName = arguments[i];
            var sValue = arguments[i + 1];
            if (sName == "opacity") setOpacity(ele, sValue);
            else {
                if (ele.style && sName in ele.style) ele.style[sName] = sValue;
                else if (sName in ele) ele[sName] = sValue
            }
        }
        return ele
    }
    function setOpacity(ele, sValue) {
        //if (isIE) ele.style.filter = (ele.style.filter || "").replace(/alpha\([^)]*\)/, "") + "alpha(opacity=" + (sValue * 100) + ")";
        //fix by chris.cai
        if(isIE6) ele.style.filter = "alpha(opacity="+(sValue*100)+")";
        else ele.style.opacity = sValue;
        return ele
    }
    function addEvent(a, b, c) {
        if (a.addEventListener) a.addEventListener(b, c, false);
        else if (a.attachEvent) a.attachEvent("on" + b, c)
    }
    function clearSelOptions(sel) {
        if (sel.options && sel.options.length) while (sel.length) sel.remove(0)
    }
    function typeOf(value) {
        var s = typeof value;
        if (s == "object") if (value) {
            if (value instanceof Array || !(value instanceof Object) && Object.prototype.toString.call(value) == "[object Array]" || typeof value["length"] == "number" && typeof value["splice"] != "undefined" && typeof value["propertyIsEnumerable"] != "undefined" && !value.propertyIsEnumerable("splice")) return "array";
            if (!(value instanceof Object) && (Object.prototype.toString.call(value) == "[object Function]" || typeof value["call"] != "undefined" && typeof value["propertyIsEnumerable"] != "undefined" && !value.propertyIsEnumerable("call"))) return "function"
        } else return "null";
        else if (s == "function" && typeof value["call"] == "undefined") return "object";
        return s
    }
    function isDef(val) {
        return val !== undefined
    }
    function isNull(val) {
        return val === null
    }
    function isDefAndNotNull(val) {
        return val != null
    }
    function isArray(val) {
        return typeOf(val) == "array"
    }
    function isArrayLike(val) {
        var type = typeOf(val);
        return type == "array" || type == "object" && typeof val.length == "number"
    }
    function isString(val) {
        return typeof val == "string"
    }
    function isBoolean(val) {
        return typeof val == "boolean"
    }
    function isNumber(val) {
        return typeof val == "number"
    }
    function isFunction(val) {
        return typeOf(val) == "function"
    }
    function isObject(val) {
        var type = typeOf(val);
        return type == "object" || type == "array" || type == "function"
    }
    function getCursorIndex(input) {
        if (!isIE) {
            function vb(a) {
                try {
                    return isNumber(a.selectionStart)
                } catch (err) {
                    return false
                }
            }
            var b = 0,
                c = 0;
            if (vb(input)) {
                b = input.selectionStart;
                c = input.selectionEnd
            }
            return b && c && b == c ? b : 0
        } else {
            var b = 0,
                c = 0;
            input = input.createTextRange();
            var d = document.selection.createRange();
            if (input.inRange(d)) {
                input.setEndPoint("EndToStart", d);
                b = input.text.length;
                input.setEndPoint("EndToEnd", d);
                c = input.text.length
            }
            return b && c && b == c ? b : 0
        }
    }
    function getCursorXY(e) {
        var e = e || window.event;
        var s = getScrollPosition();
        var x = e.pageX || e.clientX + s.x;
        var y = e.pageY || e.clientY + s.y;
        return {
            x: x,
            y: y
        }
    }
    function getXY(ele) {
        for (var x = 0,
                 y = 0; ele; ) {
            x += ele.offsetLeft;
            y += ele.offsetTop;
            ele = ele.offsetParent
        }
        return {
            x: x,
            y: y
        }
    }
    function getScrollPosition() {
        function scrollbarX() {
            if (typeof window.pageXOffset == "number") return window.pageXOffset;
            else if (document.documentElement && document.documentElement.scrollLeft) return document.documentElement.scrollLeft;
            else if (document.body && document.body.scrollLeft) return document.body.scrollLeft;
            return 0
        }
        function scrollbarY() {
            if (typeof window.pageYOffset == "number") return window.pageYOffset;
            else if (document.documentElement && document.documentElement.scrollTop) return document.documentElement.scrollTop;
            else if (document.body && document.body.scrollTop) return document.body.scrollTop;
            return 0
        }
        return {
            x: scrollbarX(),
            y: scrollbarY()
        }
    }
    function getViewportSize() {
        function viewportWidth() {
            if (typeof window.innerWidth == "number") return window.innerWidth;
            else if (document.documentElement && document.documentElement.clientWidth) return document.documentElement.clientWidth;
            else if (document.body && document.body.clientWidth) return document.body.clientWidth;
            return 0
        }
        function viewportHeight() {
            if (typeof window.innerHeight == "number") return window.innerHeight;
            else if (document.documentElement && document.documentElement.clientHeight) return document.documentElement.clientHeight;
            else if (document.body && document.body.clientHeight) return document.body.clientHeight;
            return 0
        }
        return {
            w: viewportWidth(),
            h: viewportHeight()
        }
    }
    function getPageSize() {
        return {
            w: document.body.scrollWidth,
            h: document.body.scrollHeight
        }
    }
    function fixMozScrollBarWidth() {
        var f = 0;
        if (!isIE) {
            var viewportS = getViewportSize();
            var pageS = getPageSize();
            if (viewportS.h < pageS.h) f = 21
        }
        return f
    }
    function getValByName(str, name, sp) {
        var val = "",
            j;
        if (str) {
            j = str.indexOf(sp + name);
            if (j > -1) {
                sp = str.indexOf(sp, j + 1);
                if (sp < 0) sp = str.length;
                val = str.substring(j + name.indexOf("=") + 2, sp)
            }
        }
        return val.urlDecode()
    }
    function openPopup(url, windowname, w, h) {
        var intTop = 0;
        var intLeft = 0;
        var viewportS = getViewportSize();
        var winWidth = viewportS.w;
        var winHeight = viewportS.h;
        var scrollNorY = "no";
        if (parseInt(h) == 8888) {
            w = winWidth;
            h = winHeight
        } else {
            intTop = (winHeight - parseInt(h)) / 2;
            intLeft = (winWidth - parseInt(w)) / 2;
            if (intTop < 30) intTop = 0;
            if (intLeft < 30) intLeft = 0
        }
        if (w > winWidth) {
            w = winWidth;
            scrollNorY = "yes"
        }
        if (h == 800) scrollNorY = "yes";
        else if (h > winHeight) {
            if (h == 6666) scrollNorY = "no";
            else scrollNorY = "yes";
            h = winHeight;
        }
        var windowconfig = "status=no,scrollbars=" + scrollNorY + ",top=" + intTop + ",left=" + intLeft + ",resizable=0,width=" + w + ",height=" + h;
        subwin = window.open(url, windowname, windowconfig);
        if (subwin) {
            subwin.focus();
            return subwin;
        }
    }
    String.prototype.trim = function () {
        return this.replace(/^[\s\xa0\u3000]+|[\s\xa0\u3000]+$/g, "");
    };
    String.prototype.trimLeft = function () {
        return this.replace(/^[\s\xa0\u3000]+/, "");
    };
    String.prototype.trimRight = function () {
        return this.replace(/[\s\xa0\u3000]+$/, "");
    };
    String.prototype.urlEncode = function () {
        return window.encodeURIComponent ? encodeURIComponent(this) : escape(this);
    };
    String.prototype.urlDecode = function () {
        return window.decodeURIComponent ? decodeURIComponent(this) : unescape(this);
    };
    String.prototype.realLength = function () {
        return this.replace(/[^\x00-\xff]/g, "aa").length;
    };
    function inherits(childCtor, parentCtor) {
        function tempCtor() { };
        tempCtor.prototype = parentCtor.prototype;
        childCtor.aa = parentCtor.prototype;
        childCtor.prototype = new tempCtor;
        childCtor.prototype.constructor = childCtor;
    }
    function base(me, opt_methodName) {
        var caller = arguments.callee.caller;
        if (caller.aa) return caller.aa.constructor.apply(me, Array.prototype.slice.call(arguments, 1));
        for (var args = Array.prototype.slice.call(arguments, 2), foundCaller = false, ctor = me.constructor; ctor; ctor = ctor.aa && ctor.aa.constructor) if (ctor.prototype[opt_methodName] === caller) foundCaller = true;
        else if (foundCaller) return ctor.prototype[opt_methodName].apply(me, args);
        if (me[opt_methodName] === caller) return me.constructor.prototype[opt_methodName].apply(me, args);
        else throw Error("base called from a method of one name to a method of a different name")
    }
    function loadJs(a, b, c) {
        var d = arguments.callee;
        var e = d.queue || (d.queue = {});
        b = b || (((window.document.charset ? window.document.charset : window.document.characterSet) || "").match(/^(gb2312|big5|utf-8)$/gi) || "utf-8").toString().toLowerCase();
        if (a in e) {
            if (c) {
                if (e[a]) e[a].push(c);
                else c()
            }
            return
        }
        e[a] = c ? [c] : [];
        var f = window.document.createElement("script");
        f.type = "text/javascript";
        f.charset = b;
        f.onload = f.onreadystatechange = function () {
            if (f.readyState && f.readyState != "loaded" && f.readyState != "complete") return;
            f.onreadystatechange = f.onload = null;
            while (e[a].length) e[a].shift()();
            e[a] = null;
        };
        f.src = a;
        window.document.getElementsByTagName("head")[0].appendChild(f);
    }
    function regEveDomReady() {
        if (arguments.length) {
            if (arguments.length > 1) {
                for (var i = 0; i < arguments.length; i++) regOneEveDomReady(arguments[i]);
            } else regOneEveDomReady(arguments[0]);
        }
    }
    function regOneEveDomReady(fn) {
        var callFn = arguments.callee;
        if (!callFn['domReadyUtil']) {
            var userAgent = navigator.userAgent.toLowerCase();
            callFn['domReadyUtil'] = {
                browser: {
                    version: (userAgent.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1],
                    safari: /webkit/.test(userAgent),
                    opera: /opera/.test(userAgent),
                    msie: /msie/.test(userAgent) && !/opera/.test(userAgent),
                    mozilla: /mozilla/.test(userAgent) && !/(compatible|webkit)/.test(userAgent)
                },
                readyList: [],
                each: function (object, callback, args) {
                    var name, i = 0,
                        length = object.length;
                    if (args) {
                        if (length == undefined) {
                            for (name in object) if (callback.apply(object[name], args) === false) break
                        } else for (; i < length; ) if (callback.apply(object[i++], args) === false) break
                    } else {
                        if (length == undefined) {
                            for (name in object) if (callback.call(object[name], name, object[name]) === false) break
                        } else for (var value = object[0]; i < length && callback.call(value, i, value) !== false; value = object[++i]) { }
                    }
                    return object
                },
                ready: function () {
                    var dom = callFn['domReadyUtil'];
                    if (!dom.isReady) {
                        dom.isReady = true;
                        if (dom.readyList) {
                            dom.each(dom.readyList,
                                function () {
                                    this.call(document)
                                });
                            dom.readyList = null
                        }
                    }
                }
            }
        }
        var domReadyUtil = callFn['domReadyUtil']; (function () {
            if (callFn['readyBound']) return;
            callFn['readyBound'] = true;
            if (document.addEventListener && !domReadyUtil.browser.opera) document.addEventListener("DOMContentLoaded", domReadyUtil.ready, false);
            if (domReadyUtil.browser.msie && window == top) (function () {
                if (domReadyUtil.isReady) return;
                try {
                    document.documentElement.doScroll("left")
                } catch (error) {
                    setTimeout(arguments.callee, 0);
                    return
                }
                domReadyUtil.ready()
            })();
            if (domReadyUtil.browser.opera) document.addEventListener("DOMContentLoaded",
                function () {
                    if (domReadyUtil.isReady) return;
                    for (var i = 0; i < document.styleSheets.length; i++) if (document.styleSheets[i].disabled) {
                        setTimeout(arguments.callee, 0);
                        return
                    }
                    domReadyUtil.ready()
                },
                false);
            addEvent(window, "load", domReadyUtil.ready)
        })();
        if (domReadyUtil.isReady) fn.call(document, domReadyUtil);
        else domReadyUtil.readyList.push(function () {
            return fn.call(this, domReadyUtil)
        });
        return this
    }
    zlapply.charW = 6.25;
    zlapply.checkAll = function (trigger, itemname) {
        var allArr = document.getElementsByName(trigger.name);
        var itemArr = document.getElementsByName(itemname);
        for (var i = 0; i < allArr.length; i++) allArr[i].checked = trigger.checked;
        for (i = 0; i < itemArr.length; i++) itemArr[i].checked = trigger.checked
    };
    zlapply.uncheckAll = function (allname) {
        var allArr = document.getElementsByName(allname);
        for (var i = 0; i < allArr.length; i++) allArr[i].checked = allArr[i].checked & 0
    };
    zlapply.setDefTxt = function (obj, txt) {
        if (obj.value == "" || obj.value == txt) {
            obj.value = txt;
            obj.style.color = "#cccccc"
        } else obj.style.color = "#000000"
    };
    zlapply.clearDefTxt = function (obj, txt) {
        if (obj.value == txt) {
            obj.value = "";
            obj.style.color = "#000000"
        }
    };
    zlapply.searchjob = zlapply.searchjob || {};

    zlapply.searchjob.directory = "http://sou.zhaopin.com/jobs/";
    zlapply.searchjob.file_t = "jobsearch_jobtype.aspx";
    zlapply.searchjob.file_a = "jobsearch_adv.aspx";
    zlapply.searchjob.file_k = "jobsearch_keywords.aspx";
    zlapply.searchjob.file_g = "jobsearch_map.aspx";
    zlapply.searchjob.queryStrSepa = ";";
    zlapply.searchjob.f_s = document.frmSearch;
    zlapply.searchjob.f_m = document.frmMain;

    zlapply.searchjob.t = {
        h_n: "SchJobType",
        q_n: "bj"
    };
    zlapply.searchjob.st = {
        h_n: "subJobtype",
        q_n: "sj"
    };
    zlapply.searchjob.i = {
        h_n: "industry",
        q_n: "in"
    };
    zlapply.searchjob.d = {
        h_n: "PublishDate",
        q_n: "pd"
    };
    zlapply.searchjob.l = {
        h_n: "JobLocation",
        q_n: "jl"
    };
    zlapply.searchjob.k = {
        h_n: "KeyWord",
        q_n: "kw"
    };
    zlapply.searchjob.s = {
        h_n: "sortby",
        q_n: "sb",
        null_v: "0"
    };
    zlapply.searchjob.m = {
        h_n: "SearchModel",
        q_n: "sm"
    };
    zlapply.searchjob.p = {
        h_n: "page",
        q_n: "p"
    };
    zlapply.searchjob.s_f = {
        h_n: "SchSalaryFromAdv",
        q_n: "sf"
    };
    zlapply.searchjob.s_t = {
        h_n: "SchSalaryToAdv",
        q_n: "st"
    };
    zlapply.searchjob.kt = {
        h_n: "keywordtype",
        q_n: "kt",
        null_v: "1"
    };
    zlapply.searchjob.w = {
        h_n: "WorkingExp",
        q_n: "we"
    };
    zlapply.searchjob.e = {
        h_n: "EduLevel",
        q_n: "el"
    };
    zlapply.searchjob.ct = {
        h_n: "CompanyType",
        q_n: "ct"
    };
    zlapply.searchjob.cs = {
        h_n: "CompanySize",
        q_n: "cs"
    };
    zlapply.searchjob.et = {
        h_n: "EmplType",
        q_n: "et",
        null_v: "checkall"
    };
    zlapply.searchjob.ga = {
        h_n: "geo_addr",
        q_n: "ga"
    };
    zlapply.searchjob.gc = {
        h_n: "geo_cat",
        q_n: "gc"
    };
    zlapply.searchjob.gr = {
        h_n: "geo_r",
        q_n: "gr"
    };
    zlapply.searchjob.re = {
        h_n: "reg",
        q_n: "re"
    };
    zlapply.searchjob.isfilter = {
        h_n: "IsFilter",
        q_n: "isfilter"
    };
    zlapply.searchjob.fl = {
        h_n: "FilterLocation",
        q_n: "fl"
    };
    zlapply.searchjob.fjt = {
        h_n: "FilterJobTag",
        q_n: "fjt"
    };
    zlapply.searchjob.CompID = {
        h_n: "CompID",
        q_n: "CompID"
    };
    zlapply.searchjob.isadv = {
        h_n: "isadv",
        q_n: "isadv"
    };
    zlapply.searchjob.all_ele = ["t", "st", "i", "d", "l", "k", "s", "m", "p", "s_f", "s_t", "kt", "w", "e", "ct", "cs", "et", "ga", "gc", "gr", "re", "bj", "sj", "isfilter", "fl", "fjt", "CompID", "isadv"];
    zlapply.searchjob.v = {
        h_n: "vacancyid",
        q_n: "vacancyid"
    };
    zlapply.searchjob.k_tips = "@请输入关键词,例如:JAVA,销售代表,行政助理等@请输入公司名称或关键词,例如:联想,华为等@请输入职位名称或关键词,例如:会计经理,开发工程师等@";
    zlapply.searchjob.c_tips = "请输入城市名称或拼音";
    zlapply.searchjob.ga_tips = "输入地图位置";
    zlapply.searchjob.moreCondTrigID = "showmoreText";
    zlapply.searchjob.moreCondConID = "linesed";
    zlapply.searchjob.checkKeyword = function (keyword, required) {
        var keyword = keyword.trim();
        if (required) {
            if (keyword == "") {
                alert("关键词输入不能为空, 请重新输入！");
                return false
            }
        }
        if (keyword != "") {
            var regSpecialChar = new RegExp('`|~|!|@|#|\\$|%|\\^|\&|\\*|\\(|\\)|-|_|=|\\+|\\[|\\{|\\]|\\}|;|:|\'|"|\\\\|\\||,|<|\\.|>|/|\\?|。|，|《|》|、|？|；|‘|’|：|“|”|【|】|『|』|—|）|（|×|…|￥|！|～|·', 'gi');
            keyword = keyword.replace(regSpecialChar, "");
            keyword = keyword.trim();
            if (keyword == "") {
                alert("关键词输入不能全部为特殊字符，请重新输入！");
                return false
            }
        }
        return true
    };
    zlapply.searchjob.checkSalary = function (f) {
        var fObj = f || zlapply.searchjob.f_s;
        var f = fObj[zlapply.searchjob.s_f.h_n].value;
        var t = fObj[zlapply.searchjob.s_t.h_n].value;
        if (t != '' && parseInt(t) < parseInt(f)) {
            alert("月薪范围的开始值必须小于等于结束值，请重新选择！");
            return false
        } else return true
    };
    zlapply.searchjob.checkNumber = function (v, v4null, ok0, okNeg) {
        var flagNeg = okNeg && v.charAt(0) == '-';
        var numFixed = v.replace(/\D/g, '');
        if (numFixed.length>4) {
            numFixed=numFixed.substring(0,4);
        }
        numFixed = numFixed == '' ? '' : numFixed * 1;
        numFixed = flagNeg ? '-' + numFixed : numFixed;
        if (numFixed.toString() == '-0') numFixed = '-';
        if (!ok0 && numFixed.toString() == '0') numFixed = '';
        if (v4null && (numFixed == '' || numFixed == '-')) numFixed = v4null;
        return numFixed
    };
    zlapply.searchjob.fnCheckInt = function (o, e) {
        var myEve = e ? e : window.event;
        var k = myEve.keyCode;
        if (k != 8 && k != 46 && k != 37 && k != 39 && k != 36 && k != 35) o.value = zlapply.searchjob.checkNumber(o.value, null, null, false)
    };
    zlapply.searchjob.submitSearch = function (f, file, q, where) {
        var fObj = f || zlapply.searchjob.f_s;
        zlapply.searchjob.clearTips(fObj);
        var queryStr = typeof q != "undefined" && q !== null ? q : zlapply.searchjob.genSearchQueryStr(fObj);
        var url = ((file && typeof (file) == "string") ? zlapply.searchjob.directory + file : window.location.pathname) + (queryStr != "" ? "?" + queryStr : "");
        if (typeof where != "undefined" && where == "new") window.open(url);
        else window.location = url;
        return false
    };
    zlapply.searchjob.getFormEleValue = function (o, f) {
        var fObj = f || zlapply.searchjob.f_s;
        var h = fObj[o.h_n];
        var v = "";
        if (h) {
            if (/checkbox|radio/i.test(h.type || (h[0] && h[0].type))) {
                var checkedN = 0;
                if (h.length) {
                    for (var i = 0; i < h.length; i++) if (h[i].checked) {
                        v += (v == "" ? "" : zlapply.searchjob.queryStrSepa) + h[i].value;
                        checkedN++
                    }
                    if (typeof (o.null_v) != "undefined" && o.null_v == "checkall" && checkedN == h.length) v = ""
                } else {
                    if (h.checked) {
                        v = h.value;
                        if (typeof (o.null_v) != "undefined" && o.null_v == "checkall") v = ""
                    }
                }
            } else {
                v = h.value;
                v = (typeof (o.null_v) != "undefined" && v == o.null_v || zlapply.searchjob.k_tips.indexOf("@"+v+"@") > -1)? "" : v
            }

        }
        return v != "" ? "&" + o.q_n + "=" + v.urlEncode() : ""
    };
    zlapply.searchjob.genSearchQueryStr = function (f) {
        try{
            var fObj = f || zlapply.searchjob.f_s;
            var getEleVal = zlapply.searchjob.getFormEleValue;
            function genPair(n) {
                var i, h;
                return (i = zlapply.searchjob[n]) && (h = fObj[i.h_n]) ? getEleVal(i, fObj) : ""
            }
            var queryStr = "";
            for (var i = 0; i < zlapply.searchjob.all_ele.length; i++){
                queryStr += genPair(zlapply.searchjob.all_ele[i]);
            }
            return queryStr.charAt(0) == "&" ? queryStr.substring(1) : queryStr
        }catch(e){
            return '';
        }
    };
    zlapply.searchjob.initSearchQueStr = zlapply.searchjob.genSearchQueryStr();
    zlapply.searchjob.updateQueryVal = function (str, qn, qv) {
        if (str != "") {
            str = "&" + str;
            var flag = "&" + qn + "=";
            var indexF = str.indexOf(flag);
            if (indexF > -1) {
                var temp = str.split(flag);
                var postfix = temp[1].indexOf("&") > -1 ? temp[1].substring(temp[1].indexOf("&")) : "";
                str = temp[0] + (qv != "" ? flag + qv : "") + postfix
            } else str += qv != "" ? "&" + qn + "=" + qv : "";
            str = str.substring(1)
        } else if (qv != "") str = qn + "=" + qv;
        return str
    };
    zlapply.searchjob.setTips = function (f) {
        var fObj = f || zlapply.searchjob.f_s;
        var k, c, ga; (k = fObj[zlapply.searchjob.k.h_n]) && k.onfocus && zlapply.setDefTxt(k, zlapply.searchjob.k_tips); (c = fObj[zlapply.searchjob.l.h_n]) && c.onfocus && zlapply.setDefTxt(c, zlapply.searchjob.c_tips); (ga = fObj[zlapply.searchjob.ga.h_n]) && ga.onfocus && zlapply.setDefTxt(ga, zlapply.searchjob.ga_tips)
    };
    zlapply.searchjob.clearTips = function (f) {
        var fObj = f || zlapply.searchjob.f_s;
        var k, c, ga; (k = fObj[zlapply.searchjob.k.h_n]) && k.onfocus && zlapply.clearDefTxt(k, zlapply.searchjob.k_tips); (c = fObj[zlapply.searchjob.l.h_n]) && c.onfocus && zlapply.clearDefTxt(c, zlapply.searchjob.c_tips); (ga = fObj[zlapply.searchjob.ga.h_n]) && ga.onfocus && zlapply.clearDefTxt(ga, zlapply.searchjob.ga_tips)
    };
    zlapply.searchjob.clearGeo = function (f) {
        var fObj = f || zlapply.searchjob.f_s;
        var ga, gc, gr; (ga = fObj[zlapply.searchjob.ga.h_n]) && (ga.value = ""); (gc = fObj[zlapply.searchjob.gc.h_n]) && (gc.value = ""); (gr = fObj[zlapply.searchjob.gr.h_n]) && (gr.value = "")
    };
    zlapply.searchjob.clearDistrict = function (f) {
        var fObj = f || zlapply.searchjob.f_s;
        var re; (re = fObj[zlapply.searchjob.re.h_n]) && (re.value = "")
    };
    zlapply.searchjob.gotoSearch_t = function (f, distFlag) {
        var fObj = f || zlapply.searchjob.f_s;
        zlapply.searchjob.clearTips(fObj);
        var keywords = fObj[zlapply.searchjob.k.h_n].value.trim();
        var jobtype = fObj[zlapply.searchjob.t.h_n].value.trim();
        var industry = fObj[zlapply.searchjob.i.h_n].value.trim();
        if (keywords == "" && jobtype == "" && industry == "") {
            zlapply.searchjob.setTips(fObj);
            alert("请选择职位类别或行业类别，或者输入关键词！");
            return false
        }
        var city = fObj[zlapply.searchjob.l.h_n].value.trim();
        if (city == "" || city == "-1") {
            zlapply.searchjob.setTips(fObj);
            alert("请选择工作地点！");
            return false
        }
        if (!zlapply.searchjob.checkKeyword(keywords)) {
            zlapply.searchjob.setTips(fObj);
            return false
        }
        zlapply.searchjob.clearGeo();
        if (typeof (distFlag) == "undefined" || !distFlag) zlapply.searchjob.clearDistrict();
        fObj[zlapply.searchjob.p.h_n].value = "1";
        return zlapply.searchjob.submitSearch(fObj, zlapply.searchjob.file_t)
    };
    zlapply.searchjob.gotoSearch_tSEO = function (f) {
        var fObj = f || zlapply.searchjob.f_s;
        zlapply.searchjob.clearTips(fObj);
        var keywords = fObj[zlapply.searchjob.k.h_n].value.trim();
        if (!zlapply.searchjob.checkKeyword(keywords, true)) {
            return false
        }
        var city = fObj[zlapply.searchjob.l.h_n].value.trim();
        if (city == "" || city == "-1") {
            zlapply.searchjob.setTips(fObj);
            alert("请选择工作地点！");
            return false
        }
        fObj[zlapply.searchjob.p.h_n].value = "1";
        return zlapply.searchjob.submitSearch(fObj, zlapply.searchjob.file_t, null, "new")
    };
    zlapply.searchjob.gotoSearch_a = function (f) {
        var fObj = f || zlapply.searchjob.f_s;
        zlapply.searchjob.clearTips(fObj);
        var keywords = fObj[zlapply.searchjob.k.h_n].value.trim();
        var city = fObj[zlapply.searchjob.l.h_n].value.trim();
        if (city == "" || city == "-1") {
            zlapply.searchjob.setTips(fObj);
            alert("请选择工作地点！");
            return false
        }
        if (!zlapply.searchjob.checkKeyword(keywords)) {
            zlapply.searchjob.setTips(fObj);
            return false
        }
        if (!zlapply.searchjob.checkSalary(fObj)) {
            zlapply.searchjob.setTips(fObj);
            return false
        }
        fObj[zlapply.searchjob.p.h_n].value = "1";
        return zlapply.searchjob.submitSearch(fObj, zlapply.searchjob.file_a)
    };
    zlapply.searchjob.saveSearch_a = function (f) {
        var fObj = f || zlapply.searchjob.f_s;
        zlapply.searchjob.clearTips(fObj);
        var keywords = fObj[zlapply.searchjob.k.h_n].value.trim();
        var city = fObj[zlapply.searchjob.l.h_n].value.trim();
        if (city == "" || city == "-1") {
            zlapply.searchjob.setTips(fObj);
            alert("请选择工作地点！");
            return
        }
        if (!zlapply.searchjob.checkKeyword(keywords)) {
            zlapply.searchjob.setTips(fObj);
            return
        }
        if (!zlapply.searchjob.checkSalary(fObj)) {
            zlapply.searchjob.setTips(fObj);
            return
        }
        fObj.action = "http://my.zhaopin.com/jobs_nv/pre_saveSearch.asp";
        fObj.target = "_blank";
        fObj.submit()
    };
    zlapply.searchjob.gotoSearch_k = function (f) {
        var fObj = f || zlapply.searchjob.f_s;
        zlapply.searchjob.clearTips(fObj);
        var keywords = fObj[zlapply.searchjob.k.h_n].value.trim();
        if (!zlapply.searchjob.checkKeyword(keywords, true)) {
            return false
        }
        fObj[zlapply.searchjob.p.h_n].value = "1";
        fObj[zlapply.searchjob.d.h_n].value = "";
        fObj[zlapply.searchjob.w.h_n].value = "";
        fObj[zlapply.searchjob.e.h_n].value = "";
        fObj[zlapply.searchjob.ct.h_n].value = "";
        return zlapply.searchjob.submitSearch(fObj, zlapply.searchjob.file_k)
    };
    zlapply.searchjob.gotoSearch_g = function (f) {
        var fObj = f || zlapply.searchjob.f_s;
        zlapply.searchjob.clearTips(fObj);
        var city = fObj[zlapply.searchjob.l.h_n].value.trim();
        if (city == "" || city == "-1") {
            zlapply.searchjob.setTips(fObj);
            alert("请选择城市！");
            return false
        }
        var geo = fObj[zlapply.searchjob.ga.h_n].value.trim();
        if (geo == "") {
            zlapply.searchjob.setTips(fObj);
            alert("请选择地图位置！");
            return false
        }
        var keywords = fObj[zlapply.searchjob.k.h_n].value.trim();
        if (!zlapply.searchjob.checkKeyword(keywords)) {
            zlapply.searchjob.setTips(fObj);
            return false
        }
        fObj[zlapply.searchjob.p.h_n].value = "1";
        return zlapply.searchjob.submitSearch(fObj, zlapply.searchjob.file_g)
    };
    zlapply.searchjob.turnPage = function (v, f) {
        var fObj = f || zlapply.searchjob.f_s;
        var q = zlapply.searchjob.initSearchQueStr;
        q = zlapply.searchjob.updateQueryVal(q, zlapply.searchjob.p.q_n, v);
        zlapply.searchjob.submitSearch(fObj, null, q)
    };
    zlapply.searchjob.gotoPage = function (v, maxP, f) {
        if (isString(v) && v.trim() != "" && !isNaN(v) && v > 0) {
            if (typeof maxP != "undefined" && !isNull(maxP) && !isNaN(maxP) && v > maxP) v = maxP;
            var fObj = f || zlapply.searchjob.f_s;
            var sg=$("guid").value;
            var q = zlapply.searchjob.initSearchQueStr+"&sg="+sg;
            q = zlapply.searchjob.updateQueryVal(q, zlapply.searchjob.p.q_n, v);
            zlapply.searchjob.submitSearch(fObj, null, q)
        }
    };
    zlapply.searchjob.enter2Page = function (o, e, maxP) {
        var myEve = e ? e : window.event;
        var k = myEve.keyCode;
        if (k == 13) {
            zlapply.searchjob.gotoPage(o.value, maxP);
            if (myEve.preventDefault) myEve.preventDefault();
            if (myEve.stopPropagation) myEve.stopPropagation();
            myEve.cancelBubble = true;
            return myEve.returnValue = false
        }
    };
    zlapply.searchjob.sortBy = function (v, f) {
        var fObj = f || zlapply.searchjob.f_s;
        var q = zlapply.searchjob.initSearchQueStr;
        q = zlapply.searchjob.updateQueryVal(q, zlapply.searchjob.p.q_n, 1);
        q = zlapply.searchjob.updateQueryVal(q, zlapply.searchjob.s.q_n, v);
        zlapply.searchjob.submitSearch(fObj, null, q)
    };
    zlapply.searchjob.setSearchModel = function (v, f) {
        var fObj = f || zlapply.searchjob.f_s;
        var q = zlapply.searchjob.initSearchQueStr;
        q = zlapply.searchjob.updateQueryVal(q, zlapply.searchjob.m.q_n, typeof (zlapply.searchjob.m.null_v) != "undefined" && v == zlapply.searchjob.m.null_v ? "" : v);
        zlapply.searchjob.submitSearch(fObj, null, q)
    };
    zlapply.searchjob.zoomInOut = function (v, t, f) {
        var fObj = f || zlapply.searchjob.f_s;
        var h = fObj[t];
        if (h) {
            h.value = v;
            zlapply.searchjob.clearTips(fObj);
            fObj[zlapply.searchjob.p.h_n].value = "1";
            var act = {
                "SchJobType": "bj",
                "subJobtype": "sj",
                "PublishDate": "pd",
                "WorkingExp": "we",
                "EduLevel": "el",
                "CompanyType": "ct",
                "geo_addr": "ga",
                "geo_cat": "gc"
            };
            zlapply.searchjob.dyweTrackEvent("souNav", act[t]);
            return zlapply.searchjob.submitSearch(fObj)
        }
    };
    zlapply.searchjob.dyweTrackEvent = function(category,action) {
        function ed(d,a){
            var c=encodeURIComponent;
            return c instanceof Function?(a?encodeURI(d):c(d)):escape(d);
        }
        try{
            _dywet._getTrackerByName()._trackEvent(category, action);
            try{
                _gat._getTrackerByName()._trackEvent(category, action);
            }catch(err){}
        }catch(err){
            var i=new Image(1,1);
            var e=document.location;
            i.src="http://l.zhaopin.com/track_err.gif?dywee=5("+category+"*"+action+")&dywehn="+ed(e.hostname)+"&dywep="+ed(e.pathname+e.search,true);
        }
    }
    zlapply.searchjob.hotKeywords = function (v, f, file) {
        var fObj = f || zlapply.searchjob.f_s;
        fObj[zlapply.searchjob.k.h_n].value = v;
        fObj[zlapply.searchjob.kt.h_n].value = 1;
        fObj[zlapply.searchjob.p.h_n].value = 1;
        fObj[zlapply.searchjob.d.h_n].value = "";
        fObj[zlapply.searchjob.w.h_n].value = "";
        fObj[zlapply.searchjob.e.h_n].value = "";
        fObj[zlapply.searchjob.ct.h_n].value = "";
        return zlapply.searchjob.submitSearch(fObj, file)
    };
    zlapply.searchjob.applyjob = function (qs) {
        window.open("http://my.zhaopin.com/jobseeker/req_vacancy.asp?VanID=" + qs)
    };
    zlapply.searchjob.applyjob_seo = function (qs) {
        zlapply.searchjob.applyjob(qs + "_1")
    };
    zlapply.searchjob.apply = function (q) {
        var haschecked = false;
        var ck = zlapply.searchjob.f_m[zlapply.searchjob.v.h_n];
        if (ck) {
            var ck_length = ck.length;
            var VanID = "",
                i;
            if (ck_length) {
                for (i = 0; i < ck_length; i++) {
                    if (ck[i].checked) {
                        VanID += ck[i].value + "_1" + ",";
                        if (!haschecked) haschecked = true
                    }
                }
                if (haschecked) VanID = VanID.substr(0, VanID.length - 1)
            } else {
                if (ck.checked) {
                    haschecked = true;
                    VanID = ck.value + "_1"
                }
            }
            if (!haschecked) alert("请选择职位！");
            else zlapply.searchjob.applyjob(VanID + (q && q != "" ? "&" + q : ""))
        }
    };
    zlapply.searchjob.applyOne = function (pid, q) {
        var ck = zlapply.searchjob.f_m[zlapply.searchjob.v.h_n];
        if (ck.length) for (var i = 0; i < ck.length; i++) {
            if (ck[i].value == pid) ck[i].checked = true;
            else ck[i].checked = false
        } else {
            if (!ck.checked) ck.checked = true
        }
        zlapply.searchjob.apply(q)
    };
    zlapply.searchjob.applyAll = function (q) {
        var haschecked = false;
        var ck = zlapply.searchjob.f_m[zlapply.searchjob.v.h_n];
        if (ck) {
            var ck_length = ck.length;
            var VanID = "",
                i;
            if (ck_length) {
                for (i = 0; i < ck_length; i++) {
                    if (ck[i].checked) {
                        VanID += ck[i].value + "_1" + ",";
                        if (!haschecked) haschecked = true
                    }
                }
                if (haschecked) VanID = VanID.substr(0, VanID.length - 1)
            } else {
                if (ck.checked) {
                    haschecked = true;
                    VanID = ck.value + "_1"
                }
            }
            if (!haschecked) alert("请选择职位！");
            else {
                var oldTarget = zlapply.searchjob.f_m.target;
                var oldMethod = zlapply.searchjob.f_m.method;
                var oldAction = zlapply.searchjob.f_m.action;
                zlapply.searchjob.f_m.target = "_blank";
                zlapply.searchjob.f_m.method = "post";
                zlapply.searchjob.f_m.action = "http://my.zhaopin.com/jobseeker/req_vacancy.asp?VanID=" + VanID + (q && q != "" ? "&" + q : "");
                zlapply.searchjob.f_m.submit();
                zlapply.searchjob.f_m.target = oldTarget;
                zlapply.searchjob.f_m.method = oldMethod;
                zlapply.searchjob.f_m.action = oldAction
            }
        }
    };
    zlapply.searchjob.buildBodyMask = function (flag) {
        //fix by chris.cai
        //if (!isDef(zlapply.searchjob.bodymask)) {
        jQuery('.divMask').remove();
        var div = document.createElement("div");
        div.className = "divMask";
        setStyle(div, "opacity", 0.5);
        setStyle(div, "zIndex", 10);
        setStyle(div, "width", 0);
        setStyle(div, "height", 0);
        setStyle(div, "left", 0);
        setStyle(div, "top", 0);
        setStyle(div, "visibility", "hidden");
        setStyle(div,"filter","alpha(opacity=50)"); ($("zlapply_jsc") || document.body).appendChild(div);
        zlapply.searchjob.bodymask = div;
        zlapply.searchjob.bodymask.state = "hidden";
        zlapply.searchjob.bodymask.show = function () {
            if (this.state == "hidden") {
                this.state = "visible";
                var pageS = getPageSize();
                setStyle(this, "width", pageS.w + "px");
                setStyle(this, "height", pageS.h + "px");
                setStyle(this, "visibility", "visible")
            } else zlapply.searchjob.fixBodyMask()
        };
        zlapply.searchjob.bodymask.hide = function () {
            if (this.state == "visible") {
                this.state = "hidden";
                setStyle(this, "visibility", "hidden");
                setStyle(this, "width", 0);
                setStyle(this, "height", 0)
            }
        }
        //}
        if (flag) zlapply.searchjob.bodymask.show()
    };
    zlapply.searchjob.fixBodyMask = function () {
        if (isDef(zlapply.searchjob.bodymask) && zlapply.searchjob.bodymask.state == "visible") {
            var pageS = getPageSize();
            var m = zlapply.searchjob.bodymask;
            if (parseFloat(getStyle(m, "width")) != pageS.w * 1) setStyle(m, "width", pageS.w * 1 + "px");
            if (parseFloat(getStyle(m, "height")) != pageS.h * 1) setStyle(m, "height", pageS.h * 1 + "px")
        }
    };
    zlapply.searchjob.ajaxApplyBrig0 = function (vanid, q) {
        apply({
                num: 1,
                ok: vanid,
                no: ""
            },
            q)
    };
    zlapply.searchjob.ajaxApplyBrig1 = function (vanid, q, ok) {
        apply.dyweTrackEve("applyNow", "direct");
        var data = {
            num: 1,
            ok: "",
            no: ""
        };

        if (typeof (ok) != "undefined" && ok == 0){
            data.no = vanid + "_1";
        }else {
            if(ok.length>1){
                data.ok = vanid +ok;
            }else{
                data.ok = vanid + "_1";
            }
        }
        if (data.ok == "") zlapply.searchjob.allNoPosition(data);
        else apply(data, q);

    };
    zlapply.searchjob.ajaxApplyBrig2 = function (chkbox, q,tj) {
        if(tj == "1"){sstj = "1"}
        if (chkbox) {
            var chkbox = chkbox.length ? chkbox : [chkbox];
            var form = zlapply.searchjob.f_m;
            var hidden = null;
            var arrOkNo = [];
            if (form) hidden = form.h_method;
            if (hidden && hidden.value) arrOkNo = hidden.value.split("|");
            var data = {
                num: 0,
                ok: "",
                no: ""
            };
            for (var i = 0; i < chkbox.length; i++) if (chkbox[i].checked) {
                data.num++;
                if (arrOkNo.length > i && arrOkNo[i] == 0) data.no += (data.no == "" ? "" : apply.vanSepa) + chkbox[i].value;
                else data.ok += (data.ok == "" ? "" : apply.vanSepa) + chkbox[i].value;
            }
            if (data.num == 0) alert("请选择职位");
            else apply(data, q)

        }
    };
    zlapply.searchjob.ajaxApplyBrig3 = function (type) {
        var url;
        var mStr_CompName = "";
        if (typeof (Str_CompName) != 'undefined') {
            mStr_CompName = encodeURIComponent(Str_CompName)
        }
        var queryStr = window.location.search;
        queryStr = queryStr && "&" + queryStr.substring(1);
        var f = getValByName(queryStr, "f=", "&").urlEncode();
        if (typeof (type) != 'undefined') {
            if (type == "4") {
                var mStr_ApplyUrl = "";
                if (typeof (ApplyUrl) != 'undefined') {
                    mStr_ApplyUrl = ApplyUrl.urlEncode()
                }
                var mStr_PositionExtID = "";
                if (typeof (PositionExtID) != 'undefined') {
                    mStr_PositionExtID = PositionExtID.urlEncode()
                }
                window.location = "http://search.zhaopin.com/redirect.asp?url=" + mStr_ApplyUrl + "&pa=" + mStr_PositionExtID + "&f=pi"
            } else {
                apply({
                        num: 1,
                        ok: arrVarFromASP[1],
                        no: ""
                    },
                    f == "-" ? "" : f)
            }
        } else {
            apply({
                    num: 1,
                    ok: arrVarFromASP[1],
                    no: ""
                },
                f == "-" ? "" : f)
        }
    };
    var apply = zlapply.searchjob.ajaxApply = function (data, q) {
        //反馈通D期C端修改
        var request_apply = function(){
            zlapply.searchjob.action = "apply";
            apply.buildDivFrame();
            apply.vanId = data;
            if (typeof (q) != "undefined") apply.q = q;
            apply.titleCon.innerHTML = "职位申请";
            apply.mainCon.innerHTML = apply.genHTML("5");
            apply.fixShimWH();
            zlapply.searchjob.buildBodyMask(true);
            apply.openDiv();
            apply.showMask();
            jQuery('.popupApply').css('opacity','0').show();
            var anaParStr = apply.getAnaParStr();
            //zhj 2016/02/25 start 4-1
            //由于搜索列表一次可显示60数据，但由于使用了get请求，URL的长度限制最多能传递46个职位的信息，
            //所以当一次职位职位大于40个时，分两次发送请求
            var van_id_array = apply.vanId.ok.split(','), van_id_copy = apply.vanId.ok;
            if(van_id_array.length > 40){
                if(apply.params_surplus){
                    van_id_copy = apply.params_surplus;
                }else{
                    van_id_copy = van_id_array.slice(0, 40).join(',');
                }
            }
            setTimeout(function(){
                jsonp({
                    url: apply.applynowURL,
                    data: apply.paraName.type + "=1&" + apply.paraName.jobidok + "=" + van_id_copy.urlEncode() + "&" + apply.paraName.jobidno + "=" + apply.vanId.no.urlEncode() + "&" + anaParStr + "&" + apply.paraName.feedback + "=" + (jQuery.cookie ? jQuery.cookie('JSfeedback') : ''),//反馈通D期C端修改
                    callback: "jsonp" + getUid(),
                    onSuccess: function (data) {
                        if (apply.div.state == "open" && data && apply.jsonpCallback == data["callback"] && "loginstatus" in data) {
                            switch (apply.getStatusIndex(data["loginstatus"])) {
                                case "0":
                                    zlapply.searchjob.popupLogout(data, "apply");//未登录
                                    break;
                                case "1":
                                    zlapply.searchjob.showApply(data);//未设置默认简历
                                    break;
                                case "5":
                                    zlapply.searchjob.showValidator(data);
                                    break;
                                case "6":
                                    if(apply.previousResponseData){
                                        var prevInfoArr = apply.previousResponseData.postBackInfo.split('_');
                                        var lastInfoArr = data.postBackInfo.split('_');
                                        data.postBackInfo = (Number(prevInfoArr[0]) + Number(lastInfoArr[0])) + '_' + (Number(prevInfoArr[1])+ Number(lastInfoArr[1])) + '_' + (Number(prevInfoArr[2]) + Number(lastInfoArr[2])) + '_' + (Number(prevInfoArr[3]) + Number(lastInfoArr[3]));
                                        delete apply.params_anterior;
                                        delete apply.params_surplus;
                                        delete apply.previousResponseData;
                                    }
                                    zlapply.searchjob.gotoOkPage(data);//无重复投递
                                    break;
                                case "7":
                                    if(apply.previousResponseData){
                                        delete apply.params_anterior;
                                        delete apply.params_surplus;
                                        delete apply.previousResponseData;
                                    }
                                    zlapply.searchjob.applyFail(data);
                                    break;
                            }
                        }
                    },
                    onAbort: function (callbackIndex) {
                        if (apply.div.state == "open" && apply.jsonpCallback == callbackIndex) zlapply.searchjob.showTimeout()
                    },
                    beforeCall: function () {
                        apply.jsonpCallback = this.callback
                    },
                    callbackParName: "c"
                });
            }, 0);
            //zhj end
        };
        try{
            ZPIDC.applyjob.feedBackInter(request_apply);
        }catch(e){
            request_apply();
        }
    };
    zlapply.searchjob.allNoPosition = function (data) {
        apply.buildDivFrame();
        apply.vanId = data;
        apply.titleCon.innerHTML = "职位申请";
        apply.mainCon.innerHTML = apply.genHTML("13");
        apply.fixShimWH();
        zlapply.searchjob.buildBodyMask(true);
        apply.openDiv();
        jQuery('.popupApply').css('opacity','1').show();
        jQuery('.loading','.popupApply').hide();
    };
    zlapply.searchjob.setApplyNowDefault = function (freshParent) {
        zlapply.searchjob.action = "set";
        zlapply.searchjob.freshParent = freshParent || false;
        apply.buildDivFrame();
        apply.titleCon.innerHTML = "默认简历设置";
        apply.mainCon.innerHTML = apply.genHTML("5");
        apply.fixShimWH();
        zlapply.searchjob.buildBodyMask(true);
        apply.openDiv();
        apply.showMask();
        jsonp({
            url: apply.setdefaultURL,
            data: apply.paraName.type + "=1",
            callback: "jsonp" + getUid(),
            onSuccess: function (data) {
                if (apply.div.state == "open" && data && apply.jsonpCallback == data["callback"] && "loginstatus" in data) {
                    switch (apply.getStatusIndex(data["loginstatus"])) {
                        case "0":
                            zlapply.searchjob.popupLogout(data, "set");
                            break;
                        case "1":
                            zlapply.searchjob.showSet(data);
                            break
                    }
                }
            },
            onAbort: function (callbackIndex) {
                if (apply.div.state == "open" && apply.jsonpCallback == callbackIndex) zlapply.searchjob.showTimeout()
            },
            beforeCall: function () {
                apply.jsonpCallback = this.callback
            },
            callbackParName: "c"
        })
    };
    zlapply.searchjob.popupLogout = function (data, nextType) {
        apply.dyweTrackEve("applyNow", "login");
        apply.titleCon.innerHTML = "登&nbsp;录";
        apply.mainCon.innerHTML = apply.genHTML("0", data, nextType);
        var simplaceholder = document.getElementById("simplaceholder");
        simplaceholder.onfocus = function () {
            if (simplaceholder.value == "输入手机号/邮箱") {
                simplaceholder.value = "";
                simplaceholder.style.color = "#3f419e";
            }
        };
        simplaceholder.onblur = function () {
            if (simplaceholder.value == "") {
                simplaceholder.value = "输入手机号/邮箱";
                simplaceholder.style.color = "#999";
            }
        };
        ZPIDC.applyjob.freshValidate();
        apply.fixShimWH();
        apply.hideMask();
        jQuery('.popupApply').css('opacity','100');
        apply.positionDiv()
    };
    zlapply.searchjob.checkLoginForm = function (nextType) {
        var data = ZPIDC.applyjob.getApplyLoginData(nextType);
        if (data) {
            apply.showMask();
            ZPIDC.applyjob.login(data, function(code,errmsg){
                switch(code ){
                    case '0' :
                        //反馈通D期C端修改
                       var request_apply = function(){
                            data = apply.paraName.type + "=2";
                            if (nextType == "apply") {
                                //zhj 2016/02/25 start 4-3
                                //由于搜索列表一次可显示60数据，但由于使用了get请求，URL的长度限制最多能传递46个职位的信息，
                                //所以当一次职位职位大于40个时，分两次发送请求
                                var van_id_array = apply.vanId.ok.split(','), van_id_copy = apply.vanId.ok, van_id_copy_last;
                                if(van_id_array.length > 40){
                                    van_id_copy = van_id_array.slice(0, 40).join(',');
                                    van_id_copy_last  = van_id_array.slice(40).join(',');
                                }
                                var anaParStr = apply.getAnaParStr();
                                data += "&" + apply.paraName.jobidok + "=" + van_id_copy.urlEncode()
                                   + "&" + apply.paraName.jobidno + "=" + apply.vanId.no.urlEncode()
                                   + "&" + anaParStr + "&" + apply.paraName.feedback + "=" + (jQuery.cookie ? jQuery.cookie('JSfeedback') : '');//反馈通D期C端修改
                                //zhj end
                            }
                            jsonp({
                                url: nextType == "apply" ? apply.applynowURL : apply.setdefaultURL,
                                data: data,
                                callback: "jsonp" + getUid(),
                                onSuccess: function (data) {
                                    if (apply.div.state == "open" && data && apply.jsonpCallback == data["callback"] && "loginstatus" in data) {
                                        switch (apply.getStatusIndex(data["loginstatus"])) {
                                            case "0":
                                                zlapply.searchjob.popupLogout(data, "apply");//未登录
                                                break;
                                            case "1":
                                                if (nextType == "apply") {
                                                    zlapply.searchjob.cnt(data);
                                                    zlapply.searchjob.showApply(data)
                                                } else if (nextType == "set") zlapply.searchjob.showSet(data);
                                                break;
                                            case "2":
                                            /*case "3":投递功能只有判断是否登陆，但不用判断登陆错误码
                                                zlapply.searchjob.showLoginErr("0");
                                                break;
                                            case "4":
                                                zlapply.searchjob.showLoginErr("1");
                                                break;*/
                                            case "5":
                                                zlapply.searchjob.showValidator(data);
                                                break;
                                            case "6":
                                                if(!van_id_copy_last){
                                                    zlapply.searchjob.cnt(data);
                                                    zlapply.searchjob.gotoOkPage(data);//无重复投递
                                                }else{
                                                    var data_1 = data;
                                                    var request_d_2 = apply.paraName.type + "=2" + "&" + apply.paraName.jobidok + "=" + van_id_copy_last.urlEncode()
                                                        + "&" + apply.paraName.jobidno + "=" + apply.vanId.no.urlEncode()
                                                        + "&" + anaParStr + "&" + apply.paraName.feedback + "=" + (jQuery.cookie ? jQuery.cookie('JSfeedback') : '');//反馈通D期C端修改
                                                    jsonp({
                                                        url: nextType == "apply" ? apply.applynowURL : apply.setdefaultURL,
                                                        data: request_d_2,
                                                        callback: "jsonp" + getUid(),
                                                        onSuccess: function (data) {
                                                            if (apply.div.state == "open" && data && apply.jsonpCallback == data["callback"] && "loginstatus" in data) {
                                                                switch (apply.getStatusIndex(data["loginstatus"])) {
                                                                    case "0":
                                                                        zlapply.searchjob.popupLogout(data, "apply");//未登录
                                                                        break;
                                                                    case "1":
                                                                        if (nextType == "apply") {
                                                                            zlapply.searchjob.cnt(data);
                                                                            zlapply.searchjob.showApply(data)
                                                                        } else if (nextType == "set") zlapply.searchjob.showSet(data);
                                                                        break;
                                                                    case "2":
                                                                    /*case "3":投递功能只有判断是否登陆，但不用判断登陆错误码
                                                                     zlapply.searchjob.showLoginErr("0");
                                                                     break;
                                                                     case "4":
                                                                     zlapply.searchjob.showLoginErr("1");
                                                                     break;*/
                                                                    case "5":
                                                                        zlapply.searchjob.showValidator(data);
                                                                        break;
                                                                    case "6":
                                                                        var prevInfoArr = data_1.postBackInfo.split('_');
                                                                        var lastInfoArr = data.postBackInfo.split('_');
                                                                        data.postBackInfo = (Number(prevInfoArr[0]) + Number(lastInfoArr[0])) + '_' + (Number(prevInfoArr[1])+ Number(lastInfoArr[1])) + '_' + (Number(prevInfoArr[2]) + Number(lastInfoArr[2])) + '_' + (Number(prevInfoArr[3]) + Number(lastInfoArr[3]));
                                                                        zlapply.searchjob.cnt(data);
                                                                        zlapply.searchjob.gotoOkPage(data);//无重复投递
                                                                        break;
                                                                    case "7":
                                                                        zlapply.searchjob.cnt(data);
                                                                        zlapply.searchjob.applyFail(data);
                                                                        break;
                                                                }
                                                            }
                                                        },
                                                        onAbort: function (callbackIndex) {
                                                            if (apply.div.state == "open" && apply.jsonpCallback == callbackIndex) zlapply.searchjob.showTimeout()
                                                        },
                                                        beforeCall: function () {
                                                            apply.jsonpCallback = this.callback
                                                        },
                                                        callbackParName: "c"
                                                    });
                                                };
                                                break;
                                            case "7":
                                                //zhj 2016/02/25 start 4-4
                                                if(apply.previousResponseData){
                                                    delete apply.params_anterior;
                                                    delete apply.params_surplus;
                                                    delete apply.previousResponseData;
                                                }
                                                //zhj end
                                                zlapply.searchjob.cnt(data);
                                                zlapply.searchjob.applyFail(data);
                                                break;
                                        }
                                    }
                                },
                                onAbort: function (callbackIndex) {
                                    if (apply.div.state == "open" && apply.jsonpCallback == callbackIndex) zlapply.searchjob.showTimeout()
                                },
                                beforeCall: function () {
                                    apply.jsonpCallback = this.callback
                                },
                                callbackParName: "c"
                            });
                        };
                        try{
                            ZPIDC.applyjob.feedBackInter(request_apply);
                        }catch(e){
                            request_apply();
                        };
                        //同步刷新右上角用户信息
                        ZPIDC.applyjob.LoginInHeadShowHtml();
                        break;
                    case '37' :
                        if(nextType == "apply"/* && apply.getStatusIndex(data["needpic"]) ==="y"*/){
                            var validateSty = $("validateLi").style;
                            if(validateSty.display  =="none"){
                                validateSty.display ="block";
                                $("validateErrCon").innerHTML = "";
                                $("passwordErrCon").innerHTML ="";
                            }
                        }
                        apply.hideMask();
                        break;
                    default :
                        zlapply.searchjob.showLoginErr(code,errmsg);//1 用户名密码错 2验证码错
                        break;
                }
            });
        }
        apply.positionDiv();
        apply.fixShimWH()
    };
    zlapply.searchjob.checkLoginFormCollect = function (nextType) {
        var f = document.loginForm;
        var l = f.loginname.value;
        var p = f.password.value;
        var v = f.validate.value;
        var i = f.isautologin;
        var l_html = $("loginnameErrCon");
        var p_html = $("passwordErrCon");
        var v_html = $("validateErrCon");
        var goto = true;
        if (l.trim() == "" || l.trim() == "输入手机号/邮箱") {
            l_html.innerHTML = "请输入用户名";
            goto && (goto = false)
        } else {
            l_html.innerHTML = "";
        }
        if (p.trim() == "") {
            p_html.innerHTML = "请输入密码";
            goto && (goto = false)
        } else {
            p_html.innerHTML = "";
        }
        if($("validateLi").style.display == "block"){
            if (v.trim() == "") {
                v_html.innerHTML = "请输入验证码";
                goto && (goto = false)
            } else {
                v_html.innerHTML = "";
            }
        }
        if(goto){
            nextType = nextType ? nextType : "apply";
            var data = ZPIDC.applyjob.getApplyLoginData(nextType);
            if (data) {
                apply.showMask();
                ZPIDC.applyjob.login(data, function(code,errmsg){
                    switch(code ){
                        case '0' :
                            apply.closeDiv();
                            if(zlapply.searchjob.f_m){
                                //职位列表收藏
                                zlapply.searchjob.save();
                            }else if(arrVarFromASP){
                                //职位终端页收藏
                                zlapply.searchjob.saveJobTerminalApply();
                            }
                            break;
                        case '37' :
                            if(nextType == "apply"/* && apply.getStatusIndex(data["needpic"]) ==="y"*/){
                                if($("validateLi").style.display  =="none"){
                                    $("validateLi").style.display ="block";
                                    $("validateErrCon").innerHTML = "";
                                    $("passwordErrCon").innerHTML ="";
                                }
                            }
                            apply.hideMask();
                            break ;
                        default :
                            zlapply.searchjob.showLoginErr(code,errmsg);//1 用户名密码错 2验证码错
                            break;
                    }
                });
            }
        }
        apply.positionDiv();
        apply.fixShimWH()
    };
    zlapply.searchjob.cnt = function (data) {
        var flag = getCookie("monitorlogin2");
        if (flag == "Y") return;
        function insertIframe(srcStr) {
            var iframe = document.createElement("iframe");
            iframe.frameBorder = "0";
            iframe.scrolling = "no";
            setStyle(iframe, "width", "0px");
            setStyle(iframe, "height", "0px");
            iframe.src = srcStr; ($("zlapply_jsc") || document.body).appendChild(iframe)
        }
        var srcString = "";
        var strUrlFrom = getCookie("urlfrom");
        var strUserid = data["usermasterid"];
        var strAdfcID = getCookie("adfcid");
        var strAdfbID = getCookie("adfbid");
        if (strUrlFrom == "" || strUrlFrom === null) {
            strAdfcID = "";
            strAdfbID = "";
            srcString = "http://my.zhaopin.com/MYZHAOPIN/new_register_tracking.asp";
            insertIframe(srcString)
        } else {
            if (strUrlFrom != "" && strUrlFrom != null && strAdfcID != "" && strAdfcID != null && strAdfbID != "" && strAdfbID != null) {
                strUserid = strUserid;
                srcString = "http://cnt.zhaopin.com/Market/servlet/SourceAnalyzeP?source=" + strUrlFrom + "&pid=" + strUserid + "&action=update&channelid=" + strAdfcID + "&linkid=" + strAdfbID;
                insertIframe(srcString);
                srcString = "http://my.zhaopin.com/MYZHAOPIN/new_register_tracking.asp";
                insertIframe(srcString)
            } else {
                strUserid = strUserid;
                srcString = "http://cnt.zhaopin.com/Market/servlet/SourceAnalyze?source=" + strUrlFrom + "&pid=" + strUserid + "&action=update";
                insertIframe(srcString);
                srcString = "http://my.zhaopin.com/MYZHAOPIN/new_register_tracking.asp";
                insertIframe(srcString)
            }
        }
        document.cookie = "monitorlogin2=Y; path=/; domain=zhaopin.com"
    };
    //设置默认简历
    zlapply.searchjob.showApply = function (data){
        apply.showApplyHTML(data);
        jQuery('.popupApply').css('width','420px');
        apply.hideMask();
        apply.positionDiv();
        jQuery('.popupApply').css('opacity','100');
        apply.fixShimWH();
    };
    zlapply.searchjob.showValidator = function () {
        apply.mainCon.innerHTML = (apply.vanId.no != "" ? apply.genHTML("12") : "") + apply.genHTML("9");
        jQuery('.popupApply').css('width','420px');
        ZPIDC.applyjob.applyMoreTenValidate();
        apply.hideMask();
        apply.positionDiv();
        jQuery('.popupApply').css('opacity','100');
        apply.fixShimWH()
    };
    zlapply.searchjob.gotoOkPage = function (data) {
        //var filename = location.href || "";
        //jdr=(filename.match(/(?:\?|&)r=([^&]{3})(?:&|$)/i) || ["",""])[1];
        //window.location = "http://my.zhaopin.com/jobseeker/req_vacancy_ok.asp?"+data["paravalue"]+"&jdr="+jdr+"&ref="+filename.split("?")[0].urlEncode();
        var box = jQuery('#applyOkay');
        var postBackInfo = data["postBackInfo"] ;
        var pBiarr = [] ,cont = 0 ,rapp7 = 0,rapp30 = 0,sccont = 0;
        if(postBackInfo){
            pBiarr = postBackInfo.split("_");
            cont = pBiarr[0] ;//申请总数
            rapp7 = pBiarr[1] ;//7重复投递数
            rapp30 = pBiarr[2] ;//30重复投递数
            // sccont = parseInt(pBiarr[2])+parseInt(pBiarr[3]) ;//投递成功数
            sccont = pBiarr[3] ;//投递成功数
        }
        var datastr = data["paravalue"] ;
        var arrp = datastr.split("&")[0].split(",")[0].split("=")[1].split("_");
        var exvid = arrp[0]+"_"+arrp[1] ;
        var str_subtype = datastr.substring(datastr.indexOf("subjobtype"),datastr.length).split("&")[0].split("=")[1];//第一个职位的子类名
        datastr = "exvid="+exvid +"&subtype="+str_subtype;
        if((rapp7 == 0 && rapp30 == 0) || sstj == "1"){
            jQuery('.popupApply').hide().css('opacity','1');
            jQuery('.divMask').remove();
            if (box.length===0) {
                var htm = '<div id="applyOkay" style="top:266px;left:50%;' +
                    'margin-left:-136px;text-align:center;border:3px solid #b0b0b0;width:272px;' +
                    'height:53px;background:url(http://img03.zhaopin.cn/2012/img/icon/applyOkay.png) no-repeat 83px 11px #fff;' +
                    'color:#555;z-index:1110;position:fixed;"></div>';
                if (window.XMLHttpRequest){
                    jQuery(htm).appendTo(jQuery('body'));
                } else {
                    _top = jQuery(window).scrollTop() + 266;
                    jQuery(htm).css('position','absolute').css('top',_top).appendTo(jQuery('body'));
                }
                box = jQuery('#applyOkay');
            } else {
                if (window.XMLHttpRequest){
                    jQuery(box).show();
                } else {
                    _top = jQuery(window).scrollTop() + 266;
                    jQuery(box).css('top',_top).show();
                }
            }
            ZPIDC.applyjob.feedBackWeiXin();
            box.delay(750).fadeOut();
            box.find('p').remove();
            box.text('').css({
                padding : '0px',
                height : '53px',
                'text-align' : 'center',
                'line-height' : '0px'
            });

            sstj = "" ;
        }else{
            zlapply.searchjob.gotoTjPage(cont,rapp7,rapp30,sccont,datastr) ;
        }
        jQuery('.iframeShim').remove();
    };
    //7天内重复投递
    zlapply.searchjob.gotoTjPage = function(cont,rapp7,rapp30,sccont,datastr){
        jQuery.getJSON("http://my.zhaopin.com/jobseeker/getJobListcom.asp?format=json&c=?",datastr,
            function(data){
                apply.titleCon.innerHTML = "职位申请";
                apply.mainCon.innerHTML = apply.genHTML("18");
                jQuery('.popupApply').css({'width':'575px','opacity':'1'});
                var jsonDataLength = data["count"] ;
                var jsData = data["data"] ;
                var html='';
                if(jsonDataLength>0){
                    for(var n = 0 ; n < jsonDataLength ; n++){
                        html += '<tr><td width="18"><input type="checkbox" name="vacancyokid" value="'+jsData[n].jobsID+'" /></td><td class="Jobname"><a href="'+jsData[n].jobsUrl+'" target="_blank">'+jsData[n].jobsName+'</a></td><td class="Companyname"><span title="'+jsData[n].companyName+'">'+jsData[n].companyName+'</span></td><td width="75">'+jsData[n].companyAddr+'</td></tr>' ;
                    }
                    html += '<tr><td colspan="4" class="applyynTaball"><label><input type="checkbox" name="allvacancyokid" class="checkboxAll" onclick="zlapply.checkAll(this,\'vacancyokid\')" />全选</label>&nbsp;<button class="selectall-btn" onclick="javascript:zlapply.searchjob.ajaxApplyBrig2(document.frmokMain.vacancyokid,\'ssb\',\'1\');dyweTrackEvent(\'applyNow\',\'joblist\');" type="button"></button></td></tr>' ;
                    jQuery(".applyynTab").html(html) ;
                    zlapply.checkAll(jQuery(".checkboxAll"),'vacancyokid');
                }else{jQuery(".applyyn .applyynull").hide();}
                if(cont>1){
                    if(sccont > 0){
                        jQuery(".applyyn4").show();jQuery(".mkcont").html(cont) ;jQuery(".mkrapp30").html(Number(rapp7) + Number(rapp30));
                    }else{
                        jQuery(".applyyn2").show();jQuery(".mkcont").html(cont) ;jQuery(".mkrapp7").html(Number(rapp7) + Number(rapp30)) ;
                    }
                }else{
                    // if(rapp7>0){
                        jQuery(".applyyn1").show();
                        apply.dyweTrackEve("repeatreminderwindow", "popup");
                    // }else{
                    //     jQuery(".applyyn3").show();
                    // }
                }
                apply.hideMask();
                apply.positionDiv();
                apply.fixShimWH();
                document.getElementsByName('allvacancyokid')[0] ? document.getElementsByName('allvacancyokid')[0].click() : '';
            });

    }
    apply.showtjHTML = function(data){
        var html = '' ;
    };
    zlapply.searchjob.applyFail = function (data) {
        apply.mainCon.innerHTML = apply.genHTML("10", data, false);
        apply.hideMask();
        apply.positionDiv();
        jQuery('.popupApply').css('opacity','100');
        apply.fixShimWH();
        (sstj == '1') && (sstj = "");
        apply.closeDivDelay = setTimeout(function () {
                zlapply.searchjob.ajaxApply.closeDiv()
            },
            5000)
    };
    zlapply.searchjob.showTimeout = function () {
        apply.mainCon.innerHTML = apply.genHTML("11");
        jQuery('.popupApply').css('width','420px');
        apply.hideMask();
        apply.positionDiv();
        jQuery('.popupApply').css('opacity','100');
        apply.fixShimWH()
    };
    zlapply.searchjob.setDefaultEnd = function (data, end) {
        apply.mainCon.innerHTML = apply.genHTML("8", data, end);
        jQuery('.popupApply').css('width','420px');
        apply.hideMask();
        apply.positionDiv();
        jQuery('.popupApply').css('opacity','100');
        apply.fixShimWH();
        apply.closeDivDelay = setTimeout(function () {
                zlapply.searchjob.ajaxApply.closeDiv()
            },
            5000);
        if (end && zlapply.searchjob.freshParent) window.location.reload()
    };
    zlapply.searchjob.showSet = function (data) {
        apply.showSetHTML(data);
        jQuery('.popupApply').css('width','420px');
        apply.hideMask();
        apply.positionDiv();
        jQuery('.popupApply').css('opacity','100');
        apply.fixShimWH()
    };
    zlapply.searchjob.showLoginErr = function (type,errmsg) {
        var _errorDom = $("passwordErrCon") ,
            _errorMsg = errmsg || '';
        switch (type) {
            case "38":
                _errorDom = $("validateErrCon");
                break;
        }
        _errorDom.innerHTML = _errorMsg;

        ZPIDC.applyjob.freshValidate();
        apply.hideMask();
        apply.positionDiv();
        jQuery('.popupApply').css('opacity','100');
        apply.fixShimWH()
    };
    zlapply.searchjob.showRValidErr = function () {
        var html = $("validateErrCon");
        if (html) html.innerHTML = "验证码错误";
        ZPIDC.applyjob.applyMoreTenValidate();
        apply.changeButtonTxt($(apply.applynowId), "立即申请");
        apply.hideMask();
        apply.positionDiv();
        jQuery('.popupApply').css('opacity','100');
        apply.fixShimWH()
    };
    zlapply.searchjob.showValidErr = function () {
        var html = $("validateErrCon");
        if (html) html.innerHTML = "验证码错误";
        ZPIDC.applyjob.applyMoreTenValidate();
        apply.changeButtonTxt($(apply.applynowId), "立即申请");
        apply.hideMask();
        apply.positionDiv();
        jQuery('.popupApply').css('opacity','100');
        apply.fixShimWH()
    };
    zlapply.searchjob.newResume = function () {
        window.open("http://my.zhaopin.com/myzhaopin/resume_nav.asp");
        apply.pleaseFresh(apply.tip4resume)
    };
    zlapply.searchjob.editResume = function () {
        var r = $(apply.resumeSelId);
        var l = $(apply.langSelId);
        if (r && l && apply.resumes && apply.resumes[r.value]) {
            var resume = apply.resumes[r.value];
            var ext_id = resume["resumeextid"];
            var Language_ID = l.value == "3" ? 1 : l.value;
            var Resume_ID = resume["resumeid"];
            var Version_Number = resume["version"];
            var gotowhere = resume["langscore" + (Language_ID != "2" ? "cn" : "en")];
            var url = gotowhere == "1" ? "http://my.zhaopin.com/myzhaopin/resume_preview_edit.asp?ext_id=" + ext_id + "&Language_ID=" + Language_ID + "&Resume_ID=" + Resume_ID + "&Version_Number=" + Version_Number : "http://my.zhaopin.com/myzhaopin/resume_baseinfo.asp?ext_id=" + ext_id + "&language_id=" + Language_ID + "&resume_id=" + Resume_ID + "&Version_Number=" + Version_Number;
            window.open(url)
        }
        apply.pleaseFresh(apply.tip4resume)
    };
    zlapply.searchjob.newCoverletter = function () {
        window.open("http://my.zhaopin.com/myzhaopin/job_letter.asp");
        apply.pleaseFresh(apply.tip4letter)
    };
    zlapply.searchjob.editCoverletter = function () {
        var cl = $(apply.coverletterSelId);
        if (cl && cl.value) {
            var var_id = cl.value.split("_")[0];
            var vnum = cl.value.split("_")[1];
            window.open("http://my.zhaopin.com/myzhaopin/job_letter.asp");
            apply.pleaseFresh(apply.tip4letter)
        }
    };
    zlapply.searchjob.genLangOptions = function () {
        var l = $(apply.langSelId);
        var r = $(apply.resumeSelId);
        var myOpt;
        clearSelOptions(l);
        if (r && l && apply.resumes && apply.resumes[r.value]) {
            var resume = apply.resumes[r.value]; (resume["langcn"] == "1") && (l.options[l.length] = myOpt = new Option("中文", 1, resume["defaultkey"] == "1", resume["defaultkey"] == "1"), isIE6 && resume["defaultkey"] == "1" && l.options[l.length - 1].setAttribute("selected", "selected")); (resume["langen"] == "1") && (l.options[l.length] = myOpt = new Option("英文", 2, resume["defaultkey"] == "2", resume["defaultkey"] == "2"), isIE6 && resume["defaultkey"] == "2" && l.options[l.length - 1].setAttribute("selected", "selected")); (resume["langcn"] == "1" && resume["langen"] == "1") && (l.options[l.length] = myOpt = new Option("中英文", 3, resume["defaultkey"] == "3", resume["defaultkey"] == "3"), isIE6 && resume["defaultkey"] == "3" && l.options[l.length - 1].setAttribute("selected", "selected"))
        }
        zlapply.searchjob.checkResumeScore()
    };
    zlapply.searchjob.changeCoverletter = function () {
        var s = $(apply.coverletterSelId);
        var e = $(apply.coverletterEditId);
        if (s && e) {
            if (s.value == "") setStyle(e, "display", "none");
            else setStyle(e, "display", "")
        }
    };
    zlapply.searchjob.checkResumeScore = function () {
        var txt = apply.scoreErrTxt;
        var con = $(apply.scoreErrId);
        var l = $(apply.langSelId);
        var r = $(apply.resumeSelId);
        var flag = true;
        if (con && con.nodeType == "1" && apply.resumes && apply.resumes[r.value]) {
            var resume = apply.resumes[r.value];
            if ((l.value == "1" && resume["langscorecn"] == "0") || (l.value == "2" && resume["langscoreen"] == "0") || (l.value == "3" && (resume["langscorecn"] == "0" || resume["langscoreen"] == "0"))) {
                con.innerHTML = txt;
                flag = false
            } else {
                con.innerHTML = "";
                flag = true
            }
        }
        return flag
    };
    zlapply.searchjob.applyNow = function () {
        var l = $(apply.langSelId);
        var r = $(apply.resumeSelId);
        var cl_sel = $(apply.coverletterSelId);
        var sd_chbox = $(apply.setReDeId);
        var goto = true;
        if (!zlapply.searchjob.checkResumeScore()) goto = false;
        var f = document.applyForm;
        if (f.validate && f.validate.nodeType == 1) {
            var html = $("validateErrCon");
            if (f.validate.value.trim() == "") {
                html.innerHTML = "请输入验证码";
                goto = false
            } else html.innerHTML = ""
        }
        if (goto) {
            apply.changeButtonTxt($(apply.applynowId), "简历发送中");
            apply.showMask();
            apply.dyweTrackEve("applyNow", sd_chbox.checked ? "applyDef" : "apply");
            var anaParStr = apply.getAnaParStr();
            var data = apply.paraName.type + "=3&" + apply.paraName.jobidok + "=" + apply.vanId.ok.urlEncode() + "&" + apply.paraName.jobidno + "=" + apply.vanId.no.urlEncode() + "&" + anaParStr;
            var resume = apply.resumes[r.value];
            var rv = (resume["resumeextid"] + "_" + resume["version"]).urlEncode();
            var rl = l.value.urlEncode();
            var cl = cl_sel.value.urlEncode();
            var sd = sd_chbox.checked ? "1" : "0";
            data += "&" + apply.paraName.resumev + "=" + rv + "&" + apply.paraName.resumel + "=" + rl + "&" + apply.paraName.coverletter + "=" + cl + "&" + apply.paraName.resumed + "=" + sd + ((f.validate && f.validate.nodeType == 1) ? "&" + apply.paraName.validator + "=" + f.validate.value.urlEncode() : "") + "&" + apply.paraName.feedback + "=" + (jQuery.cookie ? jQuery.cookie('JSfeedback') : '');//反馈通D期C端修改
            //zhj 2016/02/25 start 4-5
            //由于搜索列表一次可显示60数据，但由于使用了get请求，URL的长度限制最多能传递46个职位的信息，
            //所以当一次职位职位大于40个时，分两次发送请求
            var position_num_arr = apply.vanId.ok.split(',');
            if(position_num_arr.length > 40){
                if(!apply.params_anterior){
                    apply.params_anterior = position_num_arr.slice(0, 40).join(',');
                }
                if(!apply.params_surplus){
                    apply.params_surplus = position_num_arr.slice(40).join(',');
                }
                if(apply.params_anterior && !apply.previousResponseData){
                    data = apply.paraName.type + "=3&" + apply.paraName.jobidok + "=" + apply.params_anterior.urlEncode() + "&" + apply.paraName.jobidno + "=" + apply.vanId.no.urlEncode() + "&" + anaParStr;
                    data += "&" + apply.paraName.resumev + "=" + rv + "&" + apply.paraName.resumel + "=" + rl + "&" + apply.paraName.coverletter + "=" + cl + "&" + apply.paraName.resumed + "=" + sd + ((f.validate && f.validate.nodeType == 1) ? "&" + apply.paraName.validator + "=" + f.validate.value.urlEncode() : "") + "&" + apply.paraName.feedback + "=" + (jQuery.cookie ? jQuery.cookie('JSfeedback') : '');//反馈通D期C端修改
                    jsonp({
                        url: apply.applynowURL,
                        data: data,
                        callback: "jsonp" + getUid(),
                        onSuccess: function (data) {
                            if (apply.div.state == "open" && data && apply.jsonpCallback == data["callback"] && "loginstatus" in data) {
                                switch (apply.getStatusIndex(data["loginstatus"])) {
                                    case "0":
                                        zlapply.searchjob.popupLogout(data, "apply");
                                        break;
                                    case "4":
                                        zlapply.searchjob.showRValidErr();
                                        break;
                                    case "6":
                                        if(apply.params_surplus.split(',').length > 0){
                                            apply.previousResponseData = data;
                                            zlapply.searchjob.ajaxApplyBrig2(document.frmMain.vacancyid,'ssb');
                                        }else{
                                            zlapply.searchjob.gotoOkPage(data);
                                        }
                                        //zlapply.searchjob.applyNowByDefault();
                                        break;
                                    case "7":
                                        delete apply.params_anterior;
                                        delete apply.params_surplus;
                                        delete apply.previousResponseData;
                                        zlapply.searchjob.applyFail(data);
                                        break
                                }
                            }
                        },
                        onAbort: function (callbackIndex) {
                            if (apply.div.state == "open" && apply.jsonpCallback == callbackIndex) zlapply.searchjob.showTimeout()
                        },
                        beforeCall: function () {
                            apply.jsonpCallback = this.callback
                        },
                        callbackParName: "c"
                    });
                }else if(apply.params_surplus && apply.previousResponseData){
                    data = apply.paraName.type + "=3&" + apply.paraName.jobidok + "=" + apply.params_surplus.urlEncode() + "&" + apply.paraName.jobidno + "=" + apply.vanId.no.urlEncode() + "&" + anaParStr;
                    data += "&" + apply.paraName.resumev + "=" + rv + "&" + apply.paraName.resumel + "=" + rl + "&" + apply.paraName.coverletter + "=" + cl + "&" + apply.paraName.resumed + "=" + sd + ((f.validate && f.validate.nodeType == 1) ? "&" + apply.paraName.validator + "=" + f.validate.value.urlEncode() : "") + "&" + apply.paraName.feedback + "=" + (jQuery.cookie ? jQuery.cookie('JSfeedback') : '');//反馈通D期C端修改
                    jsonp({
                        url: apply.applynowURL,
                        data: data,
                        callback: "jsonp" + getUid(),
                        onSuccess: function (data) {
                            if (apply.div.state == "open" && data && apply.jsonpCallback == data["callback"] && "loginstatus" in data) {
                                switch (apply.getStatusIndex(data["loginstatus"])) {
                                    case "0":
                                        zlapply.searchjob.popupLogout(data, "apply");
                                        break;
                                    case "4":
                                        zlapply.searchjob.showRValidErr();
                                        break;
                                    case "6":
                                        if(apply.previousResponseData){
                                            var prevInfoArr = apply.previousResponseData.postBackInfo.split('_');
                                            var lastInfoArr = data.postBackInfo.split('_');
                                            data.postBackInfo = (Number(prevInfoArr[0]) + Number(lastInfoArr[0])) + '_' + (Number(prevInfoArr[1])+ Number(lastInfoArr[1])) + '_' + (Number(prevInfoArr[2]) + Number(lastInfoArr[2])) + '_' + (Number(prevInfoArr[3]) + Number(lastInfoArr[3]));
                                        }
                                        delete apply.params_anterior;
                                        delete apply.params_surplus;
                                        delete apply.previousResponseData;
                                        zlapply.searchjob.gotoOkPage(data);
                                        break;
                                    case "7":
                                        delete apply.params_anterior;
                                        delete apply.params_surplus;
                                        delete apply.previousResponseData;
                                        zlapply.searchjob.applyFail(data);
                                        break
                                }
                            }
                        },
                        onAbort: function (callbackIndex) {
                            if (apply.div.state == "open" && apply.jsonpCallback == callbackIndex) zlapply.searchjob.showTimeout()
                        },
                        beforeCall: function () {
                            apply.jsonpCallback = this.callback
                        },
                        callbackParName: "c"
                    });
                }
            }else {
                jsonp({
                    url: apply.applynowURL,
                    data: data,
                    callback: "jsonp" + getUid(),
                    onSuccess: function (data) {
                        if (apply.div.state == "open" && data && apply.jsonpCallback == data["callback"] && "loginstatus" in data) {
                            switch (apply.getStatusIndex(data["loginstatus"])) {
                                case "0":
                                    zlapply.searchjob.popupLogout(data, "apply");
                                    break;
                                case "4":
                                    zlapply.searchjob.showRValidErr();
                                    break;
                                case "6":
                                    zlapply.searchjob.gotoOkPage(data);//无重复投递
                                    break;
                                case "7":
                                    zlapply.searchjob.applyFail(data);
                                    break;
                            }
                        }
                    },
                    onAbort: function (callbackIndex) {
                        if (apply.div.state == "open" && apply.jsonpCallback == callbackIndex) zlapply.searchjob.showTimeout()
                    },
                    beforeCall: function () {
                        apply.jsonpCallback = this.callback
                    },
                    callbackParName: "c"
                })
            }
            //zhj end
        }
        apply.positionDiv();
        apply.fixShimWH()
    };
    zlapply.searchjob.applyNowByDefault = function () {
        var goto = true;
        var f = document.applyForm;
        if (f.validate && f.validate.nodeType == 1) {
            var html = $("validateErrCon");
            if (f.validate.value.trim() == "") {
                html.innerHTML = "请输入验证码";
                goto = false
            } else html.innerHTML = ""
        }
        if (goto) {
            apply.changeButtonTxt($(apply.applynowId), "简历发送中");
            apply.showMask();
            var anaParStr = apply.getAnaParStr();
            var data = apply.paraName.type + "=4&" + apply.paraName.jobidok + "=" + apply.vanId.ok.urlEncode() + "&" + apply.paraName.jobidno + "=" + apply.vanId.no.urlEncode() + "&" + anaParStr + "&" + apply.paraName.validator + "=" + f.validate.value.urlEncode();
            //zhj 2016/02/25 start 4-2
            //由于搜索列表一次可显示60数据，但由于使用了get请求，URL的长度限制最多能传递46个职位的信息，
            //所以当一次职位职位大于40个时，分两次发送请求
            var position_num_arr = apply.vanId.ok.split(',');
            if(position_num_arr.length > 40){
                if(!apply.params_anterior){
                    apply.params_anterior = position_num_arr.slice(0, 40).join(',');
                }
                if(!apply.params_surplus){
                    apply.params_surplus = position_num_arr.slice(40).join(',');
                }
                if(apply.params_anterior && !apply.previousResponseData){
                    data = apply.paraName.type + "=4&" + apply.paraName.jobidok + "=" + apply.params_anterior.urlEncode() + "&" + apply.paraName.jobidno + "=" + apply.vanId.no.urlEncode() + "&" + anaParStr + "&" + apply.paraName.validator + "=" + f.validate.value.urlEncode();
                    jsonp({
                        url: apply.applynowURL,
                        data: data,
                        callback: "jsonp" + getUid(),
                        onSuccess: function (data) {
                            if (apply.div.state == "open" && data && apply.jsonpCallback == data["callback"] && "loginstatus" in data) {
                                switch (apply.getStatusIndex(data["loginstatus"])) {
                                    case "0":
                                        zlapply.searchjob.popupLogout(data, "apply");
                                        break;
                                    case "4":
                                        zlapply.searchjob.showValidErr();
                                        break;
                                    case "6":
                                        if(apply.params_surplus.split(',').length > 0){
                                            apply.previousResponseData = data;
                                            zlapply.searchjob.ajaxApplyBrig2(document.frmMain.vacancyid,'ssb');
                                        }else{
                                            zlapply.searchjob.gotoOkPage(data);
                                        }
                                        //zlapply.searchjob.applyNowByDefault();
                                        break;
                                    case "7":
                                        delete apply.params_anterior;
                                        delete apply.params_surplus;
                                        delete apply.previousResponseData;
                                        zlapply.searchjob.applyFail(data);
                                        break
                                }
                            }
                        },
                        onAbort: function (callbackIndex) {
                            if (apply.div.state == "open" && apply.jsonpCallback == callbackIndex) zlapply.searchjob.showTimeout()
                        },
                        beforeCall: function () {
                            apply.jsonpCallback = this.callback
                        },
                        callbackParName: "c"
                    });
                }else if(apply.params_surplus && apply.previousResponseData){
                    data = apply.paraName.type + "=4&" + apply.paraName.jobidok + "=" + apply.params_surplus.urlEncode() + "&" + apply.paraName.jobidno + "=" + apply.vanId.no.urlEncode() + "&" + anaParStr + "&" + apply.paraName.validator + "=" + f.validate.value.urlEncode();
                    jsonp({
                        url: apply.applynowURL,
                        data: data,
                        callback: "jsonp" + getUid(),
                        onSuccess: function (data) {
                            if (apply.div.state == "open" && data && apply.jsonpCallback == data["callback"] && "loginstatus" in data) {
                                switch (apply.getStatusIndex(data["loginstatus"])) {
                                    case "0":
                                        zlapply.searchjob.popupLogout(data, "apply");
                                        break;
                                    case "4":
                                        zlapply.searchjob.showValidErr();
                                        break;
                                    case "6":
                                        if(apply.previousResponseData){
                                            var prevInfoArr = apply.previousResponseData.postBackInfo.split('_');
                                            var lastInfoArr = data.postBackInfo.split('_');
                                            data.postBackInfo = (Number(prevInfoArr[0]) + Number(lastInfoArr[0])) + '_' + (Number(prevInfoArr[1])+ Number(lastInfoArr[1])) + '_' + (Number(prevInfoArr[2]) + Number(lastInfoArr[2])) + '_' + (Number(prevInfoArr[3]) + Number(lastInfoArr[3]));
                                        }
                                        delete apply.params_anterior;
                                        delete apply.params_surplus;
                                        delete apply.previousResponseData;
                                        zlapply.searchjob.gotoOkPage(data);
                                        break;
                                    case "7":
                                        delete apply.params_anterior;
                                        delete apply.params_surplus;
                                        delete apply.previousResponseData;
                                        zlapply.searchjob.applyFail(data);
                                        break
                                }
                            }
                        },
                        onAbort: function (callbackIndex) {
                            if (apply.div.state == "open" && apply.jsonpCallback == callbackIndex) zlapply.searchjob.showTimeout()
                        },
                        beforeCall: function () {
                            apply.jsonpCallback = this.callback
                        },
                        callbackParName: "c"
                    });
                }
            }else{
                jsonp({
                    url: apply.applynowURL,
                    data: data,
                    callback: "jsonp" + getUid(),
                    onSuccess: function (data) {
                        if (apply.div.state == "open" && data && apply.jsonpCallback == data["callback"] && "loginstatus" in data) {
                            switch (apply.getStatusIndex(data["loginstatus"])) {
                                case "0":
                                    zlapply.searchjob.popupLogout(data, "apply");
                                    break;
                                case "4":
                                    zlapply.searchjob.showValidErr();
                                    break;
                                case "6":
                                    zlapply.searchjob.gotoOkPage(data);
                                    break;
                                case "7":
                                    zlapply.searchjob.applyFail(data);
                                    break
                            }
                        }
                    },
                    onAbort: function (callbackIndex) {
                        if (apply.div.state == "open" && apply.jsonpCallback == callbackIndex) zlapply.searchjob.showTimeout()
                    },
                    beforeCall: function () {
                        apply.jsonpCallback = this.callback
                    },
                    callbackParName: "c"
                });
            }
            //zhj end
        }
        apply.positionDiv();
        apply.fixShimWH()
    };
    zlapply.searchjob.saveDefault = function () {
        var l = $(apply.langSelId);
        var r = $(apply.resumeSelId);
        var cl = $(apply.coverletterSelId);
        if (!zlapply.searchjob.checkResumeScore()) return;
        if (r && l && apply.resumes && apply.resumes[r.value]) {
            apply.showMask();
            var needRadio = document[apply.setDefaultForm][apply.setDefaultRadio];
            var sd = "1";
            for (var i = 0; i < needRadio.length; i++) if (needRadio[i].checked) {
                sd = needRadio[i].value;
                break
            }
            if (sd == "1") {
                var resume = apply.resumes[r.value];
                var rv = (resume["resumeextid"] + "_" + resume["version"]).urlEncode();
                var cl = cl.value.urlEncode();
                var rl = l.value.urlEncode();
                var data = apply.paraName.type + "=3&" + apply.paraName.resumev + "=" + rv + "&" + apply.paraName.resumel + "=" + rl + "&" + apply.paraName.coverletter + "=" + cl + "&" + apply.paraName.resumed + "=" + sd
            } else var data = apply.paraName.type + "=3&" + apply.paraName.resumed + "=" + sd;
            jsonp({
                url: apply.setdefaultURL,
                data: data,
                callback: "jsonp" + getUid(),
                onSuccess: function (data) {
                    if (apply.div.state == "open" && data && apply.jsonpCallback == data["callback"] && "loginstatus" in data) {
                        switch (apply.getStatusIndex(data["loginstatus"])) {
                            case "0":
                                zlapply.searchjob.popupLogout(data, "set");
                                break;
                            case "5":
                                zlapply.searchjob.setDefaultEnd(data, true);
                                break;
                            case "6":
                                zlapply.searchjob.setDefaultEnd(data, false);
                                break
                        }
                    }
                },
                onAbort: function (callbackIndex) {
                    if (apply.div.state == "open" && apply.jsonpCallback == callbackIndex) zlapply.searchjob.showTimeout()
                },
                beforeCall: function () {
                    apply.jsonpCallback = this.callback
                },
                callbackParName: "c"
            })
        }
    };
    zlapply.searchjob.previewResume = function () {
        var l = $(apply.langSelId);
        var r = $(apply.resumeSelId);
        if (r && l && apply.resumes && apply.resumes[r.value]) {
            var resume = apply.resumes[r.value];
            var ext_id = resume["resumeextid"];
            var language_id = l.value == "3" ? 1 : l.value;
            var resume_id = resume["resumeid"];
            var Version_Number = resume["version"];
            var url = "http://my.zhaopin.com/myzhaopin/resume_preview.asp?ext_id=" + ext_id + "&language_id=" + language_id + "&resume_id=" + resume_id + "&Version_Number=" + Version_Number;
            openPopup(url, "previewResume", 700, 800)
        }
    };
    zlapply.searchjob.switchNeedDefault = function (r) {
        var b = $(apply.resuColeBlockId);
        if (b && b.nodeType == 1) {
            switch (r) {
                case "1":
                    setStyle(b, "display", "block");
                    break;
                case "0":
                    setStyle(b, "display", "none");
                    break
            }
            apply.positionDiv();
            apply.fixShimWH()
        }
    };
    zlapply.searchjob.freshInfo = function () {
        if (zlapply.searchjob["action"]) {
            switch (zlapply.searchjob["action"]) {
                case "set":
                    zlapply.searchjob.setApplyNowDefault();
                    break;
                case "apply":
                    if (apply.vanId) apply(apply.vanId);
                    break
            }
        }
    };
    apply.applynowURL = "http://my.zhaopin.com/v5/FastApply/resumeinfo.aspx";
    apply.setdefaultURL = "http://my.zhaopin.com/v5/FastApply/ResumeDefault.aspx";
    apply.vanSepa = ",";
    apply.resumeSelId = "resumes_sel";
    apply.langSelId = "language_sel";
    apply.scoreErrId = "resumeScore_errCon";
    apply.setReDeId = "applyinstance";
    apply.applynowId = "applynowbutton";
    apply.setDefaultForm = "defaultForm";
    apply.setDefaultRadio = "need";
    apply.scoreErrTxt = "该简历不完整，不能申请工作，请选择其他简历或进行修改。";
    apply.coverletterSelId = "letters_sel";
    apply.coverletterEditId = "letters_edit";
    apply.resuColeBlockId = "reclBlock";
    apply.tip4resume = "您的简历信息已更新，请点击刷新按钮后重新申请";
    apply.tip4letter = "您的求职信信息已更新，请点击刷新按钮后重新申请";
    apply.tip4setOk = "默认简历设置成功。<br />本窗口将在5秒后自动关闭。";
    apply.tip4timeout = "操作超时，请稍后再试。";
    apply.getTip4setErr = function (statusStr) {
        return "抱歉！默认简历设置失败，请稍后再试（" + statusStr + "）。<br />本窗口将在5秒后自动关闭。"
    };
    apply.tip4applyOk = "职位投递成功。<br />本窗口将在5秒后自动关闭。";
    apply.getTip4applyErr = function (statusStr) {
        if (statusStr=="7_Position has Down"){
            return "抱歉，您申请的职位已下线，请选择其他相似职位进行投递。<br />本窗口将在5秒后自动关闭。";
        }else{
            return "抱歉！职位投递失败，请稍后再试（"+statusStr+"）。<br />本窗口将在5秒后自动关闭。";
        }
    };
    apply.paraName = {
        type: "t",
        username: "n",
        password: "p",
        validator: "v",
        callback: "c",
        isautologin: "i",
        jobidok: "j",
        jobidno: "j2",
        resumev: "rv",
        resumel: "rl",
        coverletter: "cl",
        resumed: "sd",
        source: "so",
        subjobtype: "su",
        from: "ff",
        feedback: 'fd' //反馈通D期C端修改
    };
    apply.dyweTrackEve = function (category, action) {
        if (window["dyweTrackEvent"] && isFunction(window["dyweTrackEvent"])) window["dyweTrackEvent"](category, action)
    };
    apply.getStatusIndex = function (statusStr) {
        return statusStr.split("_")[0]
    };
    apply.getAnaParStr = function () {
        var queryStr = window.location.search;
        queryStr = queryStr && "&" + queryStr.substring(1);
        var so = getValByName(queryStr, "source=", "&").urlEncode();
        var su = getValByName(queryStr, "subjobtype=", "&").urlEncode();
        var ff = apply.q;
        return apply.paraName.source + "=" + so + "&" + apply.paraName.subjobtype + "=" + su + "&" + apply.paraName.from + "=" + ff
    };
    apply.changeButtonTxt = function (button, txt) {
        if (button && button.nodeType == 1) button.innerHTML = txt
    };
    apply.showMask = function () {
        var w = apply.mainCon.offsetWidth;
        var h = apply.mainCon.offsetHeight;
        setStyle(apply.loadCon, "width", w + "px");
        setStyle(apply.loadCon, "height", h + "px");
        setStyle(apply.loadCon, "visibility", "visible")
    };
    apply.hideMask = function () {
        setStyle(apply.loadCon, "width", "0");
        setStyle(apply.loadCon, "height", "0");
        setStyle(apply.loadCon, "visibility", "hidden")
    };
    apply.showApplyHTML = function (data) {
        apply.titleCon.innerHTML = "职位申请";
        if (data["resume"] && data["resume"].length) {
            apply.dyweTrackEve("applyNow", "selResumes");
            apply.resumes = data["resume"];
            apply.mainCon.innerHTML = (apply.vanId.no != "" ? apply.genHTML("12") : "") + apply.genHTML("1", data);
            zlapply.searchjob.genLangOptions();
            if (apply.vanId.num > 10) ZPIDC.applyjob.applyMoreTenValidate()
        } else {
            apply.resumes = [];
            apply.mainCon.innerHTML = (apply.vanId.no != "" ? apply.genHTML("12") : "") + apply.genHTML("2")
        }
    };
    apply.showSetHTML = function (data) {
        apply.titleCon.innerHTML = "默认简历设置";
        if (data["resume"] && data["resume"].length) {
            apply.dyweTrackEve("applyNow", "setDef");
            apply.resumes = data["resume"];
            apply.mainCon.innerHTML = apply.genHTML("6", data);
            zlapply.searchjob.genLangOptions();
            zlapply.searchjob.switchNeedDefault(data["defaultkey"] == "" ? "0" : "1")
        } else {
            apply.resumes = [];
            apply.mainCon.innerHTML = apply.genHTML("2")
        }
    };
    apply.pleaseFresh = function (tip) {
        apply.mainCon.innerHTML = apply.genHTML("7", null, tip);
        apply.positionDiv();
        apply.fixShimWH();
    };
    apply.genHTML = function (type, data, argu) {
        var html = "";
        switch (type) {
            case "0":
                html += "<div id=\"loginBlock\"><form name=\"loginForm\"><ul><li><label class=\"leftLabel\">用户名：<input type=\"text\" id=\"simplaceholder\" class=\"textInput\" name=\"loginname\" style=\"color:" + (data["usermastername"] ? "#3f419e" : "#999") + "\" value=\"" + (data["usermastername"] ? data["usermastername"] : "输入手机号/邮箱") + "\" maxlength=\"100\" /></label><label><input type=\"checkbox\" name=\"isautologin\" value=\"1\"" + (data["usermastername"] ? " checked=\"checked\"" : "") + " />自动登录</label></li><li class=\"tips\" id=\"loginnameErrCon\"></li><li><label class=\"leftLabel\">密<img src=\"" + piximg + "\" width=\"12\" height=\"1\" />码：<input type=\"password\" class=\"textInput\" name=\"password\" value=\"\" maxlength=\"25\" /></label><a href=\"http://passport.zhaopin.com/findpassword/email/step1\" target=\"_blank\">忘记密码</a></li><li class=\"tips\" id=\"passwordErrCon\"></li><li id=\"validateLi\" style=\"display:none\"><label class=\"leftLabel\">验证码：<input type=\"text\" class=\"textInput\" name=\"validate\" id=\"validate\" value=\"\" maxlength=\"5\" /></label><a title=\"刷新验证码\" href=\"#\" onClick=\"ZPIDC.applyjob.freshValidate();return false;\"><img align=\"absmiddle\" id=\"vimg\" alt=\"看不清？点击更换\"></a><a title=\"刷新验证码\" href=\"#\" onClick=\"ZPIDC.applyjob.freshValidate();return false;\">看不清，换一张</a></li><li class=\"tips\" id=\"validateErrCon\"></li></ul><div id=\"submitBlock\" style=\"margin: 10px 0 0 108px;width:264px;\"><div class=\"leftFBlock\"><a href=\"#\" class=\"popapplyButton\" onclick=\"zlapply.searchjob.checkLoginForm('" + argu + "');return false;\">登&nbsp;&nbsp;录</a></div><div class=\"rightFBlock\"><a href=\"http://passport.zhaopin.com/account/register\" class=\"txtLink\" target=\"_blank\" style=\"display: block; width: 164px; height: 29px; font-size: 14px; font-weight: bold; text-decoration: none; background: url('http://img02.zhaopin.cn/2012/img/ui/register_jobs.png') no-repeat scroll 0px 0px transparent; color: #3359AA;\">快速注册，申请职位</a></div><div class=\"clear\"></div></div><div class=\"greyDottedLineH\"></div></form>" +
                    '<div class="otherLogin" style="width:200px;height:19px;margin:0 auto;">' +
                    '<span data-num="0" onclick="showAndHide(event)" style="display:inline-block;padding-left:4px;color:#666;height:18px;float:left;line-height:18px;cursor: pointer">使用其他方式登录</span>' +
                    '<a class="" onclick="dyweTrackEvent(\'PCoAuthLogin\',\'wxLogin\')" href="https://passport.zhaopin.com/oauth/weixin/enter" style="display:none;width:18px;height:18px;background:url(http://img02.zhaopin.cn/2012/img/index/icon_wx.png);float:left;margin:0 4px"></a>' +
                    '<a class="" onclick="dyweTrackEvent(\'PCoAuthLogin\',\'qqLogin\')" href="https://passport.zhaopin.com/oauth/qq/enter" style="display:none;width:18px;height:18px;background:url(http://img02.zhaopin.cn/2012/img/index/icon_qq.png);float:left;margin:0 4px"></a>' +
                    '<a class="" onclick="dyweTrackEvent(\'PCoAuthLogin\',\'weiboLogin\')" href="https://passport.zhaopin.com/oauth/weibo/enter" style="display:none;width:18px;height:18px;background:url(http://img02.zhaopin.cn/2012/img/index/icon_xl.png);float:left;margin:0 4px"></a>' +
                    '</div>' +
                    "</div>";
                break;
            case "1":
                html += "<div id=\"applyBlock\">" +
                   "<form name=\"applyForm\"><dl><dt>请选择简历：</dt><dd>" + apply.genHTML("3", data) + "<img src=\"" + piximg + "\" width=\"12\" height=\"1\" /><select name=\"" + apply.langSelId + "\" id=\"" + apply.langSelId + "\" onchange=\"zlapply.searchjob.checkResumeScore()\"></select><a href=\"#\" onclick=\"zlapply.searchjob.editResume();return false;\">修改</a></dd><dd class=\"errInfo\" id=\"resumeScore_errCon\"></dd><dd class=\"blankBr\"></dd><dt>请选择求职信：</dt><dd>" + apply.genHTML("4", data, true) + "</dd>";
                if (apply.vanId.num > 10) html += "<dd class=\"blankBr\"></dd><dt>请输入验证码：</dt><dd><input type=\"text\" class=\"textInput\" name=\"validate\" id=\"validate\" value=\"\" maxlength=\"5\" onkeydown=\"var e = event || window.event;if(e.keyCode == 13){zlapply.searchjob.applyNow();return false;}\" /></label><a title=\"刷新验证码\" href=\"#\" onClick=\"ZPIDC.applyjob.applyMoreTenValidate();return false;\" class=\"aValid\"><img align=\"absmiddle\" id=\"vimg\" alt=\"看不清？点击更换\"></a><a title=\"刷新验证码\" href=\"#\" onClick=\"ZPIDC.applyjob.applyMoreTenValidate();return false;\" class=\"aValid\">看不清，换一张</a></dd><dd class=\"errInfo\" id=\"validateErrCon\"></dd>";
                html += "</dl><div class=\"orgBgBlock\"><label><input type=\"checkbox\" name=\"" + apply.setReDeId + "\" id=\"" + apply.setReDeId + "\" value=\"1\" /><img src=\"" + piximg + "\" width=\"8\" height=\"1\" />申请职位时，默认投递此简历，有效期为30天</label></div><div class=\"greyDottedLineH\"></div><div id=\"submitBlock\"><div class=\"leftFBlock\"><a href=\"#\" class=\"popapplyButton\" onclick=\"zlapply.searchjob.applyNow();return false;\" id=\"" + apply.applynowId + "\">立即申请</a></div><div class=\"rightFBlock\"><a href=\"#\" class=\"txtLink\" onclick=\"zlapply.searchjob.previewResume();return false;\">预览简历</a></div><div class=\"clear\"></div></div></form></div>";
                break;
            case "2":
                html += "<div class=\"orgBgBlockTop\">您目前还没有简历，请先新建一份简历。</div><div id=\"submitBlock\"><a href=\"#\" class=\"popapplyButton\" onclick=\"zlapply.searchjob.newResume();return false;\">新建简历</a></div>";
                break;
            case "3":
                if (data["resume"] && data["resume"].length) {
                    var r = data["resume"];
                    html += "<select name=\"" + apply.resumeSelId + "\" id=\"" + apply.resumeSelId + "\" onchange=\"zlapply.searchjob.genLangOptions()\">";
                    for (var i = 0; i < r.length; i++) {
                        if (r[i]["langcn"] == "1" || r[i]["langen"] == "1") html += "<option value=\"" + i + "\"" + (r[i]["defaultkey"] == "" ? "" : " selected=\"selected\"") + ">" + r[i]["resume_name"] + "</option>"
                    }
                    html += "</select>"
                };
                break;
            case "4":
                if (data["coverletter"] && data["coverletter"].length) {
                    var cl = data["coverletter"];
                    html += "<select name=\"" + apply.coverletterSelId + "\" id=\"" + apply.coverletterSelId + "\" onchange=\"zlapply.searchjob.changeCoverletter()\">";
                    var nodef = true;
                    for (var i = 0; i < cl.length; i++) {
                        html += "<option value=\"" + cl[i]["coverletternumber"] + "_" + cl[i]["version"] + "\"" + (cl[i]["defaultkey"] == "1" ? " selected=\"selected\"" : "") + ">" + cl[i]["coverlettername"] + "</option>";
                        nodef = nodef && !(cl[i]["defaultkey"] == "1")
                    }
                    html += "<option value=\"\"" + (nodef ? " selected=\"selected\"" : "") + ">不发送求职信</option>";
                    html += "</select><a href=\"#\" onclick=\"zlapply.searchjob.editCoverletter();return false;\" id=\"" + apply.coverletterEditId + "\" style=\"display:" + (nodef ? "none" : "") + "\">修改</a>"
                } else {
                    html += "<select name=\"" + apply.coverletterSelId + "\" id=\"" + apply.coverletterSelId + "\" disabled=\"disabled\"><option value=\"\">不发送求职信</option></select><a href=\"#\" onclick=\"zlapply.searchjob.newCoverletter();return false;\">新建</a>"
                }
                break;
            case "5":
                html += "<div id=\"applyNowPlaceholder\"></div>";
                break;
            case "6":
                html += "<div id=\"defaultBlock\"><form name=\"" + apply.setDefaultForm + "\"><div class=\"orgBgBlockTop\">在下面设置默认简历，申请职位时直接投递，有效期为30天</div><dl><dt class=\"largeTxt\">是否需要默认简历设置：</dt><dd class=\"largeTxt\"><label class=\"blueTxt\"><input type=\"radio\" name=\"" + apply.setDefaultRadio + "\" value=\"1\"" + (data["defaultkey"] == "" ? "" : " checked=\"checked\"") + " onclick=\"zlapply.searchjob.switchNeedDefault(this.value)\" />需要</label>&nbsp;&nbsp;<label class=\"blueTxt\"><input type=\"radio\" name=\"" + apply.setDefaultRadio + "\" value=\"0\"" + (data["defaultkey"] == "" ? " checked=\"checked\"" : "") + " onclick=\"zlapply.searchjob.switchNeedDefault(this.value)\" />不需要</label></dd></dl><dl id=\"" + apply.resuColeBlockId + "\"><dd class=\"blankBr\"></dd><dt>请选择简历：</dt><dd>" + apply.genHTML("3", data) + "<img src=\"" + piximg + "\" width=\"12\" height=\"1\" /><select name=\"" + apply.langSelId + "\" id=\"" + apply.langSelId + "\" onchange=\"zlapply.searchjob.checkResumeScore()\"></select><a href=\"#\" onclick=\"zlapply.searchjob.editResume();return false;\">修改</a></dd><dd class=\"errInfo\" id=\"resumeScore_errCon\"></dd><dd class=\"blankBr\"></dd><dt>请选择求职信：</dt><dd>" + apply.genHTML("4", data, false) + "</dd></dl><div class=\"greyDottedLineH\"></div><div id=\"submitBlock\"><a href=\"#\" class=\"popapplyButton\" onclick=\"zlapply.searchjob.saveDefault();return false;\">保&nbsp;&nbsp;存</a></div></form></div>";
                break;
            case "7":
                html += "<div class=\"orgBgBlockTop\">" + argu + "</div><div id=\"submitBlock\"><a href=\"#\" class=\"popapplyButton\" onclick=\"zlapply.searchjob.freshInfo();return false;\">刷&nbsp;&nbsp;新</a></div>";
                break;
            case "8":
                html += "<div class=\"orgBgBlockTop\">" + (argu ? apply.tip4setOk : apply.getTip4setErr(data["loginstatus"])) + "</div><div id=\"submitBlock\"><a href=\"#\" class=\"popapplyButton\" onclick=\"zlapply.searchjob.ajaxApply.closeDiv();return false;\">关&nbsp;&nbsp;闭</a></div>";
                break;
            case "9":
                html += "<div id=\"applyBlock\"><form name=\"applyForm\"><dl><dd class=\"blankBr\"></dd><dt>请输入验证码：</dt><dd><input type=\"text\" class=\"textInput\" name=\"validate\" id=\"validate\" value=\"\" maxlength=\"5\" onkeydown=\"var e = event || window.event;if(e.keyCode == 13){zlapply.searchjob.applyNowByDefault();return false;}\" /></label><a title=\"刷新验证码\" href=\"#\" onClick=\"ZPIDC.applyjob.applyMoreTenValidate();return false;\" class=\"aValid\"><img align=\"absmiddle\" id=\"vimg\" alt=\"看不清？点击更换\"></a><a title=\"刷新验证码\" href=\"#\" onClick=\"ZPIDC.applyjob.applyMoreTenValidate();return false;\" class=\"aValid\">看不清，换一张</a></dd><dd class=\"errInfo\" id=\"validateErrCon\"></dd></dl><div class=\"greyDottedLineH\"></div><div id=\"submitBlock\"><a href=\"#\" class=\"popapplyButton\" onclick=\"zlapply.searchjob.applyNowByDefault();return false;\" id=\"" + apply.applynowId + "\">立即申请</a></div></form></div>";
                break;
            case "10":
                html += "<div class=\"orgBgBlockTop\">" + (argu ? apply.tip4applyOk : apply.getTip4applyErr(data["loginstatus"])) + "</div><div id=\"submitBlock\"><a href=\"#\" class=\"popapplyButton\" onclick=\"zlapply.searchjob.ajaxApply.closeDiv();return false;\">关&nbsp;&nbsp;闭</a></div>";
                break;
            case "11":
                html += "<div class=\"orgBgBlockTop\">" + apply.tip4timeout + "</div><div id=\"submitBlock\"><a href=\"#\" class=\"popapplyButton\" onclick=\"zlapply.searchjob.ajaxApply.closeDiv();return false;\">关&nbsp;&nbsp;闭</a></div>";
                break;
            case "12":
                html += "<div class=\"redTips\">所选职位中，有" + apply.vanId.no.split(apply.vanSepa).length + "个职位不能批量申请，需单独申请，<a href=\"http://my.zhaopin.com/jobseeker/req_vacancy.asp?VanID=" + apply.vanId.no + "\" target=\"_blank\">查看详情</a>&gt;&gt;</div>";
                break;
            case "13":
                html += "<div class=\"redTips\">所选职位，不能批量申请，需单独申请，<a href=\"http://my.zhaopin.com/jobseeker/req_vacancy.asp?VanID=" + apply.vanId.no + "\" target=\"_blank\">查看详情</a>&gt;&gt;</div>";
                break;
            case "14":
                html+="<div class='yahooTips' >检测到您的电子邮箱为雅虎，该邮箱已经停止使用，为不影响您正常申请职位，请修改该邮箱为非雅虎，修改后下次请使用新邮箱进行登录，带来的不便敬请谅解。</div><div class='greyDottedLineH'></div><div><a href='http://my.zhaopin.com/myzhaopin/person_info.asp?url="+document.location+"' class='popapplyButton'>修改</a></div>"
                break;
            case "15":
                html += "<div id=\"loginBlock\"><form name=\"loginForm\"><ul><li><label class=\"leftLabel\">用户名：<input type=\"text\" id=\"simplaceholder1\" class=\"textInput\" name=\"loginname\"  maxlength=\"100\" value=\"输入手机号/邮箱\" style=\"color:#999;\"/></label><label><input type=\"checkbox\" name=\"isautologin\" value=\"1\" />自动登录</label></li><li class=\"tips\" id=\"loginnameErrCon\"></li><li><label class=\"leftLabel\">密<img src=\"" + piximg + "\" width=\"12\" height=\"1\" />码：<input type=\"password\" class=\"textInput\" name=\"password\" value=\"\" maxlength=\"25\" /></label><a href=\"http://passport.zhaopin.com/findpassword/email/step1\" target=\"_blank\">忘记密码</a></li><li class=\"tips\" id=\"passwordErrCon\"></li><li id=\"validateLi\" style=\"display:none\"><label class=\"leftLabel\">验证码：<input type=\"text\" class=\"textInput\" name=\"validate\" id=\"validate\" value=\"\" maxlength=\"5\" /></label><a title=\"刷新验证码\" href=\"#\" onClick=\"ZPIDC.applyjob.freshValidate();return false;\"><img align=\"absmiddle\" id=\"vimg\" alt=\"看不清？点击更换\"></a><a title=\"刷新验证码\" href=\"#\" onClick=\"ZPIDC.applyjob.freshValidate();return false;\">看不清，换一张</a></li><li class=\"tips\" id=\"validateErrCon\"></li></ul><div class=\"greyDottedLineH\"></div><div id=\"submitBlock\" style=\"margin: 10px 0 0 108px;width:264px;\"><div class=\"leftFBlock\"><a href=\"#\" class=\"popapplyButton\" onclick=\"zlapply.searchjob.checkLoginFormCollect();return false;\">登&nbsp;&nbsp;录</a></div><div class=\"rightFBlock\"><a href=\"http://passport.zhaopin.com/account/register\" class=\"txtLink\" target=\"_blank\" style=\"display: block; width: 164px; height: 29px; font-size: 14px; font-weight: bold; text-decoration: none; background: url('http://img02.zhaopin.cn/2012/img/ui/register_jobs.png') no-repeat scroll 0px 0px transparent; color: #3359AA;\">快速注册，申请职位</a></div><div class=\"clear\"></div></div></form>" +
                    '<div class="otherLogin" style="width:200px;height:19px;margin:0 auto;">' +
                    '<span style="display:inline-block;padding-left:4px;color:#666;height:18px;float:left;line-height:18px">使用其他方式登录</span>' +
                    '<a class="" onclick="dyweTrackEvent(\'PCoAuthLogin\',\'wxLogin\')" href="https://passport.zhaopin.com/oauth/weixin/enter" style="display:inline-block;width:18px;height:18px;background:url(http://img02.zhaopin.cn/2012/img/index/icon_wx.png);float:left;margin:0 4px"></a>' +
                    '<a class="" onclick="dyweTrackEvent(\'PCoAuthLogin\',\'qqLogin\')" href="https://passport.zhaopin.com/oauth/qq/enter" style="display:inline-block;width:18px;height:18px;background:url(http://img02.zhaopin.cn/2012/img/index/icon_qq.png);float:left;margin:0 4px"></a>' +
                    '<a class="" onclick="dyweTrackEvent(\'PCoAuthLogin\',\'weiboLogin\')"href="https://passport.zhaopin.com/oauth/weibo/enter" style="display:inline-block;width:18px;height:18px;background:url(http://img02.zhaopin.cn/2012/img/index/icon_xl.png);float:left;margin:0 4px"></a>' +
                    '</div>' +
                    "</div>";
                break;
            case "18" ://简历推荐
                html +='<div id="applyynid"><div class="applyyn applyyn1"><h3 class="noappbg">您已申请过此职位，30日内不可重复投递</h3><p style="text-align:center" class="applyynull">下面这些职位您还没有申请过，快来试试吧！</p></div>'
                +'<div class="applyyn applyyn2"><h3 class="noappbg" style="text-align:left;text-indent:64px;">职位申请失败</h3><p>您共投递<span class="applyynmark mkcont"></span>个职位，其中<span class="applyynmark mkrapp7"></span>个职位已申请过，<span class="applyynmark">30</span>天内不可重复投递<br/><span class="applyynull">试试下面这些没申请过的职位吧!</span></p></div>'
                /*+'<div class="applyyn applyyn3"><h3>职位申请成功</h3><p>您在<span class="applyynmark">30</span>天内申请过此职位，重复申请获得面试机会不大<br/><span class="applyynull">试试下面这些没申请过的职位吧！</span></p></div>'*/
                +'<div class="applyyn applyyn4"><h3>职位申请成功</h3><p>您共投递<span class="applyynmark mkcont"></span>个职位，其中<span class="applyynmark mkrapp30"></span>个职位已申请过，<span class="applyynmark">30</span>天内不可重复投递<span class="applyynull">，试试下面这些没申请过的职位吧！</span></p></div>'
                +'<form action="#" name="frmokMain" id="frmokMain"><table class="applyynTab"></table></form></div>' ;
                break;

        }

        return html
    };
    apply.buildDivFrame = function () {
        function c(tag) {
            return document.createElement(tag)
        }
        if (!apply.div) {
            var div = c("div");
            div.className = "popupApply";
            div.state = "close";
            addEvent(div, "click", function (e) {
                e = e || window.event;
                if (e.stopPropagation) e.stopPropagation();
                else e.cancelBubble = true
            });
            apply.div = div; ($("zlapply_jsc") || document.body).appendChild(div);
            div = c("div");
            div.className = "topBar";
            var h1 = c("h1");
            apply.titleCon = h1;
            div.appendChild(h1);
            var a = c("a");
            a.setAttribute("title", "关闭");
            a.onclick = apply.closeDiv;

            // chris.cai
            var img = c("img");
            img.setAttribute("src","http://my.zhaopin.com/images/icon_close_mout.gif");
            a.appendChild(img);
            // chris.cai end

            div.appendChild(a);
            apply.div.appendChild(div);
            var div_f = c("div");
            setStyle(div_f, "position", "relative");
            apply.div.appendChild(div_f);
            div = c("div");
            div.className = "mainBlock";
            apply.mainCon = div;
            div_f.appendChild(div);
            div = c("div");
            div.className = "loading";
            apply.loadCon = div;
            div_f.appendChild(div);
            /*
             if (isIE6) {
             var shim = PopupDiv.buildShim(apply.div); ($("zlapply_jsc") || document.body).appendChild(shim);
             apply.div.shim = shim
             }
             */
        }
    };
    apply.openDiv = function () {
        if (apply.closeDivDelay) {
            clearTimeout(apply.closeDivDelay);
            apply.closeDivDelay = null
        }
        if (apply.div && apply.div.state == "close") {
            var div = apply.div;
            div.state = "open";
            apply.positionDiv();
            setStyle(div, "visibility", "visible");
            if (div.shim) setStyle(div.shim, "visibility", "visible");
            zlapply.searchjob.bodymask.show()
        }
    };
    apply.positionDiv = function () {
        var div = apply.div;
        var vwh = getViewportSize();
        div.x_abs = (vwh.w - div.offsetWidth) / 2;
        div.y_abs = (vwh.h - div.offsetHeight) / 2;
        var x = div.x_abs;
        var y = div.y_abs;
        if (isIE6) {
            var sxy = getScrollPosition();
            x += sxy.x;
            y += sxy.y
        }
        setStyle(div, "left", x + "px");
        setStyle(div, "top", y + "px");
        if (div.shim) {
            setStyle(div.shim, "left", x + "px");
            setStyle(div.shim, "top", y + "px")
        }
    };
    apply.closeDiv = function () {
        if (apply.closeDivDelay) {
            clearTimeout(apply.closeDivDelay);
            apply.closeDivDelay = null
        }
        if (apply.div && apply.div.state == "open") {
            apply.div.state = "close";
            setStyle(apply.div, "visibility", "hidden");
            setStyle(apply.div, "top", "-100px");
            setStyle(apply.div, "left", "-100px");
            setStyle(apply.loadCon, "visibility", "hidden");
            if (apply.div.shim) {
                setStyle(apply.div.shim, "visibility", "hidden");
                setStyle(apply.div.shim, "top", "-100px");
                setStyle(apply.div.shim, "left", "-100px")
            }
            zlapply.searchjob.bodymask.hide()
        }
    };
    apply.fixShimWH = function () {
        var div = apply.div;
        if (div.shim) {
            setStyle(div.shim, "width", div.offsetWidth + "px");
            setStyle(div.shim, "height", div.offsetHeight + "px")
        }
    };
    apply.lockDiv = function () {
        if (apply.div && apply.div.state == "open") {
            var div = apply.div;
            if ("x_abs" in div && isNumber(div.x_abs)) {
                var sx = document.documentElement.scrollLeft || document.body.scrollLeft;
                setStyle(div, "left", (sx + div.x_abs) + "px");
                if (div.shim) setStyle(div.shim, "left", (sx + div.x_abs) + "px")
            }
            if ("y_abs" in div && isNumber(div.y_abs)) {
                var sy = document.documentElement.scrollTop || document.body.scrollTop;
                setStyle(div, "top", (sy + div.y_abs) + "px");
                if (div.shim) setStyle(div.shim, "top", (sy + div.y_abs) + "px")
            }
        }
    };
    if (isIE6) addEvent(window, "scroll", apply.lockDiv);
    zlapply.searchjob.save = function () {
        var haschecked = false;
        var ck = zlapply.searchjob.f_m[zlapply.searchjob.v.h_n];
        var idstr = "";
        var arrIdstr = [];
        if (ck) {
            if (ck.length) {
                for (i = 0; i < ck.length; i++) {
                    if (ck[i].checked) {
                        haschecked = true;
                        arrIdstr.push(ck[i].value);
                    }
                }
                idstr = zlapply.searchjob.v.h_n+"="+arrIdstr.join(",");
            } else {
                haschecked = ck.checked;
                if (haschecked) idstr = zlapply.searchjob.v.h_n + "=" + ck.value
            }
        }
        var collectUrl = "http://my.zhaopin.com/myzhaopin/job_fav_portal.asp";
        if (haschecked) {
            jsonp({
                url:collectUrl ,
                data:idstr,
                callback:"jsonp" + getUid(),
                onSuccess: function (data) {
                    zlapply.searchjob.collect(data[0]);
                },
                onError:function(){
                    zlapply.searchjob.collect(0);
                },
                onAbort: function (callbackIndex) {
                    if (apply.div.state == "open" && apply.jsonpCallback == callbackIndex) zlapply.searchjob.showTimeout()
                },
                beforeCall: function () {
                    apply.jsonpCallback = this.callback
                },
                callbackParName: "jsonpcallback"
            });
            //window.open("http://my.zhaopin.com/myzhaopin/jobmng_fav_save.asp?" + idstr)
        } else alert("请选择一个职位")
    };
    zlapply.searchjob.saveJobTerminalApply = function () {
        //  职位终端申请
        var idstr = zlapply.searchjob.v.h_n+"="+arrVarFromASP[1];
        var collectUrl = "http://my.zhaopin.com/myzhaopin/job_fav_portal.asp";
        jsonp({
            url:collectUrl ,
            data:idstr,
            callback:"jsonp" + getUid(),
            onSuccess: function (data) {
                zlapply.searchjob.collect(data[0],'.addpopupApply');
            },
            onError:function(){
                zlapply.searchjob.collect(0,'.addpopupApply');
            },
            onAbort: function (callbackIndex) {
                if (apply.div.state == "open" && apply.jsonpCallback == callbackIndex) zlapply.searchjob.showTimeout()
            },
            beforeCall: function () {
                apply.jsonpCallback = this.callback
            },
            callbackParName: "jsonpcallback"
        });
    };
    zlapply.searchjob.saveOne = function (pid) {
        var ck = zlapply.searchjob.f_m[zlapply.searchjob.v.h_n];
        if (ck.length) for (var i = 0; i < ck.length; i++) {
            if (ck[i].value.indexOf(pid)>-1) ck[i].checked = true;
            else ck[i].checked = false
        } else {
            if (!ck.checked) ck.checked = true
        }
        zlapply.searchjob.save()
    };
    zlapply.searchjob.collect = function(type,definPro){
        var souCollect = jQuery("#sou-collect");
        var souCollectTitle = jQuery("#sou-collect-title");
        if(definPro){
            souCollect = jQuery(definPro);
            souCollect.get(0).style.visibility = 'visible';
        }
        var sTop = jQuery(document).scrollTop(), sLeft = jQuery(document).scrollLeft();
        var wHeight = jQuery(window).height(), wWidth =jQuery(window).width();
        var y = sTop + wHeight / 2 - souCollect.height() / 2;
        var x = sLeft + wWidth / 2 - souCollect.width() / 2;
        switch (type) {
            case 0:
                souCollectTitle.text("收藏失败");
                souCollectTitle.addClass("collect-fail");
                souCollect.css({left:x,top:y});
                souCollect.fadeIn(100).delay(3000).fadeOut(100);
                break;
            case 1:
                souCollectTitle.text("收藏成功");
                souCollectTitle.removeClass("collect-fail");
                souCollect.css({left:x,top:y});
                souCollect.fadeIn(100).delay(3000).fadeOut(100);
                break;
            case 2:
                apply.buildDivFrame();
                apply.titleCon.innerHTML = "登&nbsp;录";
                apply.mainCon.innerHTML = apply.genHTML("15");
                var simplaceholder = document.getElementById("simplaceholder1");
                simplaceholder.onfocus = function () {
                    if (simplaceholder.value == "输入手机号/邮箱") {
                        simplaceholder.value = "";
                        simplaceholder.style.color = "#3f419e";
                    }
                };
                simplaceholder.onblur = function () {
                    if (simplaceholder.value == "") {
                        simplaceholder.value = "输入手机号/邮箱";
                        simplaceholder.style.color = "#999";
                    }
                };
                apply.fixShimWH();
                zlapply.searchjob.buildBodyMask(true);
                apply.openDiv();
                apply.showMask();
                jQuery('.popupApply').css('opacity','1').show();
                souCollect.hide();
                jQuery('.loading','.popupApply').hide();
                break;
            case 3:
                souCollectTitle.text("此职位已收藏");
                souCollectTitle.addClass("collect-fail");
                souCollect.css({left:x,top:y});
                souCollect.fadeIn(100).delay(3000).fadeOut(100);
                break
        }
    };
    zlapply.searchjob.changeKeyType = function (v, f) {
        var fObj = f || zlapply.searchjob.f_s;
        for (var i = 1,
                 h; h = $("keyword" + i); i++) if (v == i) h.className = "keywordbgon";
        else h.className = "keywordbgoff";
        fObj[zlapply.searchjob.kt.h_n].value = v
    };
    zlapply.searchjob.showMoreCond = function (flag) {
        var trigger = $(zlapply.searchjob.moreCondTrigID);
        var condCon = $(zlapply.searchjob.moreCondConID);
        trigger.innerHTML = flag ? "隐藏更多搜索条件" : "查看更多搜索条件";
        setStyle(condCon, "display", flag ? "" : "none")
    };
    zlapply.searchjob.switchMoreCond = function () {
        var trigger = $(zlapply.searchjob.moreCondTrigID);
        var condCon = $(zlapply.searchjob.moreCondConID);
        if (getStyle(condCon, "display").toLowerCase() == "none") zlapply.searchjob.showMoreCond(true);
        else zlapply.searchjob.showMoreCond(false)
    };
    zlapply.searchjob.searchVip = function (f) {
        var fObj = f || zlapply.searchjob.f_s;
        function id2text(id, data) {
            var dd = [];
            var r = new RegExp("@(" + id + ")\\|([^\\|@]*)(\\|([^@]*)|@)", "gi");
            data.replace(r,
                function (a, x, y, z, u) {
                    dd.push([x, y, u]);
                    return ""
                });
            return dd.length ? dd[0][1] : ""
        }
        window.open("http://search.zhaopin.com/jobs/VIPrequest.asp?vip_type=y&SchJobType=" + id2text(fObj[zlapply.searchjob.t.h_n].value, dJobtype).urlEncode() + "&JobLocation=" + fObj[zlapply.searchjob.l.h_n].value.urlEncode())
    };

    if (typeof (window["sjModIns"]) == "undefined" || !window["sjModIns"]) window["sjModIns"] = [];
    function initSJModule() {
        var e = /<[^>]+\ssjmodule=[\'\"]?([\w|]+)[^>]+/g;
        var g = /id=[\'\"]?([\w\-]+)/i;
        var i, j, c;
        window.document.body.innerHTML.replace(e,
            function (a, b) {
                if ((i = a.match(g)) && (j = $(i[1]))) {
                    if ((c = eval(b)) && isFunction(c)) {
                        var x, y, z;
                        if (b == "MetroHotCity" || b == "MetroLine" || b == "District") {
                            if (window["dMetro"]) window["sjModIns"][i[1]] = new c(j);
                            else {
                                x = c;
                                y = i[1];
                                z = j;
                                loadJs("http://sou.zhaopin.com/javascript/hardpoisstr.js", "utf-8",
                                    function () {
                                        window["sjModIns"][y] = new x(z)
                                    })
                            }
                        } else window["sjModIns"][i[1]] = new c(j)
                    }
                }
                return ""
            })
    }
    function initShowJobDetail() {
        var triggers = getElementsByClass("tdJobDetails", "td");
        if (triggers.length) {
            for (var i = 0; i < triggers.length; i++) {
                (function () {
                    var j = i;
                    var td = triggers[j];
                    var tr = td.parentNode;
                    var tr2 = tr.parentNode.rows[tr.rowIndex + 1];
                    var span = td.getElementsByTagName("span")[0];
                    var aiCon = tr2.getElementsByTagName("ul")[0];
                    tr2.h = aiCon.firstChild.offsetHeight;
                    setStyle(aiCon, "lineHeight", "0");
                    setStyle(aiCon, "fontSize", "0");
                    addEvent(td, "click",
                        function () {
                            if (parseInt(getStyle(aiCon, "lineHeight")) == 0) {
                                setStyle(aiCon, "lineHeight", "25px");
                                setStyle(aiCon, "fontSize", "12px")
                            }
                            if (span.className == "showJobDetail") {
                                tr2.showAI = tr2.showAI || centralTimer.animation(600, [[aiCon, 'height', 0, tr2.h, 'easeOut', 'px']],
                                    function () {
                                        span.className = "hideJobDetail"
                                    });
                                tr2.showAI.restart()
                            } else {
                                tr2.hideAI = tr2.hideAI || centralTimer.animation(600, [[aiCon, 'height', tr2.h, 0, 'easeOut', 'px']],
                                    function () {
                                        span.className = "showJobDetail"
                                    });
                                tr2.hideAI.restart()
                            }
                        })
                })()
            }
        }
    }
})();
/*2016.10.12 web sunyuhang add*/
var showAndHide=function(e) {
    var obj= e.target || e.srcElement;
    if($(obj).attr('data-num')==0){
        $('.otherLogin a').css('display', 'inline-block')
        $(obj).attr('data-num','1')
    }else{
        $('.otherLogin a').css('display', 'none');
        $(obj).attr('data-num','0')
    }
};
/*end*/


/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};


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

﻿var brow = $.browser;
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
