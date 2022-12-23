// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import savePromotion from "../../../styles/coupon_pub/savePromotion.module.css";
import { useState, useEffect } from "react";

const SavePromotion = () => {
  const [dropDownShow, setDropDownShow] = useState(false);

  // 금액 카운트
  const useCountUp = (start = 0, end, dur = 2000, delay = 2000) => {
    const [count, setCount] = useState(start);
    const frameRate = 1000 / 30;
    const totalFrame = Math.round(dur / frameRate)
    
    useEffect(() => {
      let currntNumber = start;
      setTimeout(() => {
        const counter = setInterval(() => {
          const progress = ++currntNumber / totalFrame;
          let value = Math.round(end * progress)
          setCount(value);
  
          if (progress === 1){
            clearInterval(counter);
            setCount(value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
          }
        }, frameRate);
      }, delay);
    }, [end, frameRate, start, totalFrame]);

    return count;
  }

  return (
    <div className={savePromotion.container}>
      <div className={savePromotion.titleTextWrap}>
        <p className={savePromotion.text_1}>
          기프티몰이라 가능한
        </p>
        <div className={savePromotion.text_2}>
          <div className={savePromotion.innerTextContainer}>
            <p className={savePromotion.innerTextWrap}>
              <span className={savePromotion.innerText_1}>최대</span>
              <span className={savePromotion.innerText_2}>12%</span>
            </p>
            {/* 그림자용 텍스트 */}
            <p className={`${savePromotion.innerTextWrap} ${savePromotion.innerTextWrapCopy}`}>
              <span className={savePromotion.innerText_1}>최대</span>
              <span className={savePromotion.innerText_2}>12%</span>
            </p>
            {/* //그림자용 텍스트 */}
          </div>
          <span className={savePromotion.innerText_3}>
            특별한 혜택
          </span>
        </div>
        <p className={savePromotion.text_3}>
          <span>1회차 프로모션</span>
          <span>2022. 10. 1 ~ 2022. 10. 30</span>
        </p>
      </div>
      <div className={savePromotion.cardConWrap}>
        <div className={savePromotion.cardConBox}>
          <p className={savePromotion.innerText_1}><span>~</span>20</p>
          <p className={savePromotion.innerText_2}><span>%</span><span>할인</span></p>
          <p className={savePromotion.innerText_3}>구매할 때</p>
        </div>
        <i>+</i>
        <div className={savePromotion.cardConBox}>
          <p className={savePromotion.innerText_1}>4</p>
          <p className={savePromotion.innerText_2}><span>%</span><span>적립</span></p>
          <p className={savePromotion.innerText_3}>사용 후에</p>
        </div>
        <div className={savePromotion.img1}></div>
        <div className={savePromotion.img2}></div>
      </div>
      <div className={savePromotion.botContWrap}>
        <div className={savePromotion.innerTextWrap}>
          <p>내 1회차 적립 포인트</p>
          <p>* 이번 회차 동안 사용해야 적립돼요</p>
        </div>
        <p className={savePromotion.priceText}>{useCountUp(0, 1700, 1500, 1000)}원</p>
      </div>
      <div className={`${styleCommon.container}  ${savePromotion.infoWrap}`}>
        <h3
          className={`${styleCommon.titleInfo} ${styleCommon.flexWrap} ${styleCommon.alignCenter} ${savePromotion.title}`}
        >
          <i
            className={`${styleCommon.italicRound} ${savePromotion.italicRound}`}
          >
            !
          </i>
          안내드려요
          <button
            onClick={() => setDropDownShow(!dropDownShow)}
            className={`${savePromotion.downBtn} ${dropDownShow ? "down" : ""}`}
          ></button>
        </h3>

        {dropDownShow && (
          <div className={`${styleCommon.infoBox} ${savePromotion.infoBox}`}>
            <p className={`${styleCommon.infoText} ${savePromotion.infoText}`}>
            기간 내 대상 상품 구매 및 사용 후 포인트 받기 버튼을 눌러야 포인트 적립이 완료되며, 포인트 받기 버튼은 구매 상품 사용 시 해당 페이지 내에서만 노출됩니다.
            </p>
            <p className={`${styleCommon.infoText} ${savePromotion.infoText}`}>
              프로모션 대상 상품을 구매 및 사용했을 때를 기준으로, 상품 결제 금액의 4%가 포인트로 적립됩니다.
            </p>
            <p className={`${styleCommon.infoText} ${savePromotion.infoText}`}>
              새 회차 시작 시 누적 혜택은 0원으로 초기화되며, 이미 적립된 포인트는 소멸되지 않으나 적립 대기 상태의 포인트는 소멸됩니다.
            </p>
            <p className={`${styleCommon.infoText} ${savePromotion.infoText}`}>
            적립 혜택은 회차별로 한정되어, 해당 회차 종료 후 구매 상품 사용 시 포인트는 적립되지 않습니다.
            </p>
            <p className={`${styleCommon.infoText} ${savePromotion.infoText}`}>
              프로모션 상품과 적립 비율은 프로모션 회차별로 변동됩니다.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SavePromotion;
