import styleCouponSet from "../../../styles/coupon_pub/styleCouponSet.module.css";

const PayCouponSelect = () => {
  return (
    <div className={styleCouponSet.payCouponselect}>
      <div>
        <h4 className={styleCouponSet.titleText}>우선 사용 쿠폰</h4>
        <p className={styleCouponSet.subText}>
          가장 먼저 자동으로 사용될 쿠폰을 선택할 수 있습니다.
        </p>
      </div>
      <button className={styleCouponSet.selectBtn}>
        <span>선택하러 가기</span>
      </button>
    </div>
  );
};

export default PayCouponSelect;
