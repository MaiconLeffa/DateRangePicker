import { useEffect, useRef, useState } from "react";
import { CalendarProps, RangeProps } from "./types";
import { checkOutOfMaxRange, formatDate } from "./utils";
import { CalendarButton } from "./Button";
import { DatePicker } from "./DatePicker";
import React from "react";

export function RangeDatePicker({
  value = null,
  disableFuture,
  onChange,
  maxRange = 367
}: CalendarProps) {
  const firstInteraction = useRef(true);
  const [showPicker, setShowPicker] = useState(false);
  const [range, setRange] = useState<RangeProps>({
    startAt: null,
    endAt: null,
    type: "custom"
  });

  useEffect(() => {
    if (value) setRange(value);
  }, [value, showPicker]);

  useEffect(() => {
    if (value) onChange(value);
  }, []);

  function openPicker() {
    setShowPicker(true);
  }

  function hidePicker() {
    setShowPicker(false);
  }

  function handleOnSelect(value: Date) {
    if (firstInteraction.current) {
      firstInteraction.current = false;
      setRange({ startAt: value, endAt: null, type: "custom" });
    } else {
      firstInteraction.current = true;
      setRange((prev) => {
        if (prev.startAt && value.getTime() < prev?.startAt?.getTime()) {
          return { startAt: value, endAt: prev?.startAt, type: "custom" };
        }
        return { ...prev, endAt: value, type: "custom" };
      });
    }
  }

  function handleFilter(value: RangeProps) {
    firstInteraction.current = true;
    setRange(value);
  }

  function apply() {
    if (!range.endAt) {
      const _range = { ...range, endAt: range.startAt };
      setRange(_range);
      onChange(_range);
      firstInteraction.current = true;
    } else {
      onChange(range);
    }

    hidePicker();
  }

  return (
    <div className="flex w-full flex-col gap-1">
      <div className="relative w-full">
        <CalendarButton onClick={openPicker} value={formatDate(range)} />
        {showPicker && (
          <>
            <div
              className="fixed left-0 top-0 z-[100] h-screen w-screen"
              onClick={hidePicker}
            />
            <div className="absolute top-full z-[101] overflow-hidden rounded-lg border border-grey-100 bg-white-000 p-6 shadow-lg">
              <DatePicker
                value={range}
                onSelect={handleOnSelect}
                disableFuture={disableFuture}
              />

              <hr className="my-4 border-0 border-b border-grey-100" />

              <div className="flex gap-2">
                <button type="submit" onClick={hidePicker}>
                  <span>Cancelar</span>
                </button>
                <button
                  type="submit"
                  onClick={apply}
                  disabled={checkOutOfMaxRange(range, maxRange)}
                >
                  <span>Aplicar</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
