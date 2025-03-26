import React, { useState } from "react";
import Container from "../../components/retto_pub/common/Container";

// component
import Header from "../../components/retto_pub/common/Header";
import DrawInfo from "../../components/retto_pub/DrawInfo";
import HomeTab from "../../components/retto_pub/HomeTab";

const index = () => {

  return (
    <>
      <Header title="추첨 정보" sideBtn="당첨 안내"/>
      <Container padding="0" backgroundColor="#fff">
        {/* 추첨 정보 case1 리또 없음 case2 당첨 case3 미당첨 case4 추첨예정 case5 이번,다음 회차 case6 미신청자 case7 당첨금 배너 */}
        <DrawInfo case2 />
      </Container>
    </>
  );
};

export default index;
