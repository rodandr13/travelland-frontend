type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED"
  | "PROCESSING"
  | "RETURNED";

type NotificationStatus = "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";

type PaymentStatus =
  | "PENDING"
  | "CANCELLED"
  | "COMPLETED"
  | "FAILED"
  | "REFUNDED";

type PaymentMethod = "CASH" | "CARD" | "INSTALLMENT_PAYMENT";

type ReservationPrice = {
  id: number;
  price_type: string;
  base_price: number;
  current_price: number;
  amount_persons: number;
  category_title: string;
  order_reservation_id: number;
};

type OrderReservation = {
  id: number;
  reservation_id: string;
  reservation_type: string;
  reservation_title: string;
  date: string;
  time: string;
  slug: string;
  image_src: string;
  image_lqip: string;
  order_id: number;
  reservation_prices: ReservationPrice[];
  reservationTotalCurrentPrice: number;
  reservationTotalBasePrice: number;
};

type Order = {
  id: number;
  created_at: string;
  updated_at: string;
  order_status: OrderStatus;
  email_status: NotificationStatus;
  telegram_status: NotificationStatus;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  promo_code: string | null;
  user_id: number;
  order_reservations: OrderReservation[];
  orderTotalCurrentPrice: number;
  orderTotalBasePrice: number;
};
