import styles from "./styles.module.scss";

import { SignIn } from "@/src/pages/signIn";

export default function Page() {
  return (
    <section className={styles.page}>
      <SignIn />
    </section>
  );
}
