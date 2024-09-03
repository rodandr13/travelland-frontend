import { useFormContext } from "react-hook-form";

import { CartItem } from "@/src/shared/types/cart";
import { Button } from "@/src/shared/ui/button";

interface Props {
  items: CartItem[];
}

export const BookOrder = ({ items }: Props) => {
  const { handleSubmit } = useFormContext();

  const onSubmit = async (formData: any) => {
    console.log(formData);
    const order = {
      user: {
        email: formData.email,
        name: formData.name,
        telephone: formData.phone,
        id: "6a42dbeb-219b-42d4-b2cd-7acd637cfdc0",
      },
      promoCode: formData.promoCode,
      paymentMethod: formData.paymentMethod,
      reservations: items.map((item) => {
        return {
          __type: item.type,
          title: item.title,
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
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      title="Заказать"
      variant="confirm"
      type="submit"
      onClick={handleSubmit(onSubmit)}
    />
  );
};
