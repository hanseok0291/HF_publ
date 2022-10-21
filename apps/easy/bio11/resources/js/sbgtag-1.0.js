var URL_PATH, TRACKER_ID, PAGE_VIEW, USE_GTAG;
var URL_INFO = [ 
			     {mid : ["firmtest", "firmtest", "firmtest"], url : "/firmtest/FirmPaymentUIAction.pay", trackerId : ""}
        		,{mid : ["baemint", "billingn", "billingp", "billingr", "billingq", "billingt", "billingm"], url : "/woowahan/FirmPaymentAction.pay", trackerId : "UA-97416420-3"}
			    ,{mid : ["wonder1t", "wonder1r", "wonder6t", "wonder6r", "wonder1g"], url : "/firm/FirmWonderpayAction.pay", trackerId : "UA-97416420-4"}
			    ,{mid : ["goodchct", "goodchcr", "goodch1t", "goodchc1"], url : "/goodchc/FirmPaymentAction.pay", trackerId : "UA-97416420-5"}
			    ,{mid : ["shopnt01", "shopnt", "shopnt_r", "shopnt_k"], url : "/shopnt/FirmPaymentAction.pay", trackerId : "UA-97416420-6"}
			    ,{mid : ["bandi1g", "bandi1r", "bandi1t"], url : "/firm/FirmBandiPaymentAction.pay", trackerId : "UA-97416420-7"}
   			    ,{mid : ["booknl1t", "booknl1r", "booknl1g"], url : "/firm/FirmBookAndLifeUIAction.pay", trackerId : "UA-97416420-8"}
			    ,{mid : ["SBFhs001"], url : "/homestory/FirmPaymentAction.pay", trackerId : "UA-97416420-9"}
			    ,{mid : ["scg00001", "scg00002","scg00003", "scg00004"], url : "/seoulgas/FirmPaymentAction.pay", trackerId : "UA-97416420-10"}
			    ,{mid : ["akmall1t", "akmall1r", "akmall1g"], url : "/akmall/FirmPaymentUIAction.pay", trackerId : "UA-97416420-11"}
			    ,{mid : ["goodoc1t", "goodoc1r", "goodoc1g"], url : "/goodoc/FirmMobileAuthAction.pay", trackerId : "UA-97416420-12"}
			    ,{mid : ["hiplus3t", "hiplus3r", "hiplus1g"], url : "/hiplus/FirmPaymentUIAction.pay", trackerId : "UA-97416420-12"}
			    ,{mid : ["moolba1t", "moolba1r", "moolba2t", "moolba2r", "moolba1g"], url : "/moolban/FirmPaymentUIAction.pay", trackerId : "UA-97416420-13"}
			    ,{mid : ["afreec1t", "afreec1r", "afreec1g"], url : "/afreeca/FirmPaymentUIAction.pay", trackerId : "UA-97416420-14"}
			    ,{mid : ["stove1t", "stove1r", "stove1g"], url : "/smilegate/FirmPaymentUIAction.pay", trackerId : "UA-97416420-15"}
			    ,{mid : ["cultur1t", "cultur1r", "cultur1g"], url : "/firm/FirmCultureLandUIAction.pay", trackerId : "UA-97416420-17"}
			    ,{mid : ["afreec2t", "afreec2r", "afreec1g"], url : "/afreeca/FirmRegularUIAction.pay", trackerId : "UA-97416420-18"}
			    ,{mid : ["toomic1t", "toomic1r", "toomic1g"], url : "/toomics/FirmPaymentUIAction.pay", trackerId : "UA-97416420-19"}
			    ,{mid : ["nexonpyt", "nexonpyr", "nexonpyg"], url : "/firm/FirmNexonpayAction.pay", trackerId : "UA-97416420-20"}
			    ,{mid : ["cjmall1t", "cjmall1r", "cjmall1g"], url : "/cjmall/FirmPaymentUIAction.pay", trackerId : "UA-97416420-21"}
			    ,{mid : ["modeto1t", "modeto1r", "modeto1g"], url : "/modetour/FirmPaymentUIAction.pay", trackerId : "UA-97416420-22"}
			    ,{mid : ["bunjan1t", "bunjan1r", "bunjan1g"], url : "/bunjang/FirmPaymentUIAction.pay", trackerId : "UA-97416420-23"}
			    ,{mid : ["bio1101t", "bio1101r", "bio1101g"], url : "/desimone/FirmRegularUIAction.pay", trackerId : "UA-97416420-24"}
			    ,{mid : ["sikdae1t", "sikdae1r", "sikdae1g"], url : "/sikdae/FirmPaymentUIAction.pay", trackerId : "UA-97416420-25"}
			    ,{mid : ["hmallp1t", "hmallp1r", "hmallp1g"], url : "/hmall/FirmPinAction.pay", trackerId : "UA-97416420-26"}
			    ,{mid : ["zeroqr1t", "zeroqr1r", "zeroqr1g"], url : "/firm/FirmCommonArsAction.pay", trackerId : "UA-97416420-27"}
			    ,{mid : ["uniwil1t", "uniwil1r", "uniwil1g"], url : "/wizzpay/FirmPaymentUIAction.pay", trackerId : "UA-97416420-28"}
			    ,{mid : ["theban1t", "theban1r", "homefd1g"], url : "/sidedish/FirmPaymentUIAction.pay", trackerId : "UA-97416420-29"}
			    ,{mid : ["kcmeat1t", "kcmeat1r", "homefd2g"], url : "/kcmeat/FirmPaymentUIAction.pay", trackerId : "UA-97416420-30"}
			   ];

