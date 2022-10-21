<%@page import="org.json.JSONObject"%>
<%@  page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"
%><%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"
%><%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%--
 **********************************************************************************************
 * @desc : MyKt 약관리스트
 * @FileName : /pointHub/src/main/webapp/WEB-INF/views/mb/mykt/termsList.jsp
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

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<title>kt</title>
		<meta charset="utf-8">
		<meta name="title" content="kt" />
		<meta name="keywords" content="m케이티, 엠케이티"> 
		<meta name="description" content="모바일케이티닷컴"> 	
		<meta name="format-detection" content="telephone=no" />
		<meta name="viewport" content="width=device-width" />

		<!-- 통계생성JS(adobe/GA 포함) -->  
		<!-- <script type="text/javascript" src="http://mtb.kt.com/js/common/global/mKTGlobal.js"></script> -->
		<script type="text/javascript" src="https://m.kt.com/js/common/global/mKTGlobal.js"></script>
		
		<c:set var="TimeStamp" value="19112601"	scope="request" /> 
		<c:set var="ResRoot"   value="${pageContext.request.contextPath}/resources"	scope="request" />
		<c:set var="ViewRoot"  value="${pageContext.request.contextPath}" scope="request" />	
		
		<!-- 공통JS -->
		<script src="${ResRoot}/common/js/ph-fnc.js?${TimeStamp}"></script> 
		<script src="${ResRoot}/common/js/ph-util.js?${TimeStamp}"></script> 
		<script src="${ResRoot}/common/js/ph-event.js?${TimeStamp}"></script> 
		<script src="${ResRoot}/common/js/ph-valid.js?${TimeStamp}"></script> 
		
		<!-- Mykt CSS -->
	    <link rel="stylesheet" href="${ResRoot}/mb/mykt/css/paydiscount.css">  
	    <script type="text/javascript" src="${ResRoot}/common/jQuery/jquery.min.js?v331"></script>	
	    	
	    <script type="text/javascript">
		    $(document).ready(function() {		    	
				//초기화
				popupConfirmLy2();
				popupConfirmLy3();
				setAgreeEvent();		    
				popupConfirmLy1();
		    });
		    
			//이용 약관 팝업
			function popupConfirmLy1(){
				var $popupBtn 	= $(".popup-open-ly1");
				var $popup 		= $(".popup-confirm-ly1");
				var $popupClose = $(".popup-close-ly1");
				
				var $popup2 	 = $(".popup-confirm-ly12"); 
				var $popupClose2 = $(".popup-close-ly12");
					
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
					console.log(data);
					console.log("fail");
					var alertMsg = data.ret_msg;
					PHFnc.alert(alertMsg);
				}
				PHFnc.ajax(url, params, type, dataType, success, errCustom, true, true, false);  		
				
				$popupClose.on('click', function (e) {
					$popup.fadeOut(200);
				});
			}
			
			//슈퍼리워드 이용약관(필수) 상세 팝업
			function popupConfirmLy2(){
				var $popupBtn = $(".popup-open-ly2");
				var $popup = $(".popup-confirm-ly2");
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
				var $popupBtn = $(".popup-open-ly3");
				var $popup = $(".popup-confirm-ly3");
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
				
				//Step2. 사용자가 체크한 약관의 수와 필수로체크해야되는 약관을 비교하여 분기처리.
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
	</head>
	
	<body>
		<div id="mCfmClGnb">
			<script type="text/javascript">
				s.pageName = "^m^KT-개인^마이페이지^요금명세서^통신료 할인받기";		
			 	mkt.gnb(); 
			</script>
		</div>		
    	<%-- popUpUnfo include --%> 
		<jsp:include page="/WEB-INF/views/mb/mykt/popupInfo.jsp" flush="false" />	
		<%-- wrapDiscount End.. --%>
	</body>
</html>

