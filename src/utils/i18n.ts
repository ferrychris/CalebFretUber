import i18n from 'i18next';
import { InitOptions, Resource } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { LocationValidationResult } from '../components/userDashcomponents/orders/types';

interface AddressComponent {
  short_name: string;
  types: string[];
}

interface GeocodeResult {
  address_components: AddressComponent[];
  formatted_address: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
    location_type: string;
  };
}

interface GeocodeResponse {
  results: GeocodeResult[];
  status: string;
}

interface IpApiResponse {
  country: string;
  error?: boolean;
}

interface Resources {
  fr: {
    translation: {
      common: {
        search: string;
        notifications: string;
        viewAll: string;
        loading: string;
        error: string;
        success: string;
        close: string;
        retry: string;
        frenchAddressOnly: string;
      };

      nav: {
        dashboard: string;
        orders: string;
        settings: string;
        help: string;
        placeOrder: string;
      };

      services: {
        selectTitle: string;
        selectDescription: string;
        carpooling: {
          title: string;
          description: string;
          baseRate: string;
          features: string[];
        };
        shopping: {
          title: string;
          description: string;
          baseRate: string;
          features: string[];
        };
        largeItem: {
          title: string;
          description: string;
          baseRate: string;
          features: string[];
        };
      };

      location: {
        franceOnly: string;
        currentLocation: string;
        addressPlaceholder: string;
        required: string;
        notFrenchAddress: string;
        invalidPostalCode: string;
        invalidPostalCodeRange: string;
        streetLevelRequired: string;
        invalidAddress: string;
        validationError: string;
        searchingLocation: string;
        locationError: string;
        pickup: string;
        destination: string;
        distanceError: string;
      };

      form: {
        pickupLocation: string;
        destination: string;
        scheduledDate: string;
        price: string;
        submit: string;
        submitting: string;
        cancel: string;
        calculating: string;
        errors: {
          pickupRequired: string;
          destinationRequired: string;
          sameAddress: string;
          pastDate: string;
          businessHours: string;
          invalidPrice: string;
          minPrice: string;
          distanceRequired: string;
        };
      };

      orders: {
        newOrder: string;
        viewOrder: string;
        loading: string;
        loadError: string;
        creating: string;
        createSuccess: string;
        createError: string;
        noOrders: string;
        createFirst: string;
        status: {
          pending: string;
          active: string;
          'in-transit': string;
          completed: string;
        };
      };

      price: {
        baseRate: string;
        suggested: string;
        minimum: string;
        distance: string;
        duration: string;
        total: string;
        breakdown: string;
        note: string;
        perKm: string;
      };
    };
  };
  en: {
    translation: {
      common: {
        search: string;
        notifications: string;
        viewAll: string;
        loading: string;
        error: string;
        success: string;
        close: string;
        retry: string;
      };

      nav: {
        dashboard: string;
        orders: string;
        settings: string;
        help: string;
        placeOrder: string;
      };

      services: {
        selectTitle: string;
        selectDescription: string;
        carpooling: {
          title: string;
          description: string;
          baseRate: string;
          features: string[];
        };
        shopping: {
          title: string;
          description: string;
          baseRate: string;
          features: string[];
        };
        largeItem: {
          title: string;
          description: string;
          baseRate: string;
          features: string[];
        };
      };

      location: {
        franceOnly: string;
        currentLocation: string;
        addressPlaceholder: string;
        addressNotFound: string;
        notFrenchAddress: string;
        streetLevelRequired: string;
      };

      form: {
        cancel: string;
        submit: string;
        create: string;
        update: string;
      };

      orders: {
        loading: string;
        loadError: string;
        creating: string;
        createSuccess: string;
        createError: string;
        noOrders: string;
        createFirst: string;
      };

      price: {
        baseRate: string;
        suggested: string;
        minimum: string;
        distance: string;
        duration: string;
        total: string;
        breakdown: string;
        note: string;
      };
    };
  };
  es: {
    translation: {
      // Spanish translations remain unchanged
    };
  };
}

