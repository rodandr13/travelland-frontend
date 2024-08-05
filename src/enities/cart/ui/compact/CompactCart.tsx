"use client";

import { useEffect, useRef, useState } from "react";

import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
import Image from "next/image";
import Link from "next/link";

import {
  getTotalPrice,
  getTotalQuantity,
  selectCartState,
} from "@/src/enities/cart/model/selectors";
import { formatCurrency } from "@/src/shared/lib/formatCurrency";
import { useAppSelector } from "@/src/shared/lib/redux/hooks";
import { urlFor } from "@/src/shared/lib/sanity/client";

import styles from "./styles.module.scss";

export const CompactCart = () => {
  const totalQuantity = useAppSelector(getTotalQuantity);
  const totalPrice = useAppSelector(getTotalPrice);
  const cart = useAppSelector(selectCartState);
  const [isDetailsVisible, setDetailsVisible] = useState(false);
  const detailsVisibilityTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (detailsVisibilityTimer.current !== null) {
        clearTimeout(detailsVisibilityTimer.current);
      }
    };
  }, []);

  const handleMouseLeave = () => {
    const timer = window.setTimeout(() => {
      setDetailsVisible(false);
    }, 200);
    detailsVisibilityTimer.current = timer;
  };

  const handleMouseEnter = () => {
    if (detailsVisibilityTimer.current !== null) {
      clearTimeout(detailsVisibilityTimer.current);
    }
    const timer = window.setTimeout(() => {
      setDetailsVisible(true);
    }, 100);
    detailsVisibilityTimer.current = timer;
  };

  return (
    <section
      className={styles.cart}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link href="/cart" className={styles.cart__link}>
        <p className={styles.cart__title}>
          Корзина <span>({formatCurrency(totalPrice)})</span>
        </p>
      </Link>
      <div className={styles.cart__totalQuantity}>{totalQuantity}</div>
      {Object.keys(cart.items).length > 0 && isDetailsVisible && (
        <div className={styles.cart__details}>
          <ul className={styles.cart__list}>
            {Object.entries(cart.items).map(([key, value], index) => (
              <li key={index} className={styles.cart__item}>
                <Image
                  className={styles.cart__image}
                  src={urlFor(value.image.src)}
                  blurDataURL={value.image.lqip}
                  alt=""
                  placeholder="blur"
                  loading="lazy"
                  quality={60}
                  width={50}
                  height={40}
                  sizes={"50px"}
                />
                <div className={styles.cart__textContainer}>
                  <h3 className={styles.cart__title}>{value.title}</h3>
                  <div className={styles.cart__dateContainer}>
                    <p className={styles.cart__date}>
                      {value.selectedDate &&
                        format(value.selectedDate, "d MMMM yyyy", {
                          locale: ru,
                        })}{" "}
                      в {value.time}
                    </p>
                    <p className={styles.cart__price}>
                      {formatCurrency(value.totalPrice)}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.cart__totalPrice}>
            Итого: {formatCurrency(totalPrice)}
          </div>
        </div>
      )}
    </section>
  );
};
