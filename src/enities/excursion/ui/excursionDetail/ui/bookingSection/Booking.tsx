"use client";

import styles from "./styles.module.scss";
import { Calendar } from "../calendar";
import clsx from "clsx";
import { SelectPeoples } from "../selectPeoples";
import {
  Dates,
  Duration,
  Price,
  PromotionalPrice,
  StartTime,
  Weekdays,
} from "@/src/enities/excursion/model/types/ExcursionDetail";
import { PricesMap } from "@/src/shared/types/excursion";
import { getEndTime } from "@/src/shared/lib/getEndTime";

interface Props {
  duration: Duration;
  weekdays: Weekdays;
  startTime: StartTime;
  basePrices: Price[];
  promoPrices?: PromotionalPrice[];
  dates: Dates;
  prices: PricesMap;
}

export const Booking = ({
  duration,
  basePrices,
  promoPrices,
  weekdays,
  startTime,
  dates,
  prices,
}: Props) => {
  const endTimes = getEndTime(startTime, duration);
  return (
    <section className={styles.booking}>
      <div>
        <h2 className={styles.booking__title}>Выберите дату</h2>
        <Calendar
          prices={prices}
          basePrices={basePrices}
          weekdays={weekdays}
          dates={dates}
        />
      </div>
      <div>
        <h2 className={styles.booking__title}>Время</h2>
        <div className={styles.booking__timeGroup}>
          {startTime &&
            startTime.map((time, i) => (
              <button key={i} className={styles.time}>
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
                    className={clsx(styles.time__title, styles.time__title_end)}
                  >
                    Конец
                  </span>
                  <span
                    className={clsx(styles.time__value, styles.time__value_end)}
                  >
                    ≈{endTimes[i]}
                  </span>
                </div>
              </button>
            ))}
        </div>
      </div>
      <div>
        <h2 className={styles.booking__title}>Количество человек</h2>
        <SelectPeoples prices={prices.get("20-05-2024")} />
      </div>
    </section>
  );
};
