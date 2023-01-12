//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//components
import Layout from "../../../components/common/Layout";
import HeaderMypage from "../../../components/coupon_pub/common/HeaderMypage";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
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
  }, []);

  return (
    <>
      <Layout>
        <HeaderMypage
          pageTitle={useTitle && "선물함"}
          isShowRegCodeBtn={true}
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
