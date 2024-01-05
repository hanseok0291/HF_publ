import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

//style
import styleCommon from '../../styles/retto_pub/Common.module.css';
import styleRecommend from "../../styles/retto_pub/Recommend.module.css";
import InputText from './common/InputText';
import Button from './common/Button';

const LayerRecommend = () => {

  return (
    <div className={styleCommon.notLayer}>
      <div className={`${styleCommon.layerHeader} ${styleCommon.borderNone}`}>
        <h2>카드 추천 코드 입력하기</h2>
        <button type="button" className={styleCommon.closeBtn}>
          닫기
        </button>
      </div>
      <div className={styleRecommend.container}>
        <div className={styleRecommend.titleWrap}>
          <p className={styleRecommend.date}>2. 1 - 2. 28</p>
          <h2>카드 추천 코드를 받으셨나요?</h2>
        </div>
        <InputText label="추천 코드" placeholder="추천 코드를 입력하세요" errorMsg="일치하는 추천 코드를 찾지 못했어요." error={false} />
        <div className={styleRecommend.rettoInfoWrap}>
          <div className={styleRecommend.topCon}>
            <div className={styleRecommend.textWrap}>
              <h4>리또란?</h4>
              <p>010PAY만의 특별한 리워드</p>
              <strong>최대 1억 행운의 기회</strong>
            </div>
          </div>
          <p className={styleRecommend.botText}>실제 로또와 내 리또 번호가 일치하면 최대 1억을 받아요.</p>
        </div>
        <p className={styleRecommend.infoText}>
          추천 코드는 010PAY앱에서 <br /><b><span>카드 배송 전 단계까지</span> 입력할 수 있어요.</b>
        </p>
        <div className={styleRecommend.footerBtnWrap}>
          <Button disabled>다음</Button>
        </div>
      </div>
    </div>
  )
}

export default LayerRecommend;
