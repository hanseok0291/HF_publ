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
 * lys               2018.07.07        공통 펑션
 */
PHFnc = function(){
	this.isLog = false;
	this.ajaxProgress = true;
};

/**
 * @REM - alert Layer 버전
 * @PARAM msg:alert 메시지, fnc:확인 버튼 클릭 후 실행될 펑션
 */
PHFnc.prototype.alert = function(msg, fnc) {
	//PHFnc.log(msg);
	alert(msg);
};

/**
form element 생성
2018.07.07. 이용수

inParam: 파라미터(String, Object)
frmObj: form Object
**/
PHFnc.prototype.SetParamForm = function(inParam, attrObj, isNppfs) {
//	PHFnc.log("PHFnc.SetParamForm");
	//form 생성
	var params = "";
	var tmpItm = {};
	var frmObj = (attrObj == undefined)?null:attrObj[PHFnc.FORM];

	if( frmObj == undefined ) frmObj = $("<form></form>").appendTo("body");

    //Set param
	switch (typeof(inParam)) {
	case "undefined":
		break;

	case "string":
		if( PHUtil.isEmpty(inParam) ) break;
		inParam.split("&").forEach(function(item, index, array) {
			tmpItm = item.split("=", 2);
			params += "<input type='hidden' name='"+ PHUtil.nvl(tmpItm[0]) +"' value='"+ PHUtil.nvl(tmpItm[1]) +"' />";
		});
		// PHFnc.log("[PHFnc.SetParamForm]string="+ inParam);
		break;

	case "object":
		$.each(inParam, function(key, value){
			params += "<input type='hidden' name='"+ PHUtil.nvl(key) +"' value='"+ PHUtil.nvl(value) +"' />";
		});

		break;
	default:
		break;
	}
	//html append
	//PHFnc.log(params);
	$(frmObj).append(params);

	return frmObj;
};

/**
GET/POST Action

url : URL 주소
params  : 파라미터. (String, Object)
frmObj  : form Object. (submit할 form element를 지정하고 싶다면 해당 form을 넘기면 된다. (없다면 "" 로 전달)
attrObj : 오브젝트
method  : GET or POST (기본값은 POST 이다.)

2018.07.07. 이용수
**/
PHFnc.prototype.doAction = function(url, params, attrObj) {
	PHFnc.log("[PHFnc.doAction]url="+url);
	var method = "POST";

	if (attrObj != undefined) method = attrObj[PHFnc.METHOD];

	//doAction은 무조건적인 페이지 이동이므로, 로딩바 출력후의 로딩바 제거는 아무도 못한다.
	this.ajaxProgress = true;
	PHFnc.progressbar(true, true);
	this.ajaxProgress = false;

	if( PHUtil.nvl(method, "POST").toUpperCase() == "POST" ) {
		PHFnc.doPost(url, params, attrObj);
	} else {
		PHFnc.doGet(url, params, attrObj);
	}
};

PHFnc.prototype.doGet = function(url, params, attrObj) {
	PHFnc.log("PHFnc.doGet");
	var frm = PHFnc.SetParamForm(params, attrObj);
	var target = (attrObj == undefined)?"":attrObj[PHFnc.TARGET];

	$(frm).attr("action", url);
	$(frm).attr("target", target);
	$(frm).submit();
	//PHFnc.log("[doGet] "+ $(frm).html());
};

PHFnc.prototype.doPost = function(url, params, attrObj) {
	PHFnc.log("PHFnc.doPost");
	var frm = PHFnc.SetParamForm(params, attrObj);
	var target = (attrObj == undefined)?"":attrObj[PHFnc.TARGET];
	target = PHUtil.nvl(target, "_self");

	$(frm).attr("action", url);
	$(frm).attr("target", target);
	$(frm).attr("method", "POST");
	$(frm).submit();
	//PHFnc.log("[PHFnc.doPost] frm="+ $(frm).html());
	/*alert("[PHFnc.doPost] target="+ target);*/
};

