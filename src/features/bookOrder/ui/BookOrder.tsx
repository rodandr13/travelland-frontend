import { logger } from "@sentry/utils";

import { CartItem } from "@/src/shared/types/cart";
import { Button } from "@/src/shared/ui/button";

interface Props {
  items: CartItem[];
  promoCode: string;
  paymentMethod: string;
  user: {
    email: string;
    name: string;
    phone: string;
  };
}

export const BookOrder = ({ user, items, promoCode, paymentMethod }: Props) => {
  const handleCreateOrder = async () => {
    const order = {
      user: {
        email: user.email,
        name: user.name,
        telephone: user.phone,
        id: "6a42dbeb-219b-42d4-b2cd-7acd637cfdc0",
      },
      promoCode: promoCode,
      paymentMethod: paymentMethod,
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
      logger.error(error);
    }
  };

  return (
    <Button title="Заказать" variant="confirm" onClick={handleCreateOrder} />
  );
};
