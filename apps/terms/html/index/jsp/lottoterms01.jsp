<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>

<jsp:include page="/WEB-INF/views/terms/common/header.jsp" />

<div class="modal-body">
    <!-- 게시판 상세 -->
    <div class="blank-box" style="height: 72px"></div>
    <h2 class="title-text">개인정보 수집 · 이용 동의</h2>
    <p>(라운드 로또)</p>
    <br />
    <div class="terms-con">
        <div>
            ㈜헥토이노베이션은 ‘개인정보보호법’ 등, 관련 법령상의 개인정보
            보호 규정을 준수하여 개인정보 수집 · 이용 동의를 받고 있습니다.
        </div>
        <br />
        <div class="rround-table-scroll">
            <table class="rround-terms-table">
                <tbody>
                <tr>
                    <td class="cell-content bgGray bd">처리 항목</td>
                    <td class="cell-content">
                        이름, 성별, 휴대전화번호, CI(연계정보),
                        암호화된 고객번호, 서비스 이용 관련 정보(액세스 로그 등)
                    </td>
                </tr>
                <tr>
                    <td class="cell-content bgGray bd">처리 목적</td>
                    <td class="cell-content">
                        - 라운드 로또의 발급 및 이용을 위한 본인 확인 및 식별,<br>
                        - 라운드 로또 지급 및 이용,<br>
                        - 분쟁 조정을 위한 기록 보존,<br>
                        - 불량 이용자의 부정 이용 방지와 비인가 사용의 방지,<br>
                        - 불만 처리 등의 민원처리, 각종 고지 및 통지 전달 등
                    </td>
                </tr>
                <tr>
                    <td class="cell-content bgGray bd">보유 및 이용 기간</td>
                    <td class="cell-content">
                        <strong>회원 탈퇴 또는 동의 철회 시까지</strong>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <div class="table-tit">
            ※ 단, 법령에서 따로 정하는 경우에는 해당 기간까지 보유합니다.
            <br />
            <br />

            이 서비스는 개인정보 수집 · 이용 동의가 필수인 서비스로,
            동의하지 않으면 서비스를 이용하실 수 없습니다. 회원님은 이
            동의에 대해 거부할 수 있고, 동의를 거부하더라도 라운드의 다른
            서비스 이용에는 영향이 없음을 안내해 드립니다. 또한, 이 서비스에
            대한 동의는 [설정 > 약관 관리] 메뉴에서 언제든지 변경할 수
            있으니 참고해 주세요.
        </div>
    </div>
    <!-- //게시판 상세 -->
</div>

<jsp:include page="/WEB-INF/views/terms/common/footer.jsp" />