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
import ModalmembershipOut1 from "../../components/retto_pub/common/modal/ModalmembershipOut1";
import ModalmembershipOut2 from "../../components/retto_pub/common/modal/ModalmembershipOut2";
import LayerRecommend from "../../components/retto_pub/LayerRecommend";
import ModalRecommendEnd from "../../components/retto_pub/common/modal/ModalRecommendEnd";
import Toast from "../../components/retto_pub/common/Toast";
import MyPageNotJoin from "../../components/retto_pub/MyPageNotJoin";
import Home from "../../components/retto_pub/Home";
import DrawInfo from "../../components/retto_pub/DrawInfo";
import ModalLevelChangeBan from "../../components/retto_pub/common/modal/ModalLevelChangeBan";
import ModalApplyReady from "../../components/retto_pub/common/modal/ModalApplyReady";
import LayerTutorialMypage from "../../components/retto_pub/LayerTutorialMypage";
import LayerTutorialStamp from "../../components/retto_pub/LayerTutorialStamp";
import ModalMoneyGive from "../../components/retto_pub/common/modal/ModalMoneyGive";
import LayerWinInfo from "../../components/retto_pub/LayerWinInfo";
import Navigation from "../../components/coupon_pub/main/Navigation";

const index = () => {
  return (
    <>
      <Header />
      <ul className={styleMyretto.tabWrap}>
        <li className={styleMyretto.active}>HOME</li>
        <li>추첨 정보</li>
        <li>나의 리또</li>
        <li>리또 랭킹</li>
      </ul>
      <Container isTab padding="0" backgroundColor="#fff">
        {/* HOME */}
        <Home case2 /> 
      </Container>
      {/* 리또 신청 */}
      {/* <Apply full case1 /> */}
      {/* 신청 불가 */}
      {/* <ModalApplyReady /> */}
      {/* 당첨 */}
      {/* <BottomSheetPrize /> */}
      {/* 미참여자 */}
      {/* <BottomSheetBanner /> */}
      {/* 기기알림 */}
      {/* <BottomSheetAlarm /> */}
      {/* 레벨 변경 */}
      {/* rettoLevel 루비 48, 에메랄드 70, 다이아 92 */}
      {/* <LayerLevelSelection full rettoLevel={92} case4 /> */}
      {/* 레벨 변경 확인 */}
      {/* case1 case2 case3 case4*/}
      {/* <ModalLevelChange case1 /> */}
      {/* 레벨 변경 불가 */}
      {/* <ModalLevelChangeBan /> */}
      {/* 스탬프 주차 확인 바텀 시트 */}
      {/* <BottomSheetSaveingList /> */}
      {/* 스탬프 10주차 유지 성공 바텀 시트 */}
      {/* <BottomSheetPresent /> */}
      {/* 보너스 미션 바텀 시트 */}
      {/* <BottomSheetMission /> */}
      {/* 추천 코드 입력하기 */}
      {/* <LayerRecommend /> */}
      {/* 추천 코드 입력 마감 */}
      {/* <ModalRecommendEnd /> */}
      {/* <LayerTutorialStamp /> */}
      {/* 추천 코드 입력 완료 토스트 */}
      {/* <Toast width={250}>카드 발급 선물 신청이 완료되었어요!</Toast> */}
      {/* <ModalMoneyGive /> */}
      {/* <LayerWinInfo /> */}
    </>
  );
};

export default index;
