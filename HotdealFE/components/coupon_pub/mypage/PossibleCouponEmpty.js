import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import SwiperItem from "./SwiperItem";

const PossibleCouponEmpty = () => {
	return (
		<>
			<SwiperItem moreBtnShow="false" labelShow="true" isPossibleCoupon="true" couponEmpty="true" />
		</>
	);
};

export default PossibleCouponEmpty;