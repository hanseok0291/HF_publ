import React from 'react'

import styleHundredDealEntry from "../../styles/retto_pub/HundredDealEntry.module.css";

const HundredDealEntry = () => {
  
  return (
    <div className={`${styleHundredDealEntry.borderBox}`}>
      <h2>매일 100원딜 응모해요</h2>
      <div className={styleHundredDealEntry.botContents}>
        <p className={`${styleHundredDealEntry.leftContent}`}>머니 보관 성공</p>
        <p className={styleHundredDealEntry.rightContent}>리또 보상 응모권 <strong>0개</strong></p>
      </div>
    </div>
  )
}

export default HundredDealEntry
