import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import { useTheme, serviceThemes } from '../utils/theme';
import { services } from '../utils/service';
import logo from '../images/Fret.png'
const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-midnight-900/80 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <motion.div 
              // className="w-10 h-10 rounded-xl bg-sunset flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              
            >
              {/* <span className="text-white font-bold text-xl">C</span> */}
            </motion.div>
            <div>
              <img src={logo} alt="Logo" className="w-[40px] h-[40px] rounded -full" />
            </div>
           
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {services.map((service) => {
              const serviceTheme = serviceThemes[service.theme][theme];
              
              return (
                <Link
                  key={service.name}
                  to={service.href}
                  className={`group px-4 py-2 rounded-xl ${serviceTheme.hover} transition-all duration-200`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${serviceTheme.bg} ${serviceTheme.text} transition-colors`}>
                      <service.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {service.name}
                      </div>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <span>{service.price}</span>
                        <span className="ml-2 opacity-75">min. {service.minPrice}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
            
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Changer le thème"
            >
              {theme === 'dark' ? (
                <FaSun className="w-5 h-5" />
              ) : (
                <FaMoon className="w-5 h-5" />
              )}
            </motion.button>

            <Link
              to="/dashboard/place-order"
              className="flex items-center px-6 py-2.5 bg-sunset text-white rounded-xl hover:bg-sunset/90 transition-colors shadow-sm space-x-2 group"
            >
              <span>Commander</span>
              <FaArrowRight className="text-sm transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-4 md:hidden">
            <motion.button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Changer le thème"
            >
              {theme === 'dark' ? (
                <FaSun className="w-5 h-5" />
              ) : (
                <FaMoon className="w-5 h-5" />
              )}
            </motion.button>

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            >
              {isOpen ? 
                <FaTimes className="w-6 h-6 text-gray-600 dark:text-gray-300" /> : 
                <FaBars className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              }
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        variants={navVariants}
        initial="hidden"
        animate={isOpen ? "visible" : "hidden"}
        className="md:hidden"
      >
        <div className="px-4 pt-3 pb-6 space-y-3 bg-white dark:bg-midnight-900 border-t border-gray-100 dark:border-gray-800 shadow-lg">
          {services.map((service) => {
            const serviceTheme = serviceThemes[service.theme][theme];
            
            return (
              <Link
                key={service.name}
                to={service.href}
                className={`flex items-center justify-between p-3 rounded-xl ${serviceTheme.hover} transition-all`}
                onClick={() => setIsOpen(false)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${serviceTheme.bg} ${serviceTheme.text}`}>
                    <service.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {service.name}
                    </div>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <span>{service.price}</span>
                      <span className="ml-2 opacity-75">min. {service.minPrice}</span>
                    </div>
                  </div>
                </div>
                <FaArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
              </Link>
            );
          })}
          <Link
            to="/dashboard/place-order"
            className="flex items-center justify-center px-4 py-3 text-white bg-sunset hover:bg-sunset/90 rounded-xl transition-colors shadow-sm space-x-2 group"
            onClick={() => setIsOpen(false)}
          >
            <span>Commander maintenant</span>
            <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </motion.div>
    </nav>
  );
}