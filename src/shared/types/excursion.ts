export type MeetingPoint = {
  description: string;
  image: GalleryImage;
  location: Location;
};

export type Location = {
  lng: number;
  lat: number;
};

export type Dates = {
  dateTo: string;
  dateFrom: string;
};

export type Price = {
  _id: string;
  price: number;
  title: string;
  description: string;
};

export type PromotionalPrice = {
  weekdays: string[];
  title: string;
  dates: Dates;
  prices: Price[];
};

export type RouteItem = {
  title: string;
  description: string;
  gallery: GalleryImage[];
};

export type AdditionalTerms = string[];
export type Included = string[];
export type Surcharge = string[];
export type Weekdays = string[];
export type Duration = {
  days: number;
  hours: number;
  minutes: number;
};
export type StartTime = string[];
export type Subcategory = {
  title: string;
  icon: string;
};
export type Category = {
  _id: string;
  title: string;
  icon: string;
};
export type Parameter = {
  title: string;
  value: string;
  icon: string;
};

export type GalleryImage = {
  src: string;
  lqip: string;
};

export type ExcursionType = {
  _id: string;
  _type: string;
  title: string;
  city: string;
  country: string;
  description: string;
  weekdays: Weekdays;
  duration: Duration;
  startTime: StartTime;
  dates: Dates;
  included: Included;
  surcharge: Surcharge;
  additionalTerms: AdditionalTerms;
  startingPlace: MeetingPoint;
  endingPlace: MeetingPoint;
  basePrices: Price[];
  promotionalPrices: PromotionalPrice[];
  priceCorrections: PromotionalPrice[];
  route: RouteItem[];
  gallery: GalleryImage[];
  subcategory: Subcategory[];
  category: Category;
  parameters: Parameter[];
};

export interface ExcursionCard {
  _id: string;
  title: string;
  slug: string;
  gallery: GalleryImage[];
  weekdays: Weekdays;
  category: Category;
  duration: Duration;
  subcategory: string[];
  basePrices: Price[];
  promotionalPrices: PromotionalPrice[];
  priceCorrections: PromotionalPrice[];
}

export type ExcursionCards = ExcursionCard[];
