import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaSpinner, FaInfoCircle } from 'react-icons/fa';
import LocationInput from '../../LocationInput';
import { Service, OrderFormData, OrderFormErrors, DistanceResult } from '../types';
import { validateOrderForm, calculatePrice } from '../utils';
import PriceInfoCard from './PriceInfoCard';
import { useTranslation } from 'react-i18next';
import { isValidFrenchAddress, validateLocationPrecision, formatDateForInput } from '../../../../utils/i18n';

interface OrderFormProps {
  service: Service;
  order?: OrderFormData;
  onSubmit: (data: OrderFormData) => Promise<void>;
  isSubmitting: boolean;
  viewOnly?: boolean;
}

interface LocationValidations {
  pickupLocation: boolean;
  destination: boolean;
}

const OrderForm: React.FC<OrderFormProps> = ({ 
  service, 
  order, 
  onSubmit, 
  isSubmitting,
  viewOnly = false 
}) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<OrderFormData>({
    pickupLocation: order?.pickupLocation || '',
    destination: order?.destination || '',
    scheduledDate: order?.scheduledDate || '',
    price: order?.price || service.minPrice,
    serviceType: service.type
  });

  const [errors, setErrors] = useState<OrderFormErrors>({});
  const [distanceResult, setDistanceResult] = useState<DistanceResult | null>(null);
  const [isCalculatingDistance, setIsCalculatingDistance] = useState(false);
  const [locationValidations, setLocationValidations] = useState<LocationValidations>({
    pickupLocation: false,
    destination: false
  });

  // Set default date to today in French timezone
  useEffect(() => {
    if (!order) {
      const today = new Date();
      setFormData(prev => ({ ...prev, scheduledDate: formatDateForInput(today) }));
    }
  }, [order]);

  const calculateDistance = async (origin: string, destination: string) => {
    if (!origin || !destination) return;

    setIsCalculatingDistance(true);
    try {
      const response = await fetch(
        `/api/distance?origin=${encodeURIComponent(origin)}&destination=${encodeURIComponent(destination)}&language=fr&region=FR`
      );
      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setDistanceResult(data);
      const distanceInKm = data.distance.value / 1000;
      const calculatedPrice = calculatePrice(distanceInKm, service);
      setFormData(prev => ({ ...prev, price: calculatedPrice }));
      setErrors(prev => ({ ...prev, distance: undefined }));
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        distance: t('location.distanceError')
      }));
    } finally {
      setIsCalculatingDistance(false);
    }
  };

  const handleLocationChange = async (field: 'pickupLocation' | 'destination', value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setLocationValidations(prev => ({ ...prev, [field]: false }));

    // Clear same address error if addresses are different
    if (field === 'destination' && value !== formData.pickupLocation) {
      setErrors(prev => ({ ...prev, sameAddress: undefined }));
    }

    // Validate French address
    const validationResult = await isValidFrenchAddress(value);
    if (!validationResult.isValid) {
      setErrors(prev => ({ ...prev, [field]: validationResult.error }));
      return;
    }

    setLocationValidations(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({ ...prev, [field]: undefined }));

    // Check for same address
    const otherField = field === 'pickupLocation' ? 'destination' : 'pickupLocation';
    if (value === formData[otherField]) {
      setErrors(prev => ({ ...prev, sameAddress: t('location.sameAddressError') }));
      return;
    }

    // Calculate distance if both locations are valid French addresses
    if (locationValidations[otherField]) {
      await calculateDistance(
        field === 'pickupLocation' ? value : formData[otherField],
        field === 'destination' ? value : formData[otherField]
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate both addresses are in France
    if (!locationValidations.pickupLocation || !locationValidations.destination) {
      setErrors(prev => ({
        ...prev,
        form: t('location.bothAddressesRequired')
      }));
      return;
    }

    const formErrors = validateOrderForm(
      formData.pickupLocation,
      formData.destination,
      formData.scheduledDate,
      formData.price,
      service.minPrice,
      !!distanceResult
    );

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="relative space-y-6 px-4 sm:px-6 md:px-8 max-w-4xl m-auto">
      <div className="space-y-6">
        {/* French Address Notice */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 text-sm text-stone-400 p-3 
            bg-stone-800/20 rounded-lg border border-stone-800/30"
        >
          <FaInfoCircle className={service.theme.text} />
          <span>{t('location.franceOnly')}</span>
        </motion.div>

        {/* Form Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Pickup Location */}
            <LocationInput
              label={t('form.pickupLocation')}
              value={formData.pickupLocation}
              onChange={(value) => handleLocationChange('pickupLocation', value)}
              error={errors.pickupLocation}
              disabled={isSubmitting || viewOnly}
            />

            {/* Destination */}
            <LocationInput
              label={t('form.destination')}
              value={formData.destination}
              onChange={(value) => handleLocationChange('destination', value)}
              error={errors.destination}
              disabled={isSubmitting || viewOnly}
            />

            {/* Same Address Error */}
            {errors.sameAddress && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-400"
              >
                {errors.sameAddress}
              </motion.p>
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Date Input */}
            <div>
              <label className="block mb-2 text-sm font-medium text-stone-300">
                {t('form.scheduledDate')}
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, scheduledDate: e.target.value }))}
                  min={formatDateForInput(new Date())}
                  className={`w-full pl-10 pr-4 py-2 bg-midnight-900/90 border ${
                    errors.scheduledDate ? 'border-red-500/50' : 'border-stone-800/50'
                  } rounded-lg text-stone-300 focus:outline-none focus:border-sunset/50
                    disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm`}
                  disabled={isSubmitting || viewOnly}
                />
                <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" />
              </div>
              {errors.scheduledDate && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 text-sm text-red-400"
                >
                  {errors.scheduledDate}
                </motion.p>
              )}
            </div>

            {/* Price Info Card */}
            {distanceResult && (
              <PriceInfoCard
                distanceResult={distanceResult}
                service={service}
                price={formData.price}
              />
            )}
          </div>
        </div>

        {/* Distance Loading */}
        {isCalculatingDistance && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-2 text-stone-400"
          >
            <FaSpinner className="animate-spin mr-2" />
            <span>{t('form.calculating')}</span>
          </motion.div>
        )}

        {/* Form Error */}
        {errors.form && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm text-red-400 text-center"
          >
            {errors.form}
          </motion.div>
        )}

        {/* Submit Button */}
        {!viewOnly && (
          <motion.button
            type="submit"
            disabled={isSubmitting || !locationValidations.pickupLocation || !locationValidations.destination}
            className={`w-full px-4 py-3 ${service.theme.bg} text-white font-medium rounded-lg 
              shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed
              hover:opacity-90 backdrop-blur-sm`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center space-x-2">
                <FaSpinner className="animate-spin" />
                <span>{t('form.submitting')}</span>
              </span>
            ) : (
              t('form.submit')
            )}
          </motion.button>
        )}
      </div>
    </form>
  );
};

export default OrderForm;