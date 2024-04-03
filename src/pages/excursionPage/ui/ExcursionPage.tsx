import styles from "./styles.module.scss";
import { ExcursionDetail } from "@/src/enities/excursion";

interface Props {
  slug: string;
}

export const ExcursionPage = ({ slug }: Props) => {
  return (
    <section className={styles.excursionPage}>
      <ExcursionDetail slug={slug} />
    </section>
  );
};
