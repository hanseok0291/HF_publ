import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleCouponList from "../../../styles/coupon_pub/CouponList.module.css";

const CouponListItem = (
  {
    listItem: {
      labelType1, // 한정할인 노출
      labelType2, // PICK 노출
      infoImg, // 이미지 경로
      infoBrand, // 상품명
      infoProduct, // 상품 설명
      infoPrice, // 할인 전 가격
      infoDcPercent, // 할인율
      infoDcPrice, // 할인 가격
      addInfo1, // 종료임박
      addInfo2, //포인트 적립
    },
    slideType // 홈 슬라이드에서 사용시 추가
  },
) => {
  return (
    <>
      <button href={`/coupon_pub/`}>
        <div className={`${styleCouponList.imgBox} ${slideType ? styleCouponList.slideBox : ""}`}>
          <img src={infoImg} alt="핫딜 TEST"></img>
          {labelType1 && (
            <span className={`${styleCommon.label}`}>한정할인</span>
          )}
          {labelType2 && (
            <span className={`${styleCommon.label}`}>
              <i className={`${styleCommon.iconPick}`}></i>PICK
            </span>
          )}
        </div>
        <div className={styleCouponList.infoBox}>
          <p className={styleCouponList.infoBrand}>{infoBrand}</p>
          <p className={styleCouponList.infoProduct}>{infoProduct}</p>
          <div className={styleCouponList.infoPriceWrap}>
            <p className={styleCouponList.infoPrice}>{infoPrice}</p>
            <p className={styleCouponList.infoDcPrice}>
              {infoDcPercent && (
                <span className={styleCouponList.infoDcPercent}>
                  {infoDcPercent}
                </span>
              )}
              {infoDcPrice}<span className={styleCouponList.unitText}>원</span>
            </p>
          </div>
          <div className={styleCouponList.addInfoWrap}>
            {addInfo1 && (
              <span className={styleCouponList.warning}>종료임박</span>
            )}
            {addInfo2 && <span>포인트 적립</span>}
          </div>
        </div>
      </button>
    </>
  );
};

export default CouponListItem;
