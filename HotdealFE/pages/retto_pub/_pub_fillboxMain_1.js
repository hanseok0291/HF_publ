import React from "react";
import Container from "../../components/retto_pub/common/Container";

// component
import Header from "../../components/retto_pub/common/Header";
import HomeTab from "../../components/retto_pub/HomeTab";
import FillBoxMain from "@/components/retto_pub/FillBoxMain";
import FillBoxPrev from "@/components/retto_pub/FillBoxPrev";

const index = () => {
  return (
    <>
      <Header />
      <HomeTab activeTab={3} />
      <Container isTab padding="0" backgroundColor="#fff">
        {/* <FillBoxMain /> */}
        <FillBoxPrev />
      </Container>
    </>
  );
};

export default index;
