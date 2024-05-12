import { DetailedCart } from "@/src/enities/cart/ui/detailed/DetailedCart";
import { Breadcrumbs } from "@/src/enities/excursion/ui/detail/components/breadcrumbs/Breadcrumbs";
import { PageTitle } from "@/src/shared/ui/pageTitle/PageTitle";

import styles from "./styles.module.scss";

export const Cart = () => {
  return (
    <section className={styles.page}>
      <Breadcrumbs title="Корзина" />
      <PageTitle>Корзина</PageTitle>
      <DetailedCart />
    </section>
  );
};
