import React from "react";

const Button = ({
  label = 'Button',
  color = 'primary',
  disabled = false,
  size = 'medium',
  onClick = () => {},
}) => {
  const buttonConfig = {
    primary: {
      bgColor: "bg-gray900",
      color: "text-white",
    },
    secondary: {
      bgColor: "bg-white",
      color: "text-gray900",
    },
    large: "w-full h-[58px] rounded-[12px] text-[18px]",
    medium: "w-full h-[54px] rounded-[12px] text-[16px]",
    small: "w-auto h-[34px] px-[15px] rounded-[12px] text-[15px]",
  };

  return (
    <button
      type="button"
      className={`border ${
        disabled ? "border-gray300 pointer-events-none" : "border-gray900"
      } border-solid rounded-[12px] font-bold ${
        buttonConfig[size]
      } ${disabled ? "bg-gray300" : buttonConfig[color].bgColor} ${
        disabled ? "text-white" : buttonConfig[color].color
      }`}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;