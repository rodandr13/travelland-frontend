import { useState } from "react";

import { useFormContext } from "react-hook-form";

import { resetDetails } from "@/src/enities/booking";
import { setOrderSuccess } from "@/src/enities/booking/model/bookingSlice";
import { resetCart } from "@/src/enities/cart/model/cartSlice";
import { useAppDispatch } from "@/src/shared/lib/redux/hooks";
import { CartItem } from "@/src/shared/types/cart";
import { Button } from "@/src/shared/ui/button";

interface Props {
  items: CartItem[];
}

export const BookOrder = ({ items }: Props) => {
  const { handleSubmit, formState } = useFormContext();
  const dispatch = useAppDispatch();
  const { isValid } = formState;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (formData: any) => {
    setIsLoading(true);
    setError(null);

    const order = {
      user: {
        email: formData.email,
        name: formData.name,
        telephone: formData.phone,
      },
      promoCode: formData.promoCode,
      paymentMethod: formData.paymentMethod,
      orderServices: items.map((item) => {
        return {
          type: item.type.toUpperCase(),
          title: item.title,
          slug: item.slug,
          image_src: item.image.src,
          image_lqip: item.image.lqip,
          id: item.id,
          date: new Date(item.selectedDate).toISOString(),
          time: item.selectedTime,
          participants: item.participants.map((participant) => {
            return {
              category: participant.id,
              title: participant.title,
              count: Number(participant.count),
            };
          }),
        };
      }),
    };

    try {
      const response = await fetch("http://localhost:4000/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error(`Ошибка: ${response.status}`);
      }

      const data = await response.json();
      dispatch(resetDetails());
      dispatch(resetCart());
      dispatch(setOrderSuccess(true));
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        title={isLoading ? "Загрузка..." : "Заказать"}
        variant="confirm"
        type="submit"
        onClick={handleSubmit(onSubmit)}
        disabled={!isValid || isLoading}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};
