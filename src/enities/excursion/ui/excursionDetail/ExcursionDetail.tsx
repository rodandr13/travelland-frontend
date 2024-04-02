import styles from "./styles.module.scss";
import { Gallery } from "./ui/gallery";
import { Breadcrumbs } from "./ui/breadcrumbs";
import { PageTitle } from "@/src/shared/ui/pageTitle/PageTitle";
import { TimeSpending } from "./ui/timeSpending";
import { Description } from "./ui/description";
import { MeetingPoint } from "./ui/meetingPoint";
import { Conditions } from "./ui/conditions";
import { Advantages } from "./ui/advantages";
import { ExcursionRoute } from "./ui/excursionRoute";
import { Booking } from "./ui/bookingSection";
import { PriceSection } from "./ui/priceSection";
import { AttentionBlock } from "./ui/attentionBlock";
import { getExcursionDetail } from "@/src/enities/excursion/api/getExcursionDetail";

export const ExcursionDetail = async () => {
  const excursion = await getExcursionDetail();
  return (
    <section className={styles.excursionDetail}>
      <Gallery />
      <div className={styles.excursionDetail__container}>
        <div className={styles.excursionDetail__content}>
          <div className={styles.excursionDetail__info}>
            <Breadcrumbs />
            <PageTitle>{excursion.title}</PageTitle>
            <div className={styles.excursionDetail__mainInfo}>
              <div className={styles.excursionDetail__containerDescription}>
                <TimeSpending schedule={excursion.schedule} />
                <Description description={excursion.description} />
              </div>
              <MeetingPoint meetingPoint={excursion.meetingPoint} />
            </div>
            <Conditions
              surcharge={excursion.surcharge}
              included={excursion.included}
            />
          </div>
          <Advantages />
          <ExcursionRoute routes={excursion.route} />
          <Booking />
        </div>
        <div className={styles.excursionDetail__sideBar}>
          <PriceSection />
          <AttentionBlock />
        </div>
      </div>
    </section>
  );
};
