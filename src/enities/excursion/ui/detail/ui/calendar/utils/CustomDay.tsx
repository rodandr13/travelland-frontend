import clsx from "clsx";

import { Price } from "@/src/enities/excursion/model/types/ExcursionDetail";
import { getFormattedDate } from "@/src/shared/lib/getFormattedDate";
import { PricesMap } from "@/src/shared/types/booking";

interface Props {
  dayNumber: number;
  day: Date;
  basePrices: Price[];
  prices: PricesMap;
}

export const CustomDay = ({ dayNumber, day, basePrices, prices }: Props) => {
  const dayKey = getFormattedDate(day);
  const showPrice = prices.has(dayKey);
  const baseAdultPrice = basePrices ? basePrices[0].price : 0;

  const adultPriceData = showPrice ? prices.get(dayKey) : null;
  const adultPrice =
    adultPriceData && adultPriceData.prices && adultPriceData.prices[0]
      ? adultPriceData.prices[0].price
      : 0;

  const isIncreased = baseAdultPrice < adultPrice;
  const isReduction =
    baseAdultPrice !== 0 && adultPrice !== 0 && baseAdultPrice > adultPrice;
  return (
    <div
      className={clsx(`react-datepicker__priceContainer`, {
        "react-datepicker__priceContainer_increased": isIncreased,
        "react-datepicker__priceContainer_reduction": isReduction,
      })}
    >
      <span className="react-datepicker__dayValue">{dayNumber}</span>
      {showPrice && (
        <span className="react-datepicker__price">
          € {adultPrice.toFixed(2)}
        </span>
      )}
    </div>
  );
};
