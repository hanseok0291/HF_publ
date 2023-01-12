import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";


import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import styleSlick from "../../../styles/coupon_pub/Slick.module.css";
import styleCouponDetail from "../../../styles/coupon_pub/CouponDetail.module.css";

export default function CouponDetail({setDeadlinFixed }) {
  const [isTabTop, setTabdTop] = useState(false);
  const [isToolTip, setIsToolTip] = useState(false);// 툴팁
  const [toolTipPos, setToolTipPos] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const imgRef = useRef();
  const tabRef = useRef();
  const tabConRef = useRef();
  const toolTipRef = useRef();
  const dropDownRef = useRef();

  const handleScroll = () => {
    

    if (imgRef.current !== null) {
      if (imgRef.current.getBoundingClientRect().bottom < 58) {
        setDeadlinFixed(true);
      } else {
        setDeadlinFixed(false);
      }
    }
    if (tabRef.current !== null) {
      if (
        !isTabTop &&
        tabConRef.current.getBoundingClientRect().top <
          tabRef.current.clientHeight + 58
      ) {
        setTabdTop(true);
      } else if (tabConRef.current.getBoundingClientRect().top > 58) {
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
              className={`${styleCouponDetail.imgLabel} ${styleCouponDetail.type1}`}
            >
              기간 한정 특가
            </p>
            <p
              className={`${styleCouponDetail.imgLabel} ${styleCouponDetail.type2}`}
            >
              보유 포인트로 0원
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
              스타벅스
              <i className={`${styleCommon.bar} ${styleCouponDetail.bar}`}></i>
              <span className={styleCouponDetail.infoView}>사용처 보기</span>
              <button
                type="button"
                className={`${styleCommon.btnArrow} ${styleCommon.iconArrowRight}`}
              ></button>
            </p>
            <p className={styleCouponDetail.infoProduct}>시원하게 함께 세트</p>
            <div className={styleCouponDetail.priceWrap}>
              <span className={styleCouponDetail.infoDcPrice}>9,000원</span>
              <span className={styleCouponDetail.infoPrice}>
                <span>10%</span> <strong>5,670원</strong>
              </span>
            </div>
            <dl className={styleCouponDetail.finalPrice}>
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
                <span>11%</span> <strong>30,960원</strong>
              </dd>
            </dl>
            <div className={styleCouponDetail.priceDetailWrap}>
              <dl>
                <dt>
                  기본 할인 <span>6%</span>
                </dt>
                <dd>2,160<em>원</em></dd>
                <dt>
                  기간 한정 할인<span>4%</span>
                </dt>
                <dd>1,080<em>원</em></dd>
                <dt>
                  <input type="checkbox"  name="checkbox" id="checkbox_3"/>
                  <label htmlFor="checkbox_3">사용 후 적립 <span className={styleCouponDetail.benefitAlert}>(23. 1. 2 까지 사용 시)</span></label>
                </dt>
                <dd className={styleCouponDetail.mainColor}>1,080<em>원</em></dd>
              </dl>
              <dl className={styleCouponDetail.addBenefit}>
                <dt>추가 혜택</dt>
                <dd><button ref={dropDownRef} className={`${ dropDown && styleCouponDetail.on}`} onClick={() => setDropDown(!dropDown)}></button></dd>
              </dl>
              { 
                dropDown &&
                <dl className={styleCouponDetail.pointWrap}>
                  <dt>
                    <input type="checkbox"  name="checkbox" id="checkbox_4" />
                    <label htmlFor="checkbox_4">포인트 사용 <span className={styleCouponDetail.benefitAlert}>(보유 : 0원)</span></label>
                  </dt>
                  <dd>2,000<em>원</em></dd>
                  <dt>
                    <input type="checkbox"  name="checkbox" id="checkbox_5" className={styleCouponDetail.whiteBox}/>
                    <label htmlFor="checkbox_5">카드 포인트 사용 <span className={styleCouponDetail.benefitAlert}>(전환 가능 : ?원)</span></label>
                  </dt>
                  <dd><button className={styleCouponDetail.pointCheck}>조회하기<i className={styleCommon.iconArrowRight}></i></button></dd>
                </dl>
              }
            </div>
            <ul className={styleCouponDetail.bottomList}>
              <li>최대 혜택가는 확인 용도로 실제 결제 금액과 다를 수 있습니다.</li>
              <li>결제 시 보유 포인트와 함께 전환한 카드 포인트가 자동 사용됩니다.</li>
            </ul>
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
          <div className={`${styleCommon.container} ${styleCommon.flexWrap}`}>
            <p className={`${styleCommon.floatLeft}`}>
              <button
                className={`${styleCommon.btnIcon} ${styleCommon.btnWish} ${styleCommon.active} ${styleCouponDetail.btnWish}`}
              >
                좋아요
              </button>
              <button
                className={`${styleCommon.btnIcon} ${styleCommon.btnShare} ${styleCouponDetail.btnShare}`}
              >
                공유하기
              </button>
            </p>
            <p
              className={`${styleCommon.marginLeft} ${styleCommon.flexWrap} ${styleCommon.alignCenter}`}
            >
              <button className={`${styleCommon.btnGift}`}>선물하기</button>
              <span className={`${styleCommon.bar}`}></span>
              <button className={`${styleCommon.btnGiftMe}`}>나에게 선물하기</button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
