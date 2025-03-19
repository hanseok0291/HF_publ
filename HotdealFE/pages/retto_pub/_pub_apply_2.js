import React, { useState } from "react";
import Container from "../../components/retto_pub/common/Container";

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleApply from "../../styles/retto_pub/Apply.module.css";

// component
import LevelSelection from "../../components/retto_pub/LevelSelection";
import Header from "../../components/retto_pub/common/Header";
import ModalApply from "../../components/retto_pub/common/modal/ModalApply";
import BottomSheetAccount from "../../components/retto_pub/common/modal/BottomSheetAccount";
import ApplyComplete from "../../components/retto_pub/ApplyComplete";
import ModalApplyAccount from "../../components/retto_pub/common/modal/ModalApplyAccount";
import Apply from "../../components/retto_pub/Apply";

const index = () => {
  const [jewel, setJewel] = useState(); // 보석 상태
  const [isModal, setIsModal] = useState(false);

  const handleModalToggle = () => {
    setIsModal(!isModal);
  };

  return (
    <>
      <Apply full case1 case4 />
    </>
  );
};

export default index;
