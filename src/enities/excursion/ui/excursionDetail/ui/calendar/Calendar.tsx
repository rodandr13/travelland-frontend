"use client";

import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
import { CustomHeader } from "./utils/CustomHeader";
import { CustomDay } from "./utils/CustomDay";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.scss";
import styles from "./styles.module.scss";
import {
  Dates,
  Price,
  Weekdays,
} from "@/src/enities/excursion/model/types/ExcursionDetail";
import { format } from "date-fns";
import { PricesMap } from "@/src/shared/types/excursion";

registerLocale("ru", ru);

interface Props {
  dates: Dates;
  weekdays: Weekdays;
  basePrices: Price[];
  prices: PricesMap;
}
export const Calendar = ({ dates, weekdays, basePrices, prices }: Props) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const monthsShown = 2;
  return (
    <section className={styles.calendar}>
      <DatePicker
        locale="ru"
        selected={startDate}
        calendarClassName="calendar"
        onChange={(date: Date) => setStartDate(date)}
        monthsShown={monthsShown}
        inline
        disabledKeyboardNavigation
        renderCustomHeader={(props) => (
          <CustomHeader {...props} {...{ monthShown: monthsShown }} />
        )}
        renderDayContents={(dayNumber, day: Date) =>
          CustomDay({ dayNumber, day, basePrices, prices })
        }
        filterDate={(day) => prices.has(format(day, "dd-MM-yyyy"))}
      />
    </section>
  );
};
