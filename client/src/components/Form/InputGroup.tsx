import React, { InputHTMLAttributes, memo, useState } from "react";
import { Eye, EyeSlash } from "../../icons/icons";

type InputGroupProps = {
  content?: string;
  error?: string;
} & InputHTMLAttributes<HTMLInputElement>

const InputGroup = ({ content, error, ...attributes }: InputGroupProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleViewPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <div className="relative w-full">
        <input
          className={`block py-2.5 w-full rounded-md appearance-none border bg-transparent focus:outline-none transition duration-300 text-zinc-800 focus:ring-0 ${error ? "border-red-600" : "border-zinc-300 focus:border-blue-600"
            } ${attributes.name === "password" ? "pl-4 pr-10" : "px-4"} peer`}
          placeholder=" "
          {...attributes}
          type={
            attributes.type === "password"
              ? showPassword
                ? "text"
                : "password"
              : attributes.type || "text"
          }
        />
        <label
          htmlFor={attributes.name}
          className={`absolute text-sm appearance-none bg-white duration-300 transform -translate-y-4 scale-75 top-1.5 z-10 origin-[0] px-2 peer-focus:px-2 ${error ? "text-red-600" : "text-zinc-800 peer-focus:text-blue-600"
            } peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-4 left-2 cursor-text select-none`}
        >
          {content}
        </label>
        {(attributes.name === "password" || attributes.name === "rePassword") &&
          (attributes.value as string).length > 0 && (
            <button
              type="button"
              title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
              onClick={toggleViewPassword}
              className="absolute top-1/2 right-3 -translate-y-1/2 z-10"
            >
              {showPassword ? (
                <EyeSlash className="w-4 h-4 text-zinc-500" />
              ) : (
                <Eye className="w-4 h-4 text-zinc-500" />
              )}
            </button>
          )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600 italic">{error}</p>}
    </div>
  );
};

export default memo(InputGroup);
