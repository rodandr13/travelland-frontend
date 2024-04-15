"use client";

import styles from "./styles.module.scss";
import { PriceBlock } from "@/src/shared/ui/priceBlock";
import { Button } from "@/src/shared/ui/button";
import { useAppSelector } from "@/src/shared/lib/redux/hooks";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface Props {
  minPrice: number | undefined;
  basePrice: number | undefined;
}

export const PriceSection = ({ minPrice, basePrice }: Props) => {
  const bookingIsVisible = useAppSelector((state) => state.booking.visible);

  const [showBlockPreview, setShowBlockA] = useState(true);
  const [showBlockPrice, setShowBlockB] = useState(false);
  const [animationClassPreview, setAnimationClassA] = useState("");
  const [animationClassPrice, setAnimationClassB] = useState("");

  useEffect(() => {
    if (bookingIsVisible) {
      if (showBlockPreview) {
        setAnimationClassA(styles.fadeOut);
        setTimeout(() => {
          setShowBlockA(false);
          setShowBlockB(true);
          setAnimationClassB(styles.fadeIn);
        }, 200);
      }
    } else {
      if (showBlockPrice) {
        setAnimationClassB(styles.fadeOut);
        setTimeout(() => {
          setShowBlockB(false);
          setShowBlockA(true);
          setAnimationClassA(styles.fadeIn);
        }, 200);
      }
    }
  }, [bookingIsVisible, showBlockPreview, showBlockPrice]);

  const priceProps =
    minPrice === basePrice
      ? {
          price: minPrice,
        }
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
          <Button title="Бронировать" />
        </section>
      )}
      {showBlockPrice && (
        <section className={clsx(styles.priceSection, animationClassPrice)}>
          <div>
            <PriceBlock parent="priceSection" {...priceProps} size="m" />
          </div>
          <Button title="Выберите дату" disabled={true} />
        </section>
      )}
    </>
  );
};
