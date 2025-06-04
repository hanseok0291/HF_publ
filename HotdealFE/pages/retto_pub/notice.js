import React from 'react'

// style
import style from "../../styles/retto_pub/moneyboxNotice.module.css";

const index = () => {
  return (
    <div>
      <div className={style.headerContainer}>
        <button type="button" className={style.backBtn}></button>
        <h2>머니함</h2>
      </div>
      <div className={style.contentsWrap}>
        <div className={style.titleWrap}>
          <p>6/12(목) 기대해주세요</p>
          <h2>
            비상금 보관함 서비스로 <br />
            새롭게 인사드릴게요!
          </h2>
        </div>
        <div className={`${style.cardWrap} ${style.cardWrap1}`}>
          <p className={style.titleText}>비상금 보관함이란?</p>
          <p className={style.subTitleText}>
            오픈뱅킹에 조회되지 않아 <br />
            나만의 비상금을 안전하게 보관할 수 있어요!
          </p>
          <p className={style.subText}>
            원하는 장소에 비상금을 숨기면 매일 혜택을 드려요
          </p>
          <div className={style.visualImg}></div>
        </div>
        <div className={`${style.cardWrap} ${style.cardWrap2}`}>
          <p className={style.titleText}>무엇을 보관할 수 있나요?</p>
          <p className={style.subTitleText}>
            비상금을 상품권으로 보관할 수 있어요!
          </p>
          <div className={style.visualImg}></div>
          <div className={style.infoBox}>
            휘슬 서비스에서 세차, 검사 등 운전자들이 <br />
            사용할 수 있는 휘슬 상품권 외에도 <br />
            다양한 상품권이 추가될 예정이에요
          </div>
        </div>
        <p className={style.bottomTitle}>
          혜택이 풍부한 <br />
          새로운 서비스를 기대해주세요!
        </p>
      </div>
    </div>
  )
}

export default index
