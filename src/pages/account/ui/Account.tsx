"use client";

import { useEffect, useState } from "react";

import { apiClient } from "@/shared/api";
import { EXTERNAL_API_BASE_URL, ORDER_ENDPOINTS } from "@/shared/lib/constants";
import { Order } from "@/shared/types/orderResponse";
import { OrdersList } from "@/shared/ui/ordersList/OrdersList";

import styles from "./styles.module.scss";

export const Account = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const url = `${EXTERNAL_API_BASE_URL}${ORDER_ENDPOINTS.GET_ALL}`;
        const { data: response } = await apiClient<Order[]>(url, {
          credentials: "include",
        });

        if (Array.isArray(response)) {
          setOrders(response);
        } else if (response === null) {
          setError("Не удалось загрузить заказы: данные отсутствуют.");
        } else {
          setError("Неизвестный формат данных.");
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || "Произошла неизвестная ошибка.");
        } else {
          setError("Произошла неизвестная ошибка.");
        }
        console.error(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <section className={styles.account}>
      <h1>Мои заказы</h1>
      {error ? (
        <p className={styles.error}>{error}</p>
      ) : (
        <OrdersList orders={orders} />
      )}
    </section>
  );
};
