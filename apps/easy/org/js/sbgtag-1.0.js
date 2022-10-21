var URL_PATH, TRACKER_ID;
var URL_INFO = [
        		 {mid : ["baemint","billingn", "billingp", "billingq"], url : "/woowahan/FirmPaymentAction.pay", trackerId : "UA-97416420-3"}
			    ,{mid : ["goodchct", "goodchcr"], url : "/goodchc/FirmPaymentAction.pay", trackerId : "UA-97416420-5"}
			    ,{mid : ["shopnt01", "shopnt", "shopnt_r"], url : "/shopnt/FirmPaymentAction.pay", trackerId : "UA-97416420-6"}
			    ,{mid : ["wonder1t", "wonder1r"], url : "/firm/FirmWonderAction.pay", trackerId : "UA-97416420-4"}
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
              		, {page : "regComplete.jsp", title : "계좌 등록 성공"}
              		, {page : "setBank.jsp", title : "은행선택"}
	              ];
var PAGE_VIEW;

SettleBank = {
		
		init: function(mid) {
			
			for(var i = 0 ; i < URL_INFO.length ; i++)
			{
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
			
			var tag = document.createElement('script');
			tag.src = "https://www.googletagmanager.com/gtag/js?id="+TRACKER_ID; 
			tag.setAttribute('async', '');
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

			window.dataLayer = window.dataLayer || [];
			
		},

		gtag: function() {
			dataLayer.push(arguments);
		},
		
		gaTracker: function(path){
			
			if(TRACKER_ID){
				PAGE_VIEW = path;
				var title = this.getPageTitle(path);
	
				this.gtag('js', new Date());
				this.gtag('config', TRACKER_ID, { 
					'page_title' : title,
					'page_path' : PAGE_VIEW+'?title='+title
				});
			}
			
		},
		
		gaEvent: function(category, label){
			if(TRACKER_ID){
				this.gtag('event', 'click', {
					'event_category' : category,
					'event_label' : label
				});
			}
		},
		
		getPageTitle:function(path){
			var title;
			
			for(var i = 0 ; i < PAGE_INFO.length ; i++)
			{
				if(path.indexOf(PAGE_INFO[i].page) != -1)
				{
					title = PAGE_INFO[i].title;
					break;
				}
			}
			
			return title;
		}
};

$(function(){
	
	try{
	
		//닫기버튼 event
		$('.btn_cls').click(function(){
			SettleBank.gaEvent('닫기버튼', SettleBank.getPageTitle(PAGE_VIEW)+" 화면에서 종료");
			
		});
		
		//은행선택
		$('.bank_list li').click(function(e){
			var bankNm = $(this).find('img').attr('alt');
			SettleBank.gaEvent('은행선택', bankNm+" 선택");
		});
		
		var eventBtnInfo = [{
		                    eventId : "UA-97416420-4", data :
				                    [{id:"doAuthAcctNmCheck", desc : "예금주성명조회"}
				                    , {id:"cancle", desc : "예금주성명조회 취소"}
				                    , {id:"doArs", desc : "ARS 인증"}
				                    , {id:"doArsCancel", desc : "ARS 인증 취소"}
			                    ]
							}];
			
		$('button').click(function(e){
			var btnId = $(this).attr('id');
			
			for(var i = 0 ; i < eventBtnInfo.length ; i++)
			{
				if(eventBtnInfo[i].eventId == TRACKER_ID){
					var data = eventBtnInfo[i].data;
					console.log(data)
					for(var j = 0 ; j < data.length ; j++)
					{
						if(btnId == data[j].id){
							SettleBank.gaEvent(data[j].desc, SettleBank.getPageTitle(PAGE_VIEW)+" 화면에서");
							break;
						}
					}
					
				}
				
			}
		});
	}catch(e){
		
	}
});
