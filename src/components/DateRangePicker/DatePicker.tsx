import React from "react";
import { useEffect, useState } from "react";
import { DatePickerProps, DayProps } from "./types";
import { isFuture, isToday, mountMonth } from "./utils";
import { WeekDays } from "./WeekDays";
import { styles } from "./styles";
import { MonthTitle } from "./MonthTitle";

export function DatePicker({
  value,
  onSelect,
  disableFuture
}: DatePickerProps) {
  const [days, setDays] = useState<DayProps[]>([]);
  const [currentDate, setCurrentDate] = useState(value?.startAt || new Date());

  useEffect(() => {
    const _days = mountMonth(currentDate, value);
    setDays(_days);
  }, [currentDate, value]);

  function prev() {
    const _date = new Date(currentDate);
    _date.setDate(1);
    _date.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(_date);
  }

  function next() {
    const _date = new Date(currentDate);
    _date.setDate(1);
    _date.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(_date);
  }

  function selectDay(day?: DayProps) {
    if (day?.isEmpty || !day?.fullDay) return;
    onSelect(day.fullDay);
  }

  function handleClick(day: DayProps) {
    if (disableFuture) {
      if (!isFuture(day.fullDay)) selectDay(day);
    } else {
      selectDay(day);
    }
  }

  return (
    <div>
      <MonthTitle
        day={currentDate}
        onNext={next}
        onPrev={prev}
        disableFuture={disableFuture}
      />
      <hr className="my-4 w-full border-b border-t-0 border-gray-200" />
      <div className="flex">
        <div className="flex w-[269px] flex-wrap">
          <WeekDays />
          {days.map((day, index) => (
            <a
              key={index}
              onClick={() => handleClick(day)}
              className={`my-1 flex h-[32px] min-w-[calc(100%/7)] w-[calc(100%/7)] items-center justify-center text-center ${styles(
                day,
                value.endAt
              )}`}
            >
              <span
                data-selected={
                  (day.isBeginRange || day.isEndRange) && !isToday(day.fullDay)
                }
                className={`flex h-[32px] w-[32px] items-center justify-center rounded-full text-sm data-[selected=true]:bg-gray-300 data-[selected=true]:text-white-000 ${
                  isToday(day.fullDay) && "bg-gray-400 text-white-000"
                }
                ${
                  disableFuture && isFuture(day.fullDay)
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                }               
                                ${
                                  !day.isEmpty &&
                                  !isToday(day.fullDay) &&
                                  "border-gray-400 text-gray-500 hover:border hover:text-gray-400"
                                }`}
              >
                {day.day}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
