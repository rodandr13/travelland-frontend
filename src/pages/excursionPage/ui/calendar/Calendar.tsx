"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
import { customHeader } from "./utils/customHeader";
import { isSelectableDate } from "./utils/isSelectableDate";
import { customDay } from "./utils/customDay";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.scss";

registerLocale("ru", ru);

export const Calendar = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());

  return (
    <section>
      <DatePicker
        locale="ru"
        selected={startDate}
        onChange={(date: Date) => setStartDate(date)}
        monthsShown={2}
        inline
        fixedHeight
        disabledKeyboardNavigation
        renderCustomHeader={customHeader}
        renderDayContents={customDay}
        filterDate={isSelectableDate}
      />
    </section>
  );
};