/**
redirect 펑션
@param :
	url - redirect url

2018.07.07. 이용수
**/
PHFnc.prototype.redirect = function(url){
	$(location).attr("href", url);
	PHFnc.submitLoading();
};





/***********************************************************************************************************
 * AJAX 관련 펑션
 ***********************************************************************************************************/
/**
비동기 AJAX 통신 펑션

@param :
	PHFnc.prototype.ajaxASync 참조

2018.07.07. 이용수
2020.03.18. 정욱재 : 혜택플랫폼 요청시()
**/
PHFnc.prototype.ajax = function(url, param, mType, dType, successFn, failFn, isProgress, isPc){
	this.ajaxProc(url, param, mType, dType, successFn, failFn, isProgress, isPc, "F");
};

PHFnc.prototype.ajaxProc = function(url, param, mType, dType, successFn, failFn, isProgress, isPc, isBenefitsRequest){
	this.ajaxASync(url, param, mType, dType, successFn, failFn, isProgress, isPc, true, isBenefitsRequest);
};

/**
AJAX 통신 펑션

@param :
	url - URL주소
	params - 파라미터
	mType - method (get or post)
	dType - dataType (xml, json, script, html, text)
	successFn - 성공시 처리 펑션(data, textStatus, jqXHR)
	failFn - 실패시 처리 펑션(data, textStatus, jqXHR)
	isProgress - 프로그래시브바 출력여부 (true or false)
	isPc - true :PC / false :MOBILE
	isAsync - 동기/ 비동기 여부 (동기:false, 비동기:true)

2018.07.07. 이용수
**/
PHFnc.prototype.ajaxASync = function(url, param, mType, dType, successFn, failFn, isProgress, isPc, isAsync, isBenefitsRequest){
	if(mType == null){
		mType = "POST";
	}

	if(isProgress != true){
		isProgress = false;
	}

	if(isPc != false){
		isPc = true;
	}

	if(isAsync != false){
		isAsync = true;
	}

	if(isBenefitsRequest == "F") {
		(isProgress?PHFnc.progressbar(true, isPc):undefined);
	}

	PHFnc.log("------------------------------------------------");
	PHFnc.log("isProgress:"+isProgress);
	PHFnc.log("url:");
	PHFnc.log(url);
	PHFnc.log("param:");
	PHFnc.log(param);
	PHFnc.log("------------------------------------------------");

	//Call AJAX
	$.ajax({
		url			: url
		,data		: param
		,dataType	: dType
		,method		: mType
		,async      : isAsync
		,headers 	: {'PH_AJAX':'true', 'auth':'124'}
		//,beforeSend : (isProgress?PHFnc.progressbar(true, isPc):undefined)
	}).always(function(data, textStatus, jqXHR){
		try{
			PHFnc.log("AJAX STATUS :: "+ textStatus);
			PHFnc.log(data);

			if(textStatus == "success") { //AJAX 통신 성공
				if(dType == "json"){
					var rsCd  = data.ret_code;
					var rsMsg = data.ret_msg;

					if (rsCd == "00") { //서버 처리 성공
						if(successFn != null || typeof(successFn)=="function"){
							successFn(data, textStatus, jqXHR);
						}
					} else { //서버 처리 실패
						if(failFn != null || typeof(failFn)=="function"){
							failFn(data, textStatus, jqXHR);
						}else{
							PHFnc.ajaxError(rsMsg, null);
						}
					}
				}else if(dType == "html"){
					if(successFn != null || typeof(successFn)=="function"){
						successFn(data, textStatus, jqXHR);
					}
				}

			} else { //AJAX 통신 실패
				PHFnc.log("AJAX ERROR status :::::: "+ data.status);
				var excData = {
						ret_code : data.status
					  , ret_msg  : ""
				};

				if(data.status == 901 ){
					//PHFnc.alert("SESSION TIME OUT.");
					excData.ret_msg = "SESSION TIME OUT.";
					failFn(excData, textStatus, jqXHR);

				}else if(data.status == 979 ){
					//PHFnc.alert("본인인증 정보를 확인 할 수 없습니다.");
					excData.ret_msg = "본인인증 정보를 확인 할 수 없습니다.";
					failFn(excData, textStatus, jqXHR);

				}else if(data.status == 921 ){
					//PHFnc.alert("허용된 접근이 아닙니다.");
					excData.ret_msg = "허용된 접근이 아닙니다.";
					failFn(excData, textStatus, jqXHR);

				}else if(data.status == 931 ){
					//PHFnc.alert("허용된 도메인이 아닙니다.");
					excData.ret_msg = "허용된 도메인이 아닙니다.";
					failFn(excData, textStatus, jqXHR);

				}else{
					if(failFn != null || typeof(failFn)=="function"){
						failFn(data, textStatus, jqXHR);
					}else{
						PHFnc.ajaxError(null, null);
					}
				}
			}
		}catch(E){
			PHFnc.log(E);
			PHFnc.ajaxError(null, data);
		};

		if(isBenefitsRequest == "F") {
			if (isProgress) PHFnc.progressbar(false, isPc);
		}
	});
};

