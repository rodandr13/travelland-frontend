import { Breadcrumbs } from "@/enities/excursion/ui/detail/components/breadcrumbs/Breadcrumbs";
import { DetailedCart } from "@/widgets/detailedCart/ui/DetailedCart";

import styles from "./styles.module.scss";

export const Cart = () => {
  return (
    <section className={styles.page}>
      <Breadcrumbs title="Корзина" />
      <h1>Корзина</h1>
      <DetailedCart />
    </section>
  );
};
