"use client";

import { useEffect, useRef } from "react";

import clsx from "clsx";

import {
  resetDetails,
  setDetails,
  setVisible,
} from "@/src/enities/excursion/ui/detail/components/bookingSection/model/bookingSlice";
import { selectDetailsByKey } from "@/src/enities/excursion/ui/detail/components/bookingSection/model/selectors";
import { getEndTime } from "@/src/shared/lib/getEndTime";
import { useOnScreen } from "@/src/shared/lib/hooks/useOnScreen";
import { useAppDispatch, useAppSelector } from "@/src/shared/lib/redux/hooks";
import { Price, PricesMap } from "@/src/shared/types/booking";
import {
  Dates,
  Duration,
  GalleryImage,
  StartTime,
  Weekdays,
} from "@/src/shared/types/excursion";

import styles from "./styles.module.scss";
import { Calendar } from "../calendar/Calendar";
import { SelectPeoples } from "../selectPeoples/SelectPeoples";

interface Props {
  id: string;
  image: GalleryImage;
  duration: Duration;
  weekdays: Weekdays;
  startTime: StartTime;
  basePrices: Price[];
  dates: Dates;
  prices: PricesMap;
  title: string;
}

export const Booking = ({
  duration,
  basePrices,
  startTime,
  prices,
  id,
  title,
  image,
}: Props) => {
  const bookingRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(bookingRef);
  const endTimes = getEndTime(startTime, duration);
  const dispatch = useAppDispatch();
  const bookingDetails = useAppSelector(selectDetailsByKey(id as string));

  useEffect(() => {
    dispatch(resetDetails());
    dispatch(
      setDetails({
        key: id,
        details: {
          title: title,
          image: { src: image.src, lqip: image.lqip },
        },
      })
    );
  }, [id, title, image]);

  useEffect(() => {
    dispatch(setVisible(isVisible));
  }, [isVisible]);

  const handleClick = (time: string) => {
    if (id) {
      dispatch(setDetails({ key: id, details: { time: time } }));
    }
  };
  return (
    <section className={styles.booking} ref={bookingRef}>
      <div>
        <h2 className={styles.booking__title}>Выберите дату</h2>
        <Calendar prices={prices} basePrices={basePrices} id={id} />
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
          <SelectPeoples prices={prices} id={id} />
        </div>
      )}
    </section>
  );
};
