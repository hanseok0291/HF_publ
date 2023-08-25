import { useEffect, useState } from "react";
import { useRouter } from "next/router";

//components
import Guide from "../../../components/coupon_pub/mypage/Guide";

//css
import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleMenu from "../../../styles/coupon_pub/Menu.module.css";
import PossibleCoupon from "../../../components/coupon_pub/mypage/PossibleCoupon";
import PossibleCouponEmpty from "../../../components/coupon_pub/mypage/PossibleCouponEmpty";

const Menu = () => {
  return (
    <>
      <div className={`${styleMenu.titleWrap}`}>
        <h2
          className={`${styleDefaultLayout.container} ${styleCommon.containerWrapTitle} ${styleMenu.containerWrapTitle}`}
        >
          양사랑님의 선물함<span className="titleEmoticon">💝</span>
        </h2>
      </div>
      <div className={`${styleMenu.menuWrap}`}>
        <ul className={`${styleDefaultLayout.container} ${styleMenu.menuList}`}>
          <li className={`${styleMenu.menuStock}`}>
            <a href="#">보유</a>
          </li>
          <li className={`${styleMenu.menuDraw}`}>
            <a href="#">응모</a>
          </li>
          <li className={`${styleMenu.menuCoupon}`}>
            <a href="#">쿠폰 등록</a>
          </li>
          <li className={`${styleMenu.menuLike}`}>
            <a href="#">좋아요</a>
          </li>
        </ul>
      </div>
      <PossibleCoupon />
      {/* <PossibleCouponEmpty /> */}
      <Guide />
      {/* <Footer /> */}
    </>
  );
};

export default Menu;
