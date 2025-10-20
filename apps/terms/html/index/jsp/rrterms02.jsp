<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>

<jsp:include page="/WEB-INF/views/terms/common/header.jsp" />

<div class="modal-body">
    <!-- 게시판 상세 -->
    <div class="blank-box" style="height: 72px"></div>
    <h2 class="title-text">개인정보 수집 · 이용 동의</h2>
    <strong>(회원가입)</strong>
    <div class="terms-con">
        <div class="terms-tit">
            ㈜헥토이노베이션은 ‘개인정보보호법’ 등, 관련 법령상의 개인정보
            보호 규정을 준수하여 개인정보 수집 · 이용 동의를 받고 있습니다.
        </div>
        <p class="table-tit">1) 앱에서 수집하는 정보</p>
        <div class="rround-table-scroll">
            <table class="rround-terms-table">
                <thead></thead>
                <tbody>
                <tr>
                    <td class="cell-content bgGray bd">처리 항목</td>
                    <td class="cell-content">
                        이름, 생년월일, 성별, 휴대전화번호, 이메일주소,
                        CI(연계정보), 내/외국인 여부, 국적, 고객식별값(User_Seq)
                    </td>
                </tr>
                <tr>
                    <td class="cell-content bgGray bd">처리 목적</td>
                    <td class="cell-content">
                        - 본인확인 및 서비스 가입<br />
                        - 민원처리, 분쟁해결, 법령상 의무이행을 위한 의사소통
                        경로 확보 [공통]<br />
                        - 서비스 관련 공지사항 전달, 고객만족도 조사<br />
                        - 서비스 이용현황 통계분석 및 활용<br />
                        - 신규서비스 이용 시 또는 본인인증 시, 보유정보를 이용한
                        입력편의성 제공<br />
                        - 부정이용방지(리워드 중복 수령 방지 및 어뷰징 방지)
                    </td>
                </tr>
                <tr>
                    <td class="cell-content bgGray bd">보유 및 이용 기간</td>
                    <td class="cell-content bd">회원 탈퇴 시까지.<br />단, CI 정보는 회원 탈퇴 후 90일까지</td>
                </tr>
                </tbody>
            </table>
            <p>
                ※ 단, 법령에서 따로 정하는 경우에는 해당 기간까지 보유합니다.
            </p>
            <br /><br />
        </div>
        <p class="table-tit">2) 자동 생성으로 수집된 정보</p>
        <div class="rround-table-scroll">
            <table class="rround-terms-table">
                <thead></thead>
                <tbody>
                <tr>
                    <td class="cell-content bgGray bd">처리 항목</td>
                    <td class="cell-content">
                      - 서비스 이용 정보: 웹/앱 서비스 접속 및 사용 기록(페이지뷰, 클릭, 검색 등), 접속 기록(검색·클릭 등), 서비스 이용 기록(측정된 걸음 수, 닉네임, 프로필, 게시물 작성 및 조회 이력 등), 구매 및 검색 이력(주문/배송/취소/교환/환불 등의 커머스 정보 등), 가입 및 탈퇴 정보, 고객의 관심·기호·흥미 등의 성향 정보- 기기 정보: 휴대폰 모델명, 휴대폰 고유ID, OS버전, 통신사, 푸시토큰, 디바이스 정보, 임의 생성된 기기식별자<br />
                      - 광고 식별자: GAID, IDFA
                    </td>
                </tr>
                <tr>
                    <td class="cell-content bgGray bd">처리 목적</td>
                    <td class="cell-content">
                      - 서비스 이용 정보: 콘텐츠 운영 및 참여에 따른 보상 제공, 서비스 방문 및 이용기록의 분석에 기반한 개인화·맞춤형 서비스 서비스 제공, 맞춤형 UI 제공, 서비스 품질 개선, 신규 서비스 및 제품 개발을 위한 연구분석, 맞춤형 레포트 제공, AI기술 등을 결합한 신규 서비스 요소 발굴 및 제공, 개인화 서비스 제공, 서비스 제공 관련 고객상담, 민원처리, 공지사항 전달, 서비스 대상자 선정 등의 목적<br />
                      - 기기 정보: 사용자 기기 구별 목적으로 암호화된 정보를 수집하여 서비스 제공, 통계 및 서비스 품질 향상을 위한 목적<br />
                      - 광고 식별자: 마케팅 프로모션 시 사용자 구분과 사용자 기기 구분 목적
                    </td>
                </tr>
                <tr>
                    <td class="cell-content bgGray bd">보유 및 이용 기간</td>
                    <td class="cell-content"><strong>회원 탈퇴 시까지</strong></td>
                </tr>
                </tbody>
            </table>
            <p>
                ※ 가입정보(휴대폰전화번호, SNS계정)를 활용하여 정보주체를 식별하고 행태정보를 수집합니다.
            </p>
        </div>
        <br /><br />
        <p class="table-tit">3) 행태정보의 수집ㆍ이용</p>
        <div class="rround-table-scroll">
            <table class="rround-terms-table">
                <thead>
                <tr>
                    <th>구분</th>
                    <th>내용</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td class="cell-content">수집∙이용 목적</td>
                    <td class="cell-content">
                      • 라운드 또는 제휴사 제품에 대한 맞춤형 서비스 제공, 개인화된 데이터 분석 및 컨설팅, 맞춤형 광고 및 마케팅 제공<br />
                      • 서비스 품질 개선 및 신규 서비스 발굴<br />
                      • 라운드앱 및 서비스 이용현황에 대한 분석
                    </td>
                </tr>
                <tr>
                    <td class="cell-content">수집∙이용 항목</td>
                    <td class="cell-content">
                      • 필수 항목: 회원 가입 정보, 서비스 이용 기록(앱 및 웹 설치, 방문 및 사용 이력), 활동 로그, 검색 이력, 커머스 이용 내역<br />
                      • 선택 항목: 마케팅 목적 개인정보 수집 · 이용에서 정의한 수집 항목
                    </td>
                </tr>
                <tr>
                    <td class="cell-content">수집 대상</td>
                    <td class="cell-content">
                      • 필수 항목: 기본적인 수집∙이용 목적을 달성하기 위해 반드시 필요한 개인정보로, 모든 활성 고객의 정보를 수집<br />
                      • 선택 항목: 자동수집을 통해 수집한 행태정보 중 마케팅 목적 개인정보 활용에 동의한 고객에 한해 수집
                    </td>
                </tr>
                <tr>
                    <td class="cell-content">보유 및 이용기간</td>
                    <td class="cell-content">
                      • 필수 항목: 내부방침 및 기타 관련 법령에 의한 정보 보호 사유에 따라 일정 기간 보관한 후 파기<br />
                      • 선택 항목: 동의 철회 혹은 탈퇴 후 5영업일까지 보관
                    </td>
                </tr>
                <tr>
                    <td class="cell-content">수집∙이용 거부 방법</td>
                    <td class="cell-content">
                      마케팅 활용 동의 철회 또는 서비스 탈퇴
                    </td>
                </tr>
                <tr>
                    <td class="cell-content">피해 구제 방법</td>
                    <td class="cell-content">
                        • 라운드 고객센터 1:1 문의<br />
                        • 이메일 : support@rround.com
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
        <ul class="inner-text">
            <li>
              라운드는 이용자에게 동의받은 범위 내에서만 개인정보를 이용 및 제공합니다. 단, 「개인정보 보호법」 제15조 제3항 또는 제17조 제4항에 따라 이용자의 동의 없이 개인정보를 추가적으로 이용·제공할 수 있습니다. 이 경우, 라운드는 정보주체의 동의 없는 개인정보의 추가적인 이용·제공을 위해 아래 사항을 고려하겠습니다.
            </li>
            <li>
              •	당초 수집 목적과 관련성이 있는지 여부<br />
              •	개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 개인정보의 추가적인 이용 또는 제공에 대한 예측 가능성이 있는지 여부<br />
              •	이용자의 이익을 부당하게 침해하는지 여부<br />
              •	가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지 여부
            </li>
            <li>
                만약 개인정보의 추가적인 이용∙제공이 지속적으로 발생하는 경우에는 위 사항에 대한 판단기준을 공개하고, 해당 기준의 준수 여부를 점검하겠습니다.
            </li>
        </ul>
        <br /><br />
        <p class="table-tit">4) 회사 내부 방침에 따른 보존 정보</p>
        <div class="rround-table-scroll">
            <table class="rround-terms-table">
                <thead></thead>
                <tbody>
                <tr>
                    <td class="cell-content bgGray bd">처리 항목</td>
                    <td class="cell-content">
                      - 부정 이용 기록(부정가입, 규정 위반 기록, 어뷰징 등 비정상적인 서비스 이용 기록)<br />
                      - 고객 문의 내역(안내 메일, 1:1문의 등 CS 이용 기록)
                    </td>
                </tr>
                <tr>
                    <td class="cell-content bgGray bd">처리 목적</td>
                    <td class="cell-content">
                        - 라운드 부정사용 방지, 라운드 민원 대응
                    </td>
                </tr>
                <tr>
                    <td class="cell-content bgGray bd">보유 및 이용 기간</td>
                    <td class="cell-content">회원 탈퇴 후 1년</td>
                </tr>
                </tbody>
            </table>
        </div>
        <p>
            라운드 서비스에 가입하기 위해서는 개인정보 수집 · 이용 동의가
            필수입니다. 회원님은 이 동의에 대해 거부할 수 있지만, 동의하지
            않을 경우 서비스 이용에 제한이 있을 수 있습니다.
        </p>
    </div>
    <!-- //게시판 상세 -->
</div>

<jsp:include page="/WEB-INF/views/terms/common/footer.jsp" />