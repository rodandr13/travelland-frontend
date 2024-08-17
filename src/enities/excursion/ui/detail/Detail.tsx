import { getExcursionDetail } from "@/src/enities/excursion/api/getExcursionDetail";
import { findAdultBasePrice } from "@/src/shared/lib/findAdultBasePrice";
import { findAdultMinPrice } from "@/src/shared/lib/findAdultMinPrice";
import { generatePriceMap } from "@/src/shared/lib/generatePriceMap";

import { Advantages } from "./components/advantages/Advantages";
import { AttentionBlock } from "./components/attentionBlock/AttentionBlock";
import { Booking } from "./components/bookingSection/Booking";
import { Breadcrumbs } from "./components/breadcrumbs/Breadcrumbs";
import { Categories } from "./components/categories/Categories";
import { Conditions } from "./components/conditions/Conditions";
import { Description } from "./components/description/Description";
import { ExcursionRoute } from "./components/excursionRoute/ExcursionRoute";
import { Gallery } from "./components/gallery/Gallery";
import { Parameters } from "./components/parameters/Parameters";
import { PriceSection } from "./components/priceSection/PriceSection";
import { TimeSpending } from "./components/timeSpending/TimeSpending";
import styles from "./styles.module.scss";

interface Props {
  slug: string;
}

export const Detail = async ({ slug }: Props) => {
  const {
    basePrices,
    promotionalPrices,
    priceCorrections,
    title,
    _id,
    _type,
    startTime,
    duration,
    weekdays,
    startingPlace,
    gallery,
    dates,
    category,
    subcategory,
    parameters,
    description,
    additionalTerms,
    surcharge,
    included,
    route,
    endingPlace,
  } = await getExcursionDetail({ slug });

  const prices = generatePriceMap({
    basePrices: basePrices,
    priceCorrections: priceCorrections,
    promoPrices: promotionalPrices,
    baseDates: dates,
    weekdays: weekdays,
  });

  const baseAdultPrice = findAdultBasePrice(basePrices);
  const minAdultPrice = findAdultMinPrice(prices) || baseAdultPrice;
  return (
    <section className={styles.excursionDetail}>
      <Gallery images={gallery} />
      <div className={styles.excursionDetail__container}>
        <div className={styles.excursionDetail__content}>
          <div className={styles.excursionDetail__info}>
            <Breadcrumbs title={title} />
            <h1>{title}</h1>
            <Categories category={category} subCategory={subcategory} />
            <div className={styles.excursionDetail__mainInfo}>
              <div className={styles.excursionDetail__containerDescription}>
                <TimeSpending
                  startTime={startTime}
                  weekdays={weekdays}
                  duration={duration}
                />
                {parameters && <Parameters parameters={parameters} />}
                <Description description={description} />
              </div>
            </div>
            <Conditions
              additionalTerms={additionalTerms}
              surcharge={surcharge}
              included={included}
            />
          </div>
          <Advantages />
          <ExcursionRoute
            routes={route}
            startingPlace={startingPlace}
            endingPlace={endingPlace}
          />
          <Booking
            id={_id}
            image={gallery[0]}
            title={title}
            dates={dates}
            startTime={startTime}
            weekdays={weekdays}
            duration={duration}
            prices={prices}
            type={_type}
          />
        </div>
        <div className={styles.excursionDetail__sideBar}>
          <PriceSection
            id={_id}
            minPrice={minAdultPrice}
            basePrice={baseAdultPrice}
            title={title}
          />
          <AttentionBlock />
        </div>
      </div>
    </section>
  );
};
