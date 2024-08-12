//react
import { useState, useEffect } from "react";

//css
import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";

//css
// //components
import Layout from "../../../components/common/Layout";
import Header from "../../../components/coupon_pub/common/Header";
import FirstCouponSelect from "../../../components/coupon_pub/mypage/FirstCouponSelect";
import FirstCouponRadio from "../../../components/coupon_pub/mypage/FirstCouponRadio";
import {
  ModalSelectCoupon,
  ModalSelectCouponDetail,
} from "../../../components/coupon_pub/common/Modal/ModalSelectCoupon";

const Index = () => {
  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(true);
  const [isShowSearchBtn, setShowSearchBtn] = useState(false);
  const [isShowMypageBtn, setShowMypageBtn] = useState(false);
  const [isFixedTop, setFixedTop] = useState(false);
  const [isFixedBottom, setFixedBottom] = useState(true);

  const [modalShow_1, setModalShow_1] = useState(false);
  const [modalShow_2, setModalShow_2] = useState(false);
  const [selectBrand, setSelectBrand] = useState();
  const [floatShow, setFloatShow] = useState(false);

  const radioEx = [
    {
      id: 1,
      type: selectBrand,
      discount: "1천원 할인",
      date: `2022. 8. 18`,
      checked: false,
      firstUse: false,
    },
    {
      id: 2,
      type: selectBrand,
      discount: "3천원 할인",
      date: `2022. 8. 19`,
      checked: false,
      firstUse: false,
    },
    {
      id: 3,
      type: selectBrand,
      discount: "1천원 할인",
      date: `2022. 8. 28`,
      checked: false,
      firstUse: false,
    },
  ];

  const [radioArr, setRadioArr] = useState(radioEx);

  useEffect(() => {
    setRadioArr(
      radioArr.map((item) => {
        return { ...item, type: selectBrand };
      })
    );
  }, [selectBrand]);

  return (
    <>
      <Layout>
        <Header
          pageTitle="우선 사용 쿠폰 선택"
          isShowBackBtn={isShowBackBtn}
          isShowSearchBtn={isShowSearchBtn}
          isShowMypageBtn={isShowMypageBtn}
          subHeader={true}
        />
        <div
          className={`${styleDefaultLayout.defaultContent} ${styleDefaultLayout.wrap}`}
        >
          <FirstCouponSelect
            selectBrand={selectBrand}
            setModalShow_1={() => setModalShow_1(!modalShow_1)}
          />
          {selectBrand && (
            <FirstCouponRadio
              radioArr={radioArr}
              setRadioArr={(e) => setRadioArr(e)}
              setModalShow_2={() => setModalShow_2(!modalShow_2)}
              floatShow={floatShow}
              setFloatShow={(e) => setFloatShow(e)}
            />
          )}
        </div>
      </Layout>
      {modalShow_1 && (
        <ModalSelectCoupon
          setModalShow_1={() => setModalShow_1(!modalShow_1)}
          selectBrand={selectBrand}
          setSelectBrand={(e) => setSelectBrand(e)}
          setRadioArr={() => setRadioArr()}
          radioArr={radioArr}
        />
      )}
      {modalShow_2 && (
        <ModalSelectCouponDetail
          setModalShow_2={() => setModalShow_2(!modalShow_2)}
        />
      )}
    </>
  );
};

export default Index;
