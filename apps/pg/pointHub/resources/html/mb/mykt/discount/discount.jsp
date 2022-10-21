<%@  page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%><%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"
%><%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"
%><%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%--
 **********************************************************************************************
 * @desc : 마이케이티 통신료 할인받기 View
 * @FileName : /pointHub/src/main/webapp/WEB-INF/views/mb/mykt/discount/discount.jsp
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
		<script type="text/javascript" src="https://mtb.kt.com/js/common/global/mKTGlobal.js"></script>
		
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
	</head>
	
	<body>
		<div id="mCfmClGnb">
			<script type="text/javascript">
			 	mkt.gnb(); 
				s.pageName = "^m^KT-개인^마이페이지^요금명세서^통신료 할인받기";		
			</script>
		</div>		 
		<div class="wrapDiscount"> 
			<c:if test="${rootMap.userInfo.isMember != 'Y'}">
				<div class="boxReward">				
					<div class="txt1"><img src="${ResRoot}/mb/mykt/img/kt-super-reward.png" alt="kt슈퍼리워드"></div>
					<div class="txt2">KT 슈퍼리워드 회원이 되시면 K포인트를 <br>쌓아 통신료 할인을 받으실 수 있습니다.<br>(만 14세 이상 이용 가능)</div>
					<div class="btnWrap">
						<button class="popup-open-ly1">간편 가입하기</button> 
					</div> 
				</div>
			</c:if> 
			<c:if test="${rootMap.userInfo.isMember == 'Y'}">
				<div class="boxPoint"> 
					<div class="txt1">${rootMap.userInfo.user_nm}님의 K포인트</div> 
					<div class="txt2">
						<fmt:formatNumber type="number" var="ttlAvlPnt" maxFractionDigits="3" value="${rootMap.pntInfo.ttlAvlPnt}"/>
						${ttlAvlPnt}P					
					</div>
					<div class="btnWrap">
						<button onclick="javascript:mvMyktAppPointPay();">통신료 납부</button>
					</div>
				</div>			
			</c:if>
			
			<div class="promotion">
				<h3>통신료 할인 프로모션</h3>
				<ul>
					<c:if test="${empty rootMap.offerload.item_list}">
						<li>
							<div align="center" style="margin-top: 25px;"> 
								<font size="4" color="gray">할인프로모션이 존재하지 않습니다</font> 
							</div>
						</li>
					</c:if>
					<c:if test="${fn:length('${rootMap.offerload.item_list}') > 0}">
						<c:forEach items="${rootMap.offerload.item_list}" var="offerwallList" varStatus="idx">
							<li id="offerObj${idx.count}" ag_flag="${offerwallList.ag_flag}" 		 list_img_a="${offerwallList.list_img_a}"
														  coin="${offerwallList.coin}"               appkey="${offerwallList.appkey}"
														  ad_category="${offerwallList.ad_category}" action_plan="${offerwallList.action_plan}"
														  ag_flag="${offerwallList.os_flag}"     	 list_img_a="${offerwallList.list_title}">

								<div class="vi" onclick="affiliateLinkCheck(${idx.count});">
									<c:choose>
										<c:when test="${offerwallList.list_img_a == ''}">
											<img src="${offerwallList.list_img_b}" onClick="KT_trackClicks('m마이페이지_통신료할인받기','^m마이페이지_통신료할인받기^오퍼월^${offerwallList.app_nm}');" alt="" class="banner">										
										</c:when>
										<c:otherwise>
											<img src="${offerwallList.list_img_a}" onClick="KT_trackClicks('m마이페이지_통신료할인받기','^m마이페이지_통신료할인받기^오퍼월^${offerwallList.app_nm}');" alt="" class="banner">										
										</c:otherwise> 
									</c:choose>
								</div> 
								<div class="txt1">
									<span class="ty1">${offerwallList.ad_category}</span>									
								</div>
								<div class="txt2">${offerwallList.view_main_text}</div>
								<div class="txt3">${offerwallList.list_sub_text}</div>	
								<div class="btnWrap">
									<button onclick="affiliateLinkCheck(${idx.count});">K포인트받기</button>
								</div> 									
							</li>
						</c:forEach> 
			    	</c:if>	
				</ul>
				<input type="hidden" id="attendUrl">
			</div>
	    	<%-- popUpUnfo include --%> 
			<jsp:include page="/WEB-INF/views/mb/mykt/popupInfo.jsp" flush="false" />	
		</div> 
		<%-- wrapDiscount End.. --%>
		
		<%-- jsp include --%> 
		<jsp:include page="/WEB-INF/views/mb/mykt/discount/discountJs.jsp" flush="false" />
	</body>
</html>

