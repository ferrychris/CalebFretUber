import { ReactNode } from 'react';

export enum ServiceType {
  CARPOOLING = 'carpooling',
  SHOPPING = 'shopping',
  LARGE_ITEM = 'largeItem'
}

export interface Service {
  type: ServiceType;
  title: string;
  description: string;
  icon: ReactNode;
  baseRate: number;
  minPrice: number;
  theme: {
    bg: string;
    text: string;
    border: string;
  };
}

export interface OrderFormData {
  pickupLocation: string;
  destination: string;
  scheduledDate: string;
  price: number;
  serviceType: ServiceType;
}

export interface OrderFormErrors {
  pickupLocation?: string;
  destination?: string;
  scheduledDate?: string;
  price?: string;
  distance?: string;
  sameAddress?: string;
  form?: string;
}

export interface OrderValidation {
  pickupLocation: boolean;
  destination: boolean;
  scheduledDate: boolean;
  price: boolean;
}

export interface PriceInfo {
  distance: number;
  duration: number;
  baseRate: number;
  suggestedPrice: number;
  minimumPrice: number;
}

export type OrderStatus = 'pending' | 'active' | 'inTransit' | 'completed';

export interface Order extends OrderFormData {
  id: string;
  userId: string;
  serviceType: ServiceType;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface DistanceResult {
  distance: {
    text: string;    // Distance in text format (e.g., "5,2 km")
    value: number;   // Distance in meters
  };
  duration: {
    text: string;    // Duration in text format (e.g., "10 minutes")
    value: number;   // Duration in seconds
  };
}

export interface LocationValidationResult {
  isValid: boolean;
  error?: string;
  formattedAddress?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface PriceInfoCardProps {
  distanceResult: DistanceResult;
  service: Service;
  price: number;
}

export interface ToastConfig {
  style: {
    background: string;
    color: string;
    borderRadius: string;
    border: string;
  };
  duration?: number;
  iconTheme: {
    primary: string;
    secondary: string;
  };
}

export interface ServiceSelectionDialogProps {
  services: Service[];
  onClose: () => void;
  onSelectService: (service: Service) => void;
}

export interface OrderDetailsDialogProps {
  service: Service;
  onClose: () => void;
  onSubmit: (data: OrderFormData) => Promise<void>;
  isSubmitting: boolean;
  viewOnly?: boolean;
  order?: OrderFormData;
}

export interface OrderCardProps {
  order: Order;
  service: Service;
  onClick?: () => void;
}

export interface AddressFeature {
  type: string;
  geometry: {
    type: string;
    coordinates: [number, number];
  };
  properties: {
    label: string;
    score: number;
    type: 'housenumber' | 'street';
    name: string;
    postcode: string;
    city: string;
    context: string;
    id: string;
    x: number;
    y: number;
    citycode: string;
    oldcitycode?: string;
    district?: string;
  };
}