import { format } from "date-fns";
import { Price } from "@/src/enities/excursion/model/types/ExcursionDetail";
import clsx from "clsx";

interface Props {
  dayNumber: number;
  day: Date;
  basePrices: Price[];
  prices: any;
}

export const CustomDay = ({ dayNumber, day, basePrices, prices }: Props) => {
  // const showPrice = isSelectableDate({ day, dates, weekdays });
  const showPrice = prices.has(format(day, "dd-MM-yyyy"));
  const baseAdultPrice = basePrices ? basePrices[0].price : 0;

  const adultPrice = showPrice
    ? prices.get(format(day, "dd-MM-yyyy")).prices[0].price
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
