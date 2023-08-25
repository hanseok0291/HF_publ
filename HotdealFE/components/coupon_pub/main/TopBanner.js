import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

// css
import styleRewardBanner from "../../../styles/coupon_pub/RewardBanner.module.css";

const data = [
  {
    src: '../images/coupon/sample/banner-main-1.png',
    name: '기프티몰 배너'
  },
  {
    src: '../images/coupon/sample/banner-main-1.png',
    name: '기프티몰 배너'
  },
]
const TopBanner = () => {
  const swiperParams = {
    centeredSlides: true,
    slidesPerView: 1,
    modules: [Autoplay, Pagination],
    // autoplay: {
    //   delay: 2000
    // },
    loop: true,
    pagination: {
      type: 'fraction',
    }
  };

  return (
    <>
      <Swiper {...swiperParams} className={styleRewardBanner.topBannerWrap}>
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <a href="#" className={styleRewardBanner.linkBox}>
              <img src={item.src} alt={item.name} />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default TopBanner;
