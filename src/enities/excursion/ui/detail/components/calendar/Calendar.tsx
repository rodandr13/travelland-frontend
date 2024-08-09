"use client";

import { ru } from "date-fns/locale/ru";
import DatePicker, { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.scss";

import { setDetails } from "@/src/enities/excursion/ui/detail/components/bookingSection/model/bookingSlice";
import { selectDateByKey } from "@/src/enities/excursion/ui/detail/components/bookingSection/model/selectors";
import { getFormattedDate } from "@/src/shared/lib/getFormattedDate";
import { useAppDispatch, useAppSelector } from "@/src/shared/lib/redux/hooks";
import { Price, PricesMap } from "@/src/shared/types/booking";

import styles from "./styles.module.scss";
import { CustomDay } from "./utils/CustomDay";
import { CustomHeader } from "./utils/CustomHeader";

registerLocale("ru", ru);

interface Props {
  basePrices: Price[];
  prices: PricesMap;
  id: string;
}
export const Calendar = ({ basePrices, prices, id }: Props) => {
  const dispatch = useAppDispatch();
  const monthsShown = 2;
  const selectedDate = useAppSelector(selectDateByKey(id as string));

  const handleChange = (date: Date | null) => {
    if (id && date) {
      dispatch(
        setDetails({
          key: id,
          details: {
            selectedDate: date.toString(),
            prices: prices.get(getFormattedDate(date)),
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
          CustomDay({ dayNumber, day, basePrices, prices })
        }
        filterDate={(day) => prices.has(getFormattedDate(day))}
      />
    </section>
  );
};
