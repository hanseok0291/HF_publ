import { useRef, useState } from "react";

import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleCouponDetail from "../../../styles/coupon_pub/CouponDetail.module.css";
import styleGiftPresent from "../../../styles/coupon_pub/GiftPresent.module.css";

export default function GiftDetail() {
  const [dropState, setDropState] = useState(false);

  const onDropDown = (e) => {
    if (!dropState) {
      e.target.style.transform = "rotate(180deg)";
    } else {
      e.target.style.transform = "rotate(0)";
    }
    setDropState(!dropState);
  };

  return (
    <>
      <div className={`${styleGiftPresent.GiftDetailWrap}`}>
        <div
          className={`${styleGiftPresent.hideWrap} ${styleGiftPresent.show}`}
        >
          <div className={`${styleCommon.container}`}>
            <div className={`${styleGiftPresent.GiftDetaiSmalllWrap}`}>
              <div
                className={`${styleCommon.imgBox} ${styleGiftPresent.imgBox}`}
              >
                <img
                  src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                  alt="핫딜 TEST"
                ></img>
              </div>
              <div className={styleGiftPresent.infoBox}>
                <p
                  className={`${styleGiftPresent.infoBrand} ${styleCommon.flexWrap} ${styleCommon.alignCenter}`}
                >
                  스타벅스
                  <i
                    className={`${styleCommon.bar} ${styleGiftPresent.bar}`}
                  ></i>
                  <span className={styleGiftPresent.infoView}>사용처 보기</span>
                  <button
                    type="button"
                    className={`${styleCommon.btnArrow} ${styleCommon.iconArrowRight}`}
                  ></button>
                </p>
                <p className={styleGiftPresent.infoProduct}>2천원 할인</p>
                <p className={`${styleGiftPresent.btnWrap}`}>
                  <span>0123 456 789</span>
                  <button
                    type="button"
                    className={`${styleGiftPresent.btn} ${styleCommon.btn}`}
                  >
                    복사
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styleGiftPresent.detailCon}>
          <div className={styleGiftPresent.topCon}>
            <div className={styleGiftPresent.leftCon}>
              <span className={styleGiftPresent.name}>From.이헥토</span>
              <span className={styleGiftPresent.number}>010-****-1234</span>
            </div>
            <button className={styleGiftPresent.messageBtn}>받은 메시지</button>
          </div>
          <div className={styleGiftPresent.mainCon}>
            <dl>
              <dt>유효기간</dt>
              <dd>2022. 10. 10</dd>
              <dt>쿠폰상태</dt>
              <dd>일부 사용</dd>
              <dt>사용 일시</dt>
              <dd>2022. 6. 1</dd>
              <dt>사용 후 잔액</dt>
              <dd>2,400원</dd>
              <dt>적립 예정 포인트</dt>
              <dd>사용 시 100원</dd>
            </dl>
          </div>

          <div className={`${styleGiftPresent.InfoWrap}`}>
            <div className={`${styleCommon.container}`}>
              <ul className={`${styleGiftPresent.InfoTab}`}>
                <li
                  className={`${styleGiftPresent.active} ${styleCommon.halfWrap}`}
                >
                  <button type="button">사용안내</button>
                </li>
                <li className={`${styleCommon.halfWrap}`}>
                  <button type="button">유의사항</button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div>
          <div className={`${styleCouponDetail.CouponDetailInfoWrap}`}>
            <div
              className={`${styleCouponDetail.TabContent} ${styleCouponDetail.TabContentOn}`}
            >
              <div
                className={`${styleCommon.container} ${styleCouponDetail.InfoTabContent}`}
              >
                <span className={`${styleCouponDetail.InfoTabImage}`}>
                  <img src="../../../../images/coupon/visual/detail_test1.png"></img>
                </span>
                - 물품형 교환권을 기재된 상품이 아닌 타 상품으로 교환할 경우,
                쿠폰 가격 이상의 다른 상품으로 교환 가능하며, 초과 금액은 추가로
                지불하셔야 합니다.
                <br />
                - 포인트 적립 및 제휴카드 할인 등은 교환처의 정책에 따릅니다.
                <br />- 본 쿠폰은 유효기간 연장 및 환불되지 않습니다 - 물품형
                교환권을 기재된 상품이 아닌 타 상품으로 교환할 경우, 쿠폰 가격
                이상의 다른 상품으로 교환 가능하며, 초과 금액은 추가로
                지불하셔야 합니다.
                <br />
                - 포인트 적립 및 제휴카드 할인 등은 교환처의 정책에 따릅니다.
                <br />- 본 쿠폰은 유효기간 연장 및 환불되지 않습니다 - 물품형
                교환권을 기재된 상품이 아닌 타 상품으로 교환할 경우, 쿠폰 가격
                이상의 다른 상품으로 교환 가능하며, 초과 금액은 추가로
                지불하셔야 합니다
              </div>
            </div>
          </div>
        </div>

        {/* 자동 사용, 버튼 있을 경우 */}
        <div
          className={`${styleCouponDetail.CouponDetailBottomWrap} ${styleCommon.bottomFixedWrap}`}
        >
          <div className={`${styleCouponDetail.nowViewWrap}`}>
            <span>자동 사용 설정 OFF </span>상태입니다
          </div>
          <div className={`${styleCommon.btnWrap} `}>
            <button
              className={`${styleCommon.btnGift} ${styleCommon.btn}`}
              style={{ fontSize: 13 }}
            >
              쿠폰 저장
            </button>
            <button
              className={`${styleCommon.btnGiftMe} ${styleCommon.btn}`}
              style={{ fontSize: 13 }}
            >
              자동 사용 설정
            </button>
            <button
              className={`${styleCommon.btnGiftMe} ${styleCommon.btn}`}
              style={{ fontSize: 13 }}
            >
              결제 취소
            </button>
          </div>
        </div>
        {/* //자동 사용, 버튼 있을 경우 */}
      </div>
    </>
  );
}
