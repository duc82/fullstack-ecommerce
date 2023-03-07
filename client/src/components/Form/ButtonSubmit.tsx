import React, { ButtonHTMLAttributes } from "react";

interface ButtonSubmitProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading: boolean;
}

const ButtonSubmit = ({ isLoading, ...otherAttributes }: ButtonSubmitProps) => {
  return (
    <button type="submit" {...otherAttributes} disabled={isLoading}>
      {isLoading ? "Đang tải" : otherAttributes.value}
    </button>
  );
};

export default ButtonSubmit;
