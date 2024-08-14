import { addItem } from "@/src/enities/cart/model/cartSlice";
import { useAppDispatch } from "@/src/shared/lib/redux/hooks";
import { BookingDetails } from "@/src/shared/types/booking";
import { Button } from "@/src/shared/ui/button";

interface Props {
  bookingDetails: Partial<BookingDetails>;
  id: string;
}

export const AddToCart = ({ bookingDetails, id }: Props) => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(addItem({ key: id, details: bookingDetails }));
  };

  const title = !bookingDetails?.selectedDate
    ? "Выберите дату"
    : !bookingDetails?.time
      ? "Выберите время"
      : !bookingDetails?.participants ||
          bookingDetails.participants.length === 0
        ? "Укажите количество человек"
        : "Добавить в корзину";

  return (
    <Button
      title={title}
      disabled={
        !bookingDetails?.selectedDate ||
        !bookingDetails?.time ||
        !bookingDetails?.participants ||
        bookingDetails.participants.length === 0
      }
      onClick={handleClick}
      variant="add-to-cart"
    />
  );
};
