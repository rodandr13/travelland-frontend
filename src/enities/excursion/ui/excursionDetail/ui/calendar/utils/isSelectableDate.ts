import { format } from "date-fns";
import {
  Dates,
  Weekdays,
} from "@/src/enities/excursion/model/types/ExcursionDetail";
import { enUS } from "date-fns/locale";

interface Props {
  dates: Dates;
  weekdays: Weekdays;
  day: Date;
}
export const isSelectableDate = ({ day, dates, weekdays }: Props) => {
  if (!day || !dates || !weekdays) {
    return false;
  }
  const today = new Date();
  const dateFrom = new Date(dates.dateFrom);
  const dateTo = new Date(dates.dateTo);
  const dayOfWeek = format(day, "EEEE", { locale: enUS });
  return day >= dateFrom && day <= dateTo && weekdays.includes(dayOfWeek);
};
