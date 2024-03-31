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
import { useWindowWidth } from "@/src/shared/lib/hooks/useWindowWidth";

registerLocale("ru", ru);

export const Calendar = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const pageWidth = useWindowWidth();
  const monthsShown = 2;

  return (
    <section className={styles.calendar}>
      <DatePicker
        locale="ru"
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        monthsShown={monthsShown}
        inline
        disabledKeyboardNavigation
        renderCustomHeader={(props) => (
          <CustomHeader {...props} {...{ monthShown: monthsShown }} />
        )}
        renderDayContents={CustomDay}
        filterDate={isSelectableDate}
      />
    </section>
  );
};
