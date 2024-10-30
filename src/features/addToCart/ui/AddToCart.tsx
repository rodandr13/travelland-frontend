import { useAddToCart } from "@/src/features/addToCart/model/useAddToCart";
import { CartItem } from "@/src/shared/types/cart";
import { Button } from "@/src/shared/ui/button";

interface Props {
  cartItem: CartItem;
}

export const AddToCart = ({ cartItem }: Props) => {
  const { addToCart, loading, error } = useAddToCart();

  const handleClick = async () => {
    try {
      await addToCart(cartItem);
    } catch (error) {
      console.error("Revalidation error:", error);
    }
  };

  const getButtonTitle = () => {
    if (loading) return "Добавление...";
    if (!cartItem?.date) return "Выберите дату";
    if (!cartItem?.time) return "Выберите время";
    if (
      !cartItem?.options.some((participant) => (participant.quantity ?? 0) > 0)
    ) {
      return "Укажите количество человек";
    }
    return "Добавить в корзину";
  };

  return (
    <Button
      title={getButtonTitle()}
      disabled={
        loading ||
        !cartItem?.date ||
        !cartItem?.time ||
        !cartItem?.options.some(
          (participant) => (participant.quantity ?? 0) > 0
        )
      }
      onClick={handleClick}
      variant="confirm"
    />
  );
};
