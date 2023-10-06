import React from 'react';

//style
import styleCommon from '../../../styles/retto_pub/Common.module.css';

function Button({children, white, margin, disabled, onClick}) {
  const styles = {
    margin: margin
  }

  return (
    <button type='button' className={`${styleCommon.button} ${white ? styleCommon.white : ''} ${disabled ? styleCommon.disabled : ''}`} style={styles} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