/**
AJAX 통신하는 동안의 프로그레시브바 처리 펑션
@param :
	stat - 프로그레 시작/종료 여부 (true or false)
	isProgress - 프로그레시브바 출력여부 (true or flase)

2018.07.07. 이용수
**/
PHFnc.prototype.progressbar = function(stat, isPc){
	var popId = "loaderMsg";
	var loadHtml =
			"<section id='"+popId+"'>"+
			"    <div class='loader_box'>"+
			"        <div class='loader'></div>"+
			"        <div class='loader_script'>"+
			"            잠시만 기다려 주세요..."+
			"        </div>"+
			"    </div>"+
			"</section>";

	//로딩바 상태변경 여부가 false 이면 리턴.
	if( !this.ajaxProgress ) return;

	if( stat ){
		if( $("#"+popId).length < 1 ) $("div[id='wrap']").append(loadHtml);

		//$(popId).find(".bg").width($(document).width());
		//$(popId).find(".bg").height($(document).height());
		//$(popId).height($(document).height());
		var maskHeight = $(document).height();
	    var maskWidth = $(window).width();
	    $("#"+popId).css({'width':maskWidth,'height':maskHeight});
	    $(window).scrollTop(0);
		$("#"+popId).show();
		PHFnc.log("PROGRESS START =========>>>>>");

	}else{
		//$("#div_glbMask, #div_glbMaskLoading").removeClass("on");
		$("#"+popId).hide();
		PHFnc.log("PROGRESS END =========>>>>>");
	}
};

/**
	혜택플랫폼 - Loading Bar Function
@param :
	stat - 프로그레 시작/종료 여부 (true or false)
2020.03.12. 정욱재
**/
PHFnc.prototype.benefitsLoadingBar = function(stat) {

	var loadHtmlBody = '<div id="lbarTtlArea">'+
					   		'<div class="loadingWrap">'+
					   			'<div class="loadinginner">'+
					   				'<div></div><div><div></div></div>'+
					   			'</div>'+
					   		'</div>'+
					   	'</div>';

	if(stat) {
		$('body').append(loadHtmlBody);
	}else {
		$('#lbarTtlArea').remove();
	}
}

/**
ajaxError 펑션
@param :
	msg - 알림창 메시지

2018.07.07. 이용수
**/
PHFnc.prototype.ajaxError = function(msg, jqXHR){
	PHFnc.ajaxProgress = true;
	if(msg !=null && msg != ""){
		PHFnc.alert(msg);
	}else{
//		alert("서비스 이용에 불편을 드려 죄송합니다.\n잠시 후 다시 이용하여 주시기 바랍니다.\n\n"+ jqXHR);
		PHFnc.alert("서비스 이용에 불편을 드려 죄송합니다.\n잠시 후 다시 이용하여 주시기 바랍니다.");
	}
};

