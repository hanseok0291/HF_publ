import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleCouponList from "../../../styles/coupon_pub/CouponList.module.css";
import styleSwiper from "../../../styles/coupon_pub/Swiper.module.css";

const CouponListItem = (
  {
    listItem: {
      infoImg, // 이미지 경로
      infoBrand, // 상품명
      infoProduct, // 상품 설명
      infoPrice, // 할인 전 가격
      infoDcPercent, // 할인율
      infoDcPrice, // 할인 가격
      saving, // 적립
      addInfo1, // 종료 임박
      addInfo2, // 포인트 적립
      addInfo3, // 구매 찬스
      addInfo4, // 선물 특가 
      addInfo5, // 추천 상품
      addInfo6, // 품절 임박
      addInfo7, // 기간 한정
      addInfo8, // 품절
      addInfo9, // 추가 할인
      soldOut1, // 내일 재오픈
      soldOut2, // SOLD OUT
    },
    slideType, // 홈 슬라이드에서 사용시 추가
    isWon //메인 지금만 20% 특가 세일에서만 원 표시 제거
  },
) => {
  return (
    <>
      <button href={`/coupon_pub/`}>
        <div className={`${styleCouponList.imgBox} ${slideType ? styleCouponList.slideBox : ""} ${styleSwiper.imgBox}`}>
          <img src={infoImg} alt="핫딜 TEST"></img>
          {soldOut1 && <span className={styleCouponList.soldout}>내일 재오픈</span>}
          {soldOut2 && <span className={styleCouponList.soldout}>SOLD OUT</span>}
        </div>
        <div className={styleCouponList.infoBox}>
          <p className={styleCouponList.infoBrand}>{infoBrand}</p>
          <p className={styleCouponList.infoProduct}>{infoProduct}</p>
          <div className={`${styleCouponList.infoPriceWrap} ${saving && styleCouponList.saving}`}>
            {infoPrice && <p className={styleCouponList.infoPrice}>{infoPrice}원</p>}
            <p className={`${styleCouponList.infoDcPrice} ${styleSwiper.infoDcPrice}`}>
              {infoDcPercent && (
                <span className={styleCouponList.infoDcPercent}>
                  {infoDcPercent}
                </span>
              )}
              {saving ? "적립" : <>{infoDcPrice}<span className={styleCouponList.unitText}></span></>}
            </p>
          </div>
          <div className={styleCouponList.addInfoWrap}>
            {addInfo1 && <span className={styleCouponList.end}>종료 임박</span>}
            {addInfo2 && <span className={styleCouponList.point}>포인트 적립</span>}
            {addInfo3 && <span className={styleCouponList.deal}>구매 찬스</span>}
            {addInfo4 && <span className={styleCouponList.gift}>선물 특가</span>}
            {addInfo5 && <span className={styleCouponList.recommend}>추천 상품</span>}
            {addInfo6 && <span className={styleCouponList.approach}>품절 임박</span>}
            {addInfo7 && <span className={styleCouponList.limit}>기간 한정</span>}
            {addInfo8 && <span className={styleCouponList.soldout}>품절</span>}
            {addInfo9 && <span className={styleCouponList.discount}>추가 할인</span>}
          </div>
        </div>
      </button>
    </>
  );
};

export default CouponListItem;
