import { isSelectableDate } from "./isSelectableDate";
import {
  Dates,
  Price,
  Weekdays,
} from "@/src/enities/excursion/model/types/ExcursionDetail";

interface Props {
  dates: Dates;
  weekdays: Weekdays;
  dayNumber: number;
  day: Date;
  basePrices: Price[];
}

export const CustomDay = ({
  dayNumber,
  dates,
  weekdays,
  day,
  basePrices,
}: Props) => {
  const showPrice = isSelectableDate({ day, dates, weekdays });
  const baseAdultPrice = basePrices ? basePrices[0].price : "0";
  return (
    <div className={`react-datepicker__priceContainer`}>
      <span className="react-datepicker__dayValue">{dayNumber}</span>
      {showPrice && (
        <span className="react-datepicker__price">€ {baseAdultPrice}</span>
      )}
    </div>
  );
};
