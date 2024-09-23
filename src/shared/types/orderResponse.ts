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

type ServicePrice = {
  id: number;
  price_type: string;
  base_price: number;
  current_price: number;
  quantity: number;
  category_title: string;
  order_service_id: number;
  total_base_price: number;
  total_current_price: number;
};

type OrderService = {
  id: number;
  service_id: string;
  service_type: string;
  service_title: string;
  date: string;
  time: string;
  slug: string;
  image_src: string;
  image_lqip: string;
  service_prices: ServicePrice[];
  total_current_price: number;
  total_base_price: number;
};

type Order = {
  id: number;
  user_id: number;
  cancellation_reason: string | null;
  cancelled_at: string | null;
  comments: string | null;
  completed_at: string | null;
  confirmed_at: string | null;
  created_at: string;
  updated_at: string | null;
  due_date: string | null;
  currency: string;
  order_status: OrderStatus;
  email_status: NotificationStatus;
  telegram_status: NotificationStatus;
  payment_status: PaymentStatus;
  payment_method: PaymentMethod;
  promo_code: string | null;
  order_services: OrderService[];
  paid_amount: number;
  discount_amount: number;
  total_base_price: number;
  total_current_price: number;
};
