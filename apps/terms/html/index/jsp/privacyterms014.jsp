<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>

<jsp:include page="/WEB-INF/views/terms/common/header.jsp" />

<div class="modal-body">
    <!-- 게시판 상세 -->
    <div class="blank-box" style="height: 72px"></div>
    <h2 class="title-text">자동 생성 정보 및 행태 정보 처리</h2>
    <div class="table-tit">
      <p>자동 생성 정보 용어</p>
      <ul class="inner-text">
        <li>
          행태정보 : 방문한 서비스 정보, 서비스 접속 시간 및 빈도,
          서비스 이용 과정에서 생성된 또는 제공(입력)한 정보 등을
          분석하여 이용자의 취향과 관심에 특화된 서비스(광고 포함)를
          제공할 수 있습니다.
        </li>
        <li>
          쿠키(Cookies) : 이용자가 웹사이트를 접속할 때 이용자의 PC에
          저장하는 매우 작은 크기의 텍스트 파일입니다. 이용자가
          웹사이트에 재방문할 경우, 웹서버는 이용자 PC에 저장된 쿠키의
          내용을 읽고 서비스 이용 환경을 유지하여 편리한 인터넷 서비스
          이용을 가능하도록 합니다.
        </li>
        <li>
          광고 식별자(ADID/IDFA 등): 모바일 단말기에서 부여되는 광고용
          고유 식별 값을 말합니다.
        </li>
      </ul>
    </div>

    <br />
    <p class="table-tit">
      <strong>1) 자동 생성으로 수집된 정보</strong>
    </p>
    <div class="rround-table-scroll">
      <table class="rround-terms-table">
        <tbody>
          <tr>
            <td class="cell-content bgGray bd">처리 항목</td>
            <td class="cell-content">
              - 서비스 이용 정보: 웹/앱 서비스 접속 및 사용
              기록(페이지뷰, 클릭, 검색 등), 서비스 이용 기록(측정된
              걸음 수, 닉네임, 프로필, 게시물 작성 및 조회 이력 등),
              구매 및 검색 이력(주문/배송/취소/교환/환불 등의 커머스
              정보), 가입 및 탈퇴 정보, 고객의 관심ㆍ기호ㆍ흥미 등의
              성향 정보
              <br />
              - 기기 정보: 휴대폰 모델명, 휴대폰 고유ID, OS버전, 통신사,
              푸시토큰, 디바이스 정보, 임의 생성된 기기식별자<br />
              - 광고 식별자: GAID, IDFA
            </td>
          </tr>
          <tr>
            <td class="cell-content bgGray bd">처리 목적</td>
            <td class="cell-content">
              - 서비스 이용 정보: 콘텐츠 운영 및 참여에 따른 보상 제공,
              서비스 방문 및 이용기록의 분석에 기반한 개인화•맞춤형
              서비스 서비스 제공, 맞춤형 UI 제공, 서비스 품질 개선, 신규
              서비스 및 제품 개발을 위한 연구분석, 맞춤형 레포트 제공,
              AI기술 등을 결합한 신규 서비스 요소 발굴 및 제공, 서비스
              제공 관련 고객상담, 민원처리, 공지사항 전달, 서비스 대상자
              선정 등의 목적<br />
              - 기기 정보: 사용자 기기 구별 목적으로 암호화된 정보를
              수집하여 서비스 제공, 통계 및 서비스 품질 향상을 위한
              목적<br />
              - 광고 식별자: 마케팅 프로모션 시 사용자 구분과 사용자
              기기 구분 목적
            </td>
          </tr>
          <tr>
            <td class="cell-content bgGray bd">보유 및 이용 기간</td>
            <td class="cell-content">회원 탈퇴 시까지</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="terms-con">
      <strong>자동 생성 및 수집 정보 거부/차단 방법</strong>
      <ul class="inner-text">
        <li>
          쿠키를 차단하려면, 웹브라우저/모바일의 쿠키 옵션 설정을 통해
          모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나,
          아니면 모든 쿠키의 저장을 거부할 수 있습니다.
          <ul class="inner-text">
            <li>
              웹 브라우저에서의 쿠키 허용/차단
              <div class="rround-table-scroll">
                <table class="rround-terms-table">
                  <thead>
                    <tr>
                      <th>웹 브라우저명</th>
                      <th>차단 경로</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="cell-content">크롬(Chrome)</td>
                      <td class="cell-content">
                        1. 시크릿 모드 이용 (단축키 : Ctrl+Shift+N)<br />
                        - 웹브라우저 오른쪽 상단 ‘⋮’ 표시 선택 > 새
                        시크릿 창 <br />
                        2. 기록 삭제<br />
                        - 웹 브라우저 설정 > 개인정보 보호 및 보안 >
                        인터넷 사용 기록 삭제<br />
                      </td>
                    </tr>
                    <tr>
                      <td class="cell-content">엣지(Edge)</td>
                      <td class="cell-content">
                        1. 프라이빗 모드 이용 (단축키 : Ctrl+Shift+N)<br />
                        - 웹 브라우저 오른쪽 상단 ‘…’ 표시 선택 > 새
                        InPrivate 창<br />
                        2. 기록 삭제<br />
                        - 웹 브라우저 설정 > 쿠키 및 사이트 권한 > 쿠키
                        및 사이트 데이터 관리 및 삭제
                      </td>
                    </tr>
                    <tr>
                      <td class="cell-content">사파리(Safari)</td>
                      <td class="cell-content">
                        환경설정 > ‘크로스 사이트 추적 방지’ 및 ‘모든
                        쿠키 차단’
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ul class="inner-text">
                <li>
                  이 외에도 Firefox, Opera 등 주요 인터넷 웹브라우저들도
                  쿠키 삭제 기능을 제공하고 있으며, 웹 브라우저 버전에
                  따라 쿠키 수집 거부 방법이 상이할 수 있습니다.
                </li>
              </ul>
            </li>
            <li>
              모바일에서의 쿠키 허용/차단
              <div class="rround-table-scroll">
                <table class="rround-terms-table">
                  <thead>
                    <tr>
                      <th>운영체제(OS)명</th>
                      <th>차단 경로</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="cell-content">Android</td>
                      <td class="cell-content">
                        1. 단말기 설정<br />
                        - 설정 > 보안 및 개인정보 보호 > 개인정보 보호 >
                        기타 개인정보 설정 > 광고 > 광고ID 재설정 또는
                        광고ID 삭제<br />
                        2. 브라우저 설정<br />
                        - 크롬(Chrome) : 모바일 브라우저 오른쪽 상단 ‘⋮’
                        표시 선택 > 새 시크릿 탭<br />
                        - 삼성인터넷: 모바일 브라우저 아래쪽 ‘탭’ 아이콘
                        선택 > 비밀 모드 켜기 > 시작
                      </td>
                    </tr>
                    <tr>
                      <td class="cell-content">iOS</td>
                      <td class="cell-content">
                        1. 단말기 설정<br />
                        - 설정 > 개인정보 보호 및 보안 > 추적 > 앱 추적
                        허용 해제<br />
                        2. 브라우저 설정<br />
                        - 사파리(Safari) : 모바일 기기 설정 >
                        사파리(Safari) > 고급 > 모든 쿠키 차단
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <ul class="inner-text">
                <li>
                  모바일 OS 버전에 따라 메뉴 및 방법이 상이할 수
                  있습니다.
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <p class="table-tit"><strong>2) 행태정보의 수집 ∙ 이용</strong></p>

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
              • 라운드 또는 제휴사 제품에 대한 맞춤형 서비스 제공,
              개인화된 데이터 분석 및 컨설팅, 맟춤형 광고 및 마케팅
              제공<br />
              • 서비스 품질 개선 및 신규 서비스 발굴<br />
              • 라운드앱 및 서비스 이용현황에 대한 분석
            </td>
          </tr>
          <tr>
            <td class="cell-content">수집∙이용 항목</td>
            <td class="cell-content">
              • 필수 항목: 회원 가입 정보, 서비스 이용 기록(앱 및 웹
              설치, 방문 및 사용 이력), 활동 로그, 검색 이력, 커머스
              이용 내역<br />
              • 선택 항목: 마케팅 목적 개인정보 수집 • 이용에서 정의한
              수집 항목
            </td>
          </tr>
          <tr>
            <td class="cell-content">수집 대상</td>
            <td class="cell-content">
              • 필수 항목: 기본적인 수집∙이용 목적을 달성하기 위해
              반드시 필요한 개인정보로, 모든 활성 고객의 정보를 수집<br />
              • 선택 항목: 자동수집을 통해 수집한 행태정보 중 마케팅
              목적 개인정보 활용에 동의한 고객에 한해 수
            </td>
          </tr>
          <tr>
            <td class="cell-content">보유 및 이용기간</td>
            <td class="cell-content">
              • 필수 항목: 내부방침 및 기타 관련 법령에 의한 정보 보호
              사유에 따라 일정 기간 보관한 후 파기<br />
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
    <div class="terms-con">
      라운드는 이용자에게 동의받은 범위 내에서만 개인정보를 이용 및
      제공합니다. 단, 「개인정보 보호법」 제15조 제3항 또는 제17조
      제4항에 따라 이용자의 동의 없이 개인정보를 추가적으로 이용·제공할
      수 있습니다. 이 경우, 라운드는 정보주체의 동의 없는 개인정보의
      추가적인 이용·제공을 위해 아래 사항을 고려하겠습니다.
      <ul class="inner-text">
        <li>당초 수집 목적과 관련성이 있는지 여부</li>
        <li>
          개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때
          개인정보의 추가적인 이용 또는 제공에 대한 예측 가능성이 있는지
          여부
        </li>
        <li>이용자의 이익을 부당하게 침해하는지 여부</li>
        <li>
          가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지
          여부
        </li>
      </ul>
    </div>
    <div class="terms-con">
      만약 개인정보의 추가적인 이용∙제공이 지속적으로 발생하는 경우에는
      위 사항에 대한 판단기준을 공개하고, 해당 기준의 준수 여부를
      점검하겠습니다.
    </div>

    <p class="table-tit"><strong>3) 행태정보의 제3자 제공</strong></p>
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
            <td class="cell-content">제공받는 자</td>
            <td class="cell-content">(주)애드팝콘</td>
          </tr>
          <tr>
            <td class="cell-content">제공 항목</td>
            <td class="cell-content">
              광고식별자(adid), 광고주 앱 정보, 이벤트 정보, 디바이스
              정보, OS정보, 구매 및 검색 이력, 쿠키
            </td>
          </tr>
          <tr>
            <td class="cell-content">제공 목적</td>
            <td class="cell-content">
              • 라운드 또는 제휴사 제품에 대한 맞춤형 서비스 제공,
              개인화된 데이터 분석 및 컨설팅<br />
              • 서비스 품질 개선 및 신규 서비스 발굴<br />
              • 라운드앱 및 서비스 이용현황에 대한 분석
            </td>
          </tr>
          <tr>
            <td class="cell-content">보유 및 이용기간</td>
            <td class="cell-content">회원 탈퇴 후 5일 이내</td>
          </tr>
          <tr>
            <td class="cell-content">제공 거부 방법</td>
            <td class="cell-content">
              쿠키(자동 생성 및 수집 정보) 차단 또는 서비스 탈퇴
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--  -->
    <p class="table-tit">
      <strong>4) 제 3자가 수집하는 행태 정보</strong>
    </p>
    <ul class="inner-text">
      <li>
        회사는 이용자가 라운드 앱을 방문하거나 이용하는 경우, 효과적인
        서비스 이용과 광고 및 마케팅을 위해 타사가 제공하는 SDK를 포함한
        태그 등을 이용하고 있습니다. 회사의 앱으로부터 제3자가
        수집해가는 행태정보는 다음과 같습니다.
      </li>
    </ul>
    <div class="rround-table-scroll">
      <table class="rround-terms-table">
        <thead>
          <tr>
            <th>수집 도구 명칭</th>
            <th>수집해가는 사업자</th>
            <th>수집도구 종류</th>
            <th>수집해가는 행태정보 항목</th>
            <th>수집해가는 목적</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="cell-content">Covi HTML5 Player</td>
            <td class="cell-content">㈜코비그룹</td>
            <td class="cell-content">SDK</td>
            <td class="cell-content">모바일 광고ID (ADID,IDFA)</td>
            <td class="cell-content">맞춤형 광고 게재, 광고 최적화</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p>
      ※ 정보주체는 모바일 앱 쿠키 설정 변경 등을 통해 제3자가 수집해가는
      행태정보의 허용·차단 등의 설정을 할 수 있습니다.
    </p>
    <!--  -->
    <!-- //게시판 상세 -->
  </div>

<jsp:include page="/WEB-INF/views/terms/common/footer.jsp" />