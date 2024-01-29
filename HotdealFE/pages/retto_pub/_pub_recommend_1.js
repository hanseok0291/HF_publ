import React from "react";
import Container from "../../components/retto_pub/common/Container";

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleMyretto from "../../styles/retto_pub/Myretto.module.css";

// component
import Header from "../../components/retto_pub/common/Header";
import MyPage from "../../components/retto_pub/MyPage";
import Apply from "../../components/retto_pub/Apply";
import BottomSheetPrize from "../../components/retto_pub/common/modal/BottomSheetPrize";
import LayerLevelSelection from "../../components/retto_pub/LayerLevelSelection";
import BottomSheetAlarm from "../../components/retto_pub/common/modal/BottomSheetAlarm";
import ModalLevelChange from "../../components/retto_pub/common/modal/ModalLevelChange";
import BottomSheetBanner from "../../components/retto_pub/common/modal/BottomSheetBanner";
import Stamp from "../../components/retto_pub/Stamp";
import BottomSheetSaveingList from "../../components/retto_pub/common/modal/BottomSheetSaveingList";
import BottomSheetPresent from "../../components/retto_pub/common/modal/BottomSheetPresent";
import BottomSheetMission from "../../components/retto_pub/common/modal/BottomSheetMission";
import Result from "../../components/retto_pub/Result";
import BottomSheetMissionFail from "../../components/retto_pub/common/modal/BottomSheetMissionFail";
import LayerTutorial from "../../components/retto_pub/LayerTutorial";
import ModalmembershipOut1 from "../../components/retto_pub/common/modal/ModalmembershipOut1";
import ModalmembershipOut2 from "../../components/retto_pub/common/modal/ModalmembershipOut2";
import LayerRecommend from "../../components/retto_pub/LayerRecommend";
import ModalRecommendEnd from "../../components/retto_pub/common/modal/ModalRecommendEnd";
import Toast from "../../components/retto_pub/common/Toast";

const index = () => {
  return (
    <>
      {/* 추천 코드 입력하기 */}
      <LayerRecommend />
      {/* 추천 코드 입력 마감 */}
      {/* <ModalRecommendEnd /> */}
      {/* 추천 코드 입력 완료 토스트 */}
      <Toast width={250}>카드 발급 선물 신청이 완료되었어요!</Toast>
    </>
  );
};

export default index;
