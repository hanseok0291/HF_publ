import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styleDefaultLayout from "../../../styles/common/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleNav from "../../../styles/coupon_pub/Nav.module.css";

const Navigation = () => {

  return (
    <>
      <div className={styleNav.navWrap}>
        <ul className={styleNav.nav}>
          <li className={styleNav.active}>
            <a href={`/coupon/`} className={styleCommon.btn}>
              HOME
            </a>
          </li>
          <li>
            <a href={`/list/`} className={styleCommon.btn}>
              할인
            </a>
          </li>
          <li>
            <a href={`/list/`} className={styleCommon.btn}>
              브랜드
            </a>
          </li>
          <li>
            <a href={`/list/`} className={styleCommon.btn}>
              선물함
            </a>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navigation;
