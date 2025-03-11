import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkedAlt, FaClock, FaEuroSign, FaShieldAlt, FaLightbulb, FaUserCheck, FaMobileAlt, FaHeadset } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const features = [
  {
    icon: FaMapMarkedAlt,
    title: "Suivi en temps réel",
    description: "Géolocalisation précise de votre trajet avec une mise à jour instantanée",
    color: "green",
    gradient: "from-green-500/10 to-green-500/5"
  },
  {
    icon: FaUserCheck,
    title: "Conducteurs vérifiés",
    description: "Tous nos conducteurs sont soigneusement sélectionnés et formés",
    color: "sunset",
    gradient: "from-sunset/10 to-sunset/5"
  },
  {
    icon: FaEuroSign,
    title: "Prix transparents",
    description: "Tarification kilométrique claire avec prix minimum garanti",
    color: "purple",
    gradient: "from-purple-500/10 to-purple-500/5"
  },
  {
    icon: FaMobileAlt,
    title: "Application mobile",
    description: "Commandez et suivez vos livraisons depuis votre smartphone",
    color: "blue",
    gradient: "from-blue-500/10 to-blue-500/5"
  },
  {
    icon: FaClock,
    title: "Service 24/7",
    description: "Disponible à tout moment, planifiez vos trajets en avance",
    color: "yellow",
    gradient: "from-yellow-500/10 to-yellow-500/5"
  },
  {
    icon: FaHeadset,
    title: "Support dédié",
    description: "Une équipe à votre écoute pour vous accompagner",
    color: "red",
    gradient: "from-red-500/10 to-red-500/5"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function FeatureSection() {
  const { t } = useTranslation();

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
          <FaLightbulb className="text-sunset" />
          <span className="px-4 py-1.5 rounded-full bg-sunset/10 text-sunset font-medium text-sm">
            {t("Nos avantages")}
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          {t("Pourquoi nous choisir")}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600"
        >
          {t("Des fonctionnalités conçues pour votre confort et votre sécurité")}
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            variants={itemVariants}
            className="relative group"
          >
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} transition-opacity group-hover:opacity-100 opacity-0`} />
            <div className="relative p-6 rounded-2xl bg-white border border-gray-100 shadow-lg group-hover:shadow-xl transition-all">
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl bg-gray-50 ${feature.color === 'sunset' ? 'text-sunset' : `text-${feature.color}-500`} group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {t(feature.title)}
                </h3>
              </div>
              <p className="text-gray-600">
                {t(feature.description)}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}