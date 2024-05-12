import { Breadcrumbs } from "@/src/enities/excursion/ui/detail/components/breadcrumbs/Breadcrumbs";
import { PageTitle } from "@/src/shared/ui/pageTitle/PageTitle";
import { DetailedCart } from "@/src/widgets/detailedCart/ui/DetailedCart";

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
