import { MonthTitleProps } from "./types";
import { isCurrentMonth } from "./utils";
import React from "react";

export function MonthTitle({
  day,
  onPrev,
  onNext,
  disableFuture
}: MonthTitleProps) {
  const _isCurrentMonth = disableFuture ? isCurrentMonth(day) : false;

  return (
    <div className="bg-gray-300 mx-auto flex h-[32px] min-h-[32px] w-[185px] items-center justify-center gap-2 overflow-hidden rounded-lg bg-gray-000">
      <button
        onClick={onPrev}
        type="button"
        className="flex h-[32px] w-[32px] items-center justify-center hover:bg-gray-100"
      ></button>
      <p className="w-[150px] whitespace-nowrap text-center text-sm font-bold capitalize text-gray-500">
        {day.toLocaleString("pt-br", { month: "long" })} {day.getFullYear()}
      </p>
      <button
        onClick={onNext}
        data-disabled={_isCurrentMonth}
        disabled={_isCurrentMonth}
        type="button"
        className="flex h-[32px] w-[32px] items-center justify-center hover:bg-gray-100 data-[disabled=true]:cursor-not-allowed"
      ></button>
    </div>
  );
}
