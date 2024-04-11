import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export const getFormattedWeekday = (day: Date) => {
  return format(day, "EEEE", { locale: enUS });
};
