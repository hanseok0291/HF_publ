import React from 'react'

const Button = ({ label, disable, color="primary", size="large" }) => {
  const buttonConfig = {
    primary: {
      bgColor: 'bg-gray900',
      color: 'text-white',
    },
    secondary: {
      bgColor: 'bg-white',
      color: 'text-gray900',
    },
  }
  return (
    <button type='button' className={`w-full h-[54px] text-[16px] border ${disable ? 'border-gray300' : 'border-gray900'} border-solid rounded-[12px] font-bold ${disable ? 'bg-gray300' : buttonConfig[color].bgColor} ${disable ? 'text-white' : buttonConfig[color].color}`}>
      {label}
    </button>
  )
}

export default Button;
