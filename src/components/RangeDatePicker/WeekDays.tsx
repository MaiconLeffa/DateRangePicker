import React from "react";
import { weekDays } from "./utils";

export function WeekDays() {
  return (
    <>
      {weekDays.map((week, index) => (
        <span
          className="flex h-[32px] w-[calc(100%/7)] min-w-[calc(100%/7)] items-center justify-center text-center font-bold text-gray-500"
          key={index}
        >
          {week}
        </span>
      ))}
    </>
  );
}
