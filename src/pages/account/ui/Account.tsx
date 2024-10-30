"use client";

import { useEffect, useState } from "react";

import { apiClient } from "@/src/shared/api";
import {
  EXTERNAL_API_BASE_URL,
  ORDER_ENDPOINTS,
} from "@/src/shared/lib/constants";
import { OrdersList } from "@/src/shared/ui/ordersList/OrdersList";

import styles from "./styles.module.scss";

export const Account = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const url = `${EXTERNAL_API_BASE_URL}${ORDER_ENDPOINTS.GET_ALL}`;
        const { data: response } = await apiClient<Order[]>(url, {
          credentials: "include",
        });
        setOrders(response);
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
