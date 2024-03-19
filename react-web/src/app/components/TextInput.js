import React, { useState } from 'react'
import { SubTitle2 } from './TypographyComponents'
import { InputCancle } from '../icons';

const TextInput = ({label, placeholder, error, disabled, readOnly}) => {
  const [text, setText] = useState("");
  const onChange = (e) => {
    setText(e.target.value);
  } 
 
  return (
    <div className='relative flex flex-col justify-center h-[70px] border border-solid border-gray300 pl-[16px] pr-[40px] rounded-[12px]'>
      {text && <span className='text-gray700 text-[12px]'>{label}</span>}
      <div className='relative h-[27px]'> 
        {!text &&
          <span className='absolute left-0 top-0 leading-[27px] text-gray400 font-bold pointer-events-none'>{placeholder}</span>
        }
        <input type="text" className='relative w-full h-full text-[20px] font-bold leading-[27px] bg-transparent' onChange={onChange} value={text} />
      </div>
      {text && <button className='absolute right-[16px]'><InputCancle /></button>}
    </div>
  )
}

export default TextInput
