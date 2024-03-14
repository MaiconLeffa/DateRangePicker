import { DayProps, RangeProps } from "./types";

export const weekDays = ["S", "T", "Q", "Q", "S", "S", "D"];

export function getLastdayOfMonth(currentDate: Date) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const date = new Date(year, month + 1, 1);
  date.setDate(date.getDate() - 1);
  return date;
}

export function getFirstDayMonth(currentDate: Date) {
  return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
}

export function isToday(currentDate?: Date) {
  if (!currentDate) return false;

  const d1 = currentDate.getDate();
  const d2 = currentDate.getMonth();
  const d3 = currentDate.getFullYear();
  const i = `${d1}${d2}${d3}`;

  const today = new Date();
  const t1 = today.getDate();
  const t2 = today.getMonth();
  const t3 = today.getFullYear();
  const i2 = `${t1}${t2}${t3}`;

  return i === i2;
}

export function mountMonth(currentDate: Date, range: RangeProps) {
  const begin = getFirstDayMonth(currentDate);
  const end = getLastdayOfMonth(currentDate);

  const d1: number = begin.getDate();
  const d2: number = end.getDate();

  const beginWeek = begin.getDay() == 0 ? 6 : begin.getDay() - 1;
  const endWeek = end.getDay() === 0 ? 0 : 7 - end.getDay();

  const startAt = range.startAt ? range.startAt.getTime() : 0;
  const endAt = range.endAt ? range.endAt.getTime() : 0;

  const days: DayProps[] = [];

  for (let i = 0; i < beginWeek; i++) {
    const past = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      d1 - (beginWeek - i)
    );

    const weekDay = past.getDay();
    const dayTime = past.getTime();

    days.push({
      isEmpty: true,
      day: past.getDate(),
      isInBetweenRange: dayTime > startAt && dayTime < endAt,
      isBeginRange: dayTime === startAt,
      isEndRange: dayTime === endAt,
      isOnEdgeRight: weekDay == 0,
      isOnEdgeLeft: weekDay == 1
    });
  }

  for (let i = d1; i <= d2; i++) {
    const fullDay = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      i,
      0,
      0,
      0,
      0
    );

    const weekDay = fullDay.getDay();
    const dayTime = fullDay.getTime();

    days.push({
      isEmpty: false,
      day: i,
      fullDay,
      isBeginRange: dayTime === startAt,
      isEndRange: dayTime === endAt,
      isInBetweenRange: dayTime > startAt && dayTime < endAt,
      isOnEdgeRight: weekDay == 0,
      isOnEdgeLeft: weekDay == 1
    });
  }

  for (let i = 0; i < endWeek; i++) {
    const future = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      d2 + i + 1
    );

    const weekDay = future.getDay();
    const dayTime = future.getTime();

    days.push({
      isEmpty: true,
      day: future.getDate(),
      isBeginRange: dayTime === startAt,
      isEndRange: dayTime === endAt,
      isInBetweenRange: dayTime > startAt && dayTime < endAt,
      isOnEdgeRight: weekDay == 0,
      isOnEdgeLeft: weekDay == 1
    });
  }

  return days;
}

export function mountDigits(length: number, begin = 0, maxValue: number) {
  const isNegative = begin - 3 < 0;
  let start = 0;

  if (isNegative) {
    start = maxValue - Math.abs(begin - 3);
  } else {
    start = begin - 3;
  }

  const arr: number[] = [];

  for (let index = 0; index < length; index++) {
    arr.push(start);
    start++;
    if (start > maxValue - 1) start = 0;
  }
  return arr;
}

function isSameMonth(start?: Date | null, end?: Date | null) {
  if (!start || !end) return false;

  const _start = `${start.getMonth()}-${start.getFullYear()}`;
  const _end = `${end.getMonth()}-${end.getFullYear()}`;
  return _start === _end;
}

function isSameDay(day1?: Date | null, day2?: Date | null) {
  if (!day1 || !day2) return false;
  return day1.getTime() === day2.getTime();
}

export function formatDate(range: RangeProps) {
  if (!range.startAt && !range.endAt) return "Último ano";
  if (range.startAt && !range.endAt) return "Insira a data final";

  if (range.startAt && isSameDay(range.startAt, range.endAt)) {
    const date = range.startAt;
    const day = date.toLocaleString("pt-br", { day: "2-digit" });
    const month = date.toLocaleString("pt-br", { month: "long" });
    const year = date.getFullYear();

    return `${day} de ${month} ${year}`;
  }

  if (range.startAt && isSameMonth(range.startAt, range.endAt)) {
    return range.startAt.toLocaleString("pt-br", {
      month: "long",
      year: "numeric"
    });
  }

  if (range.startAt && range.endAt) {
    const year = range.startAt.getFullYear();

    const month1 = range.startAt.toLocaleString("pt-br", {
      month: "short"
    });

    const month2 = range.endAt.toLocaleString("pt-br", {
      month: "short"
    });

    return `${month1}-${month2} ${year}`;
  }

  return "";
}

export function today() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}

export function isFuture(date?: Date) {
  if (!date) return false;
  return today().getTime() < date.getTime();
}

export function isCurrentMonth(date: Date) {
  const _date = new Date(date);
  _date.setHours(0, 0, 0, 0);
  _date.setDate(1);
  const _today = getFirstDayMonth(today());
  return _date.getTime() === _today.getTime();
}

export function checkOutOfMaxRange(range: RangeProps, maxRange: number) {
  if (!range.startAt && !range.endAt) return true;
  if (range.startAt && !range.endAt) return false;

  if (range.startAt && range.endAt) {
    const diff = range.endAt.getTime() - range.startAt.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24) + 1);
    return days > maxRange;
  }

  return false;
}
