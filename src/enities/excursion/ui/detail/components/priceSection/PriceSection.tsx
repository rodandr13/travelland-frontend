"use client";

import { useEffect, useState } from "react";

import clsx from "clsx";
import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
import Link from "next/link";

import { useScroll } from "@/app/providers/ScrollProvider";
import { selectVisibility } from "@/enities/booking";
import { selectBookingDetailsById } from "@/enities/booking/model/selectors";
import {
  selectIsItemInCart,
  selectItemById,
} from "@/enities/cart/model/selectors";
import { AddToCart } from "@/features/addToCart";
import { EditExcursion } from "@/features/editExcursion";
import { RemoveFromCart } from "@/features/removeFromCart";
import { formatCurrency } from "@/shared/lib/formatCurrency";
import { useAppSelector } from "@/shared/lib/redux/hooks";
import { CategoryKey } from "@/shared/types/excursion";
import { Button } from "@/shared/ui/button";
import { PriceBlock } from "@/shared/ui/priceBlock";

import styles from "./styles.module.scss";

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
  const bookingIsVisible = useAppSelector(selectVisibility());
  const bookingItem = useAppSelector(selectBookingDetailsById(id));
  const isItemExists = useAppSelector(selectIsItemInCart(id));
  const cartItem = useAppSelector(selectItemById(id));
  const { node } = useScroll();

  const [blockState, setBlockState] = useState({
    showPreview: true,
    showPrice: false,
    animationClass: "",
  });

  const categoryPrice =
    category === CategoryKey.Group ? "за 1 взрослого" : "за группу";

  const handleScroll = () => {
    node?.scrollIntoView({ behavior: "smooth" });
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

  const activeItem =
    bookingItem?.cart_item_options?.length != null ? bookingItem : cartItem;

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
            {activeItem?.date && (
              <h3 className={styles.priceSection__title}>
                {format(new Date(activeItem.date), "d MMMM yyyy", {
                  locale: ru,
                })}
              </h3>
            )}
            {activeItem?.time && (
              <p className={styles.priceSection__subtitle}>
                Начало в {activeItem.time} часов
              </p>
            )}
          </div>
          {activeItem?.cart_item_options &&
            activeItem.cart_item_options.length > 0 && (
              <>
                <ul className={styles.priceSection__list}>
                  {activeItem.cart_item_options.map((participant, i) =>
                    participant.quantity ? (
                      <li className={styles.priceSection__item} key={i}>
                        <div className={styles.priceSection__priceLine}>
                          <span>{participant.quantity}&nbsp;x&nbsp;</span>
                          <span>
                            {participant.category_title}&nbsp;(
                            {formatCurrency(participant.current_price)})&nbsp;
                          </span>
                          <span
                            className={styles.priceSection__dottedLine}
                          ></span>
                          <span className={styles.priceSection__priceSum}>
                            <span
                              className={styles.priceSection__priceSum_base}
                            >
                              {participant.base_price !==
                                participant.current_price &&
                                formatCurrency(
                                  participant.base_price * participant.quantity
                                )}
                            </span>
                            <span
                              className={styles.priceSection__priceSum_current}
                            >
                              {formatCurrency(
                                participant.current_price * participant.quantity
                              )}
                            </span>
                          </span>
                        </div>
                        <span className={styles.priceSection__caption}>
                          ({participant.category_description})
                        </span>
                      </li>
                    ) : null
                  )}
                </ul>
                <div>
                  <span className={styles.priceSection__caption}>К оплате</span>
                  <PriceBlock
                    parent="priceSection"
                    currentPrice={activeItem?.total_current_price}
                    basePrice={activeItem?.total_base_price}
                    size="m"
                    actualPrice
                  />
                </div>
              </>
            )}

          {!isItemExists && bookingItem ? (
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
            <>
              <EditExcursion id={id} handleScroll={handleScroll} />
              <RemoveFromCart itemId={id} />
            </>
          )}
        </section>
      )}
    </>
  );
};
