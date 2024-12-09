import styles from "./styles.module.scss";
import { PaymentResultPage } from "../../pages/paymentResultPage";

export default async function Page(props: { searchParams?: Promise<any> }) {
  const searchParams = await props.searchParams;
  return (
    <section className={styles.page}>
      <PaymentResultPage searchParams={searchParams} />
    </section>
  );
}
