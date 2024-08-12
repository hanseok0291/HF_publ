//react
import { useState } from "react";

//css
import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import savePromotion from "../../../styles/coupon_pub/savePromotion.module.css";

//css
// //components
import Layout from "../../../components/common/Layout";
import Header from "../../../components/coupon_pub/common/Header";

import SavePromotion from "../../../components/coupon_pub/promotion/SavePromotion";
import PromotionList from "../../../components/coupon_pub/list/PromotionList";
import ModalPromotion from "../../../components/coupon_pub/common/modal/ModalPromotion";

const Index = () => {
  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(true);
  const [isShowSearchBtn, setShowSearchBtn] = useState(false);
  const [isShowMypageBtn, setShowMypageBtn] = useState(false);
  const [isFixedTop, setFixedTop] = useState(false);
  const [isFixedBottom, setFixedBottom] = useState(true);

  return (
    <>
      <Layout>
        <Header
          pageTitle="특별한 혜택 놓치지 마세요"
          isShowBackBtn={isShowBackBtn}
          isShowSearchBtn={isShowSearchBtn}
          isShowMypageBtn={isShowMypageBtn}
					subHeader={true}
        />
        <div
          className={`${styleDefaultLayout.defaultContent} ${styleDefaultLayout.wrap}`}
        >
          <SavePromotion />
          <PromotionList />
        </div>
        <button className={savePromotion.floatBtn}>
          <span>포인트 받기</span>
        </button>
      </Layout>
      <ModalPromotion />
    </>
  );
};

export default Index;
