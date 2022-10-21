import { useRef, useState } from "react";

import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleBuyMain from "../../../styles/coupon_pub/BuyMain.module.css";
import { useEffect } from "react";
import BuyTab from "./BuyTab";

export default function GiftDetail() {
  return (
    <div className={styleBuyMain.styleBuyMainWrap}>
      <BuyTab tabItem={["전체", "구매 완료", "구매 취소"]} />
      <div className={`${styleBuyMain.listWrap}`}>
        <div className={`${styleCommon.container} ${styleBuyMain.container}`}>
          <dl className={styleBuyMain.date}>
            <dt>구매일</dt>
            <dd>2022. 5. 19</dd>
          </dl>
          <div className={`${styleBuyMain.GiftDetaiSmalllWrap}`}>
            <div className={styleBuyMain.imgBox}>
              <img
                src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                alt="핫딜 TEST"
              ></img>
            </div>
            <div className={styleBuyMain.infoBox}>
              <span
                className={`${styleCommon.highlight} ${styleBuyMain.toName}`}
              >
                To.이세틀
              </span>
              <p className={styleBuyMain.infoBrand}>스타벅스</p>
              <p className={styleBuyMain.infoProduct}>시원하게 함께 세트</p>
              <p className={styleBuyMain.infoPrice}>
                <strong>6,300원</strong>
              </p>
            </div>
          </div>
        </div>

        <div className={`${styleCommon.container} ${styleBuyMain.container}`}>
          <dl className={styleBuyMain.date}>
            <dt>구매일</dt>
            <dd>2022. 5. 18</dd>
          </dl>
          <div className={`${styleBuyMain.GiftDetaiSmalllWrap}`}>
            <div className={styleBuyMain.imgBox}>
              <img
                src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                alt="핫딜 TEST"
              ></img>
            </div>
            <div className={styleBuyMain.infoBox}>
              <span
                className={`${styleCommon.highlight} ${styleBuyMain.toName}`}
              >
                To.이세틀
              </span>
              <p className={styleBuyMain.infoBrand}>스타벅스</p>
              <p className={styleBuyMain.infoProduct}>시원하게 함께 세트</p>
              <p className={styleBuyMain.infoPrice}>
                <strong>6,300원</strong>
              </p>
            </div>
          </div>
          <div className={`${styleBuyMain.GiftDetaiSmalllWrap}`}>
            <div className={styleBuyMain.imgBox}>
              <img
                src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                alt="핫딜 TEST"
              ></img>
            </div>
            <div className={styleBuyMain.infoBox}>
              <span
                className={`${styleCommon.highlight} ${styleBuyMain.toName}`}
              >
                To.이세틀
              </span>
              <p className={styleBuyMain.infoBrand}>스타벅스</p>
              <p className={styleBuyMain.infoProduct}>시원하게 함께 세트</p>
              <p className={styleBuyMain.infoPrice}>
                <strong>6,300원</strong>
              </p>
            </div>
          </div>
          <div className={`${styleBuyMain.GiftDetaiSmalllWrap}`}>
            <div className={styleBuyMain.imgBox}>
              <img
                src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                alt="핫딜 TEST"
              ></img>
            </div>
            <div className={styleBuyMain.infoBox}>
              <span
                className={`${styleCommon.highlight} ${styleBuyMain.toName}`}
              >
                To.이세틀
              </span>
              <p className={styleBuyMain.infoBrand}>스타벅스</p>
              <p className={styleBuyMain.infoProduct}>시원하게 함께 세트</p>
              <p className={styleBuyMain.infoPrice}>
                <strong>6,300원</strong>
              </p>
            </div>
          </div>
        </div>

        <div className={`${styleCommon.container} ${styleBuyMain.container}`}>
          <dl className={styleBuyMain.date}>
            <dt>구매일</dt>
            <dd>2022. 5. 17</dd>
          </dl>
          <div className={`${styleBuyMain.GiftDetaiSmalllWrap}`}>
            <div className={styleBuyMain.imgBox}>
              <img
                src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                alt="핫딜 TEST"
              ></img>
            </div>
            <div className={styleBuyMain.infoBox}>
              <span
                className={`${styleCommon.highlight} ${styleBuyMain.toName}`}
              >
                To.이세틀
              </span>
              <p className={styleBuyMain.infoBrand}>스타벅스</p>
              <p className={styleBuyMain.infoProduct}>시원하게 함께 세트</p>
              <p className={styleBuyMain.infoPrice}>
                <strong>6,300원</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
