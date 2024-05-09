import { Button } from "@/src/shared/ui/button";
import { addItem } from "@/src/enities/cart/model/cartSlice";
import { useAppDispatch } from "@/src/shared/lib/redux/hooks";
import { usePathname } from "next/navigation";
import { BookingDetails } from "@/src/shared/types/booking";

interface Props {
  bookingDetails: BookingDetails;
}

export const AddToCart = ({ bookingDetails }: Props) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const handleClick = () => {
    dispatch(addItem({ key: pathname as string, details: bookingDetails }));
  };
  return (
    <Button
      title={
        !bookingDetails?.selectedDate
          ? "Выберите дату"
          : !bookingDetails?.time
            ? "Выберите время"
            : !bookingDetails?.participants ||
                bookingDetails.participants.length === 0
              ? "Укажите количество человек"
              : "Добавить в корзину"
      }
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
