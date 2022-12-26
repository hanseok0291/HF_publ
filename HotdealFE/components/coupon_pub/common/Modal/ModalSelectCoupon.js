import { useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

//css
import styleCommon from "../../../../styles/coupon_pub/Common.module.css";
import styleModal from "../../../../styles/coupon_pub/Modal.module.css";
import styleCouponSet from "../../../../styles/coupon_pub/styleCouponSet.module.css";

// 선택 가능 브랜드 토스트
export const ModalSelectCoupon = ({ setModalShow_1, setSelectBrand }) => {
  /* 220926_수정 */
  const [isList, setIsList] = useState(true);
  const brandList = useRef();
  /* // 220926_수정 */

  const handleModal = (e) => {
    setSelectBrand(e);
    setModalShow_1();
  };

  /* 220926_수정 */
  useEffect(() => {
    if (isList) {
      const liHeight = brandList.current.childNodes[0].offsetHeight * 3 + 45;
      console.log(brandList.current);
      brandList.current.style.maxHeight = liHeight + "px";
      brandList.current.childElementCount > 9 &&
        brandList.current.classList.add("scroll");
    }
  }, []);
  /* // //220926_수정 */

  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalInfo} ${styleModal.open} ${styleCouponSet.selectCouponModal}`}
    >
      <div
        className={`${styleModal.modalDialog} ${styleModal.slideDialog}`}
        style={{ bottom: "0" }}
      >
        <div
          className={`${styleModal.modalContent} ${styleModal.modalSelectAccount} ${styleCouponSet.modalContent}`}
        >
          <div className={`${styleModal.modalHeader}`}>
            <h3 className={`${styleModal.modalTitle}`}>
              선택 가능 브랜드
              <button
                onClick={setModalShow_1}
                type="button"
                className={`${styleCommon.btnIcon} ${styleModal.btnClose} ${styleModal.modalClose}`}
              >
                닫기
              </button>
            </h3>
          </div>
          {/* 220926_수정 */}
          <div className={styleCouponSet.brandListWrap}>
            {isList ? (
              <ul className={styleCouponSet.brandList} ref={brandList}>
                <li onClick={() => handleModal("type1")}>
                  <div className={styleCouponSet.conBox}>
                    <div className={styleCouponSet.imgWrap}>
                      <img
                        src="../../../images/coupon/icon/mypage/icon-korail.png"
                        alt="코레일"
                      />
                    </div>
                    <span>코레일</span>
                  </div>
                </li>
                <li onClick={() => handleModal("type2")}>
                  <div className={styleCouponSet.conBox}>
                    <div className={styleCouponSet.imgWrap}>
                      <img
                        src="../../../images/coupon/icon/mypage/icon-onestore.png"
                        alt="원스토어"
                      />
                    </div>
                    <span>원스토어</span>
                  </div>
                </li>
                <li onClick={() => handleModal("type3")}>
                  <div className={styleCouponSet.conBox}>
                    <div className={styleCouponSet.imgWrap}>
                      <img
                        src="../../../images/coupon/icon/mypage/icon-kt.png"
                        alt="코레일"
                      />
                    </div>
                    <span>코레일</span>
                  </div>
                </li>
                <li onClick={() => handleModal("type3")}>
                  <div className={styleCouponSet.conBox}>
                    <div className={styleCouponSet.imgWrap}>
                      <img
                        src="../../../images/coupon/icon/mypage/icon-kt.png"
                        alt="코레일"
                      />
                    </div>
                    <span>코레일</span>
                  </div>
                </li>
                <li onClick={() => handleModal("type3")}>
                  <div className={styleCouponSet.conBox}>
                    <div className={styleCouponSet.imgWrap}>
                      <img
                        src="../../../images/coupon/icon/mypage/icon-kt.png"
                        alt="코레일"
                      />
                    </div>
                    <span>코레일</span>
                  </div>
                </li>
              </ul>
            ) : (
              <span className={styleCouponSet.noList}>
                선택 가능한 브랜드가 없습니다.
              </span>
            )}
          </div>
          {/* // 220926_수정 */}
        </div>
      </div>
    </div>
  );
};

// 쿠폰 상세 토스트
export const ModalSelectCouponDetail = ({ setModalShow_2 }) => {
  return (
    <div
      className={`${styleModal.modal} ${styleModal.modalInfo} ${styleModal.open}`}
    >
      <div
        className={`${styleModal.modalDialog} ${styleModal.slideDialog}`}
        style={{ bottom: "0" }}
      >
        <div
          className={`${styleModal.modalContent} ${styleModal.modalSelectAccount}`}
        >
          <div className={`${styleModal.modalHeader}`}>
            <h3 className={`${styleModal.modalTitle}`}>
              쿠폰 상세
              <button
                onClick={setModalShow_2}
                type="button"
                className={`${styleCommon.btnIcon} ${styleModal.btnClose} ${styleModal.modalClose}`}
              >
                닫기
              </button>
            </h3>
          </div>
          <div className={styleCouponSet.modalDetailWrap}>
            <div className={`${styleCouponSet.modalTopcon}`}>
              <div className={`${styleCommon.imgBox} ${styleCouponSet.imgBox}`}>
                <img
                  src="../../../images/coupon/icon/mypage/icon-korail.png"
                  alt=""
                />
              </div>
              <div className={`${styleCouponSet.infoBox}`}>
                <p className={styleCouponSet.infoBrand}>코레일</p>
                <p className={styleCouponSet.infoProduct}>1천원 할인</p>
                <p className={styleCouponSet.infoPrice}>
                  <strong>From.이헥토</strong>
                </p>
              </div>
            </div>
            <div className={styleCouponSet.textWrap}>
              <dl>
                <dt>주문일</dt>
                <dd>2022. 8. 18</dd>
                <dt>유효기간</dt>
                <dd>2022. 8. 18</dd>
                <dt>적립 예정 포인트</dt>
                <dd>사용 시 100원</dd>
                <dt>사용 가능처</dt>
                <dd className={styleCouponSet.grayBox}>
                  xxx지점, xxx지점, xxx지점, xxx지점, xxx지점, xxx지점, xxx지점,
                  xxx지점, xxx지점, xxx지점, xxx지점, xxx지점, xxx지점,
                  xxxxx지점, xxx지점, xxx지점, xxx지점, xxx지점, xxx지점,
                  xxx지점
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
