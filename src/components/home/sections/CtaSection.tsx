import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaStar } from 'react-icons/fa';
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

export default function CtaSection() {
  const { theme } = useTheme();

  return (
    <div className="py-24 bg-gray-50 dark:bg-midnight-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <FaStar className="text-sunset" />
            <span className="px-4 py-1.5 rounded-full bg-sunset/10 dark:bg-sunset/20 text-sunset font-medium text-sm">
              Commencez maintenant
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Choisissez votre service
            <br />
            et commencez immédiatement
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-300"
          >
            Des solutions de transport adaptées à tous vos besoins
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
                className={`relative overflow-hidden rounded-2xl p-8 ${serviceTheme.bg} group`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-black/30 dark:from-black/20 dark:to-black/50" />
                
                <div className="relative">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-white/10 text-white">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-semibold text-white">
                      {service.name}
                    </h3>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="text-white/90">
                      {service.description}
                    </div>
                    <div className="flex items-center space-x-3 text-white/80">
                      <span className="text-2xl font-bold">{service.price}</span>
                      <span>/km</span>
                      <span className="text-sm">
                        (min. {service.minPrice})
                      </span>
                    </div>
                  </div>

                  <Link
                    to={service.href}
                    className="inline-flex items-center justify-center w-full px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors group-hover:bg-white/20 space-x-2"
                  >
                    <span>Commander maintenant</span>
                    <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
