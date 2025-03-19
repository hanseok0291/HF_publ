import React, { useState } from "react";
import Container from "../../components/retto_pub/common/Container";

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleApply from "../../styles/retto_pub/Apply.module.css";

// component
import LevelSelection from "../../components/retto_pub/LevelSelection";
import Header from "../../components/retto_pub/common/Header";
import ModalApply from "../../components/retto_pub/common/modal/ModalApply";
import BottomSheetAccount from "../../components/retto_pub/common/modal/BottomSheetAccount";
import ApplyComplete from "../../components/retto_pub/ApplyComplete";
import ModalApplyAccount from "../../components/retto_pub/common/modal/ModalApplyAccount";

const index = () => {
  const [jewel, setJewel] = useState(); // 보석 상태
  const [isModal, setIsModal] = useState(false);

  const handleModalToggle = () => {
    setIsModal(!isModal);
  };

  return (
    <>
      <Header title="발소 리워드 로또 신청" />
      <Container>
        <span className={styleApply.visualImg1}></span>
        <span className={styleApply.visualImg2}></span>
        <div className={styleCommon.titleWrap}>
          <h2>
            머니만 채워도 알아서 쌓여요 <br />
            <b>
              매주 최대{" "}
              <em className={styleCommon.highlightBg}>4백만원 당첨금!</em>
            </b>
          </h2>
        </div>
        <div className={`${styleCommon.borderBox} ${styleApply.borderBox}`}>
          <LevelSelection
            change={false}
              buttonText="이렇게 할게요"
            jewel={jewel}
            setJewel={setJewel}
            handleModalToggle={handleModalToggle}
            full={false}
          />
        </div>
        {isModal && (
          <ModalApply jewel={jewel} handleModalToggle={handleModalToggle} />
        )}
        {/* <ApplyComplete jewel={jewel}/> */}
        {/* <BottomSheetAccount /> */}
        {/* 계좌 없음 */}
        <ModalApplyAccount />
      </Container>
    </>
  );
};

export default index;
