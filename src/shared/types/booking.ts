type Price = {
  price: number;
  title: string;
  description: string;
};

export type PricesValue = {
  prices: Price[];
  basePrice: Price[];
};

export type PricesMap = Map<string, PricesValue>;

export type BookingDetails = {
  title: string;
  image: string;
  selectedDate: string | null;
  participants: number[];
  time: string | null;
  prices: PricesValue | null;
  totalPrice: number | null;
};
