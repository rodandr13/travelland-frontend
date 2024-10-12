import { Booking } from "@/src/enities/booking";
import { getExcursionDetail } from "@/src/enities/excursion/api/getExcursionDetail";
import { findAdultBasePrice } from "@/src/shared/lib/findAdultBasePrice";
import { generatePriceMap } from "@/src/shared/lib/generatePriceMap";
import { getMinPrice } from "@/src/shared/lib/getMinPrice";
import { Price } from "@/src/shared/types/booking";

import { Advantages } from "./components/advantages/Advantages";
import { AttentionBlock } from "./components/attentionBlock/AttentionBlock";
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

interface PriceData {
  basePrices: Price[];
  priceCorrections?: Price[];
  promotionalPrices?: Price[];
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

  const priceData: PriceData = {
    basePrices,
  };

  if (priceCorrections) {
    priceData.priceCorrections = priceCorrections.flatMap(
      (promo) => promo.prices
    );
  }

  if (promotionalPrices) {
    priceData.promotionalPrices = promotionalPrices.flatMap(
      (promo) => promo.prices
    );
  }

  const baseAdultPrice = findAdultBasePrice(basePrices);
  const minPrice = getMinPrice(priceData, category.key);

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
            slug={slug}
          />
        </div>
        <div className={styles.excursionDetail__sideBar}>
          <PriceSection
            id={_id}
            minPrice={minPrice}
            basePrice={baseAdultPrice}
            title={title}
            category={category.key}
          />
          <AttentionBlock />
        </div>
      </div>
    </section>
  );
};
