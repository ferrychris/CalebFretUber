import { IconType } from 'react-icons';
import { FaCar, FaShoppingBag, FaTruck } from 'react-icons/fa';
import type { ServiceType } from './types';

export interface Service {
  name: string;
  description: string;
  price: string;
  minPrice: string;
  features: string[];
  icon: IconType;
  href: string;
  theme: ServiceType;
}

export const services: Service[] = [
  {
    name: 'Covoiturage',
    description: 'Transport partagé économique et écologique pour vos déplacements quotidiens',
    price: '0,50€',
    minPrice: '5€',
    features: [
      'Trajets partagés',
      'Prix économique',
      'Réservation flexible'
    ],
    icon: FaCar,
    href: '/dashboard/place-order?service=carpooling',
    theme: 'carpooling'
  },
  {
    name: 'Livraison Shopping',
    description: 'Service de livraison rapide pour vos achats en ville',
    price: '0,75€',
    minPrice: '10€',
    features: [
      'Livraison express',
      'Suivi en temps réel',
      'Protection des achats'
    ],
    icon: FaShoppingBag,
    href: '/dashboard/place-order?service=shopping',
    theme: 'shopping'
  },
  {
    name: 'Transport Objets',
    description: 'Transport sécurisé pour vos objets volumineux et meubles',
    price: '1,00€',
    minPrice: '15€',
    features: [
      'Objets volumineux',
      'Transport sécurisé',
      'Assurance incluse'
    ],
    icon: FaTruck,
    href: '/dashboard/place-order?service=large-items',
    theme: 'large-items'
  }
] as const;

export function calculatePrice(distance: number, serviceType: ServiceType): number {
  const service = services.find(s => s.theme === serviceType);
  if (!service) throw new Error('Service non trouvé');

  const pricePerKm = parseFloat(service.price.replace(',', '.'));
  const minPrice = parseFloat(service.minPrice.replace('€', ''));
  
  const calculatedPrice = distance * pricePerKm;
  return Math.max(calculatedPrice, minPrice);
}

export function formatPrice(price: number): string {
  return price.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).replace('.', ',') + '€';
}

export function getServiceByType(type: ServiceType): Service {
  const service = services.find(s => s.theme === type);
  if (!service) throw new Error('Service non trouvé');
  return service;
}