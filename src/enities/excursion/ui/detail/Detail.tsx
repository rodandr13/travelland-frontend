import { getExcursionDetail } from "@/src/enities/excursion/api/getExcursionDetail";
import { findAdultBasePrice } from "@/src/shared/lib/findAdultBasePrice";
import { findAdultMinPrice } from "@/src/shared/lib/findAdultMinPrice";
import { generatePriceMap } from "@/src/shared/lib/generatePriceMap";
import { PageTitle } from "@/src/shared/ui/pageTitle/PageTitle";

import { Advantages } from "./components/advantages/Advantages";
import { AttentionBlock } from "./components/attentionBlock/AttentionBlock";
import { Booking } from "./components/bookingSection/Booking";
import { Breadcrumbs } from "./components/breadcrumbs/Breadcrumbs";
import { Categories } from "./components/categories/Categories";
import { Conditions } from "./components/conditions/Conditions";
import { Description } from "./components/description/Description";
import { ExcursionRoute } from "./components/excursionRoute/ExcursionRoute";
import { Gallery } from "./components/gallery/Gallery";
import { MeetingPoint } from "./components/meetingPoint/MeetingPoint";
import { Parameters } from "./components/parameters/Parameters";
import { PriceSection } from "./components/priceSection/PriceSection";
import { TimeSpending } from "./components/timeSpending/TimeSpending";
import styles from "./styles.module.scss";

interface Props {
  slug: string;
}

export const Detail = async ({ slug }: Props) => {
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
              <MeetingPoint meetingPoint={excursion.startingPlace} />
            </div>
            <Conditions
              additionalTerms={excursion.additionalTerms}
              surcharge={excursion.surcharge}
              included={excursion.included}
            />
          </div>
          <Advantages />
          <ExcursionRoute
            routes={excursion.route}
            startingPlace={excursion.startingPlace}
            endingPlace={excursion.endingPlace}
          />
          <Booking
            image={excursion.gallery[0].src}
            title={excursion.title}
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
