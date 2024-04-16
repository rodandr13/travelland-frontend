"use client";

import { PriceBlock } from "@/src/shared/ui/priceBlock";
import { SelectNumber } from "./ui/";
import styles from "./styles.module.scss";
import { PricesMap } from "@/src/shared/types/excursion";
import { useAppDispatch, useAppSelector } from "@/src/shared/lib/redux/hooks";
import { usePathname } from "next/navigation";
import { setDetails } from "@/src/enities/excursion/ui/excursionDetail/ui/bookingSection/model/bookingSlice";
import { selectParticipantsByKey } from "@/src/enities/excursion/ui/excursionDetail/ui/bookingSection/model/selectors";

interface Props {
  prices: PricesMap;
}
export const SelectPeoples = ({ prices }: Props) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const tempPrice = prices.get("2024-05-20");
  const basePrice = prices.get("2024-05-20")?.basePrice;
  const participants = useAppSelector(
    selectParticipantsByKey(pathname as string)
  );
  let values: number[] = [];
  if (tempPrice && tempPrice.prices) {
    const valuesLength = tempPrice.prices.length;
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
        tempPrice.prices.map((price, i) => (
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
                = {price.price.toFixed(2)} €
              </span>
            </div>
          </div>
        ))}
    </section>
  );
};
