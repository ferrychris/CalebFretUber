import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaEuroSign } from 'react-icons/fa';
import { Service } from '../types';
import { useTranslation } from 'react-i18next';
import { formatCurrency } from '../../../../utils/i18n';
import { SERVICES } from '../constants';

interface ServiceSelectionDialogProps {
  onClose: () => void;
  onSelectService: (service: Service) => void;
}

const ServiceSelectionDialog: React.FC<ServiceSelectionDialogProps> = ({
  onClose,
  onSelectService,
}) => {
  const { t } = useTranslation();

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
          className="relative w-full max-w-3xl p-6 bg-midnight-900/95 border border-stone-800/50 
            rounded-lg shadow-xl backdrop-blur-sm"
          onClick={e => e.stopPropagation()}
        >
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-300 
              transition-colors rounded-full hover:bg-stone-800/50"
            aria-label={t('common.close')}
          >
            <FaTimes className="w-4 h-4" />
          </motion.button>

          <div className="mb-8 text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-2xl font-semibold text-stone-200"
            >
              {t('services.selectTitle')}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-stone-400 mt-2"
            >
              {t('services.selectDescription')}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {SERVICES.map((service, index) => (
              <motion.button
                key={service.type}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  backgroundColor: 'rgba(255, 255, 255, 0.03)'
                }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectService(service)}
                className={`group relative overflow-hidden p-5 ${service.theme.bg} 
                  border ${service.theme.border} rounded-lg text-left transition-all 
                  duration-300 backdrop-blur-sm hover:shadow-lg`}
              >
                {/* Hover Gradient Effect */}
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent 
                    opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                <div className="relative">
                  {/* Service Header */}
                  <div className="flex items-center space-x-3 mb-3">
                    <div className={`p-2 rounded-lg bg-white/5 backdrop-blur-sm 
                      ${service.theme.text} transition-colors duration-300`}
                    >
                      {service.icon}
                    </div>
                    <h3 className={`font-medium ${service.theme.text} text-lg`}>
                      {t(`services.${service.type}.title`)}
                    </h3>
                  </div>
                  
                  {/* Service Description */}
                  <p className="text-stone-400 mb-4 min-h-[48px] text-sm">
                    {t(`services.${service.type}.description`)}
                  </p>

                  {/* Service Pricing */}
                  <div className="flex items-center justify-between pt-3 
                    border-t border-stone-800/30">
                    {/* Base Rate */}
                    <div className={`text-sm ${service.theme.text}`}>
                      <span className="text-stone-400">{t('price.baseRate')}:</span>
                      <div className="flex items-center mt-1">
                        <FaEuroSign className="w-3 h-3 mr-1" />
                        <span className="font-medium">
                          {t(`services.${service.type}.baseRate`)}
                        </span>
                      </div>
                    </div>
                    {/* Minimum Price */}
                    <div className={`text-sm ${service.theme.text}`}>
                      <span className="text-stone-400">{t('price.minimum')}:</span>
                      <div className="flex items-center mt-1">
                        <FaEuroSign className="w-3 h-3 mr-1" />
                        <span className="font-medium">
                          {formatCurrency(service.minPrice)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Service Features */}
                  <motion.ul
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="mt-4 space-y-2 text-xs text-stone-400"
                  >
                    {(t(`services.${service.type}.features`, { returnObjects: true }) as string[]).map((feature: string, idx: number) => (
                      <li key={idx} className="flex items-center">
                        <span className={`mr-2 text-lg ${service.theme.text}`}>•</span>
                        {feature}
                      </li>
                    ))}
                  </motion.ul>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Cancel Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={onClose}
            className="mt-6 w-full px-4 py-2 text-sm text-stone-400 hover:text-stone-300 
              transition-colors border border-stone-800/50 rounded-lg hover:bg-stone-800/20"
          >
            {t('form.cancel')}
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ServiceSelectionDialog;