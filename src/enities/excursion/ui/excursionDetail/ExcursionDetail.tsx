import styles from "./styles.module.scss";
import { Gallery } from "./ui/gallery/Gallery";
import { Breadcrumbs } from "./ui/breadcrumbs/Breadcrumbs";
import { PageTitle } from "@/src/shared/ui/pageTitle/PageTitle";
import { TimeSpending } from "./ui/timeSpending/TimeSpending";
import { Description } from "./ui/description/Description";
import { MeetingPoint } from "./ui/meetingPoint/MeetingPoint";
import { Conditions } from "./ui/conditions/Conditions";
import { Advantages } from "./ui/advantages/Advantages";
import { ExcursionRoute } from "./ui/excursionRoute/ExcursionRoute";
import { Booking } from "./ui/bookingSection/Booking";
import { PriceSection } from "./ui/priceSection/PriceSection";
import { AttentionBlock } from "./ui/attentionBlock/AttentionBlock";
import { getExcursionDetail } from "@/src/enities/excursion/api/getExcursionDetail";
import { generatePriceMap } from "@/src/shared/lib/generatePriceMap";
import { Parameters } from "@/src/enities/excursion/ui/excursionDetail/ui/parameters/Parameters";
import { Categories } from "@/src/enities/excursion/ui/excursionDetail/ui/categories/Categories";
import { findAdultMinPrice } from "@/src/shared/lib/findAdultMinPrice";
import { findAdultBasePrice } from "@/src/shared/lib/findAdultBasePrice";

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
    promoPrices: excursion.promotionalPrices,
  });

  const baseAdultPrice = findAdultBasePrice(basePrices);
  const minPrice = findAdultMinPrice(prices);

  return (
    <section className={styles.excursionDetail}>
      <Gallery images={excursion.gallery} />
      <div className={styles.excursionDetail__container}>
        <div className={styles.excursionDetail__content}>
          <div className={styles.excursionDetail__info}>
            <Breadcrumbs title={excursion.title} />
            <PageTitle>{excursion.title}</PageTitle>
            <Categories
              category={excursion.category}
              subCategory={excursion.subcategory}
            />
            <div className={styles.excursionDetail__mainInfo}>
              <div className={styles.excursionDetail__containerDescription}>
                <TimeSpending
                  startTime={excursion.startTime}
                  weekdays={excursion.weekdays}
                  duration={excursion.duration}
                />
                {excursion.parameters && (
                  <Parameters parameters={excursion.parameters} />
                )}
                <Description description={excursion.description} />
              </div>
              <MeetingPoint meetingPoint={excursion.meetingPoint} />
            </div>
            <Conditions
              additionalTerms={excursion.additionalTerms}
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
            prices={prices}
          />
        </div>
        <div className={styles.excursionDetail__sideBar}>
          <PriceSection
            minPrice={minPrice}
            basePrice={baseAdultPrice}
            title={excursion.title}
          />
          <AttentionBlock />
        </div>
      </div>
    </section>
  );
};
