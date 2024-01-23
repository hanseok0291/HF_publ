import React from 'react';

//style
import styleCommon from '../../../styles/retto_pub/Common.module.css';

function Button({children, white, margin, disabled, handleModalToggle, large=false}) {
  const styles = {
    margin: margin
  }

  return (
    <button type='button' className={`${styleCommon.button} ${white ? styleCommon.white : ''} ${disabled ? styleCommon.disabled : ''} ${large ? styleCommon.large : ''}`} style={styles} onClick={handleModalToggle}>
      {children}
    </button>
  )
}

export default Button
