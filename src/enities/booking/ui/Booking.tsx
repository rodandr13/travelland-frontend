"use client";

import { useEffect, useRef } from "react";

import clsx from "clsx";

import { useScroll } from "@/src/app/providers/ScrollProvider";
import {
  resetDetails,
  selectDetailsByKey,
  selectExcursionIsEditing,
  setDetails,
  setIsEditing,
  setVisible,
} from "@/src/enities/booking";
import { itemExists } from "@/src/enities/cart/model/selectors";
import { Calendar } from "@/src/enities/excursion/ui/detail/components/calendar/Calendar";
import { SelectPeoples } from "@/src/enities/excursion/ui/detail/components/selectPeoples/SelectPeoples";
import { EditExcursion } from "@/src/features/editExcursion";
import { getEndTime } from "@/src/shared/lib/getEndTime";
import { useOnScreen } from "@/src/shared/lib/hooks/useOnScreen";
import { useAppDispatch, useAppSelector } from "@/src/shared/lib/redux/hooks";
import { PricesMap } from "@/src/shared/types/booking";
import {
  Dates,
  Duration,
  GalleryImage,
  StartTime,
  Weekdays,
} from "@/src/shared/types/excursion";

import styles from "./styles.module.scss";

interface Props {
  id: string;
  image: GalleryImage;
  duration: Duration;
  weekdays: Weekdays;
  startTime: StartTime;
  dates: Dates;
  prices: PricesMap;
  title: string;
  type: string;
  slug: string;
}

export const Booking = ({
  duration,
  startTime,
  prices,
  id,
  title,
  image,
  type,
  slug,
}: Props) => {
  const isEditing = useAppSelector(selectExcursionIsEditing(id));
  const bookingRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(bookingRef);
  const endTimes = getEndTime(startTime, duration);
  const dispatch = useAppDispatch();
  const bookingDetails = useAppSelector(selectDetailsByKey(id));
  const targetRef = useScroll();
  const isItemExists = useAppSelector((state) => itemExists(state, id));

  useEffect(() => {
    dispatch(
      setDetails({
        key: id,
        details: {
          id,
          type,
          title: title,
          slug,
          image: { src: image.src, lqip: image.lqip },
        },
      })
    );
    return () => {
      dispatch(resetDetails());
    };
  }, [id, title, image, slug, type]);

  useEffect(() => {
    dispatch(setVisible(isVisible));
  }, [isVisible]);

  useEffect(() => {
    return () => {
      dispatch(setIsEditing({ key: id, value: false }));
    };
  }, []);

  const handleClick = (time: string) => {
    if (id) {
      dispatch(setDetails({ key: id, details: { selectedTime: time } }));
    }
  };
  return (
    <>
      {isItemExists && !isEditing ? (
        <>
          <h2>Экскурсия уже в корзине</h2>
          <EditExcursion id={id} />
        </>
      ) : (
        <section className={styles.booking} ref={bookingRef}>
          <div ref={targetRef}>
            <h2 className={styles.booking__title}>Выберите дату</h2>
            <Calendar prices={prices} id={id} />
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
                        [styles.time_active]:
                          bookingDetails?.selectedTime === time,
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

          {bookingDetails?.selectedTime && (
            <div>
              <h2 className={styles.booking__title}>Количество человек</h2>
              <SelectPeoples
                id={id}
                participants={bookingDetails.participants}
              />
            </div>
          )}
        </section>
      )}
    </>
  );
};
