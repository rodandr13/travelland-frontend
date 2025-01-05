// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import styles from "./styles.module.scss";
import { PaymentResultPage } from "../../pages/paymentResultPage";

export default async function Page(props: {
  searchParams?: Promise<{ token: string }>;
}) {
  const searchParams = await props.searchParams;
  return (
    <section className={styles.page}>
      <PaymentResultPage token={searchParams?.token} />
    </section>
  );
}
