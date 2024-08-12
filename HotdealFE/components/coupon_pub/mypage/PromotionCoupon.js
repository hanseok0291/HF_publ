import { useState } from "react";

import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleGiftPresent from "../../../styles/coupon_pub/GiftPresent.module.css";
import styleGiftCoupon from "../../../styles/coupon_pub/GiftCoupon.module.css";
import styleModal from "../../../styles/coupon_pub/Modal.module.css";
import ModalAlert from "../common/modal/ModalAlert";

//components

export default function PromotionCoupon() {
    const [inputValue, setInputValue] = useState("");
    const handleChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <>
            <div
                className={`${styleGiftPresent.GiftPresentWrap} ${styleGiftCoupon.container}`}
            >
                <div
                    className={`${styleGiftPresent.topCon} ${styleGiftCoupon.topCon} promotion`}
                >
                    <p className={styleGiftPresent.topConText}>
                        공유받은 쿠폰 코드 입력 후 등록하기 버튼을 눌러 주세요.
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
            {/* <ModalAlert message={"쿠폰 코드를 입력해 주세요."} cancle={null}/>
            <ModalAlert message={`이미 등록된 코드입니다.\n보유 쿠폰을 확인해 주세요.`} cancle={null}/>
            <ModalAlert message={`존재하지 않는 쿠폰 코드입니다.\n확인 후 다시 입력해 주세요.`} cancle={null}/>
            <ModalAlert message={`해당 코드의 프로모션이 종료되었습니다.\n다른 쿠폰 코드를 입력해 주세요.`} cancle={null}/>
            <ModalAlert message={`오늘 준비된 해당 프로모션 쿠폰이\n모두 소진되었습니다. 내일 다시 시도해주세요.`} cancle={null}/>
            <ModalAlert message={`쿠폰 등록이 완료되었습니다.\n등록된 쿠폰을 확인하시겠어요?`} /> */}
        </>
    );
}
