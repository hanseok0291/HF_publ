import { useRef, useState } from "react";

import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleBuyMain from "../../../styles/coupon_pub/BuyMain.module.css";
import styleHundredDeal from "../../../styles/coupon_pub/HundredDeal.module.css";
import BuyTab from "../mypage/BuyTab";

export default function List() {
  return (
    <div className={`${styleBuyMain.styleBuyMainWrap} ${styleHundredDeal.entryList}`}>
      <BuyTab tabItem={["전체", "당첨", "미당첨"]} />
      <div className={`${styleBuyMain.listWrap}`}>
        <div className={`${styleCommon.container} ${styleBuyMain.container} ${styleHundredDeal.container}`}>
          <dl className={`${styleBuyMain.date} ${styleHundredDeal.date}`}>
            <dt>응모일</dt>
            <dd>2023. 3. 15</dd>
          </dl>
          <div className={`${styleHundredDeal.listBox} ${styleHundredDeal.shadow}`}>
            <div className={styleHundredDeal.imgBox}>
              <img
                src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                alt="핫딜 TEST"
              ></img>
            </div>
            <div className={styleHundredDeal.infoBox}>
              <p className={styleHundredDeal.infoBrand}>스타벅스 시원하게 함께 세트 </p>
              <a href="#" className={styleHundredDeal.locate}>추첨 결과 확인</a>
            </div>
          </div>
          <div className={`${styleHundredDeal.listBox} ${styleHundredDeal.shadow}`}>
            <div className={styleHundredDeal.imgBox}>
              <img
                src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                alt="핫딜 TEST"
              ></img>
            </div>
            <div className={styleHundredDeal.infoBox}>
              <p className={styleHundredDeal.infoBrand}>스타벅스 시원하게 함께 세트 </p>
              <a href="#" className={styleHundredDeal.locate}>추첨 결과 확인</a>
            </div>
          </div>
          <div className={`${styleHundredDeal.listBox} ${styleHundredDeal.shadow}`}>
            <div className={styleHundredDeal.imgBox}>
              <img
                src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                alt="핫딜 TEST"
              ></img>
            </div>
            <div className={styleHundredDeal.infoBox}>
              <p className={styleHundredDeal.infoBrand}>스타벅스 시원하게 함께 세트 </p>
              <a href="#" className={styleHundredDeal.locate}>추첨 결과 확인</a>
            </div>
          </div>
        </div>

        <div className={`${styleCommon.container} ${styleBuyMain.container} ${styleHundredDeal.container}`}>
          <dl className={`${styleBuyMain.date} ${styleHundredDeal.date}`}>
            <dt>응모일</dt>
            <dd>2023. 3. 12</dd>
          </dl>
          <div className={`${styleHundredDeal.listBox}`}>
            <div className={styleHundredDeal.imgBox}>
              <img
                src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                alt="핫딜 TEST"
              ></img>
            </div>
            <div className={styleHundredDeal.infoBox}>
              <p className={styleHundredDeal.infoBrand}>스타벅스 시원하게 함께 세트 </p>
              <p className={`${styleHundredDeal.infoState} ${styleHundredDeal.win}`}>100원딜 당첨<i>!</i></p>
            </div>
          </div>
          <div className={`${styleHundredDeal.listBox}`}>
            <div className={styleHundredDeal.imgBox}>
              <img
                src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                alt="핫딜 TEST"
              ></img>
            </div>
            <div className={styleHundredDeal.infoBox}>
              <p className={styleHundredDeal.infoBrand}>스타벅스 시원하게 함께 세트</p>
              <p className={`${styleHundredDeal.infoState} ${styleHundredDeal.lose}`}>슬프지만 다음을...</p>
            </div>
          </div>
        </div>

        <div className={`${styleCommon.container} ${styleBuyMain.container} ${styleHundredDeal.container}`}>
          <dl className={`${styleBuyMain.date} ${styleHundredDeal.date}`}>
            <dt>응모일</dt>
            <dd>2023. 3. 15</dd>
          </dl>
          <div className={`${styleHundredDeal.listBox}`}>
            <div className={styleHundredDeal.imgBox}>
              <img
                src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                alt="핫딜 TEST"
              ></img>
            </div>
            <div className={styleHundredDeal.infoBox}>
              <p className={styleHundredDeal.infoBrand}>스타벅스 시원하게 함께 세트 </p>
              <p className={`${styleHundredDeal.infoState} ${styleHundredDeal.subText}`}>내일 10시 당첨자 발표</p>
              <div className={`${styleHundredDeal.locate} ${styleHundredDeal.ing}`}>
                추첨 진행 중
                <div className={styleHundredDeal.ingIcon}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
          <div className={`${styleHundredDeal.listBox}`}>
            <div className={styleHundredDeal.imgBox}>
              <img
                src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                alt="핫딜 TEST"
              ></img>
            </div>
            <div className={styleHundredDeal.infoBox}>
              <p className={styleHundredDeal.infoBrand}>스타벅스 시원하게 함께 세트</p>
              <p className={`${styleHundredDeal.infoState} ${styleHundredDeal.subText}`}>내일 10시 당첨자 발표</p>
              <div className={`${styleHundredDeal.locate} ${styleHundredDeal.ing}`}>
                추첨 진행 중
                <div className={styleHundredDeal.ingIcon}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`${styleCommon.container} ${styleBuyMain.container} ${styleHundredDeal.container}`}>
          <dl className={`${styleBuyMain.date} ${styleHundredDeal.date}`}>
            <dt>응모일</dt>
            <dd>2023. 3. 15</dd>
          </dl>
          <div className={`${styleHundredDeal.listBox}`}>
            <div className={styleHundredDeal.imgBox}>
              <img
                src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                alt="핫딜 TEST"
              ></img>
            </div>
            <div className={styleHundredDeal.infoBox}>
              <p className={styleHundredDeal.infoBrand}>스타벅스 시원하게 함께 세트 </p>
              <p className={`${styleHundredDeal.infoState} ${styleHundredDeal.subText}`}>6회 응모 완료</p>
              <a className={`${styleHundredDeal.locate} ${styleHundredDeal.add}`}>추가 응모하기</a>
            </div>
          </div>
          <div className={`${styleHundredDeal.listBox}`}>
            <div className={styleHundredDeal.imgBox}>
              <img
                src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                alt="핫딜 TEST"
              ></img>
            </div>
            <div className={styleHundredDeal.infoBox}>
              <p className={styleHundredDeal.infoBrand}>스타벅스 시원하게 함께 세트</p>
              <p className={`${styleHundredDeal.infoState} ${styleHundredDeal.subText}`}>99회 응모 완료</p>
              <a className={`${styleHundredDeal.locate} ${styleHundredDeal.add}`}>추가 응모하기</a>
            </div>
          </div>
        </div>
      </div>
      {/* 응모 내역 없을시 */}
      <div className={styleHundredDeal.noList}>
        <p>응모한 내역이 없어요.</p>
        <button type="button">지금 응모하기</button>
      </div>
    </div>
  );
}
