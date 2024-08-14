import React from "react";
import Container from "../../components/retto_pub/common/Container";

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleMyretto from "../../styles/retto_pub/Myretto.module.css";

// component
import Header from "../../components/retto_pub/common/Header";

import BottomSheetPrize from "../../components/retto_pub/common/modal/BottomSheetPrize";

import Home from "../../components/retto_pub/Home";

import HomeTab from "../../components/retto_pub/HomeTab";

const index = () => {
  return (
    <>
      <Header />
      <HomeTab activeTab={1} />
      <Container isTab padding="0" backgroundColor="#fff">
        {/* HOME */}
        <Home case1 case2 /> 
        {/* 추첨 정보 case1 리또 없음 case2 당첨 case3 미당첨 case4 추첨예정 case5 이번,다음 회차 case6 미신청자 case7 당첨금 배너 */}
        {/* <DrawInfo case4 /> */}
        {/* 나의 리또 case1 미신청자 case2 스탬프 10주까지만 */}
        {/* <Stamp /> */}
      </Container>
      {/* 리또 신청 */}
      {/* <Apply full case1 /> */}
      {/* 신청 불가 */}
      {/* <ModalApplyReady /> */}
      {/* 당첨 */}
      <BottomSheetPrize />
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
    </>
  );
};

export default index;
