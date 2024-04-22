import React from 'react'

import styleHundredDealEntry from "../../styles/retto_pub/HundredDealEntry.module.css";

const HundredDealEntry = () => {
  
  return (
    <div className={`${styleHundredDealEntry.borderBox}`}>
      <h2>매일 100원딜 응모해요</h2>
      <div className={styleHundredDealEntry.botContents}>
        <p className={`${styleHundredDealEntry.leftContent} ${styleHundredDealEntry.ruby}`}>Lv. 1<em>루비</em></p>
        {/* <p className={`${styleHundredDealEntry.leftContent} ${styleHundredDealEntry.emerald}`}>Lv. 2<em>에메랄드</em></p> */}
        {/* <p className={`${styleHundredDealEntry.leftContent} ${styleHundredDealEntry.diamond}`}>MAX.<em>다이아</em></p> */}
        <p className={styleHundredDealEntry.rightContent}>리또 보상 응모권 <strong>0개</strong></p>
      </div>
    </div>
  )
}

export default HundredDealEntry
