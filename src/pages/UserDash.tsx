import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/userDashcomponents/Sidebar';
import DashIndex from '../components/userDashcomponents/DashIndex';
import DashNav from '../components/userDashcomponents/Dashnav';
import Order from '../components/userDashcomponents/Order';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { detectUserLanguage } from '../utils/i18n';

export const UserDash = () => {
  const { t, i18n } = useTranslation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeLanguage = async () => {
      try {
        const detectedLanguage = await detectUserLanguage();
        await i18n.changeLanguage(detectedLanguage);
      } catch (error) {
        console.error('Error initializing language:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeLanguage();
  }, [i18n]);

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  const pageTransition = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { 
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1]
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen bg-midnight-900 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sunset-500"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-midnight-900">
      {/* Subtle gradient background */}
      <div className="fixed inset-0 bg-gradient-to-br from-pearl-50 via-pearl-100 to-pearl-200 animate-gradient-slow pointer-events-none" />
      
      {/* Subtle pattern overlay */}
      <div className="fixed inset-0 opacity-[0.02] bg-[radial-gradient(circle,_#000_1px,_transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Content */}
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      <motion.div 
        className="flex-1 ml-64 relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <DashNav />
        <motion.div 
          className="mt-6 mx-6 mb-6"
          variants={pageTransition}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="bg-midnight-800/50 backdrop-blur-sm rounded-xl border border-stone-600/10 shadow-soft mt-[80px]">
            <main className="min-h-[calc(100vh-12rem)]">
              <AnimatePresence mode="wait">
                <Routes>
                  <Route index element={
                    <motion.div {...pageTransition}>
                      <DashIndex />
                    </motion.div>
                  } />
                  <Route path="orders" element={
                    <motion.div {...pageTransition}>
                      <Order />
                    </motion.div>
                  } />
                  <Route path="place-order" element={
                    <motion.div {...pageTransition}>
                      <Order />
                    </motion.div>
                  } />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </AnimatePresence>
            </main>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UserDash;