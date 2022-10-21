//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//css
import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleGiftCoupon from "../../../styles/coupon_pub/GiftCoupon.module.css";

// //components
import Header from "../../../components/coupon_pub/common/Header";
import GiftCoupon from "../../../components/coupon_pub/mypage/GiftCoupon";

const Index = () => {
  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(true);
  const [isShowSearchBtn, setShowSearchBtn] = useState(false);
  const [isShowMypageBtn, setShowMypageBtn] = useState(false);
  const [isFixedTop, setFixedTop] = useState(false);
  const [isFixedBottom, setFixedBottom] = useState(true);

  return (
    <>
      <div className={styleGiftCoupon.wrap}>
        <Header
          pageTitle="선물받은 쿠폰 등록"
          isShowBackBtn={isShowBackBtn}
          isShowSearchBtn={isShowSearchBtn}
          isShowMypageBtn={isShowMypageBtn}
        />
        <div
          className={`${styleDefaultLayout.defaultContent} ${styleDefaultLayout.wrap} ${styleGiftCoupon.conWrap}`}
        >
          <GiftCoupon />
        </div>
      </div>
    </>
  );
};

export default Index;
