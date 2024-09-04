import Link from "next/link";

import styles from "./styles.module.scss";

interface Props {
  order: any;
}

export const SuccessfulOrder = ({ order }: Props) => {
  return (
    <section className={styles.successfulOrder}>
      <h2>Заказ №123 успешно создан</h2>
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
