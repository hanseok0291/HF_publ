import React from "react";

// component
import FillBox from "../../components/retto_pub/FillBox";
import ApplyComplete from "../../components/retto_pub/ApplyComplete";
import ModalFillBox from "../../components/retto_pub/common/modal/ModalFillBox";
import LayerEmptyFail from "../../components/retto_pub/LayerEmptyFail";


const index = () => {
  return (
    <>
      <FillBox />
      {/* <LayerEmptyFail /> */}
      <ModalFillBox />
    </>
  );
};

export default index;
