import React from 'react'

//style
import styleCommon from '../../../styles/retto_pub/Common.module.css';

const Toast = ({children, width}) => {
  return (
    <div className={styleCommon.toastAlertWrap}>
      <div className={styleCommon.toastAlert} style={{"width": width && width}}>
        {children}
      </div>
    </div>
  )
}

export default Toast;
