export type ServiceType = 'carpooling' | 'shopping' | 'large-items';

export interface ThemeColors {
  bg: string;
  text: string;
  hover: string;
  border: string;
  shadow: string;
  button: string;
}

export interface ServiceTheme {
  light: ThemeColors;
  dark: ThemeColors;
}

export interface StatusThemeColors {
  bg: string;
  text: string;
  border: string;
  shadow: string;
}

export interface StatusTheme {
  light: StatusThemeColors;
  dark: StatusThemeColors;
}

export type OrderStatus = 'pending' | 'active' | 'completed' | 'in-transit';

export interface PriceEstimate {
  distance: number;
  duration: number;
  price: number;
  formattedPrice: string;
  formattedDistance: string;
  formattedDuration: string;
}

export interface LocationCoordinates {
  lat: number;
  lng: number;
  address: string;
  formattedAddress?: string;
}

export interface OrderDetails {
  serviceType: ServiceType;
  pickup: LocationCoordinates;
  destination: LocationCoordinates;
  date: string;
  status: OrderStatus;
  price: PriceEstimate;
  clientName?: string;
  clientPhone?: string;
  notes?: string;
}

export interface ServicePrice {
  baseRate: number;
  minPrice: number;
  formattedBaseRate: string;
  formattedMinPrice: string;
}

export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceDetails {
  type: ServiceType;
  name: string;
  description: string;
  features: ServiceFeature[];
  price: ServicePrice;
  theme: ServiceTheme;
  icon: string;
}