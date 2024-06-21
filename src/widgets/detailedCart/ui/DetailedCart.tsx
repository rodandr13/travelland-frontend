"use client";

import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
import Image from "next/image";

import {
  getTotalPrice,
  selectCartItems,
} from "@/src/enities/cart/model/selectors";
import { RemoveFromCart } from "@/src/features/removeFromCart";
import { useAppSelector } from "@/src/shared/lib/redux/hooks";
import { urlFor } from "@/src/shared/lib/sanity/client";
import { Button } from "@/src/shared/ui/button";
import { PriceBlock } from "@/src/shared/ui/priceBlock";
import { PromotionalCode } from "@/src/shared/ui/promotionalСode/PromotionalСode";

import styles from "./styles.module.scss";

export const DetailedCart = () => {
  const totalPrice = useAppSelector(getTotalPrice);
  const cartItems = useAppSelector(selectCartItems);
  const cartItemEntries = Object.entries(cartItems);
  return (
    <>
      {cartItemEntries.length > 0 ? (
        <section className={styles.detailedCart}>
          <ul className={styles.detailedCart__list}>
            {cartItemEntries.map(([key, value], index) => (
              <li key={index} className={styles.detailedCart__item}>
                <div className={styles.detailedCart__imageContainer}>
                  <Image
                    className={styles.detailedCart__image}
                    src={urlFor(value.image.src)}
                    blurDataURL={value.image.lqip}
                    alt=""
                    placeholder="blur"
                    loading="lazy"
                    quality={60}
                    width={180}
                    height={120}
                  />
                </div>
                <div className={styles.detailedCart__textContainer}>
                  <h3 className={styles.detailedCart__title}>{value.title}</h3>
                  <div className={styles.detailedCart__dateContainer}>
                    <p className={styles.detailedCart__date}>
                      {value.selectedDate &&
                        format(value.selectedDate, "d MMMM yyyy", {
                          locale: ru,
                        })}{" "}
                      в {value.time}
                    </p>
                  </div>
                  <div className={styles.detailedCart__participantsContainer}>
                    <ul className={styles.detailedCart__participantsList}>
                      {value.participants.map((participant, index) => (
                        <li
                          key={index}
                          className={styles.detailedCart__participantsItem}
                        >
                          {participant.category} {participant.count}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className={styles.detailedCart__rightSection}>
                  <div className={styles.detailedCart__price}>
                    <PriceBlock actualPrice price={value.totalPrice} />
                  </div>
                  <RemoveFromCart itemKey={key} />
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.detailedCart__sammary}>
            <h2>Ваш заказ</h2>
            <div className={styles.detailedCart__priceLine}>
              <span>Услуги (2)</span>
              <span className={styles.detailedCart__dottedLine}></span>
              <span className={styles.detailedCart__priceSum}>
                4124 &nbsp;€
              </span>
            </div>
            <div className={styles.detailedCart__priceLine}>
              <span>Скидка</span>
              <span className={styles.detailedCart__dottedLine}></span>
              <span className={styles.detailedCart__priceSum}>
                – 123 &nbsp;€
              </span>
            </div>
            <PromotionalCode />
            <div className={styles.detailedCart__totalPriceBlock}>
              <h3 className={styles.detailedCart__title}>Общая стоимость:</h3>
              <PriceBlock actualPrice price={totalPrice} />
            </div>
            <Button title="Заказать" color="green" />
          </div>
        </section>
      ) : (
        <h2>В корзине пусто</h2>
      )}
    </>
  );
};
