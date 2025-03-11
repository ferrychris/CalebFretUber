import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaShieldAlt, FaMapMarkerAlt, FaClock, FaEuroSign } from "react-icons/fa";

const features = [
  {
    icon: <FaShieldAlt className="w-6 h-6 text-sunset" />,
    title: "Sécurité Garantie",
    description: "Transport sécurisé pour tous vos besoins"
  },
  {
    icon: <FaMapMarkerAlt className="w-6 h-6 text-green-500" />,
    title: "Suivi en Temps Réel",
    description: "Suivez vos livraisons en direct"
  },
  {
    icon: <FaClock className="w-6 h-6 text-purple-500" />,
    title: "Service 24/7",
    description: "Disponible à tout moment"
  },
  {
    icon: <FaEuroSign className="w-6 h-6 text-sunset" />,
    title: "Prix Compétitifs",
    description: "Tarifs transparents dès 0,50€/km"
  }
];

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Column - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                  <span className="block">Solutions de Transport</span>
                  <span className="block gradient-text">Simples et Efficaces</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Des services de transport adaptés à vos besoins. Covoiturage, livraison de courses, 
                  ou transport d'objets volumineux - nous avons la solution qu'il vous faut.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/register"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-sunset hover:opacity-90 md:py-4 md:text-lg md:px-10"
                    >
                      Commander maintenant
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Link
                      to="/services"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-sunset bg-sunset/10 hover:bg-sunset/20 md:py-4 md:text-lg md:px-10"
                    >
                      Nos Services
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* Right Column - Feature Grid */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden bg-white dark:bg-gray-800 p-8 shadow-xl border border-gray-100 dark:border-gray-700">
                  {/* Gradient Background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-sunset/10 to-purple-500/10 dark:from-green-500/20 dark:via-sunset/20 dark:to-purple-500/20" />
                  
                  {/* Service Cards */}
                  <div className="relative grid grid-cols-2 gap-6">
                    <div className="service-card service-card-carpooling">
                      <h3 className="text-lg font-semibold text-green-500 dark:text-green-400">Covoiturage</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">0,50€/km</p>
                    </div>
                    <div className="service-card service-card-shopping">
                      <h3 className="text-lg font-semibold text-sunset">Livraison Shopping</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">0,75€/km</p>
                    </div>
                    <div className="service-card service-card-large-items">
                      <h3 className="text-lg font-semibold text-purple-500 dark:text-purple-400">Transport Objets</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">1,00€/km</p>
                    </div>
                    <div className="glass">
                      <h3 className="text-lg font-semibold gradient-text">24/7</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Service continu</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Features Section */}
            <div className="mt-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="relative group bg-white dark:bg-gray-800 p-6 rounded-xl shadow-soft-light dark:shadow-soft-dark hover:shadow-medium-light dark:hover:shadow-medium-dark transition-all duration-300"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">{feature.icon}</div>
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {feature.title}
                        </h3>
                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Hero;