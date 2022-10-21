import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import SwiperItem from "../main/SwiperItem";

const ListSwiper = () => {
	return (
		<>
			<SwiperItem title={["박혜빈님께 추천해요", <span>🍰</span>]} moreBtnShow="false" labelShow="true" />
		</>
	);
};

export default ListSwiper;