//react
import { useState } from "react";

//css
import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";

//css
// //components
import Layout from "../../../components/common/Layout";
import Header from "../../../components/coupon_pub/common/Header";

import PayCouponAuto from "../../../components/coupon_pub/mypage/PayCouponAuto";
import PayCouponSelect from "../../../components/coupon_pub/mypage/PayCouponSelect";

const Index = () => {
  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(true);
  const [isShowSearchBtn, setShowSearchBtn] = useState(false);
  const [isShowMypageBtn, setShowMypageBtn] = useState(false);
  const [isFixedTop, setFixedTop] = useState(false);
  const [isFixedBottom, setFixedBottom] = useState(true);

  const [toggleState, setToggleState] = useState(false);

  const handleClick = (e) => {
    setToggleState(!toggleState);
  };

  return (
    <>
      <Layout>
        <Header
          pageTitle="PAY쿠폰 사용 설정"
          isShowBackBtn={isShowBackBtn}
          isShowSearchBtn={isShowSearchBtn}
          isShowMypageBtn={isShowMypageBtn}
        />
        <div
          className={`${styleDefaultLayout.defaultContent} ${styleDefaultLayout.wrap}`}
        >
          <PayCouponAuto handleClick={handleClick} toggleState={toggleState} />
          {toggleState && <PayCouponSelect />}
        </div>
      </Layout>
    </>
  );
};

export default Index;
