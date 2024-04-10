import { eachDayOfInterval, format } from "date-fns";
import { enUS } from "date-fns/locale";
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
  priceCorrections: PromotionalPrice[];
}

export const generatePriceMap = ({
  baseDates,
  basePrices,
  weekdays,
  priceCorrections,
}: Props) => {
  const pricesMap: PricesMap = new Map();
  let startDate = new Date(baseDates.dateFrom);
  const currentDate = new Date();
  startDate = startDate >= currentDate ? startDate : currentDate;
  const hasPriceCorrections = priceCorrections && priceCorrections.length > 0;

  eachDayOfInterval({
    start: startDate,
    end: baseDates.dateTo,
  }).forEach((day) => {
    if (weekdays.includes(format(day, "EEEE", { locale: enUS }))) {
      pricesMap.set(format(day, "dd-MM-yyyy"), {
        prices: basePrices,
      });
      if (hasPriceCorrections) {
        for (let i = 0; i < priceCorrections.length; i++) {
          if (
            day >= new Date(priceCorrections[i].dates.dateFrom) &&
            day <= new Date(priceCorrections[i].dates.dateTo) &&
            priceCorrections[i].weekdays.includes(
              format(day, "EEEE", { locale: enUS })
            )
          ) {
            pricesMap.set(format(day, "dd-MM-yyyy"), {
              prices: priceCorrections[i].prices,
            });
            break;
          }
        }
      }
    }
  });
  return pricesMap;
};
