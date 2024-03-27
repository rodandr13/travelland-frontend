import styles from "./styles.module.scss";
import { PageTitle } from "@/src/shared/ui/pageTitle/PageTitle";
import { MeetingPoint } from "./meetingPoint";
import { Conditions } from "./conditions";
import { Breadcrumbs } from "./breadcrumbs";
import { Gallery } from "./gallery";
import { TimeSpending } from "./timeSpending";
import { Description } from "./description";
import { PriceSection } from "./priceSection";
import { AttentionBlock } from "./attentionBlock";
import { Advantages } from "./advantages";
import { ExcursionRoute } from "./excursionRoute";
import { Booking } from "./bookingSection";

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
          <Advantages />
          <ExcursionRoute />
          <Booking />
        </div>
        <div className={styles.excursionPage__sideBar}>
          <PriceSection />
          <AttentionBlock />
        </div>
      </div>
    </section>
  );
};
