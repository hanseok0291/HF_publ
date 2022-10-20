import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../styles/coupon_pub/Modal.module.css";
import styleTerms from "../../../styles/coupon_pub/Terms.module.css";

const PrivateAgree = () => {
	return (
	<>
		<div className={`${styleModal.modal} ${styleModal.modalInfo} ${styleModal.modalFullpage} ${styleModal.open}`}>
			<div className={`${styleModal.modalDialog}`}>
				<div className={`${styleModal.modalContent}`}>
					<div className={`${styleModal.modalHeader}`}>
						<h3 className={`${styleModal.modalTitle}`}>약관 동의</h3>
						<button type="button" className={`${styleCommon.btnIcon} ${styleModal.btnClose} ${styleModal.modalClose}`}>닫기</button>
					</div>
					<div className={`${styleModal.modalBody}`}>
						<div className={`${styleTerms.terms} ${styleTerms.termsContents}`}>
							asd
						</div>
					</div>
				</div>
			</div>
		</div>
	</>
	)
}

export default PrivateAgree;
