import React from "react";
import { DateInputProps } from "./types";

export function CalendarButton({ value, onClick }: DateInputProps) {
  return (
    <button
      onClick={onClick}
      className="flex h-[40px] min-w-[212px] gap-2 rounded bg-gray-200 px-4 py-[9.5px] text-sm text-gray-500"
    >
      <span className="text-sm font-normal leading-lg text-gray-500">
        {value}
      </span>
    </button>
  );
}
