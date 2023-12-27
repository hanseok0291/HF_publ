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

const index = () => {
  return (
    <>
      <Header />
      <ul className={styleMyretto.tabWrap}>
        <li className={styleMyretto.active}>나의 리또 현황</li>
        <li>리또 스탬프</li>
        <li>당첨 결과</li>
      </ul>
      <Container isTab>
        <MyPage case1 />
        {/* <Stamp case1/> */}
        {/* <Result case1/>  */}
      </Container>
      {/* 리또 신청 */}
      {/* <Apply /> */}
      {/* 당첨 */}
      {/* <BottomSheetPrize /> */}
      {/* 미참여자 */}
      {/* <BottomSheetBanner /> */}
      {/* 기기알림 */}
      {/* <BottomSheetAlarm /> */}
      {/* 레벨 변경 */}
      {/* <LayerLevelSelection /> */}
      {/* 레벨 변경 확인 */}
      {/* <ModalLevelChange /> */}
      {/* 스탬프 주차 확인 바텀 시트 */}
      {/* <BottomSheetSaveingList /> */}
      {/* 스탬프 10주차 유지 성공 바텀 시트 */}
      {/* <BottomSheetPresent /> */}
      {/* 보너스 미션 바텀 시트 */}
      {/* <BottomSheetMission /> */}
      {/* 튜토리얼 */}
      {/* <LayerTutorial type="mypage"/> */}
      {/* <LayerTutorial type="stamp"/> */}
    </>
  );
};

export default index;
