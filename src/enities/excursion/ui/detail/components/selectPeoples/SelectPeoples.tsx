"use client";

import { usePathname } from "next/navigation";

import { setDetails } from "@/src/enities/excursion/ui/detail/components/bookingSection/model/bookingSlice";
import {
  selectDateByKey,
  selectParticipantsByKey,
} from "@/src/enities/excursion/ui/detail/components/bookingSection/model/selectors";
import { formatCurrency } from "@/src/shared/lib/formatCurrency";
import { getFormattedDate } from "@/src/shared/lib/getFormattedDate";
import { useAppDispatch, useAppSelector } from "@/src/shared/lib/redux/hooks";
import { PricesMap } from "@/src/shared/types/booking";
import { PriceBlock } from "@/src/shared/ui/priceBlock";

import styles from "./styles.module.scss";
import { SelectNumber } from "./ui/SelectNumber";

interface Props {
  prices: PricesMap;
}

export const SelectPeoples = ({ prices }: Props) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const selectedDate = useAppSelector(selectDateByKey(pathname as string));
  const formattedDate = selectedDate ? getFormattedDate(selectedDate) : "";
  const tempPrice = prices.get(formattedDate)?.prices;
  const basePrice = prices.get(formattedDate)?.basePrice;
  const participants = useAppSelector(
    selectParticipantsByKey(pathname as string)
  );
  const handleChange =
    (index: number, category: string) => (newValue: number) => {
      const updatedParticipants = [...participants];
      updatedParticipants[index] = {
        ...updatedParticipants[index],
        count: newValue,
        category: category,
      };
      if (pathname) {
        dispatch(
          setDetails({
            key: pathname,
            details: {
              participants: updatedParticipants,
            },
          })
        );
      }
    };

  return (
    <section className={styles.selectPeoples}>
      {tempPrice &&
        tempPrice.map((price, i) => (
          <div key={i} className={styles.selectPeoples__container}>
            <div>
              <h4 className={styles.selectPeoples__title}>
                {price.title}
                <span className={styles.selectPeoples__age}>
                  &nbsp;{price.description}
                </span>
              </h4>
              <PriceBlock
                actualPrice
                price={price.price}
                basePrice={basePrice && basePrice[i].price}
              />
            </div>
            <div className={styles.selectPeoples__container}>
              <SelectNumber
                value={participants[i]?.count || 0}
                onNumberChange={handleChange(i, price.title)}
              />
              <span className={styles.selectPeoples__sum}>
                = {formatCurrency(price.price * (participants[i]?.count || 0))}
              </span>
            </div>
          </div>
        ))}
    </section>
  );
};
