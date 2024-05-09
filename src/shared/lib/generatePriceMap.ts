import { eachDayOfInterval, formatISO, parseISO } from "date-fns";
import {
  Dates,
  Price,
  PromotionalPrice,
  Weekdays,
} from "@/src/enities/excursion/model/types/ExcursionDetail";
import { PricesMap } from "@/src/shared/types/booking";

interface Props {
  baseDates: Dates;
  basePrices: Price[];
  weekdays: Weekdays;
  promoPrices?: PromotionalPrice[];
  priceCorrections?: PromotionalPrice[];
}

export const generatePriceMap = ({
  baseDates,
  basePrices,
  weekdays,
  promoPrices,
  priceCorrections,
}: Props): PricesMap => {
  const pricesMap: PricesMap = new Map();
  let startDate = baseDates.dateFrom;
  const currentDate = new Date().toISOString().slice(0, 10);
  startDate = startDate >= currentDate ? startDate : currentDate;
  const weekdaySet = new Set(weekdays);

  const dayFormatCache = new Map();

  eachDayOfInterval({
    start: parseISO(startDate),
    end: parseISO(baseDates.dateTo),
  }).forEach((day) => {
    const formattedDay = formatISO(day, { representation: "date" });
    let formattedWeekday = dayFormatCache.get(formattedDay);
    if (!formattedWeekday) {
      formattedWeekday = day.toLocaleDateString("en-US", { weekday: "long" });
      dayFormatCache.set(formattedDay, formattedWeekday);
    }

    if (!weekdaySet.has(formattedWeekday)) return;

    const dailyPrices = new Map(basePrices.map((p) => [p.title, p]));

    const applyPrices = (prices: Price[]) => {
      prices.forEach((p) => {
        dailyPrices.set(p.title, p);
      });
    };

    const promo = promoPrices?.find(
      (p) =>
        formattedDay >= p.dates.dateFrom &&
        formattedDay <= p.dates.dateTo &&
        p.weekdays.includes(formattedWeekday)
    );

    const correction =
      !promo &&
      priceCorrections?.find(
        (c) =>
          formattedDay >= c.dates.dateFrom &&
          formattedDay <= c.dates.dateTo &&
          c.weekdays.includes(formattedWeekday)
      );

    if (promo) {
      applyPrices(promo.prices);
    } else if (correction) {
      applyPrices(correction.prices);
    }

    pricesMap.set(formattedDay, {
      prices: Array.from(dailyPrices.values()),
      basePrice: basePrices,
    });
  });

  return pricesMap;
};
