import { resetDetails } from "@/src/enities/booking";
import { addItem } from "@/src/enities/cart/model/cartSlice";
import { useAppDispatch } from "@/src/shared/lib/redux/hooks";
import { CartItem } from "@/src/shared/types/cart";
import { Button } from "@/src/shared/ui/button";

interface Props {
  cartItem: CartItem;
}

export const AddToCart = ({ cartItem }: Props) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(addItem(cartItem));
    dispatch(resetDetails());
  };

  const title = !cartItem?.selectedDate
    ? "Выберите дату"
    : !cartItem?.selectedTime
      ? "Выберите время"
      : !cartItem?.participants.some(
            (participant) => (participant.count ?? 0) > 0
          )
        ? "Укажите количество человек"
        : "Добавить в корзину";

  return (
    <Button
      title={title}
      disabled={
        !cartItem?.selectedDate ||
        !cartItem?.selectedTime ||
        !cartItem?.participants.some(
          (participant) => (participant.count ?? 0) > 0
        )
      }
      onClick={handleClick}
      variant="confirm"
    />
  );
};