/**
로딩바 객체 생성
@param :

2018.07.07. 이용수
**/
PHFnc.prototype.submitLoading = function(){
	this.progressbar(true);
};

/**
로딩바 객체 소멸
@param :

2018.07.07. 이용수
**/
PHFnc.prototype.submitLoadingDestory = function(){
	this.progressbar(false);
};

/**
	공통 펑션 실행
	@param :

	2020.06.19. 이용수
**/
PHFnc.prototype.execFnc = function(viewName, callNm, fnc1) {
	try {
		// 펑션 실행
		if(fnc1 != null && typeof(fnc1)=="function"){
			return fnc1();
		}
	}catch (e) {
		this.log( e.message);
		var url = '/comm/clntBugReprt.do';
		var type = 'post';
		var dataType = 'json';
		var success = function() {
			PHFnc.alert('서비스 이용에 불편을 드려 죄송합니다.\n잠시 후 다시 이용하여 주시기 바랍니다.');
			return false;
		}

        var errMsg   = e.message;
        var viewName = viewName;
        var fnName   = callNm;

        var params = {};
        params.errMsg       = errMsg;
        params.viewName     = viewName;
        params.functionName = fnName;

        // console.log(params);
        // var paramStr = JSON.stringify(params);
		// console.log(paramStr);
		PHFnc.ajax(url, params, type, dataType, success, success, true, true);
	}
};


PHFnc.prototype.initDefaultTxt = function(srcListMap) {
    $.each(srcListMap, function (index, permission) {
        var id   = permission.scr_elmt_id;
        var name = permission.scr_elmt_txt;
        var typ  = permission.scr_elmt_typ;

        if(typ === 'TEXT') {
        	$('#'+id).text(name);
        }else if(typ === 'HTML'){
        	$('#'+id).html(name);
        }else if(typ === 'MSG') {
        	PHFnc.MSG[id] = name;
        }
   });
};


PHFnc.prototype.showPopup2 = function(calcStrMode, dealUnit, exchRate, pntExchRate, dpUnit) { // 소수점계산방법, 거래단위, 사용처전환율, 제공처전환율, 거래단위
	var prvdrPntExchRate = 1;
	var popup_html = "";

	if(calcStrMode == 'FLOOR'){
		prvdrPntExchRate = Math.floor((dealUnit / exchRate) * pntExchRate);
	}else if(calcStrMode == 'CEIL'){
		prvdrPntExchRate = Math.ceil((dealUnit / exchRate) * pntExchRate);
	}else if(calcStrMode == 'ROUND'){
		prvdrPntExchRate = Math.round((dealUnit / exchRate) * pntExchRate);
	}

	popup_html =  "<p class='popup_title'>포인트결제 안내</p>";
	popup_html += "<p class='popup_text'>전환포인트 &quot;"+dealUnit+"P = "+prvdrPntExchRate+dpUnit+"&quot; 입니다.</p>";
	popup_html += "<p class='popup_text'>전환포인트가 "+dealUnit+"의 배수가 되게 입력해주세요.</p>";
	popup_html += "<span class='closeBtn'>닫기</span>";

	$('#popup2').html(popup_html);
};

/**
 * CONSOLE LOG
 *   *** 운영기 이관 시 펑션 내부 전체 주석처리 할 것! ***
 * @param str
 */
PHFnc.prototype.log = function(str){
	if( this.isLog ) {
		if(window.console == undefined){
			console = {log : function(){}};
		}
		console.log(str);
	}
};

PHFnc.prototype.TARGET = "target";
PHFnc.prototype.FORM   = "form";
PHFnc.prototype.ACTION = "action";
PHFnc.prototype.MSG = {};

// 클래스 생성
var PHFnc = new PHFnc();
