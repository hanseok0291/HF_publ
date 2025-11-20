<%@ page language="java" contentType="text/html;charset=UTF-8"
pageEncoding="UTF-8" %>

<jsp:include page="/WEB-INF/views/terms/common/header.jsp" />

<div class="modal-body">
  <!-- 게시판 상세 -->
  <div class="blank-box" style="height: 72px"></div>
  <h2 class="title-text">서비스 알림 동의 (공동구매)</h2>
  <br />
  <div class="terms-con">
    <div>
      공동구매 챌린지 서비스 알림 동의 시 공동구매 혜택 정보에 대한 알림을 받으실 수 있습니다.
    </div>
    <br />
    <div class="rround-table-scroll">
      <table class="rround-terms-table">
        <tbody>
          <tr>
            <td class="cell-content">공동구매 상품 오픈 </td>
            <td class="cell-content">공동구매 상품 오픈에 대한 알림을 받아 볼 수 있어요.</td>
          </tr>
          <tr>
            <td class="cell-content">공동구매 달성 현황</td>
            <td class="cell-content">
              참여한 공동구매의 달성 현황에 대한 알림을 받아 볼 수 있어요.
            </td>
          </tr>
          <tr>
            <td class="cell-content">공동구매 할인 쿠폰 지급</td>
            <td class="cell-content">
              참여한 상품의 최소 인원이 달성되어 할인 쿠폰 지급 완료 시 알림을 받아 볼 수 있어요.
            </td>
          </tr>
          <tr>
            <td class="cell-content">공동구매 할인쿠폰 만료 </td>
            <td class="cell-content">
              지급받은 공동구매 할인 쿠폰의 만료 전에 알림을 받아 볼 수 있어요.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="table-tit">
      쇼핑알림> 공동구매에 대한 알림을 설정하실 수 있습니다.
    </div>
  </div>
  <!-- //게시판 상세 -->
</div>

<jsp:include page="/WEB-INF/views/terms/common/footer.jsp" />
