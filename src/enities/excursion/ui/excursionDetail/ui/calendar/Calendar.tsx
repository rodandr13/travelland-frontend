"use client";

import { useState } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
import { CustomHeader } from "./utils/CustomHeader";
import { isSelectableDate } from "./utils/isSelectableDate";
import { CustomDay } from "./utils/CustomDay";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.scss";
import styles from "./styles.module.scss";
import {
  Dates,
  Price,
  Weekdays,
} from "@/src/enities/excursion/model/types/ExcursionDetail";

registerLocale("ru", ru);

interface Props {
  dates: Dates;
  weekdays: Weekdays;
  basePrices: Price[];
}
export const Calendar = ({ dates, weekdays, basePrices }: Props) => {
  const [startDate, setStartDate] = useState<Date>(new Date());
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
          CustomDay({ dayNumber, day, dates, weekdays, basePrices })
        }
        filterDate={(day) => isSelectableDate({ day, dates, weekdays })}
      />
    </section>
  );
};
