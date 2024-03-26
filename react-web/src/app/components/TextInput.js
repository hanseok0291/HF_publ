import React, { useRef, useState } from 'react'
import { InputCancle } from '../icons';

const TextInput = ({label, placeholder, error, disabled, readOnly}) => {
  const [text, setText] = useState("");
  const [isFocus, setIsfocus] = useState(false);
  const inputRef = useRef();

  const onChange = (e) => {
    setText(e.target.value);
  }

  const onFocus = () => {
    setIsfocus(true);
  }

  const onBlur = () => {
    setIsfocus(false);
  }

  const handleInputReset = (e) => {
    e.preventDefault();
    setText("");
  }
 
  return (
    <div className={`relative flex flex-col justify-center h-[70px] border border-solid ${isFocus ? 'border-gray900':'border-gray300'} pl-[16px] pr-[40px] rounded-[12px]`}>
      {text && <span className='mb-[2px] text-gray700 text-[12px]'>{label}</span>}
      <div className='relative h-[27px]'> 
        {!text &&
          <span className='absolute left-0 top-0 leading-[27px] text-gray400 font-bold pointer-events-none'>{placeholder}</span>
        }
        <input type="text" className='relative w-full h-full text-[20px] font-bold leading-[27px] bg-transparent' value={text} onBlur={onBlur} onChange={onChange} onFocus={onFocus} ref={inputRef} />
      </div>
      {text && <button className='absolute right-[16px]' onMouseDown={handleInputReset}><InputCancle /></button>}
    </div>
  )
}

export default TextInput
