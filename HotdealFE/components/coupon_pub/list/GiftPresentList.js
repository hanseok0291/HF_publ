import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleCouponList from "../../../styles/coupon_pub/CouponList.module.css";
import styleGiftPresent from "../../../styles/coupon_pub/GiftPresent.module.css";

const GiftPresentList = () => {
  return (
    <>
      <div
        className={`${styleCouponList.CouponListWrap} ${styleCouponList.DropBox} ${styleCouponList.brandInDropBox}`}
      >
        <div className={`${styleCommon.container}`}>
          <div className={`${styleCouponList.containerWrap}`}>
            <ul className={`${styleCouponList.CouponList}`}>
              <li className={`${styleCouponList.CouponItem}`}>
                <button href={`/coupon_pub/`}>
                  <div className={styleCouponList.imgBox}>
                    <img
                      src="https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006133121119.jpg"
                      alt="핫딜 TEST"
                    ></img>
                  </div>
                  <div className={styleCouponList.infoBox}>
                    <span 
                      className={`${styleCommon.highlight} ${styleGiftPresent.toName}`}
                    >
                      To.이세틀
                    </span>
                    <p className={styleCouponList.infoBrand}>투썸플레이스</p>
                    <p className={styleCouponList.infoProduct}>오렌지에이드</p>
                    <p className={styleGiftPresent.infoPrice}>8,800<span className={styleGiftPresent.unitText}>원</span></p>
                    <p className={styleGiftPresent.infoDate}>2022. 5. 18</p>
                  </div>
                </button>
              </li>
              <li className={`${styleCouponList.CouponItem}`}>
                <button href={`/coupon_pub/`}>
                  <div className={styleCouponList.imgBox}>
                    <img
                      src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                      alt="핫딜 TEST"
                    ></img>
                  </div>
                  <div className={styleCouponList.infoBox}>
                    <span
                      className={`${styleCommon.highlight} ${styleGiftPresent.toName}`}
                    >
                      To.이세틀
                    </span>
                    <p className={styleCouponList.infoBrand}>투썸플레이스</p>
                    <p className={styleCouponList.infoProduct}>오렌지에이드</p>
                    <p className={styleGiftPresent.infoPrice}>8,800<span className={styleGiftPresent.unitText}>원</span></p>
                    <p className={styleGiftPresent.infoDate}>2022. 5. 18</p>
                  </div>
                </button>
              </li>
              <li className={`${styleCouponList.CouponItem}`}>
                <button href={`/coupon_pub/`}>
                  <div className={styleCouponList.imgBox}>
                    <img
                      src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                      alt="핫딜 TEST"
                    ></img>
                  </div>
                  <div className={styleCouponList.infoBox}>
                    <span
                      className={`${styleCommon.highlight} ${styleGiftPresent.toName}`}
                    >
                      To.이세틀
                    </span>
                    <p className={styleCouponList.infoBrand}>투썸플레이스</p>
                    <p className={styleCouponList.infoProduct}>오렌지에이드</p>
                    <p className={styleGiftPresent.infoPrice}>8,800<span className={styleGiftPresent.unitText}>원</span></p>
                    <p className={styleGiftPresent.infoDate}>2022. 5. 18</p>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default GiftPresentList;
