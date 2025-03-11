import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaCheck, FaMapMarkerAlt } from 'react-icons/fa';
import { useTheme, serviceThemes } from '../../../utils/theme';
import { services } from '../../../utils/service';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function ServicesSection() {
  const { theme } = useTheme();

  return (
    <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-2 mb-4"
        >
          <FaMapMarkerAlt className="text-sunset" />
          <span className="px-4 py-1.5 rounded-full bg-sunset/10 dark:bg-sunset/20 text-sunset font-medium text-sm">
            Nos services
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
        >
          Services de transport adaptés
          <br />à tous vos besoins
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600 dark:text-gray-300"
        >
          Choisissez le service qui correspond le mieux à vos besoins
        </motion.p>
      </div>

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
              className="service-card group"
            >
              <div className="relative">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-4 rounded-xl ${serviceTheme.bg} ${serviceTheme.text} group-hover:scale-110 transition-transform`}>
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
                        <FaCheck className={`w-4 h-4 ${serviceTheme.text}`} />
                      </div>
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mb-6">
                  <div className={`price-tag ${serviceTheme.text}`}>
                    <span className="text-2xl font-bold">{service.price}</span>
                    <span className="text-gray-500 dark:text-gray-400">/km</span>
                  </div>
                  <div className={`text-sm ${serviceTheme.text}`}>
                    minimum {service.minPrice}
                  </div>
                </div>

                <Link
                  to={service.href}
                  className={`w-full inline-flex items-center justify-center px-6 py-3 rounded-xl text-white font-medium transition-colors ${serviceTheme.button}`}
                >
                  Commander maintenant
                </Link>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
