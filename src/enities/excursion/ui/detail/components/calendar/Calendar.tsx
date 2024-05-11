"use client";

import { ru } from "date-fns/locale/ru";
import { usePathname } from "next/navigation";
import DatePicker, { registerLocale } from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "./datepicker.scss";

import { Price } from "@/src/enities/excursion/model/types/ExcursionDetail";
import { setDetails } from "@/src/enities/excursion/ui/detail/components/bookingSection/model/bookingSlice";
import { selectDateByKey } from "@/src/enities/excursion/ui/detail/components/bookingSection/model/selectors";
import { getFormattedDate } from "@/src/shared/lib/getFormattedDate";
import { useAppDispatch, useAppSelector } from "@/src/shared/lib/redux/hooks";
import { PricesMap } from "@/src/shared/types/booking";

import styles from "./styles.module.scss";
import { CustomDay } from "./utils/CustomDay";
import { CustomHeader } from "./utils/CustomHeader";

registerLocale("ru", ru);

interface Props {
  basePrices: Price[];
  prices: PricesMap;
}
export const Calendar = ({ basePrices, prices }: Props) => {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const monthsShown = 2;
  const selectedDate = useAppSelector(selectDateByKey(pathname as string));

  const handleChange = (date: Date) => {
    if (pathname) {
      dispatch(
        setDetails({
          key: pathname,
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
