import React, { useState, useRef, useEffect } from "react";
import Lottie from "lottie-web";

const LottieComponent = ({
  animationData,
  loop,
  autoplay,
  speed,
  isPaused,
  isStopped,
  delay, // 딜레이 시간을 받는 프롭 추가
  ...restProps
}) => {
  const animationContainer = useRef(null);
  const [animationInstance, setAnimationInstance] = useState(null);

  useEffect(() => {
    const animationOptions = {
      container: animationContainer.current,
      renderer: "svg",
      loop: loop !== undefined ? loop : false,
      autoplay: autoplay !== undefined ? autoplay : true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };

    const animation = Lottie.loadAnimation(animationOptions);
    setAnimationInstance(animation);

    // delay 프롭 값이 있으면 해당 시간만큼 대기 후 애니메이션 재생
    if (delay !== undefined) {
      setTimeout(() => {
        animation.play();
      }, delay);
    }

    return () => {
      animation.destroy();
    };
  }, [animationData, loop, autoplay, delay]);

  useEffect(() => {
    if (animationInstance !== null) {
      if (isPaused) {
        animationInstance.pause();
      } else {
        animationInstance.play();
      }

      if (isStopped) {
        animationInstance.stop();
      }

      if (speed !== undefined) {
        animationInstance.setSpeed(speed);
      }
    }
  }, [isPaused, isStopped, speed, animationInstance]);

  return <div ref={animationContainer} {...restProps} />;
};

export default LottieComponent;