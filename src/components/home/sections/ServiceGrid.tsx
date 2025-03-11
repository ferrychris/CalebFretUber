import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { useTheme, serviceThemes } from '../../../utils/theme';
import { services } from '../../../utils/service';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4
    }
  }
};

export default function ServiceGrid() {
  const { theme } = useTheme();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {services.map((service) => {
        const serviceTheme = serviceThemes[service.theme][theme];
        
        return (
          <motion.div
            key={service.name}
            variants={itemVariants}
            className="group relative"
          >
            <div className={`absolute inset-0 rounded-2xl ${serviceTheme.hover} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            <div className="relative p-8 rounded-2xl bg-white dark:bg-midnight-900 border border-gray-100 dark:border-gray-800 shadow-sm group-hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className={`p-4 rounded-xl ${serviceTheme.bg} ${serviceTheme.text} group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {service.name}
                </h3>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {service.description}
              </p>

              <div className="space-y-3 mb-8">
                {service.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className={`p-1 rounded-lg ${serviceTheme.bg}`}>
                      <FaArrowRight className={`w-4 h-4 ${serviceTheme.text}`} />
                    </div>
                    <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-baseline gap-1">
                  <span className={`text-2xl font-bold ${serviceTheme.text}`}>
                    {service.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400">/km</span>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  minimum {service.minPrice}
                </div>
              </div>

              <Link
                to={service.href}
                className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-xl text-white font-medium transition-colors ${serviceTheme.button} group`}
              >
                <span>Commander maintenant</span>
                <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}