import { ScrollProvider } from "@/app/providers/ScrollProvider";
import { Detail } from "@/enities/excursion";

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
