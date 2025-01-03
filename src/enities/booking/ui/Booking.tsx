"use client";

import { useEffect, useRef, useState } from "react";

import clsx from "clsx";

import styles from "./styles.module.scss";

import { useScroll } from "@/src/app/providers/ScrollProvider";
import {
  resetDetails,
  selectExcursionIsEditing,
  setDetails,
  setIsEditing,
  setVisible,
} from "@/src/enities/booking";
import { selectBookingDetailsById } from "@/src/enities/booking/model/selectors";
import { selectIsItemInCart } from "@/src/enities/cart/model/selectors";
import { Calendar } from "@/src/enities/excursion/ui/detail/components/calendar/Calendar";
import { SelectGroup } from "@/src/enities/excursion/ui/detail/components/selectGroup/SelectGroup";
import { SelectPeoples } from "@/src/enities/excursion/ui/detail/components/selectPeoples/SelectPeoples";
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
  category: string;
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
  category,
}: Props) => {
  const isEditing = useAppSelector(selectExcursionIsEditing(id));
  const bookingRef = useRef<HTMLDivElement>(null);
  const isVisible = useOnScreen(bookingRef);
  const endTimes = getEndTime(startTime, duration);
  const dispatch = useAppDispatch();
  const bookingDetails = useAppSelector(selectBookingDetailsById(id));
  const targetRef = useScroll();
  const isItemExists = useAppSelector(selectIsItemInCart(id));
  const [isComponentLoaded, setIsComponentLoaded] = useState(false);

  useEffect(() => {
    setIsComponentLoaded(true);
  }, []);

  useEffect(() => {
    dispatch(
      setDetails({
        key: id,
        details: {
          service_type: type,
          service_id: id,
          title: title,
          slug,
          image_lqip: image.lqip,
          image_src: image.src,
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
  }, [id]);

  const handleClick = (time: string) => {
    if (id) {
      dispatch(setDetails({ key: id, details: { time: time } }));
    }
  };

  return (
    <div ref={bookingRef}>
      {isComponentLoaded && (!isItemExists || isEditing) && (
        <section className={styles.booking} ref={targetRef}>
          <div>
            <h2 className={styles.booking__title}>Выберите дату</h2>
            <Calendar prices={prices} id={id} />
          </div>
          {bookingDetails?.date && (
            <div>
              <h2 className={styles.booking__title}>Время</h2>
              <div className={styles.booking__timeGroup}>
                {startTime.map((time, i) => (
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
              {category === "group" ? (
                <SelectPeoples
                  id={id}
                  participants={bookingDetails.cart_item_options}
                />
              ) : (
                <SelectGroup
                  id={id}
                  groups={bookingDetails.cart_item_options}
                />
              )}
            </div>
          )}
        </section>
      )}
    </div>
  );
};
