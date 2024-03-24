import styles from "./page.module.scss";
import { SectionHeader } from "@/src/shared/ui/sectionHeader/";
import { ExcursionCard } from "../enities/excursion/ui/excursionCard";
import { FilterItem } from "@/src/shared/ui/filterItem";
import { ExcursionList } from "@/src/enities/excursion/ui";

export default function Home() {
  return (
    <main className={styles.main}>
      <SectionHeader>Экскурсии</SectionHeader>
      <FilterItem />
      <ExcursionList />
    </main>
  );
}