var PAGE_INFO = [
              		  {page : "cashRcpt.jsp", title : "현금영수증설정"}
              		, {page : "chgPwd.jsp", title : "비밀번호 변경"}
              		, {page : "initCert.jsp", title : "비밀번호 초기화(본인인증)"}
              		, {page : "initPin.jsp", title : "비밀번호 초기화(비밀번호 설정)"}
              		, {page : "main.jsp", title : "계좌관리"}
              		, {page : "unReg.jsp", title : "서비스해지"}
              		, {page : "arsFail.jsp", title : "ARS 인증 실패"}
              		, {page : "bnkTime.jsp", title : "은행점검"}
              		, {page : "error.jsp", title : "에러"}
              		, {page : "svcTime.jsp", title : "시스템작업"}
              		, {page : "transCnl.jsp", title : "등록/결제 실패"}
              		, {page : "pay.jsp", title : "결제"}
              		, {page : "acct.jsp", title : "계좌입력"}
              		, {page : "ars.jsp", title : "ARS 인증"}
              		, {page : "cert_app.jsp", title : "본인인증(APP) 확인"}
              		, {page : "cert_sms.jsp", title : "본인인증(문자) 확인"}
              		, {page : "cert.jsp", title : "본인인증"}
              		, {page : "pin.jsp", title : "비밀번호 설정"}
              		, {page : "select.jsp", title : "은행선택"}
              		, {page : "success.jsp", title : "계좌 등록 성공"}
              		, {page : "terms.jsp", title : "약관"}
              		//원더페이
              		, {page : "arsAuthFail.jsp", title : "ARS 인증 실패"}
              		, {page : "doArsAuth.jsp", title : "ARS 인증"}
              		, {page : "inputAcctNo.jsp", title : "계좌입력"}
              		, {page : "checkAcctAmt.jsp", title : "계좌점유인증"}
              		, {page : "regComplete.jsp", title : "계좌 등록 성공"}
              		, {page : "setBank.jsp", title : "은행선택"}
	              ];
