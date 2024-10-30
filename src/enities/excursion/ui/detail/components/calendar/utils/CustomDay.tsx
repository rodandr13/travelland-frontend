import clsx from "clsx";

import { formatCurrency } from "@/src/shared/lib/formatCurrency";
import { CartItemParticipants } from "@/src/shared/types/cart";

interface Props {
  dayNumber: number;
  prices: CartItemParticipants[] | undefined;
}

export const CustomDay = ({ dayNumber, prices }: Props) => {
  const showPrice = Boolean(prices);
  let baseAdultPrice = 0;
  let currentAdultPrice = 0;
  if (showPrice && prices) {
    baseAdultPrice = prices[0]?.base_price || 0;
    currentAdultPrice = prices[0]?.current_price || 0;
  }
  const isIncreased = baseAdultPrice < currentAdultPrice;
  const isReduction =
    baseAdultPrice !== 0 &&
    currentAdultPrice !== 0 &&
    baseAdultPrice > currentAdultPrice;
  return (
    <div
      className={clsx(`react-datepicker__priceContainer`, {
        "react-datepicker__priceContainer_increased": isIncreased,
        "react-datepicker__priceContainer_reduction": isReduction,
      })}
    >
      <span className="react-datepicker__dayValue">{dayNumber}</span>
      {showPrice && (
        <span className="react-datepicker__price">
          {formatCurrency(currentAdultPrice)}
        </span>
      )}
    </div>
  );
};
