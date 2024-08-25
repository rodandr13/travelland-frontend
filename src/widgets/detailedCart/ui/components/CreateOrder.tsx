import { CartItem } from "@/src/shared/types/cart";
import { Button } from "@/src/shared/ui/button";

interface Props {
  items: CartItem[];
  promoCode: string;
  paymentMethod: string;
}

export const CreateOrder = ({ items, promoCode, paymentMethod }: Props) => {
  const handleCreateOrder = () => {
    const order = {
      user: {
        id: "6a42dbeb-219b-42d4-b2cd-7acd637cfdc0",
        name: "Andrei",
        telephone: "12323123",
        email: "test@tes.ru",
      },
      promoCode: promoCode,
      paymentMethod: paymentMethod,
      reservations: items.map((item) => {
        return {
          type: item.type,
          title: item.title,
          id: item.id,
          date: new Date(item.selectedDate).toISOString(),
          time: item.selectedTime,
          participants: item.participants.map((participant) => {
            return {
              category: participant.id,
              title: participant.title,
              count: participant.count,
            };
          }),
        };
      }),
    };
    console.log(order);
  };

  return (
    <Button title="Заказать" variant="confirm" onClick={handleCreateOrder} />
  );
};
