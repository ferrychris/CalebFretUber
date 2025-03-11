import React from 'react';
import { FaCar, FaShoppingBag, FaTruck } from 'react-icons/fa';
import { Service, ServiceType } from "./types";

// 🟢 Service Configuration
export const SERVICES: Service[] = [
  {
    type: ServiceType.CARPOOLING,
    title: "Covoiturage",
    description: "Transport partagé économique et écologique",
    icon: React.createElement(FaCar, { className: "w-5 h-5" }),
    baseRate: 0.50,
    minPrice: 5,
    theme: {
      bg: "bg-green-500/10",
      text: "text-green-500",
      border: "border-green-500/20",
    },
  },
  {
    type: ServiceType.SHOPPING,
    title: "Livraison de courses",
    description: "Service de livraison pour vos achats quotidiens",
    icon: React.createElement(FaShoppingBag, { className: "w-5 h-5" }),
    baseRate: 0.75,
    minPrice: 10,
    theme: {
      bg: "bg-sunset-500/10",
      text: "text-sunset-500",
      border: "border-sunset-500/20",
    },
  },
  {
    type: ServiceType.LARGE_ITEM,
    title: "Livraison d'objets volumineux",
    description: "Transport sécurisé pour vos gros articles",
    icon: React.createElement(FaTruck, { className: "w-5 h-5" }),
    baseRate: 1.0,
    minPrice: 15,
    theme: {
      bg: "bg-purple-500/10",
      text: "text-purple-500",
      border: "border-purple-500/20",
    },
  },
];

// 🟢 Order Status Configuration
export const ORDER_STATUS_THEME = {
  pending: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-500",
    border: "border-yellow-500/20"
  },
  active: {
    bg: "bg-green-500/10",
    text: "text-green-500",
    border: "border-green-500/20"
  },
  "in-transit": {
    bg: "bg-sunset-500/10",
    text: "text-sunset-500",
    border: "border-sunset-500/20"
  },
  completed: {
    bg: "bg-purple-500/10",
    text: "text-purple-500",
    border: "border-purple-500/20"
  }
} as const;

// 🟢 Toast Configuration
export const TOAST_DURATION = {
  SUCCESS: 3000,
  ERROR: 4000,
} as const;

// 🟢 Location Configuration for Address Autocomplete
export const LOCATION_CONFIG = {
  country: "FR",
  language: "fr",
  region: "fr",
  types: ["street_address", "premise"],
  componentRestrictions: { country: "fr" },
} as const;

// 🟢 Miscellaneous Constants
export const DEBOUNCE_DELAY = 300; // ms

// 🟢 Theme Configuration
export const THEME = {
  colors: {
    midnight: {
      900: "#1a1b1e",
      800: "#2c2d31",
    },
    sunset: "#FF7C58", // Explicitly added to avoid missing reference
    orange: "#FF7C58", // Synonym for consistency
    stone: {
      200: "#e2e2e2",
      300: "#d1d1d1",
      400: "#a3a3a3",
      800: "#292524",
    },
  },
  shadows: {
    sm: "0 1px 2px rgba(0, 0, 0, 0.1)",
    md: "0 4px 6px rgba(0, 0, 0, 0.1)",
    lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
  },
  blur: {
    sm: "blur(4px)",
    md: "blur(8px)",
    lg: "blur(12px)",
  },
} as const;
