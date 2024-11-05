import Link from "next/link";

import styles from "./styles.module.scss";

interface Props {
  orderNumber: number;
  message: string;
}

export const UnsuccessfulPayment = ({ orderNumber, message }: Props) => {
  return (
    <section className={styles.successfulOrder}>
      <h2>{`Заказ №${orderNumber} не оплачен`}</h2>
      <p>Ошибка при обработке платежа: {message}</p>
      <Link href="/cart" className="link_cart">
        Вернуться в корзину
      </Link>
    </section>
  );
};
