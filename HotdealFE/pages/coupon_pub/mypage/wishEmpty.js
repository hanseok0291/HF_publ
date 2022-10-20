//react
import { useRouter } from "next/router";
import { useRef, useState } from "react";

//components
import Layout from "../../../components/common/Layout";
import Header from "../../../components/coupon_pub/common/Header";
import MayCoupon from "../../../components/coupon_pub/search/MayCoupon";
import CouponListEmpty from "../../../components/coupon_pub/list/CouponListEmpty";

const Index = () => {
  const router = useRouter();
  const wrapRef = useRef();

  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(true);
  const [isShowSearchBtn, setShowSearchBtn] = useState(false);
  const [isShowMypageBtn, setShowMypageBtn] = useState(false);
  const [isFixedTop, setFixedTop] = useState(false);
  const [isFixedBottom, setFixedBottom] = useState(true);

  // useEffect(() => {
  // 	if (termsYn === "N") {
  // 		//기프티몰 이용을 위해 동의 팝업
  // 	}
  // }, [termsYn]);

  return (
    <>
      <Layout>
        <Header
          pageTitle="찜한 상품"
          isShowBackBtn={isShowBackBtn}
          isShowSearchBtn={isShowSearchBtn}
          isShowMypageBtn={isShowMypageBtn}
        />
        <div style={{ paddingTop: "58px" }}>
          <div style={{ marginBottom: "20px" }}>
            {/* 카테고리 상품리스트 */}
            <CouponListEmpty
              pageType="result"
              innerText="찜한 상품이 없어요."
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            {/* 이런 상품은 어떠세요? */}
            <MayCoupon />
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Index;
