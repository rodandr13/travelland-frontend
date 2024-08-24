"use client";

import { setDetails } from "@/src/enities/booking/";
import { formatCurrency } from "@/src/shared/lib/formatCurrency";
import { useAppDispatch } from "@/src/shared/lib/redux/hooks";
import { CartParticipants } from "@/src/shared/types/cart";
import { PriceBlock } from "@/src/shared/ui/priceBlock";

import styles from "./styles.module.scss";
import { SelectNumber } from "./ui/SelectNumber";

interface Props {
  id: string;
  participants: CartParticipants[];
}

export const SelectPeoples = ({ id, participants }: Props) => {
  const dispatch = useAppDispatch();
  const handleChange = (index: number) => (newValue: number) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index] = {
      ...updatedParticipants[index],
      count: newValue,
    };

    if (id) {
      dispatch(
        setDetails({
          key: id,
          details: {
            participants: updatedParticipants,
          },
        })
      );
    }
  };

  return (
    <section className={styles.selectPeoples}>
      {participants &&
        participants.map((participant, i) => (
          <div key={participant.id} className={styles.selectPeoples__container}>
            <div>
              <h4 className={styles.selectPeoples__title}>
                {participant.title}
                <span className={styles.selectPeoples__age}>
                  &nbsp;{participant.description}
                </span>
              </h4>
              <PriceBlock
                actualPrice
                price={participant.currentPrice}
                basePrice={participant.basePrice}
              />
            </div>
            <div className={styles.selectPeoples__container}>
              <SelectNumber
                value={participant.count || 0}
                onNumberChange={handleChange(i)}
              />
              <span className={styles.selectPeoples__sum}>
                ={" "}
                {formatCurrency(
                  participant.currentPrice * (participant.count || 0)
                )}
              </span>
            </div>
          </div>
        ))}
    </section>
  );
};
