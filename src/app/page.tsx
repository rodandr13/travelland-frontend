import styles from "./page.module.scss";
import { SectionHeader } from "@/src/shared/ui/sectionHeader";
import { ExcursionCatalog } from "@/src/widgets/excursionCatalog";

export default function Home() {
  return (
    <main className={styles.main}>
      <SectionHeader>Экскурсии</SectionHeader>
      <ExcursionCatalog />
    </main>
  );
}
