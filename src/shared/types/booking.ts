type Price = {
  price: number;
  title: string;
  description: string;
};

export type PricesValue = {
  prices: Price[];
  basePrice: Price[];
};

export type Participants = {
  category: string;
  count: number;
};

export type PricesMap = Map<string, PricesValue>;

export type BookingDetails = {
  title: string;
  image: string;
  selectedDate: string;
  participants: Participants[];
  time: string;
  prices: PricesValue;
  totalPrice: number;
};
