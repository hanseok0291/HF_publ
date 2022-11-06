import { useEffect, useState } from "react";
import { useRouter } from "next/router";

//slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleSlick from "../../../styles/coupon_pub/Slick.module.css";

const RollingCoupon = () => {
  const router = useRouter();
  const [sysdate, setSysdate] = useState("");

  // 0원 구매 찬스!
  const [freeCoupon, setFreeCoupon] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    centerMode: true,
    autoplay: false,
    autoplaySpeed: 2000,
    centerPadding: "17%",
    // responsive: [
    //   {
    //     breakpoint: 1200,
    //     settings: {
    //       centerPadding: "30%",
    //     },
    //   },
    //   {
    //     breakpoint: 768,
    //     settings: {
    //       centerPadding: "17%",
    //     },
    //   },
    //   {
    //     breakpoint: 370,
    //     settings: {
    //       centerPadding: "32px",
    //     },
    //   },
    // ],
  };

  // 0원 구매 찬스!
  const FreeCoupon = (item) => {
    return (
      <>
        {item.freeCoupon && (
          <div
            style={{
              width: "100%",
              height: "250px",
              border: "1px solid #000",
            }}
          >
            <h2>0원 구매 찬스!</h2>
            <li>상품이미지 : </li>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div className={styleSlick.slideWrap}>
        {/* 스켈레톤 */}
        {/* <div
          className={`${styleCommon.container} ${styleSlick.container} ${styleSlick.slickVoid}`}
        >
          <div>
            <div className={`${styleSlick.card}`}>
              <div className={styleSlick.imgBox}></div>
              <div className={styleSlick.infoBox}>
                <h2 className={styleSlick.infoLabel}></h2>
                <p className={styleSlick.infoBrand}></p>
                <p className={styleSlick.infoProduct}></p>
                <p className={styleSlick.infoPrice}></p>
                <p className={styleSlick.infoBottomText}></p>
              </div>
            </div>
          </div>
        </div> */}
        {/* //스켈레톤 */}
        {/* 슬릭 */}
        <div className={`${styleCommon.container} ${styleSlick.container}`}>
          <Slider {...settings}>
            <div className={styleSlick.card}>
              <div className={styleSlick.imgBox}>
                <img
                  src="https://tbezauth.settlebank.co.kr/theme/cm/product/BR00007_G00000117178.jpg"
                  alt="핫딜 TEST"
                ></img>
              </div>
              <div className={styleSlick.infoBox}>
                <h2 className={styleSlick.infoLabel}>0원 구매 찬스!</h2>
                <p className={styleSlick.infoBrand}>스타벅스</p>
                <p className={styleSlick.infoProduct}>
                  아이스 카페 라떼 T 아이스 카페 라떼 T 아이스 카페 라떼 T
                  아이스 카페 라떼 T 아이스 카페 라떼 T
                </p>
                <p className={styleSlick.infoPrice}>
                  <span className={`${styleSlick.infoDcPriceNormal}`}>
                    포인트 사용해서
                  </span>
                  0원
                </p>
                <p className={styleSlick.infoBottomText}>
                  <i
                    className={`${styleCommon.infoIcon} ${styleCommon.icon} ${styleCommon.iconRaffle}`}
                  ></i>
                  <span>100명</span> 추첨
                </p>
              </div>
            </div>
            <div className={styleSlick.card}>
              <div className={styleSlick.imgBox}>
                <img
                  src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                  alt="핫딜 TEST"
                ></img>
              </div>
              <div className={styleSlick.infoBox}>
                <h2 className={styleSlick.infoLabel}>0원 구매 찬스!</h2>
                <p className={styleSlick.infoBrand}>스타벅스</p>
                <p className={styleSlick.infoProduct}>
                  아이스 카페 라떼 T 아이스 카페 라떼 T 아이스 카페 라떼 T
                  아이스 카페 라떼 T 아이스 카페 라떼 T
                </p>
                <p className={styleSlick.infoPrice}>
                  <span className={`${styleSlick.infoDcPriceNormal}`}>
                    포인트 사용해서
                  </span>
                  0원
                </p>
                <p className={styleSlick.infoBottomText}>
                  <i
                    className={`${styleCommon.infoIcon} ${styleCommon.icon} ${styleCommon.iconTimer}`}
                  ></i>
                  <span>3일 04 : 19 : 40</span> 후 마감
                </p>
              </div>
            </div>
            <div className={styleSlick.card}>
              <div className={styleSlick.imgBox}>
                <img
                  src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                  alt="핫딜 TEST"
                ></img>
              </div>
              <div className={styleSlick.infoBox}>
                <h2 className={styleSlick.infoLabel}>포인트 추가 적립</h2>
                <p className={styleSlick.infoBrand}>스타벅스</p>
                <p className={styleSlick.infoProduct}>
                  아이스 카페 라떼 T <br />
                  <strong>8,800원</strong>
                </p>
                <p className={styleSlick.infoBottomText}>
                  <i
                    className={`${styleCommon.infoIcon} ${styleCommon.icon} ${styleCommon.iconEarn}`}
                  ></i>
                  사용하면<span> 100원 적립</span>
                </p>
              </div>
            </div>
            <div className={styleSlick.card}>
              <div className={styleSlick.imgBox}>
                <img
                  src="../images/coupon/icon/common/icon-misson-color.png"
                  alt="핫딜 TEST"
                ></img>
              </div>
              <div className={styleSlick.infoBox}>
                <h2 className={styleSlick.infoLabel}>미션</h2>
                <p className={styleSlick.infoBrand}>미션 완료하면</p>
                <p className={styleSlick.infoProduct}>
                  233,300원 <br />
                  <strong>추가할인</strong>
                </p>
                <button type="button" className={styleSlick.infoBtn}>
                  지금 할인받기{" "}
                  <i
                    className={`${styleCommon.iconArrowRight} ${styleSlick.iconArrowRight}`}
                  ></i>
                </button>
              </div>
            </div>
            <div className={styleSlick.card}>
              <div className={styleSlick.imgBox}>
                <img
                  src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                  alt="핫딜 TEST"
                ></img>
              </div>
              <div className={styleSlick.infoBox}>
                <h2 className={styleSlick.infoLabel}>기간 한정 특가</h2>
                <p className={styleSlick.infoBrand}>스타벅스</p>
                <p className={styleSlick.infoProduct}>
                  아이스 카페 라떼 T 아이스 카페 라떼 T 아이스 카페 라떼 T
                  아이스 카페 라떼 T 아이스 카페 라떼 T
                </p>
                <p className={styleSlick.infoPrice}>
                  <span className={styleSlick.infoDcPrice}>8,000원</span>4,400원
                </p>
                <p className={styleSlick.infoBottomText}>
                  <i
                    className={`${styleCommon.infoIcon} ${styleCommon.icon} ${styleCommon.iconDc}`}
                  ></i>
                  25% + <span>추가할인 25%</span>
                </p>
              </div>
            </div>
            <div className={styleSlick.card}>
              <div className={styleSlick.imgBox}>
                <img
                  src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                  alt="핫딜 TEST"
                ></img>
              </div>
              <div className={styleSlick.infoBox}>
                <h2 className={styleSlick.infoLabel}>인기 상품</h2>
                <p className={styleSlick.infoBrand}>스타벅스</p>
                <p className={styleSlick.infoProduct}>아이스 카페 라떼 T</p>
                <p className={styleSlick.infoPrice}>8,800원</p>
                <p className={styleSlick.infoBottomText}>
                  <i
                    className={`${styleCommon.infoIcon} ${styleCommon.icon} ${styleCommon.iconSelect}`}
                  ></i>
                  <span>1,124명</span>의 선택
                </p>
              </div>
            </div>
            <div className={styleSlick.card}>
              <div className={styleSlick.imgBox}>
                <img
                  src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                  alt="핫딜 TEST"
                ></img>
              </div>
              <div className={styleSlick.infoBox}>
                <h2 className={styleSlick.infoLabel}>인기 상품</h2>
                <p className={styleSlick.infoBrand}>스타벅스</p>
                <p className={styleSlick.infoProduct}>아이스 카페 라떼 T</p>
                <p className={styleSlick.infoPrice}>8,800원</p>
                <p className={styleSlick.infoBottomText}>
                  <i
                    className={`${styleCommon.infoIcon} ${styleCommon.icon} ${styleCommon.iconStock}`}
                  ></i>
                  남은 수량 <span>11개</span>
                </p>
              </div>
            </div>
          </Slider>
        </div>
        {/* //슬릭 */}
      </div>
    </>
  );
};

export default RollingCoupon;
