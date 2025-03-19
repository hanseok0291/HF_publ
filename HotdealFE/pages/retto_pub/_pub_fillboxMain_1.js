import React from "react";
import Container from "../../components/retto_pub/common/Container";

// component
import Header from "../../components/retto_pub/common/Header";
import FillBoxMain from "@/components/retto_pub/FillBoxMain";
import FillBoxPrev from "@/components/retto_pub/FillBoxPrev";

const index = () => {
  return (
    <>
      <Header title="발소 리워드 로또 머니함" sideBtn=""/>
      <Container padding="0" backgroundColor="#fff">
        {/* <FillBoxMain /> */}
        <FillBoxPrev />
      </Container>
    </>
  );
};

export default index;
