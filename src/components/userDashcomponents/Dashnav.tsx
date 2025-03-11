import React, { useState } from "react";
import {
  FaBell,
  FaMoon,
  FaSun,
  FaSearch,
  FaChevronDown,
  FaSignOutAlt,
  FaUser,
  FaCog,
  FaGlobe
} from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface Notification {
  id: number;
  message: string;
  time: string;
  isRead: boolean;
}

interface DashNavProps {
  isSidebarOpen?: boolean;
}

const DashNav: React.FC<DashNavProps> = ({ isSidebarOpen = true }) => {
  const { t, i18n } = useTranslation();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [notifications] = useState<Notification[]>([
    {
      id: 1,
      message: t('notifications.rideArriving'),
      time: t('notifications.justNow'),
      isRead: false,
    },
    {
      id: 2,
      message: t('notifications.packageDelivered', { id: '1234' }),
      time: t('notifications.hoursAgo', { count: 2 }),
      isRead: false,
    },
    {
      id: 3,
      message: t('notifications.orderConfirmed'),
      time: t('notifications.hoursAgo', { count: 5 }),
      isRead: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setShowLanguageMenu(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 right-0 ${
          isSidebarOpen ? "lg:left-64" : "lg:left-20"
        } left-0 bg-midnight-900 border-b border-stone-600/10 z-30 transition-all duration-300`}
      >
        <div className="px-4 lg:px-6 py-3">
          {/* Desktop View */}
          <div className="hidden lg:flex items-center justify-between">
            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sunset/70" />
                <input
                  type="text"
                  placeholder={t('common.search')}
                  className="input w-full"
                />
              </div>
            </div>

            {/* Right Side Icons */}
            <div className="flex items-center gap-4">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                  className="p-2 hover:bg-midnight-800/50 rounded-full transition-colors duration-300 flex items-center gap-2"
                >
                  <FaGlobe className="text-stone-400" />
                  <span className="text-stone-400 text-sm uppercase">{i18n.language}</span>
                </button>

                {showLanguageMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-midnight-800 rounded-xl shadow-lg border border-stone-600/10 py-2">
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className="w-full px-4 py-2 text-left hover:bg-midnight-700/50 text-white transition-colors duration-300"
                    >
                      English
                    </button>
                    <button
                      onClick={() => handleLanguageChange('fr')}
                      className="w-full px-4 py-2 text-left hover:bg-midnight-700/50 text-white transition-colors duration-300"
                    >
                      Français
                    </button>
                    <button
                      onClick={() => handleLanguageChange('es')}
                      className="w-full px-4 py-2 text-left hover:bg-midnight-700/50 text-white transition-colors duration-300"
                    >
                      Español
                    </button>
                  </div>
                )}
              </div>

              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 hover:bg-midnight-800/50 rounded-full transition-colors duration-300"
              >
                {isDarkMode ? (
                  <FaSun className="text-sunset" />
                ) : (
                  <FaMoon className="text-stone-400" />
                )}
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="p-2 hover:bg-midnight-800/50 rounded-full relative transition-colors duration-300"
                >
                  <FaBell className="text-stone-400" />
                  {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-sunset text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-midnight-800 rounded-xl shadow-lg border border-stone-600/10 py-2">
                    <div className="px-4 py-2 border-b border-stone-600/10">
                      <h3 className="font-semibold text-white">
                        {t('common.notifications')}
                      </h3>
                    </div>
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-midnight-700/50 ${
                          !notification.isRead ? "bg-sunset/5" : ""
                        } transition-colors duration-300`}
                      >
                        <p className="text-sm text-white">
                          {notification.message}
                        </p>
                        <p className="text-xs text-stone-400 mt-1">
                          {notification.time}
                        </p>
                      </div>
                    ))}
                    <div className="px-4 py-2 border-t border-stone-600/10">
                      <button className="text-sunset text-sm hover:text-sunset/80 w-full text-center transition-colors duration-300">
                        {t('notifications.viewAll')}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 hover:bg-midnight-800/50 rounded-lg px-2 py-1 transition-colors duration-300"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-sunset flex items-center justify-center text-white">
                    D
                  </div>
                  <span className="font-medium text-white">David</span>
                  <FaChevronDown className="text-stone-400 text-sm" />
                </button>

                {/* Profile Dropdown */}
                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-midnight-800 rounded-xl shadow-lg border border-stone-600/10 py-2">
                    <button className="w-full px-4 py-2 text-left hover:bg-midnight-700/50 flex items-center gap-2 text-white transition-colors duration-300">
                      <FaUser className="text-sunset/70" />
                      <span>{t('profile.profile')}</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-midnight-700/50 flex items-center gap-2 text-white transition-colors duration-300">
                      <FaCog className="text-sunset/70" />
                      <span>{t('profile.settings')}</span>
                    </button>
                    <div className="border-t border-stone-600/10 my-1"></div>
                    <button 
                      className="w-full px-4 py-2 text-left hover:bg-midnight-700/50 flex items-center gap-2 text-purple transition-colors duration-300"
                      onClick={() => {
                        localStorage.removeItem("token");
                        window.location.reload();
                      }}
                    >
                      <FaSignOutAlt />
                      <span>{t('profile.signOut')}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile View */}
          <div className="flex lg:hidden items-center justify-between gap-4">
            <button
              onClick={() => setShowMobileSearch(!showMobileSearch)}
              className="p-2 hover:bg-midnight-800/50 rounded-full transition-colors duration-300"
            >
              <FaSearch className="text-stone-400" />
            </button>

            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-midnight-800/50 rounded-full relative transition-colors duration-300">
                <FaBell className="text-stone-400" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 transform translate-x-1 -translate-y-1 bg-sunset text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-sunset flex items-center justify-center text-white">
                D
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="p-4 border-t border-stone-600/10 lg:hidden">
            <div className="relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sunset/70" />
              <input
                type="text"
                placeholder={t('common.search')}
                className="input w-full"
              />
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default DashNav;
