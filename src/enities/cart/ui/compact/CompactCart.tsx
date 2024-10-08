"use client";

import { useEffect, useRef, useState } from "react";

import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
import Image from "next/image";
import Link from "next/link";

import { selectCart } from "@/src/enities/cart/model/selectors";
import { formatCurrency } from "@/src/shared/lib/formatCurrency";
import { useAppSelector } from "@/src/shared/lib/redux/hooks";
import { urlFor } from "@/src/shared/lib/sanity/client";
import { CartItem } from "@/src/shared/types/cart";

import styles from "./styles.module.scss";

export const CompactCart = () => {
  const [isDetailsVisible, setDetailsVisible] = useState(false);
  const detailsVisibilityTimer = useRef<number | null>(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalCurrentPrice, setTotalCurrentPrice] = useState(0);
  const [totalBasePrice, setTotalBasePrice] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cart = useAppSelector(selectCart);

  useEffect(() => {
    setTotalItems(cart.totalItems);
    setTotalCurrentPrice(cart.totalCurrentPrice);
    setTotalBasePrice(cart.totalBasePrice);
    setCartItems(cart.items);
  }, [cart]);

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
    }, 200);
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
          Корзина <span>({formatCurrency(totalCurrentPrice)})</span>
        </p>
      </Link>
      <div className={styles.cart__totalQuantity}>{totalItems}</div>
      {cartItems.length > 0 && isDetailsVisible && (
        <div className={styles.cart__details}>
          <ul className={styles.cart__list}>
            {cart.items.map((item) => (
              <li key={item.id} className={styles.cart__item}>
                <Image
                  className={styles.cart__image}
                  src={urlFor(item.image.src)}
                  blurDataURL={item.image.lqip}
                  alt=""
                  placeholder="blur"
                  loading="lazy"
                  quality={60}
                  width={50}
                  height={40}
                  sizes={"50px"}
                />
                <div className={styles.cart__textContainer}>
                  <h3 className={styles.cart__title}>{item.title}</h3>
                  <div className={styles.cart__dateContainer}>
                    <p className={styles.cart__date}>
                      <span>
                        {item.selectedDate &&
                          format(item.selectedDate, "d MMMM yyyy", {
                            locale: ru,
                          })}
                      </span>
                      <span>в {item.selectedTime}</span>
                    </p>
                    <p className={styles.cart__price}>
                      <span className={styles.cart__price_base}>
                        {item.totalBasePrice !== item.totalCurrentPrice &&
                          formatCurrency(item.totalBasePrice)}
                      </span>
                      <span>{formatCurrency(item.totalCurrentPrice)}</span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.cart__totalPrice}>
            Итого:
            <span className={styles.cart__totalPrice_current}>
              {formatCurrency(totalCurrentPrice)}
            </span>
            <span className={styles.cart__totalPrice_base}>
              {totalCurrentPrice !== totalBasePrice &&
                formatCurrency(totalBasePrice)}
            </span>
          </div>
          <Link href="/cart" className="link_cart">
            В корзину
          </Link>
        </div>
      )}
    </section>
  );
};
