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
import { CategoryKey } from "@/src/shared/types/excursion";

interface Props {
  minPrice: number | undefined;
  basePrice: number | undefined;
  title?: string;
  id: string;
  category: string;
}

export const PriceSection = ({
  minPrice,
  basePrice,
  title,
  id,
  category,
}: Props) => {
  const bookingIsVisible = useAppSelector(selectVisibility);
  const bookingItem = useAppSelector(selectDetailsByKey(id));
  const isItemExists = useAppSelector((state) => itemExists(state, id));
  const cartItem = useAppSelector((state) => selectItemById(state, id));
  const targetRef = useScroll();

  const [blockState, setBlockState] = useState({
    showPreview: true,
    showPrice: false,
    animationClass: "",
  });

  const categoryPrice =
    category === CategoryKey.Group ? "за 1 взрослого" : "за группу";

  const handleScroll = () => {
    targetRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 900px)");

    const handleResize = (event?: MediaQueryListEvent) => {
      const matches = event ? event.matches : mediaQuery.matches;

      if (matches) {
        setBlockState({
          showPreview: false,
          showPrice: true,
          animationClass: "",
        });
      } else if (bookingIsVisible || isItemExists) {
        setBlockState({
          showPreview: false,
          showPrice: true,
          animationClass: styles.fadeIn,
        });
      } else {
        setBlockState({
          showPreview: true,
          showPrice: false,
          animationClass: styles.fadeIn,
        });
      }
    };

    mediaQuery.addEventListener("change", handleResize);
    handleResize();

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, [bookingIsVisible, isItemExists]);

  const activeItem = bookingItem?.participants?.length ? bookingItem : cartItem;

  const priceProps =
    minPrice === basePrice
      ? { currentPrice: minPrice }
      : { currentPrice: minPrice, basePrice };

  return (
    <>
      {blockState.showPreview && (
        <section
          className={clsx(styles.priceSection, blockState.animationClass)}
        >
          <div>
            <PriceBlock parent="priceSection" {...priceProps} size="m" />
            <p className={styles.priceSection__caption}>{categoryPrice}</p>
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
      {blockState.showPrice && (
        <section
          className={clsx(
            styles.priceSection,
            styles.priceSection_booking,
            blockState.animationClass
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
                Начало в {activeItem.selectedTime} часов
              </p>
            )}
          </div>
          {activeItem?.participants && activeItem.participants.length > 0 && (
            <>
              <ul className={styles.priceSection__list}>
                {activeItem.participants.map((participant, i) =>
                  participant && participant.count ? (
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
                          <span className={styles.priceSection__priceSum_base}>
                            {participant.basePrice !==
                              participant.currentPrice &&
                              formatCurrency(
                                participant.basePrice * participant.count
                              )}
                          </span>
                          <span
                            className={styles.priceSection__priceSum_current}
                          >
                            {formatCurrency(
                              participant.currentPrice * participant.count
                            )}
                          </span>
                        </span>
                      </div>
                      <span className={styles.priceSection__caption}>
                        ({participant.description})
                      </span>
                    </li>
                  ) : null
                )}
              </ul>
              <div>
                <span className={styles.priceSection__caption}>К оплате</span>
                <PriceBlock
                  parent="priceSection"
                  currentPrice={activeItem?.totalCurrentPrice}
                  basePrice={activeItem?.totalBasePrice}
                  size="m"
                  actualPrice
                />
              </div>
            </>
          )}

          {!isItemExists ? (
            <AddToCart cartItem={bookingItem} />
          ) : (
            <Link
              href="/cart"
              className={clsx(styles.priceSection__link, "link_cart")}
            >
              Перейти в корзину
            </Link>
          )}
          {isItemExists && (
            <EditExcursion id={id} handleScroll={handleScroll} />
          )}
        </section>
      )}
    </>
  );
};