const resources: Resources = {
  fr: {
    translation: {
      // Common
      common: {
        search: 'Rechercher...',
        notifications: 'Notifications',
        viewAll: 'Voir tout',
        loading: 'Chargement...',
        error: 'Erreur',
        success: 'Succès',
        close: 'Fermer',
        retry: 'Réessayer',
        frenchAddressOnly: 'Adresses françaises uniquement'
      },

      // Navigation
      nav: {
        dashboard: 'Tableau de bord',
        orders: 'Commandes',
        settings: 'Paramètres',
        help: 'Aide',
        placeOrder: 'Passer une commande'
      },

      // Services
      services: {
        selectTitle: 'Choisissez votre service',
        selectDescription: 'Sélectionnez le type de service qui correspond à vos besoins',
        carpooling: {
          title: 'Covoiturage',
          description: 'Transport partagé économique et écologique',
          baseRate: '0,50 €/km',
          features: [
            'Trajets partagés avec chauffeurs vérifiés',
            'Suivi en temps réel',
            'Option écologique'
          ]
        },
        shopping: {
          title: 'Livraison de courses',
          description: 'Service de livraison pour vos achats quotidiens',
          baseRate: '0,75 €/km',
          features: [
            'Livraison le jour même disponible',
            'Transport à température contrôlée',
            'Suivi de commande en direct'
          ]
        },
        largeItem: {
          title: 'Livraison d\'objets volumineux',
          description: 'Transport sécurisé pour vos objets volumineux',
          baseRate: '1,00 €/km',
          features: [
            'Manipulation professionnelle',
            'Couverture d\'assurance',
            'Livraison programmée'
          ]
        }
      },

      // Location
      location: {
        franceOnly: 'France uniquement',
        currentLocation: 'Utiliser ma position actuelle',
        addressPlaceholder: 'Saisissez une adresse',
        required: 'L\'adresse est requise',
        notFrenchAddress: 'L\'adresse doit être en France',
        invalidPostalCode: 'Code postal français invalide',
        invalidPostalCodeRange: 'Code postal français invalide (01000-98000)',
        streetLevelRequired: 'Veuillez fournir une adresse précise (numéro et rue)',
        invalidAddress: 'Adresse invalide',
        validationError: 'Erreur lors de la validation de l\'adresse',
        searchingLocation: 'Recherche de votre position...',
        locationError: 'Impossible de trouver votre position',
        pickup: 'Point de retrait',
        destination: 'Destination',
        distanceError: 'Erreur lors du calcul de la distance'
      },

      // Form
      form: {
        pickupLocation: 'Point de retrait',
        destination: 'Destination',
        scheduledDate: 'Date prévue',
        price: 'Prix',
        submit: 'Créer la commande',
        submitting: 'Création en cours...',
        cancel: 'Annuler',
        calculating: 'Calcul en cours...',
        errors: {
          pickupRequired: 'Le point de retrait est requis',
          destinationRequired: 'La destination est requise',
          sameAddress: 'La destination doit être différente du point de retrait',
          pastDate: 'La date ne peut pas être dans le passé',
          businessHours: 'Les commandes sont possibles entre 8h et 20h',
          invalidPrice: 'Le prix doit être supérieur à 0',
          minPrice: 'Le prix minimum est de {{price}}',
          distanceRequired: 'Le calcul de la distance est requis'
        }
      },

      // Orders
      orders: {
        newOrder: 'Nouvelle commande - {{service}}',
        viewOrder: 'Détails de la commande - {{service}}',
        loading: 'Chargement des commandes...',
        loadError: 'Impossible de charger les commandes',
        creating: 'Création de votre commande...',
        createSuccess: 'Commande créée avec succès',
        createError: 'Erreur lors de la création de la commande',
        noOrders: 'Vous n\'avez pas encore de commandes',
        createFirst: 'Créez votre première commande',
        status: {
          pending: 'En attente',
          active: 'En cours',
          'in-transit': 'En transit',
          completed: 'Terminée'
        }
      },

      // Price
      price: {
        baseRate: 'Tarif de base',
        suggested: 'Prix suggéré',
        minimum: 'Prix minimum',
        distance: 'Distance',
        duration: 'Durée estimée',
        total: 'Prix total',
        breakdown: 'Détail du prix',
        note: 'Les prix sont calculés en fonction de la distance et peuvent être ajustés si nécessaire',
        perKm: '{{price}} €/km'
      }
    }
  },
  en: {
    translation: {
      // Common
      common: {
        search: 'Search...',
        notifications: 'Notifications',
        viewAll: 'View All',
        loading: 'Loading...',
        error: 'Error',
        success: 'Success',
        close: 'Close',
        retry: 'Retry'
      },

      // Navigation
      nav: {
        dashboard: 'Dashboard',
        orders: 'Orders',
        settings: 'Settings',
        help: 'Help',
        placeOrder: 'Place Order'
      },

      // Services
      services: {
        selectTitle: 'Choose Your Service',
        selectDescription: 'Select the type of service that matches your needs',
        carpooling: {
          title: 'Carpooling',
          description: 'Economic and eco-friendly shared transport',
          baseRate: '€0.50/km',
          features: [
            'Shared rides with verified drivers',
            'Real-time tracking',
            'Eco-friendly option'
          ]
        },
        shopping: {
          title: 'Shopping Delivery',
          description: 'Delivery service for your daily purchases',
          baseRate: '€0.75/km',
          features: [
            'Same-day delivery available',
            'Temperature-controlled transport',
            'Live order tracking'
          ]
        },
        largeItem: {
          title: 'Large Item Delivery',
          description: 'Secure transport for your large items',
          baseRate: '€1.00/km',
          features: [
            'Professional handling',
            'Insurance coverage',
            'Scheduled delivery'
          ]
        }
      },

      // Location
      location: {
        franceOnly: 'France only',
        currentLocation: 'Use current location',
        addressPlaceholder: 'Enter an address',
        addressNotFound: 'Address not found',
        notFrenchAddress: 'Must be a French address',
        streetLevelRequired: 'Please provide a street-level address'
      },

      // Form
      form: {
        cancel: 'Cancel',
        submit: 'Submit',
        create: 'Create Order',
        update: 'Update Order'
      },

      // Orders
      orders: {
        loading: 'Loading orders...',
        loadError: 'Failed to load orders',
        creating: 'Creating your order...',
        createSuccess: 'Order created successfully',
        createError: 'Failed to create order',
        noOrders: 'You have no orders yet',
        createFirst: 'Create your first order'
      },

      // Price
      price: {
        baseRate: 'Base Rate',
        suggested: 'Suggested Price',
        minimum: 'Minimum Price',
        distance: 'Distance',
        duration: 'Estimated Duration',
        total: 'Total Price',
        breakdown: 'Price Breakdown',
        note: 'Prices are calculated based on distance and can be adjusted as needed'
      }
    }
  },
  es: {
    translation: {
      // Spanish translations remain unchanged
    }
  }
};

