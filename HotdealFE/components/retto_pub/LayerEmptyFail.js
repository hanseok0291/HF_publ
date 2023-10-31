import React from 'react';
import { useState } from 'react';

//style
import styleCommon from '../../styles/retto_pub/Common.module.css';
import styleApply from "../../styles/retto_pub/Apply.module.css";
import styleFillBox from "../../styles/retto_pub/FillBox.module.css";

const LayerEmptyFail = () => {

  return (
    <div className={styleCommon.layer}>
      <div className={styleCommon.layerHeader}>
        <h2>비우기 실패</h2>
        <button type="button" className={styleCommon.closeBtn}>
          닫기
        </button>
      </div>
      <div className={`${styleApply.applyFailWrap}`}>
        <p className={styleApply.mainText}>
          <b>앗, 머니 보유 한도를 초과했어요!</b> <br />
          상자 속 금액을 옮길 공간이 부족해요.
        </p>
        <div className={styleFillBox.emptyFailBox}>
          <dl>
            <dt>
              보유 머니
            </dt>
            <dd>1,950,000원</dd>
          </dl>
          <dl className={styleFillBox.nextRetto}>
            <dt>
              초과된 금액
              <span>이만큼 사용 또는 출금 후 시도해 주세요.</span>
            </dt>
            <dd>450,000원</dd>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default LayerEmptyFail;
