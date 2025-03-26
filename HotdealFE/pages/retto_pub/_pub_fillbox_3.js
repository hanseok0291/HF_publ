import React, { useEffect, useRef, useState } from "react";
import Container from "../../components/retto_pub/common/Container";

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleReceive from "../../styles/retto_pub/Receive.module.css";

// component
import Header from "../../components/retto_pub/common/Header";
import Button from "../../components/retto_pub/common/Button";
import LayerRettoInfo from "../../components/retto_pub/LayerRettoInfo";
import LayerRettoMoneyGet from "../../components/retto_pub/LayerRettoMoneyGet";
import LayerReceive from "../../components/retto_pub/LayerReceive";
import FillBox_Pub2 from "../../components/retto_pub/FillBox_Pub2";
import LayerEmptyFail from "../../components/retto_pub/LayerEmptyFail";
import ModalFillBox from "../../components/retto_pub/common/modal/ModalFillBox";
import LayerFillFail from "../../components/retto_pub/LayerFillFail";


const index = () => {
  const [isToolTip, setIsToolTip] = useState(false);// 툴팁
  const [toolTipPos, setToolTipPos] = useState(false);

  const toolTipRef = useRef();


  const handleClick = () => {
    console.log(toolTipRef.current.getBoundingClientRect().top, window.innerHeight/ 1.2);
    setIsToolTip(!isToolTip)
    if(!isToolTip) {
      if(toolTipRef.current.getBoundingClientRect().top < window.innerHeight - 230) {
        setToolTipPos(true);
      } else {
        setToolTipPos(false);
      }
    }
  }

  // useEffect(() => {
  //   if (process.browser) {
  //     window.addEventListener("scroll", handleScroll);
  //   }
  // }, [isToolTip]);
  return (
    <>
      <FillBox_Pub2 case2/>
      {/* <ModalFillBox /> */}
      {/* <LayerFillFail /> */}
      {/* <LayerEmptyFail /> */}
    </>
  );
};

export default index;
