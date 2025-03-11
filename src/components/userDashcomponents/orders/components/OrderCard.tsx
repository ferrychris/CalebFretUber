import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaCalendarAlt, FaEuroSign } from 'react-icons/fa';
import { Order, Service } from '../types';
import { useTranslation } from 'react-i18next';
import { formatCurrency, formatDate } from '../../../../utils/i18n';

interface OrderCardProps {
  order: Order;
  service: Service;
  onClick: () => void;
}

const getStatusConfig = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return {
        color: 'bg-yellow-500',
        text: 'En attente',
        textColor: 'text-yellow-500'
      };
    case 'active':
      return {
        color: 'bg-green-500',
        text: 'En cours',
        textColor: 'text-green-500'
      };
    case 'in-transit':
      return {
        color: 'bg-sunset',
        text: 'En transit',
        textColor: 'text-sunset'
      };
    case 'completed':
      return {
        color: 'bg-purple-500',
        text: 'Terminé',
        textColor: 'text-purple-500'
      };
    default:
      return {
        color: 'bg-stone-500',
        text: 'Inconnu',
        textColor: 'text-stone-500'
      };
  }
};

const OrderCard: React.FC<OrderCardProps> = ({ order, service, onClick }) => {
  const { t } = useTranslation();
  const statusConfig = getStatusConfig(order.status);

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      onClick={onClick}
      className="relative p-4 bg-midnight-900/90 border border-stone-800/50 rounded-lg 
        shadow-lg backdrop-blur-sm cursor-pointer group overflow-hidden"
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 
          group-hover:opacity-100 transition-opacity duration-300"
      />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${service.theme.bg}`}>
              {service.icon}
            </div>
            <div>
              <h3 className="font-medium text-stone-200">
                {t(`services.${service.type}.title`)}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <div className={`w-2 h-2 rounded-full ${statusConfig.color}`} />
                <span className={`text-sm ${statusConfig.textColor}`}>
                  {t(`orders.status.${order.status}`)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <FaEuroSign className={`w-3 h-3 ${service.theme.text}`} />
            <span className={`font-medium ${service.theme.text}`}>
              {formatCurrency(order.price)}
            </span>
          </div>
        </div>

        {/* Locations */}
        <div className="space-y-2 mb-4">
          <div className="flex items-start space-x-2">
            <FaMapMarkerAlt className="w-4 h-4 text-stone-400 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm text-stone-400">{t('location.pickup')}</p>
              <p className="text-sm text-stone-300 line-clamp-1">
                {order.pickupLocation}
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <FaMapMarkerAlt className="w-4 h-4 text-stone-400 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm text-stone-400">{t('location.destination')}</p>
              <p className="text-sm text-stone-300 line-clamp-1">
                {order.destination}
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-stone-800/30">
          <div className="flex items-center space-x-2">
            <FaCalendarAlt className="w-4 h-4 text-stone-400" />
            <span className="text-sm text-stone-400">
              {formatDate(order.scheduledDate)}
            </span>
          </div>
          <motion.span
            whileHover={{ x: 5 }}
            className={`text-sm ${service.theme.text} group-hover:underline`}
          >
            {t('orders.viewDetails')}
          </motion.span>
        </div>

        {/* Service Features */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 pt-3 border-t border-stone-800/30"
        >
          <ul className="space-y-1">
            {(() => {
              const features = t(`services.${service.type}.features`, { returnObjects: true });
              return Array.isArray(features) 
                ? features.slice(0, 2).map((feature: string, idx: number) => (
                    <li key={idx} className="text-xs text-stone-400 flex items-center">
                      <span className={`mr-2 text-lg ${service.theme.text}`}>•</span>
                      {feature}
                    </li>
                  ))
                : null;
            })()}
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OrderCard;