import { useState } from "react";

import { SubmitHandler, useFormContext } from "react-hook-form";

import { resetDetails } from "@/src/enities/booking";
import { setOrderSuccess } from "@/src/enities/booking/model/bookingSlice";
import { resetCart } from "@/src/enities/cart/model/cartSlice";
import { apiClient } from "@/src/shared/api";
import {
  EXTERNAL_API_BASE_URL,
  ORDER_ENDPOINTS,
} from "@/src/shared/lib/constants";
import { useAppDispatch } from "@/src/shared/lib/redux/hooks";
import { CartItem } from "@/src/shared/types/cart";
import { Button } from "@/src/shared/ui/button";
import { ContactsData } from "@/src/widgets/detailedCart/ui/DetailedCart";

interface Props {
  items: CartItem[];
}

export const BookOrder = ({ items }: Props) => {
  const { handleSubmit } = useFormContext<ContactsData>();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit: SubmitHandler<ContactsData> = async (formData) => {
    setIsLoading(true);
    setError(null);

    const order = {
      user: {
        email: formData.email,
        name: formData.name,
        telephone: formData.phone,
      },
      promoCode: formData.promoCode || "",
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
      const url = `${EXTERNAL_API_BASE_URL}${ORDER_ENDPOINTS.CREATE}`;
      const response = await apiClient(url, {
        method: "POST",
        body: order,
        credentials: "include",
      });

      if (response.redirect) {
        window.location.href = response.redirect;
      }

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
        disabled={isLoading}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
};
