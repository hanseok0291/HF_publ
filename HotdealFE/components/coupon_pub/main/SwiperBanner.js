// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

// import required modules
import { Pagination, Navigation } from "swiper";

import styleCommon from "../../../styles/referral/Common.module.css";
import styleSwiperBanner from "../../../styles/coupon_pub/SwiperBanner.module.css";

function SwiperBannerWrap(props) {
	return (
		<>
		<div className={styleSwiperBanner.SwiperBannerWrap}>
			
		<Swiper
					grabCursor={true}
					pagination={{
						type: "fraction",
					}}
					navigation={true}
					modules={[Pagination, Navigation]}
					onSlideChange={() => console.log('slide change')}
					onSwiper={(swiper) => console.log(swiper)}
				>
					<SwiperSlide>
						<img src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png" alt="핫딜 TEST"></img>
					</SwiperSlide>
					<SwiperSlide>
						<img src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png" alt="핫딜 TEST"></img>
					</SwiperSlide>
					<SwiperSlide>
						<img src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png" alt="핫딜 TEST"></img>
					</SwiperSlide>
					<SwiperSlide>
						<img src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png" alt="핫딜 TEST"></img>
					</SwiperSlide>
				</Swiper>
		</div>
		</>
	);
};

export default SwiperBannerWrap;