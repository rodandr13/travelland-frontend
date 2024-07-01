import { Breadcrumbs } from "@/src/enities/excursion/ui/detail/components/breadcrumbs/Breadcrumbs";
import { DetailedCart } from "@/src/widgets/detailedCart/ui/DetailedCart";

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
