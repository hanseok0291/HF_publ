import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// css
import styleRewardBanner from "../../../styles/coupon_pub/RewardBanner.module.css";

const RewardBanner = () => {
  return (
    <>
      <div className={`${styleRewardBanner.rewardBannerWrap}`}>
        <a href="#" className={styleRewardBanner.linkBox}>
          <div className={styleRewardBanner.textWrap}>
            <p>오직 기프티몰에서만</p>
            <p>
              최대 N% 최저가 혜택 <i>!</i>
              <span className={styleRewardBanner.checkBtn}>
                지금 확인
              </span>
            </p>
          </div>
        </a>
      </div>
    </>
  );
};

export default RewardBanner;
