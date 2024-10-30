"use client";

import { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
import Image from "next/image";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

import { useAuth } from "@/src/app/providers/AuthProvider";
import { selectCartData } from "@/src/enities/cart/model/selectors";
import { formatCurrency } from "@/src/shared/lib/formatCurrency";
import { useAppDispatch, useAppSelector } from "@/src/shared/lib/redux/hooks";
import { urlFor } from "@/src/shared/lib/sanity/client";
import { PriceBlock } from "@/src/shared/ui/priceBlock";
import { PromotionalCode } from "@/src/shared/ui/promotionalСode/PromotionalСode";
import { formatCountParticipants } from "@/src/widgets/detailedCart/lib/formatCountParticipants";
import { Contacts } from "@/src/widgets/detailedCart/ui/components/Contacts";
import { PaymentMethods } from "@/src/widgets/detailedCart/ui/components/PaymentMethods";

import styles from "./styles.module.scss";

const contactsSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(30, "Имя должно содержать не более 30 символов"),
  phone: z
    .string()
    .min(6, "Телефон должен содержать минимум 6 символов")
    .max(15, "Телефон должен содержать не более 15 символов")
    .regex(/^[\d\s()+-]+$/, "Неверный формат телефона"),
  email: z
    .string()
    .email("Некорректный формат email")
    .min(5, "Почта должна содержать минимум 5 символов")
    .max(30, "Почта должна содержать не более 30 символов"),
  paymentMethod: z.enum(["cash", "card", "installment_payment"], {
    errorMap: () => ({ message: "Выберите способ оплаты" }),
  }),
  promoCode: z.string().optional(),
});

export type ContactsData = z.infer<typeof contactsSchema>;

export const DetailedCart = () => {
  const cart = useAppSelector(selectCartData);
  const dispatch = useAppDispatch();
  const { authUser } = useAuth();
  const methods = useForm<ContactsData>({
    resolver: zodResolver(contactsSchema),
    mode: "onSubmit",
    defaultValues: {
      name: authUser?.first_name,
      phone: "",
      email: authUser?.email,
      paymentMethod: "cash",
      promoCode: "",
    },
  });

  useEffect(() => {
    return () => {
      // dispatch(resetOrderStatus());
    };
  }, []);
  console.log("authUser", authUser);
  console.log("cart", cart);

  return (
    <>
      {cart && cart.cart_items.length > 0 ? (
        <FormProvider {...methods}>
          <section className={styles.detailedCart}>
            <div className={styles.detailedCart__container}>
              <ul className={styles.detailedCart__list}>
                {cart.cart_items.map((item) => (
                  <li
                    key={item.service_id}
                    className={styles.detailedCart__item}
                  >
                    <Link
                      href={`/excursion/${item.slug}`}
                      className={styles.detailedCart__link}
                    >
                      <div className={styles.detailedCart__imageContainer}>
                        <Image
                          className={styles.detailedCart__image}
                          src={urlFor(item.image_src)}
                          blurDataURL={item.image_lqip}
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
                          <p className={clsx(styles.detailedCart__date)}>
                            {item.date &&
                              format(item.date, "d MMMM yyyy", {
                                locale: ru,
                              })}{" "}
                            в {item.time}
                          </p>
                        </div>
                        <div
                          className={styles.detailedCart__participantsContainer}
                        >
                          <ul className={styles.detailedCart__participantsList}>
                            {item.cart_item_options.map((participant, i) => (
                              <li
                                key={i}
                                className={clsx(
                                  styles.detailedCart__participantsItem
                                )}
                              >
                                {participant.quantity &&
                                  formatCountParticipants(
                                    participant.quantity,
                                    participant.category_title
                                  )}
                                {i < item.cart_item_options.length - 1
                                  ? ","
                                  : ""}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p
                            className={clsx(
                              styles.detailedCart__freeCancelation
                            )}
                          >
                            Бесплатная отмена до 10:00 21.07.2024
                          </p>
                        </div>
                      </div>
                      <div className={styles.detailedCart__rightSection}>
                        <div className={styles.detailedCart__price}>
                          <PriceBlock
                            actualPrice
                            currentPrice={item.total_current_price}
                            basePrice={item.total_base_price}
                          />
                        </div>
                        <div className={styles.detailedCart__buttonsGroup}>
                          {/*<RemoveFromCart itemId={item.service_id} />*/}
                          {/*<EditItem />*/}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
              <form className={styles.detailedCart__form}>
                <Contacts />
                <PaymentMethods />
              </form>
            </div>
            <div className={styles.detailedCart__summary}>
              <h2 className={styles.detailedCart__title}>Ваш заказ</h2>
              <ul className={styles.detailedCart__priceList}>
                <div className={styles.detailedCart__priceLine}>
                  <span>Услуги ({cart.cart_items.length})</span>
                  <span className={styles.detailedCart__dottedLine}></span>
                  <span className={styles.detailedCart__priceSum}>
                    {formatCurrency(cart.total_base_price)}
                  </span>
                </div>
                <div className={styles.detailedCart__priceLine}>
                  <span>Скидка</span>
                  <span className={styles.detailedCart__dottedLine}></span>
                  <span className={styles.detailedCart__priceSum}>
                    {formatCurrency(
                      cart.total_base_price - cart.total_current_price
                    )}
                  </span>
                </div>
              </ul>
              <PromotionalCode />
              <div className={styles.detailedCart__totalPriceBlock}>
                <h3 className={styles.detailedCart__title}>К оплате:</h3>
                <PriceBlock
                  actualPrice
                  currentPrice={cart.total_current_price}
                />
              </div>
              {/*<BookOrder items={cart.cart_items} />*/}
              <p className={styles.detailedCart__consentOffer}>
                Нажимая кнопку &quot;Заказать&quot;, Вы принимаете условия
                соответствующей оферты: <a href="#">Оферты для физических</a>{" "}
                лиц или <a href="#">Оферты для юридических лиц и ИП</a>,{" "}
                <a href="#">Политики конфиденциальности</a>, а также даете{" "}
                <a href="#">Согласие на обработку</a> Ваших персональных данных
                и их передачу.
              </p>
            </div>
          </section>
        </FormProvider>
      ) : (
        <h2>В корзине пусто</h2>
      )}
    </>
  );
};
