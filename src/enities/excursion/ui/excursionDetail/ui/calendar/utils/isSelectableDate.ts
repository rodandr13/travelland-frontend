import { addDays, isFriday, isTuesday, isWednesday } from "date-fns";

export const isSelectableDate = (date: Date) => {
  const today = new Date();
  const sixtyDaysLater = addDays(today, 60);

  return (
    date >= today &&
    date <= sixtyDaysLater &&
    (isTuesday(date) || isWednesday(date) || isFriday(date))
  );
};
