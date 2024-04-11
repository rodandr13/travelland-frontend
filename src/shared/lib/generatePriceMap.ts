import { eachDayOfInterval, formatISO, parseISO } from "date-fns";
import {
  Dates,
  Price,
  PromotionalPrice,
  Weekdays,
} from "@/src/enities/excursion/model/types/ExcursionDetail";
import { PricesMap } from "@/src/shared/types/excursion";

interface Props {
  baseDates: Dates;
  basePrices: Price[];
  weekdays: Weekdays;
  priceCorrections?: PromotionalPrice[];
}

export const generatePriceMap = ({
  baseDates,
  basePrices,
  weekdays,
  priceCorrections,
}: Props): PricesMap => {
  const pricesMap: PricesMap = new Map();
  let startDate = baseDates.dateFrom;
  const currentDate = new Date().toISOString().slice(0, 10);
  startDate = startDate >= currentDate ? startDate : currentDate;
  const weekdaySet = new Set(weekdays);

  eachDayOfInterval({
    start: parseISO(startDate),
    end: parseISO(baseDates.dateTo),
  }).forEach((day) => {
    const formattedDay = formatISO(day, { representation: "date" });
    const formattedWeekday = day.toLocaleDateString("en-US", {
      weekday: "long",
    });
    if (!weekdaySet.has(formattedWeekday)) return;

    let dayPrices = basePrices;

    if (priceCorrections && priceCorrections.length > 0) {
      const correction = priceCorrections.find(
        (correction) =>
          formattedDay >= correction.dates.dateFrom &&
          formattedDay <= correction.dates.dateTo &&
          correction.weekdays.includes(formattedWeekday)
      );

      if (correction) {
        dayPrices = correction.prices;
      }
    }

    pricesMap.set(formattedDay, {
      prices: dayPrices,
    });
  });

  return pricesMap;
};
