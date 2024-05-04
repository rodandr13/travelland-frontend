export interface IMeetingPoint {
  description: string;
  image: GalleryImage;
  location: Location;
}

interface Location {
  lng: number;
  lat: number;
}

export interface Dates {
  dateTo: string;
  dateFrom: string;
}

export interface Price {
  price: number;
  title: string;
  description: string;
}

export interface PromotionalPrice {
  weekdays: string[];
  title: string;
  dates: Dates;
  prices: Price[];
}

export interface RouteItem {
  title: string;
  description: string;
  gallery: GalleryImage[];
}

export type AdditionalTerms = string[];
export type Included = string[];
export type Surcharge = string[];
export type Weekdays = string[];
export type Duration = string;
export type StartTime = string[];
export type Subcategory = {
  title: string;
  icon: string;
};
export type Category = {
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
  startingPlace: IMeetingPoint;
  endingPlace: IMeetingPoint;
  basePrices: Price[];
  promotionalPrices: PromotionalPrice[];
  priceCorrections: PromotionalPrice[];
  route: RouteItem[];
  gallery: GalleryImage[];
  subcategory: Subcategory[];
  category: Category;
  parameters: Parameter[];
};
