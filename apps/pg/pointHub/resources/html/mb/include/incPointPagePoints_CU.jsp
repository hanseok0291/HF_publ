<%@  page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"
%><%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"
%><%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"
%><%@ taglib prefix="fmt"    uri="http://java.sun.com/jsp/jstl/fmt" %>
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
 * @desc     : [공통 include]포인트 조회 Contents html(소진형 - 모바일)
 * @FileName : /src/main/webapp/WEB-INF/views/mb/include/incPointPageContents_CU.jsp
 * @author   : lys
 * @since    : 2020.06.15.
 * @version  : 1.0
 * @see 
 * <pre>
 * << 개정이력(Modification Information) >>
 * 수 정 일                      수 정 자                수정내용
 * ----------   --------   -----------------------------
 * 2020.06.15   lys        최초생성
 * </pre>
 **********************************************************************************************
--%>
    <section class="contents" style="padding: 0px 12px 12px 12px;">
        <div class="container" style="padding: 0 12px 70px !important;">
            <!-- 20190617 "포인트전부사용" 버튼 추가 -->
            <div class="have_point add_btn">
                <ul>
                    <li><span id="custName"><c:out value="${result.custName}"/></span>님 총 보유 포인트</li>
                    <li><span id="ttlAvlPnt" val='<c:out value="${result.ttlAvlPnt}"/>'></span>P</li>
                </ul>
                <div class="point_use"><div class="btn maxBtn">포인트 전부 사용</div></div>
            </div>
    <c:if test="${fn:length(result.pntList) == 0}">
            <section class="point_null">
                <div class="point_null_script">
                    고객님의 충전 가능 포인트가 없습니다.
                </div>
            </section>
    </c:if>
    <c:if test="${fn:length(result.pntList) > 0}">
            <div class="item_area">
                <div class="item_2th" style="padding: 0px;">
                    <div class="tab">
                        <ul>
                            <li class="tb_top"></li>
                            <li class="tb_top">보유<br>포인트</li>
                            <li class="tb_top">사용<br>포인트</li>
                            <li class="tb_top">전환<br>포인트</li>
                        </ul>
                    </div>
                </div>
    <c:forEach var="pntMap" items="${result.pntList}">
                <div class="item_2th pointGroup">
                    <div class="tab">
                        <ul>
                            <li class="tb_middle"><img src='<c:out value="${pntMap.imageLink}"/>' alt='<c:out value="${pntMap.pntNm}"/>'></li>
                            <li class="tb_middle"><span class="avlPnt" val='<c:out value="${pntMap.avlPnt}"/>'></span><c:out value="${pntMap.dpUnit}"/></li>
                            <li class="tb_middle"><input type="text" class="pnt" val="0" oninput="setPntAmt($(this));" value="0"><c:out value="${pntMap.dpUnit}"/></li>
                            <li class="tb_middle"><span class="cprtAmt" val='<c:out value="0"/>'></span><c:out value="${pntMap.dpUnit}"/></li>
                        </ul>
                        <ul>
                            <li class="tb_bottom"></li>
                            <li class="tb_bottom"></li>
                            <li class="tb_bottom"><div class="btn maxBtn">전액충전</div></li>
                            <li class="tb_bottom"><div class="btn initBtn">초기화</div></li>
                        </ul>
                    </div>
                    <input type="hidden" class="pntCd" value='<c:out value="${pntMap.pntCd}"/>'>
                    <input type="hidden" class="pntTrNo" value='<c:out value="${pntMap.pntTrNo}"/>'>
                    <input type="hidden" class="dealUnit" value='<c:out value="${pntMap.dealUnit}"/>'>
                    <input type="hidden" class="minAvlPnt" value='<c:out value="${pntMap.minAvlPnt}"/>'>
                    <input type="hidden" class="maxPerDeal" value='<c:out value="${pntMap.maxPerDeal}"/>'>
                    <input type="hidden" class="pntExchRate" value='<c:out value="${pntMap.pntExchRate}"/>'>
                    <input type="hidden" class="pntAmt">
                </div>
                
                <c:if test="${not empty pntMap.pntRule}">
                    <div class="item_script">
                        <%--
                        <c:if test="${pntMap.pntExchRate < 1}">
                            <div class="bullet" style="color: red;">※</div>
                            <div class="script" style="color: red;">
                                <c:out value="${pntMap.pntNm}"/>는 <fmt:parseNumber integerOnly="true" value="${pntMap.pntExchRate * 100}"/>%만 전환 됩니다.
                            </div>
                        </c:if>
                        --%>
                        <c:if test="${pntMap.pntCd == 'samsungcard'}">
                            <div class="bullet" style="color: red;">※</div>
                            <div class="script" style="color: red;"><c:out value="${pntMap.pntRule}" escapeXml="false" /></div>
                        </c:if>
                        <c:if test="${pntMap.pntCd != 'samsungcard'}">
                            <div class="bullet">※</div>
                            <div class="script"><c:out value="${pntMap.pntRule}" escapeXml="false" /></div>
                        </c:if>
                    </div>
                </c:if>
                
                <c:if test="${empty pntMap.pntRule}">
                    <div class="item_script">
                        <c:if test="${pntMap.pntExchRate < 1}">
                            <div class="bullet" style="color: red;">※</div>
                            <div class="script" style="color: red;">
                                <c:out value="${pntMap.pntNm}"/>는 <fmt:parseNumber integerOnly="true" value="${pntMap.pntExchRate * 100}"/>%만 전환 됩니다.
                            </div>
                        </c:if>
                    </div>
                </c:if>
                <div class="dot"><div class="dot_line"></div></div>
    </c:forEach>
            </div>
    </c:if>
        </div>
    </section>