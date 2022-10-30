import styleCouponSet from "../../../styles/coupon_pub/styleCouponSet.module.css";

const PayCouponAuto = ({ handleClick, toggleState }) => {
  return (
    <div className={styleCouponSet.payCouponAuto}>
      <div className={styleCouponSet.topCon}>
        <div>
          <h4 className={styleCouponSet.titleText}>결제 시 자동 적용</h4>
          <p className={styleCouponSet.subText}>
            PAY쿠폰을 보유하고 있다면 별도의 <br />
            사용 과정 없이 결제할 때 자동으로 사용됩니다.
          </p>
        </div>
        <div
          className={`${styleCouponSet.toggleWrap} ${
            toggleState ? `on` : `off`
          }`}
        >
          <span
            onClick={() => handleClick()}
            className={styleCouponSet.toggleBtn}
          ></span>
        </div>
      </div>
      <div className={styleCouponSet.botCon}>
        <p>※ 아래 브랜드는 자동 적용 설정 시에만 사용 가능</p>
        <ul>
          <li>
            <img
              src="../../../images/coupon/icon/mypage/icon-onestore.png"
              alt="원스토어"
            />
            <span>원스토어</span>
          </li>
          <li>
            <img
              src="../../../images/coupon/icon/mypage/icon-korail.png"
              alt="코레일"
            />
            <span>코레일</span>
          </li>
          <li>
            <img
              src="../../../images/coupon/icon/mypage/icon-kt.png"
              alt="KT멤버쉽"
            />
            <span>KT멤버쉽</span>
          </li>
          <li>
            <img
              src="../../../images/coupon/icon/mypage/icon-korail.png"
              alt="코레일"
            />
            <span>코레일</span>
          </li>
          <li>
            <img
              src="../../../images/coupon/icon/mypage/icon-kt.png"
              alt="KT멤버쉽"
            />
            <span>KT멤버쉽</span>
          </li>
          <li>
            <img
              src="../../../images/coupon/icon/mypage/icon-kt.png"
              alt="KT멤버쉽"
            />
            <span>KT멤버쉽</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PayCouponAuto;
