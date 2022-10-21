import { useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

//slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import Brand from "../../../../components/coupon_pub/list/Brand";

//css
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleFilter from "../../../../styles/coupon_pub/Filter.module.css";
import stylePay from "../../../../styles/coupon_pub/Pay.module.css";
import styleCouponDetail from "../../../../styles/coupon_pub/CouponDetail.module.css";
import styleCategoryList from "../../../../styles/coupon_pub/CategoryList.module.css";
import styleBrandList from "../../../../styles/coupon_pub/BrandList.module.css";

import { Grid, Pagination } from "swiper";

const settings = {
  rows: 1,
  slidesPerRow: 4,
  arrows: false,
  dots: true,
  infinite: false,
  centerPadding: "32px",
};

const settings2rows = {
  rows: 2,
  slidesPerRow: 4,
  arrows: false,
  dots: true,
  infinite: false,
  centerPadding: "32px",
};

const ModalSuccessFriend = ({ show, onClose }) => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalFullpage} ${styleModal.modalInfo} ${styleModal.open}`}
    >
      <div
        className={`${styleModal.modalDialog} ${styleModal.slideDialog}`}
        style={{ bottom: "0" }}
      >
        <div className={`${styleModal.success}`}>
          <div className={`${styleModal.modalHeader}`}>
            <h3
              className={`${styleModal.modalTitle} ${styleFilter.modalTitle}`}
            >
              구매 완료
            </h3>
            <button
              type="button"
              className={`${styleCommon.btnIcon} ${styleModal.btnClose} ${styleModal.modalClose}`}
            >
              닫기
            </button>
          </div>
          {/* modalBody */}
          <div className={`${styleModal.modalBody} ${styleFilter.modalBody}`}>
            <div
              className={`${stylePay.payInfoWrap} ${stylePay.successWrap} ${styleCommon.container}`}
            >
              {/* 결제완료 기본 */}
              <div style={{ display: "block" }}>
                <p
                  className={`${stylePay.listTitle} ${stylePay.first} ${styleModal.first}`}
                >
                  상세 내역
                </p>

                <div
                  className={`${stylePay.inputBox} ${stylePay.inputDouble} ${stylePay.addBorderBottom}`}
                >
                  <div className={`${stylePay.inputInfoBox}`}>
                    <strong className={`${stylePay.title}`}>보낸 사람</strong>
                    <span className={`${stylePay.titleRight}`}>박혜빈</span>
                  </div>
                </div>
                <div
                  className={`${styleCouponDetail.CouponDetaiSmalllWrap} ${stylePay.CouponDetaiSmalllWrap} ${stylePay.borderBold}`}
                >
                  <div className={styleCouponDetail.imgBox}>
                    <img
                      src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                      alt="핫딜 TEST"
                    ></img>
                  </div>
                  <div
                    className={`${styleCouponDetail.infoBox} ${stylePay.infoBox}`}
                  >
                    <p
                      className={`${styleCouponDetail.infoBrand} ${stylePay.infoBrand}`}
                    >
                      스타벅스
                    </p>
                    {/* 결제완료 */}
                    <p
                      className={`${styleCouponDetail.infoProduct} ${stylePay.infoProduct}`}
                    >
                      <p className={`${stylePay.prdName}`}>
                        시원하게 함께 세트시원하게 함께 세트시원하게 함께
                        세트시원하게 함께 세트{" "}
                        <span className={`${stylePay.prdCount}`}>1개</span>를
                        선물하였습니다.
                      </p>
                    </p>
                    {/* //결제완료 */}
                    {/* 결제실패 메시지 */}
                    {/* <p
                      className={`${styleCouponDetail.infoProduct} ${stylePay.infoProduct}`}
                    >
                      <p className={`${stylePay.prdName}`}>
                        시원하게 함께 세트
                      <span className={`${stylePay.prdCount}`}>1개</span>를
                      선물에 실패하였습니다.
                      </p>
                    </p>
                    <p className={`${stylePay.prdErrorMsg}`}>
                      프로모션 수량이 품절되었어요.
                    </p>
                    <p className={`${stylePay.prdErrorMsg}`}>
                      지금은 계좌에서 출금할 수 없어요. 잠시 후 다시
                      시도해주세요.
                    </p> */}
                    {/* //결제실패 메시지 */}
                  </div>
                </div>
                {/* 받는 사람 */}
                {/* <div
                  className={`${styleCouponDetail.CouponDetaiSmalllWrap} ${stylePay.CouponDetaiSmalllWrap} ${styleCommon.betweenWrap} ${styleCommon.alignCenter}`}
                >
                  <div className={`${stylePay.inputBox}`}>
                    <div className={`${stylePay.inputInfoBox}`}>
                      <strong className={`${stylePay.title}`}>받는 사람</strong>
                      <span className={`${stylePay.titleRight}`}>이세틀</span>
                    </div>
                    <p className={`${stylePay.subTitle}`}>
                      친구에게 선물 소식을 알려드릴까요?
                    </p>
                  </div>
                  <div className={`${styleCommon.textBox}`}>알려주기</div>
                </div> */}
                {/* 받는 사람 */}
                {/* 자동 결제 적용 설정 안내 */}
                <div
                  className={`${styleCommon.allCenterWrap} ${styleCommon.directionCol} ${stylePay.modalBtnWrap}`}
                >
                  <p className={`${stylePay.subTitle}`}>
                    이 쿠폰을 사용하려면 <strong>자동 결제 적용 설정</strong>이
                    필요해요<i className={`${styleCommon.italic}`}>!</i> <br />
                    아래 버튼을 눌러 설정해 주세요.
                  </p>
                  <button
                    type="button"
                    className={`${styleCommon.btn} ${stylePay.btn}`}
                  >
                    설정하기
                  </button>
                </div>
                {/* //자동 결제 적용 설정 안내 */}
              </div>
              {/* //결제완료 기본 */}
              {/* 결제완료(친구) */}
              <div style={{ display: "none" }}>
                <p
                  className={`${stylePay.listTitle} ${stylePay.first} ${styleModal.first}`}
                >
                  상세 내역
                </p>

                <div
                  className={`${stylePay.inputBox} ${stylePay.inputDouble} ${stylePay.addBorderBottom}`}
                >
                  <div className={`${stylePay.inputInfoBox}`}>
                    <strong className={`${stylePay.title}`}>보낸 사람</strong>
                    <span className={`${stylePay.titleRight}`}>박혜빈</span>
                  </div>
                </div>
                <div
                  className={`${styleCouponDetail.CouponDetaiSmalllWrap} ${stylePay.CouponDetaiSmalllWrap}`}
                >
                  <div className={styleCouponDetail.imgBox}>
                    <img
                      src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                      alt="핫딜 TEST"
                    ></img>
                  </div>
                  <div
                    className={`${styleCouponDetail.infoBox} ${stylePay.infoBox}`}
                  >
                    <p
                      className={`${styleCouponDetail.infoBrand} ${stylePay.infoBrand}`}
                    >
                      스타벅스
                    </p>
                    {/* 결제완료 */}
                    <p
                      className={`${styleCouponDetail.infoProduct} ${stylePay.infoProduct}`}
                    >
                      <p className={`${stylePay.prdName}`}>
                        시원하게 함께 세트
                        <span className={`${stylePay.prdCount}`}>1개</span>를
                        선물하였습니다.
                      </p>
                    </p>
                    {/* //결제완료 */}
                    {/* 결제실패 메시지 */}
                    {/* <p
                      className={`${styleCouponDetail.infoProduct} ${stylePay.infoProduct}`}
                    >
                      <p className={`${stylePay.prdName}`}>
                        시원하게 함께 세트
                      <span className={`${stylePay.prdCount}`}>1개</span>를
                      선물에 실패하였습니다.
                      </p>
                    </p>
                    <p className={`${stylePay.prdErrorMsg}`}>
                      프로모션 수량이 품절되었어요.
                    </p>
                    <p className={`${stylePay.prdErrorMsg}`}>
                      지금은 계좌에서 출금할 수 없어요. 잠시 후 다시
                      시도해주세요.
                    </p> */}
                    {/* //결제실패 메시지 */}
                  </div>
                </div>
                {/* 자동 결제 적용 설정 안내 */}
                {/* <div
                  className={`${styleCommon.allCenterWrap} ${styleCommon.directionCol} ${stylePay.modalBtnWrap}`}
                >
                  <p className={`${stylePay.subTitle}`}>
                    이 쿠폰을 사용하려면 <strong>자동 결제 적용 설정</strong>이
                    필요해요<i className={`${styleCommon.italic}`}>!</i> <br />
                    아래 버튼을 눌러 설정해 주세요.
                  </p>
                  <button
                    type="button"
                    className={`${styleCommon.btn} ${stylePay.btn}`}
                  >
                    설정하기
                  </button>
                </div> */}
                {/* //자동 결제 적용 설정 안내 */}
                {/* 받는 사람 */}
                <div
                  className={`${styleCouponDetail.CouponDetaiSmalllWrap} ${stylePay.CouponDetaiSmalllWrap} ${stylePay.borderBold} ${styleCommon.betweenWrap} ${styleCommon.alignCenter}`}
                >
                  <div className={`${stylePay.inputBox}`}>
                    <div className={`${stylePay.inputInfoBox}`}>
                      <strong className={`${stylePay.title}`}>받는 사람</strong>
                      <span className={`${stylePay.titleRight}`}>이세틀</span>
                    </div>
                    <p className={`${stylePay.subTitle}`}>
                      친구에게 선물 소식을 알려드릴까요?
                    </p>
                  </div>
                  <div className={`${styleCommon.textBox}`}>알려주기</div>
                </div>
                {/* 받는 사람 */}
              </div>
              {/* //결제완료(친구) */}
            </div>
            <div className={`${styleModal.modalBottom}`}>
              <div className={`${styleCommon.container}`}>
                <h3
                  className={`${styleCommon.titleInfo} ${styleCommon.flexWrap} ${styleCommon.alignCenter} ${styleModal.titleInfo}`}
                >
                  <i className={`${styleCommon.italicRound}`}>!</i>안내사항
                </h3>
                {/* 결제완료 안내사항 */}
                <div className={`${styleCommon.infoBox}`}>
                  <p className={`${styleCommon.infoText}`}>
                    본 쿠폰은 자동 결제 적용 미설정 시 사용할 수 없습니다.
                  </p>
                  <p className={`${styleCommon.infoText}`}>
                    설정 완료 후 자동 적용 쿠폰 미선택 시, 보유 쿠폰 중 구매일이
                    가장 오래된 쿠폰 1개가 자동 적용/사용됩니다.
                    <br />
                    (해당 브랜드에서 내통장결제로 결제 진행 시)
                  </p>
                  <p className={`${styleCommon.infoText}`}>
                    선물 내역은 <strong>선물함 &gt; 구매</strong>에서 확인할 수
                    있습니다.
                  </p>
                  <p className={`${styleCommon.infoText}`}>
                    선물이 전달되지 않았다면,{" "}
                    <strong>선물함 &gt; 구매 &gt; 재전송</strong>을 눌러 재전송
                    할 수 있습니다.
                  </p>
                </div>
                {/* //결제완료 안내사항 */}

                {/* 결제완료 안내사항(친구) */}
                {/* <div className={`${styleCommon.infoBox}`}>
                  <p className={`${styleCommon.infoText}`}>
                    선물 내역은 <strong>선물함 &gt; 구매</strong>에서 확인할 수
                    있습니다.
                  </p>
                  <p className={`${styleCommon.infoText}`}>
                    선물이 전달되지 않았다면,{" "}
                    <strong>선물함 &gt; 구매 &gt; 재전송</strong>을 눌러 재전송
                    할 수 있습니다.
                  </p>
                </div> */}
                {/* //결제완료 안내사항(친구) */}
              </div>
            </div>
          </div>
          {/* //modalBody */}
        </div>
      </div>
    </div>
  );
};

export default ModalSuccessFriend;
