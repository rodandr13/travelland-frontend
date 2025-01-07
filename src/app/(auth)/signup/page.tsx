import { SignUp } from "@/src/pages/signUp";

import styles from "./styles.module.scss";

export default function Page() {
  return (
    <section className={styles.page}>
      <SignUp />
    </section>
  );
}
