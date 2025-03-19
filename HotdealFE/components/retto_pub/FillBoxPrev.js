import React, { useEffect, useState } from "react";

// style
import styleFillBoxPrev from "../../styles/retto_pub/FillBoxPrev.module.css";
import styleCommon from "../../styles/retto_pub/Common.module.css";
import Button from "./common/Button";
import FadeInSection from "./common/FadeInSection";

const FillBoxPrev = ({ case1, case2 }) => {
  return (
    <div className={`${styleFillBoxPrev.container}`}>
      <div className={styleFillBoxPrev.visualWrap}>
        <FadeInSection>
          <div className={styleFillBoxPrev.textWrap}>
            <p>매일 쌓이는 혜택</p>
            <h2>
              머니함에
              <br />
              보관하고 매일 받아요
            </h2>
          </div>
          <div className={styleFillBoxPrev.imgBox}>
            <span
              className={`${styleFillBoxPrev.icon} ${styleFillBoxPrev.icon1}`}
            ></span>
            <span
              className={`${styleFillBoxPrev.icon} ${styleFillBoxPrev.icon2}`}
            ></span>
            <span
              className={`${styleFillBoxPrev.icon} ${styleFillBoxPrev.icon3}`}
            ></span>
          </div>
        </FadeInSection>
      </div>

      <div className={styleFillBoxPrev.mainContentsWrap}>
        <FadeInSection delay={200}>
          <div className={styleFillBoxPrev.textWrap}>
            <h3>머니함이 뭐예요?</h3>
            <p>
              010PAY 머니를 별도 보관하는 상자예요.
              <br />
              머니를 안전하게 보관해 드릴게요.
            </p>
          </div>
        </FadeInSection>
        <FadeInSection delay={400}>
          <div
            className={`${styleFillBoxPrev.grayBox} ${styleFillBoxPrev.firstConBox}`}
          >
            <div className={styleFillBoxPrev.topCon}>
              <div className={styleFillBoxPrev.imgBox}></div>
              <h4 className={styleFillBoxPrev.mainText}>
                월 ~ 일요일 보관하고 <br />
                다음 주말 추첨 기다려요.
              </h4>
            </div>
            <div className={styleFillBoxPrev.botCon}>
              <RettoCalendar />
              <div className={styleFillBoxPrev.markWrap}>
                <p>채우기 기간</p>
                <p>지급일</p>
                <p>추첨일</p>
              </div>
            </div>
          </div>
        </FadeInSection>
        <FadeInSection>
          <div
            className={`${styleFillBoxPrev.grayBox} ${styleFillBoxPrev.secondConBox}`}
          >
            <div className={styleFillBoxPrev.topCon}>
              <div className={styleFillBoxPrev.imgBox}></div>
              <h4 className={styleFillBoxPrev.mainText}>
                보관할 머니 금액에 따라 <br />
                레벨을 선택하세요.
              </h4>
              <p className={styleFillBoxPrev.subText}>
                레벨이 높을수록 당첨 확률 증가!
              </p>
            </div>
            <div
              className={`${styleCommon.grayBox} ${styleFillBoxPrev.botCon}`}
            >
              <p className={styleFillBoxPrev.topText}>
                레벨별 매주 최대 지급 수
              </p>
              <div className={styleCommon.jewelWrap}>
                <div className={styleCommon.jewelBox}>
                  <span className={styleCommon.jewelImg}></span>
                  <p>
                    Lv. 1 <span className={styleCommon.jewelColor}>루비</span>
                  </p>
                  <strong>7개</strong>
                </div>
                <div className={styleCommon.jewelBox}>
                  <span className={styleCommon.jewelImg}></span>
                  <p>
                    Lv. 2{" "}
                    <span className={styleCommon.jewelColor}>에메랄드</span>
                  </p>
                  <strong>14개</strong>
                </div>
                <div className={styleCommon.jewelBox}>
                  <span className={styleCommon.jewelImg}></span>
                  <p>
                    MAX. <span className={styleCommon.jewelColor}>다이아</span>
                  </p>
                  <strong>21개</strong>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
        <FadeInSection>
          <div
            className={`${styleFillBoxPrev.grayBox} ${styleFillBoxPrev.thirdConBox}`}
          >
            <div className={styleFillBoxPrev.topCon}>
              <div className={styleFillBoxPrev.imgBox}></div>
              <h4 className={styleFillBoxPrev.mainText}>
                에메랄드, 다이아 레벨은 <br />
                <em>10주마다 쿠폰</em> 받아요.
              </h4>
            </div>
            <div className={styleFillBoxPrev.botCon}>
              <div className={styleFillBoxPrev.conBox}>
                <p>
                  머니를 계속 보관하면 <br />
                  10주 성공 쿠폰 드려요.
                </p>
                <div className={styleFillBoxPrev.benefitBox}>
                  <p>편의점 쿠폰</p>
                  <p>커피 쿠폰</p>
                </div>
              </div>
              <p className={styleFillBoxPrev.botText}>
                10주 성공 리워드에 루비 레벨은 해당되지 않습니다.
              </p>
            </div>
          </div>
        </FadeInSection>
        <FadeInSection>
          <div
            className={`${styleFillBoxPrev.grayBox} ${styleFillBoxPrev.fourthConBox}`}
          >
            <div className={styleFillBoxPrev.topCon}>
              <div className={styleFillBoxPrev.imgBox}></div>
              <h4 className={styleFillBoxPrev.mainText}>
                매일 무료로 <br />
                <em>100원딜 응모권</em> 받아요.
              </h4>
            </div>
            <div className={styleFillBoxPrev.botCon}>
              <div className={styleFillBoxPrev.conBox}>
                <button type="button" className={styleFillBoxPrev.buttonBox}>
                  <strong>레벨별 응모권 지급 개수</strong>
                  <span className={styleFillBoxPrev.rightTextWrap}>
                    <span className={styleFillBoxPrev.text}>100원딜</span>
                  </span>
                </button>
                <ul className={styleFillBoxPrev.giveInfoWrap}>
                  <li>
                    <p>1개 지급</p>
                  </li>
                  <li>
                    <p>2개 지급</p>
                  </li>
                  <li>
                    <p>3개 지급</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
      <div className={styleFillBoxPrev.btnWrap}>
        <Button large>머니 채우기 시작하기</Button>
      </div>
    </div>
  );
};

