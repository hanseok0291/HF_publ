//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//css
import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
// import styleFriend from "../../styles/referral/Friend.module.css";//react

//css
// //components
import Layout from "../../../components/common/Layout";
import Header from "../../../components/coupon_pub/common/Header";
import Footer from "../../../components/coupon_pub/common/Footer";
// import Search from "../../components/coupon_pub/main/Search";
import Category from "../../../components/coupon_pub/main/Category";
// import RollingCoupon from "../../components/coupon_pub/main/RollingCoupon";
// import HotBrand from "../../components/coupon_pub/main/HotBrand";
import ReturnPoint from "../../../components/coupon_pub/main/ReturnPoint";
// import MaybeCoupon from "../../components/coupon_pub/main/MaybeCoupon";
// import PopularCoupon from "../../components/coupon_pub/main/PopularCoupon";
// import PromotionBanner from "../../components/coupon_pub/main/PromotionBanner";
/*
import LimitCoupon from "../../components/coupon_pub/main/LimitCoupon";
 */
import CategoryList from "../../../components/coupon_pub/list/CategoryList";
import ListSwiper from "../../../components/coupon_pub/list/ListSwiper";
import CouponListOpen from "../../../components/coupon_pub/list/CouponListOpen";

const Index = () => {

	//헤더 아이콘 디폴트 세팅
	const [isShowBackBtn, setShowBackBtn] = useState(false);
	const [isShowSearchBtn, setShowSearchBtn] = useState(true);
	const [isShowMypageBtn, setShowMypageBtn] = useState(true);

	return (
		<>
			<Layout>
				<Header 
					pageTitle="기프티몰"
					isShowBackBtn={isShowBackBtn}
					isShowSearchBtn={isShowSearchBtn}
					isShowMypageBtn={isShowMypageBtn}
				/>
				<div 
					className={`${styleDefaultLayout.defaultContent} ${styleDefaultLayout.wrap}`}
				>
					{/* 카테고리 메뉴 */}
					<Category />
					<div className={`${styleCommon.containerWrap}`}>
						{/* 카테고리 리스트 */}
						<CategoryList />
						{/* 카테고리 상품리스트 */}
						<CouponListOpen />
					</div>
			<Footer />
			</div>
			</Layout>
		</>
	);
};

export default Index;
