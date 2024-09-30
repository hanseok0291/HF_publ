import React from "react";
import Container from "../../components/retto_pub/common/Container";

// component
import Header from "../../components/retto_pub/common/Header";
import HomeTab from "../../components/retto_pub/HomeTab";
import FillBoxMain from "@/components/retto_pub/FillBoxMain";
import FillBoxPrev from "@/components/retto_pub/FillBoxPrev";
import BottomSheetPresent from "@/components/retto_pub/common/modal/BottomSheetPresent";

const stampInfo = {
  mcWeekId: "MC20240722",
  mcEventSetPrice: 100000,
  weekOrder: 17,
  lottoCnt: 4,
  succYn: "Y",
  succYnDt: "20240726230000",
  succDayCnt: 5,
  insufficientMoney: 100000,
  stampImgPath: null,
  rewardPsblYn: "N",
  rewardYn: "N",
  rewardProductImgPath: null,
  rewardBrandNm: null,
  rewardProductNm: null,
  failType: "MOCH",
};

const index = () => {
  return (
    <>
      <Header />
      <HomeTab activeTab={3} />
      <Container isTab padding="0" backgroundColor="#fff">
        <FillBoxMain stampInfo={stampInfo} rettoCase={2} money={false} />
        {/* <FillBoxPrev /> */}
      </Container>
      {/* <BottomSheetPresent /> */}
    </>
  );
};

export default index;
