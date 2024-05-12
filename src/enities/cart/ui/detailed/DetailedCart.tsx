"use client";

import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
import Image from "next/image";

import {
  getTotalPrice,
  getTotalQuantity,
  selectCartItems,
} from "@/src/enities/cart/model/selectors";
import { useAppSelector } from "@/src/shared/lib/redux/hooks";
import { urlFor } from "@/src/shared/lib/sanity/client";
import { PriceBlock } from "@/src/shared/ui/priceBlock";

import styles from "./styles.module.scss";

export const DetailedCart = () => {
  const totalQuantity = useAppSelector(getTotalQuantity);
  const totalPrice = useAppSelector(getTotalPrice);
  const cartItems = useAppSelector(selectCartItems);
  console.log(cartItems);
  return (
    <section className={styles.detailedCart}>
      <ul className={styles.detailedCart__list}>
        {Object.entries(cartItems).map(([key, value], index) => (
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
              <button className={styles.detailedCart__deleteItem}>
                <span>Удалить</span>
              </button>
            </div>
            <div>
              <div className={styles.detailedCart__price}>
                <PriceBlock actualPrice price={value.totalPrice} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
