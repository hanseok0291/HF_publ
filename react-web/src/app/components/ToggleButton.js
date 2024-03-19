import React, { useState } from 'react'

const ToggleButton = () => {
  const [isToggled, setIsToggled] = useState(false);
  const onToggle = () => setIsToggled(!isToggled);

  return (
    <div className={`w-[44px] h-[24px] ${isToggled ? 'bg-gray800' : 'bg-gray300'} 0 rounded-[22px] transition-bg ease-in duration-200`} >
      <input type="checkbox" id='toggle-button' className='hidden' onChange={onToggle} />
      <label htmlFor='toggle-button' isToggled={isToggled} className='relative block w-full h-full cursor-pointer'>
        <span className={`block absolute ${isToggled ? 'left-[23px]' : 'left-[3px]'} top-[3px] w-[18px] h-[18px] bg-white rounded-lg transition-left ease-in duration-200`}></span>
      </label>
    </div>
  )
}

export default ToggleButton;
