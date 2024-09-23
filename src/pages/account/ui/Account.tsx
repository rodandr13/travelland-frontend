"use client";

import { useEffect, useState } from "react";

import { OrdersList } from "@/src/shared/ui/ordersList/OrdersList";

import styles from "./styles.module.scss";

export const Account = () => {
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

  return (
    <section className={styles.account}>
      <h1>Мои заказы</h1>
      <OrdersList orders={orders} />
    </section>
  );
};
