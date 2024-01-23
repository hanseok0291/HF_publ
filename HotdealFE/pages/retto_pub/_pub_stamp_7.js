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

const index = () => {
  return (
    <>
      <Header />
      <ul className={styleMyretto.tabWrap}>
        <li>HOME</li>
        <li>추첨 정보</li>
        <li className={styleMyretto.active}>나의 리또</li>
      </ul>
      <Container isTab padding="0" backgroundColor="#fff">
        {/* HOME */}
        {/* <Home /> */}
        {/* 추첨 정보 case1 리또 없음 case2 당첨 case3 미당첨 case4 추첨예정 case5 이번,다음 회차 case6 미신청자 case7 당첨금 배너 */}
        {/* <DrawInfo case2 case4 case6/> */}
        {/* 나의 리또 case1 미신청자 case2 스탬프 10주까지만 */}
        <Stamp />
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
      {/* <BottomSheetPresent case1 /> */}
      {/* 보너스 미션 바텀 시트 */}
      {/* <BottomSheetMission /> */}
      {/* 추천 코드 입력하기 */}
      {/* <LayerRecommend /> */}
      {/* 추천 코드 입력 마감 */}
      {/* <ModalRecommendEnd /> */}
      {/* 추천 코드 입력 완료 토스트 */}
      {/* <Toast width={250}>카드 발급 선물 신청이 완료되었어요!</Toast> */}
    </>
  );
};

export default index;
