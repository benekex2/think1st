import { icons } from "@/utils/icons";
import React from "react";

interface InputFileProps {
  label?: string;
  value?: File | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  close?: () => void;
}

export const InputFile: React.FC<InputFileProps> = ({
  label,
  value,
  onChange,
  close,
}) => (
  <div className="w-full mb-2">
    {label && <label className={`block text-base`}>{label}</label>}
    <div
      className={`border-2  border border-secondary rounded-md p-10 text-center bg-white cursor-pointer`}
    >
      {value ? (
        <div className="flex justify-between items-center">
          <span className={`mt-2 text-base font-medium`}>{value.name}</span>
          <span className="close-button pt-2 cursor-pointer" onClick={close}>
            {icons.close}
          </span>
        </div>
      ) : (
        <>
          <label className={`color-purple cursor-pointer underline`}>
            <input
              type="file"
              className={`hidden`}
              onChange={onChange}
              required
            />
            Upload a file
          </label>
          <span className={`color-gray text-sm hidden sm:inline`}>
            {" "}
            or drag and drop here
          </span>
        </>
      )}
    </div>
  </div>
);
