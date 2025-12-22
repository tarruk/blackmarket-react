"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const TextField = (props: TextFieldProps) => {
  const { label, type, ...inputProps } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col pb-3">
      <label
        htmlFor={props.name}
        className="text-base"
      >
        {label}
      </label>
      <div className="border bg-white rounded-md  border-black h-10 px-3 flex items-center">
        <input
          {...inputProps}
          type={isPassword ? (passwordVisible ? "text" : "password") : type}
          className="flex-1 outline-none border-none bg-transparent"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setPasswordVisible((v) => !v)}
            className="ml-2 shrink-0"
            tabIndex={-1}
          >
            {passwordVisible ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>
    </div>
  );
};

export default TextField;
