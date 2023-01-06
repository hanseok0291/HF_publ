import { useRef, useState } from "react";

import styleCommon from "../../../styles/coupon_pub/Common.module.css";
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
                <p className={styleGiftPresent.infoBrand}>스타벅스</p>
                <p className={styleGiftPresent.infoProduct}>
                  시원하게 함께 세트
                </p>
                <p className={styleGiftPresent.infoPrice}>
                  <strong>6,300원</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className={styleGiftPresent.detailCon}>
          <div className={styleGiftPresent.topCon}>
            <div className={styleGiftPresent.leftCon}>
              <span className={styleGiftPresent.name}>To.이헥토</span>
              <span className={styleGiftPresent.number}>010-****-1234</span>
            </div>
            <button className={styleGiftPresent.messageBtn}>받은 메시지</button>
          </div>
          <div className={styleGiftPresent.mainCon}>
            <h4>구매 정보</h4>
            <dl>
              <dt>구매 일시</dt>
              <dd>2022. 10. 10 오전 7:17:27</dd>
              <dt>주문 번호</dt>
              <dd>123456789</dd>
              <dt>쿠폰 상태</dt>
              <dd>미사용</dd>
              <dt>사용 일시</dt>
              <dd>2022. 10. 10 오후 1:11:11</dd>
              <dt>적립 예정 포인트</dt>
              <dd>2023. 12. 12 까지 사용 시 100원</dd>
            </dl>
          </div>
        </div>
        <div className={styleGiftPresent.detailCon}>
          <div className={styleGiftPresent.mainCon}>
            <h4>결제 정보</h4>
            <dl>
              <dt>총 결제 금액</dt>
              <dd>20,000원</dd>
              <dt className={styleGiftPresent.useIcon}>머니 사용</dt>
              <dd>4,000원</dd>
              <dt className={styleGiftPresent.useIcon}>포인트 사용</dt>
              <dd>4,000원</dd>
            </dl>
            <dl className={styleGiftPresent.useMarginTop}>
              <dt>유횩기간 만료</dt>
              <dd>20,000원</dd>
              <dt className={styleGiftPresent.useIcon}>머니</dt>
              <dd>500원</dd>
              <dt className={styleGiftPresent.useIcon}>포인트</dt>
              <dd>500원</dd>
            </dl>
            <dl className={styleGiftPresent.useBorderTop}>
              <dt>유횩기간 만료</dt>
              <dd>20,000원</dd>
              <dt className={styleGiftPresent.useIcon}>머니</dt>
              <dd>500원</dd>
              <dt className={styleGiftPresent.useIcon}>포인트</dt>
              <dd>500원</dd>
            </dl>
          </div>
        </div>
        <div className={styleGiftPresent.dropDown}>
          <div className={styleGiftPresent.btnWrap}>
            <h4>쿠폰 취소 · 환불 안내</h4>
            <button
              className={`${styleCommon.iconArrowDown}`}
              onClick={onDropDown}
            ></button>
          </div>
          {dropState && (
            <div className={`${styleGiftPresent.dropArea}`}>
              쿠폰 취소 내용 <br />
              환불 안내
            </div>
          )}
        </div>

        <div
          className={`${styleGiftPresent.bottomBtn} ${styleCommon.bottomFixedWrap}`}
        >
          <div className={`${styleCommon.btnWrap}`}>
            <button className={`${styleCommon.btnGift} ${styleCommon.btn}`}>
              결제 취소
            </button>
            <button className={`${styleCommon.btnGift} ${styleCommon.btn}`}>
              <span className={styleGiftPresent.btnGiftMe}>재발송</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
