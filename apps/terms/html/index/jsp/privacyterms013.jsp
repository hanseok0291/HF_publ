<%@ page language="java" contentType="text/html;charset=UTF-8"
pageEncoding="UTF-8" %>

<jsp:include page="/WEB-INF/views/terms/common/header.jsp" />

<div class="modal-body">
  <!-- 게시판 상세 -->
  <div class="blank-box" style="height: 72px"></div>
  <h2 class="title-text">개인정보 위탁 처리</h2>
  <div class="table-tit">
    <p>
      위탁 처리란, 개인정보처리자(라운드)의 업무 목적을 수행하기 위해 라운드가
      제휴사에게 개인정보 처리 업무를 맡기는 것을 의미합니다.
    </p>
  </div>

  <p class="table-tit">[수탁업체]</p>
  <div class="rround-table-scroll">
    <table class="rround-terms-table">
      <thead>
        <tr>
          <th>수탁업체</th>
          <th>위탁업무 내용</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="cell-content">SCI평가정보(주)</td>
          <td class="cell-content">
            ● 라운드 회원가입, 라운드 제휴 서비스 가입 등을 위한 CI 생성 및 제공<br />
            ● 라운드 회원정보 현행화를 위한 본인확인 서비스 제공
          </td>
        </tr>
        <tr>
          <td class="cell-content">NICE 평가정보(주)</td>
          <td class="cell-content">
            제세공과금 처리를 위한 내/외국인 실명확인 서비스 제공
          </td>
        </tr>
        <tr>
          <td class="cell-content">인포뱅크(주)</td>
          <td class="cell-content">알림톡, 문자메시지 발송 대행</td>
        </tr>
        <tr>
          <td class="cell-content">(주)네이버클라우드</td>
          <td class="cell-content">이메일 발송 대행</td>
        </tr>
        <tr>
          <td class="cell-content">(주)그레이박스</td>
          <td class="cell-content">
            CRM 발송 관련 서비스 Notifly 이용(고객 분석에 따른 메시징)
          </td>
        </tr>
        <tr>
          <td class="cell-content">(주)다우기술</td>
          <td class="cell-content">
            - 주문관리서비스(사방넷)의 이용자 정보 확인<br />
            - 전자상거래 플랫폼의 이용 및 상품의 배송<br />
            - 물품 구매내역 전달<br />
            - 고객 요청 사항(주문/취소/교환/반품 등) 처리 및 안내
          </td>
        </tr>
        <tr>
          <td class="cell-content">(주)프로모티브</td>
          <td class="cell-content">
            경품 발송, 제세공과금(고유식별정보 별도수집) 신고, 민원 처리
          </td>
        </tr>
        <tr>
          <td class="cell-content">Amazon Web Services, Inc. (AWS)</td>
          <td class="cell-content">
            서비스 인프라 운영 및 클라우드 서버 호스팅(회원정보 및 서비스 이용
            관련 시스템 운영 지원)
          </td>
        </tr>
        <tr>
          <td class="cell-content">Snowflake Inc.</td>
          <td class="cell-content">
            클라우드 기반 데이터 저장 및 분석 인프라 운영(회원정보 및 서비스
            이용 이력 등의 안전한 보관 및 처리)
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="table-tit">[수탁업체(제휴사)]</p>
  <div class="rround-table-scroll">
    <table class="rround-terms-table">
      <thead>
        <tr>
          <th>수탁업체(제휴사)</th>
          <th>위탁업무 내용</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="cell-content">(주)헥토파이낸셜</td>
          <td class="cell-content">
            라운드 앱 잠금 및 인증 목적의 라운드 페이 비밀번호, 생체인증 사용
          </td>
        </tr>
        <tr>
          <td class="cell-content">(주)헥토파이낸셜</td>
          <td class="cell-content">
            전자지급결제대행 및 결제대금 예치 서비스, 정산 지급 대행
          </td>
        </tr>
        <tr>
          <td class="cell-content">(주)헥토</td>
          <td class="cell-content">
            - 서비스 및 제품 개선을 위한 분석<br />
            - 서비스 이용 현황에 대한 분석<br />
            - 라운드의 맞춤형 상품 및 혜택 제공을 위한 분석
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="table-tit">[재수탁업체]</p>
  <div class="rround-table-scroll">
    <table class="rround-terms-table">
      <thead>
        <tr>
          <th>수탁업체</th>
          <th>재수탁업체</th>
          <th>위탁업무 내용</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="cell-content">(주)다우기술</td>
          <td class="cell-content">(주)굿스플로</td>
          <td class="cell-content">
            1) 일반 국내택배 서비스 관련 물품배송<br />
            2) 알뜰 택배 서비스 관련 물품배송<br />
            3) 물품배송에 대한 불만 처리 등 민원처리<br />
            4) 서비스 이용에 대한 문자 안내<br />
            5) 서비스 이용에 대한 카카오톡 안내
          </td>
        </tr>
        <tr>
          <td class="cell-content">(주)프로모티브</td>
          <td class="cell-content">CJ대한통운</td>
          <td class="cell-content">경품의 포장, 배송 및 배송 관련 민원 처리</td>
        </tr>
        <tr>
          <td class="cell-content">(주)프로모티브</td>
          <td class="cell-content">(주)아임웹</td>
          <td class="cell-content">
            이벤트 당첨 안내, 경품 발송 및 제세공과금 처리를 위한 개인정보 수집
          </td>
        </tr>
        <tr>
          <td class="cell-content">(주)프로모티브</td>
          <td class="cell-content">(주)다우기술 비즈뿌리오</td>
          <td class="cell-content">이벤트 당첨 안내 메시지 발송</td>
        </tr>
        <tr>
          <td class="cell-content">(주)프로모티브</td>
          <td class="cell-content">글로벌컨설팅</td>
          <td class="cell-content">제세공과금 처리 및 원천세 신고</td>
        </tr>
        <tr>
          <td class="cell-content">(주)프로모티브</td>
          <td class="cell-content">롯데하이마트 주식회사</td>
          <td class="cell-content">경품 배송</td>
        </tr>
        <tr>
          <td class="cell-content">(주)프로모티브</td>
          <td class="cell-content">LG전자 주식회사</td>
          <td class="cell-content">경품 배송</td>
        </tr>
        <tr>
          <td class="cell-content">(주)프로모티브</td>
          <td class="cell-content">주식회사 엠파워시스템</td>
          <td class="cell-content">경품 배송</td>
        </tr>
        <tr>
          <td class="cell-content">(주)그레이박스</td>
          <td class="cell-content">엔에이치엔클라우드(주)</td>
          <td class="cell-content">유효 전화번호의 확보 및 메시지 발송</td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- //게시판 상세 -->
</div>

<jsp:include page="/WEB-INF/views/terms/common/footer.jsp" />
