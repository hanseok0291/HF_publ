<%@ page language="java" contentType="text/html;charset=UTF-8"
pageEncoding="UTF-8" %>

<jsp:include page="/WEB-INF/views/terms/common/header.jsp" />

<div class="modal-body">
  <!-- 게시판 상세 -->
  <div class="blank-box" style="height: 72px"></div>
  <h2 class="title-text">개인정보 수집 · 이용</h2>
  <div class="table-tit">
    <p>
      <strong>
        회사는 『개인정보 보호법』에 따라 서비스 제공을 위해 최소한의
        범위 내에서 개인정보를 수집 · 이용하고 있습니다.
      </strong>
    </p>
    <br />
    <p>
      <strong
        >1. 라운드 서비스 이용 중 정보주체의 동의 후 처리하는
        개인정보</strong
      >
    </p>
    <p>
      회사는 『개인정보 보호법』에 따라 다음 개인정보 항목에 대하여
      정보 주체의 동의를 받아 처리하고 있습니다.
    </p>
  </div>
  <div class="rround-table-scroll">
    <table class="rround-terms-table">
      <thead>
        <tr>
          <th>연번</th>
          <th>분류</th>
          <th>서비스명 (구분)</th>
          <th>처리 항목</th>
          <th>처리 목적</th>
          <th>보유 기간</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="cell-content">1</td>
          <td class="cell-content">공통 및 일반</td>
          <td class="cell-content">공통<br />(회원가입 시)</td>
          <td class="cell-content">
            이름, 생년월일, 성별, 휴대전화번호, 이메일주소,
            CI(연계정보), 내/외국인 여부, 국적,
            고객식별값(User_Seq)<br /><br />
            ※ 라운드 서비스 이용 중 생성된 다양한 자동생성정보,
            행태정보, 앱정보 등이 이용될 수 있으며, 위치정보는 별도의
            동의 절차에 따라 처리됩니다.
          </td>
          <td class="cell-content">
            - 본인확인 및 서비스 가입<br />
            - 민원처리, 분쟁해결, 법령상 의무이행을 위한 의사소통 경로
            확보 [공통]<br />
            - 서비스 관련 공지사항 전달, 고객만족도 조사<br />
            - 서비스 이용현황 통계 분석 및 활용<br />
            - 서비스 및 제품 개선<br />
            - 신규서비스 이용 시 또는 본인인증 시, 보유정보를 이용한
            입력편의성 제공<br />
            - 부정이용방지(리워드 중복 수령 방지 및 어뷰징 방지)
          </td>
          <td class="cell-content">
            회원 탈퇴 시 까지. 단, CI 정보는 회원 탈퇴 후 90일까지
          </td>
        </tr>
        <tr>
          <td class="cell-content">2</td>
          <td class="cell-content">공통 및 일반</td>
          <td class="cell-content">본인 확인</td>
          <td class="cell-content">
            이름, 생년월일, 성별, 휴대전화번호, CI(연계정보),
            내/외국인 정보
          </td>
          <td class="cell-content">
            본인인증<br />
            (본인인증 시 본인확인기관 등에 의한 별도 동의절차가
            진행됩니다.)
          </td>
          <td class="cell-content">본인확인 완료 시까지</td>
        </tr>
        <tr>
          <td class="cell-content">3</td>
          <td class="cell-content">공통 및 일반</td>
          <td class="cell-content">서비스 탈퇴</td>
          <td class="cell-content">CI(연계정보)</td>
          <td class="cell-content">
            부정이용방지<br />
            (리워드 중복 수령 방지 및 어뷰징 방지)
          </td>
          <td class="cell-content">
            회원 탈퇴 후 90일까지<br />(단, 관련 법령에 별도 규정이
            명시되어 있는 경우 그 기간에 따름)
          </td>
        </tr>
        <tr>
          <td class="cell-content">4</td>
          <td class="cell-content">공통 및 일반</td>
          <td class="cell-content">(선택) 마케팅 서비스</td>
          <td class="cell-content">
            - 일반가입정보: 이름, 성별, 생년월일, 휴대전화번호,
            이메일주소, 접속기기정보(단말기명, OS, 기기식별정보), PUSH
            토큰, 광고 식별자값(ADID, IDFA), CI(연계정보)<br />
            - 고객식별정보<br />
            - 서비스 이용정보: 쿠키에 의한 자동수집 정보,
            행동정보(방문/주소, 클릭 로그 정보, 이용자의 웹사이트/앱
            서비스 방문 이력, 검색 이력 등의 사용 이력)<br />
            - 구매 정보: 구매 기록, 결제 이력 등<br />
            - 이름(주문자 또는 수령인), 배송지 정보, 배송 및
            거래내역<br />
            - 차량 정보(차량 등록시): 차량번호, 차종, 연식 등
          </td>
          <td class="cell-content">
            마케팅 광고에 활용<br />
            1) 라운드의 맞춤형 상품・혜택 제공<br />
            2) 이벤트 및 마케팅 정보 제공 및 참여 기회 제공<br />
            (제 3자 광고 포함)<br />
            3) 고객 분석, 상품 서비스 분석, 설문조사 등 통계 분석을
            통한 서비스 개선 및 개발
          </td>
          <td class="cell-content">
            회원 탈퇴 또는 동의 철회 시까지
          </td>
        </tr>
        <tr>
          <td class="cell-content">5</td>
          <td class="cell-content">서비스</td>
          <td class="cell-content">챌린지 · 피드</td>
          <td class="cell-content">
            닉네임, 프로필 사진, 서비스 이용 관련 정보(액세스 로그
            등), 신체 활동 정보(걸음 수), 개인위치정보
          </td>
          <td class="cell-content">
            - 피드 서비스 제공 및 운영(게시물·댓글/답글 작성, 콘텐츠
            표시 및 저장 등)<br />
            - 피드 내 메시지 서비스 제공 및 운영, 이용자 식별 및
            관리<br />
            - 걸음 수 측정을 통한 챌린지 참여 및 표기
          </td>
          <td class="cell-content">
            회원 탈퇴 또는 동의 철회 시까지
          </td>
        </tr>
        <tr>
          <td class="cell-content">6</td>
          <td class="cell-content">혜택</td>
          <td class="cell-content">라운드 로또</td>
          <td class="cell-content">
            이름, 성별, 생년월일, 휴대전화번호, CI(연계정보), 암호화된
            고객번호, 서비스 이용 관련 정보(액세스 로그 등)
          </td>
          <td class="cell-content">
            - 라운드 로또의 발급 및 이용을 위한 본인 확인 및 식별<br />
            - 라운드 로또 지급 및 이용<br />
            - 분쟁 조정을 위한 기록 보존<br />
            - 불량 이용자의 부정 이용 방지와 비인가 사용의 방지<br />
            - 불만 처리 등의 민원처리, 각종 고지 및 통지 전달 등
          </td>
          <td class="cell-content">
            회원 탈퇴 또는 동의 철회 시까지
          </td>
        </tr>
        <tr>
          <td class="cell-content">7</td>
          <td class="cell-content">혜택</td>
          <td class="cell-content">만보기</td>
          <td class="cell-content">신체 활동 정보(걸음 수)</td>
          <td class="cell-content">걸음 수 기반 보상 지급</td>
          <td class="cell-content">
            회원 탈퇴 또는 동의 철회 시까지
          </td>
        </tr>
        <tr>
          <td class="cell-content">8</td>
          <td class="cell-content">기타</td>
          <td class="cell-content">이벤트</td>
          <td class="cell-content">이름, 휴대전화번호, 주소</td>
          <td class="cell-content">이벤트 참여 및 경품 발송</td>
          <td class="cell-content">경품 발송 후 즉시 파기</td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- //게시판 상세 -->
  <div class="table-tit">
    * 법적 근거
    <br />
    1~8 : 『개인정보 보호법』제15조 제1항 제1호(정보주체의 동의)
    <br />
    <br />
  </div>
  <div class="table-tit">
    <p>
      <strong
        >2. 라운드 서비스 이용 중 정보주체의 동의를 받지 않고 처리하는
        개인정보</strong
      >
    </p>
    <p>
      회사는 『개인정보 보호법』에 따라 다음 개인정보 항목에 대하여
      정보주체의 동의 없이 처리하고 있습니다.
    </p>
  </div>
  <div class="rround-table-scroll">
    <table class="rround-terms-table">
      <thead>
        <tr>
          <th>연번</th>
          <th>분류</th>
          <th>서비스명 (구분)</th>
          <th>처리 항목</th>
          <th>처리 목적</th>
          <th>보유 기간</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="cell-content">1</td>
          <td class="cell-content">서비스</td>
          <td class="cell-content">라운드 스토어</td>
          <td class="cell-content">
            구매자 정보:<br />
            아이디, 이름, 휴대전화번호, 암호화된 고객번호, CI<br />
            결제 정보:<br />
            결제수단, 결제 금액, 결제 일시, 결제 승인번호, 쿠폰
            할인금액, 포인트 할인액<br />
            주문 정보:<br />
            상품번호, 상품명, 옵션, 주문 수량, 주문일시, 주문번호,
            주문상세번호<br />
            배송 정보:<br />
            수령인 이름, 연락처, 주소, 상세 주소, 배송 요청사항,
            운송장 번호, 택배사<br />
            환불 정보:<br />
            환불 수단, 환불 신청일시, 교환·반품 사유, 클레임주문번호
          </td>
          <td class="cell-content">
            회원의 확인, 상품 주문의 접수, 결제 처리, 배송, 교환·반품,
            환불·취소, 고객 민원의 분쟁 처리
          </td>
          <td class="cell-content">
            회원탈퇴 시까지(단, 관련 법령이 있는 경우 그 기간 우선)
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="table-tit">
    * 법적 근거
    <br />
    1 : 『개인정보 보호법』제15조 제1항 제4호(계약의 이행)
  </div>
</div>

<jsp:include page="/WEB-INF/views/terms/common/footer.jsp" />
