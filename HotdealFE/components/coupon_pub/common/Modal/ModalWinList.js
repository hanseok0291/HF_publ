import { useState } from "react";

//css
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";

const ModalWin = ({ show, onClose, list }) => {
	const handleMoneyTabClick = (e) => {
		e.preventDefault();
		onClose();
	};

	return (
		<div
			className={`${styleModal.modal} ${styleModal.modalInfo} ${styleModal.modalWinner} ${show ? styleModal.open : ""
			}`}
			style={{display: "block"}}>
				<div className={`${styleModal.modalDialog} ${styleModal.slideDialog}`} style={{bottom: "0"}} >
					<div className={`${styleModal.modalContent}`}>
						<div className={`${styleModal.modalBody}`}>
							<p className={`${styleModal.modalTitle}`}><strong>기프티몰이 처음</strong>이시라면
							<br />최초 1회 약관 동의가 필요해요
							</p>
							<p className={`${styleModal.modalSubTitle}`}>결제할 때 사용해서 저렴하게 구매해 보세요<i className={`${styleCommon.italic}`}>!</i></p>
							<div className={`${styleModal.modalInfoBox}`}>
								<p className={`${styleModal.title}`}>보유 금액</p>
								<p className={`${styleModal.money}`}>300,000원</p>
							</div>
						</div>
					</div>
				</div>
		</div>
	)

}

export default ModalWin;
