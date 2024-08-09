"use client";

import { useEffect, useState } from "react";

import clsx from "clsx";
import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
import Link from "next/link";

import { selectCartItemExists } from "@/src/enities/cart/model/selectors";
import {
  selectDetailsByKey,
  selectVisibility,
} from "@/src/enities/excursion/ui/detail/components/bookingSection/model/selectors";
import { AddToCart } from "@/src/features/addToCart";
import { calculateTotalPrice } from "@/src/shared/lib/calculateTotalPrice";
import { formatCurrency } from "@/src/shared/lib/formatCurrency";
import { useAppSelector } from "@/src/shared/lib/redux/hooks";
import { Price } from "@/src/shared/types/booking";
import { Button } from "@/src/shared/ui/button";
import { PriceBlock } from "@/src/shared/ui/priceBlock";

import styles from "./styles.module.scss";

interface Props {
  minPrice: number | undefined;
  basePrice: number | undefined;
  title?: string;
  id: string;
}

export const PriceSection = ({ minPrice, basePrice, title, id }: Props) => {
  const bookingIsVisible = useAppSelector(selectVisibility);
  const bookingDetails = useAppSelector(selectDetailsByKey(id));
  const itemExists = useAppSelector(selectCartItemExists(id));
  const [showBlockPreview, setShowBlockPreview] = useState(true);
  const [showBlockPrice, setShowBlockPrice] = useState(false);
  const [animationClassPreview, setAnimationClassPreview] = useState("");
  const [animationClassPrice, setAnimationClassPrice] = useState("");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");

    const handleResize = (event?: MediaQueryListEvent) => {
      const matches = event ? event.matches : mediaQuery.matches;

      if (!matches) {
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
      } else {
        setShowBlockPreview(false);
        setShowBlockPrice(true);
      }
    };

    mediaQuery.addEventListener("change", handleResize);

    handleResize();
    return () => mediaQuery.removeEventListener("change", handleResize);
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
            <span className={styles.priceSection__caption}>Экскурсия</span>
            <h3 className={styles.priceSection__title}>{title}</h3>
          </div>
          <div>
            {bookingDetails?.selectedDate && (
              <h3 className={styles.priceSection__title}>
                {format(new Date(bookingDetails.selectedDate), "d MMMM yyyy", {
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
                  {bookingDetails.prices.prices.map(
                    (price: Price, i: number) => {
                      if (bookingDetails.participants[i]) {
                        return (
                          <li className={styles.priceSection__item} key={i}>
                            <div className={styles.priceSection__priceLine}>
                              <span>
                                {bookingDetails.participants[i].count}
                                &nbsp;x&nbsp;
                              </span>
                              <span>
                                {price.title}&nbsp;({price.price.toFixed(2)}
                                &nbsp;€)&nbsp;
                              </span>
                              <span
                                className={styles.priceSection__dottedLine}
                              ></span>
                              <span className={styles.priceSection__priceSum}>
                                {formatCurrency(
                                  price.price *
                                    bookingDetails.participants[i].count
                                )}
                              </span>
                            </div>
                            <span className={styles.priceSection__caption}>
                              ({price.description})
                            </span>
                          </li>
                        );
                      }
                      return null;
                    }
                  )}
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
          {!itemExists ? (
            <AddToCart bookingDetails={bookingDetails} id={id} />
          ) : (
            <Link href="/cart" className={styles.priceSection__link_cart}>
              Перейти в корзину
            </Link>
          )}
        </section>
      )}
    </>
  );
};
