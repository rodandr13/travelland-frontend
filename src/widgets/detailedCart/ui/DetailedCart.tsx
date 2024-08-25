"use client";

import { useEffect, useState } from "react";

import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
import Image from "next/image";
import Link from "next/link";

import { selectCart } from "@/src/enities/cart/model/selectors";
import { RemoveFromCart } from "@/src/features/removeFromCart";
import { formatCurrency } from "@/src/shared/lib/formatCurrency";
import { useAppSelector } from "@/src/shared/lib/redux/hooks";
import { urlFor } from "@/src/shared/lib/sanity/client";
import { CartItem } from "@/src/shared/types/cart";
import { PriceBlock } from "@/src/shared/ui/priceBlock";
import { PromotionalCode } from "@/src/shared/ui/promotionalСode/PromotionalСode";
import { Contacts } from "@/src/widgets/detailedCart/ui/components/Contacts";
import { CreateOrder } from "@/src/widgets/detailedCart/ui/components/CreateOrder";
import { EditItem } from "@/src/widgets/detailedCart/ui/components/EditItem";
import { PaymentMethods } from "@/src/widgets/detailedCart/ui/components/PaymentMethods";

import styles from "./styles.module.scss";

export const DetailedCart = () => {
  const cart = useAppSelector(selectCart);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setCartItems(cart.items);
  }, [cart.items]);

  return (
    <>
      {cartItems.length > 0 ? (
        <section className={styles.detailedCart}>
          <div className={styles.detailedCart__container}>
            <ul className={styles.detailedCart__list}>
              {cartItems.map((item) => (
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
                          currentPrice={item.totalCurrentPrice}
                          basePrice={item.totalBasePrice}
                        />
                      </div>
                      <div className={styles.detailedCart__buttonsGroup}>
                        <RemoveFromCart itemId={item.id} />
                        <EditItem />
                      </div>
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
              <h3 className={styles.detailedCart__title}>К оплате:</h3>
              <PriceBlock actualPrice currentPrice={cart.totalCurrentPrice} />
            </div>
            <CreateOrder
              items={cartItems}
              paymentMethod="cash"
              promoCode="asdsa"
            />
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