SettleBank = {
		
		init: function(mid){
			USE_GTAG = true;
			var ver = 0; // Browser Version
			
			if(navigator.appName.charAt(0) == "M"){
				ver = getIEVersion("MSIE");
				if ( ver < "9"){
					//구글 애널리틱스 IE8이하 지원 중단
					USE_GTAG = false;
				}
			}
			
			for(var i = 0 ; i < URL_INFO.length ; i++){
				var _mid = URL_INFO[i].mid;
				for(var j = 0 ; j < _mid.length ; j++){
					if(_mid[j] == mid){
						URL_PATH = URL_INFO[i].url;
						TRACKER_ID = URL_INFO[i].trackerId;
						CONTENTS_GROUP = URL_INFO[i].contentsGroup;
						CONTENTS_NAME = URL_INFO[i].name;
						break;
					}
				}	
			}
				
			if(USE_GTAG){
				var tag = document.createElement('script');
				tag.src = "https://www.googletagmanager.com/gtag/js?id="+TRACKER_ID; 
				tag.setAttribute('async', '');
				var firstScriptTag = document.getElementsByTagName('script')[0];
				firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
				window.dataLayer = window.dataLayer || [];
			}
		},

		gtag: function(){
			dataLayer.push(arguments);
		},
		
		gaTracker: function(path){
			if(USE_GTAG){
				if(TRACKER_ID){
					PAGE_VIEW = path;
					var title = this.getPageTitle(path);
		
					this.gtag('js', new Date());
					this.gtag('config', TRACKER_ID, { 
						'page_title' : title,
						'page_path' : PAGE_VIEW+'?title='+title
					});
				}
			}
			
		},
		
		gaEvent: function(category, label){
			if(USE_GTAG){
				if(TRACKER_ID){
					this.gtag('event', 'click', {
						'event_category' : category,
						'event_label' : label
					});
				}
			}
		},
		
		getPageTitle:function(path){
			var title;
			
			for(var i = 0 ; i < PAGE_INFO.length ; i++){
				if(path.indexOf(PAGE_INFO[i].page) != -1){
					title = PAGE_INFO[i].title;
					break;
				}
			}
			
			return title;
		},
		
		/*getIEVersion:function(ver){
			var rv = -1; // Return value assumes failure.
			var ua = navigator.userAgent;
			var re = null;
			if(ver == "MSIE"){
				re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			}else{
			re = new RegExp(ver+"/([0-9]{1,}[\.0-9]{0,})");
				}
			if (re.exec(ua) != null){
				rv = parseFloat(RegExp.$1);
			}
			return rv;
		}*/
		
};

function getIEVersion(ver){
	var rv = -1; // Return value assumes failure.
	var ua = navigator.userAgent;
	var re = null;
	if(ver == "MSIE"){
		re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	}else{
	re = new RegExp(ver+"/([0-9]{1,}[\.0-9]{0,})");
		}
	if (re.exec(ua) != null){
		rv = parseFloat(RegExp.$1);
	}
	return rv;
} 

$(function(){
	
	try{
		//엔터 제어
		$('input').on('keydown', function(e){
			if(e.which == 13){
				return false;
			}
		});
	
		//닫기버튼 event
		$('.btn_cls').click(function(){
			if(PAGE_VIEW != undefined){
				SettleBank.gaEvent('닫기버튼', SettleBank.getPageTitle(PAGE_VIEW)+" 화면에서 종료");
			}
		});
		
		//은행선택
		$('.bank_list li').click(function(e){
			var bankNm = $(this).find('img').attr('alt');
			SettleBank.gaEvent('은행선택', bankNm+" 선택");
			if($(this).attr('data-reg') == '05'){
				SettleBank.gaEvent('은행 미사용안내 선택', bankNm+" 선택");
			}
		});
		
		var eventBtnInfo = [{
		                    eventId : "UA-97416420-4", data :
				                    [{id:"cancle", desc : "예금주성명조회 취소"}
				                    , {id:"doArs", desc : "ARS 인증"}
				                    , {id:"doArsCancel", desc : "ARS 인증 취소"}
				                    , {id:"doAuthAcctNmCheck", desc : "계좌인증 요청"}
			                    ]
							}];
			
		$('button').click(function(e){
			if(USE_GTAG){
				var btnId = $(this).attr('id');
				
				for(var i = 0 ; i < eventBtnInfo.length ; i++){
					if(eventBtnInfo[i].eventId == TRACKER_ID){
						var data = eventBtnInfo[i].data;
						for(var j = 0 ; j < data.length ; j++){
							if(btnId == data[j].id){
								SettleBank.gaEvent(data[j].desc, SettleBank.getPageTitle(PAGE_VIEW)+" 화면에서");
								break;
							}
						}
					}
				}
			}
		});
		
	}catch(e){
		
	}
});

window.onload = function(){
	try{
		window.document.body.scroll="auto";
	}catch(e){
		
	}
}
