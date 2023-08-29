//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//components
import Layout from "../../../components/common/Layout";
import HeaderMypage from "../../../components/coupon_pub/common/HeaderMypage";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import Menu from "../../../components/coupon_pub/mypage/Menu";
import Footer from "../../../components/coupon_pub/common/Footer";
import Header from "../../../components/coupon_pub/common/Header";
import Navigation from "../../../components/coupon_pub/main/Navigation";

const Index = () => {
  const [isShowBackBtn, setShowBackBtn] = useState(true);
  const [isShowSearchBtn, setShowSearchBtn] = useState(false);
  const [useTitle, setUseTitle] = useState(false);
  const router = useRouter();
  const wrapRef = useRef();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      const scrollTop = document.scrollingElement.scrollTop;
      scrollTop > 0 ? setUseTitle(true) : setUseTitle(false);
    });
  }, []);

  return (
    <>
      <Layout>
        <Header
          pageTitle=""
          isShowBackBtn={isShowBackBtn}
          isShowSearchBtn={isShowSearchBtn}
          />
        <div className={styleCommon.myPageWrap}>
        <Menu />
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default Index;
