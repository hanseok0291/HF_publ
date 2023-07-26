import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import InteresItem from "./InteresItem";

const InterestList = (props) => {
  return (
    <>
      <InteresItem
        title={props.pageTitle}
        labelShow="true"
      />
    </>
  );
};

export default InterestList;
