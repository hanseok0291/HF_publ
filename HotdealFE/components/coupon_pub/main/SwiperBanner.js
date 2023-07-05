// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

// import required modules
import { Pagination, Navigation } from "swiper";

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
						<img src="https://tbezauth.settlebank.co.kr/theme/banner/BAN000003309_20220921134745076.jpg" alt="핫딜 TEST"></img>
					</SwiperSlide>
					<SwiperSlide>
						<img src="https://tbezauth.settlebank.co.kr/theme/banner/BAN000003309_20220921134745076.jpg" alt="핫딜 TEST"></img>
					</SwiperSlide>
					<SwiperSlide>
						<img src="https://tbezauth.settlebank.co.kr/theme/banner/BAN000003309_20220921134745076.jpg" alt="핫딜 TEST"></img>
					</SwiperSlide>
					<SwiperSlide>
						<img src="https://tbezauth.settlebank.co.kr/theme/banner/BAN000003309_20220921134745076.jpg" alt="핫딜 TEST"></img>
					</SwiperSlide>
				</Swiper>
		</div>
		</>
	);
}

export default SwiperBannerWrap;