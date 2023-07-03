import { useState } from "react";

import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleGiftPresent from "../../../styles/coupon_pub/GiftPresent.module.css";
import styleGiftCoupon from "../../../styles/coupon_pub/GiftCoupon.module.css";
import styleModal from "../../../styles/coupon_pub/Modal.module.css";

//components

export default function GiftCoupon() {
    const [inputValue, setInputValue] = useState("");
    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <div
            className={`${styleGiftPresent.GiftPresentWrap} ${styleGiftCoupon.container}`}
        >
            <div
                className={`${styleGiftPresent.topCon} ${styleGiftCoupon.topCon}`}
            >
                <p className={styleGiftPresent.topConText}>
                    선물받은 쿠폰 코드 입력 후 등록하기 버튼을 눌러 주세요.
                </p>
                <div className={`${styleCommon.inputWrap} ${styleGiftCoupon.inputWrap}`}>
                    <input
                        type="text"
                        placeholder="쿠폰 코드를 입력해 주세요."
                        className={styleGiftCoupon.input}
                        onChange={handleChange}
                    />
                    <button
                    type="button"
                    className={`${styleCommon.btnIcon} ${styleCommon.btnDel}`}
                    ></button>
                </div>
            </div>
            <div
                className={`${styleModal.modalBottom} ${styleGiftCoupon.botCon}`}
            >
                <div className={`${styleCommon.container}`}>
                    <h3
                        className={`${styleCommon.titleInfo} ${styleCommon.flexWrap} ${styleCommon.alignCenter} ${styleModal.titleInfo} ${styleGiftCoupon.title}`}
                    >
                        <i className={`${styleCommon.italicRound}`}>!</i>
                        안내사항
                    </h3>
                    <div className={`${styleCommon.infoBox}`}>
                        <p className={`${styleCommon.infoText}`}>
                            선물받은 날로부터 7일이 지난 쿠폰은 등록할 수
                            없습니다.
                        </p>
                        <p
                            className={`${styleCommon.infoText} ${styleGiftCoupon.infoText}`}
                        >
                            등록한 쿠폰은 <span>선물함 &gt; 보유</span>에서
                            확인할 수 있습니다.
                        </p>
                    </div>
                </div>
            </div>
            <button
                className={`${styleGiftCoupon.floatBtn} ${
                    inputValue !== "" ? "on" : ""
                }`}
            >
                등록하기
            </button>
        </div>
    );
}
