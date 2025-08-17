import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  label,
  value,
  onChange,
  ...props
}) => (
  <div className="w-full mb-2">
    {label && <label className={`block text-base`}>{label}</label>}
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={`w-full text-base border border-secondary bg-white rounded-md p-2 mb-3 focus:ring-2 focus:ring-purple-500 outline-none`}
      {...props}
    />
  </div>
);
