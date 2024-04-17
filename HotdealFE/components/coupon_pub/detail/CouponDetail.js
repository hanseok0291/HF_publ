import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";


import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleSlick from "../../../styles/coupon_pub/Slick.module.css";
import styleCouponDetail from "../../../styles/coupon_pub/CouponDetail.module.css";
import ToastError from "../common/toast/ToastError";

export default function CouponDetail({setDeadlinFixed }) {
  const [isTabTop, setTabdTop] = useState(false);
  const [isToolTip, setIsToolTip] = useState(false);// 툴팁
  const [toolTipPos, setToolTipPos] = useState(false);
  const [dropDown, setDropDown] = useState(true);

  const imgRef = useRef();
  const tabRef = useRef();
  const tabConRef = useRef();
  const toolTipRef = useRef();
  const dropDownRef = useRef();

  const handleScroll = () => {
    if (imgRef.current !== null) {
      if (imgRef.current.getBoundingClientRect().bottom < 50) {
        setDeadlinFixed(true);
      } else {
        setDeadlinFixed(false);
      }
    }
    if (tabRef.current !== null) {
      if (
        !isTabTop &&
        tabConRef.current.getBoundingClientRect().top <
          tabRef.current.clientHeight + 50
      ) {
        setTabdTop(true);
      } else if (tabConRef.current.getBoundingClientRect().top > 50) {
        setTabdTop(false);
      }
    }
  };

  const handleClick = () => {
    setIsToolTip(!isToolTip)
    if(!isToolTip) {
      if(toolTipRef.current.getBoundingClientRect().top < window.innerHeight / 3) {
        setToolTipPos(true);
      } else {
        setToolTipPos(false);
      }
    }
  }

  useEffect(() => {
    if (process.browser) {
      window.addEventListener("scroll", handleScroll);
    }
  }, [isToolTip]);
  
  return (
    <>
      <div className={`${styleCouponDetail.CouponDetailWrap}`}>
        <div className={`${styleSlick.card} ${styleCouponDetail.card}`}>
          <div
            className={`${styleCouponDetail.imgLabelWrap} ${styleCouponDetail.red}`}
          >
            <p className={`${styleCouponDetail.imgLabel}`}>포인트 적립</p>
            <p
              className={`${styleCouponDetail.imgLabel} ${styleCouponDetail.type4}`}
            >
              기간 한정 특가
            </p>
            <p 
              className={`${styleCouponDetail.imgLabel} ${styleCouponDetail.type2}`}
            >
              보유 포인트로 0원
            </p>
            <p
              className={`${styleCouponDetail.imgLabel} ${styleCouponDetail.type4}`}
            >
              추가 할인
            </p>
            <p
              className={`${styleCouponDetail.imgLabel} ${styleCouponDetail.type3}`}
            >
              최저가 선물전
            </p>
            <p
              className={`${styleCouponDetail.imgLabel} ${styleCouponDetail.type4}`}
            >
              선물 한정 특가
            </p>
          </div>
          <div
            className={`${styleSlick.imgBox} ${styleCouponDetail.imgBox}`}
            ref={imgRef}
          >
            <img
              src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
              alt="핫딜 TEST"
            ></img>
          </div>
          <div
            className={`${styleCouponDetail.alertInfo}`} //마감 스크롤 시 하단 fixed 삭제
          >
            <p>
              <strong className={styleCouponDetail.colorText}>
                3일 00 : 00 : 00
              </strong>{" "}
              후 마감
            </p>
            <i></i>
            <p>
              <strong className={styleCouponDetail.lengthText}>100개</strong>{" "}
              남음
            </p>
          </div>
        </div>
        <div
          className={`${styleCommon.container} ${styleCouponDetail.containerBorder}`}
        >
          <div className={`${styleSlick.infoBox} ${styleCouponDetail.infoBox}`}>
            <p
              className={`${styleCouponDetail.infoBrand} ${styleCommon.flexWrap} ${styleCommon.alignCenter}`}
            >
              해피머니
            </p>
            <p className={styleCouponDetail.infoProduct}>해피머니온라인상품권[1,000원]</p>
            <div className={styleCouponDetail.priceWrap}>
              <span className={styleCouponDetail.infoDcPrice}>1,000</span>
              <span className={styleCouponDetail.infoPrice}>
                <span>10%</span> <strong>900원</strong>
              </span>
            </div>
            <dl className={`${ dropDown && styleCouponDetail.finalPriceOn} ${styleCouponDetail.finalPrice}`}>
              <dt>
                최대 혜택가
                <div className={styleCouponDetail.tooltopWrap} ref={toolTipRef}>
                  <button
                    onClick={handleClick}
                    className={styleCouponDetail.tooltipBtn}
                  ></button>
                  {isToolTip && (
                    <p className={`${styleCouponDetail.tooltip} ${toolTipPos && styleCouponDetail.reverse}`}>
                      * 할인 혜택은 동시가 아닌 위에서부터 순차적으로 적용됩니다.
                    </p>
                  )}
                </div>
              </dt>
              <dd>
                <span>100%</span> <strong>0<span className={styleCouponDetail.unitText}>원</span></strong>
								<i className={`${ dropDown && styleCouponDetail.on} ${styleCommon.iconArrow} ${styleCouponDetail.arrow}`} onClick={() => setDropDown(!dropDown)}></i>
              </dd>
            </dl>
              { 
                dropDown &&
            <div className={styleCouponDetail.priceDetailWrap}>
              <dl>
                <dt>
                  기본 할인 <span>6%</span>
                </dt>
                <dd>60<em>원</em></dd>
                <dt>
								기간 한정 할인 <span>6%</span>
                </dt>
                <dd>60<em>원</em></dd>
                <dt>
                  <input type="checkbox"  name="checkbox" id="checkbox_3"/>
                  <label htmlFor="checkbox_3">선물 한정 할인 <span>5%</span></label>
                  {/* disabled 추가 시 체크박스 비활성화 */}
                  {/* <label htmlFor="checkbox_3" className={styleCouponDetail.disabled}>선물 한정 할인 <span>6%</span></label> */}
                </dt>
                {/* 미반복 */}
                <dd>40<em>원</em></dd>
                {/* soldout 추가 시 라인 추가 */}
                <dt className={styleCouponDetail.soldout}>
                  <input type="checkbox"  name="checkbox" id="checkbox_3"/>
                  <label htmlFor="checkbox_3">선물 한정 할인 <span>5%</span></label>
                  {/* disabled 추가 시 체크박스 비활성화 */}
                  {/* <label htmlFor="checkbox_3" className={styleCouponDetail.disabled}>선물 한정 할인 <span>6%</span></label> */}
                </dt>
                {/* 미반복 */}
                <dd className={styleCouponDetail.soldout}>아쉽지만 <em>품절이에요!</em></dd>
                <dt className={styleCouponDetail.soldout}>
                  <input type="checkbox"  name="checkbox" id="checkbox_3"/>
                  <label htmlFor="checkbox_3">선물 한정 할인 <span>5%</span></label>
                  {/* disabled 추가 시 체크박스 비활성화 */}
                  {/* <label htmlFor="checkbox_3" className={styleCouponDetail.disabled}>선물 한정 할인 <span>6%</span></label> */}
                </dt>
                {/* 반복 */}
                <dd className={styleCouponDetail.soldout}><em>내일 재오픈</em>돼요!</dd>
								<dt>
									<input type="checkbox"  name="checkbox" id="checkbox_4" />
									<label htmlFor="checkbox_4">포인트 사용 <span className={styleCouponDetail.benefitGray}>(보유 : 0원)</span></label>
								</dt>
								<dd>0<em>원</em></dd>
              </dl>
								<div className={styleCouponDetail.addBenefit}>
										<p>23. 11. 30까지 사용하면 <span className={styleCouponDetail.benefitAlert}>168원 적립!</span></p>
								</div>
            </div>
						}
						{/* 카드포인트 전환X */}
            <div className={styleCouponDetail.bannerWrap}>
							<p className={styleCouponDetail.txt}>숨은 카드 포인트 찾고<br></br><strong>기프티몰에서 구매해요!</strong>
              <i className={`${styleCommon.iconArrowRight} ${styleCouponDetail.arrow}`}></i>
							</p>
            </div>
						{/* //카드포인트 전환X */}
						{/* 카드포인트 전환o */}
            {/* <div className={styleCouponDetail.bannerWrap}>
							<p className={styleCouponDetail.txt}>전환 가능 포인트<br></br><strong>2,000,000,000이 있어요!</strong>
              <i className={`${styleCommon.iconArrowRight} ${styleCouponDetail.arrow}`}></i>
							</p>
            </div> */}
						{/* //카드포인트 전환o */}
          </div>
        </div>
        <div
          className={`${styleCouponDetail.InfoWrap} ${
            isTabTop && styleCouponDetail.fixed
          }`}
          ref={tabRef}
        >
          <ul className={`${styleCouponDetail.InfoTab}`}>
            <li
              className={`${styleCouponDetail.active} ${styleCommon.halfWrap}`}
            >
              <button type="button">사용안내</button>
            </li>
            <li className={`${styleCommon.halfWrap}`}>
              <button type="button">유의사항</button>
            </li>
          </ul>
        </div>
        <div
          className={`${styleCouponDetail.CouponDetailInfoWrap} ${
            isTabTop && styleCouponDetail.fixed
          }`}
          ref={tabConRef}
        >
          <div
            className={`${styleCouponDetail.TabContent} ${styleCouponDetail.TabContentOn}`}
          >
            <div
              className={`${styleCommon.container} ${styleCouponDetail.InfoTabContent}`}
            >
              <div className={`${styleCouponDetail.InfoAlertMsg}`}>
                해당 브랜드는 환불 불가합니다
              </div>
              <span className={`${styleCouponDetail.InfoTabImage}`}>
                <img src="../../images/coupon/visual/detail_test1.png"></img>
              </span>
              - 물품형 교환권을 기 - 물품형 교환권을 기재된 상품이 아닌 타
              상품으로 교환할 경우, 쿠폰 가격 이상의 다른 상품으로 교환
              가능하며, 초과 금액은 추가로 지불하셔야 합니다.
              <br />
              - 포인트 적립 및 제휴카드 할인 등은 교환처의 정책에 따릅니다.
              <br />- 본 쿠폰은 유효기간 연장 및 환불되지 않습니다 - 물품형
              교환권을 기재된 상품이 아닌 타 상품으로 교환할 경우, 쿠폰 가격
              이상의 다른 상품으로 교환 가능하며, 초과 금액은 추가로 지불하셔야
              합니다.
              <br />
              - 포인트 적립 및 제휴카드 할인 등은 교환처의 정책에 따릅니다.
              <br />- 본 쿠폰은 유효기간 연장 및 환불되지 않습니다 - 물품형
              교환권을 기재된 상품이 아닌 타 상품으로 교환할 경우, 쿠폰 가격
              이상의 다른 상품으로 교환 가능하며, 초과 금액은 추가로 지불하셔야
              합니다.
              <br />
              - 포인트 적립 및 제휴카드 할인 등은 교환처의 정책에 따릅니다.
              <br />- 본 쿠폰은 유효기간 연장 및 환불되지 않습니다 - 물품형
              교환권을 기재된 상품이 아닌 타 상품으로 교환할 경우, 쿠폰 가격
              이상의 다른 상품으로 교환 가능하며, 초과 금액은 추가로 지불하셔야
              합니다.
              <br />
              - 포인트 적립 및 제휴카드 할인 등은 교환처의 정책에 따릅니다.
              <br />- 본 쿠폰은 유효기간 연장 및 환불되지 않습니다 - 물품형
              교환권을 기재된 상품이 아닌 타 상품으로 교환할 경우, 쿠폰 가격
              이상의 다른 상품으로 교환 가능하며, 초과 금액은 추가로 지불하셔야
              합니다.
              <br />
              - 포인트 적립 및 제휴카드 할인 등은 교환처의 정책에 따릅니다.
              <br />- 본 쿠폰은 유효기간 연장 및 환불되지 않습니다 - 포인트 적립
              및 제휴카드 할인 등은 교환처의 정책에 따릅니다.
              <br />- 본 쿠폰은 유효기간 연장 및 환불되지 않습니다
            </div>
          </div>
          <div className={`${styleCouponDetail.TabContent}`}>
            <div className={`${styleCommon.container}`}>
              <div className={`${styleCouponDetail.TabContentBox}`}>
                <p className={`${styleCouponDetail.TabContentTitle}`}>
                  상품 고시 정보
                </p>
                <p>
                  <span className={`${styleCouponDetail.TabContentLeft}`}>
                    발행자
                  </span>{" "}
                  <span className={`${styleCouponDetail.TabContentRight}`}>
                    (주)헥토파이낸셜
                  </span>
                </p>
                <p>
                  <span className={`${styleCouponDetail.TabContentLeft}`}>
                    유효기간
                  </span>{" "}
                  <span className={`${styleCouponDetail.TabContentRight}`}>
                    2022. 5. 30
                  </span>
                </p>
                <p>
                  <span className={`${styleCouponDetail.TabContentLeft}`}>
                    교환권 공급자
                  </span>{" "}
                  <span className={`${styleCouponDetail.TabContentRight}`}>
                    (주)케이티알파
                  </span>
                </p>
                <p>
                  <span className={`${styleCouponDetail.TabContentLeft}`}>
                    이용 조건
                  </span>{" "}
                  <span className={`${styleCouponDetail.TabContentRight}`}>
                    상품상세설명 참조
                  </span>
                </p>
                <p>
                  <span className={`${styleCouponDetail.TabContentLeft}`}>
                    이용 가능 매장
                  </span>{" "}
                  <span className={`${styleCouponDetail.TabContentRight}`}>
                    상품상세설명 참조
                  </span>
                </p>
                <p>
                  <span className={`${styleCouponDetail.TabContentLeft}`}>
                    소비자 상담
                  </span>{" "}
                  <span className={`${styleCouponDetail.TabContentRight}`}>
                    1600-5200(결제 문의) <br />
                    1588-6474(사용 문의)
                  </span>
                </p>
              </div>
              <div className={`${styleCouponDetail.TabContentBox}`}>
                <p className={`${styleCouponDetail.TabContentTitle}`}>
                  취소 · 환불 · 유효기간 연장 정책 및 방법
                </p>
                <p className={`${styleCouponDetail.TabContentLeft}`}>
                  별도 전달 예정 별도 전달 예정
                  <br />
                  별도 전달 예정 별도 전달
                  <br />
                  별도 전달 예정
                  <br />
                  별도 전달{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`${styleCouponDetail.CouponDetailBottomWrap} ${styleCommon.bottomFixed}`}
        >
          <div className={`${styleCouponDetail.nowViewWrap}`}>
            <span>10,000명</span>이 기분 전환 중 <span>🎵</span>
          </div>
          <div className={`${styleCouponDetail.selfGift}`}>
            <p>나에게도 선물하고 싶다면?</p>
            <a className={styleCouponDetail.rightArrow} href="#"><span>NN%</span> 36,000원에 구매</a>
          </div>
          <div className={`${styleCommon.container} ${styleCommon.flexWrap} ${styleCouponDetail.bottomBtnWrap}`}>
            <p className={`${styleCommon.floatLeft}`}>
              <button
                className={`${styleCommon.btnIcon} ${styleCommon.btnWish} ${styleCommon.active} ${styleCouponDetail.btnWish}`}
              >
                좋아요
              </button>
{/*               <button
                className={`${styleCommon.btnIcon} ${styleCommon.btnShare} ${styleCouponDetail.btnShare}`}
              >
                공유하기
              </button> */}
            </p>
            <p
              className={`${styleCommon.marginLeft} ${styleCommon.flexWrap} ${styleCommon.alignCenter}`}
            >
              <button className={`${styleCommon.btnGift}`}>
                선물하기
                {/* 상품 상세 선물 상품(동일 상품) 아래 말풍선 노출 */}
                <span className={styleCouponDetail.addInfo} style={{width: 118, right: -38}}><span><em>NN%</em> 더 할인 받아요<i>!</i></span></span>
              </button>
              {/* 상품 할인중 (품절x) 선물하기 버튼만 노출 */}
              <span className={`${styleCommon.bar}`}></span>
              <button className={`${styleCommon.btnGiftMe}`}>나에게 선물하기</button>
              {/* 상품 할인중 (품절x) */}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
