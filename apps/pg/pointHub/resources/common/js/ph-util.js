/**
 * Copyright (c) 2018 KT, Inc.
 * All right reserved.
 *
 * This software is the confidential and proprietary information of KT,
 * Inc. You shall not disclose such Confidential Information and
 * shall use it only in accordance with the terms of the license agreement
 * you entered into with KT.
 *
 * Revision History
 * Author            Date              Description
 * ------            -----             ------------
 * lys               2018.07.07        공통 유틸리티 
 */
var PHUtil = function(){};

/**
* Null 체크 
* @param
* @return boolean : null이면 true, 아니면 false
* @create 2018.07.07
*/
PHUtil.prototype.isEmpty = function(arg) {
	var rtn = false;
	if((arg == undefined) || (arg == "")) rtn = true;
	return rtn;
};


/**
* Null 체크 하여 대체값 리턴
* @param str: null체크값, refVal: 대체값
* @return boolean : null이면 true, 아니면 false
* @create 2018.07.07
*/
PHUtil.prototype.nvl = function(str, refVal) {

	if( this.isEmpty(refVal) ) refVal = "";
	if( this.isEmpty(str) ) str = refVal;
	return str;
	
};

/**
* String형을 숫자로 형변환 한다. (*1은 트릭)
* @param
* @return boolean
* @create 2018.07.07
*/
PHUtil.prototype.parseNum = function(str) {

	return ((this.nvl(str, 0)) * 1);
};

/**
* 3자리마다 콤마를 추가 하는 로직 (넘어온 데이터에 콤마가 있는경우 콤마를 제거해준다.)
* 금액 형태로 전환
* @param
* @return String
* @create 2018.07.07
*/
PHUtil.prototype.setComma = function(amt) {
	//PHFnc.log("[PHUtil.setComma]amt="+amt);
  	var val = amt;
  	var minYN = "N";
  	var objRegExpMin = new RegExp("(-[-0-9]+)([-0-9]{3})");
	var objRegExpPls = new RegExp("(-?[-0-9]+)([-0-9]{3})");
		
  	if ((val != null) && (val != "") && (val != "0")) {
  		if(objRegExpMin.test(val) == true){
  			minYN = "Y";
  			val = String(amt).replace("-","");
  		}
  		
  		//3자리마다 콤마넣기
  		val = "" + val;
  		if(objRegExpPls.test(val) == true)
  		while(objRegExpPls.test(val) == true) {
  			val = val.replace(objRegExpPls, "$1,$2");
  	    }
  		
  		if(minYN == "Y"){
  			val = "-" + val;
  		}
  	}
  	return val;
};


/**
* 문자열을 원하는 날짜포멧으로 변환한다. (yyyymmdd 형의 파라미터만 처리하며, 그외의 포멧은 지원하지 않는다.)
* @param  str : 날짜, del : 구분자("-", ".", "/" 등이 온다. 기본값은 "-")
* @return String
* @create 2018.07.07
*/
PHUtil.prototype.fmtDate = function(str, del) {
	//PHFnc.log("[PHUtil.setComma]amt="+amt);
	var date = "";
	var fmt = "";
	
	//포멧정의
	del = PHUtil.nvl(del, "-");
	fmt = "yy"+del+"mm"+del+"dd";
	
	//올바른 날짜인지 체크
	if( !PHValid.date(str) ) return str;
	
	try {
		date = $.datepicker.formatDate(fmt, $.datepicker.parseDate("yymmdd", this.replaceAll(str, "-")));
		
		return date;
	} catch (e) {
		PHFnc.log(e.message);
		return str;
	}
};


/**
* 인자값1의 값중 인자값2를 인자값3로 치환시킨다.
* @param str1 : 인자값1, str2 : 인자값2, str3 : 인자값3
* @return String
* @create 2018.07.07
*/
PHUtil.prototype.replaceAll = function(str1, str2, str3) {
	//dot 처리
	if( str2 == "." ) str2 = "\\"+str2;
	if( str3 == "." ) str3 = "\\"+str3;
	
	var regExp = new RegExp(str2,'g');
	return (typeof(str1) == "string")?str1.replace(regExp, str3):str1;
};

/**
* 오늘날짜 구하기
* @param 
* @return String - yyyymmdd
* @create 2018.07.07
*/
PHUtil.prototype.getToday = function() {
	var today = new Date();
	var dd    = today.getDate();
	var mm    = today.getMonth()+1;
	var yyyy  = today.getFullYear();
	
	if( dd < 10 ) dd = '0'+dd;
	if( mm < 10 ) mm = '0'+mm;
	
	return yyyy + "" + mm + "" + dd;
};

/**
* ie 체크
* @param 
* @return true / false (ie면 true, 아니면 false)
* @create 2018.07.07
*/
PHUtil.prototype.isIE = function() {
	//ie 11부터 체크
	var dectectIEregexp = /Trident.*rv[:]*(\d+\.\d+)/;
	
	//ie 10까지 체크
	if( navigator.userAgent.indexOf('MSIE') != -1) {
		//PHFnc.log("ie true");
		return true;
	}
	
	//return dectectIEregexp.test(navigator.userAgent);
	if(!!navigator.userAgent.match(/Trident\/7\./)) {
		//PHFnc.log("ie true");
		return true;
	}
	//PHFnc.log("ie false");
	return false;
};

var PHUtil = new PHUtil();