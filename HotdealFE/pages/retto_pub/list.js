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
import ListProgress from "../../components/retto_pub/ListProgress";

const index = () => {
  return (
    <>
      <Header title="리또 보유 리스트"/>
      <ul className={styleMyretto.tabWrap}>
        <li className={styleMyretto.active}>진행중</li>
        <li>당첨</li>
        <li>미당첨</li>
      </ul>
      <Container>
        <ListProgress />
      </Container>
    </>
  );
};

export default index;
