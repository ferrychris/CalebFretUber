import React from 'react';
import { motion } from 'framer-motion';
import { FaRoute, FaClock, FaEuroSign } from 'react-icons/fa';
import { PriceInfoCardProps } from '../types';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../../../utils/i18n';

const PriceInfoCard: React.FC<PriceInfoCardProps> = ({ distanceResult, service, price }) => {
  const { t } = useTranslation();
  const { distance, duration } = distanceResult;
  const distanceInKm = distance.value / 1000;
  const basePrice = distanceInKm * service.baseRate;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 ${service.theme.bg} border ${service.theme.border} 
        rounded-lg backdrop-blur-sm`}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Distance */}
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-white/5 ${service.theme.text}`}>
            <FaRoute className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm text-stone-400">{t('price.distance')}</p>
            <p className={`font-medium ${service.theme.text}`}>
              {distance.text}
            </p>
          </div>
        </div>

        {/* Duration */}
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-white/5 ${service.theme.text}`}>
            <FaClock className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm text-stone-400">{t('price.duration')}</p>
            <p className={`font-medium ${service.theme.text}`}>
              {duration.text}
            </p>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg bg-white/5 ${service.theme.text}`}>
            <FaEuroSign className="w-4 h-4" />
          </div>
          <div>
            <p className="text-sm text-stone-400">{t('price.suggested')}</p>
            <p className={`font-medium ${service.theme.text}`}>
              {formatCurrency(price)}
            </p>
          </div>
        </div>
      </div>

      {/* Price Breakdown */}
      <div className="mt-4 pt-4 border-t border-stone-800/30">
        <h3 className="text-sm font-medium text-stone-300 mb-3">
          {t('price.breakdown')}
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-stone-400">
              {t('price.baseRate')} ({t(`services.${service.type}.baseRate`)} × {distanceInKm.toFixed(1)} km)
            </span>
            <span className="text-stone-300">{formatCurrency(basePrice)}</span>
          </div>
          {basePrice < service.minPrice && (
            <div className="flex justify-between">
              <span className="text-stone-400">{t('price.minimum')}</span>
              <span className="text-stone-300">+{formatCurrency(service.minPrice - basePrice)}</span>
            </div>
          )}
          <div className="flex justify-between font-medium pt-2 border-t border-stone-800/20">
            <span className={service.theme.text}>{t('price.total')}</span>
            <span className={service.theme.text}>{formatCurrency(price)}</span>
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4 text-xs text-stone-400 text-center"
      >
        {t('price.note')}
      </motion.div>

      {/* Service-specific info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className={`mt-4 p-3 rounded-lg bg-white/5 text-sm ${service.theme.text}`}
      >
        <div className="flex items-center justify-between">
          <span>{t(`services.${service.type}.title`)}</span>
          <span>{t(`services.${service.type}.baseRate`)}</span>
        </div>
        <p className="text-xs mt-1 opacity-80">
          {t(`services.${service.type}.description`)}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default PriceInfoCard;