import React, { useEffect, useRef, useState } from "react";
import balsoLottoInfo from "../../styles/retto_pub/balsoLottoInfo.module.css";
import balsoLottoReceive from "../../styles/retto_pub/balsoLottoReceive.module.css";
import Image from "next/image";

const index = () => {
  
  return (
    <div>
      <div className={balsoLottoInfo.headerContainer}>
        <button type="button" className={balsoLottoInfo.backBtn}></button>
        <h2>발소 리워드 로또 받기</h2>
      </div>
      <div className={balsoLottoReceive.container}>
        <span className={balsoLottoReceive.bgImg1}></span>
        <span className={balsoLottoReceive.bgImg2}></span>
        <span className={balsoLottoReceive.bgImg3}></span>
        <div className={balsoLottoReceive.topWrap}>
          <h3>많이 모아 1등 확률 올려요!</h3>
          <div className={balsoLottoReceive.textBox}>
            <p className={balsoLottoReceive.topText}>이번주 1등 당첨금</p>
            <p className={balsoLottoReceive.botText}>5,000,000원</p>
          </div>
        </div>
        <ul className={balsoLottoReceive.botWrap}>
          <li>
            <img src="../../images/retto/balso-lotto-receive-list-1.png" alt="장바구니" />
            <div className={balsoLottoReceive.textBox}>
              <p className={balsoLottoReceive.titleText}>발소몰 구경하고</p>
              <p className={balsoLottoReceive.subText}>하루에 최대 2번 5줄 받기</p>
            </div>
            <button type="button" className={balsoLottoReceive.receiveBtn}>받기</button>
          </li>
          <li>
            <img src="../../images/retto/balso-lotto-receive-list-2.png" alt="장바구니" />
            <div className={balsoLottoReceive.textBox}>
              <p className={balsoLottoReceive.titleText}>발소몰에서 쇼핑하고</p>
              <p className={balsoLottoReceive.subText}>하루에 최대 10줄 받기</p>
            </div>
            <button type="button" className={balsoLottoReceive.viewBtn}>구경하기</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default index;
