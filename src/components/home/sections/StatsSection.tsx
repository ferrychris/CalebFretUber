import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaStar, FaRoute, FaShieldAlt } from "react-icons/fa";

const stats = [
  {
    icon: FaUsers,
    value: "10K+",
    label: "Utilisateurs actifs",
    description: "Communauté grandissante",
    color: "green",
    gradient: "from-green-500/10 to-green-500/5"
  },
  {
    icon: FaRoute,
    value: "50K+",
    label: "Trajets réalisés",
    description: "En toute sécurité",
    color: "sunset",
    gradient: "from-sunset/10 to-sunset/5"
  },
  {
    icon: FaStar,
    value: "4.8/5",
    label: "Note moyenne",
    description: "Satisfaction client",
    color: "purple",
    gradient: "from-purple-500/10 to-purple-500/5"
  },
  {
    icon: FaShieldAlt,
    value: "100%",
    label: "Conducteurs vérifiés",
    description: "Service professionnel",
    color: "blue",
    gradient: "from-blue-500/10 to-blue-500/5"
  }
];

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

export default function StatsSection() {
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
          <FaStar className="text-sunset" />
          <span className="px-4 py-1.5 rounded-full bg-sunset/10 text-sunset font-medium text-sm">
            Nos chiffres
          </span>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          La confiance en chiffres
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-gray-600"
        >
          Des milliers d'utilisateurs nous font confiance chaque jour
        </motion.p>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {stats.map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="relative group"
          >
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stat.gradient} transition-opacity group-hover:opacity-100 opacity-0`} />
            <div className="relative p-6 rounded-2xl bg-white border border-gray-100 shadow-lg group-hover:shadow-xl transition-all text-center">
              <div className="flex justify-center mb-4">
                <div className={`p-3 rounded-xl bg-gray-50 ${
                  stat.color === 'sunset' ? 'text-sunset' :
                  stat.color === 'purple' ? 'text-purple-500' :
                  stat.color === 'blue' ? 'text-blue-500' :
                  'text-green-500'
                } group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mb-2">
                <span className="text-3xl font-bold text-gray-900">
                  {stat.value}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {stat.label}
              </h3>
              <p className="text-sm text-gray-600">
                {stat.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}