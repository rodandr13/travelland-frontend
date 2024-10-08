import styles from "./styles.module.scss";
import { PaymentResultPage } from "../../pages/paymentResultPage";

export const dynamic = "force-dynamic";

export default function Page({ searchParams }: { searchParams?: any }) {
  return (
    <section className={styles.page}>
      <PaymentResultPage searchParams={searchParams} />
    </section>
  );
}
