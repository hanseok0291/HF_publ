import React, { useState } from "react";
import Container from "../../components/retto_pub/common/Container";

// style
import styleCommon from "../../styles/retto_pub/Common.module.css";
import styleBalsoGuide from "../../styles/retto_pub/balrottoGuide.module.css";
import BallLottie from "../../public/images/balrotto/lotto-ball";

// component
import Header from "../../components/retto_pub/common/Header";
import LottieComponent from "../../components/retto_pub/LottieComponent";

const index = () => {
  return (
    <>
      <Header
        title="발소 리워드 로또 안내"
        sideBtn="x"
        isBack={false}
        isCenter={true}
        sideBtnClassName={styleBalsoGuide.closeBtn}
      />
      <Container
        padding="0"
        paddingTop="64px"
        backgroundColor="#fff"
        className={styleCommon.hidden}
      >
        <div className={styleBalsoGuide.balrottoGuide}>
          {/* Section 1 */}
          <div
            className={`${styleBalsoGuide.section} ${styleBalsoGuide.section1}`}
          >
            <h2 className={styleBalsoGuide.titleText}>
              <span>리또가 발소 리워드 로또로</span> <br />
              <em>새롭게</em> 시작해요!
            </h2>
            <div className={styleBalsoGuide.textWrap}>
              <p className={styleBalsoGuide.mainText}>
                4월 14일 오전 12시부터 010PAY 가족사인 <br />
                발로소득에서 운영해요. <br />
                발소 리워드 로또를 계속 받으려면
                <br />
                <em>발로소득 앱을 꼭 가입</em>해 주세요
              </p>
            </div>
            <div className={styleBalsoGuide.imgWrap}>
              <span className={styleBalsoGuide.coin1} />
              <span className={styleBalsoGuide.coin2} />
              <span className={styleBalsoGuide.coin3} />
            </div>
            <div className={styleBalsoGuide.textWrapSecond}>
              <div className={styleBalsoGuide.textBox}>
                <p className={styleBalsoGuide.mainText}>발로소득이란?</p>
                <p className={styleBalsoGuide.subText}>
                  건강한 습관으로 소득 쌓고, 쇼핑 할인까지! <br />
                  건강과 혜택을 하나로 연결하는 서비스예요
                </p>
              </div>
            </div>
          </div>

          {/* Section 2 */}
          <div
            className={`${styleBalsoGuide.section} ${styleBalsoGuide.section2}`}
          >
            <p className={styleBalsoGuide.bgText}></p>
            <h2 className={styleBalsoGuide.titleText}>
              당첨 확률{" "}
              <span>
                <em>40배</em> UP!
              </span>
            </h2>
            <div className={styleBalsoGuide.textWrap}>
              <p className={styleBalsoGuide.mainText}>
                1개 조합에 번호가 6개에서 5개로 줄어들어
                <br />
                <b>당첨 확률이 40배 늘었어요!</b>
              </p>
            </div>
            <div className={styleBalsoGuide.imgWrap}>
              <LottieComponent
                className={styleBalsoGuide.ballLottie}
                animationData={BallLottie}
                autoplay={true}
                loop={true}
                delay={200}
              />
            </div>
            <div className={styleBalsoGuide.benefitWrap}>
              <div className={styleBalsoGuide.benefitBox}>
                <p className={styleBalsoGuide.titleText}>
                  실제 로또 번호 중 <b>5개만 맞아도 1등!</b>
                </p>
              </div>
            </div>
          </div>

          {/* section 3 */}
          <div
            className={`${styleBalsoGuide.section} ${styleBalsoGuide.section3}`}
          >
            <p className={styleBalsoGuide.roundText}>지급 및 추첨일</p>
            <div className={styleBalsoGuide.textWrap}>
              <p className={styleBalsoGuide.mainText}>
                이제는 발소 리워드 로또 받고
                <br />
                <span>이번 주말 바로 당첨 확인</span>하세요!
              </p>
            </div>
            <div className={styleBalsoGuide.calendarWrap}>
              <p className={styleBalsoGuide.mainText}>
                당첨자 발표 <span>매주 토요일 오후 9시</span>
              </p>
              <p className={styleBalsoGuide.subText}>
                지급 기간: 토요일 오후 8시 ~ 다음주 토요일 7시 59분
              </p>
            </div>
          </div>

          {/* section 4 */}
          <div
            className={`${styleBalsoGuide.section} ${styleBalsoGuide.section4}`}
          >
            <p className={styleBalsoGuide.roundText}>당첨 리워드 정보</p>
            <table>
              <thead>
                <tr>
                  <th>순위</th>
                  <th>당첨 기준</th>
                  <th>당첨 리워드</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1등</td>
                  <td>5개</td>
                  <td>현금 2,000,000원</td>
                </tr>
                <tr>
                  <td>2등</td>
                  <td>4개</td>
                  <td>쇼핑지원금 1,000원</td>
                </tr>
                <tr>
                  <td>3등</td>
                  <td>3개</td>
                  <td>쇼핑지원금 100원</td>
                </tr>
              </tbody>
            </table>

            <div className={styleBalsoGuide.benefitWrap}>
              <div className={styleBalsoGuide.benefitBox}>
                <p className={styleBalsoGuide.titleText}>
                  쇼핑지원금이란 발로소득에서 현금처럼
                  <br />
                  사용해 <b>최대 혜택가로 구매</b>할 수 있어요
                </p>
              </div>
            </div>
          </div>

          {/* section 5 */}
          <div
            className={`${styleBalsoGuide.section} ${styleBalsoGuide.section5}`}
          >
            <h2 className={styleBalsoGuide.titleText}>
              잠깐! 머니 채우기 진행 중이신가요?
            </h2>
            <p className={styleBalsoGuide.subText}>
              기존에는 1주일에 한 번, 최대 5개 적립됐지만,
              <br />
              이제는 보관만 해도 <b>매일매일 최대 3개씩</b> 드려요
            </p>

            <div className={styleBalsoGuide.grayBox}>
              <p className={styleBalsoGuide.topText2}>
                매주 지급되는 발소 리워드 로또 수
              </p>
              <div className={styleBalsoGuide.jewelWrap}>
                <div className={styleBalsoGuide.jewelBox}>
                  <span className={styleBalsoGuide.jewelImg}></span>
                  <p>
                    <span className={styleBalsoGuide.jewelColor}>루비</span>
                  </p>
                  <strong>7개</strong>
                </div>
                <div className={styleBalsoGuide.jewelBox}>
                  <span className={styleBalsoGuide.jewelImg}></span>
                  <p>
                    <span className={styleBalsoGuide.jewelColor}>에메랄드</span>
                  </p>
                  <strong>14개</strong>
                </div>
                <div className={styleBalsoGuide.jewelBox}>
                  <span className={styleBalsoGuide.jewelImg}></span>
                  <p>
                    <span className={styleBalsoGuide.jewelColor}>다이아</span>
                  </p>
                  <strong>21개</strong>
                </div>
              </div>
            </div>
          </div>

          {/* section 6 */}
          <div
            className={`${styleBalsoGuide.section} ${styleBalsoGuide.section6}`}
          >
            <h2 className={styleBalsoGuide.titleText}>알려드려요!</h2>

            <div className={styleBalsoGuide.qaWrap}>
              <ul>
                <li>
                  <p className={styleBalsoGuide.qBox}>
                    기존 리또 당첨 확인은 어떻게 하나요?
                  </p>
                  <p
                    className={`${styleBalsoGuide.aBox} ${styleBalsoGuide.first}`}
                  ></p>
                </li>
                <li>
                  <p className={styleBalsoGuide.qBox}>
                    머니 채우기로 받던 혜택 계속 받을 수 있나요?
                  </p>
                  <p
                    className={`${styleBalsoGuide.aBox} ${styleBalsoGuide.second}`}
                  ></p>
                  <p className={styleBalsoGuide.notiText}>
                    * 100원딜 응모권은 4/14(월)부터 지급 종료 예정
                  </p>
                </li>
                <li>
                  <p className={styleBalsoGuide.qBox}>
                    머니 채우기 중 발로소득에 늦게 가입하면
                    <br />
                    어떻게 되나요?
                  </p>
                  <p
                    className={`${styleBalsoGuide.aBox} ${styleBalsoGuide.third}`}
                  ></p>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom area */}
          <div
            className={`${styleBalsoGuide.bottomAreaFixed} ${styleBalsoGuide.fixedBottom}`}
          >
            <div className={styleBalsoGuide.container}>
              <button
                type="button"
                className={styleBalsoGuide.btn}
                onClick={() =>
                  window.open(
                    "https://go.balso.io/r6n0jp",
                    "_blank",
                    "noreferrer"
                  )
                }
              >
                발로소득 미리 가입하기
              </button>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default index;
