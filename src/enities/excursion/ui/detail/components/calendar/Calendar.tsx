"use client";

import { ru } from "date-fns/locale/ru";
import DatePicker, { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.scss";

import styles from "./styles.module.scss";
import { CustomDay } from "./utils/CustomDay";
import { CustomHeader } from "./utils/CustomHeader";

import { setDetails } from "@/src/enities/booking";
import { selectBookingDetailsById } from "@/src/enities/booking/model/selectors";
import { getFormattedDate } from "@/src/shared/lib/getFormattedDate";
import { useAppDispatch, useAppSelector } from "@/src/shared/lib/redux/hooks";
import { PricesMap } from "@/src/shared/types/booking";

registerLocale("ru", ru);

interface Props {
  prices: PricesMap;
  id: string;
}

export const Calendar = ({ prices, id }: Props) => {
  const dispatch = useAppDispatch();
  const monthsShown = 2;
  const bookingDetails = useAppSelector(selectBookingDetailsById(id));
  const selectedDate = bookingDetails.date;

  const handleChange = (date: Date | null) => {
    if (id && date) {
      const currentParticipants = selectedDate
        ? bookingDetails?.cart_item_options
        : undefined;

      dispatch(
        setDetails({
          key: id,
          details: {
            date: date.toString(),
            cart_item_options:
              currentParticipants || prices.get(getFormattedDate(date)),
          },
        })
      );
    }
  };

  const parsedDate = selectedDate ? new Date(selectedDate) : null;
  const validDate =
    parsedDate && !isNaN(parsedDate.getTime()) ? parsedDate : null;

  return (
    <section className={styles.calendar}>
      <DatePicker
        locale="ru"
        selected={validDate}
        calendarClassName="calendar"
        onChange={handleChange}
        monthsShown={monthsShown}
        inline
        disabledKeyboardNavigation
        renderCustomHeader={(props) => (
          <CustomHeader {...props} {...{ monthShown: monthsShown }} />
        )}
        renderDayContents={(dayNumber, day: Date) =>
          CustomDay({
            dayNumber,
            prices: prices.get(getFormattedDate(day)),
          })
        }
        filterDate={(day) => prices.has(getFormattedDate(day))}
      />
    </section>
  );
};
