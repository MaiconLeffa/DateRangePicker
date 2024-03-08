import { Dispatch, ReactNode } from "react";

export interface DayProps {
  day: number;
  isEmpty: boolean;
  fullDay?: Date;
  isBeginRange?: boolean;
  isEndRange?: boolean;
  isInBetweenRange?: boolean;
  isOnEdgeRight?: boolean;
  isOnEdgeLeft?: boolean;
}

export interface CalendarProps {
  value?: RangeProps | null;
  disableFuture?: boolean;
  maxRange?: number;
  onChange: (date: RangeProps) => void;
}

export interface RangeProps {
  startAt?: Date | null;
  endAt?: Date | null;
  type?: "custom" | "last-week" | "last-month" | "entire-period";
}

export interface DatePickerProps {
  value: RangeProps;
  onSelect: Dispatch<Date>;
  disableFuture?: boolean;
}

export interface DateInputProps extends React.HTMLAttributes<HTMLInputElement> {
  value: string;
  onClick: () => void;
}

export interface MonthTitleProps {
  day: Date;
  onNext: () => void;
  onPrev: () => void;
  disableFuture?: boolean;
}
