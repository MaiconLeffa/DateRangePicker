import { useEffect, useRef, useState } from "react";
import { CalendarProps, RangeProps } from "./types";
import { checkOutOfMaxRange, formatDate } from "./utils";
import { CalendarButton } from "./Button";
import { DatePicker } from "./DatePicker";
import React from "react";

export function DateRangePicker({
  value = null,
  disableFuture,
  onChange,
  maxRange = 367,
  waitForApply = true
}: CalendarProps) {
  const firstInteraction = useRef(true);
  const [showPicker, setShowPicker] = useState(false);
  const [range, setRange] = useState<RangeProps>({
    startAt: null,
    endAt: null
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
      const _range = { startAt: value, endAt: null };
      setRange(_range);
      if (!waitForApply) onChange(_range);
    } else {
      firstInteraction.current = true;
      let _range = { ...range };

      if (_range.startAt && value.getTime() < _range?.startAt?.getTime()) {
        _range = { startAt: value, endAt: _range?.startAt };
      } else {
        _range = { ..._range, endAt: value };
      }

      setRange(_range);
      if (!waitForApply) onChange(_range);
    }
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
            <div className="absolute top-full z-[101] overflow-hidden rounded-lg border border-gray-100 bg-white p-6 shadow-lg">
              <DatePicker
                value={range}
                onSelect={handleOnSelect}
                disableFuture={disableFuture}
              />

              <hr className="my-4 border-0 border-b border-gray-100" />

              <div className="flex gap-2">
                <button type="submit" onClick={hidePicker}>
                  <span className="text-gray-500">Cancelar</span>
                </button>
                <button
                  type="submit"
                  onClick={apply}
                  className="ml-auto"
                  disabled={checkOutOfMaxRange(range, maxRange)}
                >
                  <span className="text-gray-500">Aplicar</span>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
