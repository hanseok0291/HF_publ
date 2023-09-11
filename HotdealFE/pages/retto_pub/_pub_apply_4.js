import React, { useState } from "react";
import Container from "../../components/retto_pub/common/Container";

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleApply from "../../styles/retto_pub/Apply.module.css";

// component
import LevelSelection from "../../components/retto_pub/LevelSelection";
import Header from "../../components/retto_pub/common/Header";
import BottomSheetRettoInfo from "../../components/retto_pub/common/modal/BottomSheetRettoInfo";
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
      <Header title="리또 신청"/>
      <Container>
        <span className={styleApply.visualImg1}></span>
        <span className={styleApply.visualImg2}></span>
        <div className={styleCommon.titleWrap}>
          <h2>
            머니만 채워도 알아서 쌓여요 <br />
            <b>
              매주 최대{" "}
              <em className={styleCommon.highlightBg}>1억 행운 리또</em> !
            </b>
          </h2>
        </div>
        <div className={`${styleCommon.borderBox} ${styleApply.borderBox}`}>
          <LevelSelection
            change={false}
            buttonText="이 리또가 좋겠어요"
            jewel={jewel}
            setJewel={setJewel}
            handleModalToggle={handleModalToggle}
            full={false}
          />
          <div className={styleApply.botConWrap}>
            <p className={styleApply.titleText}>리또 1개는 아쉽다면?</p>
            <p className={styleApply.subText}>
              <b>연속으로 리또 받기에 성공해 보세요.</b> <br />
              연속 성공 횟수가 늘어날 때마다 <br />
              매주 쌓이는 리또가 <b>최대 5개까지 UP!</b>
            </p>
          </div>
        </div>
        {isModal && (
          <ModalApply jewel={jewel} handleModalToggle={handleModalToggle} />
        )}
        <ApplyComplete jewel={jewel}/>
        {/* <BottomSheetRettoInfo /> */}
        {/* <BottomSheetAccount /> */}
        {/* 계좌 없음 */}
        {/* <ModalApplyAccount /> */}
      </Container>
    </>
  );
};

export default index;
