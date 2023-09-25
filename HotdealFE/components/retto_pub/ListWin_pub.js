import React from 'react';

// style
import styleRettoList from "../../styles/retto_pub/RettoList.module.css";
import Container from './common/Container';
import BottomSheetTurnChoice from './common/modal/BottomSheetTurnChoice';

const rettoNumber = [1, 6, 25, 29, 40, 43, 44];

const myRettoNumber = [[1, 6, 25, 29, 40, 43, 44], [22, 24, 25, 29, 39, 43, 44]]

const ListWin_pub = () => {

  return (
    <>
      <Container padding="0" isTab>
        <div className={`${styleRettoList.noResult}`}>
          <p>아직은 당첨된 리또가 없어요.</p>
        </div>
        <div className={styleRettoList.turnNavWrap}>
          <div className={styleRettoList.turnNavBox}>
            <button type="button" className={`${styleRettoList.moveBtn} ${styleRettoList.leftBtn}`}></button>
            <button type="button">
              <p className={styleRettoList.turnText}>1701회차</p>
              <p className={styleRettoList.turnDate}>추첨일 : 2023.11.25</p>
            </button>
            <button type="button" className={`${styleRettoList.moveBtn} ${styleRettoList.rightBtn} off`}></button>
          </div>
        </div>
      </Container>
      {/* <BottomSheetTurnChoice /> */}
    </>
  );
};

export default ListWin_pub;
