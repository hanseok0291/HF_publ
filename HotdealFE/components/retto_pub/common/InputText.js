import React, { useState, useRef } from 'react';
import styleCommon from '../../../styles/retto_pub/Common.module.css';

const InputText = ({ label, placeholder, errorMsg, error }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isError, setIsError] = useState(error); // 에러 시 true
  const inputRef = useRef(null);

  // 입력 필드에 포커스 되었는지 확인
  const handleFocus = () => {
    setIsFocused(true);
  };

  // 입력 필드에서 포커스가 벗어났을 때
  const handleBlur = () => {
    // 입력 값이 비어있으면 isFocused를 false로 설정
    setTimeout(() => {
        setIsFocused(false);
    }, 0);
  };

  // 입력 값 변경 처리
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // 닫기 버튼 클릭 처리
  const handleClose = (event) => {
    setInputValue('');
    setIsError(false);
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };


  // 클래스 이름을 동적으로 결정
  const wrapperClass = isError 
    ? styleCommon.errorStyle 
    : isFocused 
      ? `${styleCommon.active}` // 활성화 클래스 추가
      : styleCommon.inputTextWrap;

  return (
    <div className={`${styleCommon.inputTextWrap} ${wrapperClass}`}>
      {(isFocused || inputValue) && <span className={styleCommon.inputlabel}>{isError ? errorMsg : label}</span>}
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      {inputValue && isFocused && <button type="button" className={styleCommon.closeBtn} onClick={handleClose}></button>}
    </div>
  );
}

export default InputText;
