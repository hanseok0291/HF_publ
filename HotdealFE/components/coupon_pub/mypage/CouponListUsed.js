import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// components
import ModalFilter from "../common/modal/ModalFilter";

import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleCategoryList from "../../../styles/coupon_pub/CategoryList.module.css";
import styleCouponList from "../../../styles/coupon_pub/CouponList.module.css";

const CouponList = (props) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {/* 브랜드필터 상단 고정일때 DropBoxOn 클래스 추가, 자식 DropBoxWrap 클래스에 fixed 클래스 추가 */}
      <div className={`${styleCouponList.CouponListWrap}`}>
        <div className={`${styleCommon.container}`}>
          <div className={`${styleCouponList.containerWrap}`}>
            <ul className={`${styleCouponList.CouponList}`}>
              <li className={`${styleCouponList.CouponItem}`}>
                <button href={`/coupon_pub/`}>
                  <div
                    className={`${styleCouponList.imgBox} ${styleCommon.imgBox} stamp stamp_1 centerSmall`}
                  >
                    <img
                      src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                      alt="핫딜 TEST"
                    ></img>
                  </div>
                  <div className={styleCouponList.infoBox}>
                    <p className={styleCouponList.infoBrand}>투썸플레이스</p>
                    <p className={styleCouponList.infoProduct}>오렌지에이드</p>
                    <p className={styleCouponList.infoFrom}>From.나</p>
                  </div>
                </button>
              </li>
              <li className={`${styleCouponList.CouponItem}`}>
                <button href={`/coupon_pub/`}>
                  <div className={`${styleCouponList.imgBox} ${styleCommon.imgBox} stamp stamp_2 centerSmall`}>
                    <img
                      src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                      alt="핫딜 TEST"
                    ></img>
                  </div>
                  <div className={styleCouponList.infoBox}>
                    <p className={styleCouponList.infoBrand}>투썸플레이스</p>
                    <p className={styleCouponList.infoProduct}>오렌지에이드</p>
                    <p className={styleCouponList.infoFrom}>From.이헥토</p>
                  </div>
                </button>
              </li>
              <li className={`${styleCouponList.CouponItem}`}>
                <button href={`/coupon_pub/`}>
                  <div className={`${styleCouponList.imgBox} ${styleCommon.imgBox} stamp stamp_3 centerSmall`}>
                    <img
                      src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                      alt="핫딜 TEST"
                    ></img>
                  </div>
                  <div className={styleCouponList.infoBox}>
                    <p className={styleCouponList.infoBrand}>투썸플레이스</p>
                    <p className={styleCouponList.infoProduct}>오렌지에이드</p>
                    <p className={styleCouponList.infoFrom}>From.이헥토</p>
                  </div>
                </button>
              </li>
              <li className={`${styleCouponList.CouponItem}`}>
                <button href={`/coupon_pub/`}>
                  <div className={`${styleCouponList.imgBox} ${styleCommon.imgBox} stamp stamp_4 centerSmall`}>
                    <img
                      src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                      alt="핫딜 TEST"
                    ></img>
                  </div>
                  <div className={styleCouponList.infoBox}>
                    <p className={styleCouponList.infoBrand}>투썸플레이스</p>
                    <p className={styleCouponList.infoProduct}>오렌지에이드</p>
                    <p className={styleCouponList.infoFrom}>From.이헥토</p>
                  </div>
                </button>
              </li>
              <li className={`${styleCouponList.CouponItem}`}>
                <button href={`/coupon_pub/`}>
                  <div className={`${styleCouponList.imgBox} ${styleCommon.imgBox} stamp stamp_5 centerSmall`}>
                    <img
                      src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                      alt="핫딜 TEST"
                    ></img>
                  </div>
                  <div className={styleCouponList.infoBox}>
                    <p className={styleCouponList.infoBrand}>투썸플레이스</p>
                    <p className={styleCouponList.infoProduct}>오렌지에이드</p>
                    <p className={styleCouponList.infoFrom}>From.이헥토</p>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* <ModalFilter /> */}
    </>
  );
};

export default CouponList;
