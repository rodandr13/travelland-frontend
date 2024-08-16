import { eachDayOfInterval, formatISO, parseISO } from "date-fns";

import { PricesMap } from "@/src/shared/types/booking";
import { CartParticipants } from "@/src/shared/types/cart";
import {
  Dates,
  Price,
  PromotionalPrice,
  Weekdays,
} from "@/src/shared/types/excursion";

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

  if (startDate >= currentDate || currentDate >= baseDates.dateTo) {
    return pricesMap;
  }

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

    // Инициализация массива с базовыми ценами
    const priceArray: CartParticipants[] = basePrices.map((basePrice) => ({
      currentPrice: basePrice.price,
      basePrice: basePrice.price,
      title: basePrice.title,
      id: basePrice.categoryId,
      count: null,
    }));

    // Функция для применения промо или корректировочных цен
    const applyPrices = (prices: Price[]) => {
      prices.forEach((p) => {
        const category = priceArray.find((item) => item.title === p.title);
        if (category) {
          category.currentPrice = p.price;
        }
      });
    };

    // Поиск соответствующего промо или коррекции
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

    // Применение цен, приоритет коррекционной цене
    if (correction) {
      applyPrices(correction.prices);
    } else if (promo) {
      applyPrices(promo.prices);
    }

    pricesMap.set(formattedDay, priceArray);
  });
  return pricesMap;
};
