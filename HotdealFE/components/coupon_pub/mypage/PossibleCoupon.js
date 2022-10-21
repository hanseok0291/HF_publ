import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import SwiperItem from "./SwiperItem";

const PossibleCoupon = () => {
	return (
		<>
			<SwiperItem moreBtnShow="false" labelShow="true" isPossibleCoupon="true" couponEmpty="false" />
		</>
	);
};

export default PossibleCoupon;