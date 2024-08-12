//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//components
import Layout from "../../../components/common/Layout";
import HeaderMypage from "../../../components/coupon_pub/common/HeaderMypage";
import MenuEmpty from "../../../components/coupon_pub/mypage/MenuEmpty";

const Index = () => {
	const router = useRouter();
	const wrapRef = useRef();

	return (
		<>
			<HeaderMypage pageTitle="선물함" subHeader={true} />
			<Layout>
			<MenuEmpty />
			</Layout>
		</>
	);
};

export default Index;
