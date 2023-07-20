import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleCouponList from "../../../styles/coupon_pub/CouponList.module.css";

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
      addInfo1, // 종료임박
      addInfo2, //포인트 적립
      addInfo3, //구매 찬스
      addInfo4, //인기 상품
      addInfo5, //PICK
      addInfo6, //한정 할인
    },
    slideType // 홈 슬라이드에서 사용시 추가
  },
) => {
  return (
    <>
      <button href={`/coupon_pub/`}>
        <div className={`${styleCouponList.imgBox} ${slideType ? styleCouponList.slideBox : ""}`}>
          <img src={infoImg} alt="핫딜 TEST"></img>
        </div>
        <div className={styleCouponList.infoBox}>
          <p className={styleCouponList.infoBrand}>{infoBrand}</p>
          <p className={styleCouponList.infoProduct}>{infoProduct}</p>
          <div className={`${styleCouponList.infoPriceWrap} ${saving && styleCouponList.saving}`}>
            <p className={styleCouponList.infoPrice}>{infoPrice}</p>
            <p className={`${styleCouponList.infoDcPrice}`}>
              {infoDcPercent && (
                <span className={styleCouponList.infoDcPercent}>
                  {infoDcPercent}
                </span>
              )}
              {saving ? "적립" : <>{infoDcPrice}<span className={styleCouponList.unitText}>{}원</span></>}
            </p>
          </div>
          <div className={styleCouponList.addInfoWrap}>
            {addInfo1 && (
              <span className={styleCouponList.end}>종료 임박</span>
            )}
            {addInfo2 && <span className={styleCouponList.point}>포인트 적립</span>}
            {addInfo3 && <span className={styleCouponList.deal}>구매 찬스</span>}
            {addInfo4 && <span className={styleCouponList.popular}>인기 상품</span>}
            {addInfo5 && <span className={styleCouponList.pick}>PICK</span>}
            {addInfo6 && <span className={styleCouponList.time}>한정 할인</span>}
          </div>
        </div>
      </button>
    </>
  );
};

export default CouponListItem;
