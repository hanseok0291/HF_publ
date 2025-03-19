import React, { useState } from "react";
// import FadeIn from 'react-fade-in';

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleApply from "../../styles/retto_pub/Apply.module.css";

// component
import Container from "../../components/retto_pub/common/Container";
import LevelSelection from "../../components/retto_pub/LevelSelection";
import Header from "../../components/retto_pub/common/Header";
import ModalApply from "../../components/retto_pub/common/modal/ModalApply";
import BottomSheetAccount from "../../components/retto_pub/common/modal/BottomSheetAccount";
import ApplyComplete from "../../components/retto_pub/ApplyComplete";
import ModalApplyAccount from "../../components/retto_pub/common/modal/ModalApplyAccount";
import ModalApplyReady from "./common/modal/ModalApplyReady";
import LayerApplyFail from "./LayerApplyFail";
import FadeInSection from "./common/FadeInSection";

const Apply = ({full, rettoLevel = 26, case1, case2, case3, case4, case5}) => {
  const [jewel, setJewel] = useState(); // 보석 상태
  const [isModal, setIsModal] = useState(false);

  const handleModalToggle = () => {
    setIsModal(!isModal);
  };

  return (
    <div className={styleCommon.layer}>
      <Header title="발소 리워드 로또 신청" />
      <Container className={styleCommon.layerContainer}>
        <span className={styleApply.visualImg1}></span>
        <span className={styleApply.visualImg2}></span>
        <FadeInSection> 
          <div className={styleCommon.titleWrap}>
            <h2>
              머니만 채워도 알아서 쌓여요 <br />
              <b>
                매주 최대{" "}
                <em className={styleCommon.highlightBg}>4백만원 당첨금!</em>
              </b>
            </h2>
          </div>
        </FadeInSection>
        <FadeInSection delay={250}>
          <div className={`${styleCommon.borderBox} ${styleApply.borderBox}`}>
            <LevelSelection
              change={false} 
              buttonText="이렇게 할게요"
              jewel={jewel}
              setJewel={setJewel}
              handleModalToggle={handleModalToggle}
              rettoLevel={rettoLevel}
              full={full} 
              case1={case1}
              case2={case2}
              case3={case3}
              case4={case4}
              case5={case5}
            />
          </div>
        </FadeInSection>
        {isModal && (
          <ModalApply jewel={jewel} handleModalToggle={handleModalToggle} />
        )}
        {/* 신청 완료 */}
        {/* <ApplyComplete jewel={jewel}/> */}
        {/* 리또란? */}
        {/* 계좌 변경 등록 */}
        {/* <BottomSheetAccount />  */}
        {/* 계좌 없음 */}
        {/* <ModalApplyAccount /> */}
        {/* 신청 불가 */}
        {/* <ModalApplyReady /> */}
        {/* 신청 실패 */}
        {/* <LayerApplyFail />  */}
        {/* 레벨 변경 실패 */}
        {/* <LayerApplyFail type="change" case1 />  */}
      </Container>
  </div>
  )
}

export default Apply
