import React from "react";

// component
import FillBox from "../../components/retto_pub/FillBox";
import ApplyComplete from "../../components/retto_pub/ApplyComplete";
import ModalFillBox from "../../components/retto_pub/common/modal/ModalFillBox";
import LayerEmptyFail from "../../components/retto_pub/LayerEmptyFail";
import Toast from "../../components/retto_pub/common/Toast";


const index = () => {
  return (
    <>
      <FillBox case2/>
      {/* <LayerEmptyFail /> */}
      <ModalFillBox />
      <Toast>머니함을 비웠습니다. <br />언제든지 머니 채우기를 다시 시작해 보세요.</Toast>
    </>
  );
};

export default index;
