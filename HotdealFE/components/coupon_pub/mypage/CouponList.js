import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// components
import ModalFilter from "../common/modal/ModalFilter";
import ModalBarcode from "../../../components/coupon_pub/common/modal/ModalBarcode";

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
            <ul className={`${styleCouponList.CouponList}`}> {/* 제품 없을 경우 CouponListEmpty 추가하여 여백 조정 */}
              <li className={`${styleCouponList.CouponItem}`}>
                <button href={`/coupon_pub/`}>
                  <div className={styleCouponList.imgBox}>
                    <img
                      src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                      alt="핫딜 TEST"
                    ></img>
                    <span
                      className={`${styleCommon.label} ${styleCouponList.label} ${styleCouponList.count}`}
                    >
                      D-30
                    </span>
                    <span className={`${styleCouponList.barcode}`}></span>
                  </div>
                  <div className={styleCouponList.infoBox}>
                    <p className={styleCouponList.infoBrand}>투썸플레이스</p>
                    <p className={styleCouponList.infoProduct}>오렌지에이드</p>
                    <p className={styleCouponList.infoFrom}>From.나</p>
                    <p
                      className={`${styleCouponList.infoAuto} ${styleCouponList.on}`}
                    >
                      <i
                        className={`${styleCommon.auto} ${styleCommon.on}`}
                      ></i>
                      자동 사용
                    </p>
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
                    <span
                      className={`${styleCommon.label} ${styleCouponList.label} ${styleCouponList.count}`}
                    >
                      D-30
                    </span>
                    <span className={`${styleCouponList.barcode}`}></span>
                  </div>
                  <div className={styleCouponList.infoBox}>
                    <p className={styleCouponList.infoBrand}>투썸플레이스</p>
                    <p className={styleCouponList.infoProduct}>오렌지에이드</p>
                    <p className={styleCouponList.infoFrom}>From.이헥토</p>
                    <p className={`${styleCouponList.infoAuto}`}>
                      <i
                        className={`${styleCommon.auto} ${styleCommon.off}`}
                      ></i>
                      자동 사용
                    </p>
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
                    <span
                      className={`${styleCommon.label} ${styleCouponList.label} ${styleCouponList.count}`}
                    >
                      D-30
                    </span>
                    <span className={`${styleCouponList.barcode}`}></span>
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
                  <div className={styleCouponList.imgBox}>
                    <img
                      src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                      alt="핫딜 TEST"
                    ></img>
                    <span
                      className={`${styleCommon.label} ${styleCouponList.label} ${styleCouponList.count}`}
                    >
                      D-30
                    </span>
                    <span className={`${styleCouponList.barcode}`}></span>
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
      {/* <ModalBarcode /> */}
    </>
  );
};

export default CouponList;
