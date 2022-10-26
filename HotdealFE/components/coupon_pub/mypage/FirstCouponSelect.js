import styleCouponSet from "../../../styles/coupon_pub/styleCouponSet.module.css";

const FirstCouponSelect = ({ setModalShow_1, selectBrand }) => {
  return (
    <div className={styleCouponSet.firstCouponSelect}>
      <h3 className={styleCouponSet.titleText}>
        가장 먼저 자동으로 사용될
        <br />
        쿠폰을 선택해 보세요!
      </h3>
      <p className={styleCouponSet.subText}>
        미선택 시 구매일이 가장 오래된 순으로 사용됩니다.
      </p>
      <button
        onClick={setModalShow_1}
        className={`${styleCouponSet.selectBtn} ${
          selectBrand && `on ${selectBrand}`
        }`}
      >
        {!selectBrand ? (
          <span>브랜드 선택</span>
        ) : (
          <img
            src="../../../images/coupon/icon/mypage/icon-kt.png"
            alt=""
            className={styleCouponSet.logoImg}
          />
        )}
      </button>
    </div>
  );
};

export default FirstCouponSelect;
