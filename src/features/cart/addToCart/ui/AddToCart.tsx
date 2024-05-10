import { Button } from "@/src/shared/ui/button";
import { addItem } from "@/src/enities/cart/model/cartSlice";
import { useAppDispatch, useAppSelector } from "@/src/shared/lib/redux/hooks";
import { usePathname } from "next/navigation";
import { BookingDetails } from "@/src/shared/types/booking";
import { selectCartItemExists } from "@/src/enities/cart/model/selectors";

interface Props {
  bookingDetails: BookingDetails;
}

export const AddToCart = ({ bookingDetails }: Props) => {
  const dispatch = useAppDispatch();

  const pathname = usePathname();
  const itemExists = useAppSelector(selectCartItemExists(pathname as string));
  const handleClick = () => {
    dispatch(addItem({ key: pathname as string, details: bookingDetails }));
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
    />
  );
};
