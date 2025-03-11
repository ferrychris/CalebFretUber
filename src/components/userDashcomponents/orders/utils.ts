import { Service, LocationValidationResult, ToastConfig } from './types';

export const validateFrenchAddress = (address: string): LocationValidationResult => {
  if (!address) {
    return {
      isValid: false,
      error: 'L\'adresse est requise'
    };
  }

  const isFrenchAddress = 
    address.toLowerCase().includes('france') ||
    /\b\d{5}\b/.test(address); // French postal code format

  if (!isFrenchAddress) {
    return {
      isValid: false,
      error: 'L\'adresse doit être en France'
    };
  }

  return { isValid: true };
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

export const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const calculatePrice = (distanceInKm: number, service: Service): number => {
  const price = Math.max(service.baseRate * distanceInKm, service.minPrice);
  return Math.round(price * 100) / 100;
};

export const getToastConfig = (type: 'success' | 'error'): ToastConfig => ({
  style: {
    background: '#1a1b1e',
    color: '#e2e2e2',
    borderRadius: '0.5rem',
    border: `1px solid ${type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)'}`
  },
  duration: type === 'success' ? 3000 : 4000,
  iconTheme: {
    primary: type === 'success' ? '#FF7C58' : '#ef4444',
    secondary: '#1a1b1e'
  }
});

export const validateOrderForm = (
  pickupLocation: string,
  destination: string,
  scheduledDate: string,
  price: number,
  minPrice: number,
  hasDistance: boolean
): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  // Location validation
  if (!pickupLocation) errors.pickup_location = 'Le point de retrait est requis';
  if (!destination) errors.destination = 'La destination est requise';
  if (pickupLocation === destination) {
    errors.destination = 'La destination doit être différente du point de retrait';
  }

  // Date validation
  const selectedDate = new Date(scheduledDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (selectedDate < today) {
    errors.scheduled_date = 'La date ne peut pas être dans le passé';
  }

  // Price validation
  if (price <= 0) {
    errors.price = 'Le prix doit être supérieur à 0';
  }
  if (price < minPrice) {
    errors.price = `Le prix minimum est de ${minPrice}€`;
  }

  // Distance validation
  if (!hasDistance) {
    errors.distance = 'Le calcul de la distance est requis';
  }

  return errors;
};