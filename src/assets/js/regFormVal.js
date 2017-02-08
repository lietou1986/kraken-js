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