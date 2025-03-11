import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaMapMarkerAlt, FaMapMarked, FaSpinner } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import debounce from 'lodash/debounce';
import { DEBOUNCE_DELAY } from './orders/constants';
import { AddressFeature } from './orders/types';
import { useTranslation } from 'react-i18next';
import { validateLocationPrecision, validateAddressFeaturePrecision } from '../../utils/i18n';

interface LocationInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  onValidation?: (isValid: boolean) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({
  label,
  value,
  onChange,
  placeholder,
  error,
  disabled,
  onValidation
}) => {
  const { t } = useTranslation();
  const [suggestions, setSuggestions] = useState<AddressFeature[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isUsingCurrentLocation, setIsUsingCurrentLocation] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedFetchSuggestions.cancel();
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchSuggestions = async (query: string) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      onValidation?.(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5&type=housenumber,street&postcode=^[0-9]{5}$`
      );
      const data = await response.json();
      const validAddresses = data.features.filter((feature: AddressFeature) => {
        // Ensure address is in France and has proper precision
        const isValidPostcode = feature.properties.postcode && 
          feature.properties.postcode.length === 5;
        const isValidType = feature.properties.type === 'housenumber' || 
          feature.properties.type === 'street';
        const hasCity = !!feature.properties.city;
        const hasPreciseLocation = validateAddressFeaturePrecision(feature);

        return isValidPostcode && isValidType && hasCity && hasPreciseLocation;
      });

      setSuggestions(validAddresses);
      setShowSuggestions(true);
      onValidation?.(validAddresses.length > 0);
    } catch (error) {
      console.error('Error fetching addresses:', error);
      setSuggestions([]);
      onValidation?.(false);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedFetchSuggestions = useCallback(
    debounce(fetchSuggestions, DEBOUNCE_DELAY),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
    debouncedFetchSuggestions(newValue);
  };

  const handleSuggestionClick = (suggestion: AddressFeature) => {
    const formattedAddress = `${suggestion.properties.label}, ${suggestion.properties.postcode} ${suggestion.properties.city}, France`;
    onChange(formattedAddress);
    setSuggestions([]);
    setShowSuggestions(false);
    onValidation?.(true);
  };

  const getCurrentLocation = async () => {
    setIsUsingCurrentLocation(true);
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&language=fr&region=FR`
      );
      const data = await response.json();

      const result = data.results[0];
      if (!result) throw new Error(t('location.addressNotFound'));

      // Verify it's a French address
      const countryComponent = result.address_components.find(
        (component: any) => component.types.includes('country')
      );
      if (!countryComponent || countryComponent.short_name !== 'FR') {
        throw new Error(t('location.notFrenchAddress'));
      }

      // Verify street-level precision
      if (!validateAddressFeaturePrecision(result)) {
        throw new Error(t('location.streetLevelRequired'));
      }

      onChange(result.formatted_address);
      onValidation?.(true);
    } catch (error) {
      console.error('Error getting current location:', error);
      onValidation?.(false);
    } finally {
      setIsUsingCurrentLocation(false);
    }
  };

  return (
    <div className="relative">
      <label className="block mb-2 text-sm font-medium text-stone-300">
        {label} <span className="text-xs text-stone-400">({t('location.franceOnly')})</span>
      </label>
      <div className="relative">
        <motion.div
          initial={false}
          animate={{ scale: isLoading ? 1.1 : 1 }}
          className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <FaMapMarked className={`w-5 h-5 ${isLoading ? 'text-sunset' : 'text-stone-400'} 
            transition-colors duration-300`} />
        </motion.div>
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={() => value && value.length >= 3 && debouncedFetchSuggestions(value)}
          placeholder={placeholder || t('location.addressPlaceholder')}
          className={`w-full pl-10 pr-24 py-2 bg-midnight-900/90 border ${
            error ? 'border-red-500/50' : 'border-stone-800/50'
          } rounded-lg text-stone-300 focus:outline-none focus:border-sunset/50
            disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm
            transition-all duration-300 shadow-lg`}
          disabled={disabled || isUsingCurrentLocation}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-2">
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mr-2"
            >
              <FaSpinner className="w-4 h-4 text-sunset animate-spin" />
            </motion.div>
          )}
          <motion.button
            type="button"
            onClick={getCurrentLocation}
            disabled={disabled || isUsingCurrentLocation}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-1 text-stone-400 hover:text-sunset transition-colors
              disabled:opacity-50 disabled:cursor-not-allowed"
            title={t('location.currentLocation')}
          >
            <FaMapMarkerAlt className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-sm text-red-400"
        >
          {error}
        </motion.p>
      )}
      <AnimatePresence>
        {showSuggestions && suggestions.length > 0 && (
          <motion.div
            ref={suggestionsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute z-10 w-full mt-1 bg-midnight-800/95 border border-stone-800/50 
              rounded-lg shadow-lg backdrop-blur-sm overflow-hidden"
          >
            <ul className="py-1">
              {suggestions.map((suggestion, index) => (
                <motion.li
                  key={`${suggestion.properties.postcode}-${index}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 4, backgroundColor: 'rgba(255, 124, 88, 0.1)' }}
                  className="px-4 py-2 cursor-pointer text-stone-300
                    flex items-center space-x-2 transition-colors duration-200"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <FaMapMarkerAlt className="w-4 h-4 text-sunset flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="truncate">{suggestion.properties.label}</p>
                    <p className="text-xs text-stone-400 truncate">
                      {suggestion.properties.postcode} {suggestion.properties.city}
                    </p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LocationInput;