import { DayProps } from "./types";

export const dayVariants = {
  isEmptyNotInRange: "pointer-events-none text-grey-300",
  isEmptyInRangeNotOnEdges: "pointer-events-none text-grey-300 bg-gray-100",
  isEmptyInRangeOnLeftEdge:
    "pointer-events-none text-grey-300 bg-gray-100 rounded-l-full",
  isEmptyInRangeOnRightEdge:
    "pointer-events-none text-grey-300 bg-gray-100 rounded-r-full",
  isInRangeAndNotOnEdges: "bg-gray-100",
  isInRangeAndInRightEdge: "bg-gray-100 rounded-r-full",
  isInRangeAndInLeftEdgeAndNotSelected: "bg-gray-100 rounded-l-full",
  isEndDateAndNotSameDateAsBegin:
    "rounded-r-full bg-gradient-to-r from-gray-100 to-transparent",
  isBeginDateAndEndDateNotNullAndDatesNotSame:
    "rounded-l-full bg-gradient-to-l from-gray-100 to-transparent"
};

export function styles(day: DayProps, endAt?: Date | null) {
  const isEmptyAndNotInRange =
    day.isEmpty &&
    !day.isInBetweenRange &&
    !day.isBeginRange &&
    !day.isEndRange;
  if (isEmptyAndNotInRange) return dayVariants.isEmptyNotInRange;

  const isEmptyAndInRangeNotOnEdges =
    day.isEmpty &&
    day.isInBetweenRange &&
    !day.isOnEdgeLeft &&
    !day.isOnEdgeRight;
  if (isEmptyAndInRangeNotOnEdges) return dayVariants.isEmptyInRangeNotOnEdges;

  const isEmptyAndInRangeAndOnLeftEdge =
    day.isEmpty && day.isInBetweenRange && day.isOnEdgeLeft;
  if (isEmptyAndInRangeAndOnLeftEdge)
    return dayVariants.isEmptyInRangeOnLeftEdge;

  const isEmptyAndInRangeAndOnRightEdge =
    day.isEmpty && day.isInBetweenRange && day.isOnEdgeRight;
  if (isEmptyAndInRangeAndOnRightEdge)
    return dayVariants.isEmptyInRangeOnRightEdge;

  const isInRangeAndNotOnEdges =
    day.isInBetweenRange && !day.isOnEdgeLeft && !day.isOnEdgeRight;
  if (isInRangeAndNotOnEdges) return dayVariants.isInRangeAndNotOnEdges;

  const isInRangeAndInRightEdge = day.isInBetweenRange && day.isOnEdgeRight;
  if (isInRangeAndInRightEdge) return dayVariants.isInRangeAndInRightEdge;

  const isInRangeAndInLeftEdgeAndNotSelected =
    day.isInBetweenRange &&
    day.isOnEdgeLeft &&
    (!day.isBeginRange || !day.isEndRange);
  if (isInRangeAndInLeftEdgeAndNotSelected)
    return dayVariants.isInRangeAndInLeftEdgeAndNotSelected;

  const isEndSelectedDateAndNotSameDateAsBegin =
    day.isEndRange && !day.isOnEdgeLeft && day.isBeginRange !== day.isEndRange;
  if (isEndSelectedDateAndNotSameDateAsBegin)
    return dayVariants.isEndDateAndNotSameDateAsBegin;

  const isBeginSelectedDateAndEndDateNotNullAndDatesNotSame =
    day.isBeginRange &&
    endAt &&
    day.isBeginRange !== day.isEndRange &&
    !day.isOnEdgeRight;
  if (isBeginSelectedDateAndEndDateNotNullAndDatesNotSame)
    return dayVariants.isBeginDateAndEndDateNotNullAndDatesNotSame;

  return "";
}
