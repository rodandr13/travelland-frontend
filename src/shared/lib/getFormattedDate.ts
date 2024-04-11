import { format } from "date-fns";

export const getFormattedDate = (date: Date | string) => {
  return format(date, "yyyy-MM-dd");
};
