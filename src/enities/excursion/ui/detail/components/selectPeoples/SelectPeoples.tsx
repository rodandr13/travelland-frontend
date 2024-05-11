"use client";

import { usePathname } from "next/navigation";

import { setDetails } from "@/src/enities/excursion/ui/detail/components/bookingSection/model/bookingSlice";
import {
  selectDateByKey,
  selectParticipantsByKey,
} from "@/src/enities/excursion/ui/detail/components/bookingSection/model/selectors";
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
  let values: number[] = [];
  if (tempPrice) {
    const valuesLength = tempPrice.length;
    values = new Array(valuesLength).fill(0);
    if (values.length > 0) {
      values[0] = 2;
    }
  }

  const handleChange = (index: number) => (newValue: number) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index] = newValue;

    if (pathname) {
      dispatch(
        setDetails({
          key: pathname,
          details: { participants: updatedParticipants },
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
                value={participants[i] || 0}
                onNumberChange={handleChange(i)}
              />
              <span className={styles.selectPeoples__sum}>
                = {(price.price * (participants[i] || 0)).toFixed(2)} €
              </span>
            </div>
          </div>
        ))}
    </section>
  );
};
