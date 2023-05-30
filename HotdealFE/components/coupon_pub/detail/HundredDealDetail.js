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
              <strong className={styleCouponDetail.colorText}>
                3일 00 : 00 : 00
              </strong>{" "}
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
        <MaybeCouponWrap
          pageTitle={[
            "당첨을 기다리며 구매했어요", <span key="1" className="titleEmoticon">💘</span>,
          ]}
        />
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
            className={`${styleCouponDetail.TabContent} ${styleCouponDetail.TabContentOn}`}
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
          <div className={`${styleCouponDetail.TabContent}`}>
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
              <button className={`${styleCommon.btnGift}`}>응모하기</button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
