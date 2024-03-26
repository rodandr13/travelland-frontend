import styles from "./styles.module.scss";
import { PageTitle } from "@/src/shared/ui/pageTitle/PageTitle";
import { MeetingPoint } from "./meetingPoint";
import { Conditions } from "./conditions";
import { Breadcrumbs } from "./breadcrumbs";
import { Gallery } from "./gallery";
import { TimeSpending } from "./timeSpending";
import { Description } from "./description";
import { PriceSection } from "./priceSection";

export const ExcursionPage = () => {
  return (
    <section className={styles.excursionPage}>
      <Gallery />
      <div className={styles.excursionPage__container}>
        <div className={styles.excursionPage__content}>
          <Breadcrumbs />
          <PageTitle>
            Cesky Krumlov and Hluboka Castle over the Vltava
          </PageTitle>
          <div className={styles.excursionPage__container}>
            <div className={styles.excursionPage__containerDescription}>
              <TimeSpending />
              <Description />
            </div>
            <MeetingPoint />
          </div>
          <Conditions />
        </div>
        <PriceSection />
      </div>
    </section>
  );
};
