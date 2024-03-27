"use client";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import { ru } from "date-fns/locale/ru";
import {
  addDays,
  getDate, isTuesday, isWednesday, isFriday,
} from "date-fns";
registerLocale("ru", ru);
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.scss";
import { customHeader } from "@/src/pages/excursionPage/ui/calendar/customHeader";

export const Calendar = () => {
  const [startDate, setStartDate] = useState(new Date());
  const isSelectableDate = (date) => {
    const today = new Date();
    const sixtyDaysLater = addDays(today, 60);

    return (
      date >= today &&
      date <= sixtyDaysLater &&
      (isTuesday(date) || isWednesday(date) || isFriday(date))
    );
  };


  const renderDayContents = (day, date) => {
    const tooltipText = `Tooltip for date: ${date}`;
    const showPrice = isSelectableDate(date);
    const highlightClass = showPrice ? "react-datepicker__day_highlight" : "";
    return (
      <div className={`react-datepicker__priceContainer`} title={tooltipText}>
        <span className="react-datepicker__dayValue">{getDate(date)}</span>
        {showPrice && <span className="react-datepicker__price">€ 254.90</span>}
      </div>
    );
  };

  return (
    <section>
      <DatePicker
        locale="ru"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        monthsShown={2}
        inline
        fixedHeight
        disabledKeyboardNavigation
        renderCustomHeader={customHeader}
        renderDayContents={renderDayContents}
        filterDate={isSelectableDate}
      />
    </section>
  );
};
