import React from "react";
import Container from "../../components/retto_pub/common/Container";

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleMyretto from "../../styles/retto_pub/Myretto.module.css";

// component
import Header from "../../components/retto_pub/common/Header";
import ListProgress from "../../components/retto_pub/ListProgress";
import ListWin from "../../components/retto_pub/ListWin";
import ListFail from "../../components/retto_pub/ListFail";
import BottomSheetMoneyGive from "../../components/retto_pub/common/modal/BottomSheetMoneyGive";
import LayerWinInfo from "../../components/retto_pub/LayerWinInfo";

const index = () => {
  return (
    <>
      <Header title="내 리또 리스트" sideBtn="당첨 안내" />
      <ul className={styleMyretto.tabWrap}>
        <li className={styleMyretto.active}>추첨예정</li>
        <li>당첨</li>
        <li>미당첨</li>
      </ul>
      <Container padding="0" isTab>
        {/* <ListProgress /> */}
        <ListWin />
        {/* <ListFail /> */}
      </Container>
      {/* 포인트 당첨, 대기 바텀 시트 */}
      {/* <BottomSheetMoneyGive /> */}
      {/* 당첨 안내 */}
      {/* <LayerWinInfo/>  */}
    </>
  );
};

export default index;
