import React from 'react'

//style
import styleCommon from '../../../styles/retto_pub/Common.module.css';

const Toast = ({children}) => {
  return (
    <div className={styleCommon.toastAlert}>
      {children}
    </div>
  )
}

export default Toast;
