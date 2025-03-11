import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { ServiceScene } from '../../three/ServiceScene';
import { useTheme } from '../../../utils/theme';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

const HeroSection: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section className="relative w-full min-h-[80vh] overflow-hidden">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 -z-10">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 15]} />
          <ambientLight intensity={theme === 'dark' ? 0.2 : 0.4} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={theme === 'dark' ? 0.2 : 0.4}
          />
          <Suspense fallback={null}>
            <ServiceScene />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
        </Canvas>
      </div>

      {/* Content Overlay */}
      <div className="relative container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-[80vh]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="gradient-text">Vos Services de Transport</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Solutions de transport personnalisées pour tous vos besoins
          </p>

          {/* Service Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* Carpooling Service */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="service-card service-card-carpooling"
            >
              <h3 className="text-2xl font-bold text-green-500 dark:text-green-400 mb-3">
                Covoiturage
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Voyagez ensemble, économisez plus
              </p>
              <div className="price-tag price-tag-carpooling">
                0,50€/km
              </div>
            </motion.div>

            {/* Shopping Service */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="service-card service-card-shopping"
            >
              <h3 className="text-2xl font-bold text-sunset mb-3">
                Livraison Shopping
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Vos achats livrés à domicile
              </p>
              <div className="price-tag price-tag-shopping">
                0,75€/km
              </div>
            </motion.div>

            {/* Large Items Service */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="service-card service-card-large-items"
            >
              <h3 className="text-2xl font-bold text-purple-500 dark:text-purple-400 mb-3">
                Transport Objets
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Transport sécurisé pour vos objets
              </p>
              <div className="price-tag price-tag-large-items">
                1,00€/km
              </div>
            </motion.div>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="button mt-12"
          >
            Commander maintenant
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;