import React, { useState, useEffect } from "react";
import supabase from "../../utils/supabase";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";
import { SERVICES, ORDER_STATUS_THEME } from "./orders/constants";
import { getToastConfig } from "./orders/utils";
import OrderCard from "./orders/components/OrderCard";
import ServiceSelectionDialog from "./orders/components/ServiceSelectionDialog";
import OrderDetailsDialog from "./orders/components/OrderDetailsDialog";
import { Order as OrderType, Service, OrderFormData } from "./orders/types";
import { useTranslation } from "react-i18next";
import { isValidFrenchAddress } from "../../utils/i18n";

const Order: React.FC = () => {
  const { t } = useTranslation();
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [showServiceDialog, setShowServiceDialog] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();

    const subscription = supabase
      .channel('orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchOrders)
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    setError(null);

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      setError(t('common.error'));
      toast.error(t('orders.loadError'), getToastConfig("error"));
    } else {
      setOrders(data || []);
    }

    setIsLoading(false);
  };

  const handleCreateOrder = async (formData: OrderFormData) => {
    // Validate French addresses
    if (!isValidFrenchAddress(formData.pickupLocation) || !isValidFrenchAddress(formData.destination)) {
      toast.error(t('location.notFrenchAddress'), getToastConfig("error"));
      return;
    }

    setIsCreatingOrder(true);
    const loadingToast = toast.loading(t('orders.creating'));

    try {
      const { error } = await supabase.from("orders").insert([{ 
        ...formData,
        status: "pending",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }]);
      
      if (error) throw error;

      toast.success(t('orders.createSuccess'), getToastConfig("success"));
      setSelectedService(null);
    } catch (error) {
      toast.error(t('orders.createError'), getToastConfig("error"));
    } finally {
      toast.dismiss(loadingToast);
      setIsCreatingOrder(false);
    }
  };

  // We're not implementing order editing yet, so we'll just close the dialog
  const handleViewOrder = async (): Promise<void> => {
    setSelectedOrder(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6 p-4 bg-midnight-900/90 rounded-lg backdrop-blur-sm border border-stone-800/50"
    >
      <div className="flex items-center justify-between">
        <motion.h2 
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          className="text-2xl font-semibold text-stone-200"
        >
          {t('nav.orders')}
        </motion.h2>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowServiceDialog(true)}
          className="px-4 py-2 bg-sunset text-white font-medium rounded-lg 
            shadow-lg hover:bg-sunset/90 transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isCreatingOrder}
        >
          {isCreatingOrder ? (
            <span className="flex items-center space-x-2">
              <FaSpinner className="animate-spin" />
              <span>{t('common.loading')}</span>
            </span>
          ) : (
            t('nav.placeOrder')
          )}
        </motion.button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-12"
        >
          <div className="flex space-x-2">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0 }}
              className="w-3 h-3 bg-sunset rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
              className="w-3 h-3 bg-sunset rounded-full"
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
              className="w-3 h-3 bg-sunset rounded-full"
            />
          </div>
          <p className="mt-4 text-stone-400">{t('orders.loading')}</p>
        </motion.div>
      )}

      {/* Error State */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-8"
        >
          <p className="text-red-400 mb-2">{error}</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={fetchOrders}
            className="text-sunset hover:text-sunset/80 underline transition-colors"
          >
            {t('common.retry')}
          </motion.button>
        </motion.div>
      )}

      {/* Empty State */}
      {!isLoading && !error && orders.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-midnight-800/50 rounded-lg border border-stone-800/30"
        >
          <p className="text-stone-400 mb-4">{t('orders.noOrders')}</p>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowServiceDialog(true)}
            className="text-sunset hover:text-sunset/80 underline transition-colors"
          >
            {t('orders.createFirst')}
          </motion.button>
        </motion.div>
      )}

      {/* Orders List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {orders.map((order, index) => {
            const service = SERVICES.find(s => s.type === order.serviceType)!;
            return (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: index * 0.1 }}
              >
                <OrderCard
                  order={order}
                  service={service}
                  onClick={() => setSelectedOrder(order)}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Service Selection Dialog */}
      <AnimatePresence>
        {showServiceDialog && (
          <ServiceSelectionDialog
            onClose={() => setShowServiceDialog(false)}
            onSelectService={(service: Service) => {
              setSelectedService(service);
              setShowServiceDialog(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Order Details Dialog */}
      <AnimatePresence>
        {selectedService && (
          <OrderDetailsDialog
            service={selectedService}
            onClose={() => setSelectedService(null)}
            onSubmit={handleCreateOrder}
            isSubmitting={isCreatingOrder}
          />
        )}
      </AnimatePresence>

      {/* View Order Dialog */}
      <AnimatePresence>
        {selectedOrder && (
          <OrderDetailsDialog
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
            onSubmit={handleViewOrder}
            isSubmitting={false}
            viewOnly
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Order;
