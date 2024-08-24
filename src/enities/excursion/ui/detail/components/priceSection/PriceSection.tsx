"use client";

import { useEffect, useState } from "react";

import clsx from "clsx";
import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
import Link from "next/link";

import { useScroll } from "@/src/app/providers/ScrollProvider";
import { selectDetailsByKey, selectVisibility } from "@/src/enities/booking";
import { itemExists, selectItemById } from "@/src/enities/cart/model/selectors";
import { AddToCart } from "@/src/features/addToCart";
import { EditExcursion } from "@/src/features/editExcursion";
import { formatCurrency } from "@/src/shared/lib/formatCurrency";
import { useAppSelector } from "@/src/shared/lib/redux/hooks";
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
  const bookingItem = useAppSelector(selectDetailsByKey(id));
  const isItemExists = useAppSelector((state) => itemExists(state, id));
  const cartItem = useAppSelector((state) => selectItemById(state, id));

  const [showBlockPreview, setShowBlockPreview] = useState(true);
  const [showBlockPrice, setShowBlockPrice] = useState(false);
  const [animationClassPreview, setAnimationClassPreview] = useState("");
  const [animationClassPrice, setAnimationClassPrice] = useState("");
  const targetRef = useScroll();

  const handleScroll = () => {
    targetRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");
    const handleResize = (event?: MediaQueryListEvent) => {
      const matches = event ? event.matches : mediaQuery.matches;

      if (!matches) {
        if (bookingIsVisible || isItemExists) {
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
  }, [bookingIsVisible, showBlockPreview, showBlockPrice, isItemExists]);

  const activeItem = bookingItem?.participants.length ? bookingItem : cartItem;

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
            {activeItem?.selectedDate && (
              <h3 className={styles.priceSection__title}>
                {format(new Date(activeItem.selectedDate), "d MMMM yyyy", {
                  locale: ru,
                })}
              </h3>
            )}
            {activeItem?.selectedTime && (
              <p className={styles.priceSection__subtitle}>
                Начало в {activeItem.selectedTime}
              </p>
            )}
          </div>
          {activeItem?.participants &&
            activeItem.selectedTime &&
            activeItem.participants.length > 0 && (
              <ul className={styles.priceSection__list}>
                {activeItem.participants.map((participant, i: number) => {
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
              price={activeItem?.totalCurrentPrice}
              size="m"
              actualPrice
            />
          </div>
          {!isItemExists ? (
            <AddToCart cartItem={bookingItem} />
          ) : (
            <Link href="/cart" className={styles.priceSection__link_cart}>
              Перейти в корзину
            </Link>
          )}
          {isItemExists && <EditExcursion id={id} />}
        </section>
      )}
    </>
  );
};
