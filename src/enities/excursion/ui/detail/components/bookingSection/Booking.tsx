"use client";

import { useEffect, useRef, useState } from "react";

import clsx from "clsx";

import { useScroll } from "@/src/app/providers/ScrollProvider";
import { isItemExistInCart } from "@/src/enities/cart";
import {
  setDetails,
  setIsEditing,
  setVisible,
} from "@/src/enities/excursion/ui/detail/components/bookingSection/model/bookingSlice";
import {
  selectDetailsByKey,
  selectExcursionIsEditing,
} from "@/src/enities/excursion/ui/detail/components/bookingSection/model/selectors";
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
import { Button } from "@/src/shared/ui/button";

import styles from "./styles.module.scss";
import { Calendar } from "../calendar/Calendar";
import { SelectPeoples } from "../selectPeoples/SelectPeoples";

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
  const [isItemInCart, setIsItemInCart] = useState(false);
  const isEditing = useAppSelector(selectExcursionIsEditing(id));
  const bookingRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useOnScreen(bookingRef);
  const endTimes = getEndTime(startTime, duration);
  const dispatch = useAppDispatch();
  const bookingDetails = useAppSelector(selectDetailsByKey(id));
  const itemExistsInCart = isItemExistInCart(id);
  const targetRef = useScroll();

  useEffect(() => {
    setIsItemInCart(isItemExistInCart(id));
  }, [id]);

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
  }, [id, title, image]);

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
      {isItemInCart && !isEditing ? (
        <>
          <h2>Экскурсия уже в корзине</h2>
          <Button
            title="Редактировать"
            onClick={() => dispatch(setIsEditing({ key: id, value: true }))}
          />
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
