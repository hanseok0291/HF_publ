//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//components
import Layout from "../../../components/common/Layout";
import HeaderMypage from "../../../components/coupon_pub/common/HeaderMypage";
import Menu from "../../../components/coupon_pub/mypage/Menu";
import Footer from "../../../components/coupon_pub/common/Footer";

const Index = () => {
	const [useTitle, setUseTitle] = useState(false);
  const router = useRouter();
  const wrapRef = useRef();

	useEffect(() => {
		window.addEventListener("scroll", () => {
			const scrollTop = document.scrollingElement.scrollTop;
			scrollTop > 0 ? setUseTitle(true) : setUseTitle(false);
		});
	}, [])
	

  return (
    <>
      <HeaderMypage pageTitle={useTitle && "선물함"} isShowRegCodeBtn={true} />
      <Layout>
        <Menu />
        <Footer />
      </Layout>
    </>
  );
};

export default Index;
