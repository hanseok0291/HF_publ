import { useRef, useState, useEffect } from "react";

import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleGiftPresent from "../../../styles/coupon_pub/GiftPresent.module.css";
import styleHundredDeal from "../../../styles/coupon_pub/HundredDeal.module.css";
import styleCouponDetail from "../../../styles/coupon_pub/CouponDetail.module.css";
import styleCouponList from "../../../styles/coupon_pub/CouponList.module.css";

export default function EntryDetails() {
  const [isToolTip, setIsToolTip] = useState(false);// 툴팁
  const [toolTipPos, setToolTipPos] = useState(false);

  const toolTipRef = useRef();


  const handleClick = () => {
    setIsToolTip(!isToolTip)
    if(!isToolTip) {
      if(toolTipRef.current.getBoundingClientRect().top < window.innerHeight / 3) {
        setToolTipPos(true);
      } else {
        setToolTipPos(false);
      }
    }
  }

  return (
    <>
      <div className={`${styleGiftPresent.GiftDetailWrap} ${styleHundredDeal.entryDetails}`}>
        <div
          className={`${styleGiftPresent.hideWrap} ${styleGiftPresent.show}`}
        >
          <div className={`${styleCommon.container}  ${styleHundredDeal.container}`}>
            <div className={`${styleGiftPresent.GiftDetaiSmalllWrap}`}>
              <div
                className={`${styleCommon.imgBox} ${styleGiftPresent.imgBox}`}
              >
                <img
                  src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                  alt="핫딜 TEST"
                ></img>
                <span
                  className={`${styleCommon.label} ${styleCouponList.label}`}
                >
                  100원딜
                </span>
              </div>
              <div className={styleGiftPresent.infoBox}>
                <p className={styleGiftPresent.infoBrand}>스타벅스</p>
                <p className={styleGiftPresent.infoProduct}>
                  시원하게 함께 세트
                </p>
                <dl className={styleHundredDeal.productInfo}>
                  <dt>수량</dt>
                  <dd>1개</dd>
                  <dt>가격</dt>
                  <dd><b>100원</b></dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styleHundredDeal.cotentBox}>
          <h4>결제 수단</h4>
          <dl className={styleHundredDeal.textWrap}>
            <dt>
              <b>포인트</b> <span>(보유 : 80원)</span>
            </dt>
            <dd>
              {/* <span className={styleHundredDeal.noPoint}>보유 포인트 부족</span> */}
              <span className={styleHundredDeal.isPoint}>100 원</span>
            </dd>
            <dt className={styleHundredDeal.beforeDot}>
              카드 포인트 <span>(전환 가능 : 50,000원)</span>
            </dt>
            <dd><button type="button">전환</button></dd>
            <dt className={styleHundredDeal.beforeDot}>
              무료 포인트
            </dt>
            <dd><button type="button">충전</button></dd>
          </dl>
        </div>

        <div className={styleHundredDeal.cotentBox}>
          <h4>할인 수단</h4>
          <dl className={styleHundredDeal.textWrap}>
            <dt>
              <b className={styleHundredDeal.highlight}>선물 받은 응모권</b> <span>(사용 가능 : 2장)</span>
              <div className={styleCouponDetail.tooltopWrap} ref={toolTipRef}>
                  <button
                    onClick={handleClick}
                    className={styleCouponDetail.tooltipBtn}
                  ></button>
                  {isToolTip && (
                    <p className={`${styleCouponDetail.tooltip} ${toolTipPos && styleCouponDetail.reverse}`}>
                      상품별 첫 응모엔 선물 받은 응모권만 사용할 수 있어, 보유 응모권 수와 다를 수 있습니다.
                    </p>
                  )}
                </div>
            </dt>
            <dd>
              <input type="checkbox"  name="checkbox" id="checkbox_1" className={styleCouponDetail.whiteBox} disabled/>
              <label htmlFor="checkbox_1"></label>
            </dd>
          </dl>
        </div>

        <div className={styleHundredDeal.paymentAmount}>
          <h3>총 결제 금액</h3>
          <span>100원</span>
        </div>

        <p className={styleHundredDeal.botText}>· 위 주문 내용 및 결제조건을 확인하였으며, 결제진행에 동의합니다.</p>

        <div
          className={`${styleGiftPresent.bottomBtn} ${styleCommon.bottomFixedWrap}`}
        >
          <p className={styleHundredDeal.toastText}><span>응모하려면 100P가 필요해요<i>!</i></span></p>
          <div className={`${styleCommon.btnWrap}`}>
            <button className={`${styleCommon.btnGift} ${styleCommon.btn} ${styleHundredDeal.botBtn}`} disabled>
              결제하고 응모하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
