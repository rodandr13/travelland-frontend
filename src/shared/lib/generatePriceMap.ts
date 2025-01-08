import { eachDayOfInterval, formatISO, parseISO } from "date-fns";

import { PricesMap } from "@/shared/types/booking";
import { CartItemParticipants } from "@/shared/types/cart";
import {
  Dates,
  Price,
  PromotionalPrice,
  Weekdays,
} from "@/shared/types/excursion";

interface Props {
  baseDates: Dates;
  basePrices: Price[];
  weekdays: Weekdays;
  promoPrices?: PromotionalPrice[] | null;
  priceCorrections?: PromotionalPrice[] | null;
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
    let formattedWeekday: string | undefined = dayFormatCache.get(formattedDay);
    if (!formattedWeekday) {
      formattedWeekday = day.toLocaleDateString("en-US", { weekday: "long" });
      dayFormatCache.set(formattedDay, formattedWeekday);
    }

    if (!weekdaySet.has(formattedWeekday)) return;

    // Инициализация массива с базовыми ценами
    const priceArray: CartItemParticipants[] = basePrices.map((basePrice) => ({
      current_price: basePrice.price,
      base_price: basePrice.price,
      category_title:
        basePrice.type !== "groupSize" ? basePrice.title : "Группа",
      category_id: basePrice.categoryId,
      quantity: 0,
      category_description:
        basePrice.type !== "groupSize"
          ? basePrice.description
          : "Стоимость указана за всю группу",
      price_type: basePrice.type,
      total_base_price: 0,
      total_current_price: 0,
      groupSize: basePrice.groupSize,
    }));

    // Функция для применения промо или корректировочных цен
    const applyPrices = (prices: Price[]) => {
      prices.forEach((p) => {
        const category = priceArray.find(
          (item) => item.category_id === p.categoryId
        );
        if (category) {
          category.current_price = p.price;
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

    const correction = !promo
      ? priceCorrections?.find(
          (c) =>
            formattedDay >= c.dates.dateFrom &&
            formattedDay <= c.dates.dateTo &&
            c.weekdays.includes(formattedWeekday)
        )
      : undefined;

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
