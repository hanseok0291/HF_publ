// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import styleCouponList from "../../../styles/coupon_pub/CouponList.module.css";
import styleSwiper from "../../../styles/coupon_pub/Swiper.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleRettoModal from "../../../styles/retto_pub/Modal.module.css";

const listItem = [
  {
    infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/BR00007_G00000117178.jpg",
    infoBrand: "스타벅스",
    infoProduct: "따뜻한 카페라떼 커플세트",
    infoPrice: "10,000",
    infoDcPercent: "25%",
    infoDcPrice: "7,500",
  },
  {
    infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006153424285.jpg",
    infoBrand: "스타벅스",
    infoProduct: "따뜻한 카페라떼 커플세트 따뜻한 카페라떼",
    infoPrice: "10,000",
    infoDcPercent: "25%",
    infoDcPrice: "7,500",
  },
  {
    infoImg: "https://tbezauth.settlebank.co.kr/theme/cm/product/PB00145_20221006133121119.jpg",
    infoBrand: "스타벅스",
    infoProduct: "시원하게 함께 세트",
    infoPrice: "10,000",
    infoDcPercent: "25%",
    infoDcPrice: "7,500",
  },
];

function RettoSwiperItem(props) {

  return (
    <>
      <div className={`${styleSwiper.container} ${styleRettoModal.giftimallList}`}>
        {listItem.map((item, idx) => {
          return (
            <button href={`/coupon_pub/`} key={idx} className={styleRettoModal.giftimallListItem}>
              <div className={`${styleCouponList.imgBox} ${styleRettoModal.missionImgBox}`}>
                <img src={item.infoImg} alt="핫딜 TEST"></img>
              </div>
              <div className={styleCouponList.infoBox}>
                <p className={styleCouponList.infoBrand}>{item.infoBrand}</p>
                <p className={styleCouponList.infoProduct}>{item.infoProduct}</p>
                <div className={`${styleCouponList.infoPriceWrap}`}>
                  {item.infoPrice && <p className={styleCouponList.infoPrice}>{item.infoPrice}원</p>}
                  <p className={`${styleCouponList.infoDcPrice}`}>
                    {item.infoDcPercent && (
                      <span className={styleCouponList.infoDcPercent}>
                        {item.infoDcPercent}
                      </span>
                    )}
                    { <>{item.infoDcPrice}</>}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </>
  );
}

export default RettoSwiperItem;
