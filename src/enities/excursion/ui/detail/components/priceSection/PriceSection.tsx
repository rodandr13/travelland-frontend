"use client";

import { useEffect, useState } from "react";

import clsx from "clsx";
import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
import Link from "next/link";

import { useScroll } from "@/src/app/providers/ScrollProvider";
import { isItemExistInCart } from "@/src/enities/cart";
import { setIsEditing } from "@/src/enities/excursion/ui/detail/components/bookingSection/model/bookingSlice";
import {
  selectDetailsByKey,
  selectExcursionIsEditing,
  selectVisibility,
} from "@/src/enities/excursion/ui/detail/components/bookingSection/model/selectors";
import { AddToCart } from "@/src/features/addToCart";
import { formatCurrency } from "@/src/shared/lib/formatCurrency";
import { useAppDispatch, useAppSelector } from "@/src/shared/lib/redux/hooks";
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
  const itemExists = isItemExistInCart(id);
  const isEditing = useAppSelector(selectExcursionIsEditing(id));
  const [showBlockPreview, setShowBlockPreview] = useState(true);
  const [showBlockPrice, setShowBlockPrice] = useState(false);
  const [animationClassPreview, setAnimationClassPreview] = useState("");
  const [animationClassPrice, setAnimationClassPrice] = useState("");
  const dispatch = useAppDispatch();
  const targetRef = useScroll();

  const handleScroll = () => {
    targetRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");

    const handleResize = (event?: MediaQueryListEvent) => {
      const matches = event ? event.matches : mediaQuery.matches;

      if (!matches) {
        if (bookingIsVisible || itemExists) {
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
          <Button
            title="Бронировать"
            variant="booking"
            onClick={handleScroll}
          />
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
            {bookingDetails?.selectedTime && (
              <p className={styles.priceSection__subtitle}>
                Начало в {bookingDetails.selectedTime}
              </p>
            )}
          </div>
          {bookingDetails?.participants &&
            bookingDetails.selectedTime &&
            bookingDetails.participants.length > 0 && (
              <ul className={styles.priceSection__list}>
                {bookingDetails.participants.map((participant, i: number) => {
                  if (participant && participant.count) {
                    return (
                      <li className={styles.priceSection__item} key={i}>
                        <div className={styles.priceSection__priceLine}>
                          <span>{participant.count}&nbsp;x&nbsp;</span>
                          <span>
                            {participant.title}&nbsp;(
                            {formatCurrency(participant.currentPrice)})&nbsp;
                          </span>
                          <span
                            className={styles.priceSection__dottedLine}
                          ></span>
                          <span className={styles.priceSection__priceSum}>
                            {formatCurrency(
                              participant.currentPrice * participant.count
                            )}
                          </span>
                        </div>
                        <span className={styles.priceSection__caption}>
                          ({participant.description})
                        </span>
                      </li>
                    );
                  }
                  return null;
                })}
              </ul>
            )}
          <div>
            <span className={styles.priceSection__caption}>К оплате</span>
            <PriceBlock
              parent="priceSection"
              price={bookingDetails?.totalCurrentPrice}
              size="m"
              actualPrice
            />
          </div>
          {!itemExists ? (
            <AddToCart cartItem={bookingDetails} />
          ) : (
            <Link href="/cart" className={styles.priceSection__link_cart}>
              Перейти в корзину
            </Link>
          )}
          {itemExists &&
            (!isEditing ? (
              <Button
                title="Редактировать"
                onClick={() => dispatch(setIsEditing({ key: id, value: true }))}
              />
            ) : (
              <Button
                title="Сохранить изменения"
                onClick={() => {
                  dispatch(setIsEditing({ key: id, value: false }));
                }}
              />
            ))}
        </section>
      )}
    </>
  );
};
