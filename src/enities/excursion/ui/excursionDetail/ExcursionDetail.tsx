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
import { generatePriceMap } from "@/src/shared/lib/generatePriceMap";

interface Props {
  slug: string;
}

export const ExcursionDetail = async ({ slug }: Props) => {
  const excursion = await getExcursionDetail({ slug });
  const { basePrices, promotionalPrices, priceCorrections } = excursion;

  const prices = generatePriceMap({
    basePrices: basePrices,
    priceCorrections: priceCorrections,
    baseDates: excursion.dates,
    weekdays: excursion.weekdays,
  });

  const todayPriceForAdult = basePrices[0].price;

  return (
    <section className={styles.excursionDetail}>
      <Gallery images={excursion.gallery} />
      <div className={styles.excursionDetail__container}>
        <div className={styles.excursionDetail__content}>
          <div className={styles.excursionDetail__info}>
            <Breadcrumbs />
            <PageTitle>{excursion.title}</PageTitle>
            <div className={styles.excursionDetail__mainInfo}>
              <div className={styles.excursionDetail__containerDescription}>
                <TimeSpending
                  startTime={excursion.startTime}
                  weekdays={excursion.weekdays}
                  duration={excursion.duration}
                />
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
          <Booking
            dates={excursion.dates}
            startTime={excursion.startTime}
            weekdays={excursion.weekdays}
            duration={excursion.duration}
            basePrices={excursion.basePrices}
            promoPrices={excursion.promotionalPrices}
            prices={prices}
          />
        </div>
        <div className={styles.excursionDetail__sideBar}>
          <PriceSection todayPriceForAdult={todayPriceForAdult} />
          <AttentionBlock />
        </div>
      </div>
    </section>
  );
};
