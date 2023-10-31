import React from 'react';
import { useState } from 'react';

//style
import styleCommon from '../../styles/retto_pub/Common.module.css';
import styleApply from "../../styles/retto_pub/Apply.module.css";

const LayerFillFail = () => {

  return (
    <div className={styleCommon.layer}>
      <div className={styleCommon.layerHeader}>
        <h2>채우기 실패</h2>
        <button type="button" className={styleCommon.closeBtn}>
          닫기
        </button>
      </div>
      <div className={`${styleApply.applyFailWrap}`}>
        <p className={styleApply.mainText}>
          <b>앗, 머니가 채워지지 않았어요!</b> <br />
          부족한 머니 충전에 실패했어요.
        </p>
        <div className={styleApply.infoBox}>
          <strong>이런 경우일 수 있어요!</strong>
          <ul>
            <li>등록한 <b>계좌에 잔액이 부족한</b> 경우</li>
            <li>등록한 계좌의 <b>은행 점검 시간</b>인 경우</li>
            <li><b>일시적인 시스템 오류</b>인 경우</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default LayerFillFail;
