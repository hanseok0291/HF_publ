import { useEffect, useState } from "react";
import { useRouter } from "next/router";

// css
import styleRewardBanner from "../../../styles/coupon_pub/RewardBanner.module.css";

const RewardBanner = () => {
  return (
    <>
      <div className={`${styleRewardBanner.rewardBannerWrap}`}>
        <a href="#">
          <img
            src="../images/coupon/banner/banner.png"
            alt="적립 프로모션"
          ></img>
        </a>
      </div>
    </>
  );
};

export default RewardBanner;
