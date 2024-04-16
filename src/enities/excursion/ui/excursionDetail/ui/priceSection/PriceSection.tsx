"use client";

import styles from "./styles.module.scss";
import { PriceBlock } from "@/src/shared/ui/priceBlock";
import { Button } from "@/src/shared/ui/button";
import { useAppSelector } from "@/src/shared/lib/redux/hooks";
import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  selectDetailsByKey,
  selectVisibility,
} from "@/src/enities/excursion/ui/excursionDetail/ui/bookingSection/model/selectors";
import { usePathname } from "next/navigation";
import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
import { calculateTotalPrice } from "@/src/shared/lib/calculateTotalPrice";

interface Props {
  minPrice: number | undefined;
  basePrice: number | undefined;
}

export const PriceSection = ({ minPrice, basePrice }: Props) => {
  const pathname = usePathname();
  const bookingIsVisible = useAppSelector(selectVisibility);
  const bookingDetails = useAppSelector(selectDetailsByKey(pathname as string));
  const [showBlockPreview, setShowBlockPreview] = useState(true);
  const [showBlockPrice, setShowBlockPrice] = useState(false);
  const [animationClassPreview, setAnimationClassPreview] = useState("");
  const [animationClassPrice, setAnimationClassPrice] = useState("");

  useEffect(() => {
    if (bookingIsVisible) {
      if (showBlockPreview) {
        setAnimationClassPreview(styles.fadeOut);
        setTimeout(() => {
          setShowBlockPreview(false);
          setShowBlockPrice(true);
          setAnimationClassPrice(styles.fadeIn);
        }, 200);
      }
    } else {
      if (showBlockPrice) {
        setAnimationClassPrice(styles.fadeOut);
        setTimeout(() => {
          setShowBlockPrice(false);
          setShowBlockPreview(true);
          setAnimationClassPreview(styles.fadeIn);
        }, 200);
      }
    }
  }, [bookingIsVisible, showBlockPreview, showBlockPrice]);

  const priceProps =
    minPrice === basePrice
      ? { price: minPrice }
      : { price: minPrice, basePrice: basePrice };

  const totalPrice =
    bookingDetails?.prices && bookingDetails?.participants
      ? calculateTotalPrice(bookingDetails.prices, bookingDetails.participants)
      : 0;

  return (
    <>
      {showBlockPreview && (
        <section className={clsx(styles.priceSection, animationClassPreview)}>
          <div>
            <PriceBlock parent="priceSection" {...priceProps} size="m" />
            <p className={styles.priceSection__caption}>за 1 взрослого</p>
          </div>
          <ul className={styles.priceSection__advantages}>
            <li className={styles.priceSection__advantagesItem}>
              Лучшая цена гарантирована
            </li>
            <li className={styles.priceSection__advantagesItem}>
              Бесплатная отмена
            </li>
            <li className={styles.priceSection__advantagesItem}>
              Скидка 5% при оплате картой
            </li>
          </ul>
          <Button title="Бронировать" />
        </section>
      )}
      {showBlockPrice && (
        <section
          className={clsx(
            styles.priceSection,
            styles.priceSection_booking,
            animationClassPrice
          )}
        >
          <div>
            {bookingDetails?.selectedDate && (
              <h3 className={styles.priceSection__title}>
                {format(new Date(bookingDetails.selectedDate), "dd MMMM yyyy", {
                  locale: ru,
                })}
              </h3>
            )}
            {bookingDetails?.time && (
              <p className={styles.priceSection__subtitle}>
                Начало в {bookingDetails.time}
              </p>
            )}
          </div>
          <ul className={styles.priceSection__list}>
            {bookingDetails?.prices &&
              bookingDetails?.participants &&
              bookingDetails.prices.prices.length > 0 &&
              bookingDetails.participants.length > 0 && (
                <ul className={styles.priceSection__list}>
                  {bookingDetails.prices.prices.map((price, i) => {
                    if (bookingDetails.participants[i]) {
                      return (
                        <li className={styles.priceSection__item} key={i}>
                          <div className={styles.priceSection__priceLine}>
                            <span>
                              {bookingDetails.participants[i]}&nbsp;x&nbsp;
                            </span>
                            <span>
                              {price.title}&nbsp;({price.price.toFixed(2)}
                              &nbsp;€)&nbsp;
                            </span>
                            <span
                              className={styles.priceSection__dottedLine}
                            ></span>
                            <span className={styles.priceSection__priceSum}>
                              {(
                                price.price * bookingDetails.participants[i]
                              ).toFixed(2)}
                              &nbsp;€
                            </span>
                          </div>
                          <span className={styles.priceSection__caption}>
                            ({price.description})
                          </span>
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              )}
          </ul>
          <div>
            <span className={styles.priceSection__caption}>К оплате</span>
            <PriceBlock
              parent="priceSection"
              price={totalPrice}
              size="m"
              actualPrice
            />
          </div>
          <Button
            title={
              !bookingDetails?.selectedDate
                ? "Выберите дату"
                : !bookingDetails?.time
                  ? "Выберите время"
                  : !bookingDetails?.participants ||
                      bookingDetails.participants.length === 0
                    ? "Укажите количество человек"
                    : "Бронировать"
            }
            disabled={
              !bookingDetails?.selectedDate ||
              !bookingDetails?.time ||
              !bookingDetails?.participants ||
              bookingDetails.participants.length === 0
            }
          />
        </section>
      )}
    </>
  );
};
