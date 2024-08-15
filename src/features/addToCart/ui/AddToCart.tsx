import { addItemToCartFeature } from "@/src/features/addToCart/model";
import { CartItem } from "@/src/shared/types/cart";
import { Button } from "@/src/shared/ui/button";

interface Props {
  cartItem: CartItem;
  id: string;
}

export const AddToCart = ({ cartItem, id }: Props) => {
  const handleClick = () => {
    addItemToCartFeature(cartItem);
  };

  const title = !cartItem?.selectedDate
    ? "Выберите дату"
    : !cartItem?.selectedTime
      ? "Выберите время"
      : !cartItem?.participants || cartItem.participants.length === 0
        ? "Укажите количество человек"
        : "Добавить в корзину";

  return (
    <Button
      title={title}
      disabled={
        !cartItem?.selectedDate ||
        !cartItem?.selectedTime ||
        !cartItem?.participants ||
        cartItem.participants.length === 0
      }
      onClick={handleClick}
      variant="add-to-cart"
    />
  );
};
