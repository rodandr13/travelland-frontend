export interface IMeetingPoint {
  title: string;
  description: string;
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
  gallery: string[];
}
export type Included = string[];
export type Surcharge = string[];
export type Weekdays = string[];
export type Duration = number;
export type StartTime = string[];
export type Subcategory = string[];
export type Category = string;

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
  meetingPoint: IMeetingPoint;
  basePrices: Price[];
  promotionalPrices: PromotionalPrice[];
  priceCorrections: PromotionalPrice[];
  route: RouteItem[];
  gallery: string[];
  subcategory: Subcategory;
  category: Category;
};
