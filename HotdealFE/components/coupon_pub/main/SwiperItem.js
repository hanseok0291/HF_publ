// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";

import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleSwiper from "../../../styles/coupon_pub/Swiper.module.css";
import styleBrandList from "../../../styles/coupon_pub/BrandList.module.css";

function SwiperWrap(props) {
  return (
    <>
      <div
        className={`${styleSwiper.SwiperWrap} ${styleBrandList.SwiperWrap}`}
        style={{ backgroundColor: props.bgColor }}
      >
        <div>
          <h2
            className={`${styleCommon.container} ${styleSwiper.SwiperTitle}`}
            style={{ fontSize: props.fontSize }}
          >
            {props.title}
          </h2>
          <div className={`${styleCommon.container} ${styleSwiper.container}`}>
            <Swiper
              spaceBetween={10}
              freeMode={true}
              grabCursor={true}
              slidesPerView={"auto"}
              slidesOffsetAfter={40}
            >
              <SwiperSlide>
                <div className={styleSwiper.imgBox}>
                  <img
                    src="https://tbezauth.settlebank.co.kr/theme/cm/product/BR00007_G00000117178.jpg"
                    alt="핫딜 TEST"
                  ></img>
                </div>
                {props.accumulate == "true" ? (
                  <div className={styleSwiper.infoBox}>
                    <p className={styleSwiper.infoBrand}>스타벅스</p>
                    <p className={styleSwiper.infoProduct}>
                      아이스 카페 라떼 T
                    </p>
                    <p className={styleSwiper.infoAccumulate}>
                      <span className={styleSwiper.infoAccumulateColor}>
                        500원
                      </span>{" "}
                      적립
                    </p>
                  </div>
                ) : (
                  <div className={styleSwiper.infoBox}>
                    <p className={styleSwiper.infoBrand}>스타벅스</p>
                    <p className={styleSwiper.infoProduct}>
                      아이스 카페 라떼 T
                    </p>
                    <p className={styleSwiper.infoPrice}>8,800원</p>
                    <p className={styleSwiper.infoDcPrice}>
                      <span className={styleSwiper.infoDcPercent}>25%</span>{" "}
                      8,800원
                    </p>
                  </div>
                )}
              </SwiperSlide>
              <SwiperSlide>
                <div className={styleSwiper.imgBox}>
                  <img
                    src="https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006153424285.jpg"
                    alt="핫딜 TEST"
                  ></img>
                  {props.labelShow == "true" ? (
                    <span className={`${styleCommon.label}`}>
                      <i className={`${styleCommon.iconPick}`}></i>PICK
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
                <div className={styleSwiper.infoBox}>
                  <p className={styleSwiper.infoBrand}>스타벅스</p>
                  <p className={styleSwiper.infoProduct}>아이스 카페 라떼 T</p>
                  {/* <p className={styleSwiper.infoPrice}>8,800원</p> */}
                  <p className={styleSwiper.infoDcPrice}>
                    {/* <span className={styleSwiper.infoDcPercent}>25%</span>{" "} */}
                    8,800원
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={styleSwiper.imgBox}>
                  <img
                    src="https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006133121119.jpg"
                    alt="핫딜 TEST"
                  ></img>
                </div>
                <div className={styleSwiper.infoBox}>
                  <p className={styleSwiper.infoBrand}>스타벅스</p>
                  <p className={styleSwiper.infoProduct}>아이스 카페 라떼 T</p>
                  <p className={styleSwiper.infoPrice}>8,800원</p>
                  <p className={styleSwiper.infoDcPrice}>
                    <span className={styleSwiper.infoDcPercent}>25%</span>{" "}
                    <span className={styleSwiper.price}>8,800원</span>
                  </p>
                  <p className={styleSwiper.infoDcPrice}>
                    <span className={styleSwiper.infoDcPercent}>추가 10%</span>{" "}
                    <span>8,800원</span>
                  </p>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className={styleSwiper.imgBox}>
                  <img
                    src="https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006134857069.png"
                    alt="핫딜 TEST"
                  ></img>
                </div>
                {props.accumulate == "true" ? (
                  <div className={styleSwiper.infoBox}>
                    <p className={styleSwiper.infoBrand}>스타벅스</p>
                    <p className={styleSwiper.infoProduct}>
                      아이스 카페 라떼 T
                    </p>
                    <p className={styleSwiper.infoAccumulate}>
                      <span className={styleSwiper.infoAccumulateColor}>
                        500원
                      </span>{" "}
                      적립
                    </p>
                  </div>
                ) : (
                  <div className={styleSwiper.infoBox}>
                    <p className={styleSwiper.infoBrand}>스타벅스</p>
                    <p className={styleSwiper.infoProduct}>
                      아이스 카페 라떼 T
                    </p>
                    <p className={styleSwiper.infoPrice}>8,800원</p>
                    <p className={styleSwiper.infoDcPrice}>
                      <span className={styleSwiper.infoDcPercent}>25%</span>{" "}
                      8,800원
                    </p>
                  </div>
                )}
              </SwiperSlide>
              <SwiperSlide>
                <div className={styleSwiper.imgBox}>
                  <img
                    src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                    alt="핫딜 TEST"
                  ></img>
                </div>
                {props.accumulate == "true" ? (
                  <div className={styleSwiper.infoBox}>
                    <p className={styleSwiper.infoBrand}>스타벅스</p>
                    <p className={styleSwiper.infoProduct}>
                      아이스 카페 라떼 T
                    </p>
                    <p className={styleSwiper.infoAccumulate}>
                      <span className={styleSwiper.infoAccumulateColor}>
                        500원
                      </span>{" "}
                      적립
                    </p>
                  </div>
                ) : (
                  <div className={styleSwiper.infoBox}>
                    <p className={styleSwiper.infoBrand}>스타벅스</p>
                    <p className={styleSwiper.infoProduct}>
                      아이스 카페 라떼 T
                    </p>
                    <p className={styleSwiper.infoPrice}>8,800원</p>
                    <p className={styleSwiper.infoDcPrice}>
                      <span className={styleSwiper.infoDcPercent}>25%</span>{" "}
                      8,800원
                    </p>
                  </div>
                )}
              </SwiperSlide>
            </Swiper>
          </div>

          {props.moreBtnShow == "true" ? (
            <div className={`${styleCommon.container}`}>
              <button
                href={`/coupon_pub/`}
                className={`${styleCommon.btn} ${styleCommon.container} ${styleSwiper.SwiperLink}`}
              >
                 <span>5개</span> 상품 더보기{" "}
                <i
                  className={`${styleCommon.iconArrow} ${styleCommon.iconArrowRight}`}
                ></i>
              </button>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
}

export default SwiperWrap;
