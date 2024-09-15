import { SignIn } from "@/src/pages/signIn";

import styles from "./styles.module.scss";

export default function Page() {
  return (
    <section className={styles.page}>
      <SignIn />
    </section>
  );
}
