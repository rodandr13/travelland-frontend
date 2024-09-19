"use client";

import { Accordion, Badge } from "@mantine/core";
import clsx from "clsx";
import { format } from "date-fns";
import { ru } from "date-fns/locale/ru";
import Image from "next/image";
import Link from "next/link";

import { formatCurrency } from "@/src/shared/lib/formatCurrency";
import { urlFor } from "@/src/shared/lib/sanity/client";
import { PriceBlock } from "@/src/shared/ui/priceBlock";
import { formatCountParticipants } from "@/src/widgets/detailedCart/lib/formatCountParticipants";

import styles from "./styles.module.scss";

interface Props {
  orders: Order[];
}

export const OrdersList = ({ orders }: Props) => {
  console.log(orders);
  if (!orders || orders.length === 0) {
    return null;
  }
  return (
    <section className={styles.ordersList}>
      <Accordion variant="separated">
        {orders?.map((order: Order) => (
          <Accordion.Item
            className={styles.item}
            value={order.id.toString()}
            key={order.id}
          >
            <Accordion.Control>
              <ul className={styles.orderParams}>
                <li className={styles.orderParams__option}>
                  <span className={styles.orderParams__optionTitle}>
                    Номер заказа
                  </span>
                  <p>{order.id}</p>
                </li>
                <li className={styles.orderParams__option}>
                  <span className={styles.orderParams__optionTitle}>
                    Дата создания
                  </span>
                  <p>
                    {format(order.created_at, "d.MM.yyyy", {
                      locale: ru,
                    })}
                  </p>
                </li>
                <li className={styles.orderParams__option}>
                  <span className={styles.orderParams__optionTitle}>
                    Количество услуг
                  </span>
                  <p>{order.order_reservations.length}</p>
                </li>
                <li className={styles.orderParams__option}>
                  <span className={styles.orderParams__optionTitle}>
                    Статус
                  </span>
                  <Badge variant="light" color="blue">
                    {order.order_status}
                  </Badge>
                </li>
                <li className={styles.orderParams__option}>
                  <span className={styles.orderParams__optionTitle}>
                    Оплата
                  </span>
                  <Badge variant="light" color="red">
                    Не оплачен
                  </Badge>
                </li>
                <li className={styles.orderParams__option}>
                  <span className={styles.orderParams__optionTitle}>
                    К оплате
                  </span>
                  <p>{formatCurrency(order.orderTotalCurrentPrice)}</p>
                </li>
              </ul>
            </Accordion.Control>
            <Accordion.Panel>
              <div className={styles.panelContainer}>
                <ol className={styles.orderItems}>
                  {order.order_reservations.map(
                    (reservation: OrderReservation) => (
                      <li
                        key={reservation.reservation_id}
                        className={styles.orderItem}
                      >
                        <Image
                          className={styles.orderItem__image}
                          src={
                            reservation.image_src
                              ? urlFor(reservation.image_src)
                              : ""
                          }
                          blurDataURL={reservation.image_lqip}
                          alt=""
                          loading="lazy"
                          quality={60}
                          sizes={"180px"}
                          width={90}
                          height={60}
                          objectFit="cover"
                        />
                        <div className={styles.orderItem__textContainer}>
                          <span>{reservation.reservation_type}</span>
                          <Link
                            href={`/excursion/${reservation.slug}`}
                            className={styles.orderItem__link}
                          >
                            <h3 className={styles.orderItem__title}>
                              {reservation.reservation_title}
                            </h3>
                          </Link>

                          <div className={styles.orderItem__dateContainer}>
                            <p className={clsx(styles.orderItem__date)}>
                              {reservation.date &&
                                format(reservation.date, "d MMMM yyyy", {
                                  locale: ru,
                                })}{" "}
                              в {reservation.time}
                            </p>
                          </div>
                          <div
                            className={styles.orderItem__participantsContainer}
                          >
                            <ul className={styles.orderItem__participantsList}>
                              {reservation.reservation_prices.map(
                                (price: ReservationPrice) => (
                                  <li
                                    key={price.id}
                                    className={clsx(
                                      styles.orderItem__participantsItem
                                    )}
                                  >
                                    {price.amount_persons &&
                                      formatCountParticipants(
                                        price.amount_persons,
                                        price.category_title
                                      )}
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                          <div>
                            <p
                              className={clsx(
                                styles.orderItem__freeCancelation
                              )}
                            >
                              Бесплатная отмена до 10:00 21.07.2024
                            </p>
                          </div>
                        </div>
                        <div className={styles.orderItem__price}>
                          <PriceBlock
                            actualPrice
                            currentPrice={
                              reservation.reservationTotalCurrentPrice
                            }
                            basePrice={reservation.reservationTotalBasePrice}
                          />
                        </div>
                      </li>
                    )
                  )}
                </ol>
                <div className={styles.orderItem__rightSection}>
                  <p>К оплате</p>
                  <PriceBlock
                    actualPrice
                    currentPrice={order.orderTotalCurrentPrice}
                    basePrice={order.orderTotalBasePrice}
                  />
                  <div>
                    <Link className={styles.orderItem__voucher} href="/">
                      Скачать ваучеры
                    </Link>
                  </div>
                </div>
              </div>
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </section>
  );
};
