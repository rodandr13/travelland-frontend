"use client";

import { setDetails } from "@/src/enities/booking/";
import { formatCurrency } from "@/src/shared/lib/formatCurrency";
import { useAppDispatch } from "@/src/shared/lib/redux/hooks";
import { CartItemParticipants } from "@/src/shared/types/cart";
import { PriceBlock } from "@/src/shared/ui/priceBlock";

import styles from "./styles.module.scss";
import { SelectNumber } from "./ui/SelectNumber";

interface Props {
  id: string;
  participants: CartItemParticipants[];
}

export const SelectPeoples = ({ id, participants }: Props) => {
  const dispatch = useAppDispatch();
  const handleChange = (index: number) => (newValue: number) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index] = {
      ...updatedParticipants[index],
      quantity: newValue,
    };

    if (id) {
      dispatch(
        setDetails({
          key: id,
          details: {
            cart_item_options: updatedParticipants,
          },
        })
      );
    }
  };

  return (
    <section className={styles.selectPeoples}>
      {participants &&
        participants.map((participant, i) => (
          <div
            key={participant.category_id}
            className={styles.selectPeoples__container}
          >
            <div>
              <h4 className={styles.selectPeoples__title}>
                {participant.category_title}
                <span className={styles.selectPeoples__age}>
                  &nbsp;{participant.category_description}
                </span>
              </h4>
              <PriceBlock
                actualPrice
                currentPrice={participant.current_price}
                basePrice={participant.base_price}
              />
            </div>
            <div className={styles.selectPeoples__container}>
              <SelectNumber
                value={participant.quantity || 0}
                onNumberChange={handleChange(i)}
              />
              <span className={styles.selectPeoples__sum}>
                ={" "}
                {formatCurrency(
                  participant.current_price * (participant.quantity || 0)
                )}
              </span>
            </div>
          </div>
        ))}
    </section>
  );
};
