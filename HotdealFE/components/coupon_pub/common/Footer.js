import { isEmpty } from "lodash";
import Link from "next/link";

//import ModalEnter from "../../../components/coupon_pub/common/modal/ModalEnter";

import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleLayout from "../../../styles/coupon_pub/Layout.module.css";
import styleFooter from "../../../styles/coupon_pub/Footer.module.css";
import { useState } from "react";

const FooterInfo = () => {
  return (
    <>
      <ul className={styleFooter.footerList}>
        <li>
          <span>대표</span> 최종원
        </li>
        <li>
          <span>주소</span> (06220)서울특별시 강남구 테헤란로 34길 6, 태광타워
          9~10층
        </li>
        <li>
          <span>통신판매업</span> <a href="#">제2017-서울강남-00914호</a>
        </li>
        <li>
          <span>사업자등록번호</span> <a href="#">101-81-63383</a>
        </li>
      </ul>
    </>
  );
};

export default function Footer({ isfixedBottom }) {
  const [visible, setVisible] = useState(false);
  return (
    <>
      {isfixedBottom ? (
        <div
          className={`${styleFooter.footerWrap} ${styleLayout.container} ${styleFooter.fixBottomUse}`}
        >
          <div className={styleFooter.footer}>
            <Link href={`/coupon/`}>
              <a className={`${styleLayout.btnLink} ${styleLayout.btnLink1}`}>
                고객센터
              </a>
            </Link>
            <span className={styleFooter.txtBar}>|</span>
            <Link href={`/coupon/`}>
              <a className={`${styleLayout.btnLink} ${styleLayout.btnLink1}`}>
                이용약관
              </a>
            </Link>
            <span className={styleFooter.txtBar}>|</span>
            <Link href={`/coupon/`}>
              <a className={`${styleLayout.btnLink} ${styleLayout.btnLink1}`}>
                개인정보처리방침
              </a>
            </Link>
          </div>
          <div
            className={styleFooter.addressWrap}
            onClick={() => {
              setVisible(!visible);
            }}
          >
            <div className={styleFooter.addressBtn}>
              (주)헥토파이낸셜{" "}
              <button
                type="button"
                className={`${styleCommon.icon} ${styleCommon.iconArrowDown} ${styleFooter.iconArrowDown}`}
              ></button>
              {visible && <FooterInfo />}
            </div>
          </div>
          {/* <ModalEnter /> */}
        </div>
      ) : (
        <div className={`${styleFooter.footerWrap} ${styleLayout.container}`}>
          <div className={styleFooter.footer}>
            <Link href={`/coupon/`}>
              <a className={`${styleLayout.btnLink} ${styleLayout.btnLink1}`}>
                고객센터
              </a>
            </Link>
            <span className={styleFooter.txtBar}>|</span>
            <Link href={`/coupon/`}>
              <a className={`${styleLayout.btnLink} ${styleLayout.btnLink1}`}>
                이용약관
              </a>
            </Link>
            <span className={styleFooter.txtBar}>|</span>
            <Link href={`/coupon/`}>
              <a className={`${styleLayout.btnLink} ${styleLayout.btnLink1}`}>
                개인정보처리방침
              </a>
            </Link>
          </div>
          <div
            className={styleFooter.addressWrap}
            onClick={() => {
              setVisible(!visible);
            }}
          >
            <div className={styleFooter.addressBtn}>
              (주)헥토파이낸셜{" "}
              <button
                type="button"
                className={`${styleCommon.icon} ${styleCommon.iconArrowDown} ${styleFooter.iconArrowDown}`}
              ></button>
              {visible && <FooterInfo />}
            </div>
          </div>
          {/* <ModalEnter /> */}
        </div>
      )}
    </>
  );
}
