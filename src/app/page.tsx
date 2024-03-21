import styles from "./page.module.scss";
import { SectionHeader } from "@/src/shared/ui/sectionHeader/";
import { ExcursionCard } from "@/src/shared/ui/excursionCard";

export default function Home() {
  return (
    <main className={styles.main}>
      <SectionHeader>Экскурсии</SectionHeader>
      <ExcursionCard />
    </main>
  );
}
