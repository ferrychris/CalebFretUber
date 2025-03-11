import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaClipboardList, FaPlus, FaHistory, FaChartLine,
  FaCar, FaShoppingBag, FaCouch, FaTruck, FaBox
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const DashIndex = () => {
  const services = [
    {
      icon: FaClipboardList,
      title: 'View Orders',
      description: 'Track active and completed orders',
      path: '/dashboard/orders',
      color: 'sunset'
    },
    {
      icon: FaPlus,
      title: 'Place New Order',
      description: 'Create a new delivery request',
      path: '/dashboard/place-order',
      color: 'purple'
    },
    {
      icon: FaHistory,
      title: 'Order History',
      description: 'View past transactions',
      path: '/dashboard/orders?tab=past',
      color: 'sunset'
    },
    {
      icon: FaChartLine,
      title: 'Analytics',
      description: 'Track delivery metrics',
      path: '/dashboard/orders?view=analytics',
      color: 'purple'
    }
  ];

  const recommendedServices = [
    {
      icon: FaCar,
      title: 'Carpooling',
      description: 'Share rides to save costs',
      path: '/dashboard/carpool',
      stats: '85% match based on your location',
      color: 'green'
    },
    {
      icon: FaShoppingBag,
      title: 'Shopping Delivery',
      description: 'Get your groceries delivered',
      path: '/dashboard/shopping',
      stats: 'Popular in your area',
      color: 'sunset'
    },
    {
      icon: FaCouch,
      title: 'Large Item Delivery',
      description: 'Move furniture and appliances',
      path: '/dashboard/large-items',
      stats: 'Based on recent searches',
      color: 'purple'
    }
  ];

  return (
    <motion.div 
      className="p-6 space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2 gradient-text">Welcome to Your Dashboard</h1>
        <p className="text-stone-400">Manage your orders and track deliveries</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={service.path}>
              <motion.div 
                className="bg-midnight-800/80 backdrop-blur-lg rounded-xl p-6 border border-stone-600/10
                         hover:border-sunset/20 transition-all duration-300"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={`w-12 h-12 rounded-lg bg-${service.color}/10 flex items-center justify-center mb-4`}>
                  <service.icon className={`text-${service.color} text-2xl`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                <p className="text-stone-400">{service.description}</p>
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {[
          { label: 'Active Orders', value: '24', trend: '+12% this week' },
          { label: 'Completed Today', value: '18', trend: '95% success rate' },
          { label: 'Total Revenue', value: '$2.4k', trend: '+8% this month' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            className="bg-midnight-800 rounded-lg p-6 border border-stone-600/10"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -2 }}
          >
            <h4 className="text-2xl font-bold text-white mb-1">{stat.value}</h4>
            <p className="text-stone-400">{stat.label}</p>
            <span className="text-sm text-green-500">{stat.trend}</span>
          </motion.div>
        ))}
      </div> */}

      {/* Recommended Services */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Recommended Services</h2>
          <span className="text-stone-400 text-sm">Based on your activity</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedServices.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={service.path}>
                <motion.div 
                  className="bg-midnight-800/80 backdrop-blur-lg rounded-xl p-6 border border-stone-600/10
                           hover:border-sunset/20 transition-all duration-300 h-full"
                  whileHover={{ y: -4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg bg-${service.color}/10 flex items-center justify-center`}>
                      <service.icon className={`text-${service.color} text-2xl`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-white mb-1">{service.title}</h3>
                      <p className="text-stone-400 text-sm mb-3">{service.description}</p>
                      <span className="text-xs text-sunset">{service.stats}</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DashIndex;