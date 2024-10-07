import Link from "next/link";

import styles from "./styles.module.scss";

interface Props {
  orderNumber: string;
}

export const SuccessfulOrder = ({ orderNumber }: Props) => {
  return (
    <section className={styles.successfulOrder}>
      <h2>{`Заказ №${orderNumber} успешно оплачен`}</h2>
      <p>
        Наши менеджеры свяжутся с вами для уточнения деталей. На вашу почту
        отправлена информация о заказе.
      </p>
      <Link href="/" className="link_cart">
        Вернуться на главную страницу
      </Link>
    </section>
  );
};
