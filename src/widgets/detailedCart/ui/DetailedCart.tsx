"use client";

import { useEffect, useState } from "react";

import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
import Image from "next/image";
import Link from "next/link";

import { getCartFromLocalStorage } from "@/src/enities/cart";
import { RemoveFromCart } from "@/src/features/removeFromCart";
import { formatCurrency } from "@/src/shared/lib/formatCurrency";
import { urlFor } from "@/src/shared/lib/sanity/client";
import { Cart } from "@/src/shared/types/cart";
import { Button } from "@/src/shared/ui/button";
import { PriceBlock } from "@/src/shared/ui/priceBlock";
import { PromotionalCode } from "@/src/shared/ui/promotionalСode/PromotionalСode";
import { Contacts } from "@/src/widgets/detailedCart/ui/components/Contacts";
import { PaymentMethods } from "@/src/widgets/detailedCart/ui/components/PaymentMethods";

import styles from "./styles.module.scss";

export const DetailedCart = () => {
  const [cart, setCart] = useState<Cart>({
    items: [],
    totalItems: 0,
    totalCurrentPrice: 0,
    totalBasePrice: 0,
  });

  useEffect(() => {
    const cart = getCartFromLocalStorage();
    setCart(cart);
  }, []);

  return (
    <>
      {cart.items.length > 0 ? (
        <section className={styles.detailedCart}>
          <div className={styles.detailedCart__container}>
            <ul className={styles.detailedCart__list}>
              {cart.items.map((item) => (
                <li key={item.id} className={styles.detailedCart__item}>
                  <Link
                    href={`/excursion/${item.slug}`}
                    className={styles.detailedCart__link}
                  >
                    <div className={styles.detailedCart__imageContainer}>
                      <Image
                        className={styles.detailedCart__image}
                        src={urlFor(item.image.src)}
                        blurDataURL={item.image.lqip}
                        alt=""
                        placeholder="blur"
                        loading="lazy"
                        quality={60}
                        sizes={"180px"}
                        fill
                        objectFit="cover"
                      />
                    </div>
                    <div className={styles.detailedCart__textContainer}>
                      <h3 className={styles.detailedCart__title}>
                        {item.title}
                      </h3>
                      <div className={styles.detailedCart__dateContainer}>
                        <p className={styles.detailedCart__date}>
                          {item.selectedDate &&
                            format(item.selectedDate, "d MMMM yyyy", {
                              locale: ru,
                            })}{" "}
                          в {item.selectedTime}
                        </p>
                      </div>
                      <div
                        className={styles.detailedCart__participantsContainer}
                      >
                        <ul className={styles.detailedCart__participantsList}>
                          {item.participants.map((participant) => (
                            <li
                              key={participant.id}
                              className={styles.detailedCart__participantsItem}
                            >
                              {participant.title} {participant.count}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className={styles.detailedCart__rightSection}>
                      <div className={styles.detailedCart__price}>
                        <PriceBlock
                          actualPrice
                          price={item.totalCurrentPrice}
                        />
                      </div>
                      <RemoveFromCart itemId={item.id} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
            <Contacts />
            <PaymentMethods />
          </div>
          <div className={styles.detailedCart__summary}>
            <h2 className={styles.detailedCart__title}>Ваш заказ</h2>
            <ul className={styles.detailedCart__priceList}>
              <div className={styles.detailedCart__priceLine}>
                <span>Услуги ({cart.totalItems})</span>
                <span className={styles.detailedCart__dottedLine}></span>
                <span className={styles.detailedCart__priceSum}>
                  {formatCurrency(cart.totalBasePrice)}
                </span>
              </div>
              <div className={styles.detailedCart__priceLine}>
                <span>Скидка</span>
                <span className={styles.detailedCart__dottedLine}></span>
                <span className={styles.detailedCart__priceSum}>
                  {formatCurrency(cart.totalBasePrice - cart.totalCurrentPrice)}
                </span>
              </div>
            </ul>
            <PromotionalCode />
            <div className={styles.detailedCart__totalPriceBlock}>
              <h3 className={styles.detailedCart__title}>Общая стоимость:</h3>
              <PriceBlock actualPrice price={cart.totalCurrentPrice} />
            </div>
            <Button title="Заказать" color="green" />
            <p className={styles.detailedCart__consentOffer}>
              Нажимая кнопку &quot;Заказать&quot;, Вы принимаете условия
              соответствующей оферты: <a href="#">Оферты для физических</a> лиц
              или <a href="#">Оферты для юридических лиц и ИП</a>,{" "}
              <a href="#">Политики конфиденциальности</a>, а также даете{" "}
              <a href="#">Согласие на обработку</a> Ваших персональных данных и
              их передачу.
            </p>
          </div>
        </section>
      ) : (
        <h2>В корзине пусто</h2>
      )}
    </>
  );
};
