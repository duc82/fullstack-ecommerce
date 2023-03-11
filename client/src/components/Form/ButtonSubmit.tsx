import React, { ButtonHTMLAttributes } from "react";

type ButtonSubmitProps = {
  isLoading: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>

const ButtonSubmit = ({ isLoading, ...otherAttributes }: ButtonSubmitProps) => {
  return (
    <button type="submit" {...otherAttributes} disabled={isLoading}>
      {isLoading ? "Đang tải" : otherAttributes.value}
    </button>
  );
};

export default ButtonSubmit;
