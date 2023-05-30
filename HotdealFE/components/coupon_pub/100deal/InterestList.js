import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import SwiperItem from "../main/SwiperItem";
import InteresItem from "./InteresItem";

const InterestList = (props) => {
  return (
    <>
      <InteresItem
        title={props.pageTitle}
        labelShow="true"
      />
      <div
        style={{
          width: "100%", 
          height: "15px",
          background: "#f1f1f1",
        }}
      ></div>
    </>
  );
};

export default InterestList;