// Function to validate French address
export const isValidFrenchAddress = async (address: string): Promise<LocationValidationResult> => {
  if (!address) {
    return {
      isValid: false,
      error: i18n.t('location.required')
    };
  }

  // Check for French postal code format (5 digits)
  const postalCodeMatch = address.match(/\b\d{5}\b/);
  if (!postalCodeMatch) {
    return {
      isValid: false,
      error: i18n.t('location.invalidPostalCode')
    };
  }

  // Validate postal code range (French postal codes are between 01000 and 98000)
  const postalCode = parseInt(postalCodeMatch[0]);
  if (postalCode < 1000 || postalCode > 98000) {
    return {
      isValid: false,
      error: i18n.t('location.invalidPostalCodeRange')
    };
  }

  try {
    const response = await fetch(
      `/api/geocode?address=${encodeURIComponent(address)}&language=fr&region=FR`
    );
    const data = await response.json() as GeocodeResponse;

    if (!data.results?.[0]?.address_components) {
      return {
        isValid: false,
        error: i18n.t('location.invalidAddress')
      };
    }

    // Check if address is in France
    const isInFrance = data.results[0].address_components.some(
      (component: AddressComponent) => component.short_name === 'FR' && component.types.includes('country')
    );

    if (!isInFrance) {
      return {
        isValid: false,
        error: i18n.t('location.notFrenchAddress')
      };
    }

    // Check for street-level precision
    const hasStreetNumber = data.results[0].address_components.some(
      (component: AddressComponent) => component.types.includes('street_number')
    );
    const hasRoute = data.results[0].address_components.some(
      (component: AddressComponent) => component.types.includes('route')
    );

    if (!hasStreetNumber || !hasRoute) {
      return {
        isValid: false,
        error: i18n.t('location.streetLevelRequired')
      };
    }

    return {
      isValid: true,
      formattedAddress: data.results[0].formatted_address,
      location: data.results[0].geometry.location
    };
  } catch (error) {
    console.error('Error validating French address:', error);
    return {
      isValid: false,
      error: i18n.t('location.validationError')
    };
  }
};

// Function to detect user's language based on location
export const detectUserLanguage = async (): Promise<string> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const result = await response.json() as IpApiResponse;
    if (result.country === 'FR') {
      return 'fr';
    }
    return navigator.language.startsWith('fr') ? 'fr' : 'fr'; // Default to French
  } catch (error) {
    console.error('Error detecting user language:', error);
    return 'fr'; // Default to French on error
  }
};

// Function to validate location precision
export const validateLocationPrecision = (location: GeocodeResult): boolean => {
  return location.geometry.location_type === 'ROOFTOP' || 
         location.geometry.location_type === 'RANGE_INTERPOLATED';
};

// Function to validate location precision for French address features
export const validateAddressFeaturePrecision = (feature: any): boolean => {
  // For French addresses, we require street-level or house number precision
  return feature.properties.type === 'housenumber' || feature.properties.type === 'street';
};

// Function to get location configuration
export const getLocationConfig = (language: string = 'fr') => ({
  language,
  region: 'FR',
  componentRestrictions: { country: 'fr' },
  types: ['address'],
  fields: ['address_components', 'formatted_address', 'geometry', 'place_id']
});

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: resources as unknown as Resource,
    lng: 'fr', // Default language
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  } as InitOptions);

// Format currency in EUR
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Format date in French format
export const formatDate = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Europe/Paris',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  };
  
  return new Date(date).toLocaleDateString('fr-FR', options);
};

// Format date for input field
export const formatDateForInput = (date: Date): string => {
  const parisDate = new Date(date.toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
  return parisDate.toISOString().slice(0, 16); // Format: YYYY-MM-DDThh:mm
};

// Check if time is within business hours (8h-20h)
export const isBusinessHours = (date: Date): boolean => {
  const parisTime = new Date(date.toLocaleString('en-US', { timeZone: 'Europe/Paris' }));
  const hours = parisTime.getHours();
  return hours >= 8 && hours < 20;
};

export default i18n;