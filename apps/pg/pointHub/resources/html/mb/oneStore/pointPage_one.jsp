<%@  page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%><%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"
%><%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"
%><%@ taglib prefix="fmt"    uri="http://java.sun.com/jsp/jstl/fmt"
%><%@ taglib prefix="spring" uri="http://www.springframework.org/tags" %>
<!-- 
   Point Hub version 1.0
  
   Copyright ⓒ 2014 kt corp. All rights reserved.
   
   This is a proprietary software of kt corp, and you may not use this file except in 
   compliance with license agreement with kt corp. Any redistribution or use of this 
   software, with or without modification shall be strictly prohibited without prior written 
   approval of kt corp, and the copyright notice above does not evidence any actual or 
   intended publication of such software. 
 -->
<%--
 **********************************************************************************************
 * @desc : 포인트 조회 결제 화면(원스토어 전용)
 * @FileName : /src/main/webapp/WEB-INF/views/mb/oneStore/pointPage_one.jsp
 * @author lys
 * @since 2020.05.29
 * @version 1.0
 * @see 
 * <pre>
 * << 개정이력(Modification Information) >>
 * 수 정 일                     수 정 자                 수정내용
 * ----------   --------   -----------------------------
 * 2020.05.29   lys        최초생성
 * </pre>
 **********************************************************************************************
--%>
<!DOCTYPE html>
<html lang="ko">
<head>
	<%-- Head --%>
	<jsp:include page="/WEB-INF/views/mb/include/globalVar.jsp" flush="false" />
	
	<%-- Head --%>
	<jsp:include page="/WEB-INF/views/mb/include/incHead.jsp" flush="false" />
</head>
<body>



<div id="wrap">
<!-- header 시작-->
	<header class="index">
		<div class="container" style="padding:0;">
			<form id="pointForm" method="post">
				<input type="hidden" id="hdn_pgTrNo" name="pg_tr_no">
				<input type="hidden" id="hdn_phubTrNo" name="phub_tr_no">
				<input type="hidden" id="hdn_payAmt" name="pay_amt">
				<input type="hidden" id="hdn_points" name="points">
				<input type="hidden" id="hdn_pointsAmt" name="points_amt">
				<input type="hidden" id="hdn_wonAmt" name="won_amt">
				<input type="hidden" id="hdn_authLimitDtm" name="auth_limit_dtm">
				<input type="hidden" id="hdn_payMethod" name="pay_method">
				<input type="hidden" id="hdn_retCode" name="ret_code">
				<input type="hidden" id="hdn_retMsg" name="ret_msg">
			</form>
			
			<input type="hidden" id="itemName" name="itemName" >
			<input type="hidden" id="itemPrice" name="itemPrice" value="0">
			<input type="hidden" id="totalPointAmtVal" name="totalPointAmtVal" value="0">
			
			<div class="title">포인트다모아</div>
            <div class="script_text">카드사별 1,000P 단위 사용가능 (단! 현대카드는 1,500M)</div>
			<div class="total">
               <ul>
                    <li style="padding:5px;">
                        <div class="point">
                            <ul>
                                <li style="font-size:14px;"><!--전환 포인트-->결제금액</li>
                                <li><span id="ttlPayAmt" val='<c:out value="${result.ttlPayAmt}"/>'></span>원</li>
                            </ul>
                        </div>
                    </li>
                    <li style="padding:5px;">
                        <div class="point">
                            <ul>
                                <li style="padding: 5px 0; font-size:14px;">
									<span class="addBtn">최대 할인 가능 포인트 
										<span class="toggleBtn1">?</span>
									</span>
								</li>
                                <li><span id="limitPayAmt" val='<c:out value="${result.limitPayAmt}"/>'></span>P</li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
       </div>
	   <!-- 팝업 추가 -->
		<div class="popup_toggle1">
			<p class="popup_title">포인트다모아 포인트 안내</p>
			<p class="popup_text">결제 금액의 ${result.mxmmDscntRt}%까지 사용하실 수 있습니다.<br />(수수료 별도 청구)</p>
			<span class="closeBtn">닫기</span>
		</div>
    </header>
<!-- header 끝-->

<!-- contents 시작-->
		<jsp:include page="/WEB-INF/views/mb/include/incPointPagePoints_CO.jsp"/>
<!-- contents 끝-->

    <!-- footer 시작-->
	<section class="footer" style="padding: 0 0 48px;">
		<div class="total_point">
            <div class="tab">	
                <div class="popup_toggle2" id="popup2">
                    <p class="popup_title">포인트결제 안내</p>
                    <p class="popup_text">카드사별 <fmt:formatNumber type="number" maxFractionDigits="3" value="${result.dealUnit}" />포인트 단위로 전환 가능합니다.</p>
                    <p class="popup_text">전환 포인트가 <fmt:formatNumber type="number" maxFractionDigits="3" value="${result.dealUnit}" />의 배수가 되게 입력해주세요.</p>
                    <span class="closeBtn">닫기</span>
                </div>
                <div class="popup_toggle2" id="popup3" style="margin: 90px 0px;">
                    <p class="popup_title">포인트결제 안내</p>
                    <p class="popup_text">현대카드 건당 <span id="popup3_point"></span>포인트까지 사용 가능합니다</p>
                    <span class="closeBtn">닫기</span>
                </div> 
                <ul>
                    <li class="tb_middle">합계</li>
                    <li class="tb_middle"><span id="total_avlPnt" val="0">0</span>P</li>
                    <li class="tb_middle"><span id="total_pnt" val="0">0</span>P</li>
                    <li class="tb_middle"><span id="ttlCprtAmt" val="0">0</span>P</li>
                </ul>
            </div>
            <div class="dot"><div class="dot_line"></div></div>
             <div class="tab">
				
				<!-- 팝업 버튼 추가 & width, padding 조정 -->
                <ul>
                    <li class="tb_middle" style="width: 73.4%; padding:3px 0 5px 5px;">
						<!-- 팝업 버튼 추가 -->
						<span class="addBtn">결제 할인액
							<span class="toggleBtn2">?</span>
						</span>
					</li>
                    <li class="tb_middle" style="width: 26.6%; padding:3px 0 5px;"><span id="paymentDiscountAmount">0</span>원</li>
                </ul>
				
				<!-- 팝업 추가 -->
				<div class="popup_toggle2" id="popup1">
					<p class="popup_title">결제 할인액 안내</p>
					<p class="popup_text">결제 할인액은 총 전환포인트의 ${result.cprtCmsnRate}% 수수료를 차감한 금액이며 ${result.dealUnit}P 단위로 사용하실 수 있습니다.</p>
					<span class="closeBtn">닫기</span>
				</div>
           </div>
       </div>
		<div class="submet_btn" style="position: fixed; bottom: 0;">
			<ul>
				<li><a href="#!"><div id="cancelBtn" class="btn_cancel">취소</div></a></li>
				<li><a href="#!"><div id="confirmBtn" class="btn_ok">확인</div></a></li>
			</ul>
		</div>
	</section>
    <!-- footer 끝-->
</div>
<%-- Footer --%>
<jsp:include page="/WEB-INF/views/mb/include/incFooter.jsp" flush="false" />

<%-- js --%>
<jsp:include page="/WEB-INF/views/pc/oneStore/pointPageJs_one.jsp" flush="false" />
</body>
</html>