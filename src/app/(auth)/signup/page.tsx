import { SignUp } from "@/src/pages/signup";

import styles from "./styles.module.scss";

export default function Page() {
  return (
    <section className={styles.page}>
      <SignUp />
    </section>
  );
}
