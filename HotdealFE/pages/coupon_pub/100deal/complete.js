//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//css
import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleHundredDeal from "../../../styles/coupon_pub/HundredDeal.module.css";

// //components
import Layout from "../../../components/common/Layout";
import Header from "../../../components/coupon_pub/common/Header";
import InterestList from "../../../components/coupon_pub/100deal/InterestList";
import ModalHundredGiftEntry from "../../../components/coupon_pub/common/Modal/ModalHundredGiftEntry";

const Index = () => {
  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(false);
  const [isShowSearchBtn, setShowSearchBtn] = useState(false);
  const [isShowMypageBtn, setShowMypageBtn] = useState(false);
  const [isShowCloseBtn, setShowCloseBtn] = useState(true);

  const [complete, setComplete] = useState(false);

  return (
    <>
      <Layout>
        <Header
          pageTitle=""
          isShowBackBtn={isShowBackBtn}
          isShowSearchBtn={isShowSearchBtn}
          isShowMypageBtn={isShowMypageBtn}
          isShowCloseBtn={isShowCloseBtn}
        />
        <div
          className={`${styleDefaultLayout.defaultContent} ${styleDefaultLayout.wrap} ${styleHundredDeal.complete}`}
        >
          {complete ?
            <div className={`${styleHundredDeal.topContent} ${styleHundredDeal.success}`}>
              <div className={`${styleHundredDeal.imgWrap}`}>
                <img src="../../../images/100deal/img-complete.png" alt="상품" />
              </div>
              <h4>100원딜 응모 완료</h4>
              {/* <p>00일 오전 10시 당첨자를 발표해요<i>!</i></p> */}
              <p>당첨되지 않아도 <br /><b>첫 응모 기념 최대 1만P </b>드려요<i>!</i></p>
              <button type="button">미션하고 응모권 받기</button>
            </div>
          : <div className={`${styleHundredDeal.topContent} ${styleHundredDeal.fail}`}>
              <div className={`${styleHundredDeal.imgWrap}`}>
                <img src="../../../images/100deal/img-complete.png" alt="상품" />
              </div>
              <h4>100원딜 응모 실패</h4>
              <p>지금은 계좌에서 출금할 수 없어요. <br />
              잠시 후 다시 시도해주세요.</p>
              <button type="button">다시 시도하기</button>
            </div>
          }
        </div>
        <InterestList />
        {/* 선물 가능 응모권 도착 팝업 */}
        {/* <ModalHundredGiftEntry /> */}
      </Layout>
    </>
  );
};

export default Index;
