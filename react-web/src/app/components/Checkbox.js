import React, { useState } from 'react'
import { CheckIcon, CheckSquareIcon } from "@/app/icons";
import theme from "@/app/theme";

const Checkbox = ({type="primary"}) => {
  const [isChecked, setIsChecked] = useState(false);
  const onChecked = () => setIsChecked(!isChecked);
  
  return (
    <div className={`${type === 'primary' ? 'w-[20px] h-[20px]' : 'w-[16px] h-[16px]'}`}>
      <input type="checkbox" id="checkbox-button" className='hidden' onChange={onChecked} />
      <label htmlFor="checkbox-button" className='block w-full h-full cursor-pointer'>
        {type === 'primary' ? 
          <CheckSquareIcon color={`${isChecked ? theme.colors.gray900 : theme.colors.gray300}`} /> :
          <CheckIcon color={`${isChecked ? theme.colors.gray900 : theme.colors.gray300}`} />
        }
      </label>
    </div>
  )
}

export default Checkbox;
