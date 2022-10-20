import { useState } from "react";
import styleCouponSet from "../../../styles/coupon_pub/styleCouponSet.module.css";

const FirstCouponRadio = ({
  radioArr,
  setRadioArr,
  setModalShow_2,
  floatShow,
  setFloatShow,
}) => {
  const [firstUse, setFirstUse] = useState(false);
  const handleChange = (e) => {
    setFloatShow(true);
    const idNum = parseInt(e.target.id);
    const changeValue = radioArr.map((item) => ({
      ...item,
      checked: item.id === idNum ? e.target.checked : false,
    }));
    setRadioArr(changeValue);
    setFirstUse(false);
  };

  const handleClick = () => {
    setFloatShow(false);
    setFirstUse(true);
  };

  return (
    <div
      className={`${styleCouponSet.firstCouponRadio} ${
        floatShow ? "float" : undefined
      }`}
    >
      <div className={styleCouponSet.topCon}>
        <div className={styleCouponSet.leftText}>
          선택 가능 쿠폰 <span>3장</span>
        </div>
        <div className={styleCouponSet.rightText}>구매일순</div>
      </div>
      <div className={styleCouponSet.radioWrap}>
        {radioArr.map((item) => {
          return (
            <div
              key={item.id}
              className={`${styleCouponSet.radioBox} ${item.type}`}
            >
              <div className={styleCouponSet.textBox} onClick={setModalShow_2}>
                <img
                  src="../../../images/coupon/icon/mypage/icon-korail.png"
                  alt=""
                  className={styleCouponSet.logoImg}
                />
                <span className={styleCouponSet.discount}>{item.discount}</span>
                <span className={styleCouponSet.date}>구매일 {item.date}</span>
              </div>
              <label>
                {item.checked && firstUse && (
                  <span className={styleCouponSet.firstUse}>우선 사용</span>
                )}
                <input
                  type="radio"
                  name="coupon"
                  id={item.id}
                  onChange={(e) => handleChange(e)}
                />
                <span className={styleCouponSet.radioCircle}></span>
              </label>
            </div>
          );
        })}
      </div>
      {floatShow && (
        <button className={styleCouponSet.floatBtn} onClick={handleClick}>
          선택 저장
        </button>
      )}
    </div>
  );
};

export default FirstCouponRadio;
