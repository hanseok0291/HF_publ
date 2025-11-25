"use client";

import { FC, useEffect } from "react";

const TouchOptimizer: FC<{}> = ({}) => {
  function modifyBodyElementClass(event: FocusEvent, type: "add" | "remove") {
    const element = event.target as HTMLElement;
    const bodyElement = document.querySelector("body");
    if (!element || !bodyElement) {
      return;
    }

    if (type === "add") {
      ["INPUT"].includes(element.tagName) &&
        (bodyElement.style.touchAction = "none");
    } else {
      bodyElement.style.touchAction = "auto";
    }
  }

  useEffect(() => {
    document.addEventListener("focusin", (event) => {
      modifyBodyElementClass(event, "add");
    });
    document.addEventListener("focusout", (event) => {
      modifyBodyElementClass(event, "remove");
    });
  }, []);

  return <></>;
};

export default TouchOptimizer;
