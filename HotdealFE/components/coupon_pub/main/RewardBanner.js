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
                <span>지금 확인</span>
                <svg
                  className={styleRewardBanner.rightArrow}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 11.37 18.15"
                >
                  <path
                    class="cls-1"
                    d="m1.5,18.15c-.38,0-.77-.15-1.06-.44-.59-.59-.59-1.54,0-2.12l6.64-6.64L.46,2.58C-.14,2.01-.16,1.06.42.46.99-.14,1.94-.16,2.54.42l8.83,8.49L2.56,17.71c-.29.29-.68.44-1.06.44Z"
                  />
                </svg>
              </span>
            </p>
          </div>
        </a>
      </div>
    </>
  );
};

export default RewardBanner;
