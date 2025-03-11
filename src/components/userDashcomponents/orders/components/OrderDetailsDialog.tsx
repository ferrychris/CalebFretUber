import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaMapMarkerAlt } from 'react-icons/fa';
import { OrderDetailsDialogProps, OrderFormData } from '../types';
import OrderForm from './OrderForm';
import { useTranslation } from 'react-i18next';

const OrderDetailsDialog: React.FC<OrderDetailsDialogProps> = ({
  service,
  order,
  onClose,
  onSubmit,
  isSubmitting,
  viewOnly = false
}) => {
  const { t } = useTranslation();

  const handleSubmit = async (data: OrderFormData) => {
    try {
      await onSubmit(data);
      onClose();
    } catch (error) {
      // Error handling is managed by the parent component
      console.error('Error handling order:', error);
    }
  };

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
          className="relative w-full max-w-xl p-6 bg-midnight-900/95 border border-stone-800/50 
            rounded-lg shadow-xl backdrop-blur-sm"
          onClick={e => e.stopPropagation()}
        >
          {!isSubmitting && (
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
          )}

          <div className="flex items-center space-x-4 mt-[250px]">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className={`p-3 rounded-lg ${service.theme.bg} backdrop-blur-sm 
                border ${service.theme.border}`}
            >
              {service.icon}
            </motion.div>
            <div>
              <motion.h2 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-xl font-semibold text-stone-200"
              >
                {viewOnly 
                  ? t('orders.viewOrder', { service: t(`services.${service.type}.title`) })
                  : t('orders.newOrder', { service: t(`services.${service.type}.title`) })
                }
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-sm text-stone-400"
              >
                {t(`services.${service.type}.description`)}
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 mt-1"
              >
                <span className={`text-sm ${service.theme.text}`}>
                  {t('price.baseRate')}:
                </span>
                <span className={`text-sm font-medium ${service.theme.text}`}>
                  {t(`services.${service.type}.baseRate`)}
                </span>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 mt-1"
              >
                <FaMapMarkerAlt className="text-stone-400" />
                <span className="text-sm text-stone-400">
                  {t('common.frenchAddressOnly')}
                </span>
              </motion.div>
            </div>
          </div>

          <OrderForm
            service={service}
            order={order}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            viewOnly={viewOnly}
          />

          {!isSubmitting && !viewOnly && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="mt-4 w-full px-4 py-2 text-sm text-stone-400 hover:text-stone-300 
                transition-colors border border-stone-800/50 rounded-lg hover:bg-stone-800/20"
            >
              {t('form.cancel')}
            </motion.button>
          )}

          {viewOnly && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="mt-4 w-full px-4 py-2 text-sm bg-sunset text-white 
                transition-colors rounded-lg hover:bg-sunset/90"
            >
              {t('common.close')}
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OrderDetailsDialog;