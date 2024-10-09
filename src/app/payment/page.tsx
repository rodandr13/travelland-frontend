import styles from "./styles.module.scss";
import { PaymentResultPage } from "../../pages/paymentResultPage";

export default function Page({ searchParams }: { searchParams?: any }) {
  return (
    <section className={styles.page}>
      <PaymentResultPage searchParams={searchParams} />
    </section>
  );
}
