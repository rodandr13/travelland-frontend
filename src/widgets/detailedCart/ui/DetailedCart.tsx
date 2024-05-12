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
import { PriceBlock } from "@/src/shared/ui/priceBlock";

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
                    src={urlFor(value.image)}
                    alt=""
                    fill
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
                  <RemoveFromCart itemKey={key} />
                </div>
                <div>
                  <div className={styles.detailedCart__price}>
                    <PriceBlock actualPrice price={value.totalPrice} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className={styles.detailedCart__totalPrice}>
            <h3 className={styles.detailedCart__title}>Итого:</h3>
            <PriceBlock actualPrice price={totalPrice} />
          </div>
        </section>
      ) : (
        <h2>В корзине пусто</h2>
      )}
    </>
  );
};
