"use client";

import { useEffect, useState } from "react";

import { IconListDetails, IconUserScan } from "@tabler/icons-react";

import { OrdersList } from "@/src/shared/ui/ordersList/OrdersList";

import styles from "./styles.module.scss";

const data = [
  { link: "", label: "Профайл", icon: IconUserScan },
  { link: "", label: "Мои бронирования", icon: IconListDetails },
];

export const Account = () => {
  const [active, setActive] = useState("Мои бронирования");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/order", {
          method: "GET",
          credentials: "include",
        });

        if (response.ok) {
          const data: Order[] = await response.json();
          setOrders(data);
        } else {
          console.error("Ошибка при получении заказов");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const links = data.map((item) => (
    <a
      className={styles.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={styles.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <section className={styles.account}>
      <nav className={styles.navbar}>
        <div className={styles.navbarMain}>{links}</div>
      </nav>
      <OrdersList orders={orders} />
    </section>
  );
};
