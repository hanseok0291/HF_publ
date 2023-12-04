//react
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

//css
import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleCommon from "../../../styles/coupon_pub/Common.module.css";
import stylePay from "../../../styles/coupon_pub/Pay.module.css";
import styleCouponDetail from "../../../styles/coupon_pub/CouponDetail.module.css";
import styleCouponList from "../../../styles/coupon_pub/CouponList.module.css";
import styleApply from ".././../../styles/coupon_pub/Apply.module.css";

// //components
import Layout from "../../../components/common/Layout";
import Header from "../../../components/coupon_pub/common/Header";
import Footer from "../../../components/coupon_pub/common/Footer";
import ModalRecent from "../../../components/coupon_pub/common/Modal/ModalRecent";
import ModalEnterType4 from "../../../components/coupon_pub/common/modal/ModalEnterType4";
import ModalEnterType5 from "../../../components/coupon_pub/common/modal/ModalEnterType5";
import ToastError from "../../../components/coupon_pub/common/toast/ToastError";

const Index = () => {
  //헤더 아이콘 디폴트 세팅
  const [isShowBackBtn, setShowBackBtn] = useState(true);
  const [isShowSearchBtn, setShowSearchBtn] = useState(false);
  const [isShowMypageBtn, setShowMypageBtn] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const dropDownRef = useRef();

  return (
    <>
      <Layout>
        <Header
          pageTitle="선물하기"
          isShowBackBtn={isShowBackBtn}
          isShowSearchBtn={isShowSearchBtn}
          isShowMypageBtn={isShowMypageBtn}
        />
        <div
          className={`${styleDefaultLayout.defaultContent} ${styleDefaultLayout.wrap} ${stylePay.payInfoContent}`}
        >
          <div className={`${stylePay.payWrap} ${stylePay.forYou}`}>
            <div
              className={`${styleCommon.container} ${styleCommon.textCenter} ${stylePay.msgWrap}`}
            >
              <div className={`${stylePay.inputBox}`}>
                <div className={`${stylePay.inputInfoBox}`}>
                  <p className={`${stylePay.labelTitle}`}>
                    <strong>
                      <label for="input_01">보내는 사람</label>
                    </strong>
                  </p>
                </div>
                <input
                  type="text"
                  value="김헥토"
                  maxLength="10"
                  className={`${stylePay.input}`}
                  id="input_01"
                ></input>
              </div>
              <div className={`${stylePay.inputBox} ${stylePay.inputGiftBox}`}>
                <div className={`${stylePay.inputInfoBox}`}>
                  <p className={`${stylePay.labelTitle}`}>
                    <strong>
                      <label for="input_02">받는 사람</label>
                    </strong>
                  </p>
                  <p>
                    <button type="button" className={`${stylePay.btn}`}>
                      최근 선물했던 친구
                    </button>
                    <button type="button" className={`${stylePay.btn}`}>
                      연락처 검색
                    </button>
                  </p>
                </div>
                <div className={`${styleCommon.flexWrap}`}>
                  <input
                    type="text"
                    placeholder="이름"
                    maxLength="10"
                    className={`${stylePay.input} ${stylePay.name}`}
                    id="input_02"
                  ></input>
                  <input
                    type="tel"
                    placeholder="휴대폰 번호"
                    maxLength="11"
                    className={`${stylePay.input} ${stylePay.number}`}
                  ></input>
                </div>
                <div className={`${stylePay.textBox}`}>
                  <textarea
                    className={`${stylePay.textArea}`}
                    placeholder="(선택) 친구에게 선물과 함께 전하고 싶은 메시지를 입력해 주세요. 미입력 시 010PAY가 메시지를 대신 작성해 드려요."
                  ></textarea>
                  <span className={`${stylePay.textCounter}`}>0/100</span>
                </div>
              </div>
            </div>
          </div>
          <div className={`${stylePay.payInfoWrap}`}>
            <div className={`${styleCommon.container}`}>
              <div>
                <p className={`${stylePay.listTitle}`}>상품 내역</p>

                <div
                  className={`${styleCouponDetail.CouponDetaiSmalllWrap} ${stylePay.CouponDetaiSmalllWrap}`}
                >
                  <div className={styleCouponDetail.imgBox}>
                    <img
                      src="https://tbezauth.settlebank.co.kr/theme/hotdeal/HD20220714000000000625_20220714094504024.png"
                      alt="핫딜 TEST"
                    ></img>
                  </div>
                  <div
                    className={`${styleCouponDetail.infoBox} ${stylePay.infoBox}`}
                  >
                    <p className={styleCouponDetail.infoBrand}>스타벅스</p>
                    <p
                      className={`${styleCouponDetail.infoProduct} ${stylePay.infoProduct}`}
                    >
                      시원하게 함께 세트
                    </p>
                    {/* 가격 */}
                    <div className={`${stylePay.priceBox}`}>
											{/* 할인o */}
											{/* <p className={`${stylePay.priceInfo}`}>
												<span className={`${stylePay.dcPercent}`}>10%</span>
												<span className={`${stylePay.price}`}>900원</span>
												<span className={`${stylePay.originPrice}`}>1,000</span>
												<span className={`${stylePay.line}`}></span>
                        <span className={`${stylePay.count}`}>1개</span>
											</p> */}
											{/* 할인o */}
											{/* 할인x */}
											<p className={`${stylePay.priceInfo}`}>
												{/* <span className={`${stylePay.dcPercent}`}>10%</span> */}
												<span className={`${stylePay.price}`}>900원</span>
												{/* <span className={`${stylePay.originPrice}`}>1,000</span> */}
												<span className={`${stylePay.line}`}></span>
                        <span className={`${stylePay.count}`}>1개</span>
											</p>
											{/* 할인x */}
											{/* <p className={`${stylePay.dcWrap}`}></p>
											<p className={`${stylePay.dcWrap}`}></p>
                      <p className={`${stylePay.price}`}>
                        <span>수량</span>
                        <span className={`${stylePay.count}`}>1개</span>
                      </p>
                      <p className={`${stylePay.price}`}>
                        <span>가격</span>
                        <span>
                          <strong>6,300<span className={stylePay.unitText}>원</span></strong>
                        </span>
                      </p> */}
                    </div>
                    {/* //가격 */}
                  </div>
                </div>
              </div>
							</div>
							</div>

							{/* payInfoWrap */}
							<div className={`${stylePay.payInfoWrap}`}>
            <div className={`${styleCommon.container}`}>
              <div>
                <p className={`${stylePay.listTitle}`}>결제 수단</p>
                <div
                  className={`${stylePay.inputBox} ${stylePay.inputDouble} ${stylePay.addBorderBottom}`}
                >
                  <div className={`${stylePay.inputInfoBox}`}>
                    <strong>머니&amp;포인트</strong>
                    <p className={`${stylePay.inputInfoBoxSubTit}`}>포인트부터 자동 사용됩니다.</p>
                  </div>
                </div>
                <div
                  className={`${stylePay.inputBox} ${stylePay.inputDouble} ${stylePay.inputDoubleContent}`}
                >
                  <div
                    className={`${stylePay.inputInfoBox} ${stylePay.moneyInfoBox}`}
                  >
                    <p className={`${stylePay.left}`}>
                      <span>포인트</span>
                      <span className={`${styleCommon.textGray}`}>
                        &nbsp;(사용 가능: 1,000원)
                      </span>
                    </p>
                    <p className={`${stylePay.right}`}>100<span className={stylePay.unitText}>원</span></p>
                  </div>
                  <div
                    className={`${stylePay.inputInfoBox} ${stylePay.moneyInfoBox}`}
                  >
                    <p className={`${stylePay.left}`}>
                      <span>머니</span>
                      <span className={`${styleCommon.textGray}`}>
                        &nbsp;(사용 가능: 1,000원)
                      </span>
                    </p>
                    <p className={`${stylePay.right}`}>800<span className={stylePay.unitText}>원</span></p>
                  </div>
                </div>
                {/* 충전 금액 부족 시 ${stylePay.error} 클래스 추가 */}
                <div
                  className={`${stylePay.inputBox} ${stylePay.inputDouble} ${stylePay.moneyLoadBox} ${stylePay.error}`}
                >
                  <div className={`${stylePay.inputInfoBox}`}>
                    <strong>머니 충전 결제</strong>
										<p className={`${stylePay.inputInfoBoxSubTit}`}>부족한 금액은 자동 충전 후 결제됩니다.</p>
                  </div>
                  {/* 충전 */}
                  <div
                    className={`${stylePay.inputDoubleBox} ${stylePay.inputTop} ${stylePay.error}`}
                  >
                    <div>
                      <span>충전</span>
                    </div>
                    <div
                      className={`${styleCommon.flexWrap} ${styleCommon.alignCenter}`}
                    >
                      <span
                        className={`${stylePay.input} ${stylePay.loadMoney}`}
                      >
                        10,000<span className={stylePay.unitText}>원</span>
                      </span>
                      <i className={styleCommon.iconArrowRight}></i>
                    </div>
                  </div>
                  {/* //충전 */}
                  <div
                    className={`${stylePay.inputDoubleBox} ${stylePay.inputBottom}`}
                  >
                    <span>사용</span>
                    <div className={stylePay.inputArea}>
                      <input
                        type="text"
                        defaultValue="보유 한도 초과로 머니를 충전할 수 없어요"
												className={`${stylePay.input} ${stylePay.errorText}`}
                        readOnly
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
						</div>
					</div>
					{/* //payInfoWrap */}

					{/* payInfoWrap */}
					<div className={`${stylePay.payInfoWrap}`}>
						<div className={`${styleCommon.container}`}>
							<div className={stylePay.cardPointWrap}>
								<dl>
									{/* 약관 동의 전 */}
									{/* <dt>숨은 내 카드 포인트를 010PAY머니로 전환해요!<i className={styleCommon.iconArrowRight}></i></dt> */}
									{/* 약관 동의 후 */}
									<dt>전환 가능한 카드 포인트 <span>200,000,000</span>이 있어요!<i className={styleCommon.iconArrowRight}></i></dt>
									{/* <dd>전환하기</dd> */}
								</dl>
								<div className={stylePay.logoWrap}>
									<div className={stylePay.logoBox}>
										<ImgBox/>
										<ImgBox/>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* //payInfoWrap */}

						{/* payInfoWrap */}
						<div className={`${stylePay.payInfoWrap} ${stylePay.last}`}>
							<div className={`${styleCommon.container}`}>
								<div>
									<p className={`${stylePay.listTitle} ${stylePay.last}`}>
										<span>총 결제 금액</span>
										<span>0<span className={stylePay.unitText}>원</span>
										<button ref={dropDownRef} className={`${ dropDown && stylePay.on} ${stylePay.arrow}`} onClick={() => setDropDown(!dropDown)}></button>
										</span>
									</p>
									{ 
									dropDown && 
									<div className={stylePay.priceDetailWrap}>
										<dl>
											<dt>상품 금액</dt>
											<dd>1,000<em>원</em></dd>
											<dt>
												기본 할인 <span>6%</span>
											</dt>
											<dd>-60<em>원</em></dd>
											<dt>
											기간 한정 할인 <span>6%</span>
											</dt>
											<dd>-40<em>원</em></dd>
											<dt>
											선물 한정 할인 <span>6%</span>
											</dt>
											<dd>-40<em>원</em></dd>
											{/* 상세 개편 */}
											<dt>
											포인트 사용 <span className={styleCouponDetail.benefitAlert}>(보유 : 0원)</span>
											</dt>
											<dd>2,000<em>원</em></dd>
											{/* 상세 개편 */}
										</dl>
									</div>
									}
									<div className={`${stylePay.inputBox} ${stylePay.last}`}>
										<p className={`${stylePay.inputInfoBox}`}>
											<span
												className={`${stylePay.checkbox} ${styleApply.checkbox} ${styleApply.parents}`}
											>
												<input type="checkbox" name="agreeAll" id="agreeAll_03" />
												<label for="agreeAll_03">개인정보 수집이용 동의</label>
											</span>
											<button
												type="button"
												className={`${styleCommon.btnIcon} ${styleApply.agreeBtn}`}
											>
												보기{" "}
												<i
													className={`${styleApply.icon} ${styleApply.iconArrowRight}`}
												></i>
											</button>
										</p>
									</div>
									<ul className={stylePay.bottomList}>
										<li>위 주문 내용 및 결제조건을 확인하였으며, 결제진행에 동의합니다.</li>
										<li>사용 가능 쿠폰 보유 시 010PAY 회원을 탈퇴할 수 없습니다.</li>
									</ul>
								</div>
							</div>
						</div>
						{/* //payInfoWrap */}
        </div>

        <div className={`${styleCommon.bottomFixed} ${stylePay.bottomFixed}`}>
          {/* <ToastError errorMsg="'내정보' 입려 시 선물이 불가합니다."/> */}
          {/* 비활성 버튼 */}
          <button
            type="button"
            className={`${styleCommon.btnGray} ${styleCommon.btnGift}`}
          >
            800원 결제하기
          </button>
          {/* //비활성 버튼 */}
          {/* 활성 버튼 */}
          {/* <button
              type="button"
              className={`${styleCommon.btnGift}`}
            >
            결제하기
            </button> */}
          {/* //활성 버튼 */}
        </div>
        {/* <ModalRecent /> */}

        {/* <ModalEnterType4 /> */}
      </Layout>
    </>
  );
};

const ImgBox = () => {
  return (
    <>
      <img src="../../../images/coupon/logo/brand/logo-liiv.png" alt="" />
      <img src="../../../images/coupon/logo/brand/logo-top.png" alt="" />
      <img src="../../../images/coupon/logo/brand/logo-shinhanplus.png" alt="" />
      <img src="../../../images/coupon/logo/brand/logo-hana.png" alt="" />
      <img src="../../../images/coupon/logo/brand/logo-Hyundai.png" alt="" />
      <img src="../../../images/coupon/logo/brand/logo-lpoint.png" alt="" />
      <img src="../../../images/coupon/logo/brand/logo-samsung.png" alt="" />
      <img src="../../../images/coupon/logo/brand/logo-woori.png" alt="" />
    </>
  )
}

export default Index;