const RettoCalendar = () => {
  useEffect(() => {
    const createCalendar = (startDate, endDate) => {
      const calendar = document.getElementById("calendar");
      calendar.innerHTML = ""; // 이전에 생성된 캘린더를 초기화합니다.

      let currentDate = new Date(startDate);

      const table = document.createElement("table");
      const thead = document.createElement("thead");
      const tbody = document.createElement("tbody");
      const headerRow = document.createElement("tr");

      const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];

      daysOfWeek.forEach((day) => {
        const th = document.createElement("th");
        const p = document.createElement("p");
        p.textContent = day;
        th.appendChild(p);
        headerRow.appendChild(th);
      });

      thead.appendChild(headerRow);
      table.appendChild(thead);

      let row = document.createElement("tr");

      while (currentDate <= endDate) {
        const cell = document.createElement("td");
        const p = document.createElement("p");
        p.textContent = currentDate.getDate();
        cell.appendChild(p);
        row.appendChild(cell);

        if (currentDate.getDay() === 6) {
          tbody.appendChild(row);
          row = document.createElement("tr");
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }

      // 마지막 줄 추가 (남은 날짜)
      if (row.children.length > 0) {
        tbody.appendChild(row);
      }

      table.appendChild(tbody);
      calendar.appendChild(table);
    };

    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const startDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - currentDayOfWeek
    ); // 이번 주 시작 날짜
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + 13
    ); // 2주 후 종료 날짜

    createCalendar(startDate, endDate);
  }, []);

  return (
    <div className={styleFillBoxPrev.calendarWrap}>
      <div id="calendar" className={styleFillBoxPrev.calendar} />
    </div>
  );
};

export default FillBoxPrev;
