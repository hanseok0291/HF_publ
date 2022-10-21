<%@  page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%--
 **********************************************************************************************
 * @desc : 마이케이티 통신료 할인받기 Js
 * @FileName : /pointHub/src/main/webapp/WEB-INF/views/mb/mykt/discount/discountJs.jsp
 * @author jungukjae
 * @since 2020.04.16
 * @version 1.0
 * @see 
 * <pre>
 * << 개정이력(Modification Information) >>
 *  수 정 일      수 정 자             수정내용
 * ----------   -----------   -----------------------------
 * 2020.04.16    jungukjae      	   최초생성
 * </pre>
 **********************************************************************************************
--%> 

<script type="text/javascript">

	$(document).ready(function() {
		
		fn.tab.init();	
		
				
		//입력폼 포커스
		$(".has_input").focusin(function(){
			$(".has_input").removeClass("focus");
			$(this).addClass("focus");
		}).focusout(function(){$(this).removeClass("focus");});
		
		function inputClear(){
			$('.has_input input').focus();
		}
		
		$('.popup-s3_list_product a').on('click', function() {
		   $('.popup-s3_list_product a').removeClass('on');
		   $(this).addClass('on');
		   return false;
		});
		
		$('.btn_opt').on('click', function() {
		   $(this).toggleClass('on');
		   $('.wrap_sort').toggleClass('view');
		   return false;
		});
		
		$('.btn_time').on('click', function() {
		   $(this).toggleClass('on');
		   return false;
		});
		
		$('.term_set button').on('click', function() {
		   $('.term_set button').removeClass('on');
		   $(this).addClass('on');
		   $('.date_set').removeClass('view');
		});
		
		$('.term_set button.btn_input').on('click', function() {
		   $('.date_set').addClass('view');
		});		
	});
	
	//함수
	var fn = {
		// 탭 관련 함수
		page : {
			backEvent : function() { 
				var operatingDevice = '${rootMap.userInfo.os}'; //운영체재 변수를 체크(Android, IOS)
				if(operatingDevice == "ios") { 
					//IOS
			        window.webkit.messageHandlers.closeWebview.postMessage("");
				}else {
					//안드로이드
			        window.Kpoint.closeWebview();
				}
			}					
		},
		tab : {
			init : function() {	//화면 최초로드시 초기화 처리함수..
				
				//팝업
				popupConfirmLy1();
				popupConfirmLy2();
				popupConfirmLy3();
				popupConfirmLy4();
				setAgreeEvent();

			}
		}
	}	
	
	//ajax 통신 후 가져온 data를 담을 전역변수 
	var glbData;
	
	//이용 약관 팝업
	function popupConfirmLy1(){
		var $popupBtn 	= $(".popup-open-ly1");
		var $popup 		= $(".popup-confirm-ly1");
		var $popupClose = $(".popup-close-ly1");
		
		var $popup2		 = $(".popup-confirm-ly12"); 
		var $popupClose2 = $(".popup-close-ly12");
		
		$popupBtn.on('click', function (e) {
			
			//팝업 나타날 때 체크박스 상태
			$("input[id=prov-all]").prop("checked", false); 
			$("input[class=chk]").prop("checked", false); 
			
			//약관요청 Ajax  
			var url = '<c:url value="/mykt/req/discount/terms.do"/>';
			var params = {
			 	 
			} 
			var type = 'post';
			var dataType = 'json';
			
			var success = function(data) { 
				//14세 이상일 경우
				if(data.userAgeCheck == 'Success') {
					
					//return data를 전역변수 glbData에  
					glbData = data;
					console.log(glbData);					
					
					//개인정보 3자 제공 약관 list 
					$('.list-st1').empty();
					$('.list-st1').append('<div><ul><li>' + data.cardInfoList[0].prvdrNm + " : " + glbData.cardInfoList[10].rcvrNm +'</li>'+
											'<li>' + data.cardInfoList[0].prps + " : " + data.cardInfoList[10].prps +'</li>'+
											'<li>' + data.cardInfoList[0].item + " : " + data.cardInfoList[10].item +'</li>'+
											'<li>' + data.cardInfoList[0].holdPrd + " : " + data.cardInfoList[10].holdPrd +'</li>' +
											'<li class="last">' + "※ 고객님은 개인정보 제3자 제공 동의를 거부할 권리가 있으니 동의 하셔야 멤버십 서비스 가입 및 이용이 가능합니다." + '</li></ul></div><br>');
				 	
					//약관 팝업
					$popup.fadeIn(200); 		
					
				} else {
					//14세 이하일 경우
					$popup2.fadeIn(200);
					
					$popupClose2.on('click', function (e) {
						$popup2.fadeOut(200);
					});
					
				}
			}
			var errCustom = function(data, textStatus, jqXHR) {	
				console.log("fail : " + data);
				
				var alertMsg = data.ret_msg;
				PHFnc.alert(alertMsg);
			}
			PHFnc.ajax(url, params, type, dataType, success, errCustom, true, true, false);  		

		});
		
		$popupClose.on('click', function (e) {
			$popup.fadeOut(200);
		});
	}
	
	<%-- 핀크럭스 참여가능정보 요청	--%>
	function affiliateLinkCheck(idx) {
		
		var appkey    = $('#offerObj'+idx).attr('appkey');		
		var event_pop = $("#event_join_pop"); 
		var isMember  = PHUtil.nvl('${rootMap.userInfo.isMember}', "N");
		var $popupBtn = $(".popup-open-ly1");
		
		<%-- Step1. Sever로부터 내려온 유저정보로부터 슈퍼리워드(회원/비회원) 분기처리 --%>
		if(isMember == 'Y') {
			<%-- Step2. 슈퍼리워드 회원 : 핀크럭스 참여정보 API요청 --%>

		   /* 
			* @param appkey(필수)   |  광고코드      		  |	오퍼월 리스트에서 전달받은 APPKEY 							    
			* @param pubkey(필수)	 |  매체코드      	      |	핀 크럭스에서 발급된 키값 
			* @param userkey(필수)	 |  매체사 회원 식별키    | USER_TOKEN(유저토큰) 	
	 		*/
			
			//Request(Ajax)
		    var url = '<c:url value="/mykt/req/discount/affiliateLinkCheck.do"/>';
			var params = {
			 	 'appkey'  : appkey ,
			 	 'usrkey'  : '${rootMap.result.response.usrkey}',
		         'pubkey'  : '${rootMap.result.response.pubkey}' 
			}  
			var type = 'post';
			var dataType = 'json';
			var success = function(json) {   
				
				
		        /* 
		         * Response ::: 
		         * 	{
		         * 		"message":"SUCCESS",
		         *      "ret_code":"00",
		         *      "custom_url":"http://api.pincrux.com/custom.pin?token=d2e957dcc6a587da310c7dd64eea66e6be1bfaeb",
		         *      "code":"00"
		         *  }
		         */
				
				if(json.ret_code == '00') {
					//Step1. 이벤트 참여여부 문의 popup유저에게 문의
					var joinUrl = json.custom_url;         	         
					$('#attendUrl').val(joinUrl); 
			        event_pop.fadeIn(200);							
				}else {
					PHFnc.alert('이벤트 참여가 불가능한 상태입니다.');				
				}
			} 
			var errCustom = function(data, textStatus, jqXHR) {	
				var alertMsg = data.ret_msg;
				PHFnc.alert(alertMsg);
			}
			PHFnc.ajaxProc(url, params, type, dataType, success, errCustom, true, true, false, "T");
		}else {
			<%-- Step2. 슈퍼리워드 비회원 : 회원가입 유도 --%>
			if(confirm('슈퍼리워드 비회원입니다.\n 슈퍼리워드 가입을진행 하시겠습니까?')) {
				$popupBtn.trigger('click'); 	//약관Pop호출 함수 Trigger(click)
			}
		}
	}
	
	<%-- 핀크럭스 이벤트 참여가능 문의 popup --%>
	function popupConfirmLy4(){
		var $popup     = $(".popup-confirm-ly13");
		var $popupClose = $(".popup-close-ly13");
		$popupClose.on('click', function (e) {
			$popup.fadeOut(200);
		});
	}	
	
	<%-- 핀크럭스 이벤트 참여처리 --%>	
	function reqOfferDetail() {
		var joinUrl = $('#attendUrl').val();
		joinUrl = PHUtil.replaceAll(joinUrl,'http','https');
		location.href = joinUrl; 
	}	
	
	//슈퍼리워드 이용약관(필수) 상세 팝업
	function popupConfirmLy2(){
		var $popupBtn 	= $(".popup-open-ly2");
		var $popup 		= $(".popup-confirm-ly2");
		var $popupClose = $(".popup-close-ly2");

		$popupBtn.on('click', function (e) {	
			
			    var clsAddr = PHUtil.replaceAll(glbData.clsList[0].clsUrl,'http','https');
			    
			    $('.clipProv').empty();
				$('.clipProv').append('<div><iframe src="' + clsAddr + '"frameborder="0"></iframe><div>');
				
				$popup.fadeIn(200);  		 
		});
		
		$popupClose.on('click', function (e) {
			$popup.fadeOut(200);
		});
	}	 
	
	//슈퍼리워드 개인정보 수집/이용 동의(필수) 상세 팝업
	function popupConfirmLy3(){
		var $popupBtn 	= $(".popup-open-ly3");
		var $popup 		= $(".popup-confirm-ly3");
		var $popupClose = $(".popup-close-ly3");

		$popupBtn.on('click', function (e) {			
			
			$('.perInfo').empty();
			$('.perInfo').append('<div><iframe src="' + glbData.clsList[1].clsUrl + '"frameborder="0"></iframe><div>');
			
			$popup.fadeIn(200); 
		});
		
		$popupClose.on('click', function (e) {
			$popup.fadeOut(200);
		});
	}
	
	function mvMyktAppPointPay() {
		alert('마이케이티 통신료납부 화면으로 이동합니다..');
	}
	
	//약관 동의 체크박수 함수
	function setAgreeEvent() {
		
		var allChk 	  = $("input[id=prov-all]");			//전체 동의 체크박스				
		var chkBox 	  = $("input[class=chk]");				//전체 동의 외 체크박스			
		var chkBoxCnt = $("input[class=chk]").length;		//전체 동의 외 체크박스 개수
		
		allChk.prop("checked", false); 
		chkBox.prop("checked", false); 
			
		//약관 전체 동의 클릭
	 	allChk.click(function(){
	 		
			if ($(this).is(':checked')) {	                           
				chkBox.prop("checked", true);                           
	        } else {
	        	chkBox.prop("checked", false);
	        }	
				
		}); 
		
		//일부 체크 해제시 전체 동의 해제 유무
	  	chkBox.click(function(){
			
			if ($("input[class=chk]:checked").length == chkBoxCnt) {
				allChk.prop("checked", true);                        
		    } else {
		    	allChk.prop("checked", false);
		    }	
			
		});  

	}
	
	<%-- 약관체크 이후, 가입요청(후처리)  --%>
	function superRewardMemberJoin() { 
		//var maxCnt = {rootMap.ClsList.필수약관};	
		var maxCnt=4;	//필수로 표기된 약관체크갯수
		var cnt=0;	
		
		//Step1. 사용자가 체크한 약관의 갯수를 체크
	    $('#termsList #userCheckBox').each(function() {
	    	if($(this).find('input[type=checkbox]').is(':checked')) { 
	    		cnt++;	
	    	}
	    });
		
		//Step2. 체크한 약관정보 셋팅
		var checkArray = [];
		
		//이용약관 체크
		if($('#prov-2').is(':checked')) {
			var checkObj1 = new Object();
			checkObj1['agree_code'] = 'a1';
			checkObj1['agree_yn'] = 'Y';
			checkArray.push(checkObj1);
		}	
		
		//개인정보 수집/이용 동의 체크
		if($('#prov-3').is(':checked')) {
			var checkObj2 = new Object();
			checkObj2['agree_code'] = 'a2';
			checkObj2['agree_yn'] = 'Y';
			checkArray.push(checkObj2);
		}
		
		//Step3. 사용자가 체크한 약관의 수와 필수로체크해야되는 약관을 비교하여 분기처리.
		if(maxCnt==cnt) {	//필수로 표시해야되는 목록의 갯수와 사용자가 체크한 갯수를 매칭..
			if(confirm('슈퍼리워드 가입을\n진행 하시겠습니까?')) {
				var url = '<c:url value="/mykt/req/join/memberJoin.do"/>';
				var checkArryJson = JSON.stringify(checkArray);
				var params = {
					//약관 타이틀과 약관 동의 유무
					'agree' : checkArryJson
				}
				var type = 'post';
				var dataType = 'json';
				var success = function(data) {
					console.log(data);
					alert("가입이 완료되었습니다!");
					jQuery('body').append('<div id="lbarTtlArea"><div class="loadingWrap"><div class="loadinginner"><div></div><div><div></div></div></div></div></div>');
					PHFnc.doAction('<c:url value="/mykt/scr/discount/main.do"/>');			
					
					$(".popup-confirm-ly1").fadeOut(200);
					
			 	}
				var errCustom = function(data, textStatus, jqXHR) {	
					console.log(data);
					var alertMsg = data.ret_msg;
					PHFnc.alert(alertMsg);
				}
				PHFnc.ajax(url, params, type, dataType, success, errCustom, true, true);				
			}
		}else {
			alert('약관체크를 확인하여 주십시오.')
			return;
		}
	}	
</script>
