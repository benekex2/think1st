"use client";

import { colors } from "@/utils/style";
import { useState } from "react";

interface RangeInputProps {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
  label?: string;
}

export default function RangeInput({
  min = 8,
  max = 100,
  value,
  onChange,
  label = "Age",
}: RangeInputProps) {
  const [internalValue, setInternalValue] = useState(min);

  const currentValue = value !== undefined ? value : internalValue;

  const handleChange = (val: number) => {
    if (onChange) {
      onChange(val);
    } else {
      setInternalValue(val);
    }
  };
  const thumbWidth = 20;
  const percent = (currentValue - min) / (max - min);
  const offset = thumbWidth / 2 - percent * thumbWidth;

  return (
    <div className="w-full max-w-md mx-auto py-3 mb-10">
      <label className="block text-base mb-2">{label}</label>
      <div className="flex justify-between text-sm mb-0">
        <span>{min}</span>
        <span>{max}</span>
      </div>

      <div className="relative w-full">
        <div
          className="absolute top-8 transform"
          style={{ left: `calc(${percent * 100}% + ${offset}px)` }}
        >
          <div
            className={`bg-white border border-[${colors.secondary}] rounded-md px-2 py-1 text-purple-600 text-sm relative -left-5 w-10 text-center`}
          >
            {currentValue}
            <div
              className={`absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white border-t border-l border-[${colors.secondary}] rotate-45`}
            ></div>
          </div>
        </div>
        <input
          type="range"
          min={min}
          max={max}
          value={currentValue}
          onChange={(e) => handleChange(Number(e.target.value))}
          className="w-full appearance-none bg-transparent cursor-pointer"
        />
      </div>

      <style jsx>{`
        input[type="range"] {
          height: 6px;
          border-radius: 9999px;
          background: linear-gradient(
            to right,
            ${colors.purple} ${((currentValue - min) / (max - min)) * 100}%,
            ${colors.secondary} ${((currentValue - min) / (max - min)) * 100}%
          );
        }
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: ${thumbWidth}px;
          width: ${thumbWidth}px;
          border-radius: 50%;
          background: ${colors.purple};
          cursor: pointer;
          border: none;
          margin-top: -7px;
        }

        input[type="range"]::-moz-range-thumb {
          height: ${thumbWidth}px;
          width: ${thumbWidth}px;
          border-radius: 50%;
          background: ${colors.purple};
          cursor: pointer;
          border: none;
        }

        input[type="range"]::-webkit-slider-runnable-track {
          height: 6px;
          border-radius: 9999px;
          background: ${colors.secondary};
        }

        input[type="range"]::-moz-range-track {
          height: 6px;
          border-radius: 9999px;
          background: ${colors.secondary};
        }
      `}</style>
    </div>
  );
}
