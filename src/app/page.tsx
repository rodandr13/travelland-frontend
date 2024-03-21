import styles from "./page.module.scss";
import { SectionHeader } from "@/src/shared/ui/sectionHeader/SectionHeader";

export default function Home() {
  return (
    <main className={styles.main}>
      <SectionHeader>Экскурсии</SectionHeader>
    </main>
  );
}
