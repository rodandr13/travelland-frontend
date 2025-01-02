import styles from "./styles.module.scss";

import { SignUp } from "@/src/pages/signUp";

export default function Page() {
  return (
    <section className={styles.page}>
      <SignUp />
    </section>
  );
}
