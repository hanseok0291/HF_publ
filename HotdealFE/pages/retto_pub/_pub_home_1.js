import React from "react";
import Container from "../../components/retto_pub/common/Container";

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleMyretto from "../../styles/retto_pub/Myretto.module.css";

// component
import Header from "../../components/retto_pub/common/Header";
import Apply from "../../components/retto_pub/Apply";
import BottomSheetPrize from "../../components/retto_pub/common/modal/BottomSheetPrize";
import LayerLevelSelection from "../../components/retto_pub/LayerLevelSelection";
import BottomSheetAlarm from "../../components/retto_pub/common/modal/BottomSheetAlarm";
import ModalLevelChange from "../../components/retto_pub/common/modal/ModalLevelChange";
import BottomSheetBanner from "../../components/retto_pub/common/modal/BottomSheetBanner";
import BottomSheetSaveingList from "../../components/retto_pub/common/modal/BottomSheetSaveingList";
import BottomSheetPresent from "../../components/retto_pub/common/modal/BottomSheetPresent";
import BottomSheetMission from "../../components/retto_pub/common/modal/BottomSheetMission";
import Result from "../../components/retto_pub/Result";
import BottomSheetMissionFail from "../../components/retto_pub/common/modal/BottomSheetMissionFail";
import ModalmembershipOut1 from "../../components/retto_pub/common/modal/ModalmembershipOut1";
import ModalmembershipOut2 from "../../components/retto_pub/common/modal/ModalmembershipOut2";
import LayerRecommend from "../../components/retto_pub/LayerRecommend";
import ModalRecommendEnd from "../../components/retto_pub/common/modal/ModalRecommendEnd";
import Toast from "../../components/retto_pub/common/Toast";
import Home from "../../components/retto_pub/Home";
import DrawInfo from "../../components/retto_pub/DrawInfo";
import ModalLevelChangeBan from "../../components/retto_pub/common/modal/ModalLevelChangeBan";
import ModalApplyReady from "../../components/retto_pub/common/modal/ModalApplyReady";
import LayerTutorialStamp from "../../components/retto_pub/LayerTutorialStamp";
import ModalMoneyGive from "../../components/retto_pub/common/modal/ModalMoneyGive";
import HomeTab from "../../components/retto_pub/HomeTab";

const index = () => {
  return (
    <>
      <Header />
      <HomeTab activeTab={1} />
      <Container isTab padding="0" backgroundColor="#fff">
        {/* HOME */}
        <Home case1 case3 /> 
      </Container>
    </>
  );
};

export default index;
