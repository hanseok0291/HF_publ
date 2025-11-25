"use client";

import { useEffect, useState } from "react";

// import { isSupported, subscribe } from "on-screen-keyboard-detector";

// type OnScreenKeyboardDetector = {
//   isSupported: () => boolean;
//   subscribe: (callback: (visibility: 'hidden' | 'visible') => void) => () => void;
// };

// const screenKeyboardDetector = dynamic(
//   () =>
//     import("on-screen-keyboard-detector").then(
//       ({ isSupported, subscribe }) => ({ isSupported, subscribe })
//     ) as any,
//   { ssr: false }
// );
const useKeyboardDetect = () => {
  const [keyboardIsActive, setKeyboardIsActive] = useState<boolean>(false);
  const [windowIsReady, setWindowIsReady] = useState<boolean>(false);

  // if (isSupported()) {
  //   const unsubscribe = subscribe((visibility) => {
  //     // Keyboard is hide.
  //     if (visibility === "hidden") {
  //       alert("키보드 안보영");
  //       setKeyboardIsActive(false);
  //     } else {
  //       // Keyboard is visible.
  //       alert("키보드 보영");
  //       setKeyboardIsActive(true);
  //     }
  //   });

  //   // After calling unsubscribe() the callback will no longer be invoked.
  //   // unsubscribe();
  // }

  //   useEffect(() => {
  //     if (window) {
  //   alert(JSON.stringify(screenKeyboardDetector));

  // }
  //   }, [window])

  // useEffect(() => {
  //   alert(JSON.stringify(screenKeyboardDetector));
  // }, [screenKeyboardDetector]);

  useEffect(() => {
    // const keyboardDidShowListener = Keyboard.addListener(
    //   'keyboardDidShow',
    //   () => {
    //     setKeyboardVisible(true); // or some other action
    //   }
    // );
    // const keyboardDidHideListener = Keyboard.addListener(
    //   'keyboardDidHide',
    //   () => {
    //     setKeyboardVisible(false); // or some other action
    //   }
    // );
    // return () => {
    //   keyboardDidHideListener.remove();
    //   keyboardDidShowListener.remove();
    // };
    // alert(JSON.stringify(Keyboard  ))
  }, []);
  return {
    keyboardIsActive
  };
};

export default useKeyboardDetect;
