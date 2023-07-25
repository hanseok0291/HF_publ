import { useEffect, useRef, useState } from "react";

import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleSlick from "../../../styles/coupon_pub/Slick.module.css";
import styleCouponDetail from "../../../styles/coupon_pub/CouponDetail.module.css";
import MaybeCouponWrap from "../main/MaybeCoupon";
import styleHundredDeal from "../../../styles/coupon_pub/HundredDeal.module.css";

export default function HundredDealDetail({setDeadlinFixed }) {
  const [isTabTop, setTabdTop] = useState(false);
  const [isToolTip, setIsToolTip] = useState(false);// 툴팁

  const imgRef = useRef();
  const tabRef = useRef();
  const tabConRef = useRef();

  const handleScroll = () => {
    if (imgRef.current !== null) {
      if (imgRef.current.getBoundingClientRect().bottom < 58) {
        setDeadlinFixed(true);
      } else {
        setDeadlinFixed(false);
      }
    }
    if (tabRef.current !== null) {
      if (
        !isTabTop &&
        tabConRef.current.getBoundingClientRect().top <
          tabRef.current.clientHeight + 58
      ) {
        setTabdTop(true);
      } else if (tabConRef.current.getBoundingClientRect().top > 58) {
        setTabdTop(false);
      }
    }
  };

  useEffect(() => {
    if (process.browser) {
      window.addEventListener("scroll", handleScroll);
    }
  }, [isToolTip]);
  
  return (
    <>
      <div className={`${styleCouponDetail.CouponDetailWrap}`}>
        <div className={`${styleSlick.card} ${styleCouponDetail.card}`}>
          <div
            className={`${styleCouponDetail.imgLabelWrap} ${styleCouponDetail.red}`}
          >
            <p className={`${styleCouponDetail.imgLabel}`}>100원딜</p>
          </div>
          <div
            className={`${styleSlick.imgBox} ${styleCouponDetail.imgBox}`}
            ref={imgRef}
          >
            <img
              src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
              alt="핫딜 TEST"
            ></img>
          </div>
          <div
            className={`${styleCouponDetail.alertInfo}`} //마감 스크롤 시 하단 fixed 삭제
          >
            <p>
              <span>8일</span> <span>00</span> <em>:</em> <span>00</span> <em>:</em> <span>00</span>
              {" "}
              후 마감
            </p>
          </div>
        </div>
        <div
          className={`${styleCommon.container} ${styleCouponDetail.containerBorder}`}
        >
          <div className={`${styleSlick.infoBox} ${styleCouponDetail.infoBox}`}>
            <p
              className={`${styleCouponDetail.infoBrand} ${styleCommon.flexWrap} ${styleCommon.alignCenter}`}
            >
              스타벅스
            </p>
            <p className={styleCouponDetail.infoProduct}>시원하게 함께 세트</p>
            <div className={styleCouponDetail.priceWrap}>
              <span className={styleCouponDetail.infoDcPrice}>9,000</span>
              <span className={styleCouponDetail.infoPrice}>
                <strong>100<span className={styleCouponDetail.unitText}> 원</span></strong>
              </span>
            </div>
            <div className={`${styleCouponDetail.priceDetailWrap} ${styleHundredDeal.priceDetailWrap}`}>
              <dl>
                <dt>
                  응모 기간
                </dt>
                <dd>2023 . 5. 2 (화) 9시 ~ 2022. 5. 3(수) 21시</dd>
                <dt>
                  당첨자 발표
                </dt>
                <dd>2022. 5. 4(목) 10시</dd>
                <dt>
                  당첨 인원
                </dt>
                <dd>총 50명</dd>
              </dl>
            </div>
          </div>
        </div>
        <div className={styleCouponDetail.borderBottom}>
          <MaybeCouponWrap
            pageTitle={[
              "당첨을 기다리며 구매했어요", <span key="1" className="titleEmoticon">💘</span>,
            ]}
          />
        </div>
        <div
          className={`${styleCouponDetail.InfoWrap} ${
            isTabTop && styleCouponDetail.fixed
          }`}
          ref={tabRef}
        >
          <ul className={`${styleCouponDetail.InfoTab}`}>
            <li
              className={`${styleCouponDetail.active} ${styleCommon.halfWrap}`}
            >
              <button type="button">사용안내</button>
            </li>
            <li className={`${styleCommon.halfWrap}`}>
              <button type="button">유의사항</button>
            </li>
          </ul>
        </div>
        <div
          className={`${styleCouponDetail.CouponDetailInfoWrap} ${
            isTabTop && styleCouponDetail.fixed
          }`}
          ref={tabConRef}
        >
          <div
            className={`${styleCouponDetail.TabContent}`}
          >
            <div
              className={`${styleCommon.container} ${styleCouponDetail.InfoTabContent}`}
            >
              - 물품형 교환권을 기 - 물품형 교환권을 기재된 상품이 아닌 타
              상품으로 교환할 경우, 쿠폰 가격 이상의 다른 상품으로 교환
              가능하며, 초과 금액은 추가로 지불하셔야 합니다.
              <br />
              - 포인트 적립 및 제휴카드 할인 등은 교환처의 정책에 따릅니다.
              <br />- 본 쿠폰은 유효기간 연장 및 환불되지 않습니다 - 물품형
              교환권을 기재된 상품이 아닌 타 상품으로 교환할 경우, 쿠폰 가격
              이상의 다른 상품으로 교환 가능하며, 초과 금액은 추가로 지불하셔야
              합니다.
              <br />
              - 포인트 적립 및 제휴카드 할인 등은 교환처의 정책에 따릅니다.
              <br />- 본 쿠폰은 유효기간 연장 및 환불되지 않습니다 - 물품형
              교환권을 기재된 상품이 아닌 타 상품으로 교환할 경우, 쿠폰 가격
              이상의 다른 상품으로 교환 가능하며, 초과 금액은 추가로 지불하셔야
              합니다.
              <br />
              - 포인트 적립 및 제휴카드 할인 등은 교환처의 정책에 따릅니다.
              <br />- 본 쿠폰은 유효기간 연장 및 환불되지 않습니다 - 물품형
              교환권을 기재된 상품이 아닌 타 상품으로 교환할 경우, 쿠폰 가격
              이상의 다른 상품으로 교환 가능하며, 초과 금액은 추가로 지불하셔야
              합니다.
              <br />
              - 포인트 적립 및 제휴카드 할인 등은 교환처의 정책에 따릅니다.
              <br />- 본 쿠폰은 유효기간 연장 및 환불되지 않습니다 - 물품형
              교환권을 기재된 상품이 아닌 타 상품으로 교환할 경우, 쿠폰 가격
              이상의 다른 상품으로 교환 가능하며, 초과 금액은 추가로 지불하셔야
              합니다.
              <br />
              - 포인트 적립 및 제휴카드 할인 등은 교환처의 정책에 따릅니다.
              <br />- 본 쿠폰은 유효기간 연장 및 환불되지 않습니다 - 포인트 적립
              및 제휴카드 할인 등은 교환처의 정책에 따릅니다.
              <br />- 본 쿠폰은 유효기간 연장 및 환불되지 않습니다
            </div>
          </div>
          <div className={`${styleCouponDetail.TabContent}  ${styleCouponDetail.TabContentOn}`}>
            <div className={`${styleCommon.container}`}>
              <div className={`${styleCouponDetail.TabContentBox}`}>
                <p className={`${styleCouponDetail.TabContentTitle}`}>
                  상품 고시 정보
                </p>
                <p>
                  <span className={`${styleCouponDetail.TabContentLeft}`}>
                    발행자
                  </span>{" "}
                  <span className={`${styleCouponDetail.TabContentRight}`}>
                    (주)헥토파이낸셜
                  </span>
                </p>
                <p>
                  <span className={`${styleCouponDetail.TabContentLeft}`}>
                    유효기간
                  </span>{" "}
                  <span className={`${styleCouponDetail.TabContentRight}`}>
                    2022. 5. 30
                  </span>
                </p>
                <p>
                  <span className={`${styleCouponDetail.TabContentLeft}`}>
                    교환권 공급자
                  </span>{" "}
                  <span className={`${styleCouponDetail.TabContentRight}`}>
                    (주)케이티알파
                  </span>
                </p>
                <p>
                  <span className={`${styleCouponDetail.TabContentLeft}`}>
                    이용 조건
                  </span>{" "}
                  <span className={`${styleCouponDetail.TabContentRight}`}>
                    상품상세설명 참조
                  </span>
                </p>
                <p>
                  <span className={`${styleCouponDetail.TabContentLeft}`}>
                    이용 가능 매장
                  </span>{" "}
                  <span className={`${styleCouponDetail.TabContentRight}`}>
                    상품상세설명 참조
                  </span>
                </p>
                <p>
                  <span className={`${styleCouponDetail.TabContentLeft}`}>
                    소비자 상담
                  </span>{" "}
                  <span className={`${styleCouponDetail.TabContentRight}`}>
                    1600-5200(결제 문의) <br />
                    1588-6474(사용 문의)
                  </span>
                </p>
              </div>
              <div className={`${styleCouponDetail.TabContentBox}`}>
                <p className={`${styleCouponDetail.TabContentTitle}`}>
                  취소 · 환불 · 유효기간 연장 정책 및 방법
                </p>
                <p className={`${styleCouponDetail.TabContentLeft}`}>
                  별도 전달 예정 별도 전달 예정
                  <br />
                  별도 전달 예정 별도 전달
                  <br />
                  별도 전달 예정
                  <br />
                  별도 전달{" "}
                </p>
              </div>
              <div className={`${styleCouponDetail.TabContentBox} ${styleCouponDetail.hundredDealBox}`}>
                <p className={`${styleCouponDetail.TabContentTitle}`}>
                  100원딜 유의사항
                </p>
                <p className={styleCouponDetail.noteStrong}>010PAY 회원 누구나 100원딜에 응모할 수 있습니다.</p>
                <p className={styleCouponDetail.noteStrong}>당첨자는 추첨을 통해 선정됩니다.(독립시행 확률로 1차, 당첨 인원수만큼 무작위 2차 선정)</p>
                <p className={styleCouponDetail.noteStrong}>당첨자 발표 소식은 앱 푸쉬를 통해 안내되며, 당첨 여부는 앱 내에서 개별적으로 확인할 수 있습니다.</p>
                <p className={styleCouponDetail.noteStrong}>정가가 5만 원을 초과하는 상품은 당첨자 본인의 제세공과금 22%를 부담하며, 관련 안내를 위해 회원 정보로 연락드립니다.(미성년자의 경우 법정대리인 명의로만 납부 가능)</p>
                <p className={styleCouponDetail.noteStrong}>100원딜은 당사 및 공급사의 사정에 따라 별도 고지없이 조기 종료되거나 상품 옵션이 변경될 수 있으며, 이에 따른 교환 및 환불은 불가합니다.</p>
                <p className={styleCouponDetail.noteStrong}>모바일 상품권은 오전 10시 당첨자 발표와 동시에 [my] 선물함으로 지급됩니다.</p>
                <p className={styleCouponDetail.noteStrong}>실물 상품은 배송정보 오입력/반송/분식/파손 시 재발송 및 환불되지 않습니다.</p>
                <p className={styleCouponDetail.noteStrong}>다음의 경우 응모 대상에서 제외되거나 당첨이 취소될 수 있습니다.</p>
                <p className={styleCouponDetail.noteNormal}>부정한 방법으로 응모한 경우</p>
                <p className={styleCouponDetail.noteNormal}>클릭 수 조작 등을 통해 응모 횟수가 비정상적 방법으로 산정된 경우</p>
                <p className={styleCouponDetail.noteNormal}>당첨자 개별 연락 시 부재 중이거나 상품 수령 의사가 불명확한 경우</p>
                <p className={styleCouponDetail.noteNormal}>상품 지급 및 배송 전 010PAY 회원을 탈퇴한 경우</p>
                <p className={styleCouponDetail.noteNormal}>안내된 기한 내 제세공과금 및 관련 서류를 미납입/미제출한 경우</p>
                <p className={styleCouponDetail.noteNormal}>미성년자의 법정대리인이 상품 수령을 거부한 경우</p>
                <p className={styleCouponDetail.noteStrong}>100원딜 당첨 확률을 높이는 방법은 아래를 참고해 주세요.</p>
                <p className={styleCouponDetail.noteNormal}>추가 응모로 응모 횟수가 많을수록 당첨 확률 UP</p>
                <p className={styleCouponDetail.noteNormal}>미션 응모권으로만(포인트 룰렛/100원딜 공유/선물하기 성공 시 획득) 추가 응모 가능</p>
                <p className={styleCouponDetail.noteNormal}>자세한 미션별 성공 기준은 미션 응모권 페이지 및 FAQ(응모권 획득 방법) 참고</p>
                <p className={styleCouponDetail.noteStrong}>첫 응모 미당첨 포인트 관련 내용은 아래를 참고해 주세요.</p>
                <table className={styleCouponDetail.noteTable}>
                  <tr>
                    <th>지급액</th>
                    <th>비중</th>
                  </tr>
                  <tr>
                    <td>10,000P</td>
                    <td>0.1%</td>
                  </tr>
                  <tr>
                    <td>1,000P</td>
                    <td>1%</td>
                  </tr>
                  <tr>
                    <td>100P</td>
                    <td>5%</td>
                  </tr>
                  <tr>
                    <td>1~99P</td>
                    <td>93.9%</td>
                  </tr>
                </table>
                <p className={styleCouponDetail.noteNormal}>최초 미당첨자에게 010PAY 포인트 최대 10,000P 랜덤 지급(유효기간 30일)</p>
                <p className={styleCouponDetail.noteNormal}>미당첨 발표일 오전 11시 자동 지급(머니&amp;포인트 이용 내역에서 지급 여부 확인)</p>
                <p className={styleCouponDetail.noteNormal}>지급 예정 포인트 포함 포인트 보유 한도(200만원)초과 시 초과 분 미지급</p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styleCouponDetail.CouponDetailBottomWrap} ${styleCommon.bottomFixed}`}
        >
          <div className={`${styleCommon.container} ${styleCommon.flexWrap}`}>
            <p className={`${styleCommon.floatLeft}`}>
              <button
                className={`${styleCommon.btnIcon} ${styleCommon.btnShare} ${styleCouponDetail.btnShare}`}
              >
                공유하기
              </button>
            </p>
            <p
              className={`${styleCommon.marginLeft} ${styleCommon.flexWrap} ${styleCommon.alignCenter}`}
            >
              <span className={styleHundredDeal.addInfo}><em>무료 응모</em>가 가능해요<i>!</i></span>
              <button className={`${styleCommon.btnGift}`}>응모하기</button>
            </p>
            {/* <p
              className={`${styleCommon.marginLeft} ${styleCommon.flexWrap} ${styleCommon.alignCenter}`}
            >
              <span className={styleHundredDeal.addInfo}>사용 가능 응모권 <em>N개<i>!</i></em></span>
              <button className={`${styleCommon.btnGift}`}>추가 응모하기</button>
            </p> */}
            {/* <p
              className={`${styleCommon.marginLeft} ${styleCommon.flexWrap} ${styleCommon.alignCenter}`}
            >
              <span className={styleHundredDeal.addInfo}>추가 응모로 <em>당첨 확률 UP<i>!</i></em></span>
              <button className={`${styleCommon.btnGift}`}>응모권 받기</button>
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}
