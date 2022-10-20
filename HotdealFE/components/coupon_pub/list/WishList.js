import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// components
import Theme from "./Theme";
import ModalFilter from "../common/modal/ModalFilter";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";

//slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleCategoryList from "../../../styles/coupon_pub/CategoryList.module.css";
import styleCouponList from "../../../styles/coupon_pub/CouponList.module.css";
import styleWishList from "../../../styles/coupon_pub/WishList.module.css";

const CouponList = (props) => {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {/* <Theme /> */}
      {/* 브랜드필터 상단 고정일때 DropBoxOn 클래스 추가, 자식 DropBoxWrap 클래스에 fixed 클래스 추가 */}
      <div
        style={{ paddingTop: 0 }}
        className={`${styleCouponList.CouponListWrap} ${styleCouponList.DropBox}`}
      >
        <div className={`${styleCommon.container}`}>
          <div className={`${styleCouponList.containerWrap}`}>
            <ul className={`${styleCouponList.CouponList}`}>
              <li className={`${styleCouponList.CouponItem}`}>
                <button href={`/coupon_pub/`}>
                  <div className={`${styleWishList.imgWrap} `}>
                    <div
                      className={`${styleCouponList.imgBox} ${styleWishList.imgBox} ${styleCommon.imgBox} stamp `}
                    >
                      <img
                        src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                        alt="핫딜 TEST"
                      ></img>
                      <span
                        className={`${styleCommon.label} ${styleCouponList.label}`}
                      >
                        한정판매
                      </span>
                    </div>
                    <div className={styleWishList.btnWrap}>
                      <div className={styleWishList.delete}>
                        <span>삭제</span>
                      </div>
                      <div className={`${styleWishList.buy} finishSale`}>
                        <span>구매</span>
                      </div>
                    </div>
                  </div>
                  <div className={styleCouponList.infoBox}>
                    <p className={styleCouponList.infoBrand}>투썸플레이스</p>
                    <p className={styleCouponList.infoProduct}>오렌지에이드</p>
                    <p className={styleCouponList.infoPrice}>8,800원</p>
                    <p
                      className={`${styleCouponList.infoDcPrice} ${styleCouponList.infoDcPriceSmall}`}
                    >
                      <span className={styleCouponList.infoDcPercent}>25%</span>{" "}
                      <span className={styleCommon.textLine}>8,800원</span>
                    </p>
                    <p className={styleCouponList.infoDcPrice}>
                      <span className={styleCouponList.infoDcPercent}>25%</span>{" "}
                      8,800원
                    </p>
                    <p className={styleCouponList.infoBottomText}>
                      <i
                        className={`${styleCommon.infoIcon} ${styleCommon.icon} ${styleCommon.iconTimer}`}
                      ></i>
                      <span>3일 04 : 19 : 40</span> 후 마감
                    </p>
                  </div>
                </button>
              </li>
              <li className={`${styleCouponList.CouponItem}`}>
                <button href={`/coupon_pub/`}>
                  <div className={styleWishList.imgWrap}>
                    <div
                      className={`${styleCouponList.imgBox} ${styleWishList.imgBox}`}
                    >
                      <img
                        src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                        alt="핫딜 TEST"
                      ></img>
                    </div>
                    <div className={styleWishList.btnWrap}>
                      <div className={styleWishList.delete}>
                        <span>삭제</span>
                      </div>
                      <div className={styleWishList.buy}>
                        <span>구매</span>
                      </div>
                    </div>
                  </div>
                  <div className={styleCouponList.infoBox}>
                    <p className={styleCouponList.infoBrand}>BHC</p>
                    <p className={styleCouponList.infoProduct}>
                      아이스 카페 라떼 T 아이스 카페 라떼 T 아이스 카페 라떼 T
                      아이스 카페 라떼 T 아이스 카페 라떼 T
                    </p>
                    <p className={styleCouponList.infoPrice}>8,800원</p>
                    <p className={styleCouponList.infoDcPrice}>
                      <span className={styleCouponList.infoDcPercent}>25%</span>{" "}
                      8,800원
                    </p>
                    <p className={styleCouponList.infoBottomText}>
                      <i
                        className={`${styleCommon.infoIcon} ${styleCommon.icon} ${styleCommon.iconCash}`}
                      ></i>
                      사용 시 <span>10원 적립</span>
                    </p>
                  </div>
                </button>
              </li>
              <li className={`${styleCouponList.CouponItem}`}>
                <button href={`/coupon_pub/`}>
                  <div className={styleWishList.imgWrap}>
                    <div
                      className={`${styleCouponList.imgBox} ${styleWishList.imgBox}`}
                    >
                      <img
                        src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                        alt="핫딜 TEST"
                      ></img>
                    </div>
                    <div className={styleWishList.btnWrap}>
                      <div className={styleWishList.delete}>
                        <span>삭제</span>
                      </div>
                      <div className={styleWishList.buy}>
                        <span>구매</span>
                      </div>
                    </div>
                  </div>
                  <div className={styleCouponList.infoBox}>
                    <p className={styleCouponList.infoBrand}>BHC</p>
                    <p className={styleCouponList.infoProduct}>
                      아이스 카페 라떼 T 아이스 카페 라떼 T 아이스 카페 라떼 T
                      아이스 카페 라떼 T 아이스 카페 라떼 T
                    </p>
                    <p className={styleCouponList.infoPrice}>8,800원</p>
                    <p className={styleCouponList.infoDcPrice}>
                      <span className={styleCouponList.infoDcPercent}>25%</span>{" "}
                      8,800원
                    </p>
                  </div>
                </button>
              </li>
              <li className={`${styleCouponList.CouponItem}`}>
                <button href={`/coupon_pub/`}>
                  <div className={styleWishList.imgWrap}>
                    <div
                      className={`${styleCouponList.imgBox} ${styleWishList.imgBox}`}
                    >
                      <img
                        src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                        alt="핫딜 TEST"
                      ></img>
                    </div>
                    <div className={styleWishList.btnWrap}>
                      <div className={styleWishList.delete}>
                        <span>삭제</span>
                      </div>
                      <div className={styleWishList.buy}>
                        <span>구매</span>
                      </div>
                    </div>
                  </div>
                  <div className={styleCouponList.infoBox}>
                    <p className={styleCouponList.infoBrand}>BHC</p>
                    <p className={styleCouponList.infoProduct}>
                      아이스 카페 라떼 T 아이스 카페 라떼 T 아이스 카페 라떼 T
                      아이스 카페 라떼 T 아이스 카페 라떼 T
                    </p>
                    <p className={styleCouponList.infoPrice}>8,800원</p>
                    <p className={styleCouponList.infoDcPrice}>
                      <span className={styleCouponList.infoDcPercent}>25%</span>{" "}
                      8,800원
                    </p>
                  </div>
                </button>
              </li>
              <li className={`${styleCouponList.CouponItem}`}>
                <button href={`/coupon_pub/`}>
                  <div className={styleWishList.imgWrap}>
                    <div
                      className={`${styleCouponList.imgBox} ${styleWishList.imgBox}`}
                    >
                      <img
                        src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                        alt="핫딜 TEST"
                      ></img>
                    </div>
                    <div className={styleWishList.btnWrap}>
                      <div className={styleWishList.delete}>
                        <span>삭제</span>
                      </div>
                      <div className={styleWishList.buy}>
                        <span>구매</span>
                      </div>
                    </div>
                  </div>
                  <div className={styleCouponList.infoBox}>
                    <p className={styleCouponList.infoBrand}>BHC</p>
                    <p className={styleCouponList.infoProduct}>
                      아이스 카페 라떼 T 아이스 카페 라떼 T 아이스 카페 라떼 T
                      아이스 카페 라떼 T 아이스 카페 라떼 T
                    </p>
                    <p className={styleCouponList.infoPrice}>8,800원</p>
                    <p className={styleCouponList.infoDcPrice}>
                      <span className={styleCouponList.infoDcPercent}>25%</span>{" "}
                      8,800원
                    </p>
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
