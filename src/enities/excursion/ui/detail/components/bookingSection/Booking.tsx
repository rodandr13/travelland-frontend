"use client";

import { useEffect, useRef } from "react";

import clsx from "clsx";
import { usePathname } from "next/navigation";

import {
  Dates,
  Duration,
  Price,
  StartTime,
  Weekdays,
} from "@/src/enities/excursion/model/types/ExcursionDetail";
import {
  setDetails,
  setVisible,
} from "@/src/enities/excursion/ui/detail/components/bookingSection/model/bookingSlice";
import { selectDetailsByKey } from "@/src/enities/excursion/ui/detail/components/bookingSection/model/selectors";
import { getEndTime } from "@/src/shared/lib/getEndTime";
import { useOnScreen } from "@/src/shared/lib/hooks/useOnScreen";
import { useAppDispatch, useAppSelector } from "@/src/shared/lib/redux/hooks";
import { PricesMap } from "@/src/shared/types/booking";

import styles from "./styles.module.scss";
import { Calendar } from "../calendar/Calendar";
import { SelectPeoples } from "../selectPeoples/SelectPeoples";

interface Props {
  duration: Duration;
  weekdays: Weekdays;
  startTime: StartTime;
  basePrices: Price[];
  dates: Dates;
  prices: PricesMap;
}

export const Booking = ({ duration, basePrices, startTime, prices }: Props) => {
  const bookingRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(bookingRef);
  const endTimes = getEndTime(startTime, duration);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const bookingDetails = useAppSelector(selectDetailsByKey(pathname as string));

  useEffect(() => {
    dispatch(setVisible(isVisible));
  }, [dispatch, isVisible]);

  const handleClick = (time: string) => {
    if (pathname) {
      dispatch(setDetails({ key: pathname, details: { time: time } }));
    }
  };

  return (
    <section className={styles.booking} ref={bookingRef}>
      <div>
        <h2 className={styles.booking__title}>Выберите дату</h2>
        <Calendar prices={prices} basePrices={basePrices} />
      </div>
      {bookingDetails?.selectedDate && (
        <div>
          <h2 className={styles.booking__title}>Время</h2>
          <div className={styles.booking__timeGroup}>
            {startTime &&
              startTime.map((time, i) => (
                <div
                  key={i}
                  className={clsx(styles.time, {
                    [styles.time_active]: bookingDetails?.time === time,
                  })}
                  onClick={() => handleClick(time)}
                >
                  <div className={styles.time__container}>
                    <span className={styles.time__title}>Начало</span>
                    <span className={styles.time__value}>{time}</span>
                  </div>
                  <div
                    className={clsx(
                      styles.time__container,
                      styles.time__container_end
                    )}
                  >
                    <span
                      className={clsx(
                        styles.time__title,
                        styles.time__title_end
                      )}
                    >
                      Конец
                    </span>
                    <span
                      className={clsx(
                        styles.time__value,
                        styles.time__value_end
                      )}
                    >
                      ≈{endTimes[i]}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {bookingDetails?.time && (
        <div>
          <h2 className={styles.booking__title}>Количество человек</h2>
          <SelectPeoples prices={prices} />
        </div>
      )}
    </section>
  );
};
