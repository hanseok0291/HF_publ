//react
import { useEffect, useRef, useState } from "react";

//css
import styleDefaultLayout from "../../../styles/coupon_pub/DefaultLayout.module.css";
import styleHundredDeal from "../../../styles/coupon_pub/HundredDeal.module.css";

//css
// //components
import Layout from "../../../components/common/Layout";
import ModalHundredArrival from "../../../components/coupon_pub/common/Modal/ModalHundredArrival";
import ModalEntryComplete from "../../../components/coupon_pub/common/Modal/ModalEntryComplete";
import ModalAlert from "../../../components/coupon_pub/common/Modal/ModalAlert";

const Index = () => {
  const [activeTab, setActiveTab] = useState(0);

  const rouletteRef = useRef();
  const rouletteBtnRef = useRef();
  const rouletteBtnRef2 = useRef();
  const rolLength = 6;

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const rRotate = (num, speed = 1) => {
    const panel = rouletteRef.current;
    const btn = rouletteBtnRef.current;
    const btn2 = rouletteBtnRef2.current;
    console.log(rouletteBtnRef)
    const deg = [];
    for (let i = 1, len = rolLength; i <= len; i++) {
      deg.push((360 / len) * i);
    }

    const addVal = num === 3 ? 225 + (speed * 360) : 360 + (speed * 360);
    const rotateVal = (45 * num) + addVal + 2;
      panel.style.transition = "2s";
      panel.style.transform = "rotate(" + rotateVal + "deg)";
      btn.style.pointerEvents = "none";
      btn2.style.pointerEvents = "none";
    setTimeout(() => {
      panel.style.transition = "none";
      panel.style.transform = "rotate(-20deg)";
      btn.style.pointerEvents = "auto";
      btn2.style.pointerEvents = "auto";
    }, 3000);
  };

  const rLayerPopup = (num) => {
    switch (num) {
      case 1:
        alert("1");
        break;
      case 2:
        alert("2");
        break;
      case 3:
        alert("3");
        break;
      case 4:
        alert("4")
        break;
      default:
        alert("꽝! 다음기회에");
    }
  };

  const rReset = () => {
    
  };
 
  return (
    <>
      <div className={styleHundredDeal.missionWrap}>
        <div
        className={`${styleDefaultLayout.pageHeader} ${styleDefaultLayout.defaultHeader} ${styleDefaultLayout.hundredDealMissionHeader}`}
        >
          <div className={`${styleDefaultLayout.container}`}>
            <button
              type="button"
              className={`${styleDefaultLayout.btnIcon} ${styleDefaultLayout.btnBack}`}
            >
              뒤로가기
            </button>
            <h1 className={styleDefaultLayout.pageTitle}>미션 응모권 <span key="1" className="titleEmoticon">💌</span></h1>
          </div>
        </div>

        <div
          className={`${styleDefaultLayout.defaultContent} ${styleDefaultLayout.wrap} ${styleHundredDeal.mission}`}
        >
          <div className={styleHundredDeal.tabWrap}>
            <button type="button" onClick={() => handleTabClick(0)} className={`${activeTab === 0 ? 'on' : ''}`}>포인트 룰렛</button>
            <button type="button" onClick={() => handleTabClick(1)} className={`${activeTab === 1 ? 'on' : ''}`}>100원딜 공유</button>
            <button type="button" onClick={() => handleTabClick(2)} className={`${activeTab === 2 ? 'on' : ''}`}>선물하기</button>
          </div>
          {activeTab === 0 && 
            <div className={`${styleHundredDeal.tab} ${styleHundredDeal.tab1}`}>
              <div className={styleHundredDeal.titleWrap}>
                <h4>매일매일 돌려요<br />꽝 없는 포인트 룰렛</h4>
                <p><span>100P</span>로 응모권 <span>최대 4개 당첨</span></p>
              </div>
              <div className={styleHundredDeal.rouletteWrap}>
                <span className={styleHundredDeal.img1}></span>
                <span className={styleHundredDeal.img2}></span>
                <div className={styleHundredDeal.roulette} ref={rouletteRef}></div>
                <div className={styleHundredDeal.restCount} ref={rouletteBtnRef} onClick={() => rRotate(1)}>
                  오늘 남은 횟수 <br />
                  <span>10회</span>
                </div>
              </div>
              <div className={styleHundredDeal.rouletteBtnWrap}>
                <div className={styleHundredDeal.textWrap}>
                  <p>보유 포인트 <br /><span>2,000,000P</span></p>
                </div>
                <div className={styleHundredDeal.activeBtn} ref={rouletteBtnRef2} onClick={() => rRotate(4)}>룰렛 돌리기</div>
              </div>
              <div className={styleHundredDeal.noteWrap}>
                <h4>안내드려요</h4>
                <ul>
                  <li>포인트 룰렛 1회당 100P가 소진됩니다.</li>
                  <li>일 최대 10회 참여할 수 있으며, 참여 가능 횟수는 매일 초기화됩니다. </li>
                  <li>보유 응모권은 새 딜 오픈 시 자동 소멸됩니다.</li>
                  <li>미션 응모권은 추가 응모에만 사용할 수 있습니다. <br />
                  (선물 받은 응모권만 상품별 첫 응모에 사용 가능)</li>
                  <li>오늘의 딜이 1개인 경우, 미션 응모권은 해당 상품 추가 응모에 자동 사용됩니다. </li>
                </ul>
              </div>
            </div>
          }
          {activeTab === 1 &&
            <div className={`${styleHundredDeal.tab} ${styleHundredDeal.tab2}`}>
              <div className={styleHundredDeal.titleWrap}>
                <h4>친구에게 공유해요<br />오늘의 100원딜 상품</h4>
                <p>나는 <span>추가 응모 +1</span>, 친구는 <span>응모권 +1</span></p>
              </div>
              <ul className={styleHundredDeal.shareList}>
                <li>
                  <div className={styleHundredDeal.textWrap}>
                    <h4 className={styleHundredDeal.brand}>도미노 피자</h4>
                    <p className={styleHundredDeal.product}>블랙 타이거 슈프림 세트</p>
                    <p className={styleHundredDeal.price}><span className={styleHundredDeal.before}>22,000원</span><span className={styleHundredDeal.after}>100원</span></p>
                    <a className={styleHundredDeal.btn} href="#">공유하기</a>
                  </div>
                  <div className={styleHundredDeal.imgWrap}>
                    <img src="../../../images/100deal/sample/img-01.png" alt="" />
                  </div>
                </li>
                <li>
                  <div className={styleHundredDeal.textWrap}>
                    <h4 className={styleHundredDeal.brand}>도미노 피자</h4>
                    <p className={styleHundredDeal.product}>블랙 타이거 슈프림</p>
                    <p className={styleHundredDeal.price}><span className={styleHundredDeal.before}>22,000원</span><span className={styleHundredDeal.after}>100원</span></p>
                    <a className={styleHundredDeal.btn} href="#">공유하기</a>
                  </div>
                  <div className={styleHundredDeal.imgWrap}>
                    <img src="../../../images/100deal/sample/img-01.png" alt="" />
                  </div>
                </li>
              </ul>
              <div className={styleHundredDeal.noteWrap}>
                <h4>안내드려요</h4>
                <ul>
                  <li>1회 이상 응모했던 상품만 친구에게 공유할 수 있습니다. </li>
                  <li>친구별로 최초 1회에 한해, 공유 링크로 010PAY 앱 접속 시 미션 성공이 인정됩니다.</li>
                  <li>보유 응모권은 새 딜 오픈 시 자동 소멸됩니다.</li>
                  <li>미션 응모권은 추가 응모에만 사용할 수 있습니다. <br/>
                  (선물 받은 응모권만 상품별 첫 응모에 사용 가능)</li>
                  <li>오늘의 딜이 1개인 경우, 미션 응모권은 해당 상품 추가 응모에 자동 사용됩니다. </li>
                </ul>
              </div>
            </div>
          }
          {activeTab === 2 &&
            <div className={`${styleHundredDeal.tab} ${styleHundredDeal.tab3}`}>
              <div className={styleHundredDeal.tablConWrap}>
                <div className={styleHundredDeal.titleWrap}>
                  <h4>선물의 기쁨을 나눠요<br />기프티몰에서 선물하기</h4>
                  <p>친구가 선물을 확인하면 <span>응모권 5개</span></p>
                </div>
                <ul className={styleHundredDeal.giftList}>
                  <li>
                    <div className={styleHundredDeal.textWrap}>
                      <h4 className={styleHundredDeal.brand}>BHC</h4>
                      <p className={styleHundredDeal.product}>핫후라이드+콜라1.25L</p>
                      <div className={styleHundredDeal.priceWrap}>
                        <p className={styleHundredDeal.discountPrice}>17,600원</p>
                      </div>
                    </div>
                    <div className={styleHundredDeal.imgWrap}>
                      <img src="../../../images/100deal/sample/img-01.png" alt="" />
                    </div>
                    <a className={styleHundredDeal.btn} href="#">선물하기</a>
                  </li>
                  <li>
                    <div className={styleHundredDeal.textWrap}>
                      <h4 className={styleHundredDeal.brand}>BHC</h4>
                      <p className={styleHundredDeal.product}>핫후라이드+콜라1.25L</p>
                      <div className={styleHundredDeal.priceWrap}>
                        <p className={styleHundredDeal.price}>22,000원</p>
                        <p className={styleHundredDeal.discountPrice}><span className={styleHundredDeal.percent}>25%</span>17,600원</p>
                      </div>
                    </div>
                    <div className={styleHundredDeal.imgWrap}>
                      <img src="../../../images/100deal/sample/img-01.png" alt="" />
                    </div>
                    <a className={styleHundredDeal.btn} href="#">선물하기</a>
                  </li>
                  <li>
                    <div className={styleHundredDeal.textWrap}>
                      <h4 className={styleHundredDeal.brand}>BHC</h4>
                      <p className={styleHundredDeal.product}>핫후라이드+콜라1.25L</p>
                      <div className={styleHundredDeal.priceWrap}>
                        <p className={styleHundredDeal.price}>22,000원</p>
                        <p className={styleHundredDeal.discountPrice}><span className={styleHundredDeal.percent}>25%</span>17,600원</p>
                      </div>
                    </div>
                    <div className={styleHundredDeal.imgWrap}>
                      <img src="../../../images/100deal/sample/img-01.png" alt="" />
                    </div>
                    <a className={styleHundredDeal.btn} href="#">선물하기</a>
                  </li>
                  <li>
                    <div className={styleHundredDeal.textWrap}>
                      <h4 className={styleHundredDeal.brand}>BHC</h4>
                      <p className={styleHundredDeal.product}>핫후라이드+콜라1.25L</p>
                      <div className={styleHundredDeal.priceWrap}>
                        <p className={styleHundredDeal.price}>22,000원</p>
                        <p className={styleHundredDeal.discountPrice}><span className={styleHundredDeal.percent}>25%</span>17,600원</p>
                      </div>
                    </div>
                    <div className={styleHundredDeal.imgWrap}>
                      <img src="../../../images/100deal/sample/img-01.png" alt="" />
                    </div>
                    <a className={styleHundredDeal.btn} href="#">선물하기</a>
                  </li>
                </ul>
                <div className={styleHundredDeal.otherProduct}>
                  <a href="#">
                    친구 취향 저격할 <br />
                    <b>다른 상품도 보고싶다면?</b>
                  </a>
                </div>
              </div>
              <div className={styleHundredDeal.noteWrap}>
                <h4>안내드려요</h4>
                <ul>
                  <li>상품 종류 관계없이 기프티몰에서 선물한 상품을 친구가 확인 시 미션 성공이 인정됩니다. </li>
                  <li>친구가 선물을 확인한 시점에 진행 중인 딜이 없는 경우, 획득한 응모권 5개는 다음 딜 추가 응모에 사용할 수 있습니다.</li>
                  <li>선물한 상품 결제 취소 시 지급된 응모권은 회수되며, 이미 사용한 경우 사용 개수만큼 응모 횟수가 차감됩니다.</li>
                  <li>미션 응모권 사용 후 5회 이상 상품 결제 취소 시, 마지막 결제 취소일로부터 한 달간 본 미션에 참여할 수 없습니다.</li>
                  <li>보유 응모권은 새 딜 오픈 시 자동 소멸됩니다.</li>
                  <li>미션 응모권은 추가 응모에만 사용할 수있습니다. <br /> (선물 받은 응모권만 상품별 첫 응모에 사용 가능)</li>
                  <li>오늘의 딜이 1개인 경우, 미션 응모권은 해당 상품 추가 응모에 자동 사용됩니다.</li>
                </ul>
              </div>
            </div>
          }
        </div>
      </div>

      {/* <Footer isfixedBottom={isFixedBottom} isDeadlinFixed={isDeadlinFixed}/> */}
      {/* 응모권 획득 */}
      {/* <ModalHundredArrival /> */}
      {/* <ModalEntryComplete /> */}
      {/* <ModalAlert message={`오늘의 참여 기회를 모두 사용하였습니다.\n내일 다시 이용해 주세요.`} />
      <ModalAlert message={`룰렛 1회당 100P가 필요합니다.\n부족한 포인트를 모아 다시 이용해 주세요.`} /> */}
    </>
  );
};

export default Index;
