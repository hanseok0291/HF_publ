import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// css
import styleRewardBanner from "../../../styles/coupon_pub/RewardBanner.module.css";

const RewardBanner = () => {
  return (
    <>
      <div className={`${styleRewardBanner.rewardBannerWrap}`}>
        <a href="#">적립 프로모션 배너 영역 (크기 미정)</a>
      </div>
    </>
  );
};

export default RewardBanner;
