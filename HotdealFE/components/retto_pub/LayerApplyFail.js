import React from 'react';
import { useState } from 'react';

//style
import styleCommon from '../../styles/retto_pub/Common.module.css';
import styleApply from "../../styles/retto_pub/Apply.module.css";
import Header from './common/Header';
 
// 레벨 변경 레이어 팝업
// type change 일 경우 레벨 변경 실패 타입
// case1 true 일 경우 실패 시간 케이스
const LayerApplyFail = ({case1, type}) => {
  return (
    <div className={styleCommon.layer}>
      <div className={styleCommon.layerHeader}>
        <h2>{type !== "change" ? "신청 실패" : "레벨 변경 실패"}</h2>
        <button type="button" className={styleCommon.closeBtn}>
          닫기
        </button>
      </div>
      <div className={`${styleApply.applyFailWrap}`}>
        {!case1 ?
          <>
            <p className={styleApply.mainText}>
              <b>앗, {type !== "change" ? "신청" : "변경"}이 완료되지 않았어요!</b> <br />
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
          </>
          : 
          <>
            <p className={`${styleApply.mainText}`}>
              <b>앗, {type !== "change" ? "신청" : "변경"}이 완료되지 않았어요!</b> <br />
              도중에 {type !== "change" ? "신청" : "변경"} 불가 시간과 겹쳤어요.
            </p> 
            <p className={styleApply.subText}><b>{type !== "change" ? "오전 00시 30분 이후" : "오전 01시 이후"}</b>에 다시 신청해 주세요.</p>
          </>
        }
        
        
      </div>
    </div>
  )
}

export default LayerApplyFail;
