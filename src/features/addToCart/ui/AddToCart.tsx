import { useState } from "react";

import { addCartItem } from "@/enities/cart/model/thunks";
import { mapToDto } from "@/features/addToCart/lib/mappers";
import { useAppDispatch } from "@/shared/lib/redux/hooks";
import { CartItem } from "@/shared/types/cart";
import { Button } from "@/shared/ui/button";

interface Props {
  cartItem: CartItem;
}

export const AddToCart = ({ cartItem }: Props) => {
  const dispatch = useAppDispatch();
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleClick = async () => {
    if (isAdding) return;

    setIsAdding(true);
    setError(null);

    try {
      const mappedCart = mapToDto(cartItem);
      await dispatch(addCartItem(mappedCart)).unwrap();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ошибка при добавлении в корзину");
      }
    } finally {
      setIsAdding(false);
    }
  };

  const getButtonTitle = () => {
    if (!cartItem?.date) return "Выберите дату";
    if (!cartItem?.time) return "Выберите время";
    if (
      !cartItem?.cart_item_options.some(
        (participant) => (participant.quantity ?? 0) > 0
      )
    ) {
      return "Укажите количество человек";
    }
    return isAdding ? "Добавление..." : "Добавить в корзину";
  };

  const isDisabled =
    isAdding ||
    !cartItem?.date ||
    !cartItem?.time ||
    !cartItem?.cart_item_options.some(
      (participant) => (participant.quantity ?? 0) > 0
    );

  return (
    <>
      {error && <div className="error">{error}</div>}
      <Button
        title={getButtonTitle()}
        disabled={isDisabled}
        onClick={handleClick}
        variant="confirm"
      />
    </>
  );
};
