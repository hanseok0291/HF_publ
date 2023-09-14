import React from 'react';

// style
import styleRettoList from "../../styles/retto_pub/RettoList.module.css";

const rettoList = [
  [12, 10, 25, 29, 36 ,39],
  [12, 10, 25, 29, 36 ,39],
  [12, 10, 25, 29, 36 ,39],
  [12, 10, 25, 29, 36 ,39],
  [12, 10, 25, 29, 36 ,39],
  [12, 10, 25, 29, 36 ,39],
  [12, 10, 25, 29, 36 ,39],
  [12, 10, 25, 29, 36 ,39],
  [12, 10, 25, 29, 36 ,39],
  [12, 10, 25, 29, 36 ,39],
  [12, 10, 25, 29, 36 ,39],
  [12, 10, 25, 29, 36 ,39],
  [12, 10, 25, 29, 36 ,39],
];

const ListProgress = () => {
  return (
    <>
      <div className={styleRettoList.borderBox}>
        <span>1071회</span>
        <ul>
          <li>
            <span className={`${styleRettoList.jewelImg} ${styleRettoList.diamond}`}></span>
            <span className={`${styleRettoList.jewelLength}`}>10개</span>
          </li>
          <li>
            <span className={`${styleRettoList.jewelImg} ${styleRettoList.emerald}`}></span>
            <span className={`${styleRettoList.jewelLength}`}>0개</span>
          </li>
          <li>
            <span className={`${styleRettoList.jewelImg} ${styleRettoList.ruby}`}></span>
            <span className={`${styleRettoList.jewelLength}`}>0개</span>
          </li>
        </ul>
        <dl>
          <dt>내 보유 리또</dt>
          <dd>1,099개</dd>
          <dt>추첨일자</dt>
          <dd>2023.12.02</dd>
        </dl>
        <button type='button'>당첨 안내 확인</button>
      </div>
      <div className={styleRettoList.borderBox}>
        <ul className={styleRettoList.rettoBox}>
          {rettoList.map((item, index) => <li key={index}>{item.map((number, numberIndex) => <span className={styleRettoList.numberText} key={numberIndex}>{number}</span>)}</li>)}
        </ul>
      </div>
    </>
  );
};

export default ListProgress;
