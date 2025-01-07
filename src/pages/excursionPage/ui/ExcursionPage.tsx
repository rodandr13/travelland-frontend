import { ScrollProvider } from "@/src/app/providers/ScrollProvider";
import { Detail } from "@/src/enities/excursion";

import styles from "./styles.module.scss";

interface Props {
  slug: string;
}

export const ExcursionPage = ({ slug }: Props) => {
  return (
    <ScrollProvider>
      <section className={styles.excursionPage}>
        <Detail slug={slug} />
      </section>
    </ScrollProvider>
  );
};
